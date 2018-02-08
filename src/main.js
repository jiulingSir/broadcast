import Vue from 'vue'
import Vonic from 'vonic'
import 'lib-flexible/flexible.js'
import VueScroller from 'vue-scroller'
import VSwipe from 'vswipe'
import axios from 'axios'
import VueSee from 'vue-see'
import VueSocket from 'vue-socket.io'
import VueChatScroll from 'vue-chat-scroll'

var request={
  getAxios: function(url){
   return new Promise((res,rej)=>{
      axios.get(url).then(data=>{
        if (data.data.msg!=0) {
          res(data.data.msg);
        }else{
          rej(data.data.msg);
        }
    })
   })
  },
  postAxios: function(url,data){
    return new Promise((res,rej)=>{
      axios.post(url,data).then(data=>{
        if (data.data.msg!=0) {
          res(data.data.msg);
        }else{
          rej(data.data.msg);
        }
      })
    })
  }
}
Vue.prototype.$api="http://123.207.87.43:3002/"; 
Vue.prototype.$request=request; 

// Page Components
import Index from './components/Home/index.vue'
import Home from './components/Home/home.vue'
import Seed from './components/Home/seed.vue'
import Msg from './components/Home/msg.vue'
import User from './components/Home/user.vue' 
import Chat from './components/Chat/index.vue' 
import Emotion from './components/Chat/emotion.vue' 
import Remark from './components/Personal/remark.vue' 
import Apply from './components/Personal/apply.vue' 
import Atten from './components/Personal/myatten.vue' 
import Personal from './components/Personal/personal.vue' 
import Advice from './components/Personal/advice.vue' 
import Login from './components/Common/login.vue' 
import Register from './components/Common/register.vue' 
import Upload from './components/Home/upload.vue' 

// Routes
const routes = [
  { path: '/', 
    component: Index,
    children:[
       {path:'home',component:Home},
       {path:'seed',component:Seed},
       {path:'msg',component:Msg},
       {path:'user',component:User}
    ]
  },
  { path: '/chat/:id', component: Chat },
  { path: '/emotion', component: Emotion },
  { path: '/remark', component: Remark },
  { path: '/apply', component: Apply },
  { path: '/atten', component: Atten },
  { path: '/personal', component: Personal },
  { path: '/advice', component: Advice },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/upload', component: Upload }
]

var options={}
Vue.use(VueSocket,'http://123.207.87.43:3002/');
Vue.use(VueSee,options)
Vue.use(VueChatScroll)
Vue.use(VueScroller)
Vue.use(VSwipe)
Vue.use(Vonic.app, {
  routes: routes
})

