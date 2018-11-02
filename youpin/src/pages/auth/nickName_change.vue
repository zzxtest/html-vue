<template>
	<div class="nickName_change">
		<div class="nickName-box cf">
			<span class="label fl">用户昵称</span>
			<input class="fl" type="text" placeholder="请输入用户昵称" v-model="alias">
		</div>
		<van-button class="save-btn" type="primary" @click="save">保存</van-button>
	</div>
</template>

<script>
import {baseUrl, API} from '../../assets/js/env'
import { Dialog } from 'vant'

export default {
  name: 'nickName_change',
  data () {
    return {
      alias: ""
    }
  },
  mounted () {
  	this.alias = this.$route.params.alias
  },
  methods: {
  	// 保存
  	save: function (){
  		let that = this
    	that.$http.get(API.user_modifyinfo, {
      		params: {
      			alias:that.alias
      		}
      	})
	      .then(function (response) {
	        Dialog.alert({
	          title: '温馨提示',
	          message: response.data.msg
	        }).then(() => {
	          that.$router.go(-1)
	        });
	      })
	      .catch(function(error){
	        console.log(error);
	      })
  	}
  }
}
</script>

<style scoped>
	.nickName_change{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #FFF;
		z-index: 203;
	}
	.nickName-box{
		padding: 0.2rem 0.4rem;
		text-align: left;
		border-bottom: .5px #f4f4f4 solid;
		font-size: 0.32rem;
		line-height: 0.5rem
	}
	.nickName-box input{
		padding-left: 0.4rem;
	}
	.save-btn{
		width: 90%;
	    background-color: #dd514c;
    	border-color: #dd514c;
    	height: 0.8rem;
    	line-height: 0.8rem;
    	font-size: 0.3rem;
    	color: #fff;
    	margin: 1rem auto;
	}
	
</style>
