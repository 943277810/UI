<template>
    <div>
        <span class="el-icon-postcard" style="font-size: 30px">&nbsp;新增组织机构</span>
        <br><br>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;组织机构基本信息:</span>
        <br><br>
        <div class="center">
            <label style="color: red">*</label>
            <label>&nbsp;&nbsp;角色名称:&nbsp;&nbsp;</label>
            <el-input
                    style="width: 200px;"
                    placeholder=""
                    v-model="input1"
                    clearable>
            </el-input>
            <br>
            <label style="color: red">*</label>
            <label>&nbsp;&nbsp;机构名称:&nbsp;&nbsp;</label>
            <el-input
                    style="width: 200px;"
                    placeholder=""
                    v-model="input1"
                    clearable>
            </el-input>
            <br>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;负责人:&nbsp;&nbsp;</label>
            <el-input
                    style="width: 200px;"
                    placeholder=""
                    v-model="input1"
                    clearable>
            </el-input>
            <br>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;电话:&nbsp;&nbsp;</label>
            <el-input
                    style="width: 200px;"
                    placeholder=""
                    v-model="input1"
                    clearable>
            </el-input>
            <br>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地址:&nbsp;&nbsp;</label>
            <el-input
                    style="width: 200px;"
                    placeholder=""
                    v-model="input1"
                    clearable>
            </el-input>
            <br>
            <label style="color: red">*</label>
            <label>&nbsp;&nbsp;是否启用:&nbsp;&nbsp;</label>
            <label><input  name="select"  type="radio" value="" />是 </label>
            <label><input name="select" type="radio" value="" />否 </label>
            <br><br>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <el-button type="primary" round>保存</el-button>
            <el-button type="info" round>取消</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "OrganizationAdd",
       methods:{
           data() {
               return {
                   input1: ''
               }
           }
       }
    };

</script>

<style>
    .center {
        margin-left: 30%;
    }
</style>