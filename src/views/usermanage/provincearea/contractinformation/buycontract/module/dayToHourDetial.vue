<template>
  <!-- 分时方案详情页面弹窗 -->
  <!-- 打开分时方案详情页面弹窗 Dialog -->
  <el-dialog width="80%" @open="openDialog" append-to-body title="购电合同-日分时详情页面" :visible.sync="dialogDayToHourDetial.toggle">
    <div>日分时分解方案 1 月</div>
    <el-form :model="dayToHourDetail"
      ref="ruleForm"
      :inline="true"
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
        <el-input v-model="dayToHourDetail.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="工作日曲线:" :label-width="formLabelWidth" prop="shiduanCount">
        <el-select v-model="dayToHourDetail.friCurID" clearable placeholder="请选择活动区域">
          <el-option v-for="item in dayToHourDropList" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
        <el-button type="primary" @click="dialogDayToHourCurve.toggle = true">查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="周六曲线:" :label-width="formLabelWidth" prop="shiduanCount">
        <el-select v-model="dayToHourDetail.satCurID" clearable placeholder="请选择活动区域">
          <el-option v-for="item in dayToHourDropList" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
        <el-button type="primary" @click="dialogDayToHourCurve.toggle = true">查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="周日曲线:" :label-width="formLabelWidth" prop="shiduanCount">
        <el-select v-model="dayToHourDetail.sunCurID" clearable placeholder="请选择活动区域">
          <el-option v-for="item in dayToHourDropList" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
        <el-button type="primary" @click="dialogDayToHourCurve.toggle = true">查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="法定节假日曲线:" :label-width="formLabelWidth" prop="shiduanCount">
        <el-select v-model="dayToHourDetail.holiCurID" clearable placeholder="请选择活动区域">
          <el-option v-for="item in dayToHourDropList" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
        <el-button type="primary" @click="dialogDayToHourCurve.toggle = true">查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="调休节假日曲线:" :label-width="formLabelWidth" prop="shiduanCount">
        <el-select v-model="dayToHourDetail.holiWorkCurID" clearable placeholder="请选择活动区域">
          <el-option v-for="item in dayToHourDropList" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
        <el-button type="primary" @click="dialogDayToHourCurve.toggle = true">查询/编辑/另存</el-button>
      </el-form-item>
      
    </el-form>
    <div>
      <el-button type="primary" @click="submitForm('ruleForm')">另存</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">编辑</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">保存并选择</el-button>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogDayToHourDetial.toggle = false">取 消</el-button>
      <el-button type="primary" @click="dialogDayToHourDetial.toggle = false"
        >确 定</el-button
      >
    </div>
    <dayToHourCurve :dialogDayToHourCurve='dialogDayToHourCurve' />
  </el-dialog>
</template>
<script>
import request from "@/utils/request";
import dayToHourCurve from './dayToHourCurve'
export default {
  components:{dayToHourCurve},
  props: {
    dialogDayToHourDetial: {
      type: Object,
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("dayToHourDetail", this.dayToHourDetail);
          // alert('submit!');
        } else {
          console.log("error submit!!");
          console.log("dayToHourDetail", this.dayToHourDetail);
          return false;
        }
      });
    },
    async openDialog(){
      await this.getDayToHourDropList()
      await this.getDayToHourDetail()
    },
     getDayToHourDetail(month) {
      //  获取日分时分解曲线方案详情页
      let id = 2;
      request({
        // id是在  /buy  接口处获取到的 /buy/{contractId}/{mtodId}/detail
        url: `/buy/dtop/${id}/detail`,
        method: "get",
      }).then((res) => {
        this.dayToHourDetail = res
      });
    },
     getDayToHourDropList() {
       // 获取日分时分解曲线下拉列表
      request({
        // id是在  /buy  接口处获取到的 /buy/{contractId}/{mtodId}/detail
        url: `/buy/dtop/list`,
        method: "get",
      }).then((res) => {
        this.dayToHourDropList = res
      });
    },
  },
  data() {
    return {
      dayToHourDropList: [],
      dialogDayToHourCurve: {toggle: false},
      // 分时方案详情页面 -- 弹窗表单
      dayToHourDetail: {},
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
<style lang="scss" scoped>
::v-deep .el-dialog__body {
  max-height: 500px;
  overflow: auto;
}
</style>