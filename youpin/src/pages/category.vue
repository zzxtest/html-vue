<template>
	<div class="category">
		<van-search placeholder="请输入商品名称" background="#fff" class="searchBox" />
		<div class="content" :style="'height:'+c_Height+'px'">
			<!-- 分类列表 -->
			<div class="cgy_side_nav">
				<ul>
					<li v-for="(item, index) in tabList" :key="index" class="cgy_sn_li" :class="{side_active:index == aIndex}" v-text="item.cat_name" @click="tabNav(index,item.cat_id)"></li>
				</ul>
			</div>
			<div class="cgy_nav_cont">
				<van-cell center="center" v-if="tabList.length != 0">
					<template slot="title">
				      	<span class="van-cell-text fl">{{tabList[aIndex].cat_name}}</span>
				      	<span class="van-cell-value fr">更多</span>
				    </template>
				    <template slot="right-icon">
				      	<van-icon class="right-icon" name="arrow" />
				    </template>
				</van-cell>
				<!-- 分类产品 -->
				<div class="cgy_tg_box">
					<van-row>
					  	<van-col span="8" class="cgy_tg_item" v-for="(item, index) in category" :key="index">
					  		<img :src="item.ad_code">
							<span>{{item.ad_name}}</span>
						</van-col>
					</van-row>
				</div>
				<!-- 品牌推荐 -->
				<div class="cgy_brand_box" v-if="brand.length != 0">
					<van-cell-group class="cgy_theme_brand">
					  	<van-cell center="center">
							<template slot="title">
						      	<span class="van-cell-text fl">品牌推荐</span>
						    </template>
						</van-cell>
					</van-cell-group>
					<van-row>
					  	<van-col span="12" class="cgy_brand_item" v-for="(item, index) in brand" :key="index">
					  		<img :src="item.ad_code">
							<span>{{item.ad_name}}</span>
						</van-col>
					</van-row>
				</div>
				
			</div>
		</div>
		<tab-bar/>
	</div>
</template>

<script>
import {setStore} from '../assets/js/mUtils'
import {baseUrl, API} from '../assets/js/env'
import { Toast } from 'vant'

export default {
  name: 'category',
  data () {
    return {
    	c_Height: 0,
    	aIndex: 0,
    	tabList: [],
    	brand: [],
    	category: []
    }
  },
  beforeMount () {
  	let that = this
    setStore('active', 1)
    // 计算html字体大小
    let size = document.documentElement.clientWidth / 7.5
    // 获取窗口可视区域高度
    let sHeight = window.screen.height
    // 计算剩余高度
    this.c_Height = sHeight - size * 2
    // 分类tabNav数据
    that.$http.get(API.left_category_data)
      .then(function (response) {
      	let data = response.data.data
      	let aIndex = that.aIndex
      	that.tabList = data
      	that.cgyLoad(data[aIndex].cat_id)
      })
      .catch(function(error){
        console.log(error);
      })

      
  },
  methods: {
    tabNav: function (index,id) {
    	this.aIndex = index
    	this.cgyLoad(id)
    	// console.log(this.$refs.data[index].dataset)
    },
   	cgyLoad: function(id){
   		let that = this
   		Toast.loading({
		  mask: true,
		  duration: 0,
		  message: '加载中...'
		});
   		that.$http.get(API.right_category_data, {
		    params: {
		      parent_id: id
		    }
		  })
	      .then(function (response) {
	      	let data = response.data.data
	      	that.brand = data.brand
	      	that.category = data.category
	      	Toast.clear("clearAll")
	      })
	      .catch(function(error){
	        console.log(error);
	      })
   	}
  }
}
</script>

<style scoped>
	.category{
		padding: 1rem 0;
	}
	/* 搜索 */
	.searchBox{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
	}
	.content{
		position: relative;
		padding-left: 25%;
		overflow: hidden;
	}
	/* 分类列表 */
	.cgy_side_nav{
	    position: absolute;
	    left: 0;
	    top: 0;
	    width: 25%;
	    height: 100%;
	    overflow: auto;
	}
	.cgy_sn_li {
	    font-size: 0.28rem;
	    color: #333333;
	    padding: 0.4rem 0;
	    text-align: center;
	    background: #f8fbff;
	    margin-bottom: 0.04rem;
	}
	.side_active {
	    color: #f55b53;
	    border-left: 0.1rem solid #f55b53;
	    background: #fff;
	}
	/* 更多 */
	.cgy_nav_cont{
		width: 100%;
		height: 100%;
		overflow: auto;
	}
	.van-cell{
		padding: 0.24rem;
	}
	.van-cell-text{
		font-size: 0.3rem;
		line-height: 0.48rem;
	}
	.van-cell-value{
		font-size: 0.24rem;
		line-height: 0.48rem;
		color: #929196;
	}
	.right-icon{
		font-size: 0.24rem;
		color: #929196;
	}
	.van-cell:not(:last-child)::after{
		border-bottom-width: 0;
	}
	.van-row{
		padding: 0 0.2rem;
	}
	/* 右侧内容 */
	.cgy_tg_item,.cgy_brand_item{
		padding: 0.1rem
	}
	.cgy_tg_item img,.cgy_brand_item img{
		width: 100%;
	}
	.cgy_tg_item span{
		font-size: 0.26rem;
	    color: #333333;
    	display: block;
    	padding: 0.1rem 0;
	}
	/* 品牌推荐 */
	.van-hairline--top-bottom::after {
	    border-width: 0;
	}
	.cgy_theme_brand{
		margin-top: 0.2rem;
	}
	.cgy_brand_item span{
		display: block;
		width: 100%;
		line-height: 0.6rem;
		font-size: 0.24rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>
