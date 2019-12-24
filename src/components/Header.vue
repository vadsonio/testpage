<template>
  <div class="header">
    <div class="header__top">
      <div class="container">
        <div class="d-flex justify-content-between">
          <ul class="header__contacts">
            <li>
              <a href="tel:+02012345678" class="phone">+020 12345678</a>
            </li>
            <li>
              <a href="mailto:hello@homeeurope.com" class="email">hello@homeeurope.com</a>
            </li>
          </ul>
          <ul class="header__weather-lang">
            <li>
              <a href="" class="place">London</a>
            </li>
            <li>
              <a href="" class="weather">18<span>&#176;</span></a>
            </li>
            <li>
              <div class="lang-switch" @mouseover="lang_switch=true" @mouseleave="lang_switch=false">
                <country-flag :country="choosedLang.flag" size='small'/>
                {{choosedLang.language}}
                <transition name="lang_drop">
                  <ul class="lang-switch__drop" v-if="lang_switch">
                    <li v-for="item in filterLangs" :key="item.flag" @click="chooseLang(item.language)">
                      <country-flag :country='item.flag' size='small'/> {{item.language}}
                    </li>
                  </ul>
                </transition>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="header__divider">
      <div class="container">        
      </div>
    </div>
    <div class="header__bottom">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center">
          <a href="" class="logo">
            <img src="../assets/logo.png" alt="logo">
          </a>
          <div class="mob-menu_btn" :class="{open: showMobSwitchIcon}" @click="mobileMenuShow">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <nav class="main-nav">
            <router-link :to="{ path: '/' }">{{ $t("nav.navHome") }}</router-link>
            <router-link :to="{ path: '/about' }">{{ $t("nav.navAboutUs") }}</router-link>
            <router-link :to="{ path: '/apartments' }">{{ $t("nav.navApartments") }}</router-link>
            <router-link :to="{ path: '/reviews' }">{{ $t("nav.navReviews") }}</router-link>
            <router-link :to="{ path: '/blog' }">{{ $t("nav.navBlog") }}</router-link>
            <router-link :to="{ path: '/contact' }">{{ $t("nav.navContact") }}</router-link>
          </nav>
          <div class="sign-up__block">
            <a href="" class="btn-app btn-app--transparent_black sign-up__btn">{{ $t("btns.sign") }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    props: ['showMobSwitchIcon'],
    data(){
      return{
        lang_switch: false,
        choosedLang: {
          flag: "",
          language: ""
        },
        lang: [
          {
            flag: "gb",
            language: "EN",
            state: false
          },
          {
            flag: "ru",
            language: "RU",
            state: false
          },
          {
            flag: "ukr",
            language: "UKR",
            state: false
          }
        ]
      }
    },
    methods: {
      chooseLang(choosedLanguage){
        const choosed = this.lang.find(singleLang => singleLang.language === choosedLanguage);

        this.lang.forEach((selected) => {
          selected.state = false;

          if(selected.language === choosedLanguage){
            selected.state = true;
          }
        });

        this.$i18n.locale = choosedLanguage;

        this.choosedLang.flag = choosed.flag;
        this.choosedLang.language = choosed.language;
      },
      mobileMenuShow(){
        this.$emit('mobileMenuShowChild');
      }
    },
    created(){
      this.chooseLang(this.lang[0].language);
    },
    computed:{
      filterLangs(){
        return this.lang.filter(lang=>{
          return lang.state != true;
        })
      }
    }
  }
</script>

<style lang="scss">
  .header{
    color: $headerText;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.45);
    background: #fff;
    &__top{
      padding: 10px 0;
      a{
        font-size: 14px;
        line-height: 35px;
        color: $headerText;
      }
      li{
        display: inline-block;
      }
    }
    &__contacts{
      margin-bottom: 0;
      @include lg{
        display: none;
      }
      li:first-child{
        margin-right: 15px;
      }
      .phone:before{
        content: "";
        display: block;
        background: url("../assets/icons/phone-icon.png");
        width: 15px;
        height: 11px;
        float: left;
        margin: 12px 9px 0 0;
      }
      .email:before{
        content: "";
        display: block;
        background: url("../assets/icons/letter-icon.png");
        width: 15px;
        height: 11px;
        float: left;
        margin: 12px 9px 0 0;
      }
    }
    &__weather-lang{
      margin-bottom: 0;
      @include lg{
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
      li:first-child{
        margin-right: 15px;
      }
      li:nth-child(2){
        padding-right: 15px;
        border-right: 1px solid #ebebeb;
        @include lg{
          padding: 0;
          border-right: 0;
        }
      }
      li:last-child{
        padding-left: 15px;
        @include lg{
          display: none;
        }
      }
      .weather:before{
        content: "";
        display: block;
        background: url("../assets/icons/weather-icon.png");
        width: 29px;
        height: 24px;
        float: left;
        margin: 5px 9px 0 0;
      }
      .small-flag{
        margin-right: -18px!important;
        transform: scale(.30) translateY(6px)!important;
        -ms-transform: scale(.30) translateY(6px)!important;
        -webkit-transform: scale(.30) translateY(6px)!important;
        -moz-transform: scale(.30) translateY(6px)!important;
      }
      .lang-switch{
        position: relative;
        padding-right: 20px;
        cursor: pointer;
        &:hover:after{
          transform: rotate(225deg) translateY(-5px);
        }
        &:after {
          content: '';
          position: absolute;
          top: 6px;
          right: 3px;
          display: block;
          width: 7px;
          height: 7px;
          border-right: 1px solid #000;
          border-bottom: 1px solid #000;
          -webkit-transition: .5s;
          -moz-transition: .5s;
          -ms-transition: .5s;
          -o-transition: .5s;
          transition: .5s;
          transform: rotate(45deg);
        }
        &__drop{
          padding: 10px;
          position: absolute;
          right: 0;
          min-width: 100px;
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
          box-shadow: 0 0 4px 0px rgba(0,0,0,.3);
          background: #fff;
        }
        li{
          border: none;
          margin: 0;
          padding: 0;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          &:hover{
            color: $activeText;
          }
        }
      }
    }
    &__divider{
      .container{
        border-bottom: 1px solid #ecf0f1;
      }
    }
    &__bottom{
      padding: 20px 0;
      .mob-menu_btn{
        display: none;
        margin-left: auto;
        width: 40px;
        height: 35px;
        position: relative;
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
        -webkit-transition: .5s ease-in-out;
        -moz-transition: .5s ease-in-out;
        -o-transition: .5s ease-in-out;
        transition: .5s ease-in-out;
        cursor: pointer;
        &.open{
          span{
            &:nth-child(1){
              top: 12px;
              -webkit-transform: rotate(135deg);
              -moz-transform: rotate(135deg);
              -o-transform: rotate(135deg);
              transform: rotate(135deg);
            }
            &:nth-child(2){
              opacity: 0;
              left: -60px;
            }
            &:nth-child(3){
              top: 12px;
              -webkit-transform: rotate(-135deg);
              -moz-transform: rotate(-135deg);
              -o-transform: rotate(-135deg);
              transform: rotate(-135deg);
            }
          }
        }
        span{
          display: block;
          position: absolute;
          height: 7px;
          width: 100%;
          background: $headerText;
          border-radius: 9px;
          opacity: 1;
          left: 0;
          -webkit-transform: rotate(0deg);
          -moz-transform: rotate(0deg);
          -o-transform: rotate(0deg);
          transform: rotate(0deg);
          -webkit-transition: .25s ease-in-out;
          -moz-transition: .25s ease-in-out;
          -o-transition: .25s ease-in-out;
          transition: .25s ease-in-out;
          &:nth-child(1){
            top: 0px;
          }
          &:nth-child(2){
            top: 13px;
          }
          &:nth-child(3){
            top: 27px;
          }

        }
        @include lg{
          display: block;
        }
      }
      .main-nav{
        margin-left: auto;
        display: flex;
        align-items: center;
        a{
          margin: 0 15px;
          font-size: 16px;
          font-weight: 500;
          line-height: 24px;
          text-transform: uppercase;
          color: $headerText;
          &:first-child{
            margin-left: 0;
          }
          &:hover{
            text-decoration: none;
            color: $activeText;
          }
          &.router-link-exact-active{
            text-decoration: none;
            color: $activeText;
          }
          @include xl{
            margin: 0 5px;
          }
        }
        .btn{
          font-size: 14px;
          line-height: 24px;
        }
        @include lg{
          display: none;
        }
      }
      .sign-up__btn{
        @include lg{
          display: none;
        }
      }
    }
  }
  .lang_drop-enter-active{
    animation: showLangDrop .5s;
  }
  .lang_drop-leave-active{
    animation: showLangDrop .1s reverse;
  }
  @keyframes showLangDrop {
    0%{
      -webkit-transform: translateY(10px);
      -moz-transform: translateY(10px);
      -ms-transform: translateY(10px);
      -o-transform: translateY(10px);
      transform: translateY(10px);
    }
    100%{
      -webkit-transform: translateY(0);
      -moz-transform: translateY(0);
      -ms-transform: translateY(0);
      -o-transform: translateY(0);
      transform: translateY(0);
    }
  }
</style>