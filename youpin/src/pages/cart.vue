<template>
	<div class="cart">
    <div class="tabBtn-box">
      <ul class="cf">
        <li :class="c_active? 'active': ''" @click="tabBtn">购物车{{cartData.cart_number}}</li>
        <li :class="c_active? '': 'active'" @click="tabBtn">采购清单{{cartData.wscart_number}}</li>
      </ul>
      <a class="edit-btn" @click="onEdit">{{edit? "编辑":"完成"}}</a>
    </div>
    <div class="cart-cont">
      <div class="cart-item" v-for="(items, indexs) in cartData.cart" :key="indexs">
        <div class="store">
          <van-icon :name="items.is_checked? 'checked':'check'" @click="onCheckStore(indexs)" />{{items.store_name}}
        </div>
        <div class="prod-list" v-for="(item, index) in items.goods" :key="index">
          <div class="prod-item">
            <van-icon class="checkbox-icon" :name="Number(item.is_checked)? 'checked':'check'" @click="onCheck(indexs,index)"/>
            <div class="prod-cont">
              <img class="prod-img" :src="item.goods_thumb" alt="">
              <div class="prod-info">
                <div class="info-top">
                  <img :src="item.label_img" v-show="item.label_img!=''">
                  <span class="prod-name">{{item.goods_name}}</span>
                </div>
                <p class="prod-spec">{{item.goods_spec}}</p>
                <div class="info-bottom">
                  <span class="price">￥{{item.price}}</span>
                  <van-stepper class="stepper"
                    v-model="item.cart_number"
                    integer
                    :min="1"
                    :max="item.max_num"
                    :step="1"
                    :default-value="item.cart_number"
                    @plus.once="onChange(item.rec_id,item.cart_number)"
                    @minus.once="onChange(item.rec_id,item.cart_number)"
                    @change="onChange(item.rec_id,item.cart_number)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="empty-box" v-if="cartData.cart.length==0">
        <img class="empty-img" src="http://saler-10073399.image.myqcloud.com/34ecb115a6c41fd5573cb257f86e7fcf.png" alt="">
        <p>暂无商品</p>
      </div>
    </div>
    <div class="priceAll-box" v-if="edit">
      <van-icon class="checkbox-icon" :name="checkAll? 'checked':'check'" @click="onCheckAll" /><span class="price-all">￥{{oprice}}</span>
      <van-button type="primary" class="cart-btn">结算({{numAll>99? "99+":numAll}})</van-button>
    </div>
    <div class="priceAll-box" v-else>
      <van-icon class="checkbox-icon" :name="checkAll? 'checked':'check'" @click="onCheckAll" /><span class="price-all"></span>
      <van-button type="primary" class="cart-del" @click="onDelcCart">删除</van-button>
      <van-button type="primary" class="cart-collect" @click="onCollect">移入收藏</van-button>
    </div>
    
		<tab-bar/>
	</div>
</template>

<script>
import {setStore} from '../assets/js/mUtils'
import {baseUrl, API} from '../assets/js/env'
import { Dialog } from 'vant'
export default {
  name: 'cart',
  data () {
    return {
      edit: true,
      c_active: true,
      checkAll: 1,
      cartData: {
        cart: [],
        cart_number: 0,
        wscart_number: 0
      },
      numAll: 0,
      oprice: 0,
    }
  },
  beforeMount () {
    setStore('active', 2)
    this.cart_index()
  },
  methods: {
    tabBtn: function() {
      let c_active = this.c_active
      if (c_active) {
        this.c_active = false
        this.wscart_index()
      }else {
        this.c_active = true
        this.cart_index()
      }
      
    },
    // 购物车
    cart_index: function() {
      let that = this
      that.$http.get(API.cart_index_v)
      .then(function (response) {
        let data = response.data.data
        that.cartData = data
        that.numAll = data.cart_number
        that.countAll(data)
        that.isChooseAll()
      })
      .catch(function(error){
        console.log(error);
      })
    },
    // 采购清单
    wscart_index: function() {
      let that = this
      that.$http.get(API.wscart_index)
      .then(function (response) {
        let data = response.data.data
        that.cartData = data
        that.numAll = data.wscart_number
        that.countAll(data)
        that.isChooseAll()
      })
      .catch(function(error){
        console.log(error);
      })
    },
    // 改变数量
    onChange: function(id,number) {
      let that = this
      let c_active = that.c_active
      that.$http.get(API.cart_update,{
        params:{
          rec_id: id,
          goods_number: number
        }
      })
      .then(function (response) {
        if(c_active){
          that.cart_index()
        }else {
          that.wscart_index()
        }
      })
      .catch(function(error){
        console.log(error);
      })
    },
    // 选择全部
    onCheckAll: function() {
      let that= this
      let checkAll = that.checkAll
      if (checkAll) {
        checkAll =0
      }else {
        checkAll =1
      }
      let cartData = that.cartData
      let rec_id = ''
      for(let i = 0; i<cartData.cart.length; i++){
        let goods = cartData.cart[i].goods
        for(let j =0; j<goods.length; j++){
            rec_id += goods[j].rec_id + ","
        }
      }
      that.checkHttp(rec_id,checkAll)
      
    },
    // 仓库选择
    onCheckStore: function(indexs) {
      let that= this
      let cartData = that.cartData
      let goods = cartData.cart[indexs].goods
      let checked = cartData.cart[indexs].is_checked
      if (checked) {
        checked =0
      }else {
        checked =1
      }
      let rec_id = ''
      for(let i = 0; i<goods.length; i++){
        rec_id += goods[i].rec_id + ","

      }
      that.checkHttp(rec_id,checked)
    },
    // 单项
    onCheck: function(indexs,index) {
      let that= this
      let cartData = that.cartData
      let rec_id = cartData.cart[indexs].goods[index].rec_id
      let checked = Number(cartData.cart[indexs].goods[index].is_checked)
      if (checked) {
        checked =0
      }else {
        checked =1
      }
      that.checkHttp(rec_id,checked)
    },
    // checkhttp
    checkHttp: function(id,checked){
      let that= this
      let c_active = that.c_active
      let url = ''
      if(c_active){
        url = API.cart_check
      }else {
        url = API.wscart_check
      }
      that.$http.get(url,{
        params:{
          rec_id: id,
          is_checked: checked
        }
      })
      .then(function (response) {
        if(c_active){
          that.cart_index()
        }else {
          that.wscart_index()
        }
      })
      .catch(function(error){
        console.log(error);
      })
    },
    // 计算价格
    countAll: function(data) {
      let oprice = 0
      for(let i = 0; i<data.cart.length; i++){
        let goods = data.cart[i].goods
        for(let j =0; j<goods.length; j++){
          let is_checked = goods[j].is_checked
          if (Number(is_checked)) {
            let price = goods[j].price,
            num = goods[j].cart_number
            let total= price*num
            oprice +=total
          }
        }
      }
      this.oprice = oprice.toFixed(2)
    },
    // 判断是否全选
    isChooseAll: function(){
      let cartData = this.cartData
      for(let i = 0; i<cartData.cart.length; i++){
        let is_checked = cartData.cart[i].is_checked
        if(is_checked){
          this.checkAll=1
        }else {
          this.checkAll=0
          return
        }
      }
    },
    // 编辑
    onEdit: function() {
      let edit = this.edit
      if (edit) {
        this.edit = false
      }else {
        this.edit = true
      }
    },
    // 收藏
    onCollect: function(){
      let that = this
      let cartData = that.cartData
      let goods_id = ""
      for(let i = 0; i<cartData.cart.length; i++){
        let goods = cartData.cart[i].goods
        for(let j =0; j<goods.length; j++){
            goods_id += goods[j].goods_id + ","
        }
      }
      that.$http.get(API.collect_add,{
        params:{
          goods_id: goods_id
        }
      })
      .then(function (response) {
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
    // 删除购物车
    onDelcCart: function(){
      let that = this
      let cartData = that.cartData
      let c_active = that.c_active
      let url = ''
      let rec_id = ''
      for(let i = 0; i<cartData.cart.length; i++){
        let goods = cartData.cart[i].goods
        for(let j =0; j<goods.length; j++){
          let is_checked = goods[j].is_checked
          if (Number(is_checked)) {
            rec_id += goods[j].rec_id + ","
          }
        }
      }
      if(c_active){
        url = API.cart_delete
      }else {
        url = API.wscart_delete
      }
      that.$http.get(url,{
        params:{
          rec_id: rec_id
        }
      })
      .then(function (response) {
        Dialog.alert({
          title: '温馨提示',
          message: response.data.msg
        }).then(() => {
          if(c_active){
            that.cart_index()
          }else {
            that.wscart_index()
          }
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
  .cart{
    padding: 1rem 0 2rem;
  }
  .tabBtn-box{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    padding: 0.1rem 1.5rem;
    border-bottom: 1px solid #f3f3f3;
    z-index: 101;
    background-color: #fff;
  }
  .tabBtn-box ul{
    display: flex;
    color: #F55B53;
    border: 0.5px #F55B53 solid;
    border-radius: 0.1rem;
  }
  .tabBtn-box ul li{
    flex: 1;
    line-height: 0.64rem;
    font-size: 0.28rem;
  }
  .tabBtn-box ul li:first-child{
    border-right: 1px #F55B53 solid;
  }
  .active{
    background-color: #F55B53;
    color: #fff;
  }
  .edit-btn{
    position: absolute;
    right: 0.1rem;
    top: 50%;
    transform: translateY(-50%);
    padding: 0.2rem;
    font-size: 0.28rem;
  }
  .cart-item{
    border-bottom: 0.2rem #f9f9f9 solid;
  }
  .empty-box{
    margin: 50% auto;
  }
  .empty-img{
    display: block;
    width: 1.8rem;
    height: 1.8rem;
    margin: 0 auto;
  }
  .empty-box p{
    margin: 0.1rem;
    font-size: 0.28rem;
    color: #969698;
  }
  .store{
    padding: 0.2rem;
    text-align: left;
    border-bottom: 1px solid #f3f3f3;
    font-size: 0.32rem;
    line-height: 0.4rem;
  }
  .van-icon{
    margin-right: 0.2rem;
    font-size: 0.4rem;
    float: left;
  }
  .van-icon-checked{
    color: #F55B53
  }
  .van-icon-check{
    color: #efefef
  }
  .prod-item{
    position: relative;
    text-align: left;
    padding: 0.2rem 0.2rem 0.4rem;
    border-bottom: 1px solid #fafafa;
  }
  .checkbox-icon{
    position: absolute;
    left: 0.2rem;
    top: 50%;
    transform: translateY(-50%)
  }
  .prod-cont{
    display: flex;
    padding-left: 0.3rem;
  }
  .prod-img{
    flex: 1;
    width: 1.4rem;
    height: 1.7rem;
  }
  .prod-info{
    flex: 3;
  }
  .info-top{
    max-width: 4.8rem;
    margin-top:0.15rem;
    font-size: 0.3rem;
  }
  .info-top img{
    height: 0.3rem;
    float: left;
    margin: 0.05rem 0.1rem;
  }
  .prod-name{
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:1;
    line-height:0.4rem;
  }
  .prod-spec{
    font-size: 0.26rem;
    color: #999;
    padding: 0.1rem;
    min-height: 0.3rem;
  }
  .info-bottom{
    position: relative;
  }
  .price{
    font-size: 0.32rem;
    color: #F55B53;
    line-height: 0.7rem;
  }
  .stepper{
    position: absolute;
    right: 0rem;
    top: 50%;
    transform: translateY(-50%)
  }
  .priceAll-box{
    position: fixed;
    bottom: 1rem;
    left: 0;
    right: 0;
    text-align: left;
    padding: 0.2rem;
    border-top: 1px solid #f3f3f3;
    font-size: 0.36rem;
    background-color: #fff;
  }
  .price-all{
    color: #F55B53;
    padding-left: 0.6rem;
  }
  .cart-btn,.cart-collect,.cart-del{
    width: 2rem;
    height: 100%;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    background-color: #F55B53;
    border: #F55B53;
    border-radius: 0;
    font-size: 0.26rem;
  }
  .cart-collect{
    right: 2rem;
    background-color: #fff;
    color: #000;
    border-left: 1px #f3f3f3 solid;
  }
</style>
