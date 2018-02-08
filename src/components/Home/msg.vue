 <template>
 <div id="Msg">
   <header>消息</header>
     <list class="list-ios">
      <item>
        <p class="userMsg"><img src="../../assets/images/msg.jpg"><span class="username">天策者</span><span class="content">谋事在人，成事在天</span></p>
        <p>2018-02-02</p>
      </item> 
    </list>
 </div>
  
 </template>
 <script type="es6">
 	export default{
 		data(){
 			return{

 			}
 		},
 		mounted(){
 			
 		}
 	}
 </script>
 <style type="text/sass">
    
#Msg header{
  height: 44px;
  line-height: 44px;
  text-align: center;
  background: #fff;
  font-size: 15px;
}
#Msg .list-ios{
	padding-left: 0;
}
#Msg .list-ios .item{
  display: flex;
  border-top: 1px solid #eee;
  margin-top: 5px;
  justify-content: space-between;
  padding-left: 10px;
  align-items: center;
} 
#Msg .list-ios .item img{
	float: left;
	width: 30px;
	height: 30px;
	border-radius: 50%;
	margin-right: 10px;
}
#Msg .list-ios .item p.userMsg{
	width: 70%;
}
#Msg .list-ios .item span{
	display: block;
}
#Msg .list-ios .item p.userMsg .username{
	margin-bottom: 5px;
}
#Msg .list-ios .item p.userMsg .content{
	overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
#Msg .list-ios .item .hairline-top,#Msg .list-ios .item .hairline-bottom{
	display: none;
}

 </style>