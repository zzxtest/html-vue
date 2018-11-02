<template>
  <div class="loginView">
    <div class="logo">
      <img src="http://saler-10073399.image.myqcloud.com/fa66754db7728133b4f4c8b48b79331b.png" alt="">
    </div>
    <div class="login-box">
      <div class="login user-box">
        <span>账号</span><input type="number" name="" value="" placeholder="手机号" v-model="user">
        <van-icon class="clear" name="clear" v-show="user" @click="clearUser" />
      </div>
      <div class="login pwd-box">
        <span>密码</span><input type="password" name="" value="" placeholder="登录密码" v-model="pwd">
      </div>
      <van-button class="loginBtn login-btn" @click="login" v-if="user&&pwd">登录</van-button>
      <van-button disabled class="loginBtn" v-else>登录</van-button>
      
      <div class="web_link_box">
        <router-link to="/loginView/register" class="href">快速注册</router-link>
        <router-link to="/loginView/pw_back" class="href">找回密码</router-link>
      </div>
    </div>
    <transition name="router-slid" mode="out-in">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import md5 from '../../assets/js/md5'
import {baseUrl, API} from '../../assets/js/env'
import { Dialog } from 'vant'
import qs from 'qs'

export default {
  name: 'loginView',
  data () {
    return {
      user: '',
      pwd: ''
    }
  },
  methods :{
    login: function() {
      let that = this
      let user = that.user,
          pwd = md5(that.pwd)
      that.$http.post(API.login, qs.stringify({
        user: user,
        passwd: pwd
      }))
      .then(function (response) {
        if (response.data.code) {
          that.$router.push('/my')
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
    },
    clearUser: function() {
      this.user = ''
    }
  }
}
</script>

<style scoped>
  .logo{
    padding-top: 0.9rem;
  }
  .logo img{
    display: block;
    margin: 0.4rem auto;
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 50%;
  }
  .login{
    display: flex;
    padding: 0.1rem 0;
    line-height: 0.8rem;
    font-size: 0.28rem;
    border-bottom: 1px solid #f3f3f3;
    position: relative;
  }
  .login span{
    flex: 2;
  }
  .login input{
    flex: 7;
    padding: 0 0.2rem;
  }
  .clear{
    color: #999;
    font-size: 0.34rem;
    position: absolute;
    right: 0.4rem;
    top: 50%;
    transform: translateY(-50%)
  }
  .user-box{
    border-top: 1px solid #f3f3f3;
  }
  .loginBtn{
    width: 90%;
    margin: 0.5rem auto;
    height: 1rem;
    line-height: 1rem;
    font-size: 0.3rem;
  }
  .login-btn{
    background-color: #f55b53;
    border: #f55b53;
    color: #fff;
  }
  .web_link_box{
    padding: 0.2rem;
    display: flex;
  }
  .href{
    flex: 1;
    font-size: 0.24rem;
    color: #000;
  }
  .router-slid-enter-active, .router-slid-leave-active {
      transition: all .4s;
  }
  .router-slid-enter, .router-slid-leave-active {
      transform: translate3d(2rem, 0, 0);
      opacity: 0;
  }
</style>
