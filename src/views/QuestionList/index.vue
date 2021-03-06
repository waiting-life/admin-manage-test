<template>
  <div class="question-container">
    <el-table
      :data="filterData"
      style="width: 100%"
      max-height="600">
      <el-table-column
        fixed
        prop="_id"
        label="问题ID"
        width="250">
      </el-table-column>
      <el-table-column
        fixed
        prop="userId"
        label="用户ID"
        width="250">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="提问人"
        width="150">
      </el-table-column>
      <el-table-column
        prop="content"
        label="提问内容"
        width="1800">
      </el-table-column>
      <el-table-column
        prop="title"
        label="问题标题"
        width="300">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="提问时间"
        width="400">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteQuestion(scope.$index, tableData)"
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
    this.getAllQuestions()  
  },
  methods: {
    async getAllQuestions() {
      const res = await fetch('/allQuestions')
      const { data } = await res.json()
      this.tableData = data[0]
      this.total = this.tableData.length
    },
    deleteQuestion(index, tableData) {
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
