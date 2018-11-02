<template>
  <div class="address_manage">
    <div class="address-item" v-for="(item, index) in address" :key="index">
    	<p class="user-box">
    		<span>{{item.consignee}}</span>
    		<span>{{item.mobile}}</span>
    	</p>
    	<p class="address-box">{{item.str_address}}</p>
    	<div class="address-edit-box">
    		<div class="address-defauit cf" @click="defauitClick(index)">
    			<van-icon class="defauit-icon fl" :class="item.is_default? 'defauit' : ''" :name="item.is_default? 'passed' : 'check'" />
    			<span class="fl">默认地址</span>
    		</div>
    		<div class="edit-btn-box">
    			<a @click="delAddress(index)">删除</a>
    			<a @click="editAddress(index)">编辑</a>
    		</div>
    	</div>
    </div>
    <van-button class="add-address" size="large">添加其他收货地址</van-button>
  </div>
</template>

<script>
import {baseUrl, API} from '../../assets/js/env'
import { Dialog } from 'vant'
import { Toast } from 'vant'

export default {
  name: 'address_manage',
  data () {
    return {
      address: []
    }
  },
  beforeMount () {
  	this.addressLoad()
  },
  methods :{
    addressLoad: function() {	//地址列表
    	Toast.loading({
		  mask: true,
		  duration: 0,
		  message: '加载中...'
		});
    	let that = this
    	that.$http.get(API.address_index)
	      .then(function (response) {
	      	let data = response.data.data
	      	that.address = data
	      	Toast.clear("clearAll")
	      })
	      .catch(function(error){
	        console.log(error);
	      })
    },
    defauitClick: function(index) {	//默认地址
    	Toast.loading({
		  mask: true,
		  duration: 0,
		  message: '请稍后...'
		});
    	let that = this
    	let address = that.address
    	let address_id = address[index].address_id
    	that.$http.get(API.address_set_default,{
    		params:{
    			address_id: address_id
    		}
    	})
	      .then(function (response) {
	      	let data = response.data.data
	      	for (let i = 0; i<address.length; i++){
	      		address[i].is_default = 0
	      	}
	      	address[index].is_default = 1
	      	that.address = address
	      	Toast.clear("clearAll")
	      })
	      .catch(function(error){
	        console.log(error);
	      })
    },
    delAddress: function(index) {	//删除地址
    	Dialog.confirm({
		  title: '温馨提示',
		  message: '是否确认删除当前收货地址'
		}).then(() => {
		  // on confirm
		}).catch(() => {
		  // on cancel
		});
    },
    editAddress: function(index) {	//编辑地址
    	console.log(index)
    },
  }
}
</script>

<style scoped>
	.address_manage{
		background: #FAFAFA;
		padding-bottom: 1rem;
	}
	.address-item{
		background: #fff;
		padding: 0.2rem;
		margin-bottom: 0.2rem;
		text-align: left;
	}
	.user-box{
		font-size: 0.3rem;
    	color: #3B3B3B;
	}
	.user-box span{
		margin-right: 0.2rem;
	}
	.address-box{
		color: #919193;
	    font-size: 0.24rem;
	    padding: 0.2rem 0;
	    line-height: 0.3rem;
	}
	.address-edit-box{
		display: flex;
	}
	.address-defauit{
		flex: 1;
	    font-size: 0.24rem;
    	color: #919193;
	}
	.address-defauit span{
		line-height: 0.51rem;
	}
	.defauit-icon{
		font-size: 0.36rem;
		margin-right: 0.1rem;
		line-height: 0.51rem;
	}
	.defauit{
		color: #F55B53;
	}
	.edit-btn-box{
		flex: 1
	}
	.edit-btn-box a{
		float: right;
	    border: 1px solid #ccc;
	    border-radius: 0.1rem;
        color: #8F8F94;
	    width: 1rem;
	    height: 0.5rem;
	    text-align: center;
	    line-height: 0.5rem;
	    margin-right: 0.2rem;
	}
	.edit-btn-box a:first-child{
		margin-right: 0;
	}
	.add-address{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: #F55B53;
		color: #fff;
		font-size: 0.3rem;
		border-radius: 0;
		height: 1rem;
		line-height: 1rem;
	}
</style>
