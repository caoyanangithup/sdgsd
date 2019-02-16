<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            :clearable="true"
            @clear="getUsers"
            placeholder="请输入搜索内容"
            @keyup.enter.native="getUsers"
            v-model="queryParams.query"
            class="input-with-select"
          >
            <el-button @click="getUsers" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="username" label="用户名" width="200"></el-table-column>
        <el-table-column prop="mobile" label="手机号码" width="150"></el-table-column>
        <el-table-column prop="role_name" label="角色" width="150"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
        <el-table-column prop="address" label="状态" width="75">
          <el-switch slot-scope="info" v-model="info.row.mg_state"></el-switch>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <el-row>
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            <el-button type="warning" icon="el-icon-star-off" size="mini"></el-button>
          </el-row>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParams.pagenum"
        :page-sizes="[2, 5, 10, 15]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalpage"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  created() {
    this.getUsers()
  },
  data() {
    return {
      queryParams: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      usersList: [],
      totalpage: 0,
      type: true
    }
  },
  methods: {
    async getUsers() {
      const { data: res } = await this.$http.get('users', {
        params: this.queryParams
      })
      this.totalpage = res.data.total
      this.usersList = res.data.users
    },
    handleSizeChange(val) {
      this.queryParams.pagesize = val
      this.getUsers()
    },
    handleCurrentChange(val) {
      this.queryParams.pagenum = val
      this.getUsers()
    }
  }
}
</script>

<style lang="less" scoped>
.box-card {
  .el-pagination {
    text-align: left;
    margin-top: 15px;
  }
}
</style>
