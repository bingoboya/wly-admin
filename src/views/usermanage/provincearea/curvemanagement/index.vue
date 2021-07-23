<template>
  <div class="app-container">
    <!-- 常用曲线管理 -->
    <!--工具栏-->
    <!-- <div class="head-container">
      <eHeader :dict="dict" :permission="permission" />
      <crudOperation :permission="permission" />
    </div> -->
    <div>
      <div class="head-container">
        <div class="filter-container">
          <el-row>
            <!-- <el-col :span="8">
            <div style="display:flex;"><div style="width:90px;">居间人：</div>
              <el-select v-model="listQuery.agencyName" style="width: 200px;" placeholder="请选择居间人" clearable class="filter-item" @change="handleFilter">
                <el-option v-for="item in agencyAllList" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </div>
          </el-col> -->
            <el-col :span="8">
              <div style="display:flex;align-items: baseline;">
                <div style="width:90px;">曲线名称：</div>
                <el-input v-model="listQuery.curveName" placeholder="请选择曲线名称" style="width: 100px;" class="filter-item" @keyup.enter.native="handleFilter" />
              </div>
            </el-col>
            <el-col :span="8">
              <div style="display:flex;align-items: baseline;"><div style="width:90px;">曲线类型：</div>
                <el-select v-model="listQuery.curveType" placeholder="审批状态" clearable style="width: 200px;" class="filter-item" @change="handleFilter">
                  <el-option label="年分月曲线" :value="0" />
                  <el-option label="月分日曲线" :value="1" />
                  <el-option label="日分时曲线" :value="2" />
                </el-select>
              </div>
            </el-col>
            <el-col :span="8">
              <div style="display:flex;align-items: baseline;"><div style="width:90px;">更新时间：</div><el-input v-model="listQuery.updateTime" placeholder="请输入更新时间" style="width: 100px;" class="filter-item" @keyup.enter.native="handleFilter" /></div>
            </el-col>
            <el-col :span="8">
              <div style="display:flex;align-items: baseline;"><div style="width:90px;">审批状态：</div>
                <el-select v-model="listQuery.state" placeholder="审批状态" clearable style="width: 200px;" class="filter-item" @change="handleFilter">
                  <el-option v-for="item in approvalStatus" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
              </div>
            </el-col>
            <el-col :span="8">
              <div style="display:flex;align-items: baseline;"><div style="width:90px;">提报人：</div><el-input v-model="listQuery.presenter" placeholder="请输入提报人" style="width: 100px;" class="filter-item" @keyup.enter.native="handleFilter" /></div>
            </el-col>
          </el-row>
          <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
          <!-- <el-button class="filter-item" type="primary" icon="el-icon-search" @click="gotoRouter">新增</el-button> -->
          <el-button :disabled="selections.length == 0" class="filter-item" type="primary" icon="el-icon-search" @click="deleteBuyDataList">删除</el-button>
        </div>
      </div>
      <div slot="footer" class="dialog-footer title-wrapper" style="margin-bottom: 10px;">
        <div>我的新增曲线列表</div>
        <div>
          <el-button type="primary" @click="submitForm('ruleForm')">另存</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">编辑</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <!-- <el-button type="primary" @click="submitForm('ruleForm')">保存并选择</el-button> -->
          <!-- <el-button type="primary" @click="dialogYearToMouth.toggle = false">取 消</el-button> -->
          <!-- <el-button type="primary" @click="dialogYearToMouth.toggle = false"
            >确 定</el-button
          > -->
        </div>
      </div>
      <!--表格渲染-->
      <el-table
        ref="table"
        v-loading="listLoading"
        border
        height="222"
        :data="curveDTOList"
        @selection-change="selectionChangeHandler"
      >
        <el-table-column type="selection" width="50" />
        <el-table-column type="index" width="50" label="序号" />
        <el-table-column :show-overflow-tooltip="true" prop="curveName" width="200" label="曲线名称">
          <template slot-scope="scope">
            <div
              slot="reference"
              class="click-item el-link--primary"
              @click="gotoRouter(scope.row)"
            >
              {{ scope.row.curveName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="curveType" label="曲线类型">
          <template slot-scope="scope">
            {{ scope.row.curveType == 0 ? '年分月曲线' : scope.row.curveType == 1 ? '月分日曲线' : '日分时曲线' }}
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" />
        <el-table-column prop="state" width="100" label="审批状态">
          <template slot-scope="scope">
            {{ scope.row.state == 'NOTSUBMIT' ? '未提交' : scope.row.state == 'REJECTED' ? '审核未通过' : '通过' }}
          </template>
        </el-table-column>
        <el-table-column prop="presenter" width="100" label="提报人" />
      </el-table>
      <!--分页组件-->
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :size.sync="listQuery.size" @pagination="getBuyDataList" />
    </div>
    <!--表单渲染  操作按钮（新增/删除）-->
    <div v-if="curveType === 0">
      <div slot="footer" class="dialog-footer title-wrapper">
        <div>曲线详情-年到月曲线</div>
        <div>
          <el-button type="primary" @click="submitForm('ruleForm')">另存</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">编辑</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <!-- <el-button type="primary" @click="submitForm('ruleForm')">保存并选择</el-button> -->
          <!-- <el-button type="primary" @click="dialogYearToMouth.toggle = false">取 消</el-button> -->
          <!-- <el-button type="primary" @click="dialogYearToMouth.toggle = false"
            >确 定</el-button
          > -->
        </div>
      </div>
      <div style="display: flex;">
        <div style="flex:1;">
          <el-form
            ref="ruleForm"
            :model="yearToMCurve"
            :rules="rules"
            label-width="120px"
          >
            <!-- #region -->
            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="曲线名称"
                  :label-width="formLabelWidth"
                  prop="name"
                  :rules="[
                    { required: true, message: '请输入曲线名称', trigger: 'change' },
                  ]"
                >
                  <el-input v-model="yearToMCurve.name" autocomplete="off" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="12">
                <el-form-item
                  label="1月份比例"
                  :label-width="formLabelWidth"
                  prop="m01"
                  :rules="[
                    { required: true, message: '请输入1月份比例', trigger: 'change' },
                  ]"
                >
                  <el-input
                    v-model="yearToMCurve.m01"
                    autocomplete="off"
                    @input.native="changeTableValue(0, 'm01')"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="7月份比例"
                  :label-width="formLabelWidth"
                  prop="m07"
                  :rules="[
                    { required: true, message: '请输入7月份比例', trigger: 'change' },
                  ]"
                >
                  <el-input
                    v-model="yearToMCurve.m07"
                    autocomplete="off"
                    @input.native="changeTableValue(6, 'm07')"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="12">
                <el-form-item
                  label="2月份比例"
                  :label-width="formLabelWidth"
                  prop="m02"
                  :rules="[
                    { required: true, message: '请输入2月份比例', trigger: 'change' },
                  ]"
                >
                  <el-input
                    v-model="yearToMCurve.m02"
                    autocomplete="off"
                    @input.native="changeTableValue(1, 'm02')"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="8月份比例"
                  :label-width="formLabelWidth"
                  prop="m08"
                  :rules="[
                    { required: true, message: '请输入8月份比例', trigger: 'change' },
                  ]"
                >
                  <el-input
                    v-model="yearToMCurve.m08"
                    autocomplete="off"
                    @input.native="changeTableValue(7, 'm08')"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="5">
              <el-col :span="12">
                <el-form-item
                  label="3月份比例"
                  :label-width="formLabelWidth"
                  prop="m03"
                  :rules="[
                    { required: true, message: '请输入3月份比例', trigger: 'change' },
                  ]"
                >
                  <el-input
                    v-model="yearToMCurve.m03"
                    autocomplete="off"
                    @input.native="changeTableValue(2, 'm03')"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="9月份比例"
                  :label-width="formLabelWidth"
                  prop="m09"
                  :rules="[
                    { required: true, message: '请输入9月份比例', trigger: 'change' },
                  ]"
                >
                  <el-input
                    v-model="yearToMCurve.m09"
                    autocomplete="off"
                    @input.native="changeTableValue(8, 'm09')"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="5">
              <el-col :span="12">
                <el-form-item
                  label="4月份比例"
                  :label-width="formLabelWidth"
                  prop="m04"
                  :rules="[
                    { required: true, message: '请输入4月份比例', trigger: 'change' },
                  ]"
                >
                  <el-input
                    v-model="yearToMCurve.m04"
                    autocomplete="off"
                    @input.native="changeTableValue(3, 'm04')"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="10月份比例"
                  :label-width="formLabelWidth"
                  prop="m10"
                  :rules="[
                    {
                      required: true,
                      message: '请输入10月份比例',
                      trigger: 'change',
                    },
                  ]"
                >
                  <el-input
                    v-model="yearToMCurve.m10"
                    autocomplete="off"
                    @input.native="changeTableValue(9, 'm10')"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="12">
                <el-form-item
                  label="5月份比例"
                  :label-width="formLabelWidth"
                  prop="m05"
                  :rules="[
                    { required: true, message: '请输入5月份比例', trigger: 'change' },
                  ]"
                >
                  <el-input
                    v-model="yearToMCurve.m05"
                    autocomplete="off"
                    @input.native="changeTableValue(4, 'm05')"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="11月份比例"
                  :label-width="formLabelWidth"
                  prop="m11"
                  :rules="[
                    {
                      required: true,
                      message: '请输入11月份比例',
                      trigger: 'change',
                    },
                  ]"
                >
                  <el-input
                    v-model="yearToMCurve.m11"
                    autocomplete="off"
                    @input.native="changeTableValue(10, 'm11')"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="12">
                <el-form-item
                  label="6月份比例"
                  :label-width="formLabelWidth"
                  prop="m06"
                  :rules="[
                    { required: true, message: '请输入6月份比例', trigger: 'change' },
                  ]"
                >
                  <el-input
                    v-model="yearToMCurve.m06"
                    autocomplete="off"
                    @input.native="changeTableValue(5, 'm06')"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="12月份比例"
                  :label-width="formLabelWidth"
                  prop="m12"
                  :rules="[
                    {
                      required: true,
                      message: '请输入12月份比例',
                      trigger: 'change',
                    },
                  ]"
                >
                  <el-input
                    v-model="yearToMCurve.m12"
                    autocomplete="off"
                    @input.native="changeTableValue(11, 'm12')"
                  />
                  <!-- onkeyup="value=value.replace(/[^\d]/g,'').replace(/^0(\d+)$/,'$1')" -->
                </el-form-item>
              </el-col>
            </el-row>
            <!-- #endregion -->
          </el-form>
        </div>
        <div style="flex:1;">
          <div style="width=100%;" class="chart-wrapper">
            <categoryEcharts ref="yeartomcurveEcharts" :day-propetie-list="dayPropetieList" />
          </div>
        </div>
      </div>
    </div>

    <div v-if="curveType === 1">
      <div slot="footer" class="dialog-footer title-wrapper">
        <div>曲线详情-月分日权重</div>
        <div>
          <el-button type="primary" @click="submitForm('ruleForm')">另存</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">编辑</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <!-- <el-button type="primary" @click="submitForm('ruleForm')">保存并选择</el-button> -->
          <!-- <el-button type="primary" @click="dialogYearToMouth.toggle = false">取 消</el-button> -->
          <!-- <el-button type="primary" @click="dialogYearToMouth.toggle = false"
            >确 定</el-button
          > -->
        </div>
      </div>
      <div style="display: flex;">
        <div style="flex:1;">
          <el-form
            ref="mtodayquanzhong"
            :model="formDataDetial"
            :rules="rules"
            label-width="120px"
          >
            <div>
              <!-- <div style="display:flex;"> -->
              <el-form-item
                label="方案名称:"
                prop="name"
                :rules="[
                  { required: true, message: '请输入方案名称', trigger: 'blur' },
                ]"
              >
                <el-input v-model="formDataDetial.name" width="100" @input.native="changemtodayEchartTableValue" />
              </el-form-item>
              <el-form-item label="工作日权重:" prop="wedWeight">
                <el-input v-model="formDataDetial.wedWeight" @input.native="changemtodayEchartTableValue"/>
              </el-form-item>
              <el-form-item label="周六权重:" prop="satWeight">
                <el-input v-model="formDataDetial.satWeight" @input.native="changemtodayEchartTableValue"/>
              </el-form-item>
              <el-form-item label="周日权重:" prop="sunWeight">
                <el-input v-model="formDataDetial.sunWeight" @input.native="changemtodayEchartTableValue"/>
              </el-form-item>
              <el-form-item label="法定节假日权重:" prop="holiWeight">
                <el-input v-model="formDataDetial.holiWeight" @input.native="changemtodayEchartTableValue"/>
              </el-form-item>
              <el-form-item label="调休节假日权重:" prop="holiWorkWeight">
                <el-input v-model="formDataDetial.holiWorkWeight" @input.native="changemtodayEchartTableValue"/>
              </el-form-item>
              <!-- </div> -->
            </div>
          </el-form>
        </div>
        <div style="flex:1;">
          <div style="width=100%;" class="chart-wrapper">
            <monthToDayCurveEcharts ref="monthToDayCurveEcharts" :day-propetie-list="bingoret" />
          </div>
        </div>
      </div>
    </div>

    <div v-if="curveType === 2">
      <div slot="footer" class="dialog-footer title-wrapper">
        <div>曲线详情-日分时曲线</div>
        <div>
          <el-button type="primary" @click="submitForm('ruleForm')">另存</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">编辑</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <!-- <el-button type="primary" @click="submitForm('ruleForm')">保存并选择</el-button> -->
          <!-- <el-button type="primary" @click="dialogYearToMouth.toggle = false">取 消</el-button> -->
          <!-- <el-button type="primary" @click="dialogYearToMouth.toggle = false"
            >确 定</el-button
          > -->
        </div>
      </div>
      <div>
        <el-form
          ref="daytohourcurveform"
          :model="dayToHourDivisionData"
          :rules="rules"
          label-width="120px"
        >
          <el-row :gutter="5">
            <el-col :span="8">
              <el-form-item label="输入方式选择*">
                <el-switch
                  v-model="dayToHourDivisionData.dataType"
                  active-text="24点"
                  inactive-text="96点"
                  active-color="#409EFF"
                  inactive-color="red"
                  :active-value="1"
                  :inactive-value="0"
                  :width="60"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="曲线名称"
                :label-width="formLabelWidth"
                prop="name"
                :rules="[
                  { required: true, message: '请输入曲线名称', trigger: 'blur' },
                ]"
              >
                <el-input v-model="dayToHourDivisionData.name" autocomplete="off" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!-- 图表模块 -->
        <div v-if="showFormDom" style="display: flex;">
          <div style="display: flex;flex:1;height: 300px;overflow: hidden;overflow-y: scroll;border-top-style: outset;border-bottom-style: inset;">
            <div style="display: flex;width: 100%;align-items: flex-start;">
              <el-table :data="rest.slice(0,rest.length/2)" border style="width: 100%">
                <el-table-column prop="name" label="键" width="60px" />
                <el-table-column prop="value" label="值">
                  <template slot-scope="scope">
                    <el-input v-model="rest.slice(0,rest.length/2)[scope.$index].value" size="mini" class="edit-input" @input.native="changedayToHourCurveEchartTableValue" />
                  </template>
                </el-table-column>
              </el-table>
              <el-table :data="rest.slice(rest.length/2)" border style="width: 100%">
                <el-table-column prop="name" label="键" width="60px" />
                <!-- <el-table-column prop="value" label="值" /> -->
                <el-table-column prop="value" label="值">
                  <template slot-scope="scope">
                    <el-input v-model="rest.slice(rest.length/2)[scope.$index].value" size="mini" class="edit-input" @input.native="changedayToHourCurveEchartTableValue" />
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>

          <div style="flex:1;">
            <el-row
              style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px"
            >
              <div class="chart-wrapper">
                <dayToHourCurveEchart ref="dayToHourCurveEchart" :rest="rest" />
              </div>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import monthToDayCurveEcharts from './monthToDayCurveEcharts'
import dayToHourCurveEchart from './dayToHourCurveEchart'
import categoryEcharts from './categoryEcharts'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import request from '@/utils/request'
import qs from 'qs'
export default {
  name: 'Institudetail',
  components: {
    Pagination,
    categoryEcharts,
    monthToDayCurveEcharts,
    dayToHourCurveEchart
  },
  data() {
    return {
      curveType: 0,
      showFormDom: false,
      dayToHourDivisionData: {},
      formDataDetial: {},
      // bingoret: [],
      bingoret: [
        { value: 0 },
        { value: 0 },
        { value: 0 },
        { value: 0 },
        { value: 0 }
      ],
      rest: [],
      dayPropetieList: [
        { value: 0, color: 'red' },
        { value: 0, color: 'red' },
        { value: 0, color: 'pink' },
        { value: 0, color: 'pink' },
        { value: 0, color: 'pink' },
        { value: 0, color: 'pink' },
        { value: 0, color: 'red' },
        { value: 0, color: 'red' },
        { value: 0, color: 'red' },
        { value: 0, color: 'red' },
        { value: 0, color: 'red' },
        { value: 0, color: 'red' }
      ],
      formLabelWidth: '120px',
      yearToMCurve: {},
      listQuery: {
        updateTime: undefined,
        curveType: undefined,
        curveName: undefined, // 曲线名称
        presenter: undefined, // 提报人
        state: undefined, // 审批状态
        page: 1,
        size: 20
      },
      curveDTOList: null,
      listLoading: true,
      total: 0,
      selections: [], // 选择项
      // 通过  未提交  审核未通过 APPROVED, REJECTED, NOTSUBMIT
      approvalStatus: [{ id: 'APPROVED', name: '通过' }, { id: 'NOTSUBMIT', name: '未提交' }, { id: 'REJECTED', name: '审核未通过' }], // 审批状态
      agencyAllList: [], // 机构名称下拉列表
      contractTypeAllList: [], // 合同类型下拉列表
      rules: {
        contractName: [
          { required: true, message: '请输入合同名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getBuyDataList()
  },
  methods: {
    getMtoDayDetail(id) {
      //  获取常用曲线-月到日权重
      request({
        url: `curve/${id}/detail`,
        method: 'get'
      }).then((res) => {
        this.formDataDetial = res
        this.bingoret[0].value = res.wedWeight
        this.bingoret[1].value = res.satWeight
        this.bingoret[2].value = res.sunWeight
        this.bingoret[3].value = res.holiWeight
        this.bingoret[4].value = res.holiWorkWeight
        this.$refs.monthToDayCurveEcharts.initChart()
      })
    },
    changedayToHourCurveEchartTableValue() {
      this.$refs.dayToHourCurveEchart.initChart()
    },
    changemtodayEchartTableValue() {
      this.bingoret[0].value = this.formDataDetial.wedWeight
      this.bingoret[1].value = this.formDataDetial.satWeight
      this.bingoret[2].value = this.formDataDetial.sunWeight
      this.bingoret[3].value = this.formDataDetial.holiWeight
      this.bingoret[4].value = this.formDataDetial.holiWorkWeight
      this.$refs.monthToDayCurveEcharts.initChart()
    },
    changeTableValue(num, val) {
      this.dayPropetieList[num].value = this.yearToMCurve[val]
      this.$refs.yeartomcurveEcharts.initChart()
    },
    getDayToHourDivision(id) {
      //  获取日分时分解曲线-96点
      request({
        url: `/buy/dtop/${id}/division`,
        method: 'get'
      }).then((res) => {
        this.dayToHourDivisionData = res
        this.rest = []
        for (const item in res) {
          if (item.indexOf('p') === 0) {
            this.rest.push({ [item]: res[item], name: `${item}`, value: res[item] })
          }
        }
        console.log(this.rest)
        this.showFormDom = true
      })
    },
    submitForm() {
      //
    },
    getyearToMCurve(id) {
      // 获取年到月分解曲线方案详情
      request({
        // id是在  /buy  接口处获取到的
        url: `/buy/ytom/${id}/detail`,
        method: 'get'
      }).then((res) => {
        this.yearToMCurve = res
        this.dayPropetieList[0].value = res.m01
        this.dayPropetieList[1].value = res.m02
        this.dayPropetieList[2].value = res.m03
        this.dayPropetieList[3].value = res.m04
        this.dayPropetieList[4].value = res.m05
        this.dayPropetieList[5].value = res.m06
        this.dayPropetieList[6].value = res.m07
        this.dayPropetieList[7].value = res.m08
        this.dayPropetieList[8].value = res.m09
        this.dayPropetieList[9].value = res.m10
        this.dayPropetieList[10].value = res.m11
        this.dayPropetieList[11].value = res.m12
        // console.log(666, this.dayPropetieList)
        this.$refs.yeartomcurveEcharts.initChart()
      })
    },
    gotoRouter(params) {
      // params为空时，为新增
      console.log(12, params)
      this.curveType = params.curveType
      if (params.curveType === 0) {
        this.getyearToMCurve(params.id)
      }
      if (params.curveType === 1) {
        this.getMtoDayDetail(params.id)

      }
      if (params.curveType === 2) {
        this.getDayToHourDivision(params.id)
      }
    },
    deleteBuyDataList() {
      const idArr = this.selections.map(item => item.id)
      console.log('购电选中项:', this.selections, idArr)
      request({
        data: idArr,
        url: `/buy/delete`,
        method: 'delete'
      }).then(res => {
        console.log(res)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        // 刷新列表
        this.getBuyDataList()
      }).catch(_error => {
        this.$message.error('删除失败')
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getBuyDataList()
    },
    getBuyDataList() {
      this.listLoading = true
      for (const item in this.listQuery) {
        if (this.listQuery[item] === undefined) {
          delete this.listQuery[item]
        }
      }
      // /curve/list  获取常用曲线管理列表
      request({
        url: '/curve/list' + '?' + qs.stringify(this.listQuery),
        method: 'get'
      }).then(res => {
        this.curveDTOList = res.curveDTOList
        this.total = res.totalCount
        this.curveType = res.curveDTOList[0].curveType
        this.gotoRouter(res.curveDTOList[0])
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 300)
      })
    },
    // 选择改变
    selectionChangeHandler(val) {
      this.selections = val
      console.log(this.selections)
    },

    // 改变状态
    changeEnabled(data, val) {
      this.$confirm('此操作将 "' + this.dict.label.job_status[val] + '" ' + data.name + '岗位, 是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // eslint-disable-next-line no-undef
        // crudJob.edit(data).then(() => {
        //   // eslint-disable-next-line no-undef
        //   this.crud.notify(this.dict.label.job_status[val] + '成功', 'success')
        // }).catch(err => {
        //   data.enabled = !data.enabled
        //   console.log(err.data.message)
        // })
      }).catch(() => {
        data.enabled = !data.enabled
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.edit-input {
    .el-input__inner {
      border: 1px solid #e5e6e7;
    }
  }
.pagination-container{
  margin-top: 0px !important;
      padding: 12px 16px !important;
}
.title-wrapper{
  display:flex;
  justify-content: space-between;
  align-items: center;
  background: #dadada;
}
.click-item{
  cursor:pointer;word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color: #1890ff;font-size: 13px;
}
.filter-container {
  padding-bottom: 10px;
  .filter-item {
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 10px;
  }
}
 ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
