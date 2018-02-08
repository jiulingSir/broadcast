<template>
	<div id="Login">
	<header>登录</header>
    <div class="loginform">
		<von-input type="text" v-model="phone" placeholder="请输入手机号" label="手机号"> </von-input>
		<von-input type="password" v-model="password" placeholder="请输入密码" label="密码"> </von-input>
	    <md-button class="button button-positive" @click.native="clicked()">提交</md-button>
	    <p class="reg"><router-link to="/register">没有账号？直接注册</router-link></p>
    </div>
    </div> 
</template> 
<script type="es6">  
export default {
  name: 'login',
  data () {
    return { 
    	phone:"",
    	userid:localStorage.getItem('userid'),
    	password:""
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
     this.$request.postAxios(this.$api+'login',{"phone":this.phone,"password":this.password}).then(data=>{
          $loading.hide();
          let that=this;
         $dialog.alert({ effect: 'default', title: '提示', content: "登录成功", okText: '确定'}).then(res=>{ 
         	localStorage.setItem('userid',data._id);
         	localStorage.setItem('username',data.username);	
             that.$router.push("/home");
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
  
#Login header{
  height: 44px;
  line-height: 44px;
  text-align: center;
  background: #fff;
  font-size: 15px;
} 
#Login .loginform .button{
	display: block;
	margin:15px auto;
	width: 80%;
}
#Login .loginform .reg{
	text-align: center;
	font-size: 14px;
}

</style>
