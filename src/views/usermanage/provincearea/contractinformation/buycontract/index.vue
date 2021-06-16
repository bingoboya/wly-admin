<template>
  <div class="app-container">
    <!--工具栏-->
    <!-- <div class="head-container">
      <eHeader :dict="dict" :permission="permission" />
      <crudOperation :permission="permission" />
    </div> -->

    <div class="head-container">
      <div class="filter-container" >
        <!-- <div style="display:flex;"> -->
          <el-row>
            <el-col :span="8">
              <div style="display:flex;"><div style="width:90px;">合同名称：</div><el-input v-model="listQuery.name" @keyup.enter.native="handleFilter" placeholder="请输入合同名称" style="width: 200px;" class="filter-item"  />
              </div>
            </el-col>
            <el-col :span="8">
              <div style="display:flex;"><div style="width:90px;">合同类型：</div><el-input v-model="listQuery.contracttypeid" @keyup.enter.native="handleFilter" placeholder="请输入合同类型" style="width: 200px;" class="filter-item"  />
              </div>
            </el-col>
            <el-col :span="8">
              <div style="display:flex;"><div style="width:90px;">合同年度：</div><el-input v-model="listQuery.year" @keyup.enter.native="handleFilter" placeholder="请输入合同年度" style="width: 200px;" class="filter-item"  />
              </div>
            </el-col>
          </el-row>

          
          <!-- <div>合同名称：<el-input v-model="listQuery.name" @keyup.enter.native="handleFilter" placeholder="请输入合同名称" style="width: 200px;" class="filter-item"  /></div> -->
          <!-- <div>合同类型：<el-input v-model="listQuery.contracttypeid" @keyup.enter.native="handleFilter" placeholder="请输入合同类型" style="width: 200px;" class="filter-item"  /></div> -->
          <!-- <div>合同年度：<el-input v-model="listQuery.year" @keyup.enter.native="handleFilter" placeholder="请输入合同年度" style="width: 200px;" class="filter-item"  /></div> -->
        <!-- </div> -->
        <!-- <div style="display:flex;"> -->
          <el-row>
            <el-col :span="8">
              <div style="display:flex;"><div style="width:90px;">提报人：</div><el-input v-model="listQuery.presenter" @keyup.enter.native="handleFilter" placeholder="提报人：" style="width: 200px;" class="filter-item"  /></div>
            </el-col>
            <el-col :span="8">
              <div style="display:flex;"><div style="width:90px;">机构名称：</div>
                <el-select v-model="listQuery.agencyName" @change="handleFilter" placeholder="机构名称：" clearable style="width: 90px" class="filter-item">
                  <el-option v-for="item in agencyAllList" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
              </div>
            </el-col>
            <el-col :span="8">
              <div style="display:flex;"><div style="width:90px;">审批状态：</div>
                <el-select v-model="listQuery.status" @change="handleFilter" placeholder="审批状态" clearable style="width: 90px" class="filter-item">
                  <el-option v-for="item in approvalStatus" :key="item" :label="item" :value="item" />
                </el-select>
              </div>
            </el-col>
          </el-row>
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
      </div>
    </div>
    <!--表格渲染-->
    <el-table ref="table" v-loading="listLoading" :data="buyDataList" style="width: 100%;" 
        @selection-change="selectionChangeHandler">
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" width="50" label="序号" />
      <el-table-column :show-overflow-tooltip="true" prop="name" label="合同名称">
        <template slot-scope="scope">
          <div
            slot="reference"
            class="el-link--primary"
            style="cursor:pointer;word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color: #1890ff;font-size: 13px;"
            @click="gotoRouter(scope.row.name)"
          >
            {{ scope.row.name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="contractType" label="合同类型" />
      <el-table-column prop="agencyName" label="机构名称" />
      <el-table-column prop="year" label="合同年度" />
      <el-table-column prop="totalElectricity" label="合同电量" />
      <el-table-column prop="status" label="审批状态" />
      <el-table-column prop="presenter" label="提报人" />
      <!-- <el-table-column prop="jobSort" label="排序">
        <template slot-scope="scope">
          {{ scope.row.jobSort }}
        </template>
      </el-table-column> -->
      <!-- <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.enabled"
            active-color="#409EFF"
            inactive-color="#F56C6C"
            @change="changeEnabled(scope.row, scope.row.enabled)"
          />
        </template>
      </el-table-column> -->
      <!-- <el-table-column prop="createTime" label="创建日期" /> -->
      <!--   编辑与删除   -->
      <!-- <el-table-column
        v-if="checkPer(['admin','job:edit','job:del'])"
        label="操作"
        width="130px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <udOperation
            :data="scope.row"
            :permission="permission"
          />
        </template>
      </el-table-column> -->
    </el-table>
    <!--分页组件-->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getBuyDataList" />
    <!-- <pagination /> -->
    <!--表单渲染  操作按钮（新增/删除）-->
    <!-- <eForm :job-status="dict.job_status" /> -->
  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import request from '@/utils/request'
import qs from 'qs'
import crudJob from '@/api/system/job'
import eHeader from './module/header'
import eForm from './module/form'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import crudFile from '@/api/tools/buy'
// import pagination from '@crud/Pagination'
import udOperation from '@crud/UD.operation'
export default {
  name: 'Job',
  
  // cruds() {
  //   return CRUD({
  //     title: '岗位1',
  //     url: '/buy', // 接口url
  //     crudMethod: { ...crudFile },
  //     // crudMethod: { ...crudJob },
  //     // sort: ['jobSort,asc', 'id,desc']
  //   })
  // },
  // mixins: [presenter()],
  data() {
    return {
      // permission: {
      //   add: ['admin', 'job:add'],
      //   edit: ['admin', 'job:edit'],
      //   del: ['admin', 'job:del']
      // },
      listQuery: {
        // agencyName: undefined, //机构名称
        contracttypeid: undefined, //合同类型ID
        name: undefined, //合同名称
        year: undefined, //合同年度
        presenter: undefined, //提报人
        status: undefined, //审批状态
        page: 1,
        limit: 20,
      },
      buyDataList: null,
      listLoading: true,
      total: 0,
      selections: [],  // 选择项
      approvalStatus:[1,2,3],//审批状态
      agencyAllList: [], //
    }
  },
  created () {
    this.getAgencyAll()
    this.getBuyDataList();
  },
  methods: {
    handleFilter() {
      this.listQuery.page = 1
      this.getBuyDataList()
    },
    getBuyDataList(){
      this.listLoading = true
      for(let item in this.listQuery){
        if(!this.listQuery[item]){
          delete this.listQuery[item]
        }
      }
      //获取机构名称列表
      request({
        // id是在  /buy  接口处获取到的
        // url: '/buy' + '?' + qs.stringify({page: 1,limit: 20}),
        url: '/buy' + '?' + qs.stringify(this.listQuery),
        method: 'get'
      }).then(res => {
        this.buyDataList = res.content
        this.total = res.totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 1000)
      })
    },
    getAgencyAll() {
      //获取机构名称列表
      request({
        url: "/buy/agencyAll",
        method: "get",
      }).then((res) => {
        this.agencyAllList = res;
      });
    },

    // 选择改变
    selectionChangeHandler(val) {
      this.selections = val
      console.log(this.selections);
    },
    gotoRouter(params) {
      console.log(12, params)
      this.$router.push('/usermanage/contractinformation/contractindetail')
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
  },
  components: { 
    Pagination
    // eHeader, 
    // eForm, 
    // crudOperation, 
    // udOperation,
    // pagination, 
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
