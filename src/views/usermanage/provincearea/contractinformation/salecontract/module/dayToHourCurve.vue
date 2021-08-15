<template>
  <!-- 日分时曲线编辑 -->
  <el-dialog
    width="80%"
    append-to-body
    title="日分时曲线编辑"
    :visible.sync="dialogDayToHourCurve.toggle"
    @open="openDialog"
    @closed="showFormDom = false"
  >
    <el-form
      ref="ruleForm"
      :model="dayToHourDivisionData"
      :rules="rules"
      label-width="120px"
    >
      <el-row :gutter="5">
        <el-col :span="8">
          <el-form-item label="输入方式选择*">
            <el-switch
              v-model="dayToHourDivisionData.dataType"
              active-text="24点"
              inactive-text="96点"
              active-color="#409EFF"
              inactive-color="red"
              :active-value="1"
              :inactive-value="0"
              :width="60"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="曲线名称"
            :label-width="formLabelWidth"
            prop="name"
            :rules="[
              { required: true, message: '请输入曲线名称', trigger: 'blur' },
            ]"
          >
            <el-input v-model="dayToHourDivisionData.name" autocomplete="off" />
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <!-- 图表模块 -->
    <div v-if="showFormDom">
      <div style="display: flex;">
        <el-table :data="rest.slice(0,rest.length/2)" border style="width: 100%">
          <el-table-column prop="name" label="键" width="60px" />
          <!-- <el-table-column prop="value" label="值" /> -->
          <el-table-column prop="value" label="值">
            <template slot-scope="scope">
              <el-input v-model="rest.slice(0,rest.length/2)[scope.$index].value" size="mini" class="edit-input" @input.native="changeTableValue" />
            </template>
          </el-table-column>
        </el-table>
        <el-table :data="rest.slice(rest.length/2)" border style="width: 100%">
          <el-table-column prop="name" label="键" width="60px" />
          <!-- <el-table-column prop="value" label="值" /> -->
          <el-table-column prop="value" label="值">
            <template slot-scope="scope">
              <el-input v-model="rest.slice(rest.length/2)[scope.$index].value" size="mini" class="edit-input" @input.native="changeTableValue" />
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div>
        <el-row
          style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px"
        >
          <div class="chart-wrapper">
            <dayToHourCurveEcharts ref="dayToHourCurveEcharts" :rest="rest" />
          </div>
        </el-row>
      </div>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm('ruleForm')">另存</el-button>
      <!-- <el-button type="primary" @click="submitForm('ruleForm')">编辑</el-button> -->
      <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">保存并选择</el-button>
      <el-button type="primary" @click="dialogDayToHourCurve.toggle = false">取 消</el-button>
      <!-- <el-button type="primary" @click="dialogDayToHourCurve.toggle = false"
          >确 定</el-button
        > -->
    </div>
  </el-dialog>
</template>
<script>
import dayToHourCurveEcharts from './dayToHourCurveEcharts'
import request from '@/utils/request'

export default {
  components: { dayToHourCurveEcharts },
  props: {
    dialogDayToHourCurve: {
      type: Object
    },
    id: {
      type: [String, Number]
    },
    selectedId: {
      type: [String, Number]
    }
  },
  data() {
    return {
      rest: [],
      showFormDom: false, // 接口数据拿到之后再渲染表单的dom结构，防止报错
      dayToHourDivisionData: {},
      tableData: [
        {
          dateType: '节假日',
          weight: '0.71'
        },
        {
          dateType: '工作日',
          weight: '0.43'
        },
        {
          dateType: '星期六',
          weight: '0.57'
        },
        {
          dateType: '星期日',
          weight: '0.27'
        },
        {
          dateType: '调休节假日',
          weight: '0.75'
        }
      ],
      formLabelWidth: '120px',
      rules: {}
    }
  },
  methods: {
    changeTableValue() {
      console.log('changeTableValue')
      this.$refs.dayToHourCurveEcharts.initChart()
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('dayToHourDivisionData', this.dayToHourDivisionData)
          // alert('submit!');
        } else {
          console.log('error submit!!')
          console.log('dayToHourDivisionData', this.dayToHourDivisionData)
          return false
        }
      })
    },
    // /buy/dtop/{id}/division 获取日分时分解曲线-96点
    getDayToHourDivision() {
      //  获取日分时分解曲线方案详情页
      request({
        url: `/buy/dtop/${this.selectedId}/division`,
        method: 'get'
      }).then((res) => {
        this.dayToHourDivisionData = res
        this.rest = []
        for (const item in res) {
          if (item.indexOf('p') == 0) {
            this.rest.push({ [item]: res[item], name: `${item}`, value: res[item] })
          }
        }
        console.log(this.rest)
        this.showFormDom = true
      })
    },
    openDialog() {
      this.getDayToHourDivision()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep .el-dialog__body {
  max-height: 500px;
  overflow: auto;
}
.chart-wrapper {
  background: #fff;
  padding: 16px 16px 0;
  margin-bottom: 32px;
}
::v-deep .el-switch__label--left {
  position: relative;
  left: 60px;
  color: #fff;
  z-index: -1111;
}
::v-deep .el-switch__label--right {
  position: relative;
  right: 54px;
  color: #fff;
  z-index: -1111;
}
::v-deep .el-switch__label--right {
  margin-left: 0 !important;
}
::v-deep .el-switch__label--right.is-active {
  z-index: 1111;
  color: #fff !important;
}
::v-deep .el-switch__label--left.is-active {
  z-index: 1111;
  color: #9c9c9c !important;
}
</style>
