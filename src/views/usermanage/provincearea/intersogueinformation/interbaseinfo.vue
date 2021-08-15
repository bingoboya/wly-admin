<template>
  <div style="padding: 30px">
    <!-- <el-alert :closable="false" title="购电合同" type="warning" /> -->
    <div>
      <div class="toubu">
        <div>居间人基本信息</div>
        <div>
          <el-button
            v-if="this.$route.query.manid !== ''"
            type="primary"
            @click="isEdit = false"
          >编辑</el-button>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
          >保存</el-button>
          <el-button
            type="primary"
            @click="$router.push('/usermanage/intersogueinfo')"
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
            <el-form-item label="居间人姓名1" prop="name">
              <el-input
                v-model="buycontractinfo.name"
                :disabled="this.$route.query.manid !== '' && isEdit"
                style="width: 220px"
                placeholder="请输入居间人姓名"
              />
            </el-form-item>
          </el-col>
          <el-col :span="10" />
        </el-row>
        <el-row :gutter="5">
          <el-col :span="12">
            <el-form-item label="所属区域" prop="gridID">
              <el-select
                v-model="buycontractinfo.gridID"
                :disabled="this.$route.query.manid !== '' && isEdit"
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
            <el-form-item label="联系方式" prop="contactTel">
              <el-input
                v-model="buycontractinfo.contactTel"
                disabled
                style="width: 220px"
                placeholder="请输入联系方式"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="12">
            <el-form-item
              label="业务人员"
              prop="presenterId"
              :rules="{
                required: true,
                message: '请输入填报人',
                trigger: 'blur'
              }"
            >
              <el-select
                v-model="buycontractinfo.presenterId"
                :disabled="this.$route.query.manid !== '' && isEdit"
                placeholder="请选择业务人员"
                style="width: 220px"
              >
                <el-option
                  v-for="(item, index) in userList"
                  :key="`${item.id}${index}`"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="创建时间">
              <el-date-picker
                v-model="buycontractinfo.createTime"
                disabled
                format="yyyy-MM-dd HH:mm:ss"
                type="date"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div style="display: flex; flex-direction: column">
        <div class="fenjiefangan">相关合同列表</div>
        <!--表格渲染-->
        <el-table
          ref="table"
          v-loading="this.$route.query.manid ? listLoading : false"
          border
          :data="buyDataList"
          style="width: 100%;"
        >
          <el-table-column type="index" width="50" label="序号" />
          <el-table-column
            label="合同名称"
            :show-overflow-tooltip="true"
            prop="name"
          >
            <template slot-scope="scope">
              <div
                slot="reference"
                class="click-item el-link--primary"
                @click="gotoContractRouter(scope.row)"
              >
                {{ scope.row.name }}
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="contractType" label="合同类型" />
          <el-table-column prop="year" label="合同年度" />
          <el-table-column prop="totalElectricity" label="合同电量" />
          <el-table-column prop="state" label="审批状态">
            <template slot-scope="scope">
              {{
                scope.row.state == "NOTSUBMIT"
                  ? "未提交"
                  : scope.row.state == "REJECTED"
                    ? "审核未通过"
                    : "通过"
              }}
            </template>
          </el-table-column>
          <el-table-column prop="presenter" label="提报人" />
        </el-table>
        <!--分页组件-->
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="listQuery.page"
          :size.sync="listQuery.size"
          @pagination="getBuyDataList"
        />
      </div>
      <!-- #endregion -->
    </div>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import request from '@/utils/request'
import qs from 'qs'

export default {
  components: { Pagination },
  data() {
    return {
      // 表格分页相关
      buyDataList: null,
      listLoading: true,
      // selections: [], // 选择项
      total: 0,
      listQuery: {
        manid: undefined, // 户表ID
        page: 1,
        size: 20
      },
      // 通过  未提交  审核未通过 APPROVED, REJECTED, NOTSUBMIT
      approvalStatus: [{ id: 'APPROVED', name: '通过' }, { id: 'NOTSUBMIT', name: '未提交' }, { id: 'REJECTED', name: '审核未通过' }], // 审批状态
      hubiaoTypeList: [{ id: 0, name: '发电' }, { id: 1, name: '用户' }, { id: 2, name: '售电公司' }],
      // 表格分页相关
      buycontractinfo: {
        name: '',
        presenter: '',
        createTime: new Date(), // 创建时间
        contracttypeinfoDTO: '', // 合同类型
        gridID: '', // 所属区域
        meterInfoDTO: '', // 机构名称
        totalElectricity: '' // 总电量
      },
      userList: [], // 获取用户列表
      isEdit: true, // 点击编辑修改是否可以编辑
      meterNameList: [], // 机构名称列表
      gridList: [], // /buy/gridList 获取所属区域列表
      rules: {
        name: [{ required: true, message: '请输入户表名称', trigger: 'blur' }],
        totalElectricity: [
          { required: true, message: '请输入总电量', trigger: 'blur' }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        meterInfoDTO: [
          { required: true, message: '请输入机构名称', trigger: 'change' }
        ],
        gridID: [
          { required: true, message: '请选择所属区域', trigger: 'change' }
        ],
        contracttypeinfoDTO: [
          { required: true, message: '请选择合同类型', trigger: 'change' }
        ]
      }
    }
  },
  async created() {
    await this.getUserlist()
    await this.getAgencyAll()
    await this.getGridList()
    // 根据ID获取当前点击的合同的内容
    // 如果 this.$route.query.manid 为空，则表示是新增详情页，不凋 getContractinDetail
    if (this.$route.query.manid) {
      await this.getBuyDataList()
    }
  },
  methods: {
    gotoContractRouter(params) {
      console.log('gotoContractRouterss', params)
      // type字段，0购电合同 1 售电合同
      if (params.type === 0) {
        this.$router.push({
          path: `/usermanage/contractinformation/contractindetail/${params.id || 'add'}`,
          query: {
            id: params.id || ''
          }
        })
      } else if (params.type === 1) {
        this.$router.push({
          path: `/usermanage/contractinformation/salecontractindetail/${params.id || 'add'}`,
          query: {
            id: params.id || ''
          }
        })
      }
    },
    getBuyDataList(val) {
      if (val && val.page === 1) {
        this.listQuery.page = 1
      }
      this.listLoading = true
      this.listQuery.manid = this.$route.query.manid
      for (const item in this.listQuery) {
        if (this.listQuery[item] === undefined) {
          delete this.listQuery[item]
        }
      }
      //   /agentman/contractlist 获取居间人相关合同
      request({
        url: '/agentman/contractlist' + '?' + qs.stringify(this.listQuery),
        method: 'get'
      }).then(res => {
        this.buyDataList = res.contractList.content
        this.total = res.contractList.totalCount
        this.buycontractinfo = res.agenmaninfo
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 300)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const saveData = JSON.parse(JSON.stringify(this.buycontractinfo))
          saveData.id = this.$route.query.manid
          console.log('gag', this.$store.state.user.user.id)
          console.log('保存buycontractinfo:', saveData)
          this.saveMeterinfoSave(saveData)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    saveMeterinfoSave(val) { // 保存户表基本信息页
    // /agentman/agency/save 保存居间人基本信息页
      request({
        url: '/agentman/agency/save',
        method: 'post',
        data: val
      })
        .then(res => {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        })
        .catch(error => {
          console.log(error)
          this.$message.error('保存失败')
        })
    },
    getAgencyAll() {
      // 获取机构名称列表
      request({
        url: '/buy/agencyAll',
        method: 'get'
      }).then(res => {
        this.meterNameList = res
      })
    },
    getGridList() {
      // 获取所属区域列表
      request({
        url: '/buy/gridList',
        method: 'get'
      }).then(res => {
        this.gridList = res
      })
    },
    getUserlist() {
      // /auth/userlist
      // 获取所属区域列表
      request({
        url: '/auth/userlist',
        method: 'get'
      }).then(res => {
        this.userList = res
      })
    }
  }
}
</script>
<style lang="scss" scope>
.click-item{
  cursor:pointer;word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color: #1890ff;font-size: 13px;
}
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
