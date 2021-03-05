<template>
  <el-table
    :data="tableData"
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
      width="150">
    </el-table-column>
    <el-table-column
      prop="phoneNumber"
      label="电话号码"
      width="300">
    </el-table-column>
    <el-table-column
      prop="created_time"
      label="创建时间"
      width="300">
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
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">
          移除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.getAllUsers()  
  },
  mounted () { },
  methods: {
    async getAllUsers() {
      const res = await fetch('/getAllUsers')
      const { data } = await res.json()
      this.tableData = [...data]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
