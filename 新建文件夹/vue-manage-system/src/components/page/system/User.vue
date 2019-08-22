<!-- 数据字典管理 -->
<template>
  <div>
    <!--查询部分 -->
    <el-form :inline="true" :model="searchpath" class="demo-form-inline" style="float:left">
      <el-form-item label="工号">
        <el-input type="text" v-model="searchpath.code" placeholder="工号"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input type="text" v-model="searchpath.name" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input type="text" v-model="searchpath.tel" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-input type="text" v-model="searchpath.tel" placeholder="角色"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchUsers">查询</el-button>
      </el-form-item>
    </el-form>
    <edit-form @onSubmit="loadUsers()" ref="edit"></edit-form>
    
    <!-- 操作区 -->
    <div style="float:left">
      <el-button type="text" class="el-icon-plus" style="font-size: 15px" @click="showAddUsers">增加</el-button>
      <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
      <el-button type="text" class="el-icon-delete" style="font-size: 15px" @click="deleteUsers">批量删除</el-button>
      <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
      <el-button type="text" class="el-icon-edit" style="font-size: 15px" @click="showEditUsers">修改</el-button>
      <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
      <el-button type="text" class="el-icon-sort-down" style="font-size: 15px" @click="dialogUpload = true">导入</el-button>
      <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
      <el-button type="text" class="el-icon-sort-up" style="font-size: 15px" @click="dialogDownload = true">导出</el-button>
    </div>

    <!-- 显示数据字典的表单 -->
    <div>
      <el-table
        ref="multipleTable"
        :data="users"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :default-sort="{prop: 'date', order: 'descending'} "
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="code" label="工号" sortable width="110"></el-table-column>
        <el-table-column prop="name" label="用户名" sortable width="130"></el-table-column>
        <el-table-column prop="positionName" label="职位" width="100"></el-table-column>
        <el-table-column prop="profilePicture" label="头像" width="130"></el-table-column>
        <el-table-column prop="roleName" label="角色" width="100"></el-table-column>
        <el-table-column prop="sex" label="性别" width="100"></el-table-column>
        <el-table-column prop="birthday" label="生日" width="100"></el-table-column>
        <el-table-column prop="tel" label="电话" width="100"></el-table-column>
        <el-table-column prop="other" label="其他联系方式" width="100"></el-table-column>
        <el-table-column prop="remark" label="备注" width="100"></el-table-column>
        <el-table-column prop="operate" label="操作" width="100">
          <template slot-scope="scope">
              <el-button type="text" class="el-icon-plus" @click="showAddUsers"></el-button>
              <!-- 编辑同样调用增加页面弹窗，scope.row为这一行的数据 -->
              <el-button type="text" class="el-icon-delete" @click="deleteUser(scope.row.id)"></el-button>
              <el-button type="text" class="el-icon-edit" @click="showEditUsers(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--添加与修改字典弹窗-->
    <div>
      <el-form :model="user" :label-position="labelPosition" :rules="rules" ref="addUsers" style="margin: 0px;
      padding: 0px;">
        <!-- close-on-click-modal 点击空白处是否关闭弹窗 -->
        <el-dialog :title="dialogTitle" style="padding: 0px;" :close-on-click-modal="false" 
        :visible.sync="dialogDictionary" width="60%">
        <el-form-item label="工号" :label-width="formLabelWidth" prop="code">
            <el-input v-model="user.paramType" placeholder="工号"></el-input>
          </el-form-item>
          <el-form-item label="用户名" :label-width="formLabelWidth" prop="name">
            <el-input v-model="user.param" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item label="职位" :label-width="formLabelWidth" prop="name">
            <el-input v-model="user.value" placeholder="职位"></el-input>
          </el-form-item>
          <el-form-item label="头像" :label-width="formLabelWidth" prop="profilePicture">
            <el-input v-model="user.profilePicture" placeholder="头像"></el-input>
          </el-form-item>
          <el-form-item label="角色" :label-width="formLabelWidth" prop="roleName">
            <el-input v-model="user.roleName" placeholder="角色"></el-input>
          </el-form-item>
          <el-form-item label="生日" :label-width="formLabelWidth" prop="birthday">
                <div class="block">
                    <!-- <span class="demonstration">默认</span> -->
                    <el-date-picker
                    v-model="user.birthday"
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
                </div>
            <!-- <el-input v-model="form.value" placeholder="生日"></el-input> -->
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
            <el-radio v-model="user.sex" label="1">男</el-radio>
            <el-radio v-model="user.sex" label="2">女</el-radio>
          </el-form-item>
          <el-form-item label="职位" :label-width="formLabelWidth" prop="postitionName">
            <el-input v-model="user.positionName" placeholder="职位"></el-input>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth" prop="tel">
            <el-input v-model="user.tel" placeholder="电话"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
            <el-input v-model="user.email" placeholder="邮箱"></el-input>
          </el-form-item>
          <el-form-item label="是否启用" :label-width="formLabelWidth" prop="status">
            <el-radio v-model="user.status" label="1">是</el-radio>
            <el-radio v-model="user.status" label="2">否</el-radio>
          </el-form-item>

        <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="cancelEdit">取 消</el-button>
            <el-button size="mini" type="primary" @click="addUsers()">保 存</el-button>
        </span>
        </el-dialog>
    </el-form>
    </div>

    <!-- 添加导入文件对话框 -->
    <div>
      <el-dialog title="导入" :visible.sync="dialogUpload" width="30%" :before-close="handleClose">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          accept="application/vnd.ms-excel"
          multiple
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传excel文件，且需符合相应格式</div>
        </el-upload>
      </el-dialog>
    </div>

    <!-- 添加导出文件对话框 -->
    <div>
      <el-dialog title="导出" :visible.sync="dialogDownload" width="20%" :before-close="handleClose">
        <el-input style="width: 200px;"></el-input><label>.xls</label>
        <el-button size="small" round>保存</el-button>
        <el-button size="small" round type="danger" @click="dialogDownload=false">取消</el-button>
        <div slot="tip">只能导出excel文件，且需符合相应格式</div>
      </el-dialog>
    </div>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="10"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name:'User',
  data() {
    return {
      //在表格中显示的数据
      users: [{
          name: '11',
          code: '123'
      }
      ],
      //添加与修改弹窗显示与否
      dialogDictionary: false,
      //上传文件弹窗显示与否
      dialogUpload: false,
      //下载文件弹窗显示与否
      dialogDownload: false,
      //添加与修改弹窗中的数值
      user:{
        name:'',
        category:'',
        value:'',
        status:'',
        remark:''
      },
      //前端校验 @blur 当元素失去焦点时触发blur事件
      rules:{
        name: [{required: true, message: '字典名称必填', trigger: 'blur'}],
        category: [{required: true, message: '字典类型必填', trigger: 'blur'}],
        value: [{required: true, message: '字典值必填', trigger: 'blur'}],
      },
      //弹窗数据右对齐
      labelPosition: "right",

      //导入
      fileUploadBtnText: '导入',
      //用于分页的数据
      currentPage: 1,
      pagesize: 10,
      // 多选选中值的坐标，用于批量删除
      sels: [],
      // 搜索框数据
      searchpath: {
        name: "",
        type: "",
        status: ""
      },
      formLabelWidth: "120px"
    };
  },
  // 页码显示问题
  handleCurrentChange: function(currentPage) {
    this.currentPage = currentPage;
    console.log(this.currentPage);
  },
  // 页面加载完成后加载数据
  mounted: function() {
    this.loadCategory();
  },
  methods: {
    // 加载数据方法
    loadUsers() {
      var _this = this;
      this.$axios.get("/categories").then(resp => {
        if (resp && resp.status === 200) {
          _this.categories = resp.data;
        }
      });
    },
    // 每一行多选选中时触发该方法
    handleSelectionChange(sels) {
      this.sels = sels;
    },
    // 搜索功能
    searchUsers() {
      var _this = this;
      this.$axios
        .post("/search", {
          name: this.searchpath.name,
          code: this.searchpath.code,
          roleName: this.searchpath.roleName,
          tel: this.searchpath.tel
        })
        .then(resp => {
          if (resp && resp.status === 200) {
            this.$notify({
              title: "成功",
              message: "查询结果如下",
              type: "success",
              duration: 1000
            });
            // 若搜索成功则重新刷新页面
            _this.categories = resp.data;
          }
        });
    },
    //显示添加数据弹窗
    showAddUsers(){
      //设置弹窗表头
      this.dialogTitle = "添加数据字典";
      this.dialogDictionary = true;
    },
    // 增添數據
    addUsers() {
      this.$axios
        .post("/add", {
          name: this.form.name,
          category: this.form.category,
          value: this.form.value,
          remark: this.form.value,
          radio: this.form.radio
        })
        .then(resp => {
          // 成功增加数据后刷新页面
          if (resp && resp.status === 200) {
            this.$notify({
              title: "成功",
              message: "数据已成功插入",
              type: "success",
              duration: 1500
            });
            this.loadUsers();
            this.dialogDictionary = false;
          }
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "数据插入失败",
            duration: 1000
          });
        });
    },
    //取消弹窗
    cancelEdit(){
        this.dialogDictionary = false;
        this.emptyUsers();
    },
    //清除弹窗内容
    emptyUsers(){
        this.user = {
          name:'',
          category:'',
          value:'',
          status:'',
          remark:''
        }
    },
    //显示修改数据弹窗
    showEditUsers(row){
        this.dialogTitle = "编辑数据字典";
        this.user = row;
        this.user.name = row.name;
        this.user.category = row.category;
        this.user.value = row.value;
        this.user.status = row.status;
        this.user.remark = row.remark;
        this.dialogDictionary = true;
    },
    // 根据所选的id删除相应数据
    deleteUser(id) {
      this.$confirm("确认要删除该用户信息吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // console.log(this.$refs.multipleTable.selection)
          this.$axios.post("/delete", id).then(resp => {
            if (resp && resp.status === 200) {
              this.$notify({
                title: "成功",
                message: "数据已成功删除",
                type: "success",
                duration: 1000
              });
              // 若删除成功则重新刷新页面
              this.loadUsers();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
            duration: 1000
          });
        });
    },
    //批量删除数据
    deleteUsers(){
        this.$confirm('此操作将删除[' + this.sels.length + ']条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var ids = '';
          for (var i = 0; i < this.sels.length; i++) {
            ids += this.sels[i].id + ",";
          }
          this.doDelete(ids);
        }).catch(() => {
        });
    }
  }
};
</script>
