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
            <!-- 显示数据字典的表单 -->
            <div>
                <el-table
                        ref="multipleTable"
                        :data="dictionaries"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange"
                        :default-sort = "{prop: 'Organization,StartTag', order: 'Ascending'}"
                >
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="code" label="用户工号" width="140"></el-table-column>
                    <el-table-column prop="password " label="初始密码" width="140"></el-table-column>
                    <el-table-column prop="name" label="名字" width="140"></el-table-column>
                    <el-table-column prop="positionName" label="职位" width="140"></el-table-column>
                    <el-table-column prop="sex" label="性别" sortable width="140"></el-table-column>
                    <el-table-column prop="birthday" label="生日" sortable width="140"></el-table-column>
                    <el-table-column prop="tel" label="电话" width="100"></el-table-column>
                    <el-table-column prop="email" label="邮箱" width="100"></el-table-column>
                    <el-table-column prop="other" label="其他/微信" width="100"></el-table-column>
                    <el-table-column prop="start" label="启用标记" width="100"></el-table-column>
                    <el-table-column prop="action" label="操作列" width="100">
                        <template slot-scope="scope">
                            <el-button type="text" class="el-icon-plus" @click="showAddDictionary"></el-button>
                            <!-- 编辑同样调用增加页面弹窗，scope.row为这一行的数据 -->
                            <el-button type="text" class="el-icon-delete" @click="deleteDictionary(scope.row.id)"></el-button>
                            <el-button type="text" class="el-icon-edit" @click="showEditDictionary(scope.row)"></el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="remark" label="备注" width="180"></el-table-column>
                </el-table>

                <span slot="footer" class="dialog-footer" style="margin-left: 40%">
                    <el-button size="mini" @click="cancelEidt">取 消</el-button>
                    <el-button size="mini" type="primary" @click="addDictionary()">保 存</el-button>
                </span>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name:"UserAllocation",
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
                //资源分配的树形结构
                resource: [{
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
                //资源分配弹窗显示与否
                dialogResource: false,
                //添加与修改弹窗中的数值
                dictionary:{
                    name: "",
                    code:"",
                    SoleRemark:"",
                    Organization:"",
                    Company:"",
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
                        SoleRemark: this.form.SoleRemark,
                        Organization: this.form.Organization,
                        Company: this.form.Company,
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
                    name: "",
                    code:"",
                    SoleRemark:"",
                    Organization:"",
                    Company:"",
                    start:""
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
            },
            resourceManagement(){
                this.dialogResource = true;
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