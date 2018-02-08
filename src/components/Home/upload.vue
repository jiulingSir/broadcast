 <template>
 <div id="Upload">
   <header><i @click="back" class="ion-chevron-left"></i>上传信息</header>
   <div class="applyform"> 
	   <p class="von-input"> 
	   	<textarea rows="5" placeholder="请输入自我介绍" v-model="introduction"></textarea>
	   </p>
	   	<div class="upload">
	   	<img src="../../assets/images/file-upload.png" v-if="!path">
	   	<img :src="path" v-if="path">
	   	<input type="file" name="" @change="upload">
	   </div>
	   <span v-for="item in files"><img :src="item.img"></span>
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
        username:localStorage.getItem("username"),
        introduction:"",
        files:[],
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
	            that.files.push({"i":that.i,"img":res});
	            that.i++; 
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
     this.$request.postAxios(this.$api+'upload',{"username":this.username,"uid":this.userid,"intro":this.introduction,"file":this.files}).then(data=>{
     	    $loading.hide();
     	    let that=this;
     	   $dialog.alert({ effect: 'default', title: '提示', content: data, okText: '确定'}).then(res=>{
that.$router.push("/home");
     	   })
        }).catch(err=>{ 
     	    $loading.hide();$toast.show(err, 1E10) 
     })
  	}
    }
   }
 </script>
 <style type="text/sass">
    
#Upload header{
  height: 44px;
  line-height: 44px;
  text-align: center;
  background: #fff;
  font-size: 15px;
}
#Upload header i{
  float: left;
  position: relative;
  left: 15px;
}
#Upload .upload{
	width: 100px;
	margin:0 auto;    
	margin-top: 15px;
	margin-bottom: 5px;
}
#Upload .upload img{
  width: 80px; margin-left: 10px;
}
#Upload .upload input{
	position: absolute;
    left: 40%;
    width: 80px;
    height: 80px;
    opacity: 0;
}
#Upload .applyform{
	background-color: #fff;
	padding-bottom: 10px;
}
#Upload .applyform .von-input textarea{
	width: 100%;
	padding-left: 15px;
	padding-top: 10px;
}
#Upload .applyform .button{
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