import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
import category from '@/pages/category'
import cart from '@/pages/cart'
import my from '@/pages/my'
import loginView from '@/pages/auth/loginView'
import pw_back from '@/pages/auth/pw_back'
import register from '@/pages/auth/register'
import address_manage from '@/pages/auth/address_manage'
import sign_in_user from '@/pages/auth/sign_in_user'
import setup_view from '@/pages/auth/setup_view'
import setup_help_view from '@/pages/auth/setup_help_view'
import nickName_change from '@/pages/auth/nickName_change'
import mall_order from '@/pages/auth/order/mall_order'
import order_detail from '@/pages/auth/order/order_detail'
import collection from '@/pages/auth/collection'
// const loginView = r => require.ensure([], () => r(require('../pages/auth/loginView')), 'loginView')

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/category',
      name: 'category',
      component: category
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart
    },
    {
      path: '/my',
      name: 'my',
      component: my,
      children: [{
        path: 'setup_view',
        name: 'setup_view',
        component: setup_view
      },{
        path: 'setup_help_view',
        name: 'setup_help_view',
        component: setup_help_view
      },{
        path: 'nickName_change/:alias',
        name: 'nickName_change',
        component: nickName_change,
      }]
    },
    {
      path: '/sign_in_user',
      name: 'sign_in_user',
      component: sign_in_user,
    },
    {
      path: '/loginView',
      name: 'loginView',
      component: loginView,
      children: [{
        path: 'register',
        name: 'register',
        component: register
      },{
        path: 'pw_back',
        name: 'pw_back',
        component: pw_back
      }]
    },
    {
      path: '/mall_order/:act',
      name: 'mall_order',
      component: mall_order
    },
    {
      path: '/order_detail/:order_sn',
      name: 'order_detail',
      component: order_detail
    },
    {
      path: '/collection',
      name: 'collection',
      component: collection
    },
    {
      path: '/address_manage',
      name: 'address_manage',
      component: address_manage
    }
  ]
})
