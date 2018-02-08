 <template>
 <div id="Remark">
   <header><i @click="back" class="ion-chevron-left"></i>直播封面</header>
   <div class="upload">
   	<img src="../../assets/images/file-upload.png">
   	<input type="file" name="" @change="upload">
   </div>
 </div>
  
 </template>
 <script type="es6"> 
   export default{
    data(){
      return{
        api:this.$api,
        userid:localStorage.getItem("userid")
      }
    },
    methods:{
      back(){ 
        this.$router.push("/user");
      },
      upload(e){
		let reader=new FileReader();
		reader.readAsDataURL(e.target.files[0]); 
		let that=this;
		reader.onload=function(e){   
			that.canvasDataURL(this.result,600,res=>{  
		    // that.files.push({"i":that.i,"img":res}); 
		     that.$request.postAxios(that.$api+'coverimg',{"_id":that.userid,"coverimg":res}).then(data=>{  
		        }).catch(err=>{  
		        })
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
    }
   }
 </script>
 <style type="text/sass">
    
#Remark header{
  height: 44px;
  line-height: 44px;
  text-align: center;
  background: #fff;
  font-size: 15px;
}
#Remark header i{
  float: left;
  position: relative;
  left: 15px;
}
#Remark .upload{
	width: 100px;
	margin:0 auto;
}
#Remark .upload img{
  width: 80px; margin-left: 10px;
}
#Remark .upload input{
	position: absolute;
    left: 40%;
    width: 80px;
    height: 80px;
    opacity: 0;
}

 </style>