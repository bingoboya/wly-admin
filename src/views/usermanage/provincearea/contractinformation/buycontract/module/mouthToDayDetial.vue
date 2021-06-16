<template>
  <!-- 月到日分解方案详情页 -->
  <el-dialog
    width="80%"
    destroy-on-close
    v-el-drag-dialog
    @open="openDialog"
    append-to-body
    :title="`购电合同-月到日分解方案-${month}月详情页`"
    :visible.sync="dialogMouthToDayDetial.toggle"
  >
    <el-form
      :model="formDataDetial"
      ref="ruleForm"
      :rules="rules"
      label-width="120px"
    >
      <div>
        <div style="display:flex;">
          <el-form-item
            label="方案名称:"
            prop="name"
            :rules="[
              { required: true, message: '请输入方案名称', trigger: 'blur' },
            ]"
          >
            <el-input width="100" v-model="formDataDetial.name" />
          </el-form-item>
          <el-form-item label="工作日权重:" prop="monWeight">
            <el-input v-model="formDataDetial.monWeight" />
          </el-form-item>
          <el-form-item label="周六权重:" prop="satWeight">
            <el-input v-model="formDataDetial.satWeight" />
          </el-form-item>
        </div>
        <div style="display:flex;">
          <el-form-item label="周日权重:" prop="sunWeight">
            <el-input v-model="formDataDetial.sunWeight" />
          </el-form-item>
          <el-form-item label="法定节假日权重:" prop="holiWeight">
            <el-input v-model="formDataDetial.holiWeight" />
          </el-form-item>
          <el-form-item label="调休节假日权重:" prop="holiworkweight">
            <el-input v-model="formDataDetial.holiworkweight" />
          </el-form-item>
        </div>
      </div>
    </el-form>
    <!-- 图表模块 -->
    <div>
      <div>
        <p>2021年分月比例(100%)</p>
        <el-table
          :data="yearToMonPercentage1.persent"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="name"
            width="150"
            align="center"
            label="月份"
            fixed
          >
          </el-table-column>
          <template v-for="(col, i) in yearToMonPercentage1.mounthly">
            <el-table-column
              :show-overflow-tooltip="true"
              :label="col"
              :key="col"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.row.list[i].persentVal }}
              </template>
            </el-table-column>
          </template>
        </el-table>
        <el-table
          :data="yearToMonPercentage2.persent"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="name"
            width="150"
            align="center"
            label="月份"
            fixed
          >
          </el-table-column>
          <template v-for="(col, i) in yearToMonPercentage2.mounthly">
            <el-table-column
              :show-overflow-tooltip="true"
              :label="col"
              :key="col"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.row.list[i].persentVal }}
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>
      <div>
        月分日曲线
        <div style="display: flex; justify-content: space-around">
          <div>
            <p>5月分日比例(32.34%)</p>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="dateType" label="日期类型" />
              <el-table-column prop="weight" label="权重" />
            </el-table>
          </div>
          <div>
            <p>5月--日历</p>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="dateType" label="日期类型" />
              <el-table-column prop="weight" label="权重" />
            </el-table>
          </div>
        </div>

        <div style="width=100%;">
          <p>月分日曲线图</p>
          <el-row style="background: #fff; padding: 16px 16px 0">
            <div class="chart-wrapper">
              <categoryEcharts :dayPropetieList="dayPropetieList" />
            </div>
          </el-row>
        </div>
      </div>
    </div>
    <div>
      <!-- <el-button type="primary" @click="submitForm('ruleForm')">另存</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">编辑</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')"
        >保存并选择</el-button
      > -->
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm('ruleForm')">另存</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">编辑</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')"
        >保存并选择</el-button
      >
      <el-button type="primary" @click="dialogMouthToDayBase.toggle = false">取 消</el-button>
      <!-- <el-button type="primary" @click="dialogMouthToDayBase.toggle = false"
        >确 定</el-button
      > -->
    </div>
  </el-dialog>
</template>
<script>
import request from "@/utils/request";
import categoryEcharts from "../categoryEcharts";
import elDragDialog from '@/components/Directive/el-drag-dialog'

export default {
  directives: { elDragDialog },
  methods: {
    saveFormDataDetial(val){
      request({
        url: "/buy/mtod/detail/save",
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("formDataDetial", this.formDataDetial);
          this.saveFormDataDetial(this.formDataDetial)
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    openDialog() {
      console.log("打开月到日基础页面");
      // this.getMouthToDayDetail(this.month);
    },
    // #region
    // getMouthToDayDetail(month) {
    //   //获取月到日分解曲线方案详情页
    //   let contractId = 1;
    //   let mtodId = 1;
    //   request({
    //     // id是在  /buy  接口处获取到的 /buy/{contractId}/{mtodId}/detail
    //     url: `/buy/${month}/${mtodId}/detail?month=${month}`,
    //     method: "get",
    //   }).then((res) => {
    //     console.log("获取月到日分解曲线方案详情页-", res);
    //     this.formDataDetial = res.weightMtod;
    //     this.dayPropetieList = res.dayPropetieList;
    //     const curveytom = res.curveytom;
    //     this.yearToMonPercentage1.persent[0].list.forEach(
    //       (item) => (item.persentVal = curveytom[item.key])
    //     );
    //     this.yearToMonPercentage2.persent[0].list.forEach(
    //       (item) => (item.persentVal = curveytom[item.key])
    //     );
    //     this.tableData.forEach((item) => {
    //       return (item.weight = res.weightMtod[item.dateTypeEnName]);
    //     });
    //   });
    // },
    // #endregion
  },
  data() {
    return {
      // dayPropetieList: [], //月分时折线图数据
      // yearToMonPercentage1: {
      //   //年到月比例
      //   persent: [
      //     {
      //       name: "百分比",
      //       list: [
      //         { key: "m01", persentVal: "" },
      //         { key: "m02", persentVal: "" },
      //         { key: "m03", persentVal: "" },
      //         { key: "m04", persentVal: "" },
      //         { key: "m05", persentVal: "" },
      //         { key: "m06", persentVal: "" },
      //       ],
      //     },
      //   ],
      //   mounthly: ["1月", "2月", "3月", "4月", "5月", "6月"],
      // },
      // yearToMonPercentage2: {
      //   persent: [
      //     {
      //       name: "百分比",
      //       list: [
      //         { key: "m07", persentVal: "" },
      //         { key: "m08", persentVal: "" },
      //         { key: "m09", persentVal: "" },
      //         { key: "m10", persentVal: "" },
      //         { key: "m11", persentVal: "" },
      //         { key: "m12", persentVal: "" },
      //       ],
      //     },
      //   ],
      //   mounthly: ["7月", "8月", "9月", "10月", "11月", "12月"],
      // },
      // tableData: [
      //   {
      //     dateTypeEnName: "holiWeight",
      //     dateType: "节假日",
      //     weight: "",
      //   },
      //   {
      //     dateTypeEnName: "monWeight",
      //     dateType: "工作日",
      //     weight: "",
      //   },
      //   {
      //     dateTypeEnName: "satWeight",
      //     dateType: "星期六",
      //     weight: "",
      //   },
      //   {
      //     dateTypeEnName: "sunWeight",
      //     dateType: "星期日",
      //     weight: "",
      //   },
      //   {
      //     dateTypeEnName: "holiworkweight",
      //     dateType: "调休节假日",
      //     weight: "",
      //   },
      // ],
      // // 分时方案详情页面 -- 弹窗表单
      // formDataDetial: {},
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
  
  components: {
    categoryEcharts,
  },
  props: {
    formDataDetial: {
      type: Object,
    },
    yearToMonPercentage1: {
      type: Object,
    },
    yearToMonPercentage2: {
      type: Object,
    },
    dayPropetieList: {
      type: Array,
    },
    tableData: {
      type: Array,
    },
    dialogMouthToDayDetial: {
      type: Object,
    },
    month: {
      type: [Number, String],
    },
  },
  created() {
    console.log("月到日分解方案详情页");
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.chart-wrapper {
  background: #fff;
  padding: 16px 16px 0;
}
</style>