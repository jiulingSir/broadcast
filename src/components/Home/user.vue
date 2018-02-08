 <template>
 <div id="Seed">
   <header>个人中心</header>
   <img src="../../assets/images/avator.jpg">
   <p class="avator"><img :src="api+'/public/images/moren.jpg'"></p>
    <list class="list-ios">
      <item> 
       <span @click="toremark('/remark')" class="content"><i class="ion-ios-calendar-outline"></i>直播封面</span><i class="ion-ios-arrow-forward"></i>
      </item>
      <item>
   <span class="content" @click="toremark('/apply')"><i class="ion-clipboard"></i>申请主播</span><i class="ion-ios-arrow-forward"></i>
      </item>
      <item>
  <span class="content" @click="toremark('/atten')"><i class="ion-ios-analytics-outline"></i>我的关注</span><i class="ion-ios-arrow-forward"></i>
      </item>
      <item>
    <span class="content" @click="toremark('/personal')"><i class="ion-person"></i>个人资料</span><i class="ion-ios-arrow-forward"></i>
      </item>
      <item>
    <span class="content" @click="toremark('/advice')"><i class="ion-ios-email-outline"></i>意见反馈</span><i class="ion-ios-arrow-forward"></i>
      </item>
    </list>
    <div class="logut">退出登录</div>
 </div> 
 </template>
 <script type="es6">
   export default{
    data(){
      return{
        api:this.$api
      }
    },
    methods:{
      toremark(url){ 
        this.$router.push(url);
      },
    }
   }
 </script>
 <style type="text/sass">
    
#Seed header{
  height: 44px;
  line-height: 44px;
  text-align: center;
  background: #fff;
  font-size: 15px;
}
#Seed .avator{
  position: absolute;
  top: 90px;
  margin-left: 40%;
}
#Seed .avator img{
  width: 70px;
  height: 70px;
  border-radius: 50%;
}
#Seed .list-ios .item{
  display: flex;
  justify-content: space-between;
}
#Seed .list-ios .item .hairline-top,#Seed .list-ios .item .hairline-bottom{
  display: none;
}
#Seed .list-ios .item .content{
  font-size: 15px; 
}
#Seed .list-ios .item .content i{
  margin-right: 10px;
}
#Seed .logut{
  border-radius: 5px;
  border: 1px solid rgb(68, 204, 254);
  width: 70%;
  padding: 10px 0;
  text-align: center;
  margin: 0 auto;
  font-size: 15px;
  color: rgb(68, 204, 254);
}

 </style>