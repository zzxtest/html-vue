<template>
	<div class="order_detail">
		<div class="order_state">
			{{detailData.status_str}}
		</div>
		<div class="border_img"></div>
		<div class="user_info">
			<div class="user_name cf">
				<span class="fl">{{detailData.address.consignee}}</span>
				<span class="fr">{{detailData.address.mobile}}</span>
			</div>
			<div class="user_address">{{detailData.address.str_address}}</div>
		</div>
		<div class="border_img"></div>
		<div class="order_source cf">
			<span class="source fl">{{detailData.store_name}}</span>
			<a :href="'tel:'+detailData.service_phone" class="service fr"><van-icon class="phone-icon" name="phone"/>客服</a>
		</div>
		<div class="order-prod">
	  		<div class="prod-item" v-for="(item, index) in detailData.goods" :key="index">
	  			<img class="prod-img" :src="item.goods_thumb" alt="">
	  			<div class="prod-info">
	  				<div class="goods_name">{{item.goods_name}}</div>
	  				<div class="info_btm cf">
	  					<span class="fl">￥{{item.price}}</span>
	  					<span class="fr">x{{item.shop_number}}</span>
	  				</div>
	  			</div>
	  		</div>
	  	</div>
	  	<div class="order-info">
	  		<div class="cf">
	  			<span class="fl">支付方式</span>
	  			<span class="fr">{{detailData.pay_name}}</span>
	  		</div>
	  		<div class="cf">
	  			<span class="fl">配送方式</span>
	  			<span class="fr">{{detailData.shipping_name}}</span>
	  		</div>
	  	</div>
	  	<div class="order-info">
	  		<div class="cf">
	  			<span class="fl">订单编号</span>
	  			<span class="fr">{{detailData.order_sn}}</span>
	  		</div>
	  		<div class="cf">
	  			<span class="fl">订单类型</span>
	  			<span class="fr">{{detailData.order_type}}</span>
	  		</div>
	  		<div class="cf">
	  			<span class="fl">下单时间</span>
	  			<span class="fr">{{detailData.add_time}}</span>
	  		</div>
	  	</div>
	  	<div class="order-info">
	  		<div class="cf">
	  			<span class="fl">商品总额</span>
	  			<span class="fr">{{detailData.goods_amount}}</span>
	  		</div>
	  		<div class="cf">
	  			<span class="fl">优惠金额</span>
	  			<span class="fr">{{detailData.discount}}</span>
	  		</div>
	  		<div class="cf">
	  			<span class="fl">运费</span>
	  			<span class="fr">{{detailData.shipping_fee}}</span>
	  		</div>
	  		<div class="cf">
	  			<span class="fl">实付金额</span>
	  			<span class="fr">{{detailData.order_amount}}</span>
	  		</div>
	  	</div>
	  	<div class="detail_btn-box cf">
	  		<div class="cf fr">
	  			<van-button class="detail_btn fl" v-for="(item,index) in detailData.btn_type" :key="index">{{item.btn_name}}</van-button>
	  		</div>
	  	</div>
	</div>
	
</template>

<script>
import {baseUrl, API} from '../../../assets/js/env'
import { Toast } from 'vant'
import { Dialog } from 'vant'

export default {
  name: 'order_detail',
  data () {
    return {
      detailData:{
      	address:{}
      }
    }
  },
  mounted () {
  	let order_sn = this.$route.params.order_sn
  	this.detailLoad(order_sn)
  },
  methods: {
  	detailLoad: function(order_sn){
  		Toast.loading({
		  mask: true,
		  duration: 0,
		  message: '加载中...'
		})
  		let that = this
  		that.$http.get(API.order_detail,{
  			params:{
  				order_sn: order_sn
  			}
  		})
	      .then(function (response) {
	        let data = response.data.data
	        that.detailData = data
	        Toast.clear("clearAll")
	      })
	      .catch(function(error){
	        console.log(error)
	      })
  	}
  }
}
</script>

<style scoped>
	.order_detail{
		padding-bottom: 1rem;
		background-color: #FAFAFA;
		text-align: left;
	}
	.order_state{
	    height: 1.6rem;
	    line-height: 1.6rem;
		padding: 0 0.15rem;
		color: #fff;
		background: url("http://saler-10073399.image.myqcloud.com/d3a0fa485c17e1e83f0bdcefd323491b.png") no-repeat;
		background-size: 100% 100%;
		font-size: 0.35rem;
	}
	.border_img{
	    width: 100%;
	    height: 0.08rem;
	    background: url("http://saler-10073399.image.myqcloud.com/95013cfbc77e6b8568c726dc92f80442.png") repeat-x;
	    background-size: 1rem 100%;
	}
	.user_info{
	    padding: 0.15rem;
    	background-color: #fff;
	}
	.user_name{
		font-size: 0.28rem;
		color: #333333;
		line-height: 0.5rem;
	}
	.user_address{
		color: #8E8D92;
		font-size: 0.28rem;
		line-height: 0.5rem;
	}
	.order_source{
	    margin-top: 0.3rem;
	    padding: 0.15rem 0.3rem;
	    border-bottom: 0.5px #f7f7f7 solid;
	    background-color: #fff;
	}
	.source{
		font-size: 0.28rem;
		line-height: 0.51rem;
	}
	.service {
	    padding: 0 0.15rem;
	    border: 0.01rem #8E8D92 solid;
	    border-radius: 0.1rem;
	    color: #333;
	    font-size: 0.28rem;
	    line-height: 0.5rem;
	}
	.phone-icon{
		margin-right: 0.1rem;
	}
	.order-prod{
		background-color: #fff;
	}
	.prod-item{
		padding: 0.15rem 0.3rem;
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
	.info_btm span:first-child{
		color: #FF5053
	}
	.order-info{
		margin-top: 0.3rem;
		padding: 0 0.3rem;
		background-color: #fff;
	}
	.order-info span{
		 font-size: 0.32rem;
		 line-height: 0.8rem;
	}
	.order-info span:last-child{
		font-size: 0.3rem;
    	color: #8E8D92;
	}
	.detail_btn-box{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #fff;
		padding: 0.15rem 0;
		border-top: 1px #f1f1f1 solid;
	}
	.detail_btn{
		height: 0.7rem;
		line-height: 0.7rem; 
		border-color: #929292;
	    margin-right: 0.16rem;
	    font-size: 0.26rem;
	}
	.detail_btn:last-child{
		border: 1px #FF5053 solid;
	    background-color: #FF5053;
	    color: #FFFFFF;
	}
</style>
