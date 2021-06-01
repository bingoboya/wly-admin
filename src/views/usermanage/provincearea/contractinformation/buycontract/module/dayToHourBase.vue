<template>
  <!-- 分时方案详情页面弹窗 -->
  <!-- 打开分时方案详情页面弹窗 Dialog -->
  <el-dialog @open="openDialog" title="购电合同-日分时分解方案基础页" :visible.sync="dialogDayToHourBase.toggle">
    <div>日分时分解方案基础页</div>
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
        prop="m01"
        :rules="[
          { required: false, message: '请输入1月份电量', trigger: 'blur' }
        ]"
      >
        <el-input v-model="timesasingSchemeDetial.m01" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="2月份电量"
        :label-width="formLabelWidth"
        prop="m02"
        :rules="[
          { required: false, message: '请输入2月份电量', trigger: 'blur' }
        ]"
      >
        <el-input v-model="timesasingSchemeDetial.m02" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="3月份电量"
        :label-width="formLabelWidth"
        prop="m03"
        :rules="[
          { required: false, message: '请输入3月份电量', trigger: 'blur' }
        ]"
      >
        <el-input v-model="timesasingSchemeDetial.m03" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="4月份电量"
        :label-width="formLabelWidth"
        prop="m04"
        :rules="[
          { required: false, message: '请输入4月份电量', trigger: 'blur' }
        ]"
      >
        <el-input v-model="timesasingSchemeDetial.m04" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="5月份电量"
        :label-width="formLabelWidth"
        prop="m05"
        :rules="[
          { required: false, message: '请输入5月份电量', trigger: 'blur' }
        ]"
      >
        <el-input v-model="timesasingSchemeDetial.m05" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="6月份电量"
        :label-width="formLabelWidth"
        prop="m06"
        :rules="[
          { required: false, message: '请输入6月份电量', trigger: 'blur' }
        ]"
      >
        <el-input v-model="timesasingSchemeDetial.m06" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="7月份电量"
        :label-width="formLabelWidth"
        prop="m07"
        :rules="[
          { required: false, message: '请输入7月份电量', trigger: 'blur' }
        ]"
      >
        <el-input v-model="timesasingSchemeDetial.m07" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="8月份电量"
        :label-width="formLabelWidth"
        prop="m08"
        :rules="[
          { required: false, message: '请输入8月份电量', trigger: 'blur' }
        ]"
      >
        <el-input v-model="timesasingSchemeDetial.m08" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="9月份电量"
        :label-width="formLabelWidth"
        prop="m09"
        :rules="[
          { required: false, message: '请输入9月份电量', trigger: 'blur' }
        ]"
      >
        <el-input v-model="timesasingSchemeDetial.m09" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="10月份电量"
        :label-width="formLabelWidth"
        prop="m10"
        :rules="[
          { required: false, message: '请输入10月份电量', trigger: 'blur' }
        ]"
      >
        <el-input v-model="timesasingSchemeDetial.m10" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="11月份电量"
        :label-width="formLabelWidth"
        prop="m11"
        :rules="[
          { required: false, message: '请输入11月份电量', trigger: 'blur' }
        ]"
      >
        <el-input v-model="timesasingSchemeDetial.m11" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="12月份电量"
        :label-width="formLabelWidth"
        prop="m12"
        :rules="[
          { required: false, message: '请输入12月份电量', trigger: 'blur' }
        ]"
      >
        <el-input v-model="timesasingSchemeDetial.m12" autocomplete="off" />
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
        <el-button type="primary" @click="dialogDayToHourDetial.toggle = true">查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="1月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.wholeYearScheme"
          placeholder="1月份方案："
        >
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
        <el-button type="primary" @click="dialogDayToHourDetial.toggle = true">查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="2月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.wholeYearScheme"
          placeholder="2月份方案："
        >
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
        <el-button type="primary" @click="dialogDayToHourDetial.toggle = true">查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="3月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.wholeYearScheme"
          placeholder="3月份方案："
        >
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
        <el-button type="primary" @click="dialogDayToHourDetial.toggle = true">查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="4月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.wholeYearScheme"
          placeholder="4月份方案："
        >
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
        <el-button type="primary" @click="dialogDayToHourDetial.toggle = true">查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="5月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.wholeYearScheme"
          placeholder="5月份方案："
        >
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
        <el-button type="primary" @click="dialogDayToHourDetial.toggle = true">查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="6月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.wholeYearScheme"
          placeholder="6月份方案："
        >
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
        <el-button type="primary" @click="dialogDayToHourDetial.toggle = true">查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="7月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.wholeYearScheme"
          placeholder="7月份方案："
        >
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
        <el-button type="primary" @click="dialogDayToHourDetial.toggle = true">查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="8月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.wholeYearScheme"
          placeholder="8月份方案："
        >
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
        <el-button type="primary" @click="dialogDayToHourDetial.toggle = true">查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="9月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.wholeYearScheme"
          placeholder="9月份方案："
        >
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
        <el-button type="primary" @click="dialogDayToHourDetial.toggle = true">查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="10月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.wholeYearScheme"
          placeholder="10月份方案："
        >
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
        <el-button type="primary" @click="dialogDayToHourDetial.toggle = true">查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="11月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.wholeYearScheme"
          placeholder="11月份方案："
        >
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
        <el-button type="primary" @click="dialogDayToHourDetial.toggle = true">查询/编辑/另存</el-button>
      </el-form-item>
      <el-form-item label="12月份方案：">
        <el-select
          v-model="timesasingSchemeDetial.wholeYearScheme"
          placeholder="12月份方案："
        >
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
        <el-button type="primary" @click="dialogDayToHourDetial.toggle = true">查询/编辑/另存</el-button>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogDayToHourBase.toggle = false">取 消</el-button>
      <el-button type="primary" @click="dialogDayToHourBase.toggle = false"
        >确 定</el-button
      >
    </div>
    <dayToHourDetial :dialogDayToHourDetial='dialogDayToHourDetial' />
  </el-dialog>
</template>
<script>
import dayToHourDetial from './dayToHourDetial'
import request from '@/utils/request'

export default {
  components:{dayToHourDetial},
  props: {
    dialogDayToHourBase: {
      type: Object,
    }
  },
  data() {
    return {
      dialogDayToHourDetial: {toggle: false},
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
  methods: {
      openDialog(){
        console.log('打开日分时基础页面');
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
  },
  
  
};
</script>
