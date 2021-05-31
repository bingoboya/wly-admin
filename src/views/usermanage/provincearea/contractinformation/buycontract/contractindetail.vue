<template>
  <div style="padding: 30px">
    <!-- <el-alert :closable="false" title="购电合同" type="warning" /> -->
    购电合同-详情页面
    <div>
      <div>购电合同基本信息</div>
      <el-form
        ref="ruleForm"
        :inline="true"
        :rules="rules"
        :model="buycontractinfo"
        class="demo-form-inline"
      >
        <el-form-item label="合同名称" prop="contractName">
          <el-input
            v-model="buycontractinfo.contractName"
            placeholder="请输入合同名称"
          />
        </el-form-item>
        <el-form-item label="机构名称" prop="name">
          <el-select v-model="buycontractinfo.name" placeholder="机构名称">
            <el-option
              v-for="item in orgName"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="起始时间" prop="startDate">
          <el-select v-model="buycontractinfo.startDate" placeholder="起始时间">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="总电量" prop="totalElectricity">
          <el-select
            v-model="buycontractinfo.totalElectricity"
            placeholder="总电量"
          >
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="是否有分时比例" prop="timeofuseValid">
          <el-select
            v-model="buycontractinfo.timeofuseValid"
            placeholder="是否有分时比例"
          >
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="价格类型">
          <el-select v-model="buycontractinfo.priceType" placeholder="价格类型">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="合同价格">
          <el-select
            v-model="buycontractinfo.contractPrice"
            placeholder="合同价格"
          >
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="是否有分解曲线" prop="curveValid">
          <el-select
            v-model="buycontractinfo.curveValid"
            placeholder="是否有分解曲线"
          >
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="填报人（灰色）">
          <el-select
            v-model="buycontractinfo.userName"
            placeholder="填报人（灰色）"
          >
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="合同类型">
          <el-select
            v-model="buycontractinfo.contractType"
            placeholder="合同类型"
          >
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-select v-model="buycontractinfo.endDate" placeholder="结束时间">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="分时方案">
          <el-select
            v-model="buycontractinfo.timesasingScheme"
            placeholder="分时方案"
          >
            <el-option label="浙江典型年度分解方案" value="zhejiang" />
            <el-option label="广东典型年度分解方案" value="guangdong" />
            <el-option label="四川典型年度分解方案" value="sichuan" />
            <el-option label="新增自定义方案" value="xinzeng" />
          </el-select>
          <el-button type="primary" @click="showDialogFormVisible.toggle = true"
            >查询/编辑/另存</el-button
          >
        </el-form-item>
        <el-form-item label="创建时间（灰色）">
          <el-select
            v-model="buycontractinfo.createDate"
            placeholder="创建时间（灰色）"
          >
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="所属区域">
          <el-select
            v-model="buycontractinfo.belongRegion"
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
        <el-form-item label="签署时间">
          <el-select v-model="buycontractinfo.signTime" placeholder="签署时间">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <div style="padding-top: 50px">分解曲线方案</div>
        <el-form-item label="年到月分解方案">
          <el-select
            v-model="buycontractinfo.yearToMouth"
            placeholder="年到月分解方案"
          >
            <el-option label="浙江典型年度分解方案" value="zhejiang" />
            <el-option label="广东典型年度分解方案" value="guangdong" />
            <el-option label="四川典型年度分解方案" value="sichuan" />
            <el-option label="新增自定义方案" value="xinzeng" />
          </el-select>
          <el-button type="primary" @click="dialogYearToMouth.toggle = true"
            >查询/编辑/另存</el-button
          >
        </el-form-item>
        <el-form-item label="月到日分解方案">
          <el-select
            v-model="buycontractinfo.mouthToDay"
            placeholder="月到日分解方案"
          >
            <el-option label="浙江典型年度分解方案" value="zhejiang" />
            <el-option label="广东典型年度分解方案" value="guangdong" />
            <el-option label="四川典型年度分解方案" value="sichuan" />
            <el-option label="新增自定义方案" value="xinzeng" />
          </el-select>
          <el-button type="primary" @click="dialogMouthToDayBase.toggle = true"
            >查询/编辑/另存</el-button
          >
        </el-form-item>
        <el-form-item label="日分时分解方案">
          <el-select
            v-model="buycontractinfo.dayToMin"
            placeholder="日分时分解方案"
          >
            <el-option label="浙江典型年度分解方案" value="zhejiang" />
            <el-option label="广东典型年度分解方案" value="guangdong" />
            <el-option label="四川典型年度分解方案" value="sichuan" />
            <el-option label="新增自定义方案" value="xinzeng" />
          </el-select>
          <el-button type="primary" @click="dialogDayToHourBase.toggle = true"
            >查询/编辑/另存</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <timesAsingScheme
      :showDialogFormVisible="showDialogFormVisible"
    ></timesAsingScheme>
    <yearToMouth :dialogYearToMouth="dialogYearToMouth"></yearToMouth>
    <mouthToDayBase
      :dialogMouthToDayBase="dialogMouthToDayBase"
    ></mouthToDayBase>
    <dayToHourBase :dialogDayToHourBase="dialogDayToHourBase"></dayToHourBase>
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
      // 分时方案详情页面 -- 弹窗表单
      showDialogFormVisible: { toggle: false },
      // 年到月分时方案详情页面 -- 弹窗表单
      dialogYearToMouth: { toggle: false },
      // 月到日分时方案基础页面 -- 弹窗表单
      dialogMouthToDayBase: { toggle: false },
      // 日分时分时方案基础页面 -- 弹窗表单
      dialogDayToHourBase: { toggle: false },
      //
      buycontractinfo: {
        curveValid: "", // 是否有分解曲线
        contractPrice: "", // 合同价格
        contractType: "", // 合同类型
        startDate: "", // 起始时间
        endDate: "", // 结束时间
        signTime: "", // 签署时间
        name: "", // 机构名称
        totalElectricity: "", // 总电量
        timeofuseValid: "", // 是否有分时比例
        userName: "", // 填报人
        timesasingScheme: "", // 分时方案
        belongRegion: "", // 所属区域
        createDate: "", // 创建时间
        contractName: "", // 合同名称
        priceType: "", // 价格类型
        yearToMouth: "", // 年到月分解方案
        mouthToDay: "", // 月到日分解方案
        dayToMin: "", // 日分时分解方案
      },
      orgName: [], //机构名称列表
      gridList: [], // /buy/gridList 获取所属区域列表
      rules: {
        contractName: [
          { required: true, message: "请输入合同名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        totalElectricity: [
          { required: true, message: "请输入总电量", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        name: [
          { required: true, message: "请输入机构名称", trigger: "change" },
        ],
        startDate: [
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
  created() {
    this.getMenusTree();
    this.getMenusTree();
  },
  methods: {
    getMenusTree() {
      //获取机构名称列表
      request({
        url: "/buy/agencyAll",
        method: "get",
      }).then((res) => {
        this.orgName = res;
      });
    },
    getMenusTree() {
      //获取所属区域列表
      request({
        url: "/buy/gridList",
        method: "get",
      }).then((res) => {
        this.gridList = res;
        console.log(33, res);
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
