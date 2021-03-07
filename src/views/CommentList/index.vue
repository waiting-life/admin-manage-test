<template>
  <div class="comment-container">
    <el-button @click="handleAdd" type="primary">+ 增加评论</el-button>
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
        width="400"
        :formatter="formatter">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteComment(scope.row)"
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
    this.pageSize = 6 
  },
  methods: {
    async getAllComments() {
      const res = await fetch('/getAllComments')
      const { data } = await res.json()
      this.tableData = data
      this.total = this.tableData.length
    },
    async deleteComment(item) {
      const { _id } = item
      try {
        await this.$confirm('是否删除该评论, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        const res = await fetch('/deleteComment', {
          method: 'POST',
          body: JSON.stringify({ _id }),
          headers: {
            'Content-type': 'application/json; charset=utf-8'
          }
        })
        const data = await res.json()
        const code = data.err_code
        if (code === 0) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        } else if (code === 500) {
          this.$message({
            type: 'error',
            message: 'Server error'
          });
        }
        this.getAllComments()
      } catch {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    },
    handleAdd () {

    },
    formatter(row, column, cell) {
      return new Date(cell).toLocaleString()
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
