import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '后台管理' },
            children:[
                {
                    path: '/UserOnlineInfo',
                    component: resolve => require(['../components/page/system/UserOnlineInfo.vue'], resolve),
                    meta: { title: '在线用户管理' }
                },
                {
                    path: '/User',
                    component: resolve => require(['../components/page/system/User.vue'], resolve),
                    meta: { title: '用户管理' }
                },
                {
                    path: '/SystemParam',
                    component: resolve => require(['../components/page/system/SystemParam.vue'], resolve),
                    meta: { title: '参数管理' }
                },
                {
                    path: '/Position',
                    component: resolve => require(['../components/page/system/Position.vue'], resolve),
                    meta: { title: '职位管理' }
                },
                {
                    path: '/UserAllocation',
                    component: resolve => require(['../components/page/system/UserAllocation.vue'], resolve),
                    meta: { title: '角色分配' }
                },
                {
                    path: '/Role',
                    component: resolve => require(['../components/page/system/Role.vue'], resolve),
                    meta: { title: '角色管理' }
                },
                {
                    path: '/Resource',
                    component: resolve => require(['../components/page/system/Resource.vue'], resolve),
                    meta: { title: '资源管理' }
                },
                {
                    path: '/Organization',
                    component: resolve => require(['../components/page/system/Organization.vue'], resolve),
                    meta: { title: '机构管理' }
                },
                {
                    path: '/Department',
                    component: resolve => require(['../components/page/system/Department.vue'], resolve),
                    meta: { title: '部门管理' }
                },
                {
                    path: '/Company',
                    component: resolve => require(['../components/page/system/Company.vue'], resolve),
                    meta: { title: '公司管理' }
                },
                {
                    path: '/CombExam',
                    component: resolve => require(['../components/page/basedate/CombExam.vue'], resolve),
                    meta: { title: '组卷配置管理' }
                },
                {
                    path: '/SubjectsType',
                    component: resolve => require(['../components/page/basedate/SubjectsType.vue'], resolve),
                    meta: { title: '题目类型管理' }
                },
                {
                    path: '/Subject',
                    component: resolve => require(['../components/page/basedate/Subject.vue'], resolve),
                    meta: { title: '题目管理' }
                },
                {
                    path: '/Tess',
                    component: resolve => require(['../components/page/basedate/Tess.vue'], resolve),
                    meta: { title: '测试网页2'}
                },
                {
                    path: '/Dictionary',
                    component: resolve => require(['../components/page/basedate/Dictionary.vue'], resolve),
                    meta: { title: '基础数据管理' }
                },
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/common/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/tabs',
                    component: resolve => require(['../components/common/Tabs.vue'], resolve),
                    meta: { title: 'tab选项卡' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/common/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/common/404.vue'], resolve),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/common/403.vue'], resolve),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/common/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
