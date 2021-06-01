<template>
  <!-- 分时方案详情页面弹窗 -->
  <!-- 打开分时方案详情页面弹窗 Dialog -->
  <el-dialog append-to-body title="购电合同-日分时详情页面" :visible.sync="dialogDayToHourDetial.toggle">
    <div>日分时分解方案 1 月</div>
    <el-form :model="timesasingSchemeDetial">
      <el-form-item
        label="方案名称:"
        :label-width="formLabelWidth"
        prop="name"
        :rules="[
          { required: true, message: '请输入方案名称', trigger: 'blur' }
        ]"
      >
        <el-input v-model="timesasingSchemeDetial.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="工作日曲线:" :label-width="formLabelWidth" prop="shiduanCount">
        <el-select v-model="timesasingSchemeDetial.shiduanCount" clearable placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai" />
          <el-option label="自定义" value="zidingyi" />
        </el-select>
        <el-button type="primary" @click="dialogDayToHourCurve.toggle = true">查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="周六曲线:" :label-width="formLabelWidth" prop="shiduanCount">
        <el-select v-model="timesasingSchemeDetial.shiduanCount" clearable placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai" />
          <el-option label="自定义" value="zidingyi" />
        </el-select>
        <el-button type="primary" @click="dialogDayToHourCurve.toggle = true">查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="周日曲线:" :label-width="formLabelWidth" prop="shiduanCount">
        <el-select v-model="timesasingSchemeDetial.shiduanCount" clearable placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai" />
          <el-option label="自定义" value="zidingyi" />
        </el-select>
        <el-button type="primary" @click="dialogDayToHourCurve.toggle = true">查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="法定节假日曲线:" :label-width="formLabelWidth" prop="shiduanCount">
        <el-select v-model="timesasingSchemeDetial.shiduanCount" clearable placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai" />
          <el-option label="自定义" value="zidingyi" />
        </el-select>
        <el-button type="primary" @click="dialogDayToHourCurve.toggle = true">查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="调休节假日曲线:" :label-width="formLabelWidth" prop="shiduanCount">
        <el-select v-model="timesasingSchemeDetial.shiduanCount" clearable placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai" />
          <el-option label="自定义" value="zidingyi" />
        </el-select>
        <el-button type="primary" @click="dialogDayToHourCurve.toggle = true">查询/编辑/另存</el-button>
      </el-form-item>
      
    </el-form>
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
import dayToHourCurve from './dayToHourCurve'
export default {
  components:{dayToHourCurve},
  props: {
    dialogDayToHourDetial: {
      type: Object,
    }
  },
  methods: {
     
  },
  data() {
    return {
      dialogDayToHourCurve: {toggle: false},
      // 分时方案详情页面 -- 弹窗表单
      timesasingSchemeDetial: {
        name: "",
        shiduanName: "",
        shiduanCount: ""
      },
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
