<template>
  <!-- 分时方案详情页面弹窗 -->
  <!-- 打开分时方案详情页面弹窗 Dialog -->
  <el-dialog
    width="80%"
    title="购电合同-日分时分解方案基础页"
    :visible.sync="dialogDayToHourBase.toggle"
    @open="openDialog"
  >
    <el-form :model="timesasingSchemeDetial" label-width="120px">
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
            <el-input
              v-model="timesasingSchemeDetial.name"
              autocomplete="off"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="总电量(MWh)"
            :label-width="formLabelWidth"
            prop="totalElic"
            :rules="[
              {
                required: true,
                message: '请输入总电量（MWh）',
                trigger: 'blur',
              },
            ]"
          >
            <el-input v-model="totalElectricity" disabled autocomplete="off" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="5">
        <el-col :span="8">
          <el-form-item
            label="1月份电量"
            :label-width="formLabelWidth"
            prop="m01"
          >
            <el-input
              v-model="timesasingSchemeDetial.m01"
              disabled
              autocomplete="off"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="2月份电量"
            :label-width="formLabelWidth"
            prop="m02"
          >
            <el-input
              v-model="timesasingSchemeDetial.m02"
              disabled
              autocomplete="off"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="3月份电量"
            :label-width="formLabelWidth"
            prop="m03"
          >
            <el-input
              v-model="timesasingSchemeDetial.m03"
              disabled
              autocomplete="off"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="5">
        <el-col :span="8">
          <el-form-item
            label="4月份电量"
            :label-width="formLabelWidth"
            prop="m04"
          >
            <el-input
              v-model="timesasingSchemeDetial.m04"
              disabled
              autocomplete="off"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="5月份电量"
            :label-width="formLabelWidth"
            prop="m05"
          >
            <el-input
              v-model="timesasingSchemeDetial.m05"
              disabled
              autocomplete="off"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="6月份电量"
            :label-width="formLabelWidth"
            prop="m06"
          >
            <el-input
              v-model="timesasingSchemeDetial.m06"
              disabled
              autocomplete="off"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="5">
        <el-col :span="8">
          <el-form-item
            label="7月份电量"
            :label-width="formLabelWidth"
            prop="m07"
          >
            <el-input
              v-model="timesasingSchemeDetial.m07"
              disabled
              autocomplete="off"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="8月份电量"
            :label-width="formLabelWidth"
            prop="m08"
          >
            <el-input
              v-model="timesasingSchemeDetial.m08"
              disabled
              autocomplete="off"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="9月份电量"
            :label-width="formLabelWidth"
            prop="m09"
          >
            <el-input
              v-model="timesasingSchemeDetial.m09"
              disabled
              autocomplete="off"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="5">
        <el-col :span="8">
          <el-form-item
            label="10月份电量"
            :label-width="formLabelWidth"
            prop="m10"
          >
            <el-input
              v-model="timesasingSchemeDetial.m10"
              disabled
              autocomplete="off"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="11月份电量"
            :label-width="formLabelWidth"
            prop="m11"
          >
            <el-input
              v-model="timesasingSchemeDetial.m11"
              disabled
              autocomplete="off"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="12月份电量"
            :label-width="formLabelWidth"
            prop="m12"
          >
            <el-input
              v-model="timesasingSchemeDetial.m12"
              disabled
              autocomplete="off"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 请选择输入方式 -->
      <el-form-item
        label="输入方式选择"
        :label-width="formLabelWidth"
        prop="chooseEntyType"
        :rules="[
          { required: true, message: '请输入12月份电量', trigger: 'blur' },
        ]"
      >
        <el-radio-group v-model="chooseEntyType">
          <el-radio label="0">日历周-12个月统一</el-radio>
          <el-radio label="1">日历周-12个月单独</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="全年统一方案：">
        <el-select
          v-model="timesasingSchemeDetial.planDTOList[0].planId"
          :disabled="chooseEntyType == 1"
          placeholder="全年统一方案："
        >
          <el-option label="浙江典型年度分解方案" :value="1" />
          <el-option label="广东典型年度分解方案" :value="2" />
          <el-option label="广东20年典型日权重1" :value="3" />
          <el-option label="新增自定义方案" :value="4" />
        </el-select>
        <el-button
          :disabled="chooseEntyType == 1"
          type="primary"
          @click="showDialogDayToHourDetail(timesasingSchemeDetial.planDTOList[0].planId)"
        >查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="1月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.planDTOList[0].planId"
          :disabled="chooseEntyType == 0"
          placeholder="1月份方案："
        >
          <el-option label="浙江典型年度分解方案" :value="1" />
          <el-option label="广东典型年度分解方案" :value="2" />
          <el-option label="广东20年典型日权重1" :value="3" />
          <el-option label="新增自定义方案" :value="4" />
        </el-select>
        <el-button
          :disabled="chooseEntyType == 0"
          type="primary"
          @click="showDialogDayToHourDetail(timesasingSchemeDetial.planDTOList[0].planId, 1)"
        >查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="2月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.planDTOList[1].planId"
          :disabled="chooseEntyType == 0"
          placeholder="2月份方案："
        >
          <el-option label="浙江典型年度分解方案" :value="1" />
          <el-option label="广东典型年度分解方案" :value="2" />
          <el-option label="广东20年典型日权重1" :value="3" />
          <el-option label="新增自定义方案" :value="4" />
        </el-select>
        <el-button
          type="primary"
          :disabled="chooseEntyType == 0"
          @click="showDialogDayToHourDetail(timesasingSchemeDetial.planDTOList[1].planId, 2)"
        >查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="3月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.planDTOList[2].planId"
          :disabled="chooseEntyType == 0"
          placeholder="3月份方案："
        >
          <el-option label="浙江典型年度分解方案" :value="1" />
          <el-option label="广东典型年度分解方案" :value="2" />
          <el-option label="广东20年典型日权重1" :value="3" />
          <el-option label="新增自定义方案" :value="4" />
        </el-select>
        <el-button
          type="primary"
          :disabled="chooseEntyType == 0"
          @click="showDialogDayToHourDetail(timesasingSchemeDetial.planDTOList[2].planId, 3)"
        >查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="4月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.planDTOList[3].planId"
          :disabled="chooseEntyType == 0"
          placeholder="4月份方案："
        >
          <el-option label="浙江典型年度分解方案" :value="1" />
          <el-option label="广东典型年度分解方案" :value="2" />
          <el-option label="广东20年典型日权重1" :value="3" />
          <el-option label="新增自定义方案" :value="4" />
        </el-select>
        <el-button
          type="primary"
          :disabled="chooseEntyType == 0"
          @click="showDialogDayToHourDetail(timesasingSchemeDetial.planDTOList[3].planId, 4)"
        >查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="5月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.planDTOList[4].planId"
          :disabled="chooseEntyType == 0"
          placeholder="5月份方案："
        >
          <el-option label="浙江典型年度分解方案" :value="1" />
          <el-option label="广东典型年度分解方案" :value="2" />
          <el-option label="广东20年典型日权重1" :value="3" />
          <el-option label="新增自定义方案" :value="4" />
        </el-select>
        <el-button
          type="primary"
          :disabled="chooseEntyType == 0"
          @click="showDialogDayToHourDetail(timesasingSchemeDetial.planDTOList[4].planId, 5)"
        >查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="6月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.planDTOList[5].planId"
          :disabled="chooseEntyType == 0"
          placeholder="6月份方案："
        >
          <el-option label="浙江典型年度分解方案" :value="1" />
          <el-option label="广东典型年度分解方案" :value="2" />
          <el-option label="广东20年典型日权重1" :value="3" />
          <el-option label="新增自定义方案" :value="4" />
        </el-select>
        <el-button
          type="primary"
          :disabled="chooseEntyType == 0"
          @click="showDialogDayToHourDetail(timesasingSchemeDetial.planDTOList[5].planId, 6)"
        >查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="7月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.planDTOList[6].planId"
          :disabled="chooseEntyType == 0"
          placeholder="7月份方案："
        >
          <el-option label="浙江典型年度分解方案" :value="1" />
          <el-option label="广东典型年度分解方案" :value="2" />
          <el-option label="广东20年典型日权重1" :value="3" />
          <el-option label="新增自定义方案" :value="4" />
        </el-select>
        <el-button
          type="primary"
          :disabled="chooseEntyType == 0"
          @click="showDialogDayToHourDetail(timesasingSchemeDetial.planDTOList[6].planId, 7)"
        >查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="8月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.planDTOList[7].planId"
          :disabled="chooseEntyType == 0"
          placeholder="8月份方案："
        >
          <el-option label="浙江典型年度分解方案" :value="1" />
          <el-option label="广东典型年度分解方案" :value="2" />
          <el-option label="广东20年典型日权重1" :value="3" />
          <el-option label="新增自定义方案" :value="4" />
        </el-select>
        <el-button
          type="primary"
          :disabled="chooseEntyType == 0"
          @click="showDialogDayToHourDetail(timesasingSchemeDetial.planDTOList[7].planId, 8)"
        >查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="9月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.planDTOList[8].planId"
          :disabled="chooseEntyType == 0"
          placeholder="9月份方案："
        >
          <el-option label="浙江典型年度分解方案" :value="1" />
          <el-option label="广东典型年度分解方案" :value="2" />
          <el-option label="广东20年典型日权重1" :value="3" />
          <el-option label="新增自定义方案" :value="4" />
        </el-select>
        <el-button
          type="primary"
          :disabled="chooseEntyType == 0"
          @click="showDialogDayToHourDetail(timesasingSchemeDetial.planDTOList[8].planId, 9)"
        >查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="10月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.planDTOList[9].planId"
          :disabled="chooseEntyType == 0"
          placeholder="10月份方案："
        >
          <el-option label="浙江典型年度分解方案" :value="1" />
          <el-option label="广东典型年度分解方案" :value="2" />
          <el-option label="广东20年典型日权重1" :value="3" />
          <el-option label="新增自定义方案" :value="4" />
        </el-select>
        <el-button
          type="primary"
          :disabled="chooseEntyType == 0"
          @click="showDialogDayToHourDetail(timesasingSchemeDetial.planDTOList[9].planId, 10)"
        >查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="11月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.planDTOList[10].planId"
          :disabled="chooseEntyType == 0"
          placeholder="11月份方案："
        >
          <el-option label="浙江典型年度分解方案" :value="1" />
          <el-option label="广东典型年度分解方案" :value="2" />
          <el-option label="广东20年典型日权重1" :value="3" />
          <el-option label="新增自定义方案" :value="4" />
        </el-select>
        <el-button
          type="primary"
          :disabled="chooseEntyType == 0"
          @click="showDialogDayToHourDetail(timesasingSchemeDetial.planDTOList[10].planId, 11)"
        >查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="12月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.planDTOList[11].planId"
          :disabled="chooseEntyType == 0"
          placeholder="12月份方案："
        >
          <el-option label="浙江典型年度分解方案" :value="1" />
          <el-option label="广东典型年度分解方案" :value="2" />
          <el-option label="广东20年典型日权重1" :value="3" />
          <el-option label="新增自定义方案" :value="4" />
        </el-select>
        <el-button
          type="primary"
          :disabled="chooseEntyType == 0"
          @click="showDialogDayToHourDetail(timesasingSchemeDetial.planDTOList[11].planId, 12)"
        >查询/编辑/另存</el-button>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogDayToHourBase.toggle = false">取 消</el-button>
      <el-button
        type="primary"
        @click="dialogDayToHourBase.toggle = false"
      >确 定</el-button>
    </div>
    <dayToHourDetial :id="id" :month="month" :select-id="selectId" :dialog-day-to-hour-detial="dialogDayToHourDetial" />
  </el-dialog>
</template>
<script>
import dayToHourDetial from './dayToHourDetial'
import request from '@/utils/request'
export default {
  components: { dayToHourDetial },
  props: {
    dialogDayToHourBase: {
      type: Object
    },
    totalElectricity: {
      type: [String, Number]
    },
    id: {
      type: [String, Number]
    }
  },
  data() {
    return {
      month: '',
      selectId: '',
      chooseEntyType: '0',
      dialogDayToHourDetial: { toggle: false },
      // 分时方案详情页面 -- 弹窗表单
      timesasingSchemeDetial: {
        dataType: '',
        id: '',
        m01: '',
        m02: '',
        m03: '',
        m04: '',
        m05: '',
        m06: '',
        m07: '',
        m08: '',
        m09: '',
        m10: '',
        m11: '',
        m12: '',
        name: '',
        planDTOList: [
          { month: '', planId: '', planName: '' },
          { month: '', planId: '', planName: '' },
          { month: '', planId: '', planName: '' },
          { month: '', planId: '', planName: '' },
          { month: '', planId: '', planName: '' },
          { month: '', planId: '', planName: '' },
          { month: '', planId: '', planName: '' },
          { month: '', planId: '', planName: '' },
          { month: '', planId: '', planName: '' },
          { month: '', planId: '', planName: '' },
          { month: '', planId: '', planName: '' },
          { month: '', planId: '', planName: '' }
        ]
      },
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
  created() {
    console.log('日到时基本页')
  },
  methods: {
    async showDialogDayToHourDetail(selectId, month) {
      console.log(6666, month)
      this.selectId = selectId
      this.month = month
      this.dialogDayToHourDetial.toggle = true
    },
    openDialog() {
      console.log('打开日分时基础页面')
      this.getMouthToDayBasic()
    },
    getMouthToDayBasic() {
      // 获取机构名称列表
      request({
        // id是在  /buy  接口处获取到的
        url: `/buy/dtop/${this.id}/basic`,
        method: 'get'
      }).then((res) => {
        console.log(5555, res)
        this.timesasingSchemeDetial = res
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
