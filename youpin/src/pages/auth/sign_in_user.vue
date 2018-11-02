<template>
	<div class="sign_in_user">
		<van-cell-group class="mobile-btn">
		  	<van-cell center="center">
				<template slot="title">
			      	<span class="van-cell-text fl">手机号</span>
			      	<span class="van-cell-value fr">{{params.mobile_phone}}</span>
			    </template>
			    <template slot="right-icon">
			      	<van-icon class="right-icon" name="arrow" />
			    </template>
			</van-cell>
		</van-cell-group>
		<van-cell-group class="head-btn">
	  	<van-cell center="center">
				<template slot="title">
	      	<span class="head-text van-cell-text fl">头像</span>
	      	<span class="head-img-box van-cell-value fr">
	      		<van-uploader :after-read="onRead" accept="image/gif, image/jpeg, image/png" multiple>
					    <img :src="user_photo" alt="">
			      </van-uploader>
	      	</span>
		    </template>
		    <template slot="right-icon">
	      	<van-icon class="right-icon" name="arrow" />
		    </template>
			</van-cell>
		</van-cell-group>
		<van-cell-group class="nickNmae-btn" >
	  	<van-cell center="center" @click="nickName">
				<template slot="title">
	      	<span class="van-cell-text fl">昵称</span>
	      	<span class="van-cell-value fr">{{params.alias}}</span>
		    </template>
		    <template slot="right-icon">
	      	<van-icon class="right-icon" name="arrow" />
		    </template>
			</van-cell>
		</van-cell-group>
		<van-cell-group class="sex-btn">
	  	<van-cell center="center" @click="sexShow">
			  <template slot="title">
	      	<span class="van-cell-text fl">性别</span>
	      	<span class="van-cell-value fr">{{sex}}</span>
		    </template>
		    <template slot="right-icon">
	      	<van-icon class="right-icon" name="arrow" />
		    </template>
		  </van-cell>
		</van-cell-group>
		<div class="chage_sex_bg" v-show="sexHidden">
			<div class="chage_sex_box">
				<div class="chage_sex_top">
					<p @click="sexChange(index)" v-for="(item, index) in sexArray" :key="index">{{item.sex}}</p>
				</div>
				<div class="chage_sex_bottom" @click="sexShow">
					取消
				</div>
			</div>	
		</div>
	</div>
</template>

<script>
import {compress} from '../../assets/js/mUtils'
import {baseUrl, API} from '../../assets/js/env'
import qs from 'qs'
import { Dialog } from 'vant'
import { Toast } from 'vant'

export default {
  name: 'sign_in_user',
  data () {
    return {
      params: {},
      sex: "男",
      user_photo: "",
      sexHidden: false,
      sexArray:[{
      	sex: "男",
      	id: "1"
      },{
      	sex: "女",
      	id: "0"
      }]
    }
  },
  mounted () {
  	let that = this
  	that.$http.get(API.baseinfo)
      .then(function (response) {
      	let data = response.data.data
      	that.params = data
      	that.user_photo = data.user_photo
      	if(data.sex == "0"){
  	  		that.sex = "女"
  	  	}else {
  	  		that.sex = "男"
  	  	}
      })
      .catch(function(error){
        console.log(error);
      })
  },
  methods: {
  	// 更换头像
  	onRead(file) {
  		let that = this
    	that.user_photo = file.content
      let img = new Image()
      img.src = file.content
      //判断图片是否大于100K,是就直接上传，反之压缩图片 
      if (file.content.length <= (100 * 1024)) {
      	that.bupload_single(file.content)
      }else {
        img.onload = function () {
          let data = compress(img)
          that.bupload_single(data)
        }
      }
    },
    // 上传云
    bupload_single: function(image){
    	Toast.loading({
  		  mask: true,
  		  duration: 0,
  		  message: '请稍后...'
  		});
    	let that = this
    	that.$http.post(API.bupload_single, qs.stringify({
    		image:image,
    		bucket:"users"
    	}))
      .then(function (response) {
        let photo = response.data.data.path
        that.user_pfoto(photo)
      })
      .catch(function(error){
        console.log(error)
      })
    },
    // 上传图片
    user_pfoto: function(photo) {
    	let that = this
    	that.$http.post(API.user_modifyinfo, qs.stringify({
    		user_photo:photo
    	}))
      .then(function (response) {
      	Toast.clear("clearAll")
        Dialog.alert({
          title: '温馨提示',
          message: response.data.msg
        }).then(() => {
          // on close
        });
      })
      .catch(function(error){
        console.log(error);
      })
    },
    // 修改昵称
    nickName: function() {
    	let alias = this.params.alias
    	this.$router.push({name:"nickName_change", params:{alias:alias}})
    },
    // 修改性别
    sexShow: function() {
    	let sexHidden = this.sexHidden
    	if(sexHidden){
    		this.sexHidden = false
    	}else {
    		this.sexHidden = true
    	}
    },
    sexChange: function(index){
    	let that = this
    	let sex = this.sexArray[index].id
    	that.$http.post(API.user_modifyinfo, qs.stringify({
    		sex:sex
    	}))
      .then(function (response) {
      	that.sex = that.sexArray[index].sex
        Dialog.alert({
          title: '温馨提示',
          message: response.data.msg
        }).then(() => {
          that.sexHidden = false
        });
      })
      .catch(function(error){
        console.log(error);
      })
    },
  }
}
</script>

<style scoped>
  .sign_in_user{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fafafa;
    z-index: 202;
  }
  .mobile-btn{
  	padding: 0.2rem 0;
  	margin: 0.2rem 0;
  }
  .head-btn,.nickNmae-btn,.sex-btn{
  	padding: 0.2rem 0;
  	border-bottom: 1px solid #f3f3f3;
  }
  .sex-btn,.van-hairline--top-bottom::after{
  	border-width: 0;
  }
  .van-cell-text{
  	font-size: 0.3rem;
  	color: #8d8d8f;
  }
  .van-cell-value{
  	font-size: 0.28rem;
  	color: #8d8d8f;
  	margin-right: 0.2rem;
  	line-height: 0.3rem;
  }
  .right-icon{
  	color: #8d8d8f;
  	font-size: 0.3rem;
  }
  .head-text{
  	line-height: 1rem;
  }
  .head-img-box{
  	width: 1rem;
  	height: 1rem;
  	border-radius: 50%;
  	overflow: hidden;
  }
  .head-img-box img{
  	width: 100%;
  	height: 100%;
  }
  .chage_sex_bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
  }
  .chage_sex_box {
    width: 90%;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    color: #017bff;
    text-align: center;
  }
  .chage_sex_top {
    background-color: #fff;
    width: 100%;
    border-radius: 0.2rem;
  }
  .chage_sex_top p {
    line-height: 0.88rem;
    font-size: 0.36rem;
  }
  .chage_sex_top p:first-child {
    border-bottom: 1px #ededef solid;
  }
  .chage_sex_bottom {
    width: 100%;
    line-height: 0.88rem;
    background-color: #fff;
    margin: 0.2rem 0;
    border-radius: 0.2rem;
    font-size: 0.36rem;
  }
</style>
