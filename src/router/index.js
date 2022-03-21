import Vue from "vue"
import VueRouter from "vue-router"

// 使用路由插件
Vue.use(VueRouter);

// 引入路由组件
import Home from "@/pages/Home"
import Search from "@/pages/Search"
import Login from "@/pages/Login"
import Register from "@/pages/Register"

// 由于vue-router使用的promise方法封装所以多次调用会由于没有传入成功和失败回调导致警告报错
// 所以改写方法在无回调时传入空箭头函数回调
// 改写push方法
let originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => {}, () => {});
    }
}

// 改写replace方法
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => {}, () => {});
    }
}

// 配置路由
export default new VueRouter({
    routes: [{
            path: "/home",
            component: Home
        },
        {
            name: 'search',
            path: "/search",
            component: Search,
            props: true
        },
        {
            path: "/login",
            component: Login,
            meta: {
                footerShow: true
            }
        },
        {
            path: "/register",
            component: Register,
            meta: {
                footerShow: true
            }
        }
    ]
})