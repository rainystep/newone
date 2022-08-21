import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ToolChart from '@/components/ToolChart'
//把VueRouter安装为Vue的插件
Vue.use(Router)

//创建路由的实例对象，向外共享
export default new Router({
  routes: [
    { path: '/', redirect:'/helloworld' },
    { path: '/helloworld', name: 'HelloWorld', component: HelloWorld },
    { path: '/toolchart', name: 'ToolChart', component: ToolChart }
  ]
})
