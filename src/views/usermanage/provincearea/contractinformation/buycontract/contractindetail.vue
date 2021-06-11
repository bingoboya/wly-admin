<template>
  <div style="padding: 30px">
    <!-- <el-alert :closable="false" title="购电合同" type="warning" /> -->
    <div>
      <div style="display: flex;">
        <div>购电合同基本信息</div>
        <div>
          <el-button type="primary" @click="submitForm('ruleForm')">编辑</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <el-button type="primary" @click="$router.push('/usermanage/contractinformation/buycontract')">返回</el-button>
          <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        </div>
      </div>
      <el-form
        ref="ruleForm"
        :inline="true"
        :rules="rules"
        :model="buycontractinfo"
        class="demo-form-inline"
      >
      <!-- #region -->
        <el-row :gutter="5">
          <el-col :span="8">
            <el-form-item label="合同名称" prop="name">
              <el-input
                v-model="buycontractinfo.name"
                placeholder="请输入合同名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="机构名称" prop="meterInfoDTO">
              <el-select
                v-model="buycontractinfo.meterInfoDTO"
                placeholder="机构名称"
              >
                <el-option
                  v-for="item in meterNameList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="8">
            <el-form-item label="所属区域">
              <el-select
                v-model="buycontractinfo.gridDTO"
                placeholder="所属区域"
              >
                <el-option
                  v-for="item in gridList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="总电量" prop="totalElectricity">
              <el-input
                v-model="buycontractinfo.totalElectricity"
                placeholder="请输入总电量"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="8">
            <el-form-item label="价格类型">
              <el-select
                v-model="buycontractinfo.priceType"
                placeholder="价格类型"
              >
                <el-option label="绝对价" :value="0" />
                <el-option label="价差" :value="1" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否有分解曲线" prop="curveValid">
              <el-select
                v-model="buycontractinfo.curveValid"
                placeholder="是否有分解曲线"
              >
                <el-option label="是" :value="1" />
                <el-option label="否" :value="0" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="8">
            <el-form-item label="合同类型">
              <el-select
                v-model="buycontractinfo.contracttypeinfoDTO"
                placeholder="合同类型"
              >
                <el-option
                  v-for="item in buycontractinfo.contracttypeinfoList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否有分时比例" prop="timeofuseValid">
              <el-select
                v-model="buycontractinfo.timeofuseValid"
                placeholder="是否有分时比例"
              >
                <el-option label="是" :value="1" />
                <el-option label="否" :value="0" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="8">
            <el-form-item label="签署时间">
              <el-date-picker
                v-model="buycontractinfo.signDate"
                placeholder="请选择签署时间"
                format="yyyy-mm-dd HH:mm:ss"
                type="date"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建时间">
              <el-date-picker
                v-model="buycontractinfo.createTime"
                disabled
                format="yyyy-mm-dd HH:mm:ss"
                type="date"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="24">
            <el-form-item label="起止时间" prop="timeLine">
              <el-date-picker
                v-model="buycontractinfo.timeLine"
                @change="GetzhifuTime"
                :default-time="['00:00:00', '23:59:59']"
                unlink-panels
                type="daterange"
                format="yyyy-mm-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="24">
            <el-form-item label="合同价格">
              <div style="display: flex">
                <el-input
                  v-model="buycontractinfo.contractPrice"
                  style="padding-right: 10px"
                  placeholder="请输入合同价格"
                />
                <el-input
                  v-model="buycontractinfo.contractPrice"
                  placeholder="请输入合同价格"
                  style="padding-right: 10px"
                />
                <el-input
                  v-model="buycontractinfo.contractPrice"
                  placeholder="请输入合同价格"
                  style="padding-right: 10px"
                />
                <el-input
                  v-model="buycontractinfo.contractPrice"
                  placeholder="请输入合同价格"
                  style="padding-right: 10px"
                />
              </div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="12">
            <el-form-item label="分时方案">
              <el-select
                v-model="buycontractinfo.timeperiodofusecfgDTO"
                placeholder="分时方案"
              >
                <el-option
                  v-for="item in periodList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
                <el-option label="新增自定义方案" :value="999" />
              </el-select>
              <el-button
                type="primary"
                @click="showDialogFormVisible.toggle = true"
                >查询/编辑/另存</el-button
              >
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="填报人">
              <el-input
                v-model="buycontractinfo.userSmallDTO"
                disabled
                placeholder="请输入填报人"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <div style="display: flex; flex-direction: column">
          <div style="padding-top: 10px">分解曲线方案</div>
          <el-form-item label="年到月分解方案">
            <el-select
              v-model="buycontractinfo.curveytomDTO"
              placeholder="年到月分解方案"
            >
              <el-option
                v-for="item in yearToMonthPlan"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
              <el-option label="新增自定义方案" :value="999" />
            </el-select>
            <el-button type="primary" @click="dialogYearToMouth.toggle = true"
              >查询/编辑/另存</el-button
            >
          </el-form-item>
          <el-form-item label="月到日分解方案">
            <el-select
              v-model="buycontractinfo.weightsetyearlymtodDTO"
              placeholder="月到日分解方案"
            >
              <el-option
                v-for="item in monthToDayPlan"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
              <el-option label="新增自定义方案" :value="999" />
            </el-select>
            <el-button
              type="primary"
              @click="dialogMouthToDayBase.toggle = true"
              >查询/编辑/另存</el-button
            >
          </el-form-item>
          <el-form-item label="日分时分解方案">
            <el-select
              v-model="buycontractinfo.curvesetyearlydtopDTO"
              placeholder="日分时分解方案"
            >
              <el-option
                v-for="item in dayToHourPlan"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
              <el-option label="新增自定义方案" :value="999" />
            </el-select>
            <el-button type="primary" @click="dialogDayToHourBase.toggle = true"
              >查询/编辑/另存</el-button
            >
          </el-form-item>
        </div>
      <!-- #endregion -->
      </el-form>
    </div>
    <timesAsingScheme :showDialogFormVisible="showDialogFormVisible" />
    <yearToMouth :totalElectricity="buycontractinfo.totalElectricity" :dialogYearToMouth="dialogYearToMouth"/>
    <mouthToDayBase :totalElectricity="buycontractinfo.totalElectricity" :decompositionScheme="decompositionScheme"
      :dialogMouthToDayBase="dialogMouthToDayBase"/>
    <dayToHourBase :totalElectricity="buycontractinfo.totalElectricity" :dialogDayToHourBase="dialogDayToHourBase"/>
  </div>
</template>
<script>
import request from "@/utils/request";
import timesAsingScheme from "./module/timesasingscheme";
import yearToMouth from "./module/yeartomouth";
import mouthToDayBase from "./module/mouthToDayBase";
import dayToHourBase from "./module/dayToHourBase";
export default {
  components: { timesAsingScheme, yearToMouth, mouthToDayBase, dayToHourBase },

  data() {
    return {
      yearToMonthPlan: [], // 年到月
      monthToDayPlan: [], //月到日
      dayToHourPlan: [], //日到时
      decompositionScheme: [], //月到日基本页面内的--分解方案
      // 分时方案详情页面 -- 弹窗表单
      showDialogFormVisible: { toggle: false },
      // 年到月分时方案详情页面 -- 弹窗表单
      dialogYearToMouth: { toggle: false },
      // 月到日分时方案基础页面 -- 弹窗表单
      dialogMouthToDayBase: { toggle: false },
      // 日分时分时方案基础页面 -- 弹窗表单
      dialogDayToHourBase: { toggle: false },
      //
      contracttypeinfoList: [], //合同类型下拉
      saveBuycontractinfo: { // 提交的表单数据

      },
      buycontractinfo: {
        userSmallDTO: "", //填报人
        timeofuseValid: "", // 是否有分时比例
        contracttypeinfoDTO: "", // 合同类型
        curveValid: "", // 是否有分解曲线
        contractPrice: "", // 合同价格
        gridDTO: "", //所属区域
        meterInfoDTO: "", // 机构名称
        totalElectricity: "", // 总电量
        timeLine: "", //用来存放日期组件所选中的值
        signDate: "", // 签署时间
        name: "", // 合同名称
        priceType: "", // 价格类型
        timeperiodofusecfgDTO: "", // 分时方案
        createDate: "", // 创建时间
        curveytomDTO: "", // 年到月分解方案
        weightsetyearlymtodDTO: "", // 月到日分解方案
        curvesetyearlydtopDTO: "", // 日分时分解方案
      },
      meterNameList: [], //机构名称列表
      periodList: [], //获取分时方案列表
      gridList: [], // /buy/gridList 获取所属区域列表
      rules: {
        name: [{ required: true, message: "请输入合同名称", trigger: "blur" }],
        totalElectricity: [
          { required: true, message: "请输入总电量", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        meterInfoDTO: [
          { required: true, message: "请输入机构名称", trigger: "change" },
        ],
        timeLine: [
          { required: true, message: "请输入起始时间", trigger: "change" },
        ],
        timeofuseValid: [
          {
            required: true,
            message: "请选择是否有分时比例",
            trigger: "change",
          },
        ],
        curveValid: [
          {
            required: true,
            message: "请选择是否有分解曲线",
            trigger: "change",
          },
        ],
      },
    };
  },
  async created() {
    await this.getAgencyAll();
    await this.getGridList();
    await this.getPeriodList();
    await this.getPlanlist(0); // 年到月 下拉列表
    await this.getPlanlist(1); // 月到日 下拉列表
    await this.getPlanlist(2); // 日到时 下拉列表
    await this.getPlanlist(3); // 获取月分解方案（ppt 第8页）
    // 根据ID获取当前点击的合同的内容
    await this.getContractinDetail();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('buycontractinfo', this.buycontractinfo);
          // alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    GetzhifuTime() {
      //利用change事件监听表单内容变化，并将选中的值赋值给所需要的两个字段
      //支付时间戳设置
      // console.log(77777, this.buycontractinfo.timeLine)
      if (this.buycontractinfo != null) {
        this.buycontractinfo.startDate = this.buycontractinfo.timeLine[0];
        this.buycontractinfo.endDate = this.buycontractinfo.timeLine[1];
      }
    },
    getPlanlist(type) {
      //获取分解曲线方案列表
      request({
        url: `/buy/planlist?type=${type}`,
        method: "get",
      }).then((res) => {
        console.log("getPlanlist", res);
        if (type == 0) {
          this.yearToMonthPlan = res;
        }
        if (type == 1) {
          this.monthToDayPlan = res;
        }
        if (type == 2) {
          this.dayToHourPlan = res;
        }
        if (type == 3) {
          this.decompositionScheme = res;
        }
      });
    },
    getContractinDetail() {
      request({
        url: "/buy/1/detail",
        method: "get",
      }).then((res) => {
        this.buycontractinfo = res;
        // this.contracttypeinfoList = res.contracttypeinfoList
        this.buycontractinfo.curveytomDTO = res.curveytomDTO.id; //年到月分解方案
        this.buycontractinfo.weightsetyearlymtodDTO =
          res.weightsetyearlymtodDTO.id; //月到日分解方案
        this.buycontractinfo.curvesetyearlydtopDTO =
          res.curvesetyearlydtopDTO.id; //日分时分解方案
        this.buycontractinfo.contracttypeinfoDTO = res.contracttypeinfoDTO.id; //设置合同类型id
        this.buycontractinfo.meterInfoDTO = res.meterInfoDTO.id; //设置机构名称id
        this.buycontractinfo.gridDTO = res.gridDTO.id; //设置所属区域id
        this.buycontractinfo.userSmallDTO = res.userSmallDTO.name; //设置填报人
        //日期区间回显
        this.$set(this.buycontractinfo, "timeLine", [
          res.startDate,
          res.endDate,
        ]);
        this.buycontractinfo.timeperiodofusecfgDTO =
          res.timeperiodofusecfgDTO.id; //合同名称
      });
    },
    getAgencyAll() {
      //获取机构名称列表
      request({
        url: "/buy/agencyAll",
        method: "get",
      }).then((res) => {
        this.meterNameList = res;
      });
    },
    getPeriodList() {
      //获取分时方案列表
      request({
        url: "/buy/periodlist",
        method: "get",
      }).then((res) => {
        this.periodList = res;
      });
    },
    getGridList() {
      //获取所属区域列表
      request({
        url: "/buy/gridList",
        method: "get",
      }).then((res) => {
        this.gridList = res;
      });
    },
    changeDialogYearToMouth(val) {
      this.dialogYearToMouth.toggle = false;
    },
    changeDialogMouthToDayBase(val) {
      this.dialogMouthToDayBase.toggle = false;
    },
    changeDialogDayToHourBase(val) {
      this.dialogDayToHourBase.toggle = false;
    },
    changeDialogForm(val) {
      this.showDialogFormVisible.toggle = false;
    },
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>
<style lang="scss" scope>
.el-range-editor.el-input__inner {
  width: 400px;
}
.el-row {
  /* margin-bottom: 20px; */
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>