<template>
	<div class="home">
		<div class="home_hd">
      <div class="home_hd_srbox">
        <span class="home_qr_card">
          <img src="http://saler-10073399.image.myqcloud.com/8be2f2519c8e88c649120a75e6997113.png">
        </span>
        <span>扫一扫</span>
      </div>
      <div class="home_hd_search"><van-icon class="home_sr_icon" name="search" />搜索类目、品牌、关键字</div>
      <div class="home_hd_infobox">
        <span class="home_hd_info">
          <img src="http://saler-10073399.image.myqcloud.com/c28c1fe9702acf54d79ceff4255d75f1.png">
        </span>
        <span>消息</span>
      </div>
    </div>
    <div class="banner">
      <van-swipe :autoplay="5000">
        <van-swipe-item class="banner-item" v-for="(item, index) in homeData[0].ad" :key="index">
          <img :src="item.ad_code" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="home_navbtn_box">
      <van-row>
        <van-col span="6" class="home_navbtn_item" v-for="(item, index) in homeData[1].ad" :key="index">
          <img :src="item.ad_code" alt="">
          <span>{{item.ad_name}}</span>
        </van-col>
      </van-row>
    </div>
    <img class="goods_mas_img" v-for="(item, index) in homeData[2].ad" :key="index" :src="item.ad_code" alt="">
    <div class="home_new_act">
      <img class="fl" v-for="(item, index) in homeData[3].ad" :key="index" :src="item.ad_code" alt="">
    </div>
    <tab-bar/>
	</div>

</template>

<script>
import {setStore} from '../assets/js/mUtils'
import {baseUrl, API} from '../assets/js/env'
import { Toast } from 'vant'

export default {
  name: 'home',
  data () {
    return {
      homeData: [{
        ad:[{}]
      },{
        ad:[{}]
      },{
        ad:[{}]
      },{
        ad:[{}]
      },{
        ad:[{}]
      },{
        ad:[{}]
      },{
        ad:[{}]
      },{
        ad:[{}]
      },{
        ad:[{}]
      },{
        ad:[{}]
      }]
    }
  },
  beforeMount () {
    setStore('active', 0)
    this.honeLoad()
  },
  mounted() {

  },
  methods: {
    honeLoad: function() {
      Toast.loading({
        mask: true,
        duration: 0,
        message: '加载中...'
      })
      let that = this
      that.$http.get(API.home_data)
      .then(function (response) {
        let data = response.data.data
        that.homeData = data
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
  .home{
    padding-bottom: 1rem;
  }
  .home_hd {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 0.2rem;
    z-index: 99;
    background: rgba(245, 91, 83,0);
  }
  .home_hd_srbox, .home_hd_infobox {
    width: 12%;
    font-size: 0.24rem;
    color: #fff;
    float: left;
    text-align: center;
  }
  .home_hd_srbox img, .home_hd_infobox img{
    width: 100%;
    height: 100%;
  }
  .home_qr_card, .home_hd_info {
    width: 46%;
    display: block;
    margin: 0 auto;
  }
  .home_hd_search {
    width: 70%;
    line-height: 0.7rem;
    background: rgba(255,255,255,.6);
    float: left;
    border-radius: 0.06rem;
    color: #fff;
    padding: 0 0.1rem;
    margin: 0 0.1rem;
    font-size: 0.28rem;
    text-align: left;
  }
  .home_sr_icon {
    padding-right: 0.1rem;
  }
  .home_hd_infobox {
    float: right;
  }
  .banner-item{
    height: 4rem;
  }
  .banner-item img{
    height: 100%;
  }
  .home_navbtn_box{
    background-color: #fff2e1;
    padding: 0.1rem 0;
  }
  .home_navbtn_item img{
    display: block;
    width: 0.94rem;
    height: 0.94rem;
    margin: 0 auto;
  }
  .home_navbtn_item span{
    display: block;
    color: #f55b53;
    font-size: 0.28rem;
    padding: 0.1rem 0 0.2rem;
  }
  .goods_mas_img{
    display: block;
    width: 100%;
    height: 2.5rem;
  }
  .home_new_act{
    height: 3.4rem;
  }
  .home_new_act img{
    display: block;
    height: 50%;
    width: 54.58%
  }
  .home_new_act img:first-child{
    width: 45.42%;
    height: 100%;
  }
</style>
