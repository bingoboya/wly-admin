<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <eHeader :dict="dict" :permission="permission" />
      <crudOperation :permission="permission" />
    </div>
    <!--表格渲染-->
    <el-table ref="table" v-loading="crud.loading" :data="crud.data" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" width="50" label="序号" />
      <el-table-column :show-overflow-tooltip="true" prop="Name" label="合同名称">
        <template slot-scope="scope">
          <div
            slot="reference"
            class="el-link--primary"
            style="cursor:pointer;word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color: #1890ff;font-size: 13px;"
            @click="gotoRouter(scope.row.Name)"
          >
            {{ scope.row.Name }}-{{ scope.row.name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="TypeID" label="合同类型" />
      <el-table-column prop="MeterID" label="用户名称" />
      <el-table-column prop="StartDate" label="合同年度" />
      <el-table-column prop="TotalElectricity" label="合同电量" />
      <el-table-column prop="RecStatusID" label="审批状态" />
      <el-table-column prop="UserID" label="提报人" />
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
    <pagination />
    <!--表单渲染  操作按钮（新增/删除）-->
    <eForm :job-status="dict.job_status" />
  </div>
</template>

<script>
import crudJob from '@/api/system/job'
import eHeader from './module/header'
import eForm from './module/form'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import crudFile from '@/api/tools/buy'
import pagination from '@crud/Pagination'
import udOperation from '@crud/UD.operation'
export default {
  name: 'Job',
  components: { eHeader, eForm, crudOperation, pagination, udOperation },
  cruds() {
    return CRUD({
      title: '岗位1',
      // url: 'api/job', // 接口url
      url: 'api/buy', // 接口url
      crudMethod: { ...crudFile },
      // crudMethod: { ...crudJob },
      // sort: ['jobSort,asc', 'id,desc']
    })
  },
  mixins: [presenter()],
  // 数据字典
  dicts: ['job_status'],
  data() {
    return {
      permission: {
        add: ['admin', 'job:add'],
        edit: ['admin', 'job:edit'],
        del: ['admin', 'job:del']
      }
    }
  },
  methods: {
    gotoRouter(params) {
      console.log(11, params)
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
        crudJob.edit(data).then(() => {
          // eslint-disable-next-line no-undef
          this.crud.notify(this.dict.label.job_status[val] + '成功', 'success')
        }).catch(err => {
          data.enabled = !data.enabled
          console.log(err.data.message)
        })
      }).catch(() => {
        data.enabled = !data.enabled
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
