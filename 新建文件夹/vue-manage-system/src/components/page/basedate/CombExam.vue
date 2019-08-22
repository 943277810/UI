<!-- 组卷配置管理 -->
<template>
  <div>
    <label>&nbsp;&nbsp;组卷配置:&nbsp;&nbsp;</label>
    <el-input style="width: 200px;" placeholder="请输入内容" v-model="input1" clearable></el-input>
    <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
    <el-button plain>查询</el-button>
    <br />
    <br />
    <el-button type="text" class="el-icon-plus" style="font-size: 15px">增加</el-button>
    <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
    <el-button type="text" class="el-icon-delete" style="font-size: 15px">删除</el-button>
    <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
    <el-button type="text" class="el-icon-edit" style="font-size: 15px">修改</el-button>
    <br />
    <el-table
      :data="tableData"
      style="width: 100%"
      row-style="height:20px"
      cell-style="padding:0"
      :row-class-name="tableRowClassName"
      :default-sort="{prop: 'DictionaryType,StartTag', order: 'Ascending'}"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="DictionaryName" label="配置项" width="120"></el-table-column>
      <el-table-column prop="DictionaryType" label="难度" sortable width="80"></el-table-column>
      <el-table-column prop="DictionaryValue" label="修改人" width="120"></el-table-column>
      <el-table-column prop="UpdateTime" label="修改时间" width="120"></el-table-column>
      <el-table-column prop="Remark" label="启用标志" width="120"></el-table-column>
      <el-table-column prop="StartTag" label="公司" sortable width="120"></el-table-column>
      <el-table-column prop="StartTag" label="备注" sortable width="120"></el-table-column>
      <el-table-column prop="Action" label="操作">
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
      :total="1000"
    ></el-pagination>

    <el-table
      :data="tableData"
      style="width: 100%"
      row-style="height:20px"
      cell-style="padding:0"
      :row-class-name="tableRowClassName"
      :default-sort="{prop: 'DictionaryType,StartTag', order: 'Ascending'}"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="DictionaryName" label="序号" width="140"></el-table-column>
      <el-table-column prop="DictionaryType" label="题目类别" sortable width="140"></el-table-column>
      <el-table-column prop="DictionaryValue" label="题型" width="140"></el-table-column>
      <el-table-column prop="UpdateTime" label="题目数量" width="140"></el-table-column>
      <el-table-column prop="Remark" label="题目难度" width="140"></el-table-column>
      <el-table-column prop="StartTag" label="题目分值" sortable width="140"></el-table-column>
      <el-table-column prop="Action" label="操作">
        <el-button type="text" class="el-icon-plus"></el-button>
        <el-button type="text" class="el-icon-delete"></el-button>
        <el-button type="text" class="el-icon-edit"></el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "BasicData",
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    }
  },
  data() {
    return {
      tableData: [
        {
          DictionaryName: "h",
          DictionaryType: "h",
          DictionaryValue: "gg",
          UpdateTime: "a",
          Remark: "0",
          StartTag: "0"
        },
        {
          DictionaryName: "h",
          DictionaryType: "b",
          DictionaryValue: "gg",
          UpdateTime: "a",
          Remark: "1",
          StartTag: "1"
        }
      ],
      input1: "",
      input2: ""
    };
  }
};
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>