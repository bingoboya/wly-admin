<template>
  <!-- 分时方案详情页面弹窗 -->
  <!-- 打开分时方案详情页面弹窗 Dialog -->
  <el-dialog title="购电合同-月到日分时方案基础页" @open="openDialog" :visible.sync="dialogMouthToDayBase.toggle">
    <div>月到日分解方案基础页</div>
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
        label="总电量(MWh)"
        :label-width="formLabelWidth"
        prop="totalElic"
        :rules="[
          { required: true, message: '请输入总电量（MWh）', trigger: 'blur' }
        ]"
      >
        <el-input v-model="timesasingSchemeDetial.totalElic" autocomplete="off" />
      </el-form-item>
      
      <el-form-item
        label="1月份电量"
        :label-width="formLabelWidth"
        prop="oneElic"
        :rules="[
          { required: false, message: '请输入1月份电量', trigger: 'blur' }
        ]"
      >
        <el-input v-model="timesasingSchemeDetial.oneElic" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="2月份电量"
        :label-width="formLabelWidth"
        prop="twoElic"
        :rules="[
          { required: false, message: '请输入2月份电量', trigger: 'blur' }
        ]"
      >
        <el-input v-model="timesasingSchemeDetial.twoElic" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="3月份电量"
        :label-width="formLabelWidth"
        prop="threeElic"
        :rules="[
          { required: false, message: '请输入3月份电量', trigger: 'blur' }
        ]"
      >
        <el-input v-model="timesasingSchemeDetial.threeElic" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="4月份电量"
        :label-width="formLabelWidth"
        prop="fourElic"
        :rules="[
          { required: false, message: '请输入4月份电量', trigger: 'blur' }
        ]"
      >
        <el-input v-model="timesasingSchemeDetial.fourElic" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="5月份电量"
        :label-width="formLabelWidth"
        prop="fiveElic"
        :rules="[
          { required: false, message: '请输入5月份电量', trigger: 'blur' }
        ]"
      >
        <el-input v-model="timesasingSchemeDetial.fiveElic" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="6月份电量"
        :label-width="formLabelWidth"
        prop="sixElic"
        :rules="[
          { required: false, message: '请输入6月份电量', trigger: 'blur' }
        ]"
      >
        <el-input v-model="timesasingSchemeDetial.sixElic" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="7月份电量"
        :label-width="formLabelWidth"
        prop="sevenElic"
        :rules="[
          { required: false, message: '请输入7月份电量', trigger: 'blur' }
        ]"
      >
        <el-input v-model="timesasingSchemeDetial.sevenElic" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="8月份电量"
        :label-width="formLabelWidth"
        prop="eightElic"
        :rules="[
          { required: false, message: '请输入8月份电量', trigger: 'blur' }
        ]"
      >
        <el-input v-model="timesasingSchemeDetial.eightElic" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="9月份电量"
        :label-width="formLabelWidth"
        prop="nineElic"
        :rules="[
          { required: false, message: '请输入9月份电量', trigger: 'blur' }
        ]"
      >
        <el-input v-model="timesasingSchemeDetial.nineElic" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="10月份电量"
        :label-width="formLabelWidth"
        prop="tenElic"
        :rules="[
          { required: false, message: '请输入10月份电量', trigger: 'blur' }
        ]"
      >
        <el-input v-model="timesasingSchemeDetial.tenElic" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="11月份电量"
        :label-width="formLabelWidth"
        prop="elevenElic"
        :rules="[
          { required: false, message: '请输入11月份电量', trigger: 'blur' }
        ]"
      >
        <el-input v-model="timesasingSchemeDetial.elevenElic" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="12月份电量"
        :label-width="formLabelWidth"
        prop="twelveElic"
        :rules="[
          { required: false, message: '请输入12月份电量', trigger: 'blur' }
        ]"
      >
        <el-input v-model="timesasingSchemeDetial.twelveElic" autocomplete="off" />
      </el-form-item>
      <!-- 请选择输入方式 -->
      <el-form-item 
        label="输入方式选择"
        :label-width="formLabelWidth"
        prop="chooseEntyType"
        :rules="[
          { required: true, message: '请输入12月份电量', trigger: 'blur' }
        ]">
        <el-radio-group v-model="timesasingSchemeDetial.chooseEntyType">
          <el-radio label="日历周-12个月统一"></el-radio>
          <el-radio label="日历周-12个月单独"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="全年统一方案：">
        <el-select
          v-model="timesasingSchemeDetial.wholeYearScheme"
          placeholder="全年统一方案："
        >
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
        <el-button type="primary" @click="dialogMouthToDayDetial.toggle = true">查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="1月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.wholeYearScheme"
          placeholder="1月份方案："
        >
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
        <el-button type="primary" @click="dialogMouthToDayDetial.toggle = true">查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="2月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.wholeYearScheme"
          placeholder="2月份方案："
        >
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
        <el-button type="primary" @click="dialogMouthToDayDetial.toggle = true">查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="3月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.wholeYearScheme"
          placeholder="3月份方案："
        >
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
        <el-button type="primary" @click="dialogMouthToDayDetial.toggle = true">查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="4月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.wholeYearScheme"
          placeholder="4月份方案："
        >
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
        <el-button type="primary" @click="dialogMouthToDayDetial.toggle = true">查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="5月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.wholeYearScheme"
          placeholder="5月份方案："
        >
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
        <el-button type="primary" @click="dialogMouthToDayDetial.toggle = true">查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="6月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.wholeYearScheme"
          placeholder="6月份方案："
        >
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
        <el-button type="primary" @click="dialogMouthToDayDetial.toggle = true">查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="7月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.wholeYearScheme"
          placeholder="7月份方案："
        >
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
        <el-button type="primary" @click="dialogMouthToDayDetial.toggle = true">查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="8月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.wholeYearScheme"
          placeholder="8月份方案："
        >
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
        <el-button type="primary" @click="dialogMouthToDayDetial.toggle = true">查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="9月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.wholeYearScheme"
          placeholder="9月份方案："
        >
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
        <el-button type="primary" @click="dialogMouthToDayDetial.toggle = true">查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="10月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.wholeYearScheme"
          placeholder="10月份方案："
        >
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
        <el-button type="primary" @click="dialogMouthToDayDetial.toggle = true">查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="11月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.wholeYearScheme"
          placeholder="11月份方案："
        >
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
        <el-button type="primary" @click="dialogMouthToDayDetial.toggle = true">查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="12月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.wholeYearScheme"
          placeholder="12月份方案："
        >
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
        <el-button type="primary" @click="dialogMouthToDayDetial.toggle = true">查询/编辑/另存</el-button>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogMouthToDayBase.toggle = false">取 消</el-button>
      <el-button type="primary" @click="dialogMouthToDayBase.toggle = false"
        >确 定</el-button
      >
    </div>
    <mouthToDayDetial :dialogMouthToDayDetial="dialogMouthToDayDetial" ></mouthToDayDetial>
  </el-dialog>
</template>
<script>
import mouthToDayDetial from './mouthToDayDetial'
import request from '@/utils/request'

export default {
  components:{mouthToDayDetial},
  props: {
    dialogMouthToDayBase: {
      type: Object,
    }
  },
  
  data() {
    return {
      dialogMouthToDayDetial: {toggle: false},
      // 分时方案详情页面 -- 弹窗表单
      timesasingSchemeDetial: {
        name: "",
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
  created () {
    console.log('oooo');
    // this.getMouthToDayBasic();
  },
  methods: {
    openDialog(){
      console.log('打开月到日基础页面');
      this.getMouthToDayBasic();
    },
    getMouthToDayBasic(){
      //获取机构名称列表
      let id = 1
      request({
        // id是在  /buy  接口处获取到的
        url: `/buy/mtod/${id}/basic`,
        method: 'get'
      }).then(res => {
        console.log(5555, res);
        this.timesasingSchemeDetial = res
      })
    },
      // changeDialogFormVisible() {
      //     this.$emit('changeDialogMouthToDayBase', false)
      // }
  },
};
</script>
