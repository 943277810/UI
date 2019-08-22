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
      <el-form-item>
        <el-button type="primary" @click="searchOnlineUsers">查询</el-button>
      </el-form-item>
    </el-form>
    <edit-form @onSubmit="loadDictionaries()" ref="edit"></edit-form>
    
    <!-- 操作区 -->
    <div style="float:left">
      <el-button type="text" class="el-icon-plus" style="font-size: 15px" @click="showAddDictionary">增加</el-button>
      <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
      <el-button type="text" class="el-icon-delete" style="font-size: 15px" @click="deleteDictionaries">批量删除</el-button>
      <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
      <el-button type="text" class="el-icon-edit" style="font-size: 15px" @click="showEditDictionary">修改</el-button>
      <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
      <el-button type="text" class="el-icon-sort-down" style="font-size: 15px" @click="dialogUpload = true">导入</el-button>
      <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
      <el-button type="text" class="el-icon-sort-up" style="font-size: 15px" @click="dialogDownload = true">导出</el-button>
    </div>

    <!-- 显示数据字典的表单 -->
    <div>
      <el-table
        ref="multipleTable"
        :data="onlineUsers"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :default-sort="{prop: 'date', order: 'descending'} "
      >
       <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="userCode" label="工号" width="110"></el-table-column>
        <el-table-column prop="username" label="用户名" sortable width="130"></el-table-column>
        <el-table-column prop="ip" label="IP" width="100"></el-table-column>
        <el-table-column prop="onlineTime" label="上线时间" width="100"></el-table-column>
        <el-table-column prop="offlineTime" label="下线时间" width="100"></el-table-column>
        <el-table-column prop="status" label="状态" width="100"></el-table-column>
        <el-table-column prop="operate" label="操作" width="100">
          <template slot-scope="scope">
              <el-button type="text" class="el-icon-plus" @click="showAddDictionary"></el-button>
              <!-- 编辑同样调用增加页面弹窗，scope.row为这一行的数据 -->
              <el-button type="text" class="el-icon-delete" @click="deleteDictionary(scope.row.id)"></el-button>
              <el-button type="text" class="el-icon-edit" @click="showEditDictionary(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
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
    name:'UserOnlineInfo',
  data() {
    return {
      //在表格中显示的数据
      onlineUsers: [{
          name: '11',
          category:'11',
          value:'11',
          mark:'11',
          updated_time:'11',
      }
      ],
      //添加与修改弹窗显示与否
      dialogDictionary: false,
      //上传文件弹窗显示与否
      dialogUpload: false,
      //下载文件弹窗显示与否
      dialogDownload: false,
      //添加与修改弹窗中的数值
      dictionary:{
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
    this.loadOnlineUsers();
  },
  methods: {
    // 加载数据方法
    loadOnlineUsers() {
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
    searchOnlineUsers() {
      var _this = this;
      this.$axios
        .post("/search", {
          name: this.formInline.name,
          code: this.formInline.code,
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
    showAddDictionary(){
      //设置弹窗表头
      this.dialogTitle = "添加数据字典";
      this.dialogDictionary = true;
    },
    // 增添數據
    addDictionary() {
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
            this.loadDictionaries();
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
    cancelEidt(){
        this.dialogDictionary = false;
        this.emptyDictionary();
    },
    //清除弹窗内容
    emptyDictionary(){
        this.dictionary = {
          name:'',
          category:'',
          value:'',
          status:'',
          remark:''
        }
    },
    //显示修改数据弹窗
    showEditDictionary(row){
        this.dialogTitle = "编辑数据字典";
        this.dictionary = row;
        this.dictionary.name = row.name;
        this.dictionary.category = row.category;
        this.dictionary.value = row.value;
        this.dictionary.status = row.status;
        this.dictionary.remark = row.remark;
        this.dialogDictionary = true;
    },
    // 根据所选的id删除相应数据
    deleteDictionary(id) {
      this.$confirm("确认要删除该字典信息吗?", "信息", {
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
              this.loadDictionaries();
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
    deleteDictionaries(){
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
