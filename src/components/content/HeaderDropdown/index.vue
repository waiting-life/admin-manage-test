<template>
  <div class="header-dropdown-container">
    <el-dropdown>
      <i class="el-icon-arrow-down el-icon--right"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="toHome">主页</el-dropdown-item>
        <el-dropdown-item @click.native="loginOut">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {}
  },
  methods: {
    toHome() {
      this.$router.push('/')
    },
    loginOut() {
      this.$router.push('/login')
    }
  },
}
</script>

<style lang="scss" scoped>
.header-dropdown-container .el-dropdown {
  display: flex;
  align-items: center;
}
</style>
