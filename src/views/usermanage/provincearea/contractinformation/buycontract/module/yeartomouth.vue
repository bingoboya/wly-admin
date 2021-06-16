<template>
  <!-- 分时方案详情页面弹窗 -->
  <!-- 打开分时方案详情页面弹窗 Dialog -->
  <div>
    <el-dialog
      @open="openDialogYtoM"
      title="购电合同-年到月分解方案页"
      :visible.sync="dialogYearToMouth.toggle"
      width="80%"
    >
      <el-form :model="yearToMonthDetail"
        ref="ruleForm"
        :rules="rules"
        label-width="120px"
      >
        <!-- #region -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="方案名称"
              :label-width="formLabelWidth"
              prop="name"
              :rules="[
                { required: true, message: '请输入方案名称', trigger: 'blur' },
              ]"
            >
              <el-input v-model="yearToMonthDetail.name" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="总电量(MWh)"
            :label-width="formLabelWidth"
            prop="totalElectricity"
            :rules="[
              { required: true, message: '请输入总电量（MWh）', trigger: 'blur' },
            ]"
          >
            <el-input disabled v-model="totalElectricity" autocomplete="off" />
          </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="输入方式选择">
            <el-switch
              active-text="电量"
              inactive-text="比例"
              :width="60"
              v-model="chooseStyle"
            />
          </el-form-item>
          </el-col>
        
          
          
          
        </el-row>

        <el-row :gutter="5">
          <el-col :span="8">
            <el-form-item
              label="1月份电量"
              :label-width="formLabelWidth"
              prop="m01"
              :rules="[
                { required: true, message: '请输入1月份电量', trigger: 'blur' },
              ]"
            >
              <el-input
                v-model="yearToMonthDetail.m01"
                autocomplete="off"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="2月份电量"
              :label-width="formLabelWidth"
              prop="m02"
              :rules="[
                { required: true, message: '请输入2月份电量', trigger: 'blur' },
              ]"
            >
              <el-input
                v-model="yearToMonthDetail.m02"
                autocomplete="off"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="3月份电量"
              :label-width="formLabelWidth"
              prop="m03"
              :rules="[
                { required: true, message: '请输入3月份电量', trigger: 'blur' },
              ]"
            >
              <el-input
                v-model="yearToMonthDetail.m03"
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
              :rules="[
                { required: true, message: '请输入4月份电量', trigger: 'blur' },
              ]"
            >
              <el-input
                v-model="yearToMonthDetail.m04"
                autocomplete="off"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="5月份电量"
              :label-width="formLabelWidth"
              prop="m05"
              :rules="[
                { required: true, message: '请输入5月份电量', trigger: 'blur' },
              ]"
            >
              <el-input
                v-model="yearToMonthDetail.m05"
                autocomplete="off"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="6月份电量"
              :label-width="formLabelWidth"
              prop="m06"
              :rules="[
                { required: true, message: '请输入6月份电量', trigger: 'blur' },
              ]"
            >
              <el-input
                v-model="yearToMonthDetail.m06"
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
              :rules="[
                { required: true, message: '请输入7月份电量', trigger: 'blur' },
              ]"
            >
              <el-input
                v-model="yearToMonthDetail.m07"
                autocomplete="off"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="8月份电量"
              :label-width="formLabelWidth"
              prop="m08"
              :rules="[
                { required: true, message: '请输入8月份电量', trigger: 'blur' },
              ]"
            >
              <el-input
                v-model="yearToMonthDetail.m08"
                autocomplete="off"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="9月份电量"
              :label-width="formLabelWidth"
              prop="m09"
              :rules="[
                { required: true, message: '请输入9月份电量', trigger: 'blur' },
              ]"
            >
              <el-input
                v-model="yearToMonthDetail.m09"
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
              :rules="[
                {
                  required: true,
                  message: '请输入10月份电量',
                  trigger: 'blur',
                },
              ]"
            >
              <el-input
                v-model="yearToMonthDetail.m10"
                autocomplete="off"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="11月份电量"
              :label-width="formLabelWidth"
              prop="m11"
              :rules="[
                {
                  required: true,
                  message: '请输入11月份电量',
                  trigger: 'blur',
                },
              ]"
            >
              <el-input
                v-model="yearToMonthDetail.m11"
                autocomplete="off"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="12月份电量"
              :label-width="formLabelWidth"
              prop="m12"
              :rules="[
                {
                  required: true,
                  message: '请输入12月份电量',
                  trigger: 'blur',
                },
              ]"
            >
              <el-input
                v-model="yearToMonthDetail.m12"
                autocomplete="off"
              />
            </el-form-item>
          </el-col>
        </el-row>
          <!-- #endregion -->
      </el-form>
      <div>
          <!-- <el-button type="primary" @click="submitForm('ruleForm')">另存</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">编辑</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">保存并选择</el-button> -->
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm')">另存</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">编辑</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">保存并选择</el-button>
        <el-button type="primary" @click="dialogYearToMouth.toggle = false">取 消</el-button>
        <!-- <el-button type="primary" @click="dialogYearToMouth.toggle = false"
          >确 定</el-button
        > -->
      </div>
    </el-dialog>
  </div>
</template>
<script>
import request from "@/utils/request";
export default {
  props: {
    dialogYearToMouth: {
      type: Object,
    },
    totalElectricity:{
      type: [String,Number]
    },
  },
  
  data() {
    return {
      chooseStyle: true,
      yearToMonthDetail: {},
      formLabelWidth: "120px",
      rules: {
        contractName: [
          { required: true, message: "请输入合同名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        startDate: [
          { required: true, message: "请输入起始时间", trigger: "change" },
        ],
      },
    };
  },
  
  methods: {
    saveYearToMonthDetail(val){
      request({
        url: "/buy/ytom/save",
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
    submitForm(formName) {
      let that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('yearToMonthDetail', that.yearToMonthDetail);
          that.saveYearToMonthDetail(that.yearToMonthDetail)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    openDialogYtoM(){
      this.getYearToMonthDetail()
    },
    getYearToMonthDetail() {
      //获取年到月分解曲线方案详情
      let id = 1;
      request({
        // id是在  /buy  接口处获取到的
        url: `/buy/ytom/${id}/detail`,
        method: "get",
      }).then((res) => {
        this.yearToMonthDetail = res;
        this.$set(this.yearToMonthDetail, 'totalElectricity', this.totalElectricity);
        // console.log(333333, this.yearToMonthDetail);
      });
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep .el-dialog__body {
  max-height: 500px;
  overflow: auto;
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
