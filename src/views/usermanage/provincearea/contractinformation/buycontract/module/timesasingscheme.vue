<template>
  <!-- 分时方案详情页面弹窗 -->
  <!-- 打开分时方案详情页面弹窗 Dialog -->
  <el-dialog title="购电合同-分时方案" :visible.sync="showDialogFormVisible.toggle">
    <el-form :model="timesasingSchemeDetial">
      <el-form-item
        label="方案名称"
        :label-width="formLabelWidth"
        prop="name"
        :rules="[
          { required: true, message: '请输入方案名称', trigger: 'blur' }
        ]"
      >
        <el-input v-model="timesasingSchemeDetial.name" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="分时时段数"
        :label-width="formLabelWidth"
        prop="shiduanCount"
        :rules="[
          { required: true, message: '请输入方案名称', trigger: 'change' }
        ]"
      >
        <el-select
          v-model="timesasingSchemeDetial.shiduanCount"
          clearable
          placeholder="请选择活动区域"
        >
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item
        label="时段名称"
        :label-width="formLabelWidth"
        prop="shiduanName"
        :rules="[
          { required: true, message: '请输入时段名称', trigger: 'change' }
        ]"
      >
        <el-select
          v-model="timesasingSchemeDetial.shiduanName"
          clearable
          placeholder="请选择活动区域"
        >
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item
        label="起止时间*"
        :label-width="formLabelWidth"
        prop="startTime"
        :rules="[
          { required: true, message: '请输入起止时间*', trigger: 'change' }
        ]"
      >
        <el-select
          v-model="timesasingSchemeDetial.startTime"
          clearable
          placeholder="请选择起止时间"
        >
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="showDialogFormVisible.toggle = false">取 消</el-button>
      <el-button type="primary" @click="showDialogFormVisible.toggle = false"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    showDialogFormVisible: {
      type: Object,
    }
  },
  data() {
    return {
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
  methods: {
      
  },
};
</script>
