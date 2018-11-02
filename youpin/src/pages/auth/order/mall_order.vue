<template>
	<div class="mall_order">
	  	<div class="navTab">
			<ul >
				<li class="navTab-item" :class="active == index?'active':''" v-for="(item,index) in orderNav" :key="index" @click="onTab(index)">{{item.name}}</li>
			</ul>
	  	</div>
	  	<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
	  		<van-list
			  v-model="loading"
			  :finished="finished"
			  :immediate-check="check"
			  @load="onLoad"
			>
			  <van-cell class="order-item" v-for="(items,indexs) in order" :key="indexs" >
			  	<div class="order-top" @click="goDetail(items.order_sn)">
			  		<span class="order_sn">订单编号：{{items.order_sn}}</span>
			  		<span class="status_str fr">{{items.status_str}}</span>
			  	</div>
			  	<div class="order-prod" @click="goDetail(items.order_sn)">
			  		<div class="prod-item" v-for="(item,index) in items.order_goods" :key="index">
			  			<img class="prod-img" :src="item.goods_thumb" alt="">
			  			<div class="prod-info">
			  				<div class="goods_name">{{item.goods_name}}</div>
			  				<div class="info_btm cf">
			  					<span class="fl">￥{{item.price}}</span>
			  					<span class="fr">x{{item.goods_number}}</span>
			  				</div>
			  			</div>
			  		</div>
			  	</div>
			  	<div class="order-bottom cf">
			  		<span class="order_amount fl">合计：<em>￥{{items.order_amount}}</em></span>
			  		<div class="order_btn-box fr">
			  			<div class="fl" v-for="(item,index) in items.btn_type" :key="index">
			  				<van-button class="order_btn" tag="a" :href="'tel:'+item.url" v-if="item.btn_name=='咨询客服'">咨询客服</van-button>
				  			<van-button class="order_btn" @click="btnClick(indexs,index)" v-else>{{item.btn_name}}</van-button>
				  			
			  			</div>
			  		</div>
			  	</div>
			  </van-cell>
			  <div class="end-list" v-show="end">没有更多了~</div>
			</van-list>
		</van-pull-refresh>
	</div>
</template>

<script>
import {baseUrl, API} from '../../../assets/js/env'
import { Dialog } from 'vant'
import { Toast } from 'vant'

export default {
  name: 'mall_order',
  data () {
    return {
      isLoading: false,
      loading: false,
      finished: false,
      check: false,
      active: 0,
      end: false,
      orderNav: [{
      	name: "全部",
      	type: "0"
      },{
      	name: "待付款",
      	type: "1"
      },{
      	name: "待收货",
      	type: "3"
      },{
      	name: "已完成",
      	type: "5"
      }],
      order: [],
      page: 1
    }
  },
  mounted () {
  	this.active = this.$route.params.act
  	let active = this.active
  	this.orderLoad(active)
  },

  methods: {
  	// 订单列表
  	orderLoad: function(index){
  		Toast.loading({
		  mask: true,
		  duration: 0,
		  message: '加载中...'
		});
  		let that = this
  		let orderNav = that.orderNav
  		let type = orderNav[index].type
  		let page = that.page
  		let order = that.order
  		that.loading = false
		that.$http.get(API.order_index,{
			params:{
				type: type,
				page: page
			}
		})
		.then(function (response) {
			let data = response.data.data
			that.order = order.concat(data)
			page++
			if (that.page == page){
				return
			}
			if (data.length == 0) {
				that.finished = true
				that.end = true
			}else {
				that.finished = false
				that.end = false
				that.page = page
			}
			Toast.clear("clearAll")
		})
		.catch(function(error){
			console.log(error)
		})
  	},
  	// 切换类型
  	onTab: function(index){
  		console.log(index)
  		this.page = 1
  		this.order = []
  		this.active = index
  		this.orderLoad(index)
  	},
  	// 下拉刷新
  	onRefresh() {
  		let active = this.active
  		this.page = 1
  		this.order = []
  		this.loading = false
  		this.finished = false
  		this.orderLoad(active)
      	setTimeout(() => {
	        this.isLoading = false
      	}, 500);
    },
    // 加载更多
    onLoad() {
    	let that = this
    	that.finished = true
    	setTimeout(() => {
	        let active = that.active
			that.orderLoad(active)
		}, 1000);
    },
    // 进入详情
    goDetail: function(order_sn) {
    	this.$router.push({name:"order_detail", params:{order_sn:order_sn}})
    },
    // 列表按钮事件
    btnClick: function(indexs,index) {
    	let order = this.order
    	let btn_name = order[indexs].btn_type[index].btn_name
    	let order_sn = order[indexs].order_sn
    	if(btn_name == "删除订单"){
    		this.delOrder(order_sn)
    	}else if(btn_name == "再次购买"){
    		this.redoOrder(order_sn)
    	}else if(btn_name == "去评价"){
    		console.log('去评价')
    	}else if(btn_name == "咨询客服"){
    		console.log('咨询客服')
    	}


    },
    // 删除订单
    delOrder: function(order_sn) {
    	let that =this
    	that.$http.get(API.order_delete,{
  			params:{
  				order_sn: order_sn
  			}
  		})
	      .then(function (response) {
	        Dialog.alert({
	          title: '温馨提示',
	          message: "删除成功"
	        }).then(() => {
	        	location.reload()
	        });
	      })
	      .catch(function(error){
	        console.log(error)
	      })
    },
    // 再次购买
    redoOrder: function(order_sn) {
    	let that =this
    	that.$http.get(API.order_redo,{
  			params:{
  				order_sn: order_sn
  			}
  		})
	      .then(function (response) {
	        Dialog.alert({
	          title: '温馨提示',
	          message: "再次购买成功"
	        }).then(() => {
	        	that.$router.push("/cart")
	        });
	      })
	      .catch(function(error){
	        console.log(error)
	      })
    },

  }
}
</script>

<style scoped>
	.mall_order{
		padding-top: 0.8rem;
	}
	.van-cell:not(:last-child)::after{
		border-bottom-width: 0;
	}
	.navTab{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 999;
		background-color: #fff;
	}
	.navTab ul{
		display: flex;
	}
	.navTab-item{
		flex: 1;
		font-size: 0.3rem;
		line-height: 0.8rem;
	}
	.active{
		border-bottom: 2px #f5524a solid;
	}
	.order-item{
		font-size: 0.4rem;
		padding: 0;
		border-bottom: 0.1rem #F3F3F3 solid;
	}
	.order-top{
		font-size: 0.28rem;
		padding: 0.1rem 0.3rem;
		line-height: 0.6rem;
	}
	.order-prod{
		background-color: #f9f9f9
	}
	.prod-item{
		padding: 0.1rem 0.3rem;
		display: flex;
		border-bottom: 0.06rem #fff solid;
	}
	.prod-item:last-child{
		border-bottom: none;
	}
	.prod-img{
		width: 2.1rem;
		height: 1.9rem;
		flex: 2;
	}
	.prod-info{
		padding-left: 0.24rem;
		flex: 5;
	}
	.goods_name{
		line-height: 0.4rem;
		font-size: 0.3rem;
	    min-height: 0.8rem;
	    font-weight: normal;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-box-orient: vertical;
	    -webkit-line-clamp: 2;
	}
	.info_btm{
		font-size: 0.24rem;
		margin-top: 0.8rem;
	}
	.order-bottom{
		padding: 0.2rem 0.3rem;
		font-size: 0.32rem;
	}
	.order_amount{
		line-height: 0.7rem;
	}
	.order_amount em{
		color: #FF5053
	}
	.order_btn{
		min-width: 1.68rem;
		height: 0.7rem;
		line-height: 0.7rem;
	    border: 1px #666666 solid;
	    margin-right: 0.16rem;
	    font-size: 0.26rem;
	    color: #666666;
	}
	.order_btn-box div:last-child .order_btn{
		margin-right: 0;
	    border: 1px #FF5053 solid;
	    background-color: #FF5053;
	    color: #FFFFFF;
	}
	.end-list{
		font-size: 0.26rem;
		color: #999;
		padding: 0.2rem 0;
	}
</style>
