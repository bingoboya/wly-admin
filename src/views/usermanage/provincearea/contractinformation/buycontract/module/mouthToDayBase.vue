<template>
  <!-- 分时方案详情页面弹窗 -->
  <!-- 打开分时方案详情页面弹窗 Dialog -->
  <el-dialog
    title="购电合同-月到日分时方案基本页"
    width="80%"
    @open="openDialog"
    :visible.sync="dialogMouthToDayBase.toggle"
  >
    <el-form :model="timesasingSchemeDetial"
        ref="ruleForm"
        :inline="true"
        :rules="rules"
        class="demo-form-inline"
    >
        <!-- #region -->

      <el-form-item
        label="方案名称"
        :label-width="formLabelWidth"
        prop="name"
        :rules="[
          { required: true, message: '请输入方案名称', trigger: 'blur' },
        ]"
      >
        <el-input v-model="timesasingSchemeDetial.name" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="总电量(MWh)"
        :label-width="formLabelWidth"
        prop="totalElectricity"
        :rules="[
          { required: true, message: '请输入总电量（MWh）', trigger: 'blur' },
        ]"
      >
        <el-input disabled
          v-model="totalElectricity"
          autocomplete="off"
        />
      </el-form-item>
      <el-row :gutter="5">
        <el-col :span="8">
          <el-form-item
            label="1月份电量"
            :label-width="formLabelWidth"
            prop="m01"
          >
            <el-input
              disabled
              v-model="timesasingSchemeDetial.m01"
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
              disabled
              v-model="timesasingSchemeDetial.m02"
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
              disabled
              v-model="timesasingSchemeDetial.m03"
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
              disabled
              v-model="timesasingSchemeDetial.m04"
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
              disabled
              v-model="timesasingSchemeDetial.m05"
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
              disabled
              v-model="timesasingSchemeDetial.m06"
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
              disabled
              v-model="timesasingSchemeDetial.m07"
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
              disabled
              v-model="timesasingSchemeDetial.m08"
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
              disabled
              v-model="timesasingSchemeDetial.m09"
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
              disabled
              v-model="timesasingSchemeDetial.m10"
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
              disabled
              v-model="timesasingSchemeDetial.m11"
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
              disabled
              v-model="timesasingSchemeDetial.m12"
              autocomplete="off"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item
            label="输入方式选择"
            :label-width="formLabelWidth"
            prop="chooseEntyType"
          >
            <el-radio-group v-model="chooseEntyType">
              <el-radio label="1">日历周-12个月统一</el-radio>
              <el-radio label="0">日历周-12个月单独</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-form-item label="全年统一方案：">
        <el-select
          v-model="timesasingSchemeDetial.planDTOList[0].planId"
          placeholder="全年统一方案："
        >
          <el-option label="浙江典型年度分解方案" :value="1" />
          <el-option label="广东典型年度分解方案" :value="2" />
          <el-option label="广东20年典型日权重1" :value="3" />
          <el-option label="新增自定义方案" :value="4" />
        </el-select>
        <el-button type="primary" @click="showDialogMToDay()"
          >查询/编辑/另存</el-button
        >
      </el-form-item>
      <el-form-item label="1月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.planDTOList[0].planId"
          placeholder="1月份方案："
        >
          <el-option
            v-for="item in decompositionScheme"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
          <el-option label="新增自定义方案" :value="999" />
        </el-select>
        <el-button type="primary" @click="showDialogMToDay(1)"
          >查询/编辑/另存</el-button
        >
      </el-form-item>
      <el-form-item label="2月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.planDTOList[1].planId"
          placeholder="2月份方案："
        >
          <el-option
            v-for="item in decompositionScheme"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
          <el-option label="新增自定义方案" :value="999" />
        </el-select>
        <el-button type="primary" @click="showDialogMToDay(2)"
          >查询/编辑/另存</el-button
        >
      </el-form-item>
      <el-form-item label="3月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.planDTOList[2].planId"
          placeholder="3月份方案："
        >
          <el-option
            v-for="item in decompositionScheme"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
          <el-option label="新增自定义方案" :value="999" />
        </el-select>
        <el-button type="primary" @click="showDialogMToDay(3)"
          >查询/编辑/另存</el-button
        >
      </el-form-item>
      <el-form-item label="4月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.planDTOList[3].planId"
          placeholder="4月份方案："
        >
          <el-option
            v-for="item in decompositionScheme"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
          <el-option label="新增自定义方案" :value="999" />
        </el-select>
        <el-button type="primary" @click="showDialogMToDay(4)"
          >查询/编辑/另存</el-button
        >
      </el-form-item>
      <el-form-item label="5月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.planDTOList[4].planId"
          placeholder="5月份方案："
        >
          <el-option
            v-for="item in decompositionScheme"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
          <el-option label="新增自定义方案" :value="999" />
        </el-select>
        <el-button type="primary" @click="showDialogMToDay(5)"
          >查询/编辑/另存</el-button
        >
      </el-form-item>
      <el-form-item label="6月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.planDTOList[5].planId"
          placeholder="6月份方案："
        >
          <el-option
            v-for="item in decompositionScheme"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
          <el-option label="新增自定义方案" :value="999" />
        </el-select>
        <el-button type="primary" @click="showDialogMToDay(6)"
          >查询/编辑/另存</el-button
        >
      </el-form-item>
      <el-form-item label="7月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.planDTOList[6].planId"
          placeholder="7月份方案："
        >
          <el-option
            v-for="item in decompositionScheme"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
          <el-option label="新增自定义方案" :value="999" />
        </el-select>
        <el-button type="primary" @click="showDialogMToDay(7)"
          >查询/编辑/另存</el-button
        >
      </el-form-item>
      <el-form-item label="8月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.planDTOList[7].planId"
          placeholder="8月份方案："
        >
          <el-option
            v-for="item in decompositionScheme"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
          <el-option label="新增自定义方案" :value="999" />
        </el-select>
        <el-button type="primary" @click="showDialogMToDay(8)"
          >查询/编辑/另存</el-button
        >
      </el-form-item>
      <el-form-item label="9月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.planDTOList[8].planId"
          placeholder="9月份方案："
        >
          <el-option
            v-for="item in decompositionScheme"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
          <el-option label="新增自定义方案" :value="999" />
        </el-select>
        <el-button type="primary" @click="showDialogMToDay(9)"
          >查询/编辑/另存</el-button
        >
      </el-form-item>
      <el-form-item label="10月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.planDTOList[9].planId"
          placeholder="10月份方案："
        >
          <el-option
            v-for="item in decompositionScheme"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
          <el-option label="新增自定义方案" :value="999" />
        </el-select>
        <el-button type="primary" @click="showDialogMToDay(10)"
          >查询/编辑/另存</el-button
        >
      </el-form-item>
      <el-form-item label="11月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.planDTOList[10].planId"
          placeholder="11月份方案："
        >
          <el-option
            v-for="item in decompositionScheme"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
          <el-option label="新增自定义方案" :value="999" />
        </el-select>
        <el-button type="primary" @click="showDialogMToDay(11)"
          >查询/编辑/另存</el-button
        >
      </el-form-item>
      <el-form-item label="12月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.planDTOList[11].planId"
          placeholder="12月份方案："
        >
          <el-option
            v-for="item in decompositionScheme"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
          <el-option label="新增自定义方案" :value="999" />
        </el-select>
        <el-button type="primary" @click="showDialogMToDay(12)"
          >查询/编辑/另存</el-button
        >
      </el-form-item>
      <!-- #endregion -->
    </el-form>
     <div>
          <el-button type="primary" @click="submitForm('ruleForm')">另存</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">编辑</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">保存并选择</el-button>
      </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogMouthToDayBase.toggle = false">取 消</el-button>
      <el-button type="primary" @click="dialogMouthToDayBase.toggle = false"
        >确 定</el-button
      >
    </div>
    <mouthToDayDetial :month='month'
      :formDataDetial='formDataDetial'
      :dayPropetieList='dayPropetieList'
      :tableData='tableData'
      :yearToMonPercentage1='yearToMonPercentage1'
      :yearToMonPercentage2='yearToMonPercentage2'
     :dialogMouthToDayDetial="dialogMouthToDayDetial" />
  </el-dialog>
</template>
<script>
import mouthToDayDetial from "./mouthToDayDetial";
import request from "@/utils/request";

export default {
  components: { mouthToDayDetial },
  props: {
    totalElectricity:{
      type: [String,Number]
    },
    dialogMouthToDayBase: {
      type: Object,
    },
    decompositionScheme: {
      type: Array,
    },
  },
  data() {
    return {
      month: '', //当前点击的是哪个月份后面的按钮
      chooseEntyType: "0",
      dialogMouthToDayDetial: { toggle: false },
      // 分时方案详情页面 -- 弹窗表单
      timesasingSchemeDetial: {
        dataType: "",
        id: "",
        m01: "",
        m02: "",
        m03: "",
        m04: "",
        m05: "",
        m06: "",
        m07: "",
        m08: "",
        m09: "",
        m10: "",
        m11: "",
        m12: "",
        name: "",
        planDTOList: [
          { month: "", planId: "", planName: "" },
          { month: "", planId: "", planName: "" },
          { month: "", planId: "", planName: "" },
          { month: "", planId: "", planName: "" },
          { month: "", planId: "", planName: "" },
          { month: "", planId: "", planName: "" },
          { month: "", planId: "", planName: "" },
          { month: "", planId: "", planName: "" },
          { month: "", planId: "", planName: "" },
          { month: "", planId: "", planName: "" },
          { month: "", planId: "", planName: "" },
          { month: "", planId: "", planName: "" },
        ],
      },
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

      formDataDetial: {},
      dayPropetieList: [],
      tableData: [{
          dateTypeEnName: "holiWeight",
          dateType: "节假日",
          weight: "",
        },
        {
          dateTypeEnName: "monWeight",
          dateType: "工作日",
          weight: "",
        },
        {
          dateTypeEnName: "satWeight",
          dateType: "星期六",
          weight: "",
        },
        {
          dateTypeEnName: "sunWeight",
          dateType: "星期日",
          weight: "",
        },
        {
          dateTypeEnName: "holiworkweight",
          dateType: "调休节假日",
          weight: "",
        }],
      yearToMonPercentage1: {
        //年到月比例
        persent: [
          {
            name: "百分比",
            list: [
              { key: "m01", persentVal: "" },
              { key: "m02", persentVal: "" },
              { key: "m03", persentVal: "" },
              { key: "m04", persentVal: "" },
              { key: "m05", persentVal: "" },
              { key: "m06", persentVal: "" },
            ],
          },
        ],
        mounthly: ["1月", "2月", "3月", "4月", "5月", "6月"],
      },
      yearToMonPercentage2: {
        persent: [
          {
            name: "百分比",
            list: [
              { key: "m07", persentVal: "" },
              { key: "m08", persentVal: "" },
              { key: "m09", persentVal: "" },
              { key: "m10", persentVal: "" },
              { key: "m11", persentVal: "" },
              { key: "m12", persentVal: "" },
            ],
          },
        ],
        mounthly: ["7月", "8月", "9月", "10月", "11月", "12月"],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('timesasingSchemeDetial', this.timesasingSchemeDetial);
          // alert('submit!');
        } else {
          console.log('error submit!!');
          console.log('timesasingSchemeDetial', this.timesasingSchemeDetial);
          return false;
        }
      });
    },
    async showDialogMToDay(month= 1){
      this.month = month
      await this.getMouthToDayDetail(month)
      await console.log('await 2');
      // this.dialogMouthToDayDetial.toggle = true
    },
    getMouthToDayDetail(month) {
      //获取月到日分解曲线方案详情页
      let contractId = 1;
      let mtodId = 1;
      request({
        // id是在  /buy  接口处获取到的 /buy/{contractId}/{mtodId}/detail
        url: `/buy/${month}/${mtodId}/detail?month=${month}`,
        method: "get",
      }).then((res) => {
        console.log("获取月到日分解曲线方案详情页-");
        this.formDataDetial = res.weightMtod;
        this.dayPropetieList = res.dayPropetieList;
        console.log('await 1', this.dayPropetieList.length);
        this.yearToMonPercentage1.persent[0].list.forEach(
          (item) => (item.persentVal = res.curveytom[item.key])
        );
        this.yearToMonPercentage2.persent[0].list.forEach(
          (item) => (item.persentVal = res.curveytom[item.key])
        );
        this.tableData.forEach((item) => {
          return (item.weight = res.weightMtod[item.dateTypeEnName]);
        });
      }).then(()=>{
        console.log('await 3', this.dayPropetieList.length);
        this.dialogMouthToDayDetial.toggle = true
      });
    },
    openDialog() {
      console.log("打开月到日基础页面");
      this.getMouthToDayBasic()
    },
    getMouthToDayBasic() {
      //获取月到日分解曲线方案基本页
      let id = 1;
      request({
        // id是在  /buy  接口处获取到的
        url: `/buy/mtod/${id}/basic`,
        method: "get",
      }).then((res) => {
        console.log(5555, res);
        this.timesasingSchemeDetial = res;
        this.$set(this.timesasingSchemeDetial, 'totalElectricity', this.totalElectricity)

      });
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-dialog__body {
  max-height: 500px;
  overflow: auto;
}
</style>
