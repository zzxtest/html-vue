<template>
	<div class="my">
		<div class="topBar">
			<van-icon class="topBar-icon fr" name="chat" />
	      	<van-icon class="topBar-icon fr" name="setting" @click="setting" />
	    </div>
	    <!-- 登陆个人 -->
	    <div class="atLogin cf">
	    	<div class="href" @click="onUser">
		    	<img class="userImg fl" :src="myData.user_photo" alt="头像">
		    	<span class="nickname fl" v-if="myData.user_rank" v-text="myData.alias"></span>
		    	<span class="nickname fl" v-else>登陆/注册</span>
	    	</div>
	    </div>
	    <!-- 商城订单 -->
	    <van-cell-group class="order-btn">
		  	<van-cell center="center" @click="goOrder(0)">
		  		<template slot="icon">
			      	<van-icon class="order-icon" name="pending-orders" />
			    </template>
				<template slot="title">
			      	<span class="van-cell-text fl">商城订单</span>
			      	<span class="van-cell-value fr">查看更多订单</span>
			    </template>
			    <template slot="right-icon">
			      	<van-icon class="right-icon" name="arrow" />
			    </template>
			</van-cell>
		</van-cell-group>
		<!-- 个人入口 -->
		<div class="tabBtn-box">
			<van-tabbar class="tab-btn" v-for="(items, indexs_b) in tabBtn" :key="indexs_b">
			  <van-tabbar-item icon="shop" v-for="(item, index_b) in items" :key="index_b" @click="tabClick(indexs_b,index_b)">
			  	<span v-text="item.name"></span>
			    <template slot="icon">
			      <van-icon :name="item.icon" />
			      <div class="van-icon-info" v-text="myData.collect" v-if="myData.collect!=0 && item.name=='收藏'"></div>
			    </template>
			  </van-tabbar-item>
			</van-tabbar>
		</div>
		<van-cell-group class="myBtn-box" v-for="(items, indexs) in myData.item" :key="indexs">
		  	<van-cell center="center" v-for="(item, index) in items" :key="index" @click="myBtnClick(indexs,index)">
		  		<template slot="icon">
			      	<img class="myBtn-icon" :src="item.icon" alt="">
			    </template>
				<template slot="title">
			      	<span class="van-cell-text fl" v-text="item.name"></span>
			    </template>
			    <template slot="right-icon">
			      	<van-icon class="right-icon" name="arrow" />
			    </template>
			</van-cell>
		</van-cell-group>
		<transition name="router-slid" mode="out-in">
        	<router-view></router-view>
    	</transition>
    	<tab-bar/>
	</div>
</template>

<script>
import {setStore, getCookie} from '../assets/js/mUtils'
import {baseUrl, API} from '../assets/js/env'
import { Toast } from 'vant'

export default {
  name: 'my',
  data () {
    return {
      center: true,
      myData: {},
      cookie: null,
      tabBtn:[
      	[{
      		name: "待付款",
      		icon: "shop",
      		info: null
      	}, {
      		name: "待收货",
      		icon: "chat",
      		info: null
      	}, {
      		name: "待评价",
      		icon: "records",
      		info: null
      	}, {
      		name: "退款/售后",
      		icon: "gold-coin",
      		info: null
      	}],
      	[{
      		name: "账户",
      		icon: "shop",
      		info: null
      	}, {
      		name: "收藏",
      		icon: "chat",
      		info: 5
      	}, {
      		name: "优惠券",
      		icon: "records",
      		info: null
      	}, {
      		name: "兑换券",
      		icon: "gold-coin",
      		info: null

      	}]
      ]
    }
  },
  beforeMount () {
  	Toast.loading({
	  mask: true,
	  duration: 0,
	  message: '加载中...'
	});
  	let that = this
    setStore('active', 3)
    that.cookie = getCookie("api_auth_cookie")
    that.$http.get(API.baseinfo)
      .then(function (response) {
      	let data = response.data.data
      	that.myData = response.data.data
      	Toast.clear("clearAll")
      })
      .catch(function(error){
        console.log(error);
      })
  },
  methods: {
  	setting: function() {	// 设置
  		let cookie = this.cookie
  		if (cookie) {
  			this.$router.push("/my/setup_view")
  		}else {
  			this.$router.push("/loginView")
  		}
  	},
  	onUser: function() {	//个人中心
  		let cookie = this.cookie
  		if (cookie) {
  			this.$router.push("/sign_in_user")
  		}else {
  			this.$router.push("/loginView")
  		}
  	},
  	goOrder: function(act) {	//我的订单
  		let cookie = this.cookie
  		if (cookie) {
  			this.$router.push({name:"mall_order" , params:{act:act}})
  		}else {
  			this.$router.push("/loginView")
  		}
  	},
  	tabClick: function(indexs,index) { 
  		let tabBtn = this.tabBtn
  		let name = tabBtn[indexs][index].name
  		if (name == "待付款") {
  			this.goOrder(1)
  		}else if(name == "待收货"){
  			this.goOrder(2)
  		}else if(name == "收藏"){
  			this.$router.push("/collection")
  		}
  	},
  	myBtnClick: function(indexs,index){
  		let myData = this.myData,
  			item = myData.item,
  			name = item[indexs][index].name
  		if (name=="地址管理") {
  			this.$router.push("/address_manage")
  		}else {
  			
  		}
  	}
  }
}
</script>

<style scoped>
	.my{
		background: #f9f9f9;
		overflow-x: hidden;
		margin-bottom: 1rem;
	}
	.topBar{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		padding: 0.2rem 0;
		background: #f55b53;
		color: #fff;
		z-index: 99;
	}
	.topBar-icon{
		font-size: 0.48rem;
		margin-right: 0.44rem;
	}
	.atLogin{
		padding: 0.3rem 0.2rem;
	    font-size: 0.32rem;
	    background: #f55b53;
	    color: #fff;
	    margin-top: 0.87rem;
	}
	.href{
		color: #fff;
	}
	.userImg{
		display: block;
		width: 1.4rem;
		height: 1.4rem;
		border-radius: 50%;
	}
	.nickname{
		line-height: 1.4rem;
		margin-left: 0.2rem;
		font-size: 0.32rem;
	}
	/* 商城订单 */
	.order-btn{
		border-bottom: 1px solid #f3f3f3;
	}
	.van-cell{
		padding: 0.24rem;

	}
	.van-cell-text{
		font-size: 0.3rem;
		line-height: 0.48rem;
	}
	.van-cell-value{
		font-size: 0.26rem;
		line-height: 0.48rem;
		color: #929196;
	}
	.order-icon{
		font-size: 0.3rem;
		padding: 0.1rem;
	}
	.right-icon{
		font-size: 0.24rem;
	}
	/* 按钮表格 */
	.tab-btn{
		position: relative;
		padding: 0.3rem 0.1rem;
		margin-bottom: 0.2rem;
		height: auto;
	}
	.van-hairline--top-bottom::after{
		border-width: 0;
	}
	.tab-btn .van-icon{
		font-size: 0.6rem;
		margin-bottom: 0.1rem;
	}
	.tab-btn span{
		font-size: 0.26rem;
	}

	.myBtn-box{
		margin-bottom: 0.2rem;
	}
	.myBtn-icon{
		width: 0.52rem;
		height: 0.52rem;
		margin: 0 0.1rem;
	}
	.van-icon-info{
	    color: #fff;
	    left: 50%;
	    top: -.5em;
	    font-size: 0.24rem;
	    margin-left: .8em;
	    padding: 0 .3em;
	    text-align: center;
	    min-width: 1.2em;
	    line-height: 1.2;
	    position: absolute;
	    border-radius: .6em;
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	    background-color: #f44;
	    font-family: PingFang SC,Helvetica Neue,Arial,sans-serif;
	 }
	.router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
</style>
