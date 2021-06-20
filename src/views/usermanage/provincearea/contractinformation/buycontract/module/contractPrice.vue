<template>
  <!-- 分时方案详情页面弹窗 -->
  <!-- 打开分时方案详情页面弹窗 Dialog -->
  <el-dialog
    width="80%"
    v-el-drag-dialog
    custom-class="bingo"
    @open="openDialog"
    @closed="showFormDom = false"
    title="购电合同-合同价格方案"
    :visible.sync="showDialogContractPrice.toggle"
  >
    <el-form
      v-if="showFormDom"
      :model="timesasingSchemeDetial"
      style="width: 100%"
      :rules='rules'
      ref="ruleForm"
    >
      <div v-if="timesasingSchemeDetial.timeperiodofusecfgSmallDTOList.length !== 0">
        <div v-for="(items, index) in timesasingSchemeDetial.timeperiodofusecfgSmallDTOList || []"
          :key="index" class="shiduan-wrapper"
        >
          <div style="flex: 3">
            <el-form-item :label="`价格${index + 1}:`"
              :label-width="formLabelWidth"
              :prop='`timeperiodofusecfgSmallDTOList[${index}].price`'
              :rules="{required: true, message: '名称不能为空', trigger: 'blur'}"
            >
              <el-input placeholder="请输入时段名称" v-model="items.price"/>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm('ruleForm')">另存</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">编辑</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">保存并选择</el-button
      >
      <el-button type="primary" @click="showDialogContractPrice.toggle = false">取 消</el-button>
      <!-- <el-button type="primary" @click="submitForm('timesasingSchemeDetial')">提交</el-button>  -->
      <!-- <el-button type="primary" @click="showDialogContractPrice.toggle = false">确 定</el-button> -->
    </div>
  </el-dialog>
</template>
<script>
import request from "@/utils/request";
import elDragDialog from '@/components/Directive/el-drag-dialog'
export default {
  directives: { elDragDialog },
  props: {
    showDialogContractPrice: {
      type: Object,
    },
    items:{
      type: Array
    }
  },
  data() {
    return {
      showFormDom: false, //接口数据拿到之后再渲染表单的dom结构，防止报错
      // 分时方案详情页面 -- 弹窗表单
      timesasingSchemeDetial: {
        timeperiodofusecfgSmallDTOList: this.items
      },
      formLabelWidth: "120px",
      rules: {
      },
    };
  },
  methods: {
    saveTimesasingSchemeDetial(val){
      //保存 购电合同-分时方案 页面信息
      request({
        url: "/buy/tpcfg/detail/save",
        method: "post",
        data: val
      }).then(res=>{
        this.$message({
          message: '保存成功',
          type: 'success'
        })
      }).catch((error) => {
        console.log(error);
        this.$message.error('保存失败');
      })
    },
    
    //提交事件
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("提交", this.timesasingSchemeDetial);
          this.saveTimesasingSchemeDetial(this.timesasingSchemeDetial)
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getTpcfgDetial() {
      // [{price: 56}, {price: 53}, {price: 57}]
      this.timesasingSchemeDetial.timeperiodofusecfgSmallDTOList = this.items;
      this.showFormDom = true; //接口数据拿到之后再渲染表单的dom结构，防止报错
    },
    
    openDialog() {
      this.getTpcfgDetial();
    },
    
  },
};
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