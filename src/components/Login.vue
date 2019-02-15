<template>
  <div id="login_box">
    <div class="login">
      <div class="logo">
        <img src="../assets/img/logo.png" alt>
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username">
            <span slot="prefix" class="iconfont icon-user"></span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="ruleForm.password">
            <span slot="prefix" class="iconfont icon-3702mima"></span>
          </el-input>
        </el-form-item>
      </el-form>
      <el-row>
        <el-col :offset="12" :span="12">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        username: 'admin',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login() {
      this.$refs.ruleForm.validate(async vali => {
        if (vali === true) {
          const { data: res } = await this.$http.post('login', this.ruleForm)
          if (res.meta.status === 200) {
            window.sessionStorage.setItem('token', res.data.token)
            this.$router.push('/home')
          }
        }
      })
    },
    reset() {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
#login_box {
  height: 100%;
  background-color: #2b4b6b;
}
.login {
  width: 450px;
  height: 304px;
  border-radius: 5px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .logo {
    width: 148px;
    height: 148px;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border: 1px solid #eee;
    box-shadow: 0 0 10px #eee;
    padding: 5px;
    box-sizing: border-box;
    img {
      width: 130px;
      height: 130px;
      border-radius: 50%;
      background-color: #eee;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .el-form {
    position: absolute;
    bottom: 35px;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
  }
  .el-row {
    position: absolute;
    bottom: 20px;
    width: 100%;
  }
}
</style>
