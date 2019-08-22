<template>
    <div>
        <div class="leftbox">
            <span class="el-icon-notebook-1">&nbsp;组织机构</span>
            <br>
            <el-button type="text" class="el-icon-plus" ></el-button>
            <el-button type="text" class="el-icon-refresh"></el-button>
            <el-tree :data="tree" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </div>
        <div class="rightbox">
        <!--查询部分 -->
        <el-form :inline="true" :model="searchpath" class="demo-form-inline" style="float:left">
            <el-form-item label="公司名">
                <el-input type="text" v-model="searchpath.name" placeholder="公司名"></el-input>
            </el-form-item>
            <el-form-item label="组织机构:">
                <el-select v-model="value" clearable placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchDictionary">查询</el-button>
            </el-form-item>
        </el-form>
        <edit-form @onSubmit="loadDictionaries()" ref="edit"></edit-form>
        <br><br><br>
        <!-- 操作区 -->
        <div style="float:left">
            <el-button type="text" class="el-icon-plus" style="font-size: 15px" @click="showAddDictionary">增加</el-button>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <el-button type="text" class="el-icon-delete" style="font-size: 15px" @click="deleteDictionaries">批量删除</el-button>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <el-button type="text" class="el-icon-edit" style="font-size: 15px" @click="showEditDictionary">修改</el-button>
        </div>

        <!-- 显示数据字典的表单 -->
        <div>
            <el-table
                    ref="multipleTable"
                    :data="dictionaries"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                    :default-sort="{prop: 'start', order: 'descending'} "
            >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="name" label="公司名称" width="100"></el-table-column>
                <el-table-column prop="code" label="公司编号"  width="100"></el-table-column>
                <el-table-column prop="mnemoniccode " label="助记码" width="100"></el-table-column>
                <el-table-column prop="master" label="法人" width="100"></el-table-column>
                <el-table-column prop="tax" label="税号"  width="100"></el-table-column>
                <el-table-column prop="fax" label="传真"  width="100"></el-table-column>
                <el-table-column prop="address" label="地址"  width="150"></el-table-column>
                <el-table-column prop="organization" label="所属机构"  width="100"></el-table-column>
                <el-table-column prop="mail" label="邮箱"  width="100"></el-table-column>
                <el-table-column prop="website" label="网址"  width="100"></el-table-column>
                <el-table-column prop="start" label="是否启用" sortable width="100"></el-table-column>
                <el-table-column prop="action" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button type="text" class="el-icon-plus" @click="showAddDictionary"></el-button>
                        <!-- 编辑同样调用增加页面弹窗，scope.row为这一行的数据 -->
                        <el-button type="text" class="el-icon-delete" @click="deleteDictionary(scope.row.id)"></el-button>
                        <el-button type="text" class="el-icon-edit" @click="showEditDictionary(scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!--添加与修改字典弹窗-->
        <div>
            <el-form :model="dictionary" :label-position="labelPosition" :rules="rules" ref="addDictionary" style="margin: 0px;
      padding: 0px;">
                <!-- close-on-click-modal 点击空白处是否关闭弹窗 -->
                <el-dialog :title="dialogTitle" style="padding: 0px;" :close-on-click-modal="false"
                           :visible.sync="dialogDictionary" width="60%">
                    <el-form-item label="公司名称" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="dictionary.name" placeholder="公司名称"></el-input>
                    </el-form-item>
                    <el-form-item label="公司编号" :label-width="formLabelWidth" prop="code">
                        <el-input v-model="dictionary.code" placeholder="公司编号"></el-input>
                    </el-form-item>
                    <el-form-item label="助记码" :label-width="formLabelWidth" prop="mnemoniccode">
                        <el-input v-model="dictionary.mnemoniccode" placeholder="助记码"></el-input>
                    </el-form-item>
                    <el-form-item label="法人" :label-width="formLabelWidth" prop="master">
                        <el-input v-model="dictionary.master" placeholder="法人"></el-input>
                    </el-form-item>
                    <el-form-item label="税号" :label-width="formLabelWidth" prop="tax">
                        <el-input v-model="dictionary.tax" placeholder="税号"></el-input>
                    </el-form-item>
                    <el-form-item label="传真" :label-width="formLabelWidth" prop="fax">
                        <el-input v-model="dictionary.fax" placeholder="传真"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" :label-width="formLabelWidth" prop="tel">
                        <el-input v-model="dictionary.tel" placeholder="电话"></el-input>
                    </el-form-item>
                    <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
                        <el-input v-model="dictionary.address" placeholder="地址"></el-input>
                    </el-form-item>
                    <el-form-item label="所属机构" :label-width="formLabelWidth" prop="organization">
                        <el-input v-model="dictionary.organization" placeholder="所属机构"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" :label-width="formLabelWidth" prop="mail">
                        <el-input v-model="dictionary.mail" placeholder="邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="是否启用" :label-width="formLabelWidth" prop="press">
                        <el-radio v-model="dictionary.start" label="1">是</el-radio>
                        <el-radio v-model="dictionary.start" label="2">否</el-radio>
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
    </div>
</template>
<script>
    export default {
        name:"Company",
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
                dictionaries: [
                ],
                //添加与修改弹窗显示与否
                dialogDictionary: false,
                //上传文件弹窗显示与否
                dialogUpload: false,
                //下载文件弹窗显示与否
                dialogDownload: false,
                //添加与修改弹窗中的数值
                dictionary:{
                    name: "",
                    code: "",
                    mnemoniccode:"",
                    master:"",
                    tax:"",
                    fax:"",
                    tel:"",
                    address:"",
                    organization:"",
                    mail:"",
                    start:""
                },
                //前端校验 @blur 当元素失去焦点时触发blur事件
                rules:{
                    name: [{required: true, message: '字典名称必填', trigger: 'blur'}],
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
            this.loadDictionaries();
        },
        methods: {
            // 加载数据方法
            loadDictionaries() {
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
            searchDictionary() {
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
                        code: this.form.code,
                        mnemoniccode: this.form.mnemoniccode,
                        master: this.form.master,
                        tax: this.form.tax,
                        fax: this.form.fax,
                        tel: this.form.tel,
                        address: this.form.address,
                        organization: this.form.organization,
                        mail: this.form.mail,
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
                    name: '',
                    code: '',
                    mnemoniccode:'',
                    master: '',
                    tax: '',
                    fax: '',
                    tel:'',
                    address: '',
                    organization: '',
                    mail: '',
                }
            },
            //显示修改数据弹窗
            showEditDictionary(row){
                this.dialogTitle = "编辑数据字典";
            /*    this.dictionary = row;
                this.dictionary.name = row.name;
                this.dictionary.category = row.category;
                this.dictionary.value = row.value;
                this.dictionary.status = row.status;
                this.dictionary.remark = row.remark;*/
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
<style>
    .leftbox{
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
    .rightbox{
        float: right;
        width: 85%;
    }
</style>