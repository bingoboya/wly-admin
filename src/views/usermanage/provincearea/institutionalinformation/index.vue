<template>
  <div class="app-container">
    <!-- 机构信息基础页面 -->
    <!--工具栏-->
    <!-- <div class="head-container">
      <eHeader :dict="dict" :permission="permission" />
      <crudOperation :permission="permission" />
    </div> -->
    <div class="head-container">
      <div class="filter-container">
        <el-row style="padding-bottom: 10px;">
          <el-col :span="8">
            <div style="display:flex;align-items: center;">
              <div style="width:90px;">户表名称：</div>
              <el-input v-model="listQuery.meterName" placeholder="请输入合同名称" style="width: 200px;" @keyup.enter.native="handleFilter" />
            </div>
          </el-col>
          <el-col :span="8">
            <div style="display:flex;align-items: center;"><div style="width:90px;">机构名称：</div>
              <el-select v-model="listQuery.agencyName" style="width: 200px;" placeholder="机构名称：" clearable @change="handleFilter">
                <el-option v-for="item in agencyAllList" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </div>
          </el-col>
          <el-col :span="8">
            <div style="display:flex;align-items: center;"><div style="width:90px;">户表类型：</div>
              <el-select v-model="listQuery.type" style="width: 200px;" placeholder="请选择户表类型" clearable @change="handleFilter">
                <el-option v-for="item in hubiaoTypeList" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row style="padding-bottom: 10px;">
          <el-col :span="8">
            <div style="display:flex;align-items: center;"><div style="width:90px;">提报人：</div><el-input v-model="listQuery.presenter" placeholder="请输入提报人" style="width: 200px;" @keyup.enter.native="handleFilter" /></div>
          </el-col>
          <el-col :span="8">
            <div style="display:flex;align-items: center;"><div style="width:90px;">审批状态：</div>
              <el-select v-model="listQuery.state" placeholder="审批状态" clearable style="width: 200px;" @change="handleFilter">
                <el-option v-for="item in approvalStatus" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </div>
          </el-col>
          <el-col :span="8" />
        </el-row>
        <el-button type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
        <!-- 新增 -> 弹窗即可 -->
        <el-button type="primary" icon="el-icon-search" @click="showAddMeterInfo = true">新增</el-button>
        <el-button :disabled="selections.length == 0" type="primary" icon="el-icon-search" @click="deleteBuyDataList">删除</el-button>
      </div>
    </div>
    <!--表格渲染-->
    <el-table
      ref="table"
      v-loading="listLoading"
      border
      :data="buyDataList"
      style="width: 100%;"
      @selection-change="selectionChangeHandler"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" width="50" label="序号" />
      <el-table-column :show-overflow-tooltip="true" prop="meterName" label="户表名称">
        <template slot-scope="scope">
          <div
            slot="reference"
            class="click-item el-link--primary"
            @click="gotoUserlistRouter(scope.row)"
          >
            {{ scope.row.meterName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="agencyName" label="机构名称">
        <template slot-scope="scope">
          <div
            slot="reference"
            class="click-item el-link--primary"
            @click="gotoAgencyRouter(scope.row)"
          >
            {{ scope.row.agencyId }} {{ scope.row.agencyName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="户表类型">
        <template slot-scope="scope">
          {{ typeList.filter(item => item.id == scope.row.type)[0].name }}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="审批状态">
        <template slot-scope="scope">
          {{ scope.row.state == 'NOTSUBMIT' ? '未提交' : scope.row.state == 'REJECTED' ? '审核未通过' : '通过' }}
        </template>
      </el-table-column>
      <el-table-column prop="presenter" label="提报人" />
    </el-table>
    <!--分页组件-->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :size.sync="listQuery.size" @pagination="getBuyDataList" />
    <!--表单渲染  操作按钮（新增/删除）-->
    <el-dialog
      width="80%"
      title="增加户表信息"
      :visible.sync="showAddMeterInfo"
      @closed="closeMeterInfo"
    >
      <div>
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
              <el-form-item label="户表名称" prop="name">
                <el-input
                  v-model="buycontractinfo.name"
                  style="width: 220px"
                  placeholder="请输入户表名称"
                />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="机构名称" prop="agencyId">
                <el-select
                  v-model="buycontractinfo.agencyId"
                  placeholder="机构名称"
                  style="width: 220px"
                >
                  <el-option
                    v-for="(item, index) in agencyAllList"
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
              <el-form-item label="所属区域" prop="gridId">
                <el-select
                  v-model="buycontractinfo.gridId"
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
            <el-col :span="12">
              <el-form-item label="户表类型" prop="type">
                <el-select
                  v-model="buycontractinfo.type"
                  placeholder="户表类型"
                  style="width: 220px"
                >
                  <el-option
                    v-for="(item, index) in hubiaoTypeList"
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
              <el-form-item label="联系人">
                <el-select
                  v-model="buycontractinfo.contactId"
                  placeholder="请选择联系人"
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
              <el-form-item label="联系方式" prop="contactTel">
                <el-input
                  v-model="buycontractinfo.contactTel"
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
                prop="userID"
              >
                <el-select
                  v-model="buycontractinfo.userID"
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
          <!-- #endregion -->
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAddMeterInfo = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
        <!-- <el-button type="primary" @click="showAddMeterInfo = false">保 存</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import request from '@/utils/request'
import qs from 'qs'
export default {
  name: 'Institudetail',
  components: {
    Pagination
    // eHeader,
    // eForm,
    // crudOperation,
    // udOperation,
    // pagination,
  },
  data() {
    return {
      showAddMeterInfo: false,
      buycontractinfo: {
        createTime: new Date() // 创建时间
      },
      listQuery: {
        agencyName: undefined, // 机构名称
        type: undefined, // 户表类型ID
        meterName: undefined, // 户表名称
        year: undefined, // 合同年度
        presenter: undefined, // 提报人
        state: undefined, // 审批状态
        page: 1,
        size: 20
      },
      buyDataList: null,
      typeList: [],
      listLoading: true,
      total: 0,
      selections: [], // 选择项
      // 通过  未提交  审核未通过 APPROVED, REJECTED, NOTSUBMIT
      approvalStatus: [{ id: 'APPROVED', name: '通过' }, { id: 'NOTSUBMIT', name: '未提交' }, { id: 'REJECTED', name: '审核未通过' }], // 审批状态
      hubiaoTypeList: [{ id: 0, name: '发电' }, { id: 1, name: '用户' }, { id: 2, name: '售电公司' }],
      agencyAllList: [], // 机构名称下拉列表
      userList: [], // 获取用户列表
      gridList: [], // 获取所属区域列表
      rules: {
        meterName: [{ required: true, message: '请输入户表名称', trigger: 'blur' }],
        totalElectricity: [
          { required: true, message: '请输入总电量', trigger: 'blur' }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        meterInfoDTO: [
          { required: true, message: '请输入机构名称', trigger: 'change' }
        ],
        gridId: [
          { required: true, message: '请选择所属区域', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入户表名称', trigger: ['blur', 'change'] }
        ],
        agencyId: [
          { required: true, message: '请选择机构名称', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择户表类型', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.getAgencyAll()
    this.getGridList()
    this.getUserlist()
    this.getBuyDataList()
  },
  methods: {
    closeMeterInfo() {
      this.buycontractinfo = {}
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const saveData = JSON.parse(JSON.stringify(this.buycontractinfo))
          console.log('保存buycontractinfo:', saveData)
          this.saveMeterinfoSave(saveData)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    saveMeterinfoSave(val) { // 保存户表基本信息页
      request({
        url: '/meterinfo/save',
        method: 'post',
        data: val
      })
        .then(res => {
          this.showAddMeterInfo = false
          this.getBuyDataList()
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
    gotoUserlistRouter(params) {
      // params为空时，为新增
      // console.log(12, params)
      this.$router.push({
        path: `/usermanage/userlistbaseinfo/${params.meterId || 'add'}`,
        query: {
          meterId: params.meterId || ''
        }
      })
    },
    gotoAgencyRouter(params) {
      // params为空时，为新增
      // console.log('gotoAgencyRouter', params)
      this.$router.push({
        path: `/usermanage/institutbaseinfo/${params.agencyId || 'add'}`,
        query: {
          agencyId: params.agencyId || ''
        }
      })
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
    getBuyDataList(val) {
      if (val && val.page === 1) {
        this.listQuery.page = 1
      }
      this.listLoading = true
      for (const item in this.listQuery) {
        if (this.listQuery[item] === undefined) {
          delete this.listQuery[item]
        }
      }
      // 获取机构(用户)名称列表 ppt 第4页
      request({
        url: '/meterinfo/list' + '?' + qs.stringify(this.listQuery),
        method: 'get'
      }).then(res => {
        this.buyDataList = res.meterInfoDTO2List
        this.typeList = res.typeList
        this.total = res.totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 300)
      })
    },
    getAgencyAll() {
      // 获取机构名称列表
      request({
        url: '/buy/agencyAll',
        method: 'get'
      }).then((res) => {
        this.agencyAllList = res
      })
    },
    // 选择改变
    selectionChangeHandler(val) {
      this.selections = val
      console.log(this.selections)
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

<style rel="stylesheet/scss" lang="scss" scoped>
.click-item{
  cursor:pointer;word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color: #1890ff;font-size: 13px;
}
.filter-container {
  padding-bottom: 10px;

  .filter-item {
    /* display: inline-block;
    vertical-align: middle; */
    /* margin-bottom: 10px; */
  }
}
 ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
