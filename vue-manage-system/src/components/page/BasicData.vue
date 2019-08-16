<template>
    <div>
        <label>&nbsp;&nbsp;字典名称:&nbsp;&nbsp;</label>
        <el-input
                style="width: 200px;"
                placeholder="请输入内容"
                v-model="input1"
                clearable>
        </el-input>
        <label>&nbsp;&nbsp;字典类型:&nbsp;&nbsp;</label>
        <el-input
                style="width: 200px;"
                placeholder="请输入内容"
                v-model="input2"
                clearable>
        </el-input>
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
                    prop="DictionaryName"
                    label="字典名"
                    width="140">
            </el-table-column>
            <el-table-column
                    prop="DictionaryType"
                    label="字典类型"
                    sortable
                    width="140">
            </el-table-column>
            <el-table-column
                    prop="DictionaryValue"
                    label="字典值"
                    width="140">
            </el-table-column>
            <el-table-column
                    prop="UpdateTime"
                    label="更新时间"
                    width="140">
            </el-table-column>
            <el-table-column
                    prop="Remark"
                    label="备注信息"
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
</template>

<script>
    export default {
        name: 'BasicData',
        methods: {
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 1) {
                    return 'warning-row';
                } else if (rowIndex === 3) {
                    return 'success-row';
                }
                return '';
            }
        },
        data() {
            return {
                tableData: [
                    {
                        DictionaryName:"h",
                        DictionaryType:"h",
                        DictionaryValue:"gg",
                        UpdateTime:"a",
                        Remark:"0",
                        StartTag:"0"
                    },
                    {
                        DictionaryName:"h",
                        DictionaryType:"b",
                        DictionaryValue:"gg",
                        UpdateTime:"a",
                        Remark:"1",
                        StartTag:"1"
                    }
                ],
                input1: '' ,
                input2: ''
            }
        }
    }
</script>

<style>
    .el-table .warning-row {
        background: oldlace;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }
</style>