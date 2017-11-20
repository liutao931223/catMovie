import Vue from 'vue'
import app from './App'

//引入elementUI的组件库和样式
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css"
Vue.use(ElementUI)//使用ElementUI的中间键

Vue.config.productionTip = false

Vue.component("app",app)

import router from "./router/index.js"//路由

import store from "./components/store/store.js"//状态机

new Vue({
  el: '#app',//将所有东西都挂载到#app中，
  //然后又因为由路由路径匹配到的视图组件都会渲染到<router-view>中，所以直接引进<app />
  store,
  router,
  template: '<app />',
})
