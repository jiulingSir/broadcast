<template>
	<div id="Advice">
	<header><i @click="back" class="ion-chevron-left"></i>意见反馈</header>
    <div class="adviceform"> 
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
  name: 'advice',
  data () {
    return { 
    	username:localStorage.getItem('username'),
    	introduction:""
    } 
  }, 
  created(){  
  }, 
  methods:{  
    back(){
      this.$router.push('/user');
    }, 
    // 提交
    clicked() { 
      $loading.show('拼命加载中..');
     this.$request.postAxios(this.$api+'advice',{"username":this.username,"introduction":this.introduction}).then(data=>{
          $loading.hide();
          let that=this;
         $dialog.alert({ effect: 'default', title: '提示', content: "提交成功", okText: '确定'}).then(res=>{
             that.$router.push("/user");
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
  
#Advice header{
  height: 44px;
  line-height: 44px;
  text-align: center;
  background: #fff;
  font-size: 15px;
}
#Advice header i{
  float: left;
  position: relative;
  left: 15px;
}
#Advice .adviceform{
	background: #fff;
	margin-top: 10px;
	padding-bottom: 10px;
}
#Advice .adviceform p.von-input{
	display: flex;
	padding: 10px 14px;
}
#Advice .adviceform p.von-input span{
	width: 15%;
	color: #333;
}
#Advice .adviceform p.von-input textarea{
	width: 85%;
	padding-left: 20%;
}
#Advice .adviceform .button{
	display: block;
	margin:0 auto;
	width: 80%;
}

</style>
