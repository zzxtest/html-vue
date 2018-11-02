<template>
	<div class="setup_view">
		<router-link to="/my/setup_help_view">
			<van-cell center="center">
				<template slot="title">
			      	<span class="van-cell-text fl">帮助和介绍</span>
			    </template>
			    <template slot="right-icon">
			      	<van-icon class="right-icon" name="arrow" />
			    </template>
			</van-cell>
		</router-link>
		
		<van-button size="large" @click="logout">退出登录</van-button>
	</div>
</template>

<script>
import {baseUrl, API} from '../../assets/js/env'

export default {
  name: 'setup_view',
  methods: {
  	logout: function() {
      let that = this
      that.$http.post(API.logout)
      .then(function (response) {
        if (response.data.code) {
          that.$router.push("/loginView")
        }else {
          Dialog.alert({
            title: '温馨提示',
            message: response.data.msg
          }).then(() => {
            // on close
          });
        }
      })
      .catch(function(error){
        console.log(error);
      })
    }
  }
}
</script>

<style scoped>
	.setup_view{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #fff;
		z-index: 202;
	}
  	.van-cell{
		padding: 0.24rem;
		border-bottom: 0.4rem #f9f9f9 solid;
	}
	.van-cell-text{
		font-size: 0.3rem;
		line-height: 0.48rem;
	}
	.right-icon{
		font-size: 0.28rem;
		color: #929196;
	}
	.van-button{
		border: none;
		border-bottom: 1px solid #f3f3f3;
		color: #F55B53
	}
</style>
