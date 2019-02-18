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
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="username" label="用户名" width="200"></el-table-column>
        <el-table-column prop="mobile" label="手机号码" width="150"></el-table-column>
        <el-table-column prop="role_name" label="角色" width="150"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
        <el-table-column prop="address" label="状态" width="75">
          <el-switch
            slot-scope="info"
            v-model="info.row.mg_state"
            @change="changeState(info.row.id,info.row.mg_state)"
          ></el-switch>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="info">
            <el-row>
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="showEditDialog(info.row.id)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="delUser(info.row.id)"
              ></el-button>
              <el-tooltip
                class="item"
                :enterable="false"
                effect="dark"
                content="分配角色"
                placement="top"
              >
                <el-button type="warning" icon="el-icon-star-off" size="mini"></el-button>
              </el-tooltip>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParams.pagenum"
        :page-sizes="[2, 5, 10, 15]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalpage"
      ></el-pagination>
      <!-- 添加用户的弹框区 -->
      <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="closeDialog">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="ruleForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="adduser">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 修改用户的弹窗 -->
      <el-dialog
        title="修改用户"
        :visible.sync="editDialogVisible"
        width="50%"
      >
        <el-form
          :model="editForm"
          :rules="editRules"
          ref="editForm"
          label-width="100px"
          class="demo-editForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="editForm.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="editForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="edituser(editForm.id)">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  created() {
    this.getUsers()
  },
  data() {
    var validateMobile = (rule, value, callback) => {
      if (!/^1[35789]\d{9}$/.test(value)) {
        callback(new Error('手机号格式不正确'))
      }
      callback()
    }
    return {
      queryParams: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      usersList: [],
      totalpage: 0,
      type: true,
      addDialogVisible: false,
      editDialogVisible: false,
      // 添加用户
      ruleForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 修改用户数据
      editForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 添加用户规则
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ],
        email: [
          {
            message: '请输入邮箱',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          { validator: validateMobile, trigger: 'blur' }
        ]
      },
      // 修改用户规则
      editRules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            message: '请输入手机号',
            trigger: 'blur'
          },
          { validator: validateMobile, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 获取用户
    async getUsers() {
      const { data: res } = await this.$http.get('users', {
        params: this.queryParams
      })
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.meg)
      }
      this.totalpage = res.data.total
      this.usersList = res.data.users
    },
    // 分页相关
    handleSizeChange(val) {
      this.queryParams.pagesize = val
      this.getUsers()
    },
    handleCurrentChange(val) {
      this.queryParams.pagenum = val
      this.getUsers()
    },
    // 改变状态
    async changeState(uid, type) {
      const { data: res } = await this.$http.put(`users/${uid}/${type}`)
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.$message({
        message: '状态修改成功',
        type: 'success',
        duration: 1500
      })
    },
    closeDialog() {
      this.$refs.ruleForm.resetFields()
    },
    // 添加用户
    adduser() {
      this.$refs.ruleForm.validate(async vali => {
        if (vali) {
          const { data: res } = await this.$http.post('users', this.ruleForm)
          if (res.meta.status !== 201) {
            return this.$message.error(res.meta.msg)
          }
          this.addDialogVisible = false
          this.$message.success(res.meta.msg)
          this.getUsers()
        }
      })
    },
    // 删除用户
    delUser(id) {
      this.$confirm('确定删除吗?', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const { data: res } = await this.$http.delete(`users/${id}`)
          if (res.meta.status !== 200) {
            return this.$message.error(res.meta.msg)
          }
          this.$message.success(res.meta.msg)
          this.getUsers()
        })
        .catch(() => {})
    },
    // 修改用户
    async showEditDialog(id) {
      this.editDialogVisible = true
      const { data: res } = await this.$http.get(`users/${id}`)
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.editForm = res.data
    },
    edituser(id) {
      this.$refs.editForm.validate(async vali => {
        if (vali) {
          const { data: res } = await this.$http.put(`users/${id}`, this.editForm)
          if (res.meta.status !== 200) {
            return this.$message.error(res.meta.msg)
          }
          this.editDialogVisible = false
          this.$message.success(res.meta.msg)
          this.getUsers()
        }
      })
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
