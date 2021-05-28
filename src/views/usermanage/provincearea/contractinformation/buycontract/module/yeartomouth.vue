<template>
  <!-- 分时方案详情页面弹窗 -->
  <!-- 打开分时方案详情页面弹窗 Dialog -->
  <el-dialog title="购电合同-年到月分时方案" :visible.sync="dialogYearToMouth.toggle">
    <div>年到月分解方案页</div>
    <el-form :model="timesasingSchemeDetial">
      <el-form-item
        label="方案名称*"
        :label-width="formLabelWidth"
        prop="name"
        :rules="[
          { required: true, message: '请输入方案名称', trigger: 'blur' }
        ]"
      >
        <el-input v-model="timesasingSchemeDetial.name" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="总电量(MWh)"
        :label-width="formLabelWidth"
        prop="totalElic"
        :rules="[
          { required: true, message: '请输入总电量（MWh）', trigger: 'blur' }
        ]"
      >
        <el-input v-model="timesasingSchemeDetial.totalElic" autocomplete="off" />
      </el-form-item>
      <el-form-item label="输入方式选择*">
        <el-switch 
          active-text="电量"
          inactive-text="水量" 
          :width='60'
          v-model="timesasingSchemeDetial.chooseStyle" />
      </el-form-item>
      <el-form-item
        label="1月份电量*"
        :label-width="formLabelWidth"
        prop="oneElic"
        :rules="[
          { required: true, message: '请输入1月份电量', trigger: 'blur' }
        ]"
      >
        <el-input v-model="timesasingSchemeDetial.oneElic" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="2月份电量*"
        :label-width="formLabelWidth"
        prop="twoElic"
        :rules="[
          { required: true, message: '请输入2月份电量', trigger: 'blur' }
        ]"
      >
        <el-input v-model="timesasingSchemeDetial.twoElic" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="3月份电量*"
        :label-width="formLabelWidth"
        prop="threeElic"
        :rules="[
          { required: true, message: '请输入3月份电量', trigger: 'blur' }
        ]"
      >
        <el-input v-model="timesasingSchemeDetial.threeElic" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="4月份电量*"
        :label-width="formLabelWidth"
        prop="fourElic"
        :rules="[
          { required: true, message: '请输入4月份电量', trigger: 'blur' }
        ]"
      >
        <el-input v-model="timesasingSchemeDetial.fourElic" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="5月份电量*"
        :label-width="formLabelWidth"
        prop="fiveElic"
        :rules="[
          { required: true, message: '请输入5月份电量', trigger: 'blur' }
        ]"
      >
        <el-input v-model="timesasingSchemeDetial.fiveElic" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="6月份电量*"
        :label-width="formLabelWidth"
        prop="sixElic"
        :rules="[
          { required: true, message: '请输入6月份电量', trigger: 'blur' }
        ]"
      >
        <el-input v-model="timesasingSchemeDetial.sixElic" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="7月份电量*"
        :label-width="formLabelWidth"
        prop="sevenElic"
        :rules="[
          { required: true, message: '请输入7月份电量', trigger: 'blur' }
        ]"
      >
        <el-input v-model="timesasingSchemeDetial.sevenElic" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="8月份电量*"
        :label-width="formLabelWidth"
        prop="eightElic"
        :rules="[
          { required: true, message: '请输入8月份电量', trigger: 'blur' }
        ]"
      >
        <el-input v-model="timesasingSchemeDetial.eightElic" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="9月份电量*"
        :label-width="formLabelWidth"
        prop="nineElic"
        :rules="[
          { required: true, message: '请输入9月份电量', trigger: 'blur' }
        ]"
      >
        <el-input v-model="timesasingSchemeDetial.nineElic" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="10月份电量*"
        :label-width="formLabelWidth"
        prop="tenElic"
        :rules="[
          { required: true, message: '请输入10月份电量', trigger: 'blur' }
        ]"
      >
        <el-input v-model="timesasingSchemeDetial.tenElic" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="11月份电量*"
        :label-width="formLabelWidth"
        prop="elevenElic"
        :rules="[
          { required: true, message: '请输入11月份电量', trigger: 'blur' }
        ]"
      >
        <el-input v-model="timesasingSchemeDetial.elevenElic" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="12月份电量*"
        :label-width="formLabelWidth"
        prop="twelveElic"
        :rules="[
          { required: true, message: '请输入12月份电量', trigger: 'blur' }
        ]"
      >
        <el-input v-model="timesasingSchemeDetial.twelveElic" autocomplete="off" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogYearToMouth.toggle = false">取 消</el-button>
      <el-button type="primary" @click="dialogYearToMouth.toggle = false">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogYearToMouth: {
      type: Object,
    }
  },
  data() {
    return {
      // 分时方案详情页面 -- 弹窗表单
      timesasingSchemeDetial: {
        name: "",
        shiduanName: "",
        shiduanCount: ""
      },
      formLabelWidth: "120px",
      rules: {
        contractName: [
          { required: true, message: "请输入合同名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        startDate: [
          { required: true, message: "请输入起始时间", trigger: "change" }
        ]
      }
    };
  },
  
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

::v-deep .el-switch__label--left{
  position: relative;
  left: 60px;
  color: #fff;
  z-index: -1111;
}
::v-deep .el-switch__label--right{
  position: relative;
  right: 54px;
  color: #fff;
  z-index: -1111;
}
::v-deep .el-switch__label--right{
  margin-left: 0  !important;
}
::v-deep .el-switch__label--right.is-active{
  z-index: 1111;
  color: #fff !important;
}
::v-deep .el-switch__label--left.is-active{
  z-index: 1111;
  color: #9c9c9c !important;
}
</style>
