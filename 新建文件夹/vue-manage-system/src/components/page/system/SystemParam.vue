<!-- 数据字典管理 -->
<template>
  <div>
    <!--查询部分 -->
    <el-form :inline="true" :model="searchpath" class="demo-form-inline" style="float:left">
      <el-form-item label="参数类型">
        <el-input type="text" v-model="searchpath.paramType" placeholder="参数类型"></el-input>
      </el-form-item>
      <el-form-item label="参数项">
        <el-input type="text" v-model="searchpath.param" placeholder="参数项"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchDictionary">查询</el-button>
      </el-form-item>
    </el-form>
    <edit-form @onSubmit="loadSystemParams()" ref="edit"></edit-form>
    
    <!-- 操作区 -->
    <div style="float:left">
      <el-button type="text" class="el-icon-plus" style="font-size: 15px" @click="showAddDictionary">增加</el-button>
      <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
      <el-button type="text" class="el-icon-delete" style="font-size: 15px" @click="deleteSystemParams">批量删除</el-button>
      <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
      <el-button type="text" class="el-icon-edit" style="font-size: 15px" @click="showEditSystemParam">修改</el-button>
      <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
      <el-button type="text" class="el-icon-sort-down" style="font-size: 15px" @click="dialogUpload = true">导入</el-button>
      <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
      <el-button type="text" class="el-icon-sort-up" style="font-size: 15px" @click="dialogDownload = true">导出</el-button>
    </div>

    <!-- 显示数据字典的表单 -->
    <div>
      <el-table
        ref="multipleTable"
        :data="systemParams"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :default-sort="{prop: 'date', order: 'descending'} "
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="paramType" label="参数类型" width="110"></el-table-column>
        <el-table-column prop="param" label="参数项" sortable width="130"></el-table-column>
        <el-table-column prop="value" label="参数值" width="100"></el-table-column>
        <el-table-column prop="status" label="状态" width="100"></el-table-column>
        <el-table-column prop="operate" label="操作" width="100">
          <template slot-scope="scope">
              <el-button type="text" class="el-icon-plus" @click="showAddDictionary"></el-button>
              <!-- 编辑同样调用增加页面弹窗，scope.row为这一行的数据 -->
              <el-button type="text" class="el-icon-delete" @click="deleteSystemParam(scope.row.id)"></el-button>
              <el-button type="text" class="el-icon-edit" @click="showEditSystemParam(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--添加与修改字典弹窗-->
    <div>
      <el-form :model="systemParam" :label-position="labelPosition" :rules="rules" ref="addDictionary" style="margin: 0px;
      padding: 0px;">
        <!-- close-on-click-modal 点击空白处是否关闭弹窗 -->
        <el-dialog :title="dialogTitle" style="padding: 0px;" :close-on-click-modal="false" 
        :visible.sync="dialogSystemParam" width="60%">
        <el-form-item label="参数类型" :label-width="formLabelWidth" prop="paramType">
            <el-input v-model="systemParam.paramType" placeholder="参数类型"></el-input>
          </el-form-item>
          <el-form-item label="参数项" :label-width="formLabelWidth" prop="param">
            <el-input v-model="systemParam.param" placeholder="参数项"></el-input>
          </el-form-item>

          <el-form-item label="参数值" :label-width="formLabelWidth" prop="value">
            <el-input v-model="systemParam.value" placeholder="参数值"></el-input>
          </el-form-item>
          <el-form-item label="是否启用" :label-width="formLabelWidth" prop="status">
              <el-radio v-model="systemParam.status" label="1">是</el-radio>
              <el-radio v-model="systemParam.status" label="0">否</el-radio>
          </el-form-item>

          <el-form-item label="备注信息" :label-width="formLabelWidth" prop="remark">
            <el-input type="textarea" v-model="systemParam.remark"></el-input>
          </el-form-item>

        <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="cancelEidt">取 消</el-button>
            <el-button size="mini" type="primary" @click="addDictionary()">保 存</el-button>
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
  name:'SystemParam',
  data() {
    return {
      //在表格中显示的数据
      systemParams: [{
          paramType: '11',
          param:'11',
          value:'11',
          status:'1'
      }
      ],
      //添加与修改弹窗显示与否
      dialogSystemParam: false,
      //上传文件弹窗显示与否
      dialogUpload: false,
      //下载文件弹窗显示与否
      dialogDownload: false,
      //添加与修改弹窗中的数值
      systemParam:{
        paramType: '',
        param:'',
        value:'',
        status:''
      },
      //前端校验 @blur 当元素失去焦点时触发blur事件
      rules:{
        paramType: [{required: true, message: '字典名称必填', trigger: 'blur'}],
        param: [{required: true, message: '字典类型必填', trigger: 'blur'}],
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
        paramType: "",
        param: "",
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
    loadSystemParams() {
      var _this = this;
      this.$axios.get("/systemParams").then(resp => {
        if (resp && resp.status === 200) {
          _this.systemParams = resp.data;
        }
      });
    },
    // 每一行多选选中时触发该方法
    handleSelectionChange(sels) {
      this.sels = sels;
    },
    // 搜索功能
    searchDictionary() {
      var _this = this;
      this.$axios
        .post("/search", {
          paramType: this.searchpath.paramType,
          param: this.searchpath.param
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
            _this.systemParams = resp.data;
          }
        });
    },
    //显示添加数据弹窗
    showAddDictionary(){
      //设置弹窗表头
      this.dialogTitle = "添加数据字典";
      this.dialogSystemParam = true;
    },
    // 增添數據
    addDictionary() {
      this.$axios
        .post("/add", {
          paramType: this.systemParam.paramType,
          param: this.systemParam.param,
          value: this.systemParam.value,
          status: this.systemParam.status
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
            this.loadSystemParams();
            this.dialogSystemParam = false;
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
        this.dialogSystemParam = false;
        this.emptySystemParam();
    },
    //清除弹窗内容
    emptySystemParam(){
        this.systemParam = {
          paramType:'',
          param:'',
          value:'',
          status:''
        }
    },
    //显示修改数据弹窗
    showEditSystemParam(row){
        this.dialogTitle = "编辑数据字典";
        this.systemParam = row;
        this.systemParam.paramType = row.paramType;
        this.systemParam.param = row.param;
        this.systemParam.value = row.value;
        this.systemParam.status = row.status;
        this.dialogSystemParam = true;
    },
    // 根据所选的id删除相应数据
    deleteSystemParam(id) {
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
              this.loadSystemParams();
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
    deleteSystemParams(){
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
