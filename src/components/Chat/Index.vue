 <template>
 <div id="Chat">
   <header><i @click="back" class="ion-chevron-left"></i>直播</header>
   <div class="message" v-chat-scroll> 
   <div :class="item.id==userid?'left':'right'" v-for="item in leftlist">
     <div  v-if="item.id==userid"> 
       <div class="time" v-text="item.time"></div>
       <div class="container"> 
       <img src="avator" :src="item.avator">
       <p class="san"></p>
       <p class="content" v-html="item.msg"></p>
       </div>
     </div>
     <div v-if="item.id!=userid">
       <div class="time" v-text="item.time"></div> 
       <div class="container"> 
       <p class="content" v-html="item.msg"></p>
       <img src="avator" :src="item.avator">
       <p class="san"></p>
       </div>
     </div>
   </div> 
   </div>
  <div class="expression" v-if="showEmotion">
    <Emotion v-on:childjian="parentjian"></Emotion>
  </div> 
   <div class="send"> 
     <von-input type="text" v-model="msg"></von-input>
      <span class="chatlog" @click="emotion"><i class="ion-happy-outline"></i></span> 
      <button class="button" @click="clicked()">发送</button>
   </div>
 </div>
  
 </template>
 <script type="es6">
 import Emotion from './emotion.vue'
   export default{
    data(){
     return{
       api:this.$api,
       msg:"",
       showEmotion:false, 
       leftlist:[],
       idb:{},
       routerid:this.$route.params.id,
       userid:localStorage.getItem('userid'),
       belongid:this.$route.params.id>localStorage.getItem('userid') ? this.$route.params.id+localStorage.getItem('userid') : localStorage.getItem('userid')+this.$route.params.id
     }
    },
    sockets:{ 
      add(msg){  
        if (msg.id==this.userid&&msg.belongid==this.belongid) { 
          this.leftlist.push(msg);    
          this.connectDatabase('IndexDBTiny',20180205);
          let that=this;
          setTimeout(()=>{
            that.addData(that.idb,'msgs',msg);
          },1000);
        }
      }
    },
    mounted(){   
      let userid=localStorage.getItem('userid');  
      this.connectDatabase('IndexDBTiny',20180205);
      let that=this;
      setTimeout(()=>{
        that.getDataByKey(that.idb,'msgs',userid);
      },1000);
    },
    methods:{
      back(){
        this.$router.go(-1);
      },
      // 获取当前时间
      getTime(){
        return new Date().getHours()+":"
        +(new Date().getMinutes() > 10 ? new Date().getMinutes() : "0"+new Date().getMinutes())
        +":"+(new Date().getSeconds() > 10 ? new Date().getSeconds() : "0"+new Date().getSeconds());
      },
      // 发送消息
      clicked(){  
        let msgA=this.msg.replace(/\{esg/g,'<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/');
        let msgB=msgA.replace(/\ed}/g,'.gif">');   
        let msg={"time":this.getTime(),"msg":msgB,"avator":this.api+"public/images/moren.jpg","id":this.routerid,"belongid":this.belongid}; 
        this.$socket.emit('CreateMessage',msg);
        this.leftlist.push(msg); 
        this.connectDatabase('IndexDBTiny',20180205);
        let that=this;
        setTimeout(()=>{
          that.addData(that.idb,'msgs',msg);
        },1000);
        this.msg=""; 
      }, 
      // 父子组件间通信
      emotion(){
        this.showEmotion=!this.showEmotion;
      },
      parentjian(img){ 
        this.showEmotion=!this.showEmotion;
        this.msg+=img;  
      },
      //创建本地数据库
      connectDatabase(name,version){
        return new Promise((res,rej)=>{
                 // \\获取indexedDB对象
            let indexedDB = window.indexedDB || window.webkitIndexedDB || 
                window.mozIndexedDB;
            // \\打开数据库，在回调中创建store object
            let request = indexedDB.open(name, version);
            request.onsuccess = (e) => {
                this.idb = e.target.result; 
                 // indexedDB.deleteDatabase('Tinys'); 
            };
            request.onupgradeneeded = (e) => {
                this.db = e.target.result;
                // res(this.db);
                if(!this.db.objectStoreNames.contains('msgs')){
                    this.store = this.db.createObjectStore('msgs', { keyPath: 'key', autoIncrement: true});
                }
            }
            request.onerror = (e) => {console.log('Can not open indexedDB', e);};
        })
      },
      // 添加本地数据
      addData(db,storeName,msg){ 
        msg.key=new Date().getTime(); 
        let transaction=db.transaction(storeName,'readwrite');
        let store=transaction.objectStore(storeName);
        store.add(msg);  
      },
      // 查找数据
      getDataByKey(db,storeName,value){ 
        let transaction=db.transaction(storeName,'readwrite');
        let request=transaction.objectStore(storeName).openCursor();  
        let that=this;
        let arr=[];
        request.onsuccess=(e)=>{
           let res=e.target.result ; 
           if (res) {
            db.close();
            arr.push(res.value); 
            res.continue();  
           }else{ 
            that.leftlist=arr; 
           } 
        } 
      },
    },
    components:{
      Emotion
    }
   }
 </script>
 <style type="text/sass">
    
#Chat header{
  height: 44px;
  line-height: 44px;
  text-align: center;
  background: #fff;
  font-size: 15px;
  margin-bottom: 10px;
}
#Chat header i{
  float: left;
  position: relative;
  left: 15px;
}
#Chat .left .container,#Chat .right .container{
  display: flex; 
  align-items: center;
  width: 70%;
  padding:5px 10px;
}
#Chat .right .container{
  width: 100%;
  justify-content: flex-end;
}
#Chat .left .time,#Chat .right .time{
  text-align: center;
}
#Chat .left img,#Chat .right img{
  width: 40px;
  height:  40px;
  border-radius: 50%;
  margin-right: 5px;
}
#Chat .left p.san{
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-right: 5px solid #fff;
  border-bottom: 5px solid transparent;
}
#Chat .right p.san{
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 5px solid #fff;
}
#Chat .left p.content,#Chat .right p.content{
  background: #fff;
  padding: 5px;
  border-radius: 5px;
}   
#Chat .right p.content{
   max-width: 70%!important;
}
#Chat .left p.content img,#Chat .right p.content img{
  width: 24px;
  height: 24px;
}
#Chat .send{
  position: fixed;
  display: flex;
  bottom: 0;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
}
#Chat .send .von-input-wrapper{
  width: 83%;
}
#Chat .send .von-input-wrapper input{
  border-bottom: 1px solid #4A90E2 ; 
}
#Chat .send .chatlog{
  width: 20px;
  margin:0 8px;
}
#Chat .send .chatlog i{
  font-size: 20px;
  color: #333;
}
#Chat .send .chatlog i:hover{
  color: #4A90E2;
}
#Chat .send .button{
  width: 17%;
  background-color: #4a90e2;  
  color: #fff;
  height: 37px;
  line-height: 37px;
  min-height: 37px;            
}
#Chat .message{
  display: block;
  height: 550px;
  margin-bottom: 48px;
  overflow-y: scroll;
}
#Chat .expression{
  background: #fff; 
  padding: 5px 0;
  position: absolute;
  bottom: 50px;
}

 </style>