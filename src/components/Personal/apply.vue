 <template>
 <div id="Apply">
   <header><i @click="back" class="ion-chevron-left"></i>申请直播</header>
   <div class="applyform">
   <von-input type="text" v-model="hostname" placeholder="请输入主播名" label="主播名"></von-input>
   <von-input type="text" v-model="faculty" placeholder="够帅？够美？" label="申请原因"></von-input>
   <von-input type="text" v-model="HostDesc" placeholder="留下让你印象深刻的话语" label="主播描述"></von-input>
   	<div class="upload">
   	<img src="../../assets/images/file-upload.png" v-if="!path">
   	<img :src="path" v-if="path">
   	<input type="file" name="" @change="upload">
   </div>
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
        faculty:"",
        hostname:"",
        HostDesc:"",
        path:""
      }
    },
    methods:{
      back(){ 
        this.$router.push("/user");
      },
      // 上传图片
      upload(e){
		let reader=new FileReader();
		reader.readAsDataURL(e.target.files[0]); 
		let that=this;
		reader.onload=function(e){   
			that.canvasDataURL(this.result,600,res=>{   
		    that.path=res;
			}); 
		}  
      },
  	//压缩图片
  	canvasDataURL(re,w,callback){
        let newImg=new Image();
        newImg.src=re;
		let canvas = document.createElement('canvas');
		let context = canvas.getContext('2d');
        newImg.onload=function(){
           let originWidth = this.width;
		    let originHeight = this.height;  
		    let targetWidth = originWidth, targetHeight = originHeight; 
		    if (originWidth > w || originHeight > w) {
		        if (originWidth / originHeight > w / w) { 
		            targetWidth = w;
		            targetHeight = Math.round(w * (originHeight / originWidth));
		        } else {
		            targetHeight = w;
		            targetWidth = Math.round(w * (originWidth / originHeight));
		        }
		    } 
		    canvas.width = targetWidth;
		    canvas.height = targetHeight; 
		    context.clearRect(0, 0, targetWidth, targetHeight); 
		    context.drawImage(newImg, 0, 0, targetWidth, targetHeight);
	        let base64=canvas.toDataURL("image/jpeg",1); 
	        callback(base64);
        }
  	},
  	// 提交
  	clicked() { 
  		$loading.show('拼命加载中..');
     this.$request.postAxios(this.$api+'examHost',{"HostName":this.HostName,"faculty":this.faculty,"cardPic":this.path,"HostDesc":this.HostDesc}).then(data=>{
     	    $loading.hide();
     	    let that=this;
     	   $dialog.alert({ effect: 'default', title: '提示', content: data, okText: '确定'}).then(res=>{
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
#Apply .upload{
	width: 100px;
	margin:0 auto;    
	margin-top: 15px;
	margin-bottom: 5px;
}
#Apply .upload img{
  width: 80px; margin-left: 10px;
}
#Apply .upload input{
	position: absolute;
    left: 40%;
    width: 80px;
    height: 80px;
    opacity: 0;
}
#Apply .applyform{
	background-color: #fff;
	padding-bottom: 10px;
}
#Apply .applyform .button{
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