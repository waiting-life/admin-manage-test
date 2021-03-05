<template>
  <div class="home-page-side">
    <el-menu 
      default-active="1" 
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="#283443"
      text-color="#fff">
      <div class="left-item side-logo">
        <img src="~assets/image/icon-only.png" alt="">
      </div>
      <el-menu-item index="1">
        <span slot="title">Dashboard</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">应用管理</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-folder"></i>
        <span slot="title">应用列表</span>
      </el-menu-item>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-folder"></i>
          <span slot="title">权限列表</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1">
            <router-link :to="{ name: 'userlist' }">用户列表</router-link>
          </el-menu-item>
          <el-menu-item index="4-2">
            角色列表
          </el-menu-item>
          <el-menu-item index="4-3">
            权限列表
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="5">
        <i class="el-icon-folder"></i>
        <span slot="title">问题列表</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['isCollapse'])
  },
}
</script>

<style>
  .home-page-side{
    height: 100vh;
    text-align: center;
    display: flex;
    flex-direction: column;
  }
  
  .side-logo img{
      width: 60px;
      height: 60px;
  }

  .el-menu-vertical-demo {
    height: 100vh;
  }

  /* .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  } */
</style>
