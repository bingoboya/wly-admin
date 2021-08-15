<template>
  <!-- 分时方案详情页面弹窗 -->
  <!-- 打开分时方案详情页面弹窗 Dialog -->
  <el-dialog width="80%" append-to-body :title="`购电合同-日分时分解方案 ${month} 月`" :visible.sync="dialogDayToHourDetial.toggle" @open="openDialog">
    <!-- <div>日分时分解方案 1 月</div> -->
    <el-form
      ref="ruleForm"
      :model="dayToHourDetail"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item
        label="方案名称:"
        :label-width="formLabelWidth"
        prop="name"
        :rules="[
          { required: true, message: '请输入方案名称', trigger: 'blur' }
        ]"
      >
        <el-input v-model="dayToHourDetail.name" style="width: 194px" autocomplete="off" />
      </el-form-item>
      <el-form-item label="工作日曲线:" :label-width="formLabelWidth" prop="shiduanCount">
        <el-select v-model="dayToHourDetail.friCurID" clearable placeholder="请选择活动区域">
          <el-option v-for="item in dayToHourDropList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
        <el-button type="primary" @click="showdialogDayToHourCurve(dayToHourDetail.friCurID)">查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="周六曲线:" :label-width="formLabelWidth" prop="shiduanCount">
        <el-select v-model="dayToHourDetail.satCurID" clearable placeholder="请选择活动区域">
          <el-option v-for="item in dayToHourDropList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
        <el-button type="primary" @click="showdialogDayToHourCurve(dayToHourDetail.satCurID)">查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="周日曲线:" :label-width="formLabelWidth" prop="shiduanCount">
        <el-select v-model="dayToHourDetail.sunCurID" clearable placeholder="请选择活动区域">
          <el-option v-for="item in dayToHourDropList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
        <el-button type="primary" @click="showdialogDayToHourCurve(dayToHourDetail.sunCurID)">查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="法定节假日曲线:" :label-width="formLabelWidth" prop="shiduanCount">
        <el-select v-model="dayToHourDetail.holiCurID" clearable placeholder="请选择活动区域">
          <el-option v-for="item in dayToHourDropList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
        <el-button type="primary" @click="showdialogDayToHourCurve(dayToHourDetail.holiCurID)">查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="调休节假日曲线:" :label-width="formLabelWidth" prop="shiduanCount">
        <el-select v-model="dayToHourDetail.holiWorkCurID" clearable placeholder="请选择活动区域">
          <el-option v-for="item in dayToHourDropList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
        <el-button type="primary" @click="showdialogDayToHourCurve(dayToHourDetail.holiWorkCurID)">查询/编辑/另存</el-button>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm('ruleForm', 'add')">另存</el-button>
      <!-- <el-button type="primary" @click="submitForm('ruleForm')">编辑</el-button> -->
      <el-button type="primary" @click="submitForm('ruleForm', 'save')">保存</el-button>
      <el-button type="primary" @click="submitForm('ruleForm', 'select')">保存并选择</el-button>
      <el-button type="primary" @click="dialogDayToHourDetial.toggle = false">取 消</el-button>
      <!-- <el-button type="primary" @click="dialogDayToHourDetial.toggle = false"
        >确 定</el-button
      > -->
    </div>
    <dayToHourCurve :id="id" :selected-id="selectedId" :dialog-day-to-hour-curve="dialogDayToHourCurve" />
  </el-dialog>
</template>
<script>
import request from '@/utils/request'
import dayToHourCurve from './dayToHourCurve'
export default {
  components: { dayToHourCurve },
  props: {
    dialogDayToHourDetial: {
      type: Object
    },
    selectId: {
      type: [Number, String]
    },
    id: {
      type: [Number, String]
    },
    month: {
      type: [Number, String]
    }
  },
  data() {
    return {
      selectedId: '',
      dayToHourDropList: [],
      dialogDayToHourCurve: { toggle: false },
      // 分时方案详情页面 -- 弹窗表单
      dayToHourDetail: {},
      formLabelWidth: '120px',
      rules: {
        contractName: [
          { required: true, message: '请输入合同名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        startDate: [
          { required: true, message: '请输入起始时间', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    showdialogDayToHourCurve(selectedId) {
      this.selectedId = selectedId
      this.dialogDayToHourCurve.toggle = true
    },
    saveDayToHourDetail(val) {
      request({
        url: '/buy/dtop/detail/save',
        method: 'post',
        data: val
      }).then(res => {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        this.dialogDayToHourDetial.toggle = false
      }).catch((error) => {
        console.log(error)
        this.$message.error('保存失败')
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dayToHourDetail.id = 1
          console.log('dayToHourDetail', this.dayToHourDetail)
          this.saveDayToHourDetail(this.dayToHourDetail)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async openDialog() {
      await this.getDayToHourDropList()
      await this.getDayToHourDetail()
    },
    getDayToHourDetail(month) {
      //  获取日分时分解曲线方案详情页
      request({
        url: `/buy/dtop/${this.selectId}/detail`,
        method: 'get'
      }).then((res) => {
        this.dayToHourDetail = res
      })
    },
    getDayToHourDropList() {
      // 获取日分时分解曲线下拉列表
      request({
        url: `/buy/dtop/list`,
        method: 'get'
      }).then((res) => {
        this.dayToHourDropList = res
      })
    }
  }

}
</script>
<style lang="scss" scoped>
::v-deep .el-dialog__body {
  max-height: 500px;
  overflow: auto;
}
</style>
