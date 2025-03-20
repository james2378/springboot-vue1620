import Vue from 'vue';
//配置路由
import VueRouter from 'vue-router'
Vue.use(VueRouter);
//1.创建组件
import Index from '@/views/index'
import Home from '@/views/home'
import Login from '@/views/login'
import NotFound from '@/views/404'
import UpdatePassword from '@/views/update-password'
import pay from '@/views/pay'
import register from '@/views/register'
import center from '@/views/center'
    import news from '@/views/modules/news/list'
    import dianyingxinxi from '@/views/modules/dianyingxinxi/list'
    import yingtingxinxi from '@/views/modules/yingtingxinxi/list'
    import aboutus from '@/views/modules/aboutus/list'
    import yingyuanshangpin from '@/views/modules/yingyuanshangpin/list'
    import huiyuanka from '@/views/modules/huiyuanka/list'
    import guashixinxi from '@/views/modules/guashixinxi/list'
    import huiyuan from '@/views/modules/huiyuan/list'
    import dianyingfenlei from '@/views/modules/dianyingfenlei/list'
    import discussdianyingxinxi from '@/views/modules/discussdianyingxinxi/list'
    import systemintro from '@/views/modules/systemintro/list'
    import shangpinfenlei from '@/views/modules/shangpinfenlei/list'
    import chat from '@/views/modules/chat/list'
    import orders from '@/views/modules/orders/list'
    import config from '@/views/modules/config/list'
    import discussyingyuanshangpin from '@/views/modules/discussyingyuanshangpin/list'


//2.配置路由   注意：名字
const routes = [{
    path: '/index',
    name: '系统首页',
    component: Index,
    children: [{
      // 这里不设置值，是把main作为默认页面
      path: '/',
      name: '系统首页',
      component: Home,
      meta: {icon:'', title:'center'}
    }, {
      path: '/updatePassword',
      name: '修改密码',
      component: UpdatePassword,
      meta: {icon:'', title:'updatePassword'}
    }, {
      path: '/pay',
      name: '支付',
      component: pay,
      meta: {icon:'', title:'pay'}
    }, {
      path: '/center',
      name: '个人信息',
      component: center,
      meta: {icon:'', title:'center'}
    }
      ,{
	path: '/news',
        name: '通知公告',
        component: news
      }
      ,{
	path: '/dianyingxinxi',
        name: '电影信息',
        component: dianyingxinxi
      }
      ,{
	path: '/yingtingxinxi',
        name: '影厅信息',
        component: yingtingxinxi
      }
      ,{
	path: '/aboutus',
        name: '关于我们',
        component: aboutus
      }
      ,{
	path: '/yingyuanshangpin',
        name: '影院商品',
        component: yingyuanshangpin
      }
      ,{
	path: '/huiyuanka',
        name: '会员卡',
        component: huiyuanka
      }
      ,{
	path: '/guashixinxi',
        name: '挂失信息',
        component: guashixinxi
      }
      ,{
	path: '/huiyuan',
        name: '会员',
        component: huiyuan
      }
      ,{
	path: '/dianyingfenlei',
        name: '电影分类',
        component: dianyingfenlei
      }
      ,{
	path: '/discussdianyingxinxi',
        name: '电影信息评论',
        component: discussdianyingxinxi
      }
      ,{
	path: '/systemintro',
        name: '系统简介',
        component: systemintro
      }
      ,{
	path: '/shangpinfenlei',
        name: '商品分类',
        component: shangpinfenlei
      }
      ,{
	path: '/chat',
        name: '在线咨询',
        component: chat
      }
      ,{
        path: '/orders/:status',
        name: '订单管理',
        component: orders
      }
      ,{
	path: '/config',
        name: '轮播图管理',
        component: config
      }
      ,{
	path: '/discussyingyuanshangpin',
        name: '影院商品评论',
        component: discussyingyuanshangpin
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {icon:'', title:'login'}
  },
  {
    path: '/register',
    name: 'register',
    component: register,
    meta: {icon:'', title:'register'}
  },
  {
    path: '/',
    name: '系统首页',
    redirect: '/index'
  }, /*默认跳转路由*/
  {
    path: '*',
    component: NotFound
  }
]
//3.实例化VueRouter  注意：名字
const router = new VueRouter({
  mode: 'hash',
  /*hash模式改为history*/
  routes // （缩写）相当于 routes: routes
})
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
export default router;
