<template>
  <div class="page" v-tabbar="{'menus': menus, menuColor: '#B5B5B5', activeMenuColor: '#44CCFE', onMenuClick: menuClicked}">
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        menus: [
          {
            iconOn: 'ion-ios-home',
            iconOff: 'ion-ios-home-outline',
            text: '集市',
            path: '/home'
          },
          {
            iconOn: 'ion-ios-pricetags',
            iconOff: 'ion-ios-pricetags-outline',
            text: '直播',
            path: '/seed'
          },
          {
            iconOn: 'ion-ios-cart',
            iconOff: 'ion-ios-cart-outline',
            text: '消息',
            path: '/msg',
            badge: '5'
          },
          {
            iconOn: 'ion-ios-person',
            iconOff: 'ion-ios-person-outline',
            text: '我的',
            path: '/user'
          }
        ],
        userid:localStorage.getItem('userid')
      }
    },
    created(){
      if (!this.userid) {
        this.$router.push("/login");
      }else{
       this.menuClicked("/home");
      }
    },
    methods: {
      menuClicked(menuIndex) {
        this.$router.push(menuIndex);
      }
    },

    beforeDestroy() {
      $tabbar.$emit('hideTabbar')
    }
  }
</script>