 <template>
 <div id="home">
  <!--  <div class="page has-navbar" v-nav="{ title: '二手物品' }">
    <div class="page-content text-center"> -->
    <header>二手物品</header>
      <scroller :on-refresh="refresh"   class="scroller" ref="myscroller">
     <swiper ref="swiper" direction="horizontal" height="150" pager-color="#44CCFE" pager-bg-color="#FFF">
        <swiper-item><img src="../../assets/images/banner01.png"></swiper-item> 
        <swiper-item><img src="../../assets/images/banner02.png"></swiper-item> 
        <swiper-item><img src="../../assets/images/banner03.png"></swiper-item>
      </swiper> 
         <div class="userinfo" v-for="(item,index) in list">
           <div class="userTime">
             <p class="left"><router-link :to="'/chat/'+item._id"><img :src="item.avator"></router-link></p>
             <p class="right">
               <span class="nickname" v-text="item.username"></span>
               <span class="time" v-text="item.create_time"></span>
             </p>
           </div>
             <div class="file"> 
               <p v-for="i in item.files"><img :src="api+i"></p>
             </div>
             <div class="intro" v-text="item.intro"></div>
             <div class="icons">
               <p @click="zans(item._id,index,item.zanNum)" :class="zanstatus==index?'iconscolor':''"><i class="ion-ios-flame-outline"></i>{{item.zanNum}}</p>
               <p :class="followstatus==index?'prefer':''" @click="follow(item.username,item.avator,item.uid,item._id,index)">关注</p>
             </div>
         </div>
      </scroller>
 <!--    </div>
  </div> -->
 </div>
  
 </template>
 <script type="es6">
 import Vue from 'vue';
   export default{
    data(){
      return{
        list:[],
        api:this.$api, 
        page:0,
        swipeOptions:{},
        top:1,
        choosezan:true,
        zanstatus:"asd",
        followstatus:"qwe"
      }
    },
    mounted(){ 
      this.newinfo();
    },
    methods:{
      refresh() { 
        this.newinfo();
      },
      //获取最新新闻
      newinfo() {
        this.$request.getAxios(this.$api+'newinfo?page='+this.page).then(data=>{   
          let that=this;
          data.map((item,index)=>{
            that.list.push(item);
          });
          this.page++;
        }).catch(err=>{ 
         
       setTimeout(()=>{this.$refs.myscroller.resize(); $toast.show("没有更多数据", 1000);},1000)   
          console.log(this.top)
        }) 
      },
      // 点赞
      zans(id,index,num){
        let url = this.choosezan ? this.$api+"zan?id="+id : this.$api+"unzan?id="+id;
        let nums =num; 
        this.$request.getAxios(url).then(data=>{    
         if (data == "点赞成功") {
            this.choosezan=false;
            let item = this.list[index];  
            nums ? nums++ : 0;
            item.zanNum= nums ; 
            Vue.set(this.list,index,item); 
            this.zanstatus=index;
         }else{
            this.choosezan=true;
            let item = this.list[index];  
            nums ? nums-- : "" 
            item.zanNum= nums; 
            Vue.set(this.list,index,item); 
            this.zanstatus="asd";
         } 
        }).catch(err=>{   
        })
      },
      // 关注
      follow(username,avator,uid,id,index){ 
        this.$request.postAxios(this.$api+'atten',{"username":username,"avator":avator,"cid":uid,"uid":id}).then(data=>{      
          this.followstatus=index;  
        }).catch(err=>{   
        }) 
      }
    }
   }
 </script>
 <style type="text/sass"> 
 
#home header{
  height: 44px;
  line-height: 44px;
  text-align: center;
  background: #fff;
  font-size: 15px;
}
#home .swiper-pagination{
        text-align: right;
        padding-right: 5px;
   }
#home .scroller{
        margin-top: 44px;
}  
#home .userinfo{
  border-bottom: 3px solid #E2E2E2;
  background-color: #fff;  
  margin-bottom: 8px;
}
#home .userinfo .userTime{
  display: flex;    
  align-items: center;
  padding:10px 10px 0 10px; 
}   
#home .userinfo .userTime p{
  margin:0;
}
#home .userinfo .userTime img{
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
#home .userinfo .userTime .right{
  text-align: left;
}
#home .userinfo .userTime .right .nickname{
  display: block;
  font-size: 17px;
}
#home .userinfo .userTime .right .time{ 
  font-size: 13px;
  color: #999;
} 
#home .userinfo .file{
  display: flex;
  margin-top: 5px;
}
#home .userinfo .file p{
  margin:0;
  height: 85px;
}
#home .userinfo .file img{
  width: 85px;
  height: 85px;
  margin:0 10px;
}
#home .userinfo .intro{
  text-align: left;
  padding: 0 10px;
  font-size: 15px;
  margin:10px 0;
}
#home .userinfo .icons{
  display: flex;
  padding: 0 10px;
  justify-content:space-between; 
} 
#home .userinfo .icons p{
  font-size: 13px;
}
#home .userinfo .icons p.iconscolor{
   color: rgb(68, 204, 254);
}
#home .userinfo .icons p:nth-child(1){
  font-size: 15px;
  letter-spacing: 5px;
}
#home .userinfo .icons p:nth-child(2){
  border-radius: 5px;
  border: 1px solid rgb(68, 204, 254);
  padding: 0 10px;
  color: rgb(68, 204, 254);
}
#home .userinfo .prefer{
  color: #999;
  border:1px solid #999;
}

 </style>
