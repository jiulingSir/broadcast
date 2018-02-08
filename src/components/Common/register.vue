<template>
	<div id="Register">
	<header>注册</header>
    <div class="Registerform">
		<von-input type="text" v-model="phone" placeholder="请输入手机号" label="手机号"> </von-input>
		<von-input type="password" v-model="password" placeholder="请输入密码" label="密码"> </von-input>
		<von-input type="text" v-model="email" placeholder="请输入邮箱" label="邮箱"> </von-input>
		<von-input type="text" v-model="username" placeholder="请输入用户名" label="用户名"> </von-input>
		<p class="sexstatus">
			<span>性别</span>
			<von-radio :options="genderOptions" v-model="sex"></von-radio> 
		</p>
	   <p class="von-input">
	   	<span>自我介绍</span>
	   	<textarea rows="5" placeholder="请输入自我介绍" v-model="introduction"></textarea>
	   </p>
	    <md-button class="button button-positive" @click.native="clicked()">提交</md-button> 
    </div>
    </div> 
</template> 
<script type="es6">  
export default {
  name: 'Register',
  data () {
    return { 
    	phone:"",
    	username:"",
    	userid:localStorage.getItem('userid'),
    	password:"",
    	sex:0,
    	genderOptions:["男","女"],
    	email:"",
    	introduction:""
    } 
  }, 
  created(){ 
     if (this.userid) {
     	this.$router.push("/home");
     }
  }, 
  methods:{   
    // 提交
    clicked() { 
      $loading.show('拼命加载中..');
     this.$request.postAxios(this.$api+'register',{"phone":this.phone,"password":this.password,"sex":this.sex,"email":this.email,"password":this.password,"username":this.username,"introduction":this.introduction,"avator":this.$api+"public/images/moren.jpg"}).then(data=>{
          $loading.hide();
          let that=this;
         $dialog.alert({ effect: 'default', title: '提示', content: data, okText: '确定'}).then(res=>{  
             that.$router.push("/login");
         })
        }).catch(err=>{ 
          $loading.hide();$toast.show(err, 1E10) 
     })
    }
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/sass">   
  
#Register header{
  height: 44px;
  line-height: 44px;
  text-align: center;
  background: #fff;
  font-size: 15px;
} 
#Register .Registerform{
	background: #fff;
	padding-bottom: 10px;     
}
#Register .Registerform .button{
	display: block;
	margin:15px auto;
	width: 80%;
}
#Register .Registerform .reg{
	text-align: center;
	font-size: 14px;
}
#Register .Registerform p.von-input{
	display: flex;
	padding: 10px 14px;
}
#Register .Registerform p.von-input span{
	width: 15%;
	color: #333;
}
#Register .Registerform p.von-input textarea{
	width: 85%;
	padding-left: 20%;
}
#Register .Registerform p.sexstatus,#Register .Registerform p.sexstatus .von-radio{
	display: flex;
}
#Register .Registerform p.sexstatus{
	border-bottom: 1px solid #ddd;
	padding: 10px 14px;
	align-items: center;
	font-size: 14px;
	color: #333;
}
#Register .Registerform p.sexstatus .von-radio{
	margin-left: 22%;
}
#Register .Registerform p.sexstatus .von-radio label .assertive{
	color: #4a90e2;
}

</style>
