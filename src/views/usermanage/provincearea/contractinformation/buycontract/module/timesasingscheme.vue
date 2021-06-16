<template>
  <!-- 分时方案详情页面弹窗 -->
  <!-- 打开分时方案详情页面弹窗 Dialog -->
  <el-dialog
    width="80%"
    v-el-drag-dialog
    custom-class="bingo"
    @open="openDialog"
    @closed="showFormDom = false"
    title="购电合同-分时方案"
    :visible.sync="showDialogFormVisible.toggle"
  >
    <el-form
      v-if="showFormDom"
      :model="timesasingSchemeDetial"
      style="width: 100%"
      :rules='rules'
      ref="ruleForm"
    >
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
            <el-input v-model="timesasingSchemeDetial.name" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
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
        </el-col>
      </el-row>

      <div v-if="timesasingSchemeDetial.timeperiodofusecfgSmallDTOList.length !== 0">
        <div v-for="(items, index) in timesasingSchemeDetial.timeperiodofusecfgSmallDTOList || []"
          :key="index" class="shiduan-wrapper"
        >
          <div style="flex: 3">
            <el-form-item :label="`时段名称${index + 1}`"
              :label-width="formLabelWidth"
              :prop='`timeperiodofusecfgSmallDTOList[${index}].periodName`'
              :rules="{required: true, message: '名称不能为空', trigger: 'blur'}"
            >
              <el-input placeholder="请输入时段名称" v-model="items.periodName"/>
            </el-form-item>
          </div>
          <div style="flex: 7; margin-left: 20px; margin-bottom: 20px">
            <el-form-item label="起止时间" v-for="(timeItem, nums) in items.periodTimeList" :key="nums">
              <div>
                <el-time-select
                  placeholder="起始时间"
                  v-model="timeItem.startTime"
                  @change="bingo(timeItem)"
                  :picker-options="{
                    start: '00:00',
                    step: '00:15',
                    end: '24:00',
                  }"
                >
                </el-time-select>
                <el-time-select
                  placeholder="结束时间"
                  v-model="timeItem.endTime"
                  :picker-options="{
                    start: '00:00',
                    step: '00:15',
                    end: '24:00',
                    minTime: timeItem.startTime,
                  }"
                >
                </el-time-select>
              </div>
            </el-form-item>
            <div style="display: flex; justify-content: flex-end">
              <el-button
                @click="removeEnvironmentForm(index)"
                v-if="items.periodTimeList.length > 1"
                type="primary"
                icon="el-icon-delete"
              />
              <el-button
                @click="addEnvironmentForm(index)"
                class="el-icon-plus"
              />
            </div>
          </div>
        </div>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm('ruleForm')">另存</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">编辑</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">保存并选择</el-button
      >
      <el-button type="primary" @click="showDialogFormVisible.toggle = false">取 消</el-button>
      <!-- <el-button type="primary" @click="submitForm('timesasingSchemeDetial')">提交</el-button>  -->
      <!-- <el-button type="primary" @click="showDialogFormVisible.toggle = false">确 定</el-button> -->
    </div>
  </el-dialog>
</template>
<script>
import request from "@/utils/request";
import elDragDialog from '@/components/Directive/el-drag-dialog'
export default {
  directives: { elDragDialog },
  props: {
    showDialogFormVisible: {
      type: Object,
    },
  },
  data() {
    return {
      startTime: "", //起始时间
      endTime: "", //结束时间
      showFormDom: false, //接口数据拿到之后再渲染表单的dom结构，防止报错
      // 分时方案详情页面 -- 弹窗表单
      timesasingSchemeDetial: {
        id: 2,
        name: "bingo1",
        timeperiodofusecfgSmallDTOList:[]
      },
      formLabelWidth: "120px",
      rules: {
      },
    };
  },
  methods: {
    //添加表单项事件
    addEnvironmentForm(index) {
      this.timesasingSchemeDetial.timeperiodofusecfgSmallDTOList[
        index
      ].periodTimeList.push({
        startTime: "00:00",
        endTime: "00:00",
      });
    },
    //移除表单项事件
    removeEnvironmentForm(index) {
      this.timesasingSchemeDetial.timeperiodofusecfgSmallDTOList[
        index
      ].periodTimeList.pop();
    },
    bingo(timeItem) {
      const list = this.timesasingSchemeDetial.timeperiodofusecfgSmallDTOList
      let arr = []
      list.forEach(item =>{
        arr.push(...item.periodTimeList)
      })
      console.log(111, timeItem.startTime, timeItem.endTime);
      console.log(222, arr);
    },
    saveTimesasingSchemeDetial(val){
      //保存 购电合同-分时方案 页面信息
      // request({
      //   url: "/buy/save",
      //   method: "post",
      //   data: val
      // }).then(res=>{
      //   this.$message({
      //     message: '保存成功',
      //     type: 'success'
      //   })
      // }).catch((error) => {
      //   console.log(error);
      //   this.$message.error('保存失败');
      // })
    },
    //提交事件
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("提交", this.timesasingSchemeDetial);
          this.saveTimesasingSchemeDetial(this.timesasingSchemeDetial)
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getTpcfgDetial() {
      let result = {
        id: 2,
        name: "bingo1",
        timeperiodofusecfgSmallDTOList: [
          {
            period: 0,
            periodName: "谷",
            periodTimeList: [
              {
                startTime: "00:15",
                endTime: "00:15",
              },
              {
                startTime: "00:15",
                endTime: "00:15",
              },
              {
                startTime: "00:15",
                endTime: "00:15",
              },
              {
                startTime: "00:15",
                endTime: "00:15",
              },
            ],
          },
          {
            period: 1,
            periodName: "平",
            periodTimeList: [
              {
                startTime: "00:15",
                endTime: "00:15",
              },
              { startTime: "00:15", endTime: "00:15" },
            ],
          },
          {
            period: 2,
            periodName: "高",
            periodTimeList: [
              {
                startTime: "00:15",
                endTime: "00:15",
              },
              { startTime: "00:15", endTime: "00:15" },
            ],
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
    
    openDialog() {
      this.getTpcfgDetial();
    },
    
  },
};
</script>
<style lang="scss" scoped>
.shiduan-wrapper {
  display: flex;
  overflow: hidden;
  overflow-x: auto;
}
::v-deep .el-dialog.bingo {
  overflow: hidden !important;
  overflow-x: auto !important;
}
::v-deep .el-dialog__body {
  min-width: 1000px;
  width: 100%;
  display: flex;
  max-height: 500px;
  overflow: auto;
}
</style>