<template>
  <div class="login-container">
    <el-form 
      :model="ruleForm"  
      :rules="loginRules" 
      label-width="80px" 
      class="login-form">
      <div class="login-title">
        <h3>Login Form</h3>
      </div>
      <el-form-item label="用户名" prop="nickname">
        <!-- <span class="el-icon-user"></span> -->
        <el-input type="text" v-model="ruleForm.nickname" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码"  prop="password">
        <!-- <i class="el-icon-lock"></i> -->
        <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码" show-password></el-input>
      </el-form-item>
      <div class="form-btns">
        <el-button type="primary" @click="login(ruleForm)">登 录</el-button>
        <!-- <el-button type="primary" @click="register(ruleForm)">注 册</el-button> -->
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    const validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      }
    }
    return {
      ruleForm: {
        nickname: 'admin',
        password: '111111'
      },
      loginRules: {
        nickname: [{ validator: validateUsername, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }]
      }
    }
  },
  methods: {
     async login(user) {
      const res = await fetch('/login',{
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      const result = await res.json()
      const code = result.err_code
      console.log(code);
      if (code === 0) {
        this.$message.success('登录成功')
        this.$router.push('/')
      } else if (code === 2) {
        this.$message.error(result.message)
      }
    }
    // async register(user) {
    //   const res = await fetch('/register', {
    //     method: 'POST',
    //     body: JSON.stringify(user),
    //     headers: {
    //       'Content-Type': 'application/json; charset=utf-8'
    //     }
    //   })
    //   const result = await res.json()
    //   const code = result.err_code
    //   if (code === 1) {
    //     this.$message.error('昵称已存在，请重新注册')
    //   } else if (code === 0) {
    //     this.$message.success('注册成功')
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
$bg:#283443;
$light_gray:#fff;
$cursor: #fff;
.login-container {
  .el-input ::v-deep input {
      background-color: transparent;
      padding: 12px 5px 12px 15px;
      height: 47px;
      border: none;
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
.login-container {
  width: 100vw;
  height: 100vh;
  background-color: $bg;
  .login-form {
    width: 520px;
    padding: 160px 35px 0;
    margin: 0 auto;
    .login-title {
      color: $cursor;
      text-align: center;
      margin-bottom: 30px;
      h3 {
        font-size: 28px;
      }
    }
    .form-btns {
      width:  100%;
      & ::v-deep .el-button {
        width: 100%;
      }
      // & ::v-deep .el-button {
      //   background-color: transparent;
      //   outline: none;
      //   border: 1px solid rgba(255, 255, 255, 0.1);
      // }

      // @keyframes rotate {
      //   from {
      //     background-image: linear-gradient(0deg, #da6969, transparent);
      //   }

      //   to {
      //     background-image: linear-gradient(180deg, #da6969, transparent);
      //   }
      // }
    }

    // .form-btns ::v-deep .el-button {
    //   background: none;
    // }
  }
}



</style>
