<template>
	<div> 
      <img :src="item.img" v-for="item in list" @click="transfer(item.index)">
	</div> 
</template>
<script>
  export default {
  	data(){
      return{
      	list:[]
      }
  	},
  	mounted(){
      for (var i = 0; i < 105; i++) {
      	this.list.push({"index":"{esg"+i+"ed}","img":"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/"+i+".gif"});
      }
  	},
  	methods:{
  	  transfer(img){ 
  	  	this.$emit('childjian',img);
  	  }
  	} 
  }
</script> 
