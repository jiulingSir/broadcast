 <template>
 <div id="Personal">
   <header><i @click="back" class="ion-chevron-left"></i>个人资料</header>
   <div class="personalform">
   <von-input type="text" v-model="username" placeholder="请输入用户名" label="用户名"></von-input>
   <von-input type="text" v-model="sex" placeholder="请输入性别" label="性别"></von-input>
   <von-input type="text" v-model="phone" placeholder="请输入手机号" label="手机号"></von-input> 
   <p class="von-input">
   	<span>自我介绍</span>
   	<textarea rows="5" placeholder="请输入自我介绍" v-model="introduction"></textarea>
   </p>
   <md-button class="button button-positive" @click.native="clicked()">提交</md-button>
   </div> 
 </div>
  
 </template>
 <script type="es6"> 
   export default{
    data(){
      return{
        api:this.$api,
        userid:localStorage.getItem("userid"),
        phone:"",
        username:"",
        introduction:"",
        sex:""
      }
    },
    methods:{
      back(){ 
        this.$router.push("/user");
      }, 
  	// 提交
  	clicked() { 
  		$loading.show('拼命加载中..');
     this.$request.postAxios(this.$api+'updateUser',{"phone":this.phone,"username":this.username,"introduction":this.introduction,"sex":this.sex}).then(data=>{
     	    $loading.hide();
     	    let that=this;
     	   $dialog.alert({ effect: 'default', title: '提示', content: "修改成功", okText: '确定'}).then(res=>{
             that.$router.push("/user");
     	   })
        }).catch(err=>{ 
     	    $loading.hide();$toast.show(err, 1E10) 
     })
  	}
    }
   }
 </script>
 <style type="text/sass">
    
#Personal header{
  height: 44px;
  line-height: 44px;
  text-align: center;
  background: #fff;
  font-size: 15px;
}
#Personal header i{
  float: left;
  position: relative;
  left: 15px;
}
#Personal .upload{
	width: 100px;
	margin:0 auto;    
	margin-top: 15px;
	margin-bottom: 5px;
}
#Personal .upload img{
  width: 80px; margin-left: 10px;
}
#Personal .upload input{
	position: absolute;
    left: 40%;
    width: 80px;
    height: 80px;
    opacity: 0;
}
#Personal .personalform{
	background-color: #fff;
	padding-bottom: 10px;
}
#Personal .personalform .von-input{
	width: 100%;
}
#Personal .personalform p.von-input{
	display: flex;
	padding: 10px 14px;
}
#Personal .personalform p.von-input span{
	width: 15%;
	color: #333;
}
#Personal .personalform p.von-input textarea{
	width: 85%;
	padding-left: 20%;
}
#Personal .personalform .button{
	width: 80%;
    display: block;
    margin: 0 auto; 
}
.popup .popup-body{
  text-align: center;
}
.popup .button.button-assertive{
	background-color: #44CCFE;
}

 </style>