<template>
  <div class="user-list-container">
    <el-button @click="handleAdd" type="primary">+ 添加用户</el-button>
    <el-table
      :data="filterData"
      style="width: 100%"
      max-height="600">
      <el-table-column
        fixed
        prop="_id"
        label="ID"
        width="300">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称"
        width="200">
      </el-table-column>
      <el-table-column
        prop="gender"
        label="性别"
        width="150"
        :formatter="formatterGender">
      </el-table-column>
      <el-table-column
        prop="phoneNumber"
        label="电话号码"
        width="300">
      </el-table-column>
      <el-table-column
        prop="created_time"
        label="创建时间"
        width="300"
        :formatter="formatterTime">
      </el-table-column>
      <el-table-column
        prop="fans"
        label="粉丝"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteUser(scope.row)"
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
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      center>
      <el-form :model="user" :label-position="labelPosition" label-width="80px">
          <el-form-item label="账号：">
            <el-input autocomplete="off" v-model="user.nickname"></el-input>
          </el-form-item>
          <el-form-item label="密码：">
            <el-input autocomplete="off" v-model="user.password" type="password" minlength="6"></el-input>
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="confirmAddUser(user)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import PaginationCom from 'components/common/PaginationCom'
import mixin from 'views/mixins'
export default {
  mixins: [mixin],
  data () {
    return {
      dialogVisible: false,
      user: {
        nickname: '',
        password: ''
      },
      labelPosition: 'left',
      // test: []
    }
  },
  components: {
    PaginationCom
  },
  created () {
    this.getAllUsers()  
    this.pageSize = 6
    // this.test = [...[1,2,3,4,5]]
  },
  mounted () { },
  methods: {
    async getAllUsers() {
      try {
        const res = await fetch('/getAllUsers')
        const { data } = await res.json()
        this.tableData = data
        this.total = this.tableData.length
      } catch  {
        this.$message.error('Server error')
      }
    },
    async deleteUser(item) {
      // console.log(item)
      const { _id } = item
      try {
        await this.$confirm('确定删除该用户吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        const res = await fetch('/deleteUser', {
          method: 'POST',
          body: JSON.stringify({ userId: _id }),
          headers: {
            'Content-type': 'application/json; charset=utf-8'
          }
        })
        const data = await res.json()
        const code = data.err_code
        if ( code === 0) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        } 
        this.getAllUsers()
      } catch {
        this.$message({
          type: 'error',
          message: 'Server error!'
        });    
      }
    },
    //   await this.$confirm('确定删除该用户吗, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     this.$message({
    //       type: 'success',
    //       message: '删除成功!'
    //     });
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     });          
    //   });
    // },
      // const data = await fetch('/deleteUser', {
      //   method: 'POST',
      //   body: JSON.stringify({ userId: _id }),
      //   headers: {
      //     'Content-type': 'application/json; charset=utf-8'
      //   }
      // })
      // console.log(data)
    handleAdd() {
      this.dialogVisible = true
    },
    async confirmAddUser(user) {
      try {
        const res = await fetch('/register', {
          method: 'POST',
          body: JSON.stringify(user),
          headers: {
            'Content-type': 'application/json; charset=utf-8'
          }
        })
        const result = await res.json()
        const code = result.err_code
        if (code === 1) {
          this.$message.error('昵称已存在，请重新注册')
        } else if ( code === 0) {
          this.$message.success('注册成功！')
          this.dialogVisible = false
          this.getAllUsers()
        }
      } catch {
        this.$message.error('Server error')
      }
    },
    handleClose() {
      this.$message.info('取消操作')
      this.dialogVisible = false
    },
    formatterTime(row, column, cell) {
       return new Date(cell).toLocaleString()
    },
    formatterGender(row, column, cell) {
      return cell ? '男' : '女'
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
