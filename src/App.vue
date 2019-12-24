<template>
  <div>
    <MobileMenu :showMobSwitch="openMobActive" @closeMob="mobileMenuShowParent"/>
    <div class="main" :class="{showMob: showMobActive}">
      <Header :showMobSwitchIcon="openMobActive" @mobileMenuShowChild="mobileMenuShowParent"/>

      <router-view :key="$route.fullPath"></router-view>

    </div>


  </div>
</template>

<script>
  import MobileMenu from './components/MobileMenu';
  import Header from './components/Header';

export default {
  name: 'app',
  data(){
    return{
      showMobActive: false,
      openMobActive: false
    }
  },
  components: {
    Header,
    MobileMenu
  },
  methods: {
    mobileMenuShowParent(){
      this.showMobActive = !this.showMobActive;
      this.openMobActive = !this.openMobActive;
    }
  }
}
</script>

<style lang="scss">
  .main{
    -webkit-transition: .5s;
    -moz-transition: .5s;
    -ms-transition: .5s;
    -o-transition: .5s;
    transition: .5s;
  }
.showMob{
  transform: translateX(-100%);
}

</style>
