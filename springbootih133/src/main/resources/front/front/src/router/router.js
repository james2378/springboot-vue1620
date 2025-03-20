import VueRouter from 'vue-router'

//引入组件
import Index from '../pages'
import Home from '../pages/home/home'
import Login from '../pages/login/login'
import Register from '../pages/register/register'
import Center from '../pages/center/center'
import Storeup from '../pages/storeup/list'
import AddrList from '../pages/shop-address/list'
import AddrAdd from '../pages/shop-address/addOrUpdate'
import Order from '../pages/shop-order/list'
import OrderConfirm from '../pages/shop-order/confirm'
import Cart from '../pages/shop-cart/list'
import News from '../pages/news/news-list'
import NewsDetail from '../pages/news/news-detail'
import huiyuanList from '../pages/huiyuan/list'
import huiyuanDetail from '../pages/huiyuan/detail'
import huiyuanAdd from '../pages/huiyuan/add'
import dianyingfenleiList from '../pages/dianyingfenlei/list'
import dianyingfenleiDetail from '../pages/dianyingfenlei/detail'
import dianyingfenleiAdd from '../pages/dianyingfenlei/add'
import dianyingxinxiList from '../pages/dianyingxinxi/list'
import dianyingxinxiDetail from '../pages/dianyingxinxi/detail'
import dianyingxinxiAdd from '../pages/dianyingxinxi/add'
import yingyuanshangpinList from '../pages/yingyuanshangpin/list'
import yingyuanshangpinDetail from '../pages/yingyuanshangpin/detail'
import yingyuanshangpinAdd from '../pages/yingyuanshangpin/add'
import shangpinfenleiList from '../pages/shangpinfenlei/list'
import shangpinfenleiDetail from '../pages/shangpinfenlei/detail'
import shangpinfenleiAdd from '../pages/shangpinfenlei/add'
import yingtingxinxiList from '../pages/yingtingxinxi/list'
import yingtingxinxiDetail from '../pages/yingtingxinxi/detail'
import yingtingxinxiAdd from '../pages/yingtingxinxi/add'
import huiyuankaList from '../pages/huiyuanka/list'
import huiyuankaDetail from '../pages/huiyuanka/detail'
import huiyuankaAdd from '../pages/huiyuanka/add'
import guashixinxiList from '../pages/guashixinxi/list'
import guashixinxiDetail from '../pages/guashixinxi/detail'
import guashixinxiAdd from '../pages/guashixinxi/add'
import systemintroList from '../pages/systemintro/list'
import systemintroDetail from '../pages/systemintro/detail'
import systemintroAdd from '../pages/systemintro/add'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

//配置路由
export default new VueRouter({
	routes:[
		{
      path: '/',
      redirect: '/index/home'
    },
		{
			path: '/index',
			component: Index,
			children:[
				{
					path: 'home',
					component: Home
				},
				{
					path: 'center',
					component: Center,
				},
				{
					path: 'storeup',
					component: Storeup
				},
                {
                    path: 'shop-address/list',
                    component: AddrList
                },
                {
                    path: 'shop-address/addOrUpdate',
                    component: AddrAdd
                },
				{
					path: 'shop-order/order',
					component: Order
				},
				{
					path: 'cart',
					component: Cart
				},
				{
					path: 'shop-order/orderConfirm',
					component: OrderConfirm
				},
				{
					path: 'news',
					component: News
				},
				{
					path: 'newsDetail',
					component: NewsDetail
				},
				{
					path: 'huiyuan',
					component: huiyuanList
				},
				{
					path: 'huiyuanDetail',
					component: huiyuanDetail
				},
				{
					path: 'huiyuanAdd',
					component: huiyuanAdd
				},
				{
					path: 'dianyingfenlei',
					component: dianyingfenleiList
				},
				{
					path: 'dianyingfenleiDetail',
					component: dianyingfenleiDetail
				},
				{
					path: 'dianyingfenleiAdd',
					component: dianyingfenleiAdd
				},
				{
					path: 'dianyingxinxi',
					component: dianyingxinxiList
				},
				{
					path: 'dianyingxinxiDetail',
					component: dianyingxinxiDetail
				},
				{
					path: 'dianyingxinxiAdd',
					component: dianyingxinxiAdd
				},
				{
					path: 'yingyuanshangpin',
					component: yingyuanshangpinList
				},
				{
					path: 'yingyuanshangpinDetail',
					component: yingyuanshangpinDetail
				},
				{
					path: 'yingyuanshangpinAdd',
					component: yingyuanshangpinAdd
				},
				{
					path: 'shangpinfenlei',
					component: shangpinfenleiList
				},
				{
					path: 'shangpinfenleiDetail',
					component: shangpinfenleiDetail
				},
				{
					path: 'shangpinfenleiAdd',
					component: shangpinfenleiAdd
				},
				{
					path: 'yingtingxinxi',
					component: yingtingxinxiList
				},
				{
					path: 'yingtingxinxiDetail',
					component: yingtingxinxiDetail
				},
				{
					path: 'yingtingxinxiAdd',
					component: yingtingxinxiAdd
				},
				{
					path: 'huiyuanka',
					component: huiyuankaList
				},
				{
					path: 'huiyuankaDetail',
					component: huiyuankaDetail
				},
				{
					path: 'huiyuankaAdd',
					component: huiyuankaAdd
				},
				{
					path: 'guashixinxi',
					component: guashixinxiList
				},
				{
					path: 'guashixinxiDetail',
					component: guashixinxiDetail
				},
				{
					path: 'guashixinxiAdd',
					component: guashixinxiAdd
				},
				{
					path: 'systemintro',
					component: systemintroList
				},
				{
					path: 'systemintroDetail',
					component: systemintroDetail
				},
				{
					path: 'systemintroAdd',
					component: systemintroAdd
				},
			]
		},
		{
			path: '/login',
			component: Login
		},
		{
			path: '/register',
			component: Register
		},
	]
})
