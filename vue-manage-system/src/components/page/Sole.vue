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
            <label>&nbsp;&nbsp;角色名称:&nbsp;&nbsp;</label>
            <el-input
                    style="width: 200px;"
                    placeholder="请输入内容"
                    v-model="input1"
                    clearable>
            </el-input>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <el-button plain>查询</el-button>
            <br><br>
            <el-button type="text" class="el-icon-plus" style="font-size: 15px" >增加</el-button>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <el-button type="text" @click="open" class="el-icon-delete" style="font-size: 15px">删除</el-button>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <el-button type="text" class="el-icon-edit" style="font-size: 15px" >修改</el-button>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <el-button type="text" class="el-icon-circle-plus-outline" style="font-size: 15px" >资源分配</el-button>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <el-button type="text" class="el-icon-user" style="font-size: 15px" >用户分配</el-button>
            <br>
            <el-table
                    :data="tableData"
                    style="width: 100%"
                    row-style="height:20px"
                    cell-style="padding:0"
                    :row-class-name="tableRowClassName"
                    :default-sort = "{prop: 'DictionaryType,StartTag', order: 'Ascending'}"
            >
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="SoleName"
                        label="角色名称"
                        width="140">
                </el-table-column>
                <el-table-column
                        prop="SoleCode "
                        label="角色代号"
                        width="140">
                </el-table-column>
                <el-table-column
                        prop="SoleRemark"
                        label="角色备注"
                        width="140">
                </el-table-column>
                <el-table-column
                        prop="Company"
                        label="所属公司"
                        width="140">
                </el-table-column>
                <el-table-column
                        prop="Organization"
                        label="所属机构"
                        sortable
                        width="140">
                </el-table-column>
                <el-table-column
                        prop="StartTag"
                        label="启用标记"
                        sortable
                        width="140">
                </el-table-column>
                <el-table-column
                        prop="Action"
                        label="操作"
                >
                    <el-button type="text" class="el-icon-plus"></el-button>
                    <el-button type="text" class="el-icon-delete"></el-button>
                    <el-button type="text" class="el-icon-edit"></el-button>
                </el-table-column>
            </el-table>

            <el-pagination
                    style="text-align: center"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage3"
                    :page-size="100"
                    layout="prev, pager, next, jumper"
                    :total="1000">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Sole',
        methods: {
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 1) {
                    return 'warning-row';
                } else if (rowIndex === 3) {
                    return 'success-row';
                }
                return '';
            },
            open() {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
        data() {
            return {
                options: [{
                    value: '选项1',
                    label: '1'
                },
                    {
                        value: '选项2',
                        label: '2'
                    }],
                value: '',
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
                tableData: [

                ],
                input1: '' ,
                input2: ''
            }
        }
    }
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