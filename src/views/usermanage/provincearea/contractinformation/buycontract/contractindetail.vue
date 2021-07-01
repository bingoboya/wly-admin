<template>
  <div style="padding: 30px">
    <!-- <el-alert :closable="false" title="购电合同" type="warning" /> -->
    <div>
      <div class="toubu">
        <div>购电合同基本信息</div>
        <div>
          <el-button v-if='this.$route.query.id !== ""' type="primary" @click="isEdit = false">编辑</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >保存</el-button
          >
          <el-button
            type="primary"
            @click="$router.push('/usermanage/contractinformation/buycontract')"
            >返回</el-button
          >
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
            <el-form-item label="合同名称" prop="name">
              <el-input
                :disabled="this.$route.query.id !== '' && isEdit"
                v-model="buycontractinfo.name"
                style="width: 220px"
                placeholder="请输入合同名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="机构名称" prop="meterInfoDTO">
              <el-select
                :disabled="this.$route.query.id !== '' && isEdit"
                v-model="buycontractinfo.meterInfoDTO"
                placeholder="机构名称"
                style="width: 220px"
              >
                <el-option
                  v-for="(item, index) in meterNameList"
                  :key="`${item.id}${index}`"
                  style="width: 220px"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="12">
            <el-form-item label="所属区域" prop="gridDTO">
              <el-select
                :disabled="this.$route.query.id !== '' && isEdit"
                v-model="buycontractinfo.gridDTO"
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
          <el-col :span="10">
            <el-form-item label="总电量" prop="totalElectricity">
              <el-input
                :disabled="this.$route.query.id !== '' && isEdit"
                v-model="buycontractinfo.totalElectricity"
                style="width: 220px"
                placeholder="请输入总电量"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="12">
            <el-form-item label="价格类型">
              <el-select
                :disabled="this.$route.query.id !== '' && isEdit"
                v-model="buycontractinfo.priceType"
                placeholder="价格类型"
                style="width: 220px"
              >
                <el-option label="绝对价" :value="0" />
                <el-option label="价差" :value="1" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="12">
            <el-form-item label="合同类型" prop="contracttypeinfoDTO">
              <el-select
                :disabled="this.$route.query.id !== '' && isEdit"
                v-model="buycontractinfo.contracttypeinfoDTO"
                placeholder="合同类型"
                style="width: 220px"
              >
                <el-option
                  v-for="(item, index) in buycontractinfo.contracttypeinfoList"
                  :key="`${item.id}${index}`"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="填报人" 
              prop="userSmallDTO" :rules="{ required: true, message: '请输入填报人', trigger: 'blur' }"
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
          <el-col :span="12">
            <el-form-item label="签署时间">
              <el-date-picker
                :disabled="this.$route.query.id !== '' && isEdit"
                v-model="buycontractinfo.signDate"
                placeholder="请选择签署时间"
                format="yyyy-MM-dd"
                type="date"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="创建时间">
              <el-date-picker
                v-model="buycontractinfo.createTime"
                disabled
                format="yyyy-MM-dd HH:mm:ss"
                type="date"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="24">
            <el-form-item label="起止时间" prop="timeLine">
              <el-date-picker
                class="input-class"
                :disabled="this.$route.query.id !== '' && isEdit"
                v-model="buycontractinfo.timeLine"
                @change="GetzhifuTime"
                :default-time="['00:00:00', '23:59:59']"
                unlink-panels
                type="daterange"
                format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 分时比例和价格方案要放到一个el-col中，切换分时比例时才会使 validateEmail 校验效果生效, 或者放到div中就不会有这种问题-->
        <el-row :gutter="5">
          <el-col :span="12">
            <el-form-item label="是否有分时比例"  prop="timeofuseValid">
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
            <el-form-item v-if='buycontractinfo.timeofuseValid == 1' :label="`合同价格方案`"  prop="pricetimeofuseDTO"
              :rules="[{ required: buycontractinfo.timeofuseValid == 1, message: buycontractinfo.timeperiodofusecfgDTO == 999 ? `请选择分时方案` : `请选择合同价格方案`, trigger: 'change' }]"
            >
              <el-select
                :disabled="buycontractinfo.timeperiodofusecfgDTO == 999 || this.$route.query.id !== '' && isEdit || buycontractinfo.timeofuseValid == 0"
                @change="selectContractPrice"
                v-model="buycontractinfo.pricetimeofuseDTO"
                placeholder="合同价格方案"
                style="width: 220px"
              >
                <el-option label="请选择" value="" disabled/>
                <el-option
                  v-for="(item, index) in contractPriceList"
                  :key="`${item.id}${index}`"
                  :label="item.name"
                  :value="item.id"
                />
                <el-option label="新增自定义方案" :value="999" />
              </el-select>
              <el-button
                :disabled="this.$route.query.id !== '' && isEdit || !buycontractinfo.pricetimeofuseDTO || buycontractinfo.timeofuseValid == 0"
                type="primary"
                @click="showDialogContractPrice.toggle = true"
                >查询/编辑/另存</el-button
              >
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if='buycontractinfo.timeofuseValid == 1' label="分时方案">
              <el-select
                :disabled="this.$route.query.id !== '' && isEdit || buycontractinfo.timeofuseValid == 0"
                @change="selectTimeperiodofusecfgDTO"
                v-model="buycontractinfo.timeperiodofusecfgDTO"
                placeholder="分时方案"
                style="width: 220px"
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
                >查询/编辑/另存</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" style="display: flex;">
            <!-- articleList.slice(0,1) -->
            <!-- <div v-for="(item, index) in buycontractinfo.priceList" :key="index"> -->
            <el-form-item v-for="(item, index) in (buycontractinfo.timeofuseValid == 1 ? items : items.slice(0,1))" :label='`合同价格${index+1}:`' :key="index">
                <el-input
                  disabled
                  v-model="item.price"
                  style="width: 220px;"
                  placeholder="请输入合同价格"
                />
              <!-- onkeyup="value=value.replace(/[^\d.]/g,'')" ==> 只能输入数字和小数点 -->
              <!-- </div> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
           <el-col :span="12">
            <el-form-item label="是否有分解曲线" prop="curveValid">
              <el-select
                :disabled="this.$route.query.id !== '' && isEdit"
                v-model="buycontractinfo.curveValid"
                placeholder="是否有分解曲线"
                style="width: 220px"
              >
                <el-option label="是" :value="1" />
                <el-option label="否" :value="0" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div style="display: flex; flex-direction: column">
          <div class="fenjiefangan">分解曲线方案</div>
          <el-form-item label="年到月分解方案">
            <el-select
              :disabled="this.$route.query.id !== '' && isEdit || buycontractinfo.curveValid == 0"
              @change="selectCurveytomDTO"
              style="width: 220px"
              v-model="buycontractinfo.curveytomDTO"
              placeholder="年到月分解方案"
            >
            <el-option label="请选择" value="" disabled />
              <el-option
                v-for="(item, index) in yearToMonthPlan"
                :key="`${item.id}${index}`"
                :label="item.name"
                :value="item.id"
              />
              <el-option label="新增自定义方案" :value="999" />
            </el-select>
            <el-button
              :disabled="this.$route.query.id !== '' && isEdit || buycontractinfo.curveValid == 0 || !buycontractinfo.curveytomDTO"
              type="primary"
              @click="dialogYearToMouth.toggle = true"
              >查询/编辑/另存</el-button
            >
          </el-form-item>
          <el-form-item label="月到日分解方案">
            <el-select
              :disabled="this.$route.query.id !== '' && isEdit || buycontractinfo.curveValid == 0"
              style="width: 220px"
              @change="selectWeightsetyearlymtodDTO"
              v-model="buycontractinfo.weightsetyearlymtodDTO"
              placeholder="月到日分解方案"
            >
            <el-option label="请选择" value="" disabled />
              <el-option
                v-for="(item, index) in monthToDayPlan"
                :key="`${item.id}${index}`"
                :label="item.name"
                :value="item.id"
              />
              <el-option label="新增自定义方案" :value="999" />
            </el-select>
            <el-button
              :disabled="this.$route.query.id !== '' && isEdit || buycontractinfo.curveValid == 0 || !buycontractinfo.weightsetyearlymtodDTO"
              type="primary"
              @click="dialogMouthToDayBase.toggle = true"
              >查询/编辑/另存</el-button
            >
          </el-form-item>
          <el-form-item label="日分时分解方案">
            <el-select
              :disabled="this.$route.query.id !== '' && isEdit || buycontractinfo.curveValid == 0"
              style="width: 220px"
              @change="selectCurvesetyearlydtopDTO"
              v-model="buycontractinfo.curvesetyearlydtopDTO"
              placeholder="日分时分解方案"
            >
            <el-option label="请选择" value="" disabled />
              <el-option
                v-for="(item, index) in dayToHourPlan"
                :key="`${item.id}${index}`"
                :label="item.name"
                :value="item.id"
              />
              <el-option label="新增自定义方案" :value="999" />
            </el-select>
            <el-button
              :disabled="this.$route.query.id !== '' && isEdit || buycontractinfo.curveValid == 0 || !buycontractinfo.curvesetyearlydtopDTO"
              type="primary"
              @click="dialogDayToHourBase.toggle = true"
              >查询/编辑/另存</el-button
            >
          </el-form-item>
        </div>
        <!-- #endregion -->
      </el-form>
    </div>
    <!-- #region -->
    <!-- 分时方案弹窗 -->
    <timesAsingScheme
      :id='this.buycontractinfo.timeperiodofusecfgDTO'
      @getPeriodList='getPeriodList'
      :showDialogFormVisible="showDialogFormVisible"
    />
    <!-- 合同价格方案弹窗 -->
    <contractPrice 
      @changepricetimeofuseDTO='changepricetimeofuseDTO'
      :id='buycontractinfo.pricetimeofuseDTO'
      :contractPriceList='contractPriceList'
      :cfgId='this.buycontractinfo.timeperiodofusecfgDTO'
      :items="items" :showDialogContractPrice="showDialogContractPrice"
    />
    <yearToMouth
      :totalElectricity="buycontractinfo.totalElectricity"
      :dialogYearToMouth="dialogYearToMouth"
      :id="buycontractinfo.curveytomDTO"
    />
    <mouthToDayBase
      :totalElectricity="buycontractinfo.totalElectricity"
      :decompositionScheme="decompositionScheme"
      :dialogMouthToDayBase="dialogMouthToDayBase"
      :id="buycontractinfo.weightsetyearlymtodDTO"
    />
    <dayToHourBase
      :totalElectricity="buycontractinfo.totalElectricity"
      :dialogDayToHourBase="dialogDayToHourBase"
      :id="buycontractinfo.curvesetyearlydtopDTO"
    />
    <!-- #endregion -->
  </div>
</template>
<script>
import request from "@/utils/request";
import contractPrice from "./module/contractPrice";
import timesAsingScheme from "./module/timesasingscheme";
import yearToMouth from "./module/yeartomouth";
import mouthToDayBase from "./module/mouthToDayBase";
import dayToHourBase from "./module/dayToHourBase";
export default {
  data() {
    
    return {
      items: [
        // { price: 101}, { price: 103},
      ],
      buycontractinfo: {
        createTime: new Date(), // 创建时间
        userSmallDTO: "", //填报人
        timeofuseValid: 1, // 是否有分时比例
        contracttypeinfoDTO: "", // 合同类型
        curveValid: 1, // 是否有分解曲线
        contractPrice: "", // 合同价格
        gridDTO: "", //所属区域
        meterInfoDTO: "", // 机构名称
        totalElectricity: "", // 总电量
        timeLine: "", //用来存放日期组件所选中的值
        signDate: "", // 签署时间
        name: "", // 合同名称
        priceType: 0, // 价格类型
        timeperiodofusecfgDTO: 3, // 分时方案
        pricetimeofuseDTO: "", // 合同价格方案
        priceList: [], // 合同价格列表
        curveytomDTO: "", // 年到月分解方案
        weightsetyearlymtodDTO: "", // 月到日分解方案
        curvesetyearlydtopDTO: "", // 日分时分解方案
        contracttypeinfoList: [], // 合同类型
      },
      isEdit: true, //点击编辑修改是否可以编辑
      yearToMonthPlan: [], // 年到月
      monthToDayPlan: [], //月到日
      dayToHourPlan: [], //日到时
      decompositionScheme: [], //月到日基本页面内的--分解方案
      // 分时方案详情页面 -- 弹窗表单
      showDialogFormVisible: { toggle: false, add: false },
      // 合同价格方案弹出页面 -- 弹窗表单
      showDialogContractPrice: { toggle: false, add: false },
      // 年到月分时方案详情页面 -- 弹窗表单
      dialogYearToMouth: { toggle: false, add: false },
      // 月到日分时方案基础页面 -- 弹窗表单
      dialogMouthToDayBase: { toggle: false, add: false },
      // 日分时分时方案基础页面 -- 弹窗表单
      dialogDayToHourBase: { toggle: false, add: false },
      contracttypeinfoList: [], //合同类型下拉
      meterNameList: [], //机构名称列表
      contractPriceList: [], //合同价格方案列表
      periodList: [], //获取分时方案列表
      gridList: [], // /buy/gridList 获取所属区域列表
      rules: {
        name: [{ required: true, message: "请输入合同名称", trigger: "blur" }],
        totalElectricity: [
          { required: true, message: "请输入总电量", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        meterInfoDTO: [
          { required: true, message: "请输入机构名称", trigger: "change" },
        ],
        gridDTO: [
          { required: true, message: '请选择所属区域', trigger: 'change' }
        ],
        contracttypeinfoDTO: [
          { required: true, message: '请选择合同类型', trigger: 'change' }
        ],
        timeLine: [
          { required: true, message: "请输入起始时间", trigger: "change" },
        ],
        curveValid: [
          {required: true, message: "请选择是否有分解曲线", trigger: "change",},
        ],
        timeofuseValid: [
          {required: true, message: "请选择是否有分时比例",trigger: "change"},
          // {validator: ()=>this.validateEmail('jj'),trigger: 'change'}
        ],
      },
    };
    
  },
  async created() {
    await this.getAgencyAll();
    await this.getGridList();
    await this.getPeriodList();
    await this.getcontractTypeAllList(); //获取合同类型下拉列表
    await this.getPlanlist(0); // 年到月 下拉列表
    await this.getPlanlist(1); // 月到日 下拉列表
    await this.getPlanlist(2); // 日到时 下拉列表
    await this.getPlanlist(3); // 获取月分解方案（ppt 第8页）
    await this.getPricelist(this.buycontractinfo.timeperiodofusecfgDTO);

    // 根据ID获取当前点击的合同的内容
    // 如果 this.$route.query.id 为空，则表示是新增详情页，不凋 getContractinDetail
    if(this.$route.query.id){
      await this.getContractinDetail();
    }
  },
  methods: {
    validateEmail(formName) {
      console.log('wocaao', formName);
      this.$refs['ruleForm'].validateField('pricetimeofuseDTO', emailError => {
        console.log('emailError', emailError, this.buycontractinfo.timeofuseValid);
        // if (this.buycontractinfo.timeofuseValid == 0) {
        if (!emailError) {
          console.log(22, emailError, '邮箱验证通过!')
          // alert('邮箱验证通过!');
          return true;
        } else {
          console.log('邮箱验证失败');
          return false;
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(33, valid);
        if (valid) {
          // let copyItems = JSON.parse(JSON.stringify(this.items));
          // let arr = [];
          // 保存接口不需要提交 priceList 数据
          // copyItems.forEach((item) => arr.push(Number(item.price)));
          // this.buycontractinfo.priceList = arr;
          // console.log("buycontractinfo", copyItems, arr, this.buycontractinfo);
          let saveData = JSON.parse(JSON.stringify(this.buycontractinfo))
          saveData.typeID = saveData.contracttypeinfoDTO
          saveData.meterID = saveData.meterInfoDTO
          saveData.gridID = saveData.gridDTO
          saveData.curveYtomID = saveData.curveytomDTO
          saveData.weightSetYearlyMtodID = saveData.weightsetyearlymtodDTO
          saveData.curveSetYearlyDtopID = saveData.curvesetyearlydtopDTO
          saveData.priceTimeofUseId = saveData.pricetimeofuseDTO
          saveData.timeperiodofusecfgId = saveData.timeperiodofusecfgDTO
          saveData.totalElectricity = Number(saveData.totalElectricity)
          console.log('gag', this.$store.state.user.user.id);
          if(this.$route.query.id == ''){
            saveData.userId = 1003
            // saveData.userId = this.$store.state.user.user.id
            }
          console.log('保存buycontractinfo:', saveData);
          this.saveContractinDetail(saveData);
          // this.saveContractinDetail(this.buycontractinfo);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getcontractTypeAllList() {
      //获取合同类型下拉列表
      request({
        url: "/buy/typelist",
        method: "get",
      }).then((res) => {
        this.buycontractinfo.contracttypeinfoList = res;
      });
    },
    changepricetimeofuseDTO(id){
      //修改buycontractinfo.pricetimeofuseDTO当前的选项
      console.log('id:', id);
      this.buycontractinfo.pricetimeofuseDTO = id
      request({
        url: `/buy/tpfcg/${this.buycontractinfo.timeperiodofusecfgDTO}/pricelist`,
        method: 'get'
      }).then((res) => {
        this.contractPriceList = res
        this.selectContractPrice(id)
      })
    },
    selectContractPrice(event, item) {
      console.log("修改合同价格方案选项id", event);
      console.log("修改合同价格方案选项2",this.buycontractinfo.pricetimeofuseDTO,this.buycontractinfo.timeperiodofusecfgDTO, this.contractPriceList);
      if (event == 999) {
        this.showDialogContractPrice.toggle = true;
        this.showDialogContractPrice.add = true;
        let timeperiodofusecfgDTO = this.buycontractinfo.timeperiodofusecfgDTO
        let periodNum = this.periodList.find(item => item.id == timeperiodofusecfgDTO).numPeriod
        this.items = new Array(periodNum)
        this.items.fill({'price': ''})
      } else {
        this.showDialogContractPrice.add = false;
        // console.log(666, this.contractPriceList);
        let aa = this.contractPriceList.filter(val => val.id == event)
        // console.log('aa:', aa, aa[0].priceList);
        let arr = [];
        aa[0].priceList.forEach((item) => {
          arr.push({ price: item });
        });
        console.log('items', arr);
        this.items = arr
      }
    },
    resetValidate(event){
      this.$nextTick(()=>{
        this.$refs['ruleForm'].validateField('pricetimeofuseDTO', ()=>{
          console.log('pricetimeofuseDTO:', this.buycontractinfo.timeperiodofusecfgDTO);
        })
      })
    },
    // 修改分时方案选项
    selectTimeperiodofusecfgDTO(event, item) {
      console.log("修改分时方案选项重置合同价格方案", event);
      this.resetValidate(event) //修改分时方案时，重新校验 合同价格方案 选项，并根据当前选择的分时方案提示不同的校验信息
      this.buycontractinfo.pricetimeofuseDTO = "";
      this.items = []
      if(event == 999) {
        this.showDialogFormVisible.toggle = true;
        this.showDialogFormVisible.add = true;
        return
      }
      this.getPricelist(event)
    },
    getPricelist(event){
      request({
        url: `/buy/tpfcg/${event}/pricelist`,
        method: "get",
      }).then(res => {
        this.contractPriceList = res
      })
    },
    saveContractinDetail(val) {
      request({
        url: "/buy/save",
        method: "post",
        data: val,
      })
        .then((res) => {
          this.$message({
            message: "保存成功",
            type: "success",
          });
        })
        .catch((error) => {
          console.log(error);
          this.$message.error("保存失败");
        });
    },
    // 修改年到月分解方案选项
    selectCurveytomDTO(event, item) {
      console.log("修改年到月分解方案选项", event);
      if (event == 999) {
        this.dialogYearToMouth.toggle = true;
        this.dialogYearToMouth.add = true;
      } else {
        this.dialogYearToMouth.add = false;
      }
    },
    // 修改月到日分解方案选项
    selectWeightsetyearlymtodDTO(event, item) {
      console.log("修改月到日分解方案选项", event);
      if (event == 999) {
        this.dialogMouthToDayBase.toggle = true;
        this.dialogMouthToDayBase.add = true;
      } else {
        this.dialogMouthToDayBase.add = false;
      }
    },
    // 修改日分时分解方案选项
    selectCurvesetyearlydtopDTO(event, item) {
      console.log("修改日分时分解方案选项", event);
      if (event == 999) {
        this.dialogDayToHourBase.toggle = true;
        this.dialogDayToHourBase.add = true;
      } else {
        this.dialogDayToHourBase.add = false;
      }
    },
    GetzhifuTime() {
      //利用change事件监听表单内容变化，并将选中的值赋值给所需要的两个字段
      //支付时间戳设置
      // console.log(77777, this.buycontractinfo.timeLine)
      if (this.buycontractinfo != null) {
        this.buycontractinfo.startDate = this.buycontractinfo.timeLine[0];
        this.buycontractinfo.endDate = this.buycontractinfo.timeLine[1];
      }
    },
    getPlanlist(type) {
      //获取分解曲线方案列表
      request({
        url: `/buy/planlist?type=${type}`,
        method: "get",
      }).then((res) => {
        // console.log("getPlanlist", res);
        if (type == 0) {
          this.yearToMonthPlan = res;
        }
        if (type == 1) {
          this.monthToDayPlan = res;
        }
        if (type == 2) {
          this.dayToHourPlan = res;
        }
        if (type == 3) {
          this.decompositionScheme = res;
        }
      });
    },
    getContractinDetail() {
      // console.log('query',this.$route.query);
      request({
        url: `/buy/${this.$route.query.id}/detail`,
        method: "get",
      }).then((res) => {

        // TODO 接口有问题--假数据
        // let pricetimeofuseDTO = {id: 17, name: "浙江110kV用户目录电价（不含附加）", priceList: [180.6, 644.6, 819.6]}
        // let mokeDate = pricetimeofuseDTO
        // res.pricetimeofuseDTO = mokeDate
        // TODO 接口有问题--假数据

        let ret = JSON.parse(JSON.stringify(res));
        this.buycontractinfo = ret;
        // this.contracttypeinfoList = ret.contracttypeinfoList
        this.buycontractinfo.curveytomDTO = ret.curveytomDTO.id; //年到月分解方案
        this.buycontractinfo.weightsetyearlymtodDTO =
          ret.weightsetyearlymtodDTO.id; //月到日分解方案
        this.buycontractinfo.curvesetyearlydtopDTO =
          ret.curvesetyearlydtopDTO.id; //日分时分解方案
        this.buycontractinfo.contracttypeinfoDTO = ret.contracttypeinfoDTO.id; //设置合同类型id
        this.buycontractinfo.meterInfoDTO = ret.meterInfoDTO.id; //设置机构名称id
        this.buycontractinfo.gridDTO = ret.gridDTO.id; //设置所属区域id
        this.buycontractinfo.userSmallDTO = ret.userSmallDTO.name; //设置填报人
        //日期区间回显
        this.$set(this.buycontractinfo, "timeLine", [
          ret.startDate,
          ret.endDate,
        ]);
        this.buycontractinfo.timeperiodofusecfgDTO =
          ret.timeperiodofusecfgDTO.id; //合同名称
        // this.buycontractinfo.priceList = ret.pricetimeofuseDTO.priceList; //合同名称
        // this.buycontractinfo.priceList = [{ price: 21},{ price: 1103}] //合同名称
        let arr = [];
        ret.pricetimeofuseDTO.priceList.forEach((item) => {
          arr.push({ price: item });
        });
        this.items = arr;
        // this.items = [{ price: 21},{ price: 1103}]
        this.buycontractinfo.pricetimeofuseDTO = ret.pricetimeofuseDTO.id; //合同价格方案
        this.contractPriceList = ret.pricetimeofuseDTOList
      });
    },
    getAgencyAll() {
      //获取机构名称列表
      request({
        url: "/buy/agencyAll",
        method: "get",
      }).then((res) => {
        this.meterNameList = res;
      });
    },
    getPeriodList(type, id) {
      //获取分时方案列表
      request({
        url: "/buy/periodlist",
        method: "get",
      }).then((res) => {
        this.periodList = res;
        if(type == 'saveselected'){
          this.buycontractinfo.timeperiodofusecfgDTO = id
        }
      });
    },
    getGridList() {
      //获取所属区域列表
      request({
        url: "/buy/gridList",
        method: "get",
      }).then((res) => {
        this.gridList = res;
      });
    },
  },
  components: {
    contractPrice,
    timesAsingScheme,
    yearToMouth,
    mouthToDayBase,
    dayToHourBase,
  },
};
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