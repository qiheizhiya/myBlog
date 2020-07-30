<template>
  <div class="content">
    <div class="title flex align-center">
      <div class="flex align-center"><span></span>评论列表 (66)</div>
    </div>
    <div class="tables">
      <el-table
      :data="tableData"
      :header-row-style="{background: 'none'}"
      style="width: 100%">
      <el-table-column
        prop="userName"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="content"
        label="内容"
        width="500">
      </el-table-column>
      <el-table-column
        prop="createdT"
        label="日期">
      </el-table-column>
      <el-table-column
        prop="createdT"
        label="操作">
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: []
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
</style>