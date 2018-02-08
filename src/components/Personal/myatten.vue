 <template>
 <div id="Apply">
   <header><i @click="back" class="ion-chevron-left"></i>我的关注</header> 
   <list class="list-ios">
  <item>
  	<p><img src="../../assets/images/msg.jpg">
  	<span>任务</span></p>
  	<span class="cacel">取消关注</span>
  </item> 
</list>
 </div>
  
 </template>
 <script type="es6"> 
   export default{
    data(){
      return{
        api:this.$api,
        userid:localStorage.getItem("userid"), 
      }
    },
    methods:{
      back(){ 
        this.$router.push("/user");
      }, 
    }
   }
 </script>
 <style type="text/sass">
    
#Apply header{
  height: 44px;
  line-height: 44px;
  text-align: center;
  background: #fff;
  font-size: 15px;
}
#Apply header i{
  float: left;
  position: relative;
  left: 15px;
} 
#Apply .list-ios{ 
	margin-top: 5px;
} 
#Apply .list-ios .item{ 
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid whitesmoke;
    padding-top: 10px;
    padding-bottom: 10px;
}
#Apply .list-ios .item p{
	display: flex;
	align-items: center;
}
#Apply .list-ios .hairline-top,#Apply .list-ios .hairline-bottom{
	display: none;
}
#Apply .list-ios .item img{
	width: 30px;
	margin-right: 10px;
}
#Apply .list-ios .item .cacel{
  border: 1px solid rgb(68, 204, 254);
  padding: 5px;
  font-size: 13px;
  border-radius: 2px;
}

 </style>