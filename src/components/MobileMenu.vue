<template>
  <div class="mob_menu" :class="{openMob: showMobSwitch}">
    <div class="h-100 d-flex flex-column justify-content-between">
      <transition name="showMobElement">
        <nav class="main-nav__mob">
          <a href="/">home</a>
          <a href="/about">about us</a>
          <a href="">our apartments</a>
          <a href="">reviews</a>
          <a href="">blog</a>
          <a href="">contact us</a>
          <a href="" class="btn-app btn-app--transparent_white">sign up</a>
        </nav>
      </transition>

      <transition name="showMobElement">
        <div class="tools__mob">
          <a href="tel:+02012345678">
            <div class="tools__mob-icon phone">
              <i class="fas fa-phone-alt"></i>
            </div>
            call us
          </a>
          <a href="mailto:hello@homeeurope.com">
            <div class="tools__mob-icon email">
              <i class="fas fa-envelope-open"></i>
            </div>
            send email
          </a>
          <button class="btn-app btn-app--transparent_white" @click="closeMob">
            <i class="far fa-times-circle"></i>close
          </button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>


  export default {
    name: "MobileMenu",
    props: ['showMobSwitch'],
    methods:{
      closeMob(){
        this.$emit('closeMob');
      }
    },
    watch: {
      showMobSwitch(newVal){
        if(newVal===true){
          document.body.classList.add("mobile-open");
        } else{
          document.body.classList.remove("mobile-open");
        }
      }
    }
  }
</script>

<style lang="scss">
  .mob_menu{
    position: fixed;
    display: block;
    padding: 20px;
    top: 0;
    width: 100%;
    right: -100%;
    height: 100%;
    background: #333;
    z-index: 1;
    -webkit-transition: .5s;
    -moz-transition: .5s;
    -ms-transition: .5s;
    -o-transition: .5s;
    transition: .5s;
    color: #fff;
  }
  .openMob{
    right: 0;
  }
  .main-nav__mob{
    a{
      margin-bottom: 20px;
      display: block;
      text-align: center;
      font-size: 16px;
      text-transform: uppercase;
      color: #fff;
    }
  }
  .tools__mob{
    a{
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      font-size: 16px;
      text-transform: uppercase;
      color: #fff;
    }
    &-icon{
      margin-right: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      width: 30px;
      height: 30px;
      &.phone{
        background: #1DB392;
      }
      &.email{
        background: #FF9F1C;
      }
    }
    .btn-app{
      background: transparent;
      display: block;
      width: 100%;
      .far{
        margin-right: 10px;
      }
    }
  }
</style>