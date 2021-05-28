<template>
  <!-- 分时方案详情页面弹窗 -->
  <!-- 打开分时方案详情页面弹窗 Dialog -->
  <el-dialog
    append-to-body
    title="购电合同-月到日分解方案详情页"
    :visible.sync="dialogMouthToDayDetial.toggle"
  >
    <div>月到日分解方案详情页</div>
    <el-form :model="timesasingSchemeDetial">
      <el-form-item
        label="方案名称*"
        :label-width="formLabelWidth"
        prop="name"
        :rules="[
          { required: true, message: '请输入方案名称', trigger: 'blur' }
        ]"
      >
        <el-input v-model="timesasingSchemeDetial.name" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="工作日权重："
        :label-width="formLabelWidth"
        prop="workDayWeight"
      >
        <el-input
          v-model="timesasingSchemeDetial.workDayweight"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="周六权重"
        :label-width="formLabelWidth"
        prop="saturdayWeight"
      >
        <el-input
          v-model="timesasingSchemeDetial.saturdayWeight"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="周日权重"
        :label-width="formLabelWidth"
        prop="sundayWeight"
      >
        <el-input
          v-model="timesasingSchemeDetial.sundayWeight"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="法定节假日权重："
        :label-width="formLabelWidth"
        prop="statutoryHolidayWeights"
      >
        <el-input
          v-model="timesasingSchemeDetial.statutoryHolidayWeights"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="调休节假日权重："
        :label-width="formLabelWidth"
        prop="adjustTheHolidayWeight"
      >
        <el-input
          v-model="timesasingSchemeDetial.adjustTheHolidayWeight"
          autocomplete="off"
        />
      </el-form-item>
      <!-- <el-form-item>
        <el-button @click="dialogMouthToDayDetial.toggle = false">取 消</el-button>
        <el-button type="primary" @click="dialogMouthToDayDetial.toggle = false"
          >确 定</el-button
        >
      </el-form-item> -->
    </el-form>
    <!-- 图表模块 -->
    <div>
      图表模块
      <div>
        <p>2021年分月比例(100%)</p>
        <el-table :data="loginfo1.persent" border style="width: 100%">
          <el-table-column
            prop="name"
            width="150"
            align="center"
            label="月份"
            fixed
          >
          </el-table-column>
          <template v-for="(col, i) in loginfo1.mounthly">
            <el-table-column
              :show-overflow-tooltip="true"
              :label="col"
              :key="col"
              width="100"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.row.list[i].id }}
              </template>
            </el-table-column>
          </template>
        </el-table>
        <el-table :data="loginfo2.persent" border style="width: 100%">
          <el-table-column
            prop="name"
            width="150"
            align="center"
            label="月份"
            fixed
          >
          </el-table-column>
          <template v-for="(col, i) in loginfo2.mounthly">
            <el-table-column
              :show-overflow-tooltip="true"
              :label="col"
              :key="col"
              width="100"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.row.list[i].id }}
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>

      <!-- 月分日曲线 -->
      <div>
        月分日曲线
        <div>
          <p>5月分日比例(32.34%)</p>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="dateType" label="日期类型" />
            <el-table-column prop="weight" label="权重" />
          </el-table>
        </div>
        <div>
          <p>5月--日历</p>
          <!-- 待定 -->
        </div>
        <div>
          <p>月分日曲线图</p>
          <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
            <div class="chart-wrapper">
              <category />
            </div>
          </el-row>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import Category from '../categoryEcharts'

export default {
  components: {
    Category},
  props: {
    dialogMouthToDayDetial: {
      type: Object
    }
  },
  methods: {},
  data() {
    return {
      tableData: [{
          dateType: '节假日',
          weight: '0.71',
        }, {
          dateType: '工作日',
          weight: '0.43',
        }, {
          dateType: '星期六',
          weight: '0.57',
        }, {
          dateType: '星期日',
          weight: '0.27',
        }, {
          dateType: '调休节假日',
          weight: '0.75',
        }],
            

      loginfo1: {
        persent: [
          {
            name: "百分比",
            list: [
              { id: 11 },
              { id: 67 },
              { id: 21.3 },
              { id: 38.7 },
              { id: 32.7 },
              { id: 93.7 }
            ]
          }
        ],
        mounthly: ["1月", "2月", "3月", "4月", "5月", "6月"]
      },
      loginfo2: {
        persent: [
          {
            name: "百分比",
            list: [
              { id: 11 },
              { id: 67 },
              { id: 21.3 },
              { id: 38.7 },
              { id: 32.7 },
              { id: 93.7 }
            ]
          }
        ],
        mounthly: ["7月", "8月", "9月", "10月", "11月", "12月"]
      },
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
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
</style>