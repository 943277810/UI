<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-document',
                        index: 1,
                        title: '基础数据管理',
                        subs: [
                            {
                                index: 'Dictionary',
                                title: '数据字典管理'
                            },
                            {
                                index: 'SubjectsType',
                                title: '题目类别管理'
                            },
                            {
                                index: 'Subject',
                                title: '题目管理'
                            }, 
                            {
                                index: 'CombExam',
                                title: '组卷配置管理'
                            },
                            {
                                index: 'tess',
                                title: '示例网页'
                            }
                        ]
                    }
                    ,
                    {
                        icon: 'el-icon-data-analysis',
                        index:2,
                        title: '系统管理',
                        subs: [
                            {
                                icon: 'el-icon-arrow-right',
                                index: 'Organization',
                                title: '机构管理'
                            },
                            {
                                icon: 'el-icon-arrow-right',
                                index: 'Company',
                                title: '公司管理'
                            },
                            {
                                icon: 'el-icon-arrow-right',
                                index: 'Department',
                                title: '部门管理'
                            },
                            {
                                icon: 'el-icon-arrow-right',
                                index: 'Resource',
                                title: '资源管理'
                            },
                            {
                                icon: 'el-icon-arrow-right',
                                index: 'Role',
                                title: '角色管理'
                            },
                            {
                                icon: 'el-icon-arrow-right',
                                index: 'Position',
                                title: '职位管理'
                            },
                            {
                                icon: 'el-icon-arrow-right',
                                index: 'User',
                                title: '用户管理'
                            },
                            {
                                icon: 'el-icon-arrow-right',
                                index: 'SystemParam',
                                title: '参数管理'
                            },
                            {
                                icon: 'el-icon-arrow-right',
                                index: 'UserOnlineInfo',
                                title: '在线用户管理'
                            }
                        ]
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 200px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
