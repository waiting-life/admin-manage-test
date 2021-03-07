<template>
  <div class="block">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      required: true,
      default: 0
    },
    tableData: {
      type: Array,
      default() {
        return []
      }
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      required: true,
      default: 1
    },
    pageSizes: {
      type: Array,
      required: true,
      default() {
        return []
      }
    },
    // test: {
    //   type: Array,
    //   default: () => {}
    // }
  },
  created() {
    // console.log(this.total)
    // console.log(this.tableData)
    // setTimeout(() => {
    //   console.log(this.total)
    //   console.log(this.tableData)
    // }, 2000);
    // console.log(this.test)
  },
  methods: {
    handleSizeChange(pageSize) {
      this.$emit('handleSizeChange', pageSize)
    },
    handleCurrentChange(currentPage) {
      this.$emit('handleCurrentChange', currentPage)
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
