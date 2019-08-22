<!--题目类别 -->
<template>
    <div>
        <div class="leftbox">
            <span class="el-icon-notebook-1">&nbsp;题目类别</span>
            <br>
            <el-button type="text" class="el-icon-plus" ></el-button>
            <el-button type="text" class="el-icon-refresh"></el-button>
            <el-tree :data="tree" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </div>
        <div class="rightbox">
            <label>&nbsp;&nbsp;题目类别:&nbsp;&nbsp;</label>
            <el-select v-model="value" clearable placeholder="请选择">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>

            <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <el-button plain>查询</el-button>
            <br><br>
            <el-button type="text" class="el-icon-plus" style="font-size: 15px" >增加</el-button>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <el-button type="text" class="el-icon-delete" style="font-size: 15px" >删除</el-button>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <el-button type="text" class="el-icon-edit" style="font-size: 15px" >修改</el-button>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <el-button type="text" class="el-icon-sort-down" style="font-size: 15px" >导入</el-button>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <el-button type="text" class="el-icon-sort-up" style="font-size: 15px" >导出</el-button>
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
                        prop="SubjectType"
                        label="题目类型"
                        sortable
                        width="140">
                </el-table-column>
                <el-table-column
                        prop="Remark"
                        label="备注"
                        width="140">
                </el-table-column>
                <el-table-column
                        prop="UpdateTime"
                        label="更新时间"
                        width="140">
                </el-table-column>
                <el-table-column
                        prop="StartTag"
                        label="启动标记"
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
        name: "SubjectsType",
        data() {
            return {
                options: [{
                    value: '选项1',
                    label: 'c++题'
                },
                    {
                        value: '选项2',
                        label: 'java题'
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
                    {
                        SubjectType:"h",
                        UpdateTime:"a",
                        Remark:"0",
                        StartTag:"0"
                    },
                    {
                        SubjectType:"h",
                        UpdateTime:"as",
                        Remark:"1",
                        StartTag:"1"
                    }
                ],
                input1: '' ,
                input2: ''
            }
        },
        defaultProps: {
            children: 'children',
            label: 'label'
        },
        methods: {
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 1) {
                    return 'warning-row';
                } else if (rowIndex === 3) {
                    return 'success-row';
                }
                return '';
            },
            handleNodeClick(data) {
                console.log(data);
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