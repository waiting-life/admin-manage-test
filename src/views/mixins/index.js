export default {
  data () {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 2,
      pageSizes: [2, 4, 6, 8, 10],
      total: 0
    }
  },
  computed: {
    filterData() {
      return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    }
  },
  methods: {
    handleSizeChange (val) {
      this.pageSize = val
    },
    handleCurrentChange (val) {
      this.currentPage = val
    }
  }
}