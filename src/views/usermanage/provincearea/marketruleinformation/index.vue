<template>
  <div class="app-container">
    <!-- 市场规则信息页面-列表 -->
    <!--工具栏-->
    <!-- <div class="head-container">
      <eHeader :dict="dict" :permission="permission" />
      <crudOperation :permission="permission" />
    </div> -->
    <div class="head-container">
      <div class="filter-container">
        <el-row>
          <el-col :span="8">
            <!-- <div style="display:flex;"><div style="width:90px;">户表名称：</div><el-input v-model="listQuery.name" placeholder="请输入合同名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
            </div> -->
          </el-col>
          <el-col :span="8">
            <div style="display:flex;"><div style="width:90px;">规则年度：</div>
              <el-select v-model="listQuery.agencyName" style="width: 200px;" placeholder="机构名称：" clearable class="filter-item" @change="handleFilter">
                <el-option v-for="item in agencyAllList" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </div>
          </el-col>
          <el-col :span="8">
            <div style="display:flex;"><div style="width:90px;">规则类型：</div>
              <el-select v-model="listQuery.contracttypeid" style="width: 200px;" placeholder="请选择合同类型" clearable class="filter-item" @change="handleFilter">
                <el-option v-for="item in contractTypeAllList" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <div style="display:flex;"><div style="width:90px;">提报人：</div><el-input v-model="listQuery.presenter" placeholder="请输入提报人" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" /></div>
          </el-col>
          <el-col :span="8">
            <div style="display:flex;"><div style="width:90px;">审批状态：</div>
              <el-select v-model="listQuery.state" placeholder="审批状态" clearable style="width: 200px;" class="filter-item" @change="handleFilter">
                <el-option v-for="item in approvalStatus" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </div>
          </el-col>
          <el-col :span="8" />
        </el-row>
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="gotoRouter">新增</el-button>
        <el-button :disabled="selections.length == 0" class="filter-item" type="primary" icon="el-icon-search" @click="deleteBuyDataList">删除</el-button>
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
      <el-table-column :show-overflow-tooltip="true" prop="name" label="规则名称">
        <template slot-scope="scope">
          <div
            slot="reference"
            class="click-item el-link--primary"
            @click="gotoRouter(scope.row)"
          >
            {{ scope.row.name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="contractType" label="规则类型" />
      <el-table-column prop="year" label="规则年度" />
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
      listQuery: {
        // agencyName: undefined, //机构名称
        contracttypeid: undefined, // 合同类型ID
        name: undefined, // 合同名称
        year: undefined, // 合同年度
        presenter: undefined, // 提报人
        state: undefined, // 审批状态
        page: 1,
        size: 20
      },
      buyDataList: null,
      listLoading: true,
      total: 0,
      selections: [], // 选择项
      // 通过  未提交  审核未通过 APPROVED, REJECTED, NOTSUBMIT
      approvalStatus: [{ id: 'APPROVED', name: '通过' }, { id: 'NOTSUBMIT', name: '未提交' }, { id: 'REJECTED', name: '审核未通过' }], // 审批状态
      agencyAllList: [], // 机构名称下拉列表
      contractTypeAllList: [] // 合同类型下拉列表
    }
  },
  created() {
    this.getAgencyAll()
    this.getcontractTypeAllList()
    this.getBuyDataList()
  },
  methods: {
    gotoRouter(params) {
      // params为空时，为新增
      console.log(12, params)
      this.$router.push({
        path: '/usermanage/marketruledetail',
        query: {
          id: params.id || ''
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
    getBuyDataList() {
      this.listLoading = true
      for (const item in this.listQuery) {
        if (this.listQuery[item] === undefined) {
          delete this.listQuery[item]
        }
      }
      // 获取机构名称列表
      request({
        // id是在  /buy  接口处获取到的
        // url: '/buy' + '?' + qs.stringify({page: 1,size: 20}),
        url: '/buy' + '?' + qs.stringify(this.listQuery),
        method: 'get'
      }).then(res => {
        this.buyDataList = res.content
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
    getcontractTypeAllList() {
      // 获取合同类型下拉列表
      request({
        url: '/buy/typelist',
        method: 'get'
      }).then((res) => {
        this.contractTypeAllList = res
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
