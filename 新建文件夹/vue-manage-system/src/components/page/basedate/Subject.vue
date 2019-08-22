<!--题目管理 -->
<template>
  <div>
    <div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline" style="float:left">
        <el-form-item label="题目分类">
          <el-select v-model="value" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择题型">
          <el-input type="text" v-model="formInline.category" placeholder></el-input>
        </el-form-item>
        <el-form-item label="输入题目">
          <el-input type="text" v-model="formInline.status" placeholder></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
      <edit-form @onSubmit="loadCategories()" ref="edit"></edit-form>
      <div style="float:left">
        <el-button
          type="text"
          class="el-icon-plus"
          style="font-size: 15px"
          @click="dialogAddSubject = true"
        >增加</el-button>
        <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <el-button type="text" class="el-icon-delete" style="font-size: 15px" @click="del(sels)">删除</el-button>
        <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <el-button
          type="text"
          class="el-icon-edit"
          style="font-size: 15px"
          @click="dialogEditSubject= true"
        >修改</el-button>
        <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <el-button
          type="text"
          class="el-icon-sort-down"
          style="font-size: 15px"
          @click="dialogUpload = true"
        >导入</el-button>
        <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <el-button
          type="text"
          class="el-icon-sort-up"
          style="font-size: 15px"
          @click="dialogDownload = true"
        >导出</el-button>
      </div>

      <!-- 记录数据的表单 -->
      <div>
        <el-table
          :data="tableData"
          style="width: 100%"
          row-style="height:20px"
          cell-style="padding:0"
          :row-class-name="tableRowClassName"
          :default-sort="{prop: 'DictionaryType,StartTag', order: 'Ascending'}"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="SubjectType" label="题目类型" sortable width="140"></el-table-column>
          <el-table-column prop="Remark" label="备注" width="140"></el-table-column>
          <el-table-column prop="UpdateTime" label="更新时间" width="140"></el-table-column>
          <el-table-column prop="StartTag" label="启动标记" sortable width="140"></el-table-column>
          <el-table-column prop="Action" label="操作">
            <el-button type="text" class="el-icon-plus"></el-button>
            <el-button type="text" class="el-icon-delete"></el-button>
            <el-button type="text" class="el-icon-edit"></el-button>
          </el-table-column>
        </el-table>
      </div>

      <!-- 添加题目弹窗-->
      <div>
        <el-dialog title="添加题目" :visible.sync="dialogAddSubject" @close="clear">
          <hr />
          <h2 style="color: blue;text-align: left">基本信息</h2>
          <hr />
          <br />
          <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
            <el-form-item
              label="题目类别"
              :label-width="formLabelWidth"
              prop="name"
              :rules="[{ required: false, message: '题目类别不能为空'}]"
            >
              <el-select v-model="value" clearable placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="题型"
              :label-width="formLabelWidth"
              prop="name"
              :rules="[{ required: false, message: '题型不能为空'}]"
            >
              <el-select v-model="value" clearable placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="难度"
              :label-width="formLabelWidth"
              prop="name"
              :rules="[{ required: false, message: '难度不能为空'}]"
            >
              <el-select v-model="value" clearable placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="题目"
              :label-width="formLabelWidth"
              prop="remark"
              :rules="[{ required: false, message: '题目不能为空'}]"
            >
              <el-input type="textarea" v-model="form.remark"></el-input>
            </el-form-item>
            <el-form-item label="选项" :label-width="formLabelWidth" prop="value">
              <el-button
                type="text"
                class="el-icon-plus"
                style="font-size: 15px"
                @click="dialogAddSubject = true"
              >添加选项</el-button>
            </el-form-item>

            <el-form-item
              label="选择图片"
              :label-width="formLabelWidth"
              prop="remark"
              :rules="[{ required: false, message: ''}]"
            >
              <el-input type="text" style="width: 300px" v-model="form.remark"></el-input>
              <el-button>上传图片</el-button>
            </el-form-item>

            <el-form-item label="答案" :label-width="formLabelWidth" prop="value">
              <el-button
                type="text"
                class="el-icon-plus"
                style="font-size: 15px"
                @click="dialogAddSubject = true"
              >添加答案</el-button>
            </el-form-item>

            <el-form-item label="是否启用" :label-width="formLabelWidth" prop="press">
              <el-radio v-model="form.radio" label="1">是</el-radio>
              <el-radio v-model="form.radio" label="2">否</el-radio>
            </el-form-item>

            <el-form-item label="备注信息" :label-width="formLabelWidth" prop="remark">
              <el-input type="textarea" v-model="form.remark"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">关 闭</el-button>
            <el-button type="primary" @click="save">保 存</el-button>
          </div>
        </el-dialog>
      </div>

    <!-- 修改题目弹窗-->
      <div>
        <el-dialog title="修改题目" :visible.sync="dialogEditSubject" @close="clear">
          <hr />
          <h2 style="color: blue;text-align: left">基本信息</h2>
          <hr />
          <br />
          <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
            <el-form-item
              label="题目类别"
              :label-width="formLabelWidth"
              prop="name"
              :rules="[{ required: false, message: '题目类别不能为空'}]"
            >
              <el-select v-model="value" clearable placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="题型"
              :label-width="formLabelWidth"
              prop="name"
              :rules="[{ required: false, message: '题型不能为空'}]"
            >
              <el-select v-model="value" clearable placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="难度"
              :label-width="formLabelWidth"
              prop="name"
              :rules="[{ required: false, message: '难度不能为空'}]"
            >
              <el-select v-model="value" clearable placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="题目"
              :label-width="formLabelWidth"
              prop="remark"
              :rules="[{ required: false, message: '题目不能为空'}]"
            >
              <el-input type="textarea" v-model="form.remark"></el-input>
            </el-form-item>
            <el-form-item label="选项" :label-width="formLabelWidth" prop="value">
              <el-button
                type="text"
                class="el-icon-plus"
                style="font-size: 15px"
                @click="dialogAddSubject = true"
              >添加选项</el-button>
            </el-form-item>

            <el-form-item
              label="选择图片"
              :label-width="formLabelWidth"
              prop="remark"
              :rules="[{ required: false, message: ''}]"
            >
              <el-input type="text" style="width: 300px" v-model="form.remark"></el-input>
              <el-button>上传图片</el-button>
            </el-form-item>

            <el-form-item label="答案" :label-width="formLabelWidth" prop="value">
              <el-button
                type="text"
                class="el-icon-plus"
                style="font-size: 15px"
                @click="dialogAddSubject = true"
              >添加答案</el-button>
            </el-form-item>

            <el-form-item label="是否启用" :label-width="formLabelWidth" prop="press">
              <el-radio v-model="form.radio" label="1">是</el-radio>
              <el-radio v-model="form.radio" label="2">否</el-radio>
            </el-form-item>

            <el-form-item label="备注信息" :label-width="formLabelWidth" prop="remark">
              <el-input type="textarea" v-model="form.remark"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">关 闭</el-button>
            <el-button type="primary" @click="save">保 存</el-button>
          </div>
        </el-dialog>
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
        <el-dialog
          title="导出"
          :visible.sync="dialogDownload"
          width="20%"
          :before-close="handleClose"
        >
          <el-input style="width: 200px;"></el-input>
          <label>.xls</label>
          <el-button size="small" round>保存</el-button>
          <el-button size="small" round type="danger" @click="dialogDownload=false">取消</el-button>
          <div slot="tip">只能导出excel文件，且需符合相应格式</div>
        </el-dialog>
      </div>

      <el-pagination
        style="text-align: center"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="1000"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "SubjectsType",

  data() {
    return {
      //弹窗左对齐参数
      labelPosition: "left",
      formLabelAlign: {
        name: "",
        region: "",
        type: ""
      },
      // 搜索框数据
      formInline: {
        name: "",
        category: "",
        status: ""
      },
      form: {
        name: "",
        category: "",
        value: "",
        remark: "",
        radio: ""
      },
      categories: [],
      dialogTest: false,
      dialogAddSubject: false,
      dialogEditSubject: false,
      dialogDownload: false,
      dialogUpload: false,
      options: [
        {
          value: "选项1",
          label: "c++题"
        },
        {
          value: "选项2",
          label: "java题"
        }
      ],
      value: "",
      tableData: [
        {
          SubjectType: "h",
          UpdateTime: "a",
          Remark: "0",
          StartTag: "0"
        },
        {
          SubjectType: "h",
          UpdateTime: "as",
          Remark: "1",
          StartTag: "1"
        }
      ],
      input1: "",
      input2: ""
    };
  },
  defaultProps: {
    children: "children",
    label: "label"
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    handleNodeClick(data) {
      console.log(data);
    },
    // 根据所选的id删除相应数据
    del(id) {
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
              this.loadCategories();
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
    }
  }
};
</script>

<style>
.leftbox {
  height: 480px;
  width: 15%;
  background-color: white;
  float: left;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.rightbox {
  float: right;
  width: 85%;
}
</style>