<!-- 数据字典管理 -->
<template>
  
  <div>

    <div class="leftbox">
            <span class="el-icon-notebook-1">&nbsp;部门机构</span>
            <br>
            <el-button type="text" class="el-icon-plus" ></el-button>
            <el-button type="text" class="el-icon-refresh"></el-button>
            <el-tree :data="tree" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </div>
    <div class="rightbox">


      <div>
       <!--查询部分 -->
        <el-form :inline="true" :model="searchpath" class="demo-form-inline" style="float:left">
          <el-form-item label="职位代码">
            <el-input type="text" v-model="searchpath.code" placeholder="职位代码"></el-input>
          </el-form-item>
          <el-form-item label="职位名称">
            <el-input type="text" v-model="searchpath.name" placeholder="职位名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchPosition">查询</el-button>
          </el-form-item>
        </el-form>
        <edit-form @onSubmit="loadPosition()" ref="edit"></edit-form>
      </div>

<!-- 操作区 -->
    <div style="float:left">
      <el-button type="text" class="el-icon-plus" style="font-size: 15px" @click="showAddPosition">增加</el-button>
      <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
      <el-button type="text" class="el-icon-delete" style="font-size: 15px" @click="deletePositions">批量删除</el-button>
      <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
      <el-button type="text" class="el-icon-edit" style="font-size: 15px" @click="showEditPosition">修改</el-button>
      <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
      <el-button type="text" class="el-icon-sort-down" style="font-size: 15px" @click="dialogUpload = true">导入</el-button>
      <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
      <el-button type="text" class="el-icon-sort-up" style="font-size: 15px" @click="dialogDownload = true">导出</el-button>
    </div>

    <!-- 显示数据字典的表单 -->
    <div>
      <el-table
        ref="multipleTable"
        :data="positions"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :default-sort="{prop: 'date', order: 'descending'} "
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="companyName" label="公司" width="110"></el-table-column>
        <el-table-column prop="code" label="职位编码" sortable width="130"></el-table-column>
        <el-table-column prop="name" label="职位名称" width="100"></el-table-column>
        <el-table-column prop="remark" label="备注信息" width="140"></el-table-column>
        <el-table-column prop="status" label="状态" width="100"></el-table-column>
        <el-table-column prop="operate" label="操作" width="100">
          <template slot-scope="scope">
              <el-button type="text" class="el-icon-plus" @click="showAddPosition"></el-button>
              <!-- 编辑同样调用增加页面弹窗，scope.row为这一行的数据 -->
              <el-button type="text" class="el-icon-delete" @click="deletePosition(scope.row.id)"></el-button>
              <el-button type="text" class="el-icon-edit" @click="showEditPosition(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
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
   
    
    

    <!--添加与修改字典弹窗-->
    <div>
      <el-form :model="position" :label-position="labelPosition" :rules="rules" ref="addPosition" style="margin: 0px;
      padding: 0px;">
        <!-- close-on-click-modal 点击空白处是否关闭弹窗 -->
        <el-dialog :title="dialogTitle" style="padding: 0px;" :close-on-click-modal="false" 
        :visible.sync="dialogPosition" width="60%">
        <el-form-item label="公司" :label-width="formLabelWidth" prop="companyName">
            <el-input v-model="position.companyName" placeholder="公司"></el-input>
          </el-form-item>
          <el-form-item label="职位编码" :label-width="formLabelWidth" prop="code">
            <el-input v-model="position.code" placeholder="职位编码"></el-input>
          </el-form-item>

          <el-form-item label="职位名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="position.name" placeholder="职位名称"></el-input>
          </el-form-item>

          <el-form-item label="是否启用" :label-width="formLabelWidth" prop="status">
              <el-radio v-model="position.status" label="1">是</el-radio>
              <el-radio v-model="position.status" label="0">否</el-radio>
          </el-form-item>

          <el-form-item label="备注信息" :label-width="formLabelWidth" prop="remark">
            <el-input type="textarea" v-model="position.remark"></el-input>
          </el-form-item>

        <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="cancelEidt">取 消</el-button>
            <el-button size="mini" type="primary" @click="addPosition()">保 存</el-button>
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

    
  </div>
</template>
<script>
export default {
  name:'Position',
  data() {
    return {

/*树形结构*/
      tree: [{
          label: '一级 1',
          children: [{
              label: '二级 1-1',
              children: [{
                  label: '三级 1-1-1'
              }]
          }]
      }, {
          label: '一级 2',
          children: [{
              label: '二级 2-1',
              children: [{
                  label: '三级 2-1-1'
              }]
          }, {
              label: '二级 2-2',
              children: [{
                  label: '三级 2-2-1'
              }]
          }]
      }, {
          label: '一级 3',
          children: [{
              label: '二级 3-1',
              children: [{
                  label: '三级 3-1-1'
              }]
          }, {
              label: '二级 3-2',
              children: [{
                  label: '三级 3-2-1'
              }]
          }]
      }],

      //在表格中显示的数据
      positions: [{
          companyName: '11',
          code:'11',
          name:'11',
          status:'',
          remark:'11',
      }
      ],
      //添加与修改弹窗显示与否
      dialogPosition: false,
      //上传文件弹窗显示与否
      dialogUpload: false,
      //下载文件弹窗显示与否
      dialogDownload: false,
      //添加与修改弹窗中的数值
      position:{
        name:'',
        category:'',
        value:'',
        status:'',
        remark:''
      },
      //前端校验 @blur 当元素失去焦点时触发blur事件
      rules:{
        code: [{required: true, message: '字典名称必填', trigger: 'blur'}],
        name: [{required: true, message: '字典类型必填', trigger: 'blur'}],
        // value: [{required: true, message: '字典值必填', trigger: 'blur'}],
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
        code: "",
        name: ""
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
    this.loadPosition();
  },
  methods: {
    // 加载数据方法
    loadPosition() {
      var _this = this;
      this.$axios.get("/positions").then(resp => {
        if (resp && resp.status === 200) {
          _this.positions = resp.data;
        }
      });
    },
    // 每一行多选选中时触发该方法
    handleSelectionChange(sels) {
      this.sels = sels;
    },
    // 搜索功能
    searchPosition() {
      var _this = this;
      this.$axios
        .post("/search", {
          code: this.searchpath.code,
          name: this.searchpath.name
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
            _this.positions = resp.data;
          }
        });
    },
    //显示添加数据弹窗
    showAddPosition(){
      //设置弹窗表头
      this.dialogTitle = "添加数据字典";
      this.dialogPosition = true;
    },
    // 增添數據
    addPosition() {
      this.$axios
        .post("/add", {
          name: this.position.name,
          code: this.position.code,
          status: this.position.status,
          remark: this.position.value
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
            this.loadPosition();
            this.dialogPosition = false;
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
        this.dialogPosition = false;
        this.emptyPosition();
    },
    //清除弹窗内容
    emptyPosition(){
        this.position = {
          code:'',
          name:'',
          status:'',
          remark:''
        }
    },
    //显示修改数据弹窗
    showEditPosition(row){
        this.dialogTitle = "编辑数据字典";
        this.position = row;
        this.position.companyName = row.companyName;
        this.position.code = row.code;
        this.position.name = row.name;
        this.position.status = row.status;
        this.position.remark = row.remark;
        this.dialogPosition = true;
    },
    // 根据所选的id删除相应数据
    deletePosition(id) {
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
              this.loadPosition();
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
    deletePositions(){
        this.$confirm('此操作将删除[' + this.sels.length + ']条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var ids = '';
          for (var i = 0; i < this.sels.length; i++) {
            ids += this.sels[i].id + ",";
          }
          this.deletePosition(ids);
        }).catch(() => {
        });
    }
  }
};
</script>
<style>
    .leftbox{
        height: 480px;
        width: 15%;
        background-color: white;
        float: left;
    }
    /* .el-table .warning-row {
        background: oldlace;
    }

    .el-table .success-row {
        background: #f0f9eb;
    } */
    .rightbox{
        float: right;
        width: 85%;
    }
</style>