<template>
  <div class="app-container">
    <!-- 常用曲线管理 -->
    <!--工具栏-->
    <!-- <div class="head-container">
      <eHeader :dict="dict" :permission="permission" />
      <crudOperation :permission="permission" />
    </div> -->
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
            <div style="display:flex;"><div style="width:90px;">居间人：</div><el-input v-model="listQuery.agentman" placeholder="请选择居间人" style="width: 100px;" class="filter-item" @keyup.enter.native="handleFilter" /></div>
          </el-col>
          <el-col :span="8">
            <div style="display:flex;"><div style="width:90px;">提报人：</div><el-input v-model="listQuery.presenter" placeholder="请输入提报人" style="width: 100px;" class="filter-item" @keyup.enter.native="handleFilter" /></div>
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
          {{ scope.row.curveType == 0 ? '年分月曲线' : scope.row.state == 1 ? '月分日曲线' : '日分时曲线' }}
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
      curveDTOList: null,
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
    this.getBuyDataList()
  },
  methods: {
    gotoRouter(params) {
      // params为空时，为新增
      console.log(12, params)
      this.$router.push({
        path: '/usermanage/interbaseinfo',
        query: {
          manid: params.id || ''
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
      request({
        // /curve/list  获取常用曲线管理列表
        url: '/curve/list' + '?' + qs.stringify(this.listQuery),
        method: 'get'
      }).then(res => {
        this.curveDTOList = res.curveDTOList
        this.total = res.totalCount
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
