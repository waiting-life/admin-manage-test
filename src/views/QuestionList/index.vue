<template>
  <div class="question-container">
    <el-button @click="handleAdd" type="primary">+ 添加问题</el-button>
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
        width="400"
        :formatter="formatter"
        >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteQuestion(scope.row)"
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
    <el-dialog title="提问" 
      :visible.sync="dialogVisible" 
      width="40%" 
      center 
      :before-close="handleClose">
      <el-form :model="question" 
        :label-position="labelPosition" 
        label-width="80px">
        <el-form-item label="提问标题">
          <el-input
            type="text"
            placeholder="请输入标题"
            v-model="question.title"
            maxlength="30"
            show-word-limit
            >
          </el-input>
        </el-form-item>
        <el-form-item label="提问内容">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="question.content"
            rows="10"
            >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose">取消问题</el-button>
        <el-button type="primary" @click="confirmAddQuestion(question)">发布问题</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PaginationCom from 'components/common/PaginationCom'
import mixin from 'views/mixins'
import { mapState } from 'vuex'
export default {
  components: {
    PaginationCom
  },
  mixins: [mixin],
  data () {
    return {
      dialogVisible: false,
      labelPosition: 'left',
      question: {
        title: '',
        content: '',
        nickname: '',
        userId: ''
      },
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created () {
    this.getAllQuestions()  
  },
  methods: {
    async getAllQuestions() {
      try {
        const res = await fetch('/allQuestions')
        const { data } = await res.json()
        this.tableData = data
        this.total = this.tableData.length
      } catch  {
        this.$message.error('Server error');
      }
    },
    async deleteQuestion(item) {
      const { _id } = item
      try {
        await this.$confirm('是否删除该问题, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        const res = await fetch('/deleteQuestion', {
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
        this.getAllQuestions()
      } catch {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    },
    async confirmAddQuestion(question) {
      if (question.title === '' || question.content === '') {
        this.$message.error('标题和内容不能为空');
        return
      }
      question.nickname = this.userInfo.nickname
      question.userId = this.userInfo.user_id
      try {
        const res = await fetch('/addQuestion', {
          method: 'POST',
          body: JSON.stringify(question),
          headers: {
            'Content-type': 'application/json; charset=utf-8'
          }
        })
        const result = await res.json()
        const code = result.err_code
        if (code === 0) {
          this.$message.success('添加问题成功')
        }
        this.getAllQuestions()
        this.dialogVisible = false
      } catch {
        this.$message.error('Server error')
      }
    },
    handleAdd() {
      this.dialogVisible = true
    },
    handleClose() {
      this.$message.info('取消操作')
      this.dialogVisible = false
    },
    formatter(row, column, cell) {
      // 格式化table的时间列
      // console.log(row, column, cell);
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
