<!-- 数据字典管理 -->
<template>
    <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" style="float:left">
            <el-form-item label="组织名称">
                <el-input type="text" v-model="formInline.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
            </el-form-item>
        </el-form>
        <br><br><br>
        <edit-form @onSubmit="loadCategories()" ref="edit"></edit-form>
        <div style="float:left">
            <el-button
                    type="text"
                    class="el-icon-plus"
                    style="font-size: 15px"
                    @click="dialogFormVisible = true"
            >增加</el-button>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <el-button type="text" class="el-icon-delete" style="font-size: 15px" @click="del(sels)">删除</el-button>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <el-button
                    type="text"
                    class="el-icon-edit"
                    style="font-size: 15px"
                    @click="dialogTableVisible = true"
            >修改</el-button>
        <!--    <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <el-button
                    type="text"
                    class="el-icon-sort-down"
                    style="font-size: 15px"
                    @click="dialogVisible = true"
            >导入</el-button>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <el-button
                    type="text"
                    class="el-icon-sort-up"
                    style="font-size: 15px"
                    @click="dialogDownload = true"
            >导出</el-button>-->
        </div>
        <!-- 记录数据的表单 -->
        <div>
            <el-table
                    ref="multipleTable"
                    :data="categories"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                    :default-sort="{prop: 'start', order: 'descending'} "
            >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="name" label="组织机构" width="100"></el-table-column>
                <el-table-column prop="code" label="机构代码"  width="100"></el-table-column>
                <el-table-column prop="master" label="负责人" width="100"></el-table-column>
                <el-table-column prop="tel" label="电话" width="150"></el-table-column>
                <el-table-column prop="address" label="地址"  width="150"></el-table-column>
                <el-table-column prop="start" label="是否启用" sortable width="100"></el-table-column>
                <el-table-column prop="action" label="操作" width="100">
                    <template slot-scope="scope">
                        <i class="el-icon-plus" @click="dialogFormVisible = true"></i>
                        <i class="el-icon-delete" @click="del(scope.row.orgId)"></i>
                        <i class="el-icon-edit" @click="findbyid(scope.row.orgId)"></i>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 添加 -->
        <div>
            <el-dialog title="新增组织机构" :visible.sync="dialogFormVisible" @close="clear">
                <hr />
                <h2 style="color: blue;text-align: left;font-style: italic">基本信息</h2>
                <hr />
                <el-form v-model="form" style="text-align: left" ref="dataForm">
                    <el-form-item label="组织机构名称" :label-width="formLabelWidth" prop="name" :rules="[{ required: true}]">
                        <el-input v-model="form.name" placeholder="组织机构名称"></el-input>
                    </el-form-item>
                    <el-form-item label="机构代码" :label-width="formLabelWidth" prop="code" :rules="[{ required: true}]">
                        <el-input v-model="form.code" placeholder="机构代码"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人" :label-width="formLabelWidth" prop="master" :rules="[{ required: true}]">
                        <el-input v-model="form.master" placeholder="负责人"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" :label-width="formLabelWidth" prop="tel" :rules="[{ required: true}]">
                        <el-input v-model="form.tel" placeholder="电话"></el-input>
                    </el-form-item>
                    <el-form-item label="地址" :label-width="formLabelWidth" prop="address" :rules="[{ required: true}]">
                        <el-input v-model="form.address" placeholder="地址"></el-input>
                    </el-form-item>
                    <el-form-item label="是否启用" :label-width="formLabelWidth" prop="press">
                        <el-radio v-model="form.start" label="1">是</el-radio>
                        <el-radio v-model="form.start" label="2">否</el-radio>
                    </el-form-item>
                   <!-- <el-form-item
                            label="字典值"
                            :label-width="formLabelWidth"
                            prop="value"
                            :rules="[{ required: true, message: '字典值必须为整数'}]"
                    >
                        <el-input v-model="form.value" placeholder="字典值" type="int"></el-input>
                    </el-form-item>-->
                  <!--  <el-form-item label="备注信息" :label-width="formLabelWidth" prop="remark">
                        <el-input type="textarea" v-model="form.remark"></el-input>
                    </el-form-item>-->
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">关 闭</el-button>
                    <el-button type="primary" @click="save">保 存</el-button>
                </div>
            </el-dialog>
        </div>

        <!-- 修改 -->
        <div>
            <el-dialog title="修改组织机构" :visible.sync="dialogTableVisible" @close="clear">
                <hr />
                <h2 style="color: blue;text-align: left;font-style: italic">基本信息</h2>
                <hr />
                <el-form v-model="upform" style="text-align: left" ref="dataForm">
                    <el-form-item label="组织机构名称" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="upform.name" placeholder="组织机构名称"></el-input>
                    </el-form-item>
                    <el-form-item label="组织机构代码" :label-width="formLabelWidth" prop="code">
                        <el-input v-model="upform.code" placeholder="组织机构代码"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人" :label-width="formLabelWidth" prop="master" :rules="[{ required: true}]">
                        <el-input v-model="form.master" placeholder="负责人"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" :label-width="formLabelWidth" prop="tel" :rules="[{ required: true}]">
                        <el-input v-model="form.tel" placeholder="电话"></el-input>
                    </el-form-item>
                    <el-form-item label="地址" :label-width="formLabelWidth" prop="address" :rules="[{ required: true}]">
                        <el-input v-model="form.address" placeholder="地址"></el-input>
                    </el-form-item>
                    <el-form-item label="是否启用" :label-width="formLabelWidth" prop="press">
                        <el-radio v-model="form.start" label="1">是</el-radio>
                        <el-radio v-model="form.start" label="2">否</el-radio>
                    </el-form-item>
                    <!-- <el-form-item
                             label="字典值"
                             :label-width="formLabelWidth"
                             prop="value"
                             :rules="[{ required: true, message: '字典值必须为整数'}]"
                     >
                         <el-input v-model="form.value" placeholder="字典值" type="int"></el-input>
                     </el-form-item>-->
                    <!--  <el-form-item label="备注信息" :label-width="formLabelWidth" prop="remark">
                          <el-input type="textarea" v-model="form.remark"></el-input>
                      </el-form-item>-->
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogTableVisible = false">关 闭</el-button>
                    <el-button type="primary" @click="edit">修改</el-button>
                </div>
            </el-dialog>
        </div>

        <!-- 添加导入文件对话框 -->
        <div>
            <el-dialog title="导入" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
                <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
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
                <div slot="tip">只能上传excel文件，且需符合相应格式</div>
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
        name: "Organization",
        data() {
            return {
                // 从后台传来的数据字典信息
                categories: [],
                currentPage: 1,
                pagesize: 10,
                // 多选选中值的坐标，用于批量删除
                sels: [],
                // 搜索框数据
                formInline: {
                    name: ""
                },
                dialogVisible: false,
                dialogDownload: false,
                dialogTableVisible: false,
                dialogFormVisible: false,
                updialogFormVisible: false,
                form: {
                    name: "",
                    code: "",
                    master: "",
                    tel:"",
                    address:"",
                    start: ""
                },
                upform: {
                    id: "",
                    name: "",
                    code: "",
                    master: "",
                    tel:"",
                    address:"",
                    start: ""
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
            loadCategories() {
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
            search() {
                var _this = this;
                this.$axios
                    .post("/search", {
                        name: this.formInline.name,
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
            // 增添數據
            save() {
                this.$axios
                    .post("/add", {
                        name: this.form.name,
                        code: this.form.code,
                        master: this.form.master,
                        tel: this.form.tel,
                        address: this.form.address,
                        start: this.form.start
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
                            this.loadCategories();
                            this.dialogFormVisible = false;
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
            },
            // 根据所选id从后台查询数据
            findbyid(id) {
                this.$axios.post("/findbyid", id).then(resp => {
                    // 获取数据后显示修改弹窗
                    if (resp && resp.status === 200) {
                        this.$notify({
                            title: "成功",
                            message: "查询到数据",
                            type: "success",
                            duration: 1000
                        });
                        this.upform = {
                            name: name
                            // category: category,
                            // value: value,
                            // remark: remark
                        };
                        this.dialogTableVisible = true;
                    }
                });
            },
            // 编辑数据
            edit() {
                this.$axios
                    .post("/update", {
                        orgId: this.upform.id,
                        name: this.upform.name,
                        code: this.upform.code,
                        master: this.upform.master,
                        tel: this.upform.tel,
                        address: this.upform.address,
                        start: this.upform.start
                    })
                    .then(resp => {
                        // 成功修改数据后刷新页面
                        if (resp && resp.status === 200) {
                            this.$notify({
                                title: "成功",
                                message: "数据已成功修改",
                                type: "success",
                                duration: 1000
                            });
                            this.loadCategories();
                            this.dialogTableVisible = false;
                        }
                    })
                    .catch(() => {
                        this.$message({
                            type: "error",
                            message: "数据修改失败",
                            duration: 1000
                        });
                    });
            }
        }
    };
</script>
