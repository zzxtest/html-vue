<template>
	<van-tabbar v-model="active" class="tabBar">
	  	<van-tabbar-item v-for="(item, index) in icon" :key="index" :to="item.link" @click="tabActive">
	  		<span v-text="item.text"></span>
		    <template slot="icon" slot-scope="props">
		      <img :src="props.active ? item.active : item.normal" />
          <div class="van-icon-info" v-text="item.info"></div>
		    </template>
	  	</van-tabbar-item>
	</van-tabbar>
</template>

<script>
import {setStore, getStore} from '../assets/js/mUtils'

export default {
  name: 'tabBar',
  data () {
    return {
    	active: 0,
    	icon: [
    		{
        	normal: 'http://advant-10073399.image.myqcloud.com/8c7e69e419feaa6f1d3ff86d17261475.png',
        	active: 'http://advant-10073399.image.myqcloud.com/46206e932ddb2b0094bac252addc4854.png',
        	text: '首页',
        	link: '/',
          info: null
      	}, {
        	normal: 'http://advant-10073399.image.myqcloud.com/c554f5b00d36a42ae95be4ef7300f101.png',
        	active: 'http://advant-10073399.image.myqcloud.com/9e209b1131c90af0f8507b6932411d3e.png',
        	text: '分类',
        	link: '/category',
          info: null
      	}, {
        	normal: 'http://advant-10073399.image.myqcloud.com/6bc820d506e9ba8b621c991a260c030e.png',
        	active: 'http://advant-10073399.image.myqcloud.com/9cc5bced21a180e156beb9bc1ec3d643.png',
        	text: '购物车',
        	link: '/cart',
          info: 5
      	}, {
        	normal: 'http://advant-10073399.image.myqcloud.com/02e7b484e40a7f1bbf300db70a436c1c.png',
        	active: 'http://advant-10073399.image.myqcloud.com/cea13c2981bb7df9dba1e29e68687613.png',
        	text: '我的',
        	link: '/my',
          info: null
      	}]
    }
  },
  mounted () {
  	let active = Number(getStore('active'))
  	this.active = active
  },
  methods: {
    tabActive: function () {
    	let active = this.active
    	setStore('active', active)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	
	.van-tabbar{
		height: 1rem;
	}
	.van-tabbar-item__icon img{
		height: 0.36rem;
	}
	.van-tabbar-item__text span{
		font-size: 0.24rem;
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
	.van-tabbar-item--active{
		color: #F55B53;
	}
</style>
