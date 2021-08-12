<template>
  <!-- 分时方案详情页面弹窗 -->
  <!-- 打开分时方案详情页面弹窗 Dialog -->
  <el-dialog
    v-el-drag-dialog
    width="80%"
    custom-class="bingo"
    title="售电合同-固定价差方案"
    :visible.sync="showDialogContractPrice.toggle"
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
      <el-form-item>
        <el-form-item
          label="方案名称"
          :label-width="formLabelWidth"
          prop="name"
          :rules="{ required: true, message: '名称不能为空', trigger: 'blur' }"
        >
          <el-input v-model="timesasingSchemeDetial.name" style="width: 220px;" placeholder="请输入方案名称" />
        </el-form-item>
      </el-form-item>
      <div
        v-if="
          timesasingSchemeDetial.priceList.length !== 0
        "
      >
        <div
          v-for="(
            item, index
          ) in timesasingSchemeDetial.priceList || []"
          :key="index"
          class="shiduan-wrapper"
        >
          <div style="flex: 3">
            <el-form-item
              :label="`价格${index + 1}:`"
              :label-width="formLabelWidth"
              :prop="`priceList[${index}].price`"
              :rules="{
                required: true,
                message: '名称不能为空',
                trigger: 'blur',
              }"
            >
              <el-input v-model="item.price" style="width: 220px;" placeholder="请输入时段名称" />
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm('ruleForm')">另存</el-button>
      <!-- <el-button type="primary" @click="submitForm('  uleForm')">保存</el-button> -->
      <el-button type="primary" @click="submitForm('ruleForm')">保存并选择</el-button>
      <el-button type="primary" @click="showDialogContractPrice.toggle = false">取 消</el-button>
      <!-- <el-button type="primary" @click="submitForm('timesasingSchemeDetial')">提交</el-button>  -->
      <!-- <el-button type="primary" @click="showDialogContractPrice.toggle = false">确 定</el-button> -->
      <!-- <el-button type="primary" @click="resetForm('ruleForm')">重置 </el-button> -->
    </div>
  </el-dialog>
</template>
<script>
import request from '@/utils/request'
import elDragDialog from '@/components/Directive/el-drag-dialog'
export default {
  directives: { elDragDialog },
  props: {
    showDialogContractPrice: {
      type: Object
    },
    fixPriceArr: {
      type: Array
    },
    id: {
      type: [Number, String]
    },
    contractPriceList: {
      type: Array
    },
    cfgId: {
      type: [Number, String]
    }
  },
  data() {
    return {
      showFormDom: false, // 接口数据拿到之后再渲染表单的dom结构，防止报错
      // 分时方案详情页面 -- 弹窗表单
      timesasingSchemeDetial: {
        id: '',
        name: '',
        cfgId: '',
        priceList: []
      },
      formLabelWidth: '120px',
      rules: {}
    }
  },
  methods: {
    // 跟据id获取到价格方案名称
    getPriceName() {
      if (this.id == 999) {
        this.timesasingSchemeDetial.id = ''
        return
      }
      console.log('获取到价格方案名称', this.contractPriceList, this.id)
      const aa = this.contractPriceList.filter(item => this.id == item.id)
      console.log(9999, aa[0].name)
      this.timesasingSchemeDetial.name = aa[0].name
      this.timesasingSchemeDetial.id = this.id
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    saveTimesasingSchemeDetial(val) {
      // 保存 售电合同-分时方案 页面信息
      request({
        url: '/buy/tpfcg/price/save',
        method: 'post',
        data: val
      })
        .then((res) => {
          this.$emit('changepricetimeofuseDTO', res.id, 'fix-PriceofUseDTO')
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        })
        .catch((error) => {
          console.log(error)
          this.$message.error('保存失败')
        })
    },

    // 提交事件
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('提交', this.timesasingSchemeDetial)
          const ret = JSON.parse(JSON.stringify(this.timesasingSchemeDetial))
          const arr = []
          ret.priceList.forEach(item => {
            arr.push(Number(item.price))
          })
          ret.priceList = arr
          this.saveTimesasingSchemeDetial(ret)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getTpcfgDetial() {
      const ret = JSON.parse(JSON.stringify(this.fixPriceArr))
      // [{price: 56}, {price: 53}, {price: 57}]
      if (this.showDialogContractPrice.add) {
        ret.forEach((item) => (item.price = null))
        this.timesasingSchemeDetial.name = ''
      }
      this.timesasingSchemeDetial.priceList = ret
      this.timesasingSchemeDetial.cfgId = this.cfgId
      this.showFormDom = true // 接口数据拿到之后再渲染表单的dom结构，防止报错
    },
    openDialog() {
      this.getPriceName()
      this.getTpcfgDetial()
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
