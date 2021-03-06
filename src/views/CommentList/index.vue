<template>
  <div class="question-container">
    <el-table
      :data="filterData"
      style="width: 100%"
      max-height="600">
      <el-table-column
        fixed
        prop="_id"
        label="评论ID"
        width="250">
      </el-table-column>
      <el-table-column
        prop="userId"
        label="用户ID"
        width="250">
      </el-table-column>
      <el-table-column
        prop="answerId"
        label="问题ID"
        width="250">
      </el-table-column>
      <el-table-column
        prop="comment_nickname"
        label="评论人"
        width="200">
      </el-table-column>
      <el-table-column
        prop="comment_content"
        label="评论内容"
        width="800">
      </el-table-column>
      <el-table-column
        prop="comment_time"
        label="评论时间"
        width="400">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteComment(scope.$index, tableData)"
            type="text"
            size="small">
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <pagination-com 
        :total="total" 
        :page-size="pageSize" 
        :page-sizes="pageSizes" 
        :current-page="currentPage"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
import PaginationCom from 'components/common/PaginationCom'
import mixin from 'views/mixins'
export default {
  components: {
    PaginationCom
  },
  mixins: [mixin],
  data () {
    return {
    }
  },
  created () {
    this.getAllComments()  
  },
  methods: {
    async getAllComments() {
      const res = await fetch('/getAllComments')
      const { data } = await res.json()
      this.tableData = data
      this.total = this.tableData.length
    },
    deleteComment(index, tableData) {
      console.log(index, tableData)
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination-container {
  margin-top: 40px;
  position: relative;
}
.el-pagination {
  position: absolute;
  right: 40px;
}
</style>
