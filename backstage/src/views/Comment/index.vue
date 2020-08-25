<template>
  <div class="content">
    <div class="title flex align-center">
      <div class="flex align-center"><span></span>评论列表 ({{total}})</div>
    </div>
    <div class="tables">
      <el-table :data="tableData" :header-row-style="{background: 'none'}" v-loading="loading" style="width: 100%">
      <el-table-column v-for="(item, index) in tableColumn" :key="index" :prop="item.prop" :label="item.label"></el-table-column>
      <el-table-column label="操作">
         <template slot-scope="scope">
           <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagi">
      <el-pagination background layout="prev, pager, next" @current-change="currentChange" :total="total"></el-pagination>
    </div>
    </div>
  </div>
</template>

<script>
import { list, deleteWord } from '@/api/word'
export default {
  data () {
    return {
      tableData: [],
      tableColumn: [
        { prop: 'user.userName', label: '姓名' },
        { prop: 'content', label: '内容' },
        { prop: 'createdAt', label: '日期' }
      ],
      total: 0,
      page: {
        pageSize: 10,
        pageNum: 1
      },
      loading: false
    }
  },
  created () {
    this.getLists()
  },
  methods: {
    async getLists () {
      this.loading = true
      const result = await list(this.page)
      this.tableData = result.data.data.datas
      this.total = result.data.data.total
      this.loading = false
    },
    currentChange (e) {
      this.page.pageNum = e
      this.getLists()
    },
    async handleDelete (i, { id }) {
      const result = await deleteWord({id})
      if (result) {
        this.$message.success('删除成功!')
        this.getLists()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  /deep/ .el-table, /deep/ .el-table tr, /deep/ .el-table tr th {
    background: none !important;
  }
  .tables {
    margin-top: 40px;
  }
  .pagi {
    margin-top: 30px;
  }
</style>