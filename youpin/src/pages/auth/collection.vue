<template>
  <div class="collection">
  	<van-list
	  v-model="loading"
	  :finished="finished"
	  :immediate-check="check"
	  @load="onLoad"
	>
	  	<div class="prod-item" v-for="(item, index) in collData" :key="index">
	      <div class="img-box">
	      	<img class="prod-img" :src="item.goods_thumb" alt="">
	      	<span class="prod-tip" v-show="item.warn">{{item.warn}}</span>
	      </div>
	      <div class="prod-info">
	        <div class="info-top cf">
	          <img :src="item.label_img" v-show="item.label_img">
	          {{item.goods_name}}
	        </div>
	        <p class="prod-price">
	        	<span class="price">￥{{item.price}}</span>
	        	<van-icon class="del fr" name="delete" @click="ondel(item.goods_id)" />
	        </p>
	      </div>
	    </div>
	</van-list>
  	
  </div>
</template>

<script>
import {baseUrl, API} from '../../assets/js/env'
import { Dialog } from 'vant'

export default {
  name: 'collection',
  data () {
    return {
      collData: [],
      page: 1,
      loading: false,
      check: false,
      finished: false
    }
  },
  mounted () {
  	this.collectLoad()
  },
  methods :{
  	// 加载收藏数据
    collectLoad: function(){
  		let that = this
  		let page = that.page
  		that.$http.get(API.collect_index,{
  			params:{
  				page: page
  			}
  		})
	      .then(function (response) {
	        let data = response.data.data
	        that.collData = that.collData.concat(data)
	        page++
	        that.page = page
	        if (data.length==0) {
	        	that.finished = true
	        }else {
	        	that.finished = false
	        }
	      })
	      .catch(function(error){
	        console.log(error)
	      })
  	},
  	// 上拉加载
  	onLoad() {
  	  this.finished = true
      setTimeout(() => {
        this.collectLoad()
        this.loading = false;
      }, 500);
    },
    // 删除
    ondel: function(id) {
    	let that = this
  		that.$http.get(API.collect_cancel,{
  			params:{
  				goods_id: id
  			}
  		})
	      .then(function (response) {
	        let data = response.data.data
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
  }
}
</script>

<style scoped>
	.prod-item{
		display: flex;
		padding: 0.3rem;
		border-bottom: 1px #f5f5f5 solid;
		text-align: left;
	}
	.img-box{
		flex: 1;
		width: 1.4rem;
		height: 1.7rem;
		position: relative;
	}
	.prod-img{
		width: 100%;
		height: 100%;
	}
	.prod-tip{
	    position: absolute;
	    bottom: 0;
	    left: 0;
	    right: 0;
	    height: 0.4rem;
	    line-height: 0.4rem;
	    text-align: center;
	    color: #fff;
	    background-color: rgba(0,0,0,.4);
	}
	.prod-info{
	    flex: 3;
	    padding-left: 0.2rem;
	}
	.info-top{
		margin-top: 0.15rem;
		font-size: 0.3rem;
		overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-box-orient: vertical;
	    -webkit-line-clamp: 2;
	    line-height: 0.4rem;
	    min-height: 0.8rem;
	}
	.info-top img{
	    height: 0.28rem;
	    width: auto;
	}
	.prod-price {
	    margin-top: 0.4rem;
    	font-size: 0.3rem;
	}
	.price{
		color: #f44f46;
	}
	
</style>
