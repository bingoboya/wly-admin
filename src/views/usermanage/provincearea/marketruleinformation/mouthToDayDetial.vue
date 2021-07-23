<template>
  <!-- 月到日分解方案详情页 -->
  <el-dialog
    v-el-drag-dialog
    width="900px"
    destroy-on-close
    append-to-body
    title="考核规则月度方案详情"
    :visible.sync="dialogMouthToDayDetial.toggle"
    @open="openDialog"
    @closed="showFormDom = false"
  >
    <div>
      <el-form
        v-if="showFormDom"
        ref="ruleForm"
        :model="realFormDateDetial"
        :rules="rules"
        label-width="120px"
      >
        <div>
          <div class="toubu">
            <div>考核规则年度方案</div>
            <div>
              <el-button type="primary" @click="submitForm('ruleForm', 'add')">另存</el-button>
              <el-button v-if="this.$route.query.id !== &quot;&quot;" type="primary" @click="isEdit = false">编辑</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
              <el-button type="primary" @click="submitForm('ruleForm', 'select')">保存并选择</el-button>
              <el-button type="primary" @click="dialogMouthToDayDetial.toggle = false">取 消</el-button>
              <!-- <el-button type="primary" @click="$router.push('/usermanage/contractinformation/buycontract')">返回</el-button> -->
            </div>
          </div>
          <div>
            <div style="display:flex;">
              <el-form-item
                label="方案名称:"
                prop="name"
                :rules="[
                  { required: true, message: '请输入方案名称', trigger: 'change' },
                ]"
              >
                <el-input v-model="realFormDateDetial.name" width="100" />
              </el-form-item>
            </div>
          </div>
          <div class="toubu">超用考核</div>
          <div>
            <div style="display:flex;">
              <el-form-item label="是否有超用电价:" prop="overUseValid">
                <el-select
                  v-model="realFormDateDetial.overUseValid"
                  placeholder="是否有超用电价"
                  style="width: 100px"
                >
                  <el-option label="是" :value="1" />
                  <el-option label="否" :value="0" />
                </el-select>
              </el-form-item>
            </div>
            <div style="display:flex;">
              <div v-for="(item, index) in realFormDateDetial.overUsePriceList" :key="`${index}`">
                <!-- 超用电价: -->
                <el-form-item
                  :label="index === 0 ? '超用电价:' : ''"
                  :prop="`overUsePriceList[${index}].value`"
                  :rules="{
                    required: true,
                    message: '名称不能为空',
                    trigger: 'change',
                  }"
                >
                  <el-input v-model="item.value" style="margin-right:10px;" />
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="toubu">缺用考核</div>
          <div>
            <!-- <div>
              <div v-for="(item, index) in aa" :key="index" style="display:flex;">
                <el-form-item :label="`第${index}档阀值:`">
                  <el-input v-model="item.name" width="100" />
                </el-form-item>
              </div>
              <div style="display:flex;">
                <el-form-item label="第一档考核费用:" prop="sunWeight">
                  <div style="display:flex;">
                    <el-input v-model="realFormDateDetial.sunWeight" style="margin-right:10px;" />
                    <el-input v-model="realFormDateDetial.sunWeight" style="margin-right:10px;" />
                    <el-input v-model="realFormDateDetial.sunWeight" style="margin-right:10px;" />
                    <el-input v-model="realFormDateDetial.sunWeight" style="margin-right:10px;" />
                  </div>
                </el-form-item>
              </div>
            </div> -->
            <div style="display:flex;">
              <el-form-item label="第一档阀值:">
                <el-input v-model="realFormDateDetial.penaltyRatio1" width="100" />
              </el-form-item>
            </div>
            <div style="display:flex;">
              <div v-for="(item, index) in realFormDateDetial.penaltyFeePriceList1" :key="index">
                <el-form-item :label="index === 0 ? '第一档考核费用:' : ''">
                  <el-input v-model="item.value" width="100" />
                </el-form-item>
              </div>
            </div>
            <div style="display:flex;">
              <el-form-item label="第二档阀值:">
                <el-input v-model="realFormDateDetial.penaltyRatio2" width="100" />
              </el-form-item>
            </div>
            <div style="display:flex;">
              <div v-for="(item, index) in realFormDateDetial.penaltyFeePriceList2" :key="index">
                <el-form-item :label="index === 0 ? '第二档考核费用:' : ''">
                  <el-input v-model="item.value" width="100" />
                </el-form-item>
              </div>
            </div>
            <div v-if="realFormDateDetial.penaltyRatio3" style="display:flex;">
              <el-form-item label="第三档阀值:">
                <el-input v-model="realFormDateDetial.penaltyRatio3" width="100" />
              </el-form-item>
            </div>
            <div style="display:flex;">
              <div v-for="(item, index) in realFormDateDetial.penaltyFeePriceList3" :key="index">
                <el-form-item :label="index === 0 ? '第三档考核费用:' : ''">
                  <el-input v-model="item.value" width="100" />
                </el-form-item>
              </div>
            </div>
            <div v-if="realFormDateDetial.penaltyRatio4" style="display:flex;">
              <el-form-item label="第四档阀值:">
                <el-input v-model="realFormDateDetial.penaltyRatio4" width="100" />
              </el-form-item>
            </div>
            <div style="display:flex;">
              <div v-for="(item, index) in realFormDateDetial.penaltyFeePriceList4" :key="index">
                <el-form-item :label="index === 0 ? '第四档考核费用:' : ''">
                  <el-input v-model="item.value" width="100" />
                </el-form-item>
              </div>
            </div>
          </div>

          <div>
            <div style="display:flex;">
              <el-form-item label="创建时间">
                <el-date-picker
                  v-model="realFormDateDetial.createTime"
                  disabled
                  format="yyyy-MM-dd HH:mm:ss"
                  type="date"
                />
              </el-form-item>
              <el-form-item
                label="提报人"
                prop="presenter"
                :rules="{ required: true, message: '请输入提报人', trigger: 'blur' }"
              >
                <el-input
                  v-model="realFormDateDetial.presenter"
                  :disabled="this.$route.query.id !== ''"
                  style="width: 220px"
                  placeholder="请输入填报人"
                />
              </el-form-item>
            </div>
          </div>
        </div>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>
import request from '@/utils/request'
import elDragDialog from '@/components/Directive/el-drag-dialog'

export default {
  directives: { elDragDialog },
  props: {
    formDataDetial: {
      type: Object,
      default() {
        return {
          // createTime: new Date(), // 创建时间
          // presenter: '' // 填报人
        }
      }
    },
    dialogMouthToDayDetial: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      realFormDateDetial: {},
      showFormDom: false, // 接口数据拿到之后再渲染表单的dom结构，防止报错
      rules: {
        contractName: [
          { required: true, message: '请输入合同名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    saveFormDataDetial(val) {
      request({
        url: '/buy/mtod/detail/save',
        method: 'post',
        data: val
      }).then(res => {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        this.dialogMouthToDayDetial.toggle = false
      }).catch((error) => {
        console.log(error)
        this.$message.error('保存失败')
      })
    },
    submitForm(formName, type) {
      console.log('realFormDateDetial', this.realFormDateDetial)
      const copyData = JSON.parse(JSON.stringify(this.realFormDateDetial))
      copyData.overUsePriceList = copyData.overUsePriceList.map(item => item.value)
      if (copyData.penaltyFeePriceList1.length > 0) {
        copyData.penaltyFeePriceList1 = copyData.penaltyFeePriceList1.map(item => item.value)
      }
      if (copyData.penaltyFeePriceList2.length > 0) {
        copyData.penaltyFeePriceList2 = copyData.penaltyFeePriceList2.map(item => item.value)
      }
      if (copyData.penaltyFeePriceList3.length > 0) {
        copyData.penaltyFeePriceList3 = copyData.penaltyFeePriceList3.map(item => item.value)
      }
      if (copyData.penaltyFeePriceList4.length > 0) {
        copyData.penaltyFeePriceList4 = copyData.penaltyFeePriceList4.map(item => item.value)
      }
      console.log('realFormDateDetial---', copyData)
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     console.log('realFormDateDetial', this.realFormDateDetial)
      //     const ret = JSON.parse(JSON.stringify(this.realFormDateDetial))
      //     ret.monWeight = Number(ret.monWeight)
      //     ret.satWeight = Number(ret.satWeight)
      //     ret.sunWeight = Number(ret.sunWeight)
      //     ret.holiWeight = Number(ret.holiWeight)
      //     ret.holiworkweight = Number(ret.holiworkweight)
      //     this.saveFormDataDetial(ret)
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    },
    getTpcfgDetial() {
      const ret = JSON.parse(JSON.stringify(this.formDataDetial))
      // [{price: 56}, {price: 53}, {price: 57}]
      this.realFormDateDetial = ret
      this.showFormDom = true // 接口数据拿到之后再渲染表单的dom结构，防止报错
    },
    openDialog() {
      this.getTpcfgDetial()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.toubu {
  display: flex;
  justify-content: space-between;
  background: #ece9e9;
  align-items: center;
  margin-bottom: 10px;
  height: 32px;
}
.chart-wrapper {
  background: #fff;
  padding: 16px 16px 0;
}
</style>
