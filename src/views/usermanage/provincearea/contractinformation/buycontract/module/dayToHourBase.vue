<template>
  <!-- 分时方案详情页面弹窗 -->
  <!-- 打开分时方案详情页面弹窗 Dialog -->
  <el-dialog
    width="80%"
    @open="openDialog"
    title="购电合同-日分时分解方案基础页"
    :visible.sync="dialogDayToHourBase.toggle"
  >
    <el-form :model="timesasingSchemeDetial" label-width="120px">
      <el-row :gutter="5">
        <el-col :span="8">
          <el-form-item
            label="方案名称"
            :label-width="formLabelWidth"
            prop="name"
            :rules="[
              { required: true, message: '请输入方案名称', trigger: 'blur' },
            ]"
          >
            <el-input
              v-model="timesasingSchemeDetial.name"
              autocomplete="off"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="总电量(MWh)"
            :label-width="formLabelWidth"
            prop="totalElic"
            :rules="[
              {
                required: true,
                message: '请输入总电量（MWh）',
                trigger: 'blur',
              },
            ]"
          >
            <el-input disabled v-model="totalElectricity" autocomplete="off" />
          </el-form-item>
        </el-col>
      </el-row>

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
      <!-- 请选择输入方式 -->
      <el-form-item
        label="输入方式选择"
        :label-width="formLabelWidth"
        prop="chooseEntyType"
        :rules="[
          { required: true, message: '请输入12月份电量', trigger: 'blur' },
        ]"
      >
        <el-radio-group v-model="chooseEntyType">
          <el-radio label="1">日历周-12个月统一</el-radio>
          <el-radio label="0">日历周-12个月单独</el-radio>
        </el-radio-group>
      </el-form-item>

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
        <el-button type="primary" @click="dialogDayToHourDetial.toggle = true"
          >查询/编辑/另存</el-button
        >
      </el-form-item>
      <el-form-item label="1月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.planDTOList[0].planId"
          placeholder="1月份方案："
        >
          <el-option label="浙江典型年度分解方案" :value="1" />
          <el-option label="广东典型年度分解方案" :value="2" />
          <el-option label="广东20年典型日权重1" :value="3" />
          <el-option label="新增自定义方案" :value="4" />
        </el-select>
        <el-button type="primary" @click="dialogDayToHourDetial.toggle = true"
          >查询/编辑/另存</el-button
        >
      </el-form-item>
      <el-form-item label="2月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.planDTOList[1].planId"
          placeholder="2月份方案："
        >
          <el-option label="浙江典型年度分解方案" :value="1" />
          <el-option label="广东典型年度分解方案" :value="2" />
          <el-option label="广东20年典型日权重1" :value="3" />
          <el-option label="新增自定义方案" :value="4" />
        </el-select>
        <el-button type="primary" @click="dialogDayToHourDetial.toggle = true"
          >查询/编辑/另存</el-button
        >
      </el-form-item>
      <el-form-item label="3月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.planDTOList[2].planId"
          placeholder="3月份方案："
        >
          <el-option label="浙江典型年度分解方案" :value="1" />
          <el-option label="广东典型年度分解方案" :value="2" />
          <el-option label="广东20年典型日权重1" :value="3" />
          <el-option label="新增自定义方案" :value="4" />
        </el-select>
        <el-button type="primary" @click="dialogDayToHourDetial.toggle = true"
          >查询/编辑/另存</el-button
        >
      </el-form-item>
      <el-form-item label="4月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.planDTOList[3].planId"
          placeholder="4月份方案："
        >
          <el-option label="浙江典型年度分解方案" :value="1" />
          <el-option label="广东典型年度分解方案" :value="2" />
          <el-option label="广东20年典型日权重1" :value="3" />
          <el-option label="新增自定义方案" :value="4" />
        </el-select>
        <el-button type="primary" @click="dialogDayToHourDetial.toggle = true"
          >查询/编辑/另存</el-button
        >
      </el-form-item>
      <el-form-item label="5月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.planDTOList[4].planId"
          placeholder="5月份方案："
        >
          <el-option label="浙江典型年度分解方案" :value="1" />
          <el-option label="广东典型年度分解方案" :value="2" />
          <el-option label="广东20年典型日权重1" :value="3" />
          <el-option label="新增自定义方案" :value="4" />
        </el-select>
        <el-button type="primary" @click="dialogDayToHourDetial.toggle = true"
          >查询/编辑/另存</el-button
        >
      </el-form-item>
      <el-form-item label="6月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.planDTOList[5].planId"
          placeholder="6月份方案："
        >
          <el-option label="浙江典型年度分解方案" :value="1" />
          <el-option label="广东典型年度分解方案" :value="2" />
          <el-option label="广东20年典型日权重1" :value="3" />
          <el-option label="新增自定义方案" :value="4" />
        </el-select>
        <el-button type="primary" @click="dialogDayToHourDetial.toggle = true"
          >查询/编辑/另存</el-button
        >
      </el-form-item>
      <el-form-item label="7月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.planDTOList[6].planId"
          placeholder="7月份方案："
        >
          <el-option label="浙江典型年度分解方案" :value="1" />
          <el-option label="广东典型年度分解方案" :value="2" />
          <el-option label="广东20年典型日权重1" :value="3" />
          <el-option label="新增自定义方案" :value="4" />
        </el-select>
        <el-button type="primary" @click="dialogDayToHourDetial.toggle = true"
          >查询/编辑/另存</el-button
        >
      </el-form-item>
      <el-form-item label="8月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.planDTOList[7].planId"
          placeholder="8月份方案："
        >
          <el-option label="浙江典型年度分解方案" :value="1" />
          <el-option label="广东典型年度分解方案" :value="2" />
          <el-option label="广东20年典型日权重1" :value="3" />
          <el-option label="新增自定义方案" :value="4" />
        </el-select>
        <el-button type="primary" @click="dialogDayToHourDetial.toggle = true"
          >查询/编辑/另存</el-button
        >
      </el-form-item>
      <el-form-item label="9月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.planDTOList[8].planId"
          placeholder="9月份方案："
        >
          <el-option label="浙江典型年度分解方案" :value="1" />
          <el-option label="广东典型年度分解方案" :value="2" />
          <el-option label="广东20年典型日权重1" :value="3" />
          <el-option label="新增自定义方案" :value="4" />
        </el-select>
        <el-button type="primary" @click="dialogDayToHourDetial.toggle = true"
          >查询/编辑/另存</el-button
        >
      </el-form-item>
      <el-form-item label="10月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.planDTOList[9].planId"
          placeholder="10月份方案："
        >
          <el-option label="浙江典型年度分解方案" :value="1" />
          <el-option label="广东典型年度分解方案" :value="2" />
          <el-option label="广东20年典型日权重1" :value="3" />
          <el-option label="新增自定义方案" :value="4" />
        </el-select>
        <el-button type="primary" @click="dialogDayToHourDetial.toggle = true"
          >查询/编辑/另存</el-button
        >
      </el-form-item>
      <el-form-item label="11月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.planDTOList[10].planId"
          placeholder="11月份方案："
        >
          <el-option label="浙江典型年度分解方案" :value="1" />
          <el-option label="广东典型年度分解方案" :value="2" />
          <el-option label="广东20年典型日权重1" :value="3" />
          <el-option label="新增自定义方案" :value="4" />
        </el-select>
        <el-button type="primary" @click="dialogDayToHourDetial.toggle = true"
          >查询/编辑/另存</el-button
        >
      </el-form-item>
      <el-form-item label="12月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.planDTOList[11].planId"
          placeholder="12月份方案："
        >
          <el-option label="浙江典型年度分解方案" :value="1" />
          <el-option label="广东典型年度分解方案" :value="2" />
          <el-option label="广东20年典型日权重1" :value="3" />
          <el-option label="新增自定义方案" :value="4" />
        </el-select>
        <el-button type="primary" @click="dialogDayToHourDetial.toggle = true"
          >查询/编辑/另存</el-button
        >
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogDayToHourBase.toggle = false">取 消</el-button>
      <el-button type="primary" @click="dialogDayToHourBase.toggle = false"
        >确 定</el-button
      >
    </div>
    <dayToHourDetial :dialogDayToHourDetial="dialogDayToHourDetial" />
  </el-dialog>
</template>
<script>
import dayToHourDetial from "./dayToHourDetial";
import request from "@/utils/request";
export default {
  components: { dayToHourDetial },
  props: {
    dialogDayToHourBase: {
      type: Object,
    },
    totalElectricity: {
      type: [String, Number],
    },
  },
  created() {
    console.log("日到时基本页");
  },
  data() {
    return {
      chooseEntyType: "0",
      dialogDayToHourDetial: { toggle: false },
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
    };
  },
  methods: {
    openDialog() {
      console.log("打开日分时基础页面");
      this.getMouthToDayBasic();
    },
    getMouthToDayBasic() {
      //获取机构名称列表
      let id = 1;
      request({
        // id是在  /buy  接口处获取到的
        url: `/buy/dtop/${id}/basic`,
        method: "get",
      }).then((res) => {
        console.log(5555, res);
        this.timesasingSchemeDetial = res;
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