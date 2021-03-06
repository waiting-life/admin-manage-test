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
      <el-menu-item index="1" @click="toHome">
        <i class="el-icon-s-home"></i>
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
          <span slot="title">用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1">
            <!-- <router-link :to="{ path: '/usermanage' }">用户列表</router-link> -->
            <router-link :to="{ name: 'usermanage' }" class="link">用户列表</router-link>
          </el-menu-item>
          <el-menu-item index="4-2">
            <router-link :to="{ path: '/usermanage/questionlist'}" class="link">问题列表</router-link>
          </el-menu-item>
          <el-menu-item index="4-2">
            <router-link :to="{ path: '/usermanage/answerlist'}" class="link">回答列表</router-link>
          </el-menu-item>
          <el-menu-item index="4-2">
            <router-link :to="{ path: '/usermanage/commentlist'}" class="link">评论列表</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="5">
        <i class="el-icon-folder"></i>
        <span slot="title">其他列表</span>
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
  methods: {
    toHome() {
      this.$router.push('/')
    }
  }
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

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  /* .link {
    display: block;
    width: 100%;
  } */
</style>
