<template>
  <div style="padding: 30px">
    <!-- <el-alert :closable="false" title="购电合同" type="warning" /> -->
    <div>市场规则信息</div>
    <div>
      <div class="toubu">
        <div>考核规则年度方案</div>
        <div>
          <el-button v-if="this.$route.query.id !== &quot;&quot;" type="primary" @click="isEdit = false">编辑</el-button>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
          >保存</el-button>
          <el-button
            type="primary"
            @click="$router.push('/usermanage/contractinformation/buycontract')"
          >返回</el-button>
        </div>
      </div>
      <el-form
        ref="ruleForm"
        :rules="rules"
        :model="buycontractinfo"
        label-width="120px"
        class="demo-form-inline"
      >
        <!-- #region -->
        <el-row :gutter="5">
          <el-col :span="12">
            <el-form-item label="规则名称" prop="name">
              <el-input
                v-model="buycontractinfo.name"
                :disabled="this.$route.query.id !== '' && isEdit"
                style="width: 220px"
                placeholder="请输入规则名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="所属区域" prop="gridDTO">
              <el-select
                v-model="buycontractinfo.gridDTO"
                :disabled="this.$route.query.id !== '' && isEdit"
                style="width: 220px"
                placeholder="所属区域"
              >
                <el-option
                  v-for="(item, index) in gridList"
                  :key="`${item.id}${index}`"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="12">
            <el-form-item label="创建时间">
              <el-date-picker
                v-model="buycontractinfo.createTime"
                disabled
                format="yyyy-MM-dd HH:mm:ss"
                type="date"
              />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item
              label="填报人"
              prop="userSmallDTO"
              :rules="{ required: true, message: '请输入填报人', trigger: 'blur' }"
            >
              <el-input
                v-model="buycontractinfo.userSmallDTO"
                :disabled="this.$route.query.id !== ''"
                style="width: 220px"
                placeholder="请输入填报人"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="24">
            <el-form-item label="起止时间" prop="timeLine">
              <el-date-picker
                v-model="buycontractinfo.timeLine"
                class="input-class"
                :disabled="this.$route.query.id !== '' && isEdit"
                :default-time="['00:00:00', '23:59:59']"
                unlink-panels
                type="daterange"
                format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="GetzhifuTime"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="12">
            <el-form-item label="是否有分时比例" prop="timeofuseValid">
              <el-select
                v-model="buycontractinfo.timeofuseValid"
                :disabled="this.$route.query.id !== '' && isEdit"
                placeholder="是否有分时比例"
                style="width: 220px"
              >
                <el-option label="是" :value="1" />
                <el-option label="否" :value="0" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="buycontractinfo.timeofuseValid == 1" label="分时方案">
              <el-select
                v-model="buycontractinfo.timeperiodofusecfgDTO"
                :disabled="this.$route.query.id !== '' && isEdit || buycontractinfo.timeofuseValid == 0"
                placeholder="分时方案"
                style="width: 220px"
                @change="selectTimeperiodofusecfgDTO"
              >
                <el-option
                  v-for="(item, index) in periodList"
                  :key="`${item.id}${index}`"
                  :label="item.name"
                  :value="item.id"
                />
                <el-option label="新增自定义方案" :value="999" />
              </el-select>
              <el-button
                :disabled="this.$route.query.id !== '' && isEdit || buycontractinfo.timeofuseValid == 0"
                type="primary"
                @click="showDialogFormVisible.toggle = true"
              >查询/编辑/另存</el-button>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 考核规则年度方案 -->
        <div style="display: flex; flex-direction: column">
          <div class="fenjiefangan">考核规则年度方案</div>
          <el-row>
            <el-col>
              <el-form-item
                label="输入方式选择"
                :label-width="formLabelWidth"
                prop="chooseEntyType"
              >
                <el-radio-group v-model="chooseEntyType">
                  <el-radio label="0">日历周-12个月统一</el-radio>
                  <el-radio label="1">日历周-12个月单独</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="全年统一方案：">
            <el-select
              v-model="mouthToDayBaseDetail.planDTOList[0].planId"
              :disabled="chooseEntyType == 1"
              placeholder="全年统一方案："
            >
              <el-option disabled label="请选择方案" value="" />
              <el-option label="浙江典型年度分解方案" :value="1" />
              <el-option label="广东典型年度分解方案" :value="2" />
              <el-option label="广东20年典型日权重1" :value="3" />
              <el-option label="广东20年典型日权重2" :value="4" />
              <el-option label="新增自定义方案" :value="999" />
            </el-select>
            <el-button
              :disabled="chooseEntyType == 1"
              type="primary"
              @click="showDialogMToDay(mouthToDayBaseDetail.planDTOList[0].planId, 0)"
            >查询/编辑/另存</el-button>
          </el-form-item>
          <!-- #region -->
          <el-form-item label="1月份方案：">
            <el-select
              v-model="mouthToDayBaseDetail.planDTOList[1].planId"
              :disabled="chooseEntyType == 0"
              placeholder="1月份方案："
            >
              <el-option disabled label="请选择方案" value="" />
              <el-option
                v-for="item in decompositionScheme"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
              <el-option label="新增自定义方案" :value="999" />
            </el-select>
            <el-button
              :disabled="chooseEntyType == 0"
              type="primary"
              @click="showDialogMToDay(mouthToDayBaseDetail.planDTOList[1].planId, 1)"
            >查询/编辑/另存</el-button>
          </el-form-item>
          <el-form-item label="2月份方案：">
            <el-select
              v-model="mouthToDayBaseDetail.planDTOList[2].planId"
              :disabled="chooseEntyType == 0"
              placeholder="2月份方案："
            >
              <el-option disabled label="请选择方案" value="" />
              <el-option
                v-for="item in decompositionScheme"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
              <el-option label="新增自定义方案" :value="999" />
            </el-select>
            <el-button
              :disabled="chooseEntyType == 0"
              type="primary"
              @click="showDialogMToDay(mouthToDayBaseDetail.planDTOList[2].planId, 2)"
            >查询/编辑/另存</el-button>
          </el-form-item>
          <el-form-item label="3月份方案：">
            <el-select
              v-model="mouthToDayBaseDetail.planDTOList[3].planId"
              :disabled="chooseEntyType == 0"
              placeholder="3月份方案："
            >
              <el-option disabled label="请选择方案" value="" />
              <el-option
                v-for="item in decompositionScheme"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
              <el-option label="新增自定义方案" :value="999" />
            </el-select>
            <el-button
              :disabled="chooseEntyType == 0"
              type="primary"
              @click="showDialogMToDay(mouthToDayBaseDetail.planDTOList[3].planId, 3)"
            >查询/编辑/另存</el-button>
          </el-form-item>
          <el-form-item label="4月份方案：">
            <el-select
              v-model="mouthToDayBaseDetail.planDTOList[4].planId"
              :disabled="chooseEntyType == 0"
              placeholder="4月份方案："
            >
              <el-option disabled label="请选择方案" value="" />
              <el-option
                v-for="item in decompositionScheme"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
              <el-option label="新增自定义方案" :value="999" />
            </el-select>
            <el-button
              :disabled="chooseEntyType == 0"
              type="primary"
              @click="showDialogMToDay(mouthToDayBaseDetail.planDTOList[4].planId, 4)"
            >查询/编辑/另存</el-button>
          </el-form-item>
          <el-form-item label="5月份方案：">
            <el-select
              v-model="mouthToDayBaseDetail.planDTOList[5].planId"
              :disabled="chooseEntyType == 0"
              placeholder="5月份方案："
            >
              <el-option disabled label="请选择方案" value="" />
              <el-option
                v-for="item in decompositionScheme"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
              <el-option label="新增自定义方案" :value="999" />
            </el-select>
            <el-button
              :disabled="chooseEntyType == 0"
              type="primary"
              @click="showDialogMToDay(mouthToDayBaseDetail.planDTOList[5].planId, 5)"
            >查询/编辑/另存</el-button>
          </el-form-item>
          <el-form-item label="6月份方案：">
            <el-select
              v-model="mouthToDayBaseDetail.planDTOList[6].planId"
              :disabled="chooseEntyType == 0"
              placeholder="6月份方案："
            >
              <el-option disabled label="请选择方案" value="" />
              <el-option
                v-for="item in decompositionScheme"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
              <el-option label="新增自定义方案" :value="999" />
            </el-select>
            <el-button
              :disabled="chooseEntyType == 0"
              type="primary"
              @click="showDialogMToDay(mouthToDayBaseDetail.planDTOList[6].planId, 6)"
            >查询/编辑/另存</el-button>
          </el-form-item>
          <el-form-item label="7月份方案：">
            <el-select
              v-model="mouthToDayBaseDetail.planDTOList[7].planId"
              :disabled="chooseEntyType == 0"
              placeholder="7月份方案："
            >
              <el-option disabled label="请选择方案" value="" />
              <el-option
                v-for="item in decompositionScheme"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
              <el-option label="新增自定义方案" :value="999" />
            </el-select>
            <el-button
              :disabled="chooseEntyType == 0"
              type="primary"
              @click="showDialogMToDay(mouthToDayBaseDetail.planDTOList[7].planId, 7)"
            >查询/编辑/另存</el-button>
          </el-form-item>
          <el-form-item label="8月份方案：">
            <el-select
              v-model="mouthToDayBaseDetail.planDTOList[8].planId"
              :disabled="chooseEntyType == 0"
              placeholder="8月份方案："
            >
              <el-option disabled label="请选择方案" value="" />
              <el-option
                v-for="item in decompositionScheme"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
              <el-option label="新增自定义方案" :value="999" />
            </el-select>
            <el-button
              :disabled="chooseEntyType == 0"
              type="primary"
              @click="showDialogMToDay(mouthToDayBaseDetail.planDTOList[8].planId, 8)"
            >查询/编辑/另存</el-button>
          </el-form-item>
          <el-form-item label="9月份方案：">
            <el-select
              v-model="mouthToDayBaseDetail.planDTOList[9].planId"
              :disabled="chooseEntyType == 0"
              placeholder="9月份方案："
            >
              <el-option disabled label="请选择方案" value="" />
              <el-option
                v-for="item in decompositionScheme"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
              <el-option label="新增自定义方案" :value="999" />
            </el-select>
            <el-button
              :disabled="chooseEntyType == 0"
              type="primary"
              @click="showDialogMToDay(mouthToDayBaseDetail.planDTOList[9].planId, 9)"
            >查询/编辑/另存</el-button>
          </el-form-item>
          <el-form-item label="10月份方案：">
            <el-select
              v-model="mouthToDayBaseDetail.planDTOList[10].planId"
              :disabled="chooseEntyType == 0"
              placeholder="10月份方案："
            >
              <el-option disabled label="请选择方案" value="" />
              <el-option
                v-for="item in decompositionScheme"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
              <el-option label="新增自定义方案" :value="999" />
            </el-select>
            <el-button
              :disabled="chooseEntyType == 0"
              type="primary"
              @click="showDialogMToDay(mouthToDayBaseDetail.planDTOList[10].planId, 10)"
            >查询/编辑/另存</el-button>
          </el-form-item>
          <el-form-item label="11月份方案：">
            <el-select
              v-model="mouthToDayBaseDetail.planDTOList[11].planId"
              :disabled="chooseEntyType == 0"
              placeholder="11月份方案："
            >
              <el-option disabled label="请选择方案" value="" />
              <el-option
                v-for="item in decompositionScheme"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
              <el-option label="新增自定义方案" :value="999" />
            </el-select>
            <el-button
              :disabled="chooseEntyType == 0"
              type="primary"
              @click="showDialogMToDay(mouthToDayBaseDetail.planDTOList[11].planId, 11)"
            >查询/编辑/另存</el-button>
          </el-form-item>
          <el-form-item label="12月份方案：">
            <el-select
              v-model="mouthToDayBaseDetail.planDTOList[12].planId"
              :disabled="chooseEntyType == 0"
              placeholder="12月份方案："
            >
              <el-option disabled label="请选择方案" value="" />
              <el-option
                v-for="item in decompositionScheme"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
              <el-option label="新增自定义方案" :value="999" />
            </el-select>
            <el-button
              :disabled="chooseEntyType == 0"
              type="primary"
              @click="showDialogMToDay(mouthToDayBaseDetail.planDTOList[12].planId, 12)"
            >查询/编辑/另存</el-button>
          </el-form-item>
        <!-- #endregion -->
        </div>
        <!-- #endregion -->
      </el-form>
    </div>
    <!-- #region -->
    <!-- 分时方案弹窗 -->
    <timesAsingScheme
      :id="buycontractinfo.timeperiodofusecfgDTO"
      :show-dialog-form-visible="showDialogFormVisible"
      @getPeriodList="getPeriodList"
    />
    <mouthToDayDetial
      :dialog-mouth-to-day-detial="dialogMouthToDayDetial"
      :form-data-detial="formDataDetial"
    />
    <!-- #endregion -->
  </div>
</template>
<script>
import request from '@/utils/request'
import mouthToDayDetial from './mouthToDayDetial'
import timesAsingScheme from './module/timesasingscheme'
export default {
  components: {
    timesAsingScheme,
    mouthToDayDetial
  },
  data() {
    return {
      formDataDetial: {},
      decompositionScheme: [], // 月到日基本页面内的--分解方案
      formLabelWidth: '120px',
      chooseEntyType: '0',
      buycontractinfo: {
        createTime: new Date(), // 创建时间
        userSmallDTO: '', // 填报人
        timeofuseValid: 1, // 是否有分时比例
        gridDTO: '', // 所属区域
        timeLine: '', // 用来存放日期组件所选中的值
        name: '', // 合同名称
        timeperiodofusecfgDTO: 3 // 分时方案
      },
      isEdit: true, // 点击编辑修改是否可以编辑
      // 分时方案详情页面 -- 弹窗表单
      showDialogFormVisible: { toggle: false, add: false },
      periodList: [], // 获取分时方案列表
      gridList: [], // /buy/gridList 获取所属区域列表
      rules: {
        name: [{ required: true, message: '请输入合同名称', trigger: 'blur' }],
        gridDTO: [
          { required: true, message: '请选择所属区域', trigger: 'change' }
        ],
        timeLine: [
          { required: true, message: '请输入起始时间', trigger: 'change' }
        ],
        timeofuseValid: [
          { required: true, message: '请选择是否有分时比例', trigger: 'change' }
        ]
      },
      mouthToDayBaseDetail: {
        dataType: '',
        id: '',
        m01: '',
        m02: '',
        m03: '',
        m04: '',
        m05: '',
        m06: '',
        m07: '',
        m08: '',
        m09: '',
        m10: '',
        m11: '',
        m12: '',
        name: '',
        planDTOList: [
          { month: '', planId: '' },
          { month: '', planId: '' },
          { month: '', planId: '' },
          { month: '', planId: '' },
          { month: '', planId: '' },
          { month: '', planId: '' },
          { month: '', planId: '' },
          { month: '', planId: '' },
          { month: '', planId: '' },
          { month: '', planId: '' },
          { month: '', planId: '' },
          { month: '', planId: '' },
          { month: '', planId: '' }
        ]
      },
      dialogMouthToDayDetial: { toggle: false }// 考核规则月度方案详情页面
    }
  },
  async created() {
    await this.getGridList()
    await this.getPeriodList()
    await this.getPlanlist()
    // 根据ID获取当前点击的合同的内容
    // 如果 this.$route.query.id 为空，则表示是新增详情页，不凋 getContractinDetail
    if (this.$route.query.id) {
      await this.getContractinDetail()
      await this.getMouthToDayBasic()
    }
  },
  methods: {
    async showDialogMToDay(selectId, month) {
      await this.getMouthToDayDetail(selectId, month)
      await console.log('await 2')
    },
    getMouthToDayDetail(selectId, month) {
      // 获取月到日分解曲线方案详情页
      const contractId = this.$route.query.id
      this.month = month
      request({
        // id是在  /buy  接口处获取到的 /buy/{contractId}/{mtodId}/detail
        url: `/buy/${contractId}/${selectId}/detail?month=${month}`,
        method: 'get'
      })
        .then((res) => {
          console.log('获取月到日分解曲线方案详情页-')
          this.formDataDetial = res.weightMtod
          console.log('await 1')
        })
        .then(() => {
          console.log('await 3')
          this.dialogMouthToDayDetial.toggle = true
        })
    },
    getPlanlist() {
      // 获取分解曲线方案列表
      request({
        url: `/buy/planlist?type=3`,
        method: 'get'
      }).then((res) => {
        this.decompositionScheme = res
      })
    },
    getMouthToDayBasic() { // 获取月到日分解曲线方案基本页
      request({
        // id是在  /buy  接口处获取到的
        url: `/buy/mtod/${this.$route.query.id}/basic`,
        method: 'get'
      }).then((res) => {
        res.planDTOList.forEach((item) => delete item.planName)
        this.mouthToDayBaseDetail = res
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(33, valid)
        if (valid) {
          // copyItems.forEach((item) => arr.push(Number(item.price)));
          // console.log("buycontractinfo", copyItems, arr, this.buycontractinfo);
          const saveData = JSON.parse(JSON.stringify(this.buycontractinfo))
          saveData.gridID = saveData.gridDTO
          console.log('gag', this.$store.state.user.user.id)
          if (this.$route.query.id === '') {
            saveData.userId = 1003
            // saveData.userId = this.$store.state.user.user.id
          }
          console.log('保存buycontractinfo:', saveData)
          this.saveContractinDetail(saveData)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 修改分时方案选项
    selectTimeperiodofusecfgDTO(event, item) {
      console.log('修改分时方案选项重置合同价格方案', event)
      if (event === 999) {
        this.showDialogFormVisible.toggle = true
        this.showDialogFormVisible.add = true
        return
      }
    },
    saveContractinDetail(val) {
      request({
        url: '/buy/save',
        method: 'post',
        data: val
      })
        .then((res) => {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        })
        .catch((error) => {
          console.log(error)
          this.$message.error('保存失败')
        })
    },
    GetzhifuTime() {
      // 利用change事件监听表单内容变化，并将选中的值赋值给所需要的两个字段
      // 支付时间戳设置
      // console.log(77777, this.buycontractinfo.timeLine)
      if (this.buycontractinfo != null) {
        this.buycontractinfo.startDate = this.buycontractinfo.timeLine[0]
        this.buycontractinfo.endDate = this.buycontractinfo.timeLine[1]
      }
    },
    getContractinDetail() {
      request({
        url: `/buy/${this.$route.query.id}/detail`,
        method: 'get'
      }).then((res) => {
        const ret = JSON.parse(JSON.stringify(res))
        this.buycontractinfo = ret
        this.buycontractinfo.gridDTO = ret.gridDTO.id // 设置所属区域id
        this.buycontractinfo.userSmallDTO = ret.userSmallDTO.name // 设置填报人
        // 日期区间回显
        this.$set(this.buycontractinfo, 'timeLine', [
          ret.startDate,
          ret.endDate
        ])
        this.buycontractinfo.timeperiodofusecfgDTO =
          ret.timeperiodofusecfgDTO.id // 合同名称
      })
    },
    getPeriodList(type, id) { // 获取分时方案下拉列表
      request({
        url: '/buy/periodlist',
        method: 'get'
      }).then((res) => {
        this.periodList = res
        if (type === 'saveselected') {
          this.buycontractinfo.timeperiodofusecfgDTO = id
        }
      })
    },
    getGridList() { // 获取所属区域下拉列表
      request({
        url: '/buy/gridList',
        method: 'get'
      }).then((res) => {
        this.gridList = res
      })
    }
  }
}
</script>
<style lang="scss" scope>
.toubu {
  display: flex;
  justify-content: space-between;
  background: #ece9e9;
  align-items: center;
  margin-bottom: 10px;
}
.fenjiefangan {
  padding-top: 10px;
  padding-bottom: 10px;
  background: #e2dddd;
  margin-bottom: 17px;
  margin-top: 14px;
}
.el-range-editor.el-input__inner {
  width: 400px;
}
.el-row {
  /* margin-bottom: 20px; */
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
