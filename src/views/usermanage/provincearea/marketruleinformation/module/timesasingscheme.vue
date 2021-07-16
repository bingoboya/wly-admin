<template>
  <!-- 分时方案详情页面弹窗 -->
  <!-- 打开分时方案详情页面弹窗 Dialog -->
  <el-dialog
    v-el-drag-dialog
    width="80%"
    custom-class="bingo"
    title="购电合同-分时方案"
    :visible.sync="showDialogFormVisible.toggle"
    @open="openDialog"
    @closed="showFormDom = false"
  >
    <el-form
      v-if="showFormDom"
      ref="ruleForm"
      :model="timesasingSchemeDetial"
      style="width: 100%"
      :rules="rules"
    >
      <el-row :gutter="5">
        <el-col :span="8">
          <el-form-item
            label="方案名称"
            :label-width="formLabelWidth"
            prop="name"
            :rules="[
              { required: true, message: '请输入方案名称', trigger: 'blur' },
            ]"
          >
            <el-input v-model="timesasingSchemeDetial.name" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="分时时段数"
            :label-width="formLabelWidth"
            prop="numPeriod"
            :rules="[
              { required: true, message: '请输入分时时段数', trigger: 'chage' },
            ]"
          >
            <el-select
              v-model="timesasingSchemeDetial.numPeriod"
              style="width: 220px"
              placeholder="选择分时时段数"
              @change="selectNumPeriod"
            >
              <el-option
                v-for="(item, index) in 5"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
            <!-- <el-input
              v-model="timesasingSchemeDetial.numPeriod"
              placeholder="请输入分时时段数"
              autocomplete="off"
            /> -->
          </el-form-item>
        </el-col>
      </el-row>

      <div v-if="timesasingSchemeDetial.timeperiodofusecfgSmallDTOList.length !== 0">
        <div
          v-for="(items, index) in timesasingSchemeDetial.timeperiodofusecfgSmallDTOList || []"
          :key="index"
          class="shiduan-wrapper"
        >
          <div style="flex: 3">
            <el-form-item
              :label="`时段名称${index + 1}`"
              :label-width="formLabelWidth"
              :prop="`timeperiodofusecfgSmallDTOList[${index}].periodName`"
              :rules="{required: true, message: '名称不能为空', trigger: 'blur'}"
            >
              <el-input v-model="items.periodName" placeholder="请输入时段名称" />
            </el-form-item>
          </div>
          <div style="flex: 7; margin-left: 20px; margin-bottom: 20px">
            <el-form-item v-for="(timeItem, nums) in items.periodTimeList" :key="nums" label="起止时间">
              <div style="display: flex;">
                <el-form-item>
                  <el-time-select
                    v-model="timeItem.startTime"
                    placeholder="起始时间"
                    :editable="false"
                    :clearable="false"
                    :picker-options="{
                      start: '00:00',
                      step: '00:15',
                      end: '24:00',
                      maxTime: timeItem.endTime,
                    }"
                  />
                </el-form-item>
                <el-form-item>
                  <el-time-select
                    v-model="timeItem.endTime"
                    placeholder="结束时间"
                    :picker-options="{
                      start: '00:00',
                      step: '00:15',
                      end: '24:00',
                      minTime: timeItem.startTime,
                    }"
                  />
                </el-form-item>
              </div>
            </el-form-item>
            <div style="display: flex; justify-content: flex-end">
              <el-button
                v-if="items.periodTimeList.length > 1"
                type="primary"
                icon="el-icon-delete"
                @click="removeEnvironmentForm(index)"
              />
              <el-button
                class="el-icon-plus"
                @click="addEnvironmentForm(index)"
              />
            </div>
          </div>
        </div>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <!-- 另存 不传当前分时方案id-->
      <el-button type="primary" @click="submitForm('ruleForm', 'add')">另存</el-button>
      <!-- 保存 -》传入当前分时方案id -->
      <el-button type="primary" @click="submitForm('ruleForm', 'save')">保存</el-button>
      <!-- 自定义进来时才有 保存并选择-->
      <el-button v-if="id == 999" type="primary" @click="submitForm('ruleForm', 'saveselected')">保存并选择</el-button>
      <el-button type="primary" @click="showDialogFormVisible.toggle = false">取 消</el-button>
      <!-- <el-button type="primary" @click="submitForm('ruleForm')">编辑</el-button> -->
      <!-- <el-button type="primary" @click="submitForm('timesasingSchemeDetial')">提交</el-button>  -->
    </div>
  </el-dialog>
</template>
<script>
import request from '@/utils/request'
import elDragDialog from '@/components/Directive/el-drag-dialog'
export default {
  directives: { elDragDialog },
  props: {
    showDialogFormVisible: {
      type: Object
    },
    id: {
      type: [String, Number],
      default: 1
    }
  },
  data() {
    return {
      showFormDom: false, // 接口数据拿到之后再渲染表单的dom结构，防止报错
      // 分时方案详情页面 -- 弹窗表单
      timesasingSchemeDetial: {
        id: '',
        name: '',
        numPeriod: 1,
        timeperiodofusecfgSmallDTOList: [{
          periodName: '',
          periodTimeList: [
            {
              startTime: '00:00',
              endTime: '24:00'
            }
          ]
        }]
      },
      formLabelWidth: '120px',
      rules: {}
    }
  },
  methods: {
    selectNumPeriod(item) {
      // 选择分时时段数
      console.log('选择分时时段数', item)
      this.addbingoEnvironmentForm(item)
    },
    saveTimesasingSchemeDetial(val, type) {
      // 保存 购电合同-分时方案 页面信息
      request({
        url: '/buy/tpcfg/detail/save',
        method: 'post',
        data: val
      }).then(res => {
        console.log('type:', type)
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        this.$emit('getPeriodList', type, res.id)
        this.showDialogFormVisible.toggle = false
      }).catch((error) => {
        console.log(error)
        this.$message.error('保存失败')
      })
    },
    // 添加表单项事件
    addEnvironmentForm(index) {
      this.timesasingSchemeDetial.timeperiodofusecfgSmallDTOList[
        index
      ].periodTimeList.push({
        startTime: '00:00',
        endTime: '24:00'
      })
    },
    // 移除表单项事件
    removeEnvironmentForm(index) {
      this.timesasingSchemeDetial.timeperiodofusecfgSmallDTOList[
        index
      ].periodTimeList.pop()
    },
    // 添加大表单项事件
    addbingoEnvironmentForm(num) {
      const list = JSON.parse(JSON.stringify(this.timesasingSchemeDetial.timeperiodofusecfgSmallDTOList))
      console.log('num:', num, 'length:', list.length)
      if (list.length > num) {
        this.timesasingSchemeDetial.timeperiodofusecfgSmallDTOList = list.slice(0, num)
      } else if (list.length < num) {
        console.log('a', num - list.length)
        for (let i = 1; i <= num - list.length; i++) {
          console.log(i)
          this.timesasingSchemeDetial.timeperiodofusecfgSmallDTOList.push({
            periodName: '',
            periodTimeList: [{ startTime: '00:00', endTime: '24:00' }]
          })
        }
      }
    },
    getTpcfgDetial() {
      const result = {
        id: 2,
        name: 'bingo1',
        timeperiodofusecfgSmallDTOList: [
          {
            periodName: '谷',
            periodTimeList: [
              {
                startTime: '00:00',
                endTime: '24:00'
              },
              {
                startTime: '00:00',
                endTime: '24:00'
              }
              // {
              //   startTime: "00:00",
              //   endTime: "24:00",
              // },
              // {
              //   startTime: "00:00",
              //   endTime: "24:00",
              // },
            ]
          },
          {
            periodName: '平',
            periodTimeList: [
              {
                startTime: '00:00',
                endTime: '24:00'
              },
              { startTime: '00:00', endTime: '24:00' }
            ]
          },
          {
            periodName: '高',
            periodTimeList: [
              {
                startTime: '00:00',
                endTime: '24:00'
              },
              { startTime: '00:00', endTime: '24:00' }
            ]
          }
        ]
      }
      // 获取分时方案详情
      request({
        url: `/buy/tpcfg/${this.id}/detail`,
        method: 'get'
      }).then((res) => {
        this.timesasingSchemeDetial = res
        console.log('timesasingSchemeDetial', this.timesasingSchemeDetial)
        this.showFormDom = true // 接口数据拿到之后再渲染表单的dom结构，防止报错
      })
    },
    openDialog() {
      if (this.id !== 999) {
        this.getTpcfgDetial()
      } else if (this.id == 999) {
        // 新建表单
        console.log('新建表单')
        this.timesasingSchemeDetial = {
          id: '',
          name: '',
          numPeriod: 1,
          timeperiodofusecfgSmallDTOList: [{
            periodName: '',
            periodTimeList: [
              {
                startTime: '00:00',
                endTime: '24:00'
              }
            ]
          }]
        }
        this.showFormDom = true
      }
    },
    // 提交事件
    submitForm(formName, type) {
      // 判断区间是否有交叉或者时间段总和不等于24小时
      if (this.validateQujian() === false) {
        return false
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('提交', this.timesasingSchemeDetial)
          const ret = JSON.parse(JSON.stringify(this.timesasingSchemeDetial))
          if (type === 'save') {
            ret.id = this.id
          }
          this.saveTimesasingSchemeDetial(ret, type)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    validateQujian(timeItem, aa, nums) {
      // 判断区间是否有交叉 或者时间段总和不等于24小时
      // 把时间区间按照开始时间进行排序，再判断前一个的结束时间和后一个的开始时间是否相等，如果不想等，则表示时间区间断了
      const list = this.timesasingSchemeDetial.timeperiodofusecfgSmallDTOList
      const arr = []
      let continued = true
      list.forEach(item => {
        arr.push(...item.periodTimeList)
      })
      // console.log(222, list, arr);
      arr.sort(this.sortBy('startTime', 1))
      arr.forEach((item, index) => {
        if (index == arr.length - 1) return
        if (item.endTime !== arr[index + 1].startTime) {
          // 时间段不是连续的
          continued = false
          // console.log(index, '时间段不连续', item.startTime, arr[index+1].startTime);
        } else {
          // console.log(index, '时间段连续', item.startTime, arr[index+1].startTime);
        }
      })
      if (continued === false) {
        this.$message.error('时间段不连续')
        return false
      }
      // 如果发现时间段不是连续的，再判断时间段相加是否是24小时
      if (continued) {
        return this.validateAllTime(arr)
      }
    },
    validateAllTime(arr) {
      const timeArr = JSON.parse(JSON.stringify(arr))
      let ret = 0 // 合计时间总时长（分种）
      timeArr.forEach(item => {
        // console.log('startTime:', item.startTime.split(':'), 'endTime:', item.endTime.split(':'));
        const start = item.startTime.split(':')
        const end = item.endTime.split(':')
        const a = (end[0] - start[0]) * 60 + (end[1] - start[1])
        ret += a
        // console.log(end[0] - start[0], end[1] - start[1], a, ret);
      })
      if (ret !== 1440) {
        this.$message.error('时间总和不是24小时')
        // console.log('时间总和不是24小时');
        return false
      }
    },
    sortBy(attr, rev) {
    // attr：根据该属性排序；rev：升序1或降序-1，不填则默认为1
      if (rev == undefined) { rev = 1 } else { (rev) ? 1 : -1 }
      return function(a, b) {
        a = a[attr]
        b = b[attr]
        if (a < b) { return rev * -1 }
        if (a > b) { return rev * 1 }
        return 0
      }
    }

  }
}
</script>
<style lang="scss" scoped>
.shiduan-wrapper {
  display: flex;
  overflow: hidden;
  overflow-x: auto;
}
::v-deep .el-dialog.bingo {
  overflow: hidden !important;
  overflow-x: auto !important;
}
::v-deep .el-dialog__body {
  min-width: 1000px;
  width: 100%;
  display: flex;
  max-height: 500px;
  overflow: auto;
}
</style>
