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
  >
    <div>
      <el-form
        ref="ruleForm"
        :model="formDataDetial"
        :rules="rules"
        label-width="120px"
      >
        <div>
          <div class="toubu">
            <div>考核规则年度方案</div>
            <div>
              <el-button v-if="this.$route.query.id !== &quot;&quot;" type="primary" @click="isEdit = false">编辑</el-button>
              <el-button
                type="primary"
                @click="submitForm('ruleForm')"
              >保存</el-button>
              <!-- <el-button
                type="primary"
                @click="$router.push('/usermanage/contractinformation/buycontract')"
              >返回</el-button> -->
            </div>
          </div>
          <div>
            <div style="display:flex;">
              <el-form-item
                label="方案名称:"
                prop="name"
                :rules="[
                  { required: true, message: '请输入方案名称', trigger: 'blur' },
                ]"
              >
                <el-input v-model="formDataDetial.name" width="100" />
              </el-form-item>
            </div>
          </div>
          <div class="toubu">
            <div>超用考核</div>
          </div>
          <div>
            <div style="display:flex;">
              <el-form-item
                label="是否有超用电价:"
              >
                <el-input v-model="formDataDetial.name" width="100" />
              </el-form-item>
            </div>
            <div style="display:flex;">
              <el-form-item label="超用电价:" prop="sunWeight">
                <div style="display:flex;">
                  <el-input v-model="formDataDetial.sunWeight" style="margin-right:10px;" />
                  <el-input v-model="formDataDetial.sunWeight" style="margin-right:10px;" />
                  <el-input v-model="formDataDetial.sunWeight" style="margin-right:10px;" />
                  <el-input v-model="formDataDetial.sunWeight" style="margin-right:10px;" />
                </div>
              </el-form-item>
            </div>
          </div>
          <div class="toubu">
            <div>缺用考核</div>
          </div>
          <div>
            <div style="display:flex;">
              <el-form-item
                label="第一档阀值:"
              >
                <el-input v-model="formDataDetial.name" width="100" />
              </el-form-item>
            </div>
            <div style="display:flex;">
              <el-form-item label="第一档考核费用:" prop="sunWeight">
                <div style="display:flex;">
                  <el-input v-model="formDataDetial.sunWeight" style="margin-right:10px;" />
                  <el-input v-model="formDataDetial.sunWeight" style="margin-right:10px;" />
                  <el-input v-model="formDataDetial.sunWeight" style="margin-right:10px;" />
                  <el-input v-model="formDataDetial.sunWeight" style="margin-right:10px;" />
                </div>
              </el-form-item>
            </div>
            <div style="display:flex;">
              <el-form-item
                label="第二档阀值:"
              >
                <el-input v-model="formDataDetial.name" width="100" />
              </el-form-item>
            </div>
            <div style="display:flex;">
              <el-form-item label="第二档考核费用:" prop="sunWeight">
                <div style="display:flex;">
                  <el-input v-model="formDataDetial.sunWeight" style="margin-right:10px;" />
                  <el-input v-model="formDataDetial.sunWeight" style="margin-right:10px;" />
                  <el-input v-model="formDataDetial.sunWeight" style="margin-right:10px;" />
                  <el-input v-model="formDataDetial.sunWeight" style="margin-right:10px;" />
                </div>
              </el-form-item>
            </div>
            <div style="display:flex;">
              <el-form-item
                label="第三档阀值:"
              >
                <el-input v-model="formDataDetial.name" width="100" />
              </el-form-item>
            </div>
            <div style="display:flex;">
              <el-form-item label="第三档考核费用:" prop="sunWeight">
                <div style="display:flex;">
                  <el-input v-model="formDataDetial.sunWeight" style="margin-right:10px;" />
                  <el-input v-model="formDataDetial.sunWeight" style="margin-right:10px;" />
                  <el-input v-model="formDataDetial.sunWeight" style="margin-right:10px;" />
                  <el-input v-model="formDataDetial.sunWeight" style="margin-right:10px;" />
                </div>
              </el-form-item>
            </div>
            <div style="display:flex;">
              <el-form-item
                label="第四档阀值:"
              >
                <el-input v-model="formDataDetial.name" width="100" />
              </el-form-item>
            </div>
            <div style="display:flex;">
              <el-form-item label="第四档考核费用:" prop="sunWeight">
                <div style="display:flex;">
                  <el-input v-model="formDataDetial.sunWeight" style="margin-right:10px;" />
                  <el-input v-model="formDataDetial.sunWeight" style="margin-right:10px;" />
                  <el-input v-model="formDataDetial.sunWeight" style="margin-right:10px;" />
                  <el-input v-model="formDataDetial.sunWeight" style="margin-right:10px;" />
                </div>
              </el-form-item>
            </div>
          </div>
          <div>
            <div style="display:flex;">
              <el-form-item label="创建时间">
                <el-date-picker
                  v-model="formDataDetial.createTime"
                  disabled
                  format="yyyy-MM-dd HH:mm:ss"
                  type="date"
                />
              </el-form-item>
              <el-form-item
                label="提报人"
                prop="userSmallDTO"
                :rules="{ required: true, message: '请输入提报人', trigger: 'blur' }"
              >
                <el-input
                  v-model="formDataDetial.userSmallDTO"
                  :disabled="this.$route.query.id !== ''"
                  style="width: 220px"
                  placeholder="请输入填报人"
                />
              </el-form-item>
            </div>
          </div>
        </div>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm', 'add')">另存</el-button>
        <!-- <el-button type="primary" @click="submitForm('ruleForm')">编辑</el-button> -->
        <el-button type="primary" @click="submitForm('ruleForm', 'save')">保存</el-button>
        <el-button
          type="primary"
          @click="submitForm('ruleForm', 'select')"
        >保存并选择</el-button>
        <el-button type="primary" @click="dialogMouthToDayDetial.toggle = false">取 消</el-button>
        <!-- <el-button type="primary" @click="dialogMouthToDayBase.toggle = false"
          >确 定</el-button
        > -->
      </div>
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
          createTime: new Date(), // 创建时间
          userSmallDTO: '' // 填报人
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('formDataDetial', this.formDataDetial)
          const ret = JSON.parse(JSON.stringify(this.formDataDetial))
          ret.monWeight = Number(ret.monWeight)
          ret.satWeight = Number(ret.satWeight)
          ret.sunWeight = Number(ret.sunWeight)
          ret.holiWeight = Number(ret.holiWeight)
          ret.holiworkweight = Number(ret.holiworkweight)
          this.saveFormDataDetial(ret)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    openDialog() {
      console.log('打开月到日基础页面')
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
