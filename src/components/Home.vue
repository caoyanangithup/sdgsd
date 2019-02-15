<template>
  <div id="home">
    <el-container>
      <el-header>
        <div class="logo">
          <img src="../assets/img/heima.png" alt>
          <span>电商后台管理系统</span>
        </div>
        <el-row>
          <el-button type="info" @click="layout">退出</el-button>
        </el-row>
      </el-header>
      <el-container>
        <el-aside :width="iscollapse?'65px':'200px'">
          <el-row class="tac">
            <el-col>
              <el-menu
                class="el-menu-vertical-demo"
                background-color="#333744"
                text-color="#fff"
                active-text-color="#409eff"
                :collapse="iscollapse"
                :collapse-transition="false"
                :unique-opened="true"
                :router="true"
              >
                <div class="fold" @click="iscollapse=!iscollapse">|||</div>
                <el-submenu :index="item.id + ''" v-for="(item,k) in menuList" :key="item.id">
                  <template slot="title">
                    <i :class="'iconfont icon-'+iconfont[k]"></i>
                    <span>{{item.authName}}</span>
                  </template>
                  <el-menu-item-group v-for="item2 in item.children" :key="item2.id">
                    <el-menu-item :index="item2.path"><i class="el-icon-menu"></i>{{item2.authName}}</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  created() {
    this.getMenuList()
  },
  data() {
    return {
      iscollapse: false,
      menuList: '',
      iconfont: ['users', 'tijikongjian', 'shangpin', 'danju', 'baobiao']
    }
  },
  methods: {
    layout() {
      this.$confirm('确认退出？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          window.sessionStorage.removeItem('token')
          this.$router.push('/login')
        })
        .catch(() => {})
    },
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      console.log(res)
      this.menuList = res.data
    }
  }
}
</script>

<style lang="less" scoped>
#home {
  height: 100%;
}
.el-container {
  height: 100%;
  .el-header {
    background-color: #373d41;
    padding-right: 20px;
    padding-left: 0;
    color: #fff;
    font-size: 22px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
      display: flex;
      align-items: center;
      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
    }
  }
  .el-main {
    background-color: #eaedf1;
  }
  .el-aside {
    height: 100%;
    background-color: #333744;
    .el-menu {
      border-right: none;
    }
    .el-col {
      width: 200px;
    }
    .fold {
      height: 25px;
      background-color: #4a5064;
      color: #fff;
      letter-spacing: 0.1em;
      height: 25px;
      line-height: 25px;
      user-select: none;
    }
  }
}
</style>
