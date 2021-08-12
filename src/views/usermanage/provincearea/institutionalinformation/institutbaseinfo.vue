<template>
  <div style="padding: 30px">
    <!-- <el-alert :closable="false" title="购电合同" type="warning" /> -->
    <div>
      <div class="toubu">
        <div>机构基本信息页面</div>
        <div>
          <el-button
            v-if="this.$route.query.id !== ''"
            type="primary"
            @click="isEdit = false"
          >编辑</el-button>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
          >保存</el-button>
          <el-button
            type="primary"
            @click="$router.push('/usermanage/institutioninfo')"
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
        <el-row :gutter="5">
          <el-col :span="12">
            <el-form-item label="机构名称1" prop="agencyName">
              <el-input
                v-model="buycontractinfo.agencyName"
                :disabled="this.$route.query.agencyId !== '' && isEdit"
                style="width: 220px"
                placeholder="机构名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item
              label="业务人员"
            >
              <el-input
                v-model="buycontractinfo.presenter"
                :disabled="this.$route.query.agencyId !== ''"
                style="width: 220px"
                placeholder="请输入业务人员"
              />
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
        </el-row>
      </el-form>
      <div style="display: flex; flex-direction: column">
        <div class="fenjiefangan">相关户表列表</div>
        <el-table
          ref="userListTable"
          v-loading="userListlistLoading"
          border
          :data="meterInfoList"
          style="width: 100%;"
        >
          <el-table-column type="index" width="50" label="序号" />
          <el-table-column
            label="户表名称"
            :show-overflow-tooltip="true"
            prop="name"
          >
            <template slot-scope="scope">
              <div
                slot="reference"
                class="click-item el-link--primary"
                @click="gotoUserlistRouter(scope.row)"
              >
                {{ scope.row.name }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="contractType" label="户表类型">
            <template slot-scope="scope">
              {{ hubiaoTypeList.filter(item => item.id == scope.row.type)[0].name }}
            </template>
          </el-table-column>
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
          v-show="meterTotal > 0"
          :total="meterTotal"
          :page.sync="allQueryList.meterpage"
          :size.sync="allQueryList.metersize"
          @pagination="userListgetBuyDataList"
        />
      </div>
      <div style="display: flex; flex-direction: column">
        <div class="fenjiefangan">相关合同列表</div>
        <el-table
          ref="contractTable"
          v-loading="listLoading"
          :data="contractInfoList"
          border
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
          <el-table-column prop="totalElectricity" label="总电量" />
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
          v-show="contractTotal > 0"
          :total="contractTotal"
          :page.sync="allQueryList.contractpage"
          :size.sync="allQueryList.contractsize"
          @pagination="userListgetBuyDataList"
        />
      </div>
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
      // 相关户表列表 userList 表格分页相关
      meterInfoList: null,
      meterTotal: 0,
      userListlistLoading: true,
      userListselections: [], // 选择项
      allQueryList: {
        agencyId: undefined,
        contractpage: 1, // 合同当前页数，默认第一页
        contractsize: 10, // 合同每页数量，默认每页10条
        meterpage: 1, // 户表当前页数，默认第一页
        metersize: 10 // 户表每页数量，默认每页10条
      },
      // 相关合同列表 contract 表格分页相关
      contractInfoList: null, // 相关合同列表数据
      contractTotal: 0,
      listLoading: true,
      selections: [], // 选择项
      hubiaoTypeList: [{ id: 0, name: '发电' }, { id: 1, name: '用户' }, { id: 2, name: '售电公司' }],
      // 通过  未提交  审核未通过 APPROVED, REJECTED, NOTSUBMIT
      approvalStatus: [{ id: 'APPROVED', name: '通过' }, { id: 'NOTSUBMIT', name: '未提交' }, { id: 'REJECTED', name: '审核未通过' }], // 审批状态
      // 表格分页相关
      buycontractinfo: {
        agencyName: '', // 业务人员
        createTime: new Date(), // 创建时间
        agencyId: '' // 机构名称
      },
      isEdit: true, // 点击编辑修改是否可以编辑
      meterNameList: [], // 机构名称列表
      rules: {
        name: [{ required: true, message: '请输入合同名称', trigger: 'blur' }],
        totalElectricity: [
          { required: true, message: '请输入总电量', trigger: 'blur' }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        agencyId: [
          { required: true, message: '请输入机构名称', trigger: 'change' }
        ],
        gridDTO: [
          { required: true, message: '请选择所属区域', trigger: 'change' }
        ],
        contracttypeinfoDTO: [
          { required: true, message: '请选择合同类型', trigger: 'change' }
        ]
      }
    }
  },
  async created() {
    await this.userListgetBuyDataList()
    await this.getAgencyAll()
    // 如果 this.$route.query.id 为空，则表示是新增详情页，不凋 getContractinDetail
    if (this.$route.query.agencyId) {
      // await this.getContractinDetail()
      this.buycontractinfo.agencyId = this.$route.query.agencyId
    }
  },
  methods: {
    gotoUserlistRouter(params) {
      console.log(12333, params)
      this.$router.push({
        path: '/usermanage/userlistbaseinfo',
        query: {
          meterId: params.id || ''
        }
      })
    },
    gotoContractRouter(params) {
      console.log('gotoContractRouter', params)
      // type字段，0购电合同 1 售电合同
      if (params.type === 0) {
        this.$router.push({
          path: '/usermanage/contractinformation/contractindetail',
          query: {
            id: params.id || ''
          }
        })
      } else if (params.type === 1) {
        this.$router.push({
          path: '/usermanage/contractinformation/salecontractindetail',
          query: {
            id: params.id || ''
          }
        })
      }
    },
    userListgetBuyDataList(val) {
      if (val && val.page === 1) {
        this.allQueryList.page = 1
      }
      this.userListlistLoading = true
      this.listLoading = true
      this.allQueryList.agencyId = this.$route.query.agencyId
      for (const item in this.allQueryList) {
        if (this.allQueryList[item] === undefined) {
          delete this.allQueryList[item]
        }
      }
      // 获取机构相关户表和合同（ppt 第10页）
      request({
        url: '/meterinfo/agency/contractlist' + '?' + qs.stringify(this.allQueryList),
        method: 'get'
      }).then(res => {
        console.log(res)
        this.contractInfoList = res.contractInfoList
        this.contractTotal = res.contractTotal
        this.meterInfoList = res.meterInfoList
        this.meterTotal = res.meterTotal
        this.buycontractinfo.createTime = res.createTime
        this.buycontractinfo.presenter = res.presenter
        this.buycontractinfo.agencyName = res.agencyName
        setTimeout(() => {
          this.userListlistLoading = false
          this.listLoading = false
        }, 1 * 300)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const saveData = {
            name: this.buycontractinfo.agencyName,
            id: this.$route.query.agencyId
          }
          console.log('保存buycontractinfo:', saveData)
          this.saveContractinDetail(saveData)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    saveContractinDetail(val) {
      // /meterinfo/agency/save 保存机构基本信息页
      request({
        url: '/meterinfo/agency/save',
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
