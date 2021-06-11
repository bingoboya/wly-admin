<template>
  <!-- 分时方案详情页面弹窗 -->
  <!-- 打开分时方案详情页面弹窗 Dialog -->
  <el-dialog
    width="80%"
    custom-class="bingo"
    @open="openDialog"
    @closed="showFormDom = false"
    title="购电合同-分时方案"
    :visible.sync="showDialogFormVisible.toggle"
  >
    <el-form v-if="showFormDom" :model="timesasingSchemeDetial" ref="timesasingSchemeDetial">
      <el-form-item
        label="方案名称"
        :label-width="formLabelWidth"
        prop="name"
        :rules="[
          { required: true, message: '请输入方案名称', trigger: 'blur' },
        ]"
      >
        <el-input v-model="timesasingSchemeDetial.name" />
      </el-form-item>
      <el-form-item
        label="分时时段数"
        :label-width="formLabelWidth"
        prop="len"
        :rules="[
          { required: true, message: '请输入分时时段数', trigger: 'blur' },
        ]"
      >
        <el-input
          v-model="timesasingSchemeDetial.len"
          placeholder="请输入分时时段数"
          autocomplete="off"
        />
      </el-form-item>

      <div v-if='timesasingSchemeDetial.timeperiodofusecfgSmallDTOList.length !== 0'>
        <div class="shiduan-wrapper" v-for='(items, index) in timesasingSchemeDetial.timeperiodofusecfgSmallDTOList' :key='index'>
          <div style="flex:3;">
            <el-form-item :label="`时段名称${index}`" :label-width="formLabelWidth"
              :prop='timesasingSchemeDetial.timeperiodofusecfgSmallDTOList[index].periodName' 
              :rules="{required: true, message: '名称不能为空', trigger: 'blur'}">
              <el-input v-model="items.periodName" placeholder="请输入时段名称" />
            </el-form-item>
          </div>
          <div style="flex:7;margin-left:20px;">
            <el-form-item label="起止时间" v-for='(timeItem, nums) in items.periodTimeList' :key="nums">
              <div >
                <el-date-picker v-model="timeItem.startTime" placeholder="请选择开始时间" />
                <el-date-picker v-model="timeItem.endTime" placeholder="请选择截止时间" />
              </div>
            </el-form-item>
            <i @click="removeEnvironmentForm(index)" v-if="items.periodTimeList.length > 1" style="font-size:28px;cursor:pointer;" class="el-icon-delete"></i>
            <el-button @click="addEnvironmentForm(index)" size="mini" class="el-icon-plus"></el-button>
          </div>
        </div>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="showDialogFormVisible.toggle = false">取 消</el-button>
      <el-button type="primary" @click="showDialogFormVisible.toggle = false"
        >确 定</el-button
      >
      <el-button type="primary" @click="submitForm('timesasingSchemeDetial')">提交</el-button> 
    </div>
  </el-dialog>
</template>
<script>
import request from "@/utils/request";
export default {
  props: {
    showDialogFormVisible: {
      type: Object,
    },
  },
  data() {
    return {
      showFormDom: false, //接口数据拿到之后再渲染表单的dom结构，防止报错
      // 分时方案详情页面 -- 弹窗表单
      timesasingSchemeDetial: {},
      formLabelWidth: "120px",
    };
  },
  methods: {
    getTpcfgDetial() {
      let result = {
          id: 2,
          name:"bingo1",
          timeperiodofusecfgSmallDTOList: [
            { period: 0, periodName: "谷", 
              periodTimeList: [
                {"startTime": '2019-12-02 10:00:00', "endTime": '2019-4-03 20:00:00'},
                {"startTime": '2010-1-09 11:00:00', "endTime": '2122-6-13 10:00:00'},
                {"startTime": '2013-11-12 11:00:00', "endTime": '2120-3-14 10:00:00'},
                {"startTime": '2043-3-04 4:00:00', "endTime": '2222-4-23 04:00:00'}] 
            },
            { period: 1, periodName: "平", 
              periodTimeList: [
                {"startTime": '2019-1-03 10:00:00', "endTime": '2019-3-23 20:00:00'},
                {"startTime": '2043-3-04 4:00:00', "endTime": '2039-1-23 04:00:00'}] 
            },
            { period: 2, periodName: "高", 
              periodTimeList: [
                {"startTime": '2019-4-4 10:00:00', "endTime": '2019-4-2 20:00:00'},
                {"startTime": '2012-1-3 10:00:00', "endTime": '2013-5-2 20:00:00'},
                {"startTime": '2043-3-04 4:00:00', "endTime": '2019-4-23 04:00:00'}] 
            },
          ],
        };
      //获取分时方案详情
      let id = 2;
      request({
        url: `/buy/tpcfg/${id}/detail`,
        method: "get",
      }).then((res) => {
        // this.timesasingSchemeDetial = res;
        this.timesasingSchemeDetial = result;
        this.$set(
          this.timesasingSchemeDetial,
          "len",
          res.timeperiodofusecfgSmallDTOList.length
        );
        this.showFormDom = true; //接口数据拿到之后再渲染表单的dom结构，防止报错
      });
    },
    //添加表单项事件
		addEnvironmentForm(index) {
			this.timesasingSchemeDetial.timeperiodofusecfgSmallDTOList[index].periodTimeList.push(
        {"startTime": '2000-1-01 10:00:00', "endTime": '2111-1-02 20:00:00'}
      );
		},
    //移除表单项事件
		removeEnvironmentForm(index) {   
      this.timesasingSchemeDetial.timeperiodofusecfgSmallDTOList[index].periodTimeList.pop()
      // this.timesasingSchemeDetial.timeperiodofusecfgSmallDTOList[index].periodTimeList = aa
		},
    openDialog() {
      this.getTpcfgDetial();
    },
    //提交事件
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					console.log('提交',this.timesasingSchemeDetial);
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
  },
};
</script>
<style lang="scss" scoped>
.shiduan-wrapper{
  display:flex;
  overflow:hidden;
  overflow-x: auto;
}
::v-deep .el-dialog.bingo{
  overflow: hidden !important;
    overflow-x: auto !important;
}
::v-deep .el-dialog__body {
  min-width: 900px;
    display: flex;
}
</style>