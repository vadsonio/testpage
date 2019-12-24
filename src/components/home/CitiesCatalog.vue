<template>
  <div class="cities-catalog">
    <div class="heading">
      <h2 class="heading__bg">{{ $t("headings.citiesCatalog.bg") }}</h2>
      <h3 class="heading__main">{{ $t("headings.citiesCatalog.main") }}</h3>
    </div>
    <div class="container">
      <div class="cities-catalog__slider">
        <slick ref="slick" :options="slickOptions">
          <div class="cities-catalog__item-wrap" v-for="(city, index) in getCitiesCatalog" :key="index">
            <a href="#" class="cities-catalog__item-content" :style="{backgroundImage: 'url('+ city.img +')'}">
              <span class="cities-catalog__item-top" v-if="city.new">coming soon</span>
              <div class="cities-catalog__item-bottom">{{city.name}}</div>
            </a>
          </div>
        </slick>
        <div class="arrows-pos">
          <span id="arrow-left2"></span>
          <span id="arrow-right2"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Slick from 'vue-slick';
  import { mapGetters, mapActions } from 'vuex';

  export default {
    components: { Slick },
    data(){
      return{
        slickOptions: {
          slidesToShow: 5,
          swipe: true,
          autoplay:true,
          autoplaySpeed:1500,
          prevArrow: '#arrow-left2',
          nextArrow: '#arrow-right2',
          responsive: [
            {
              breakpoint: 900,
              settings:
                {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                }
            },
            {
              breakpoint: 600,
              settings:
                {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                }
            }
          ]
          // Any other options that can be got from plugin documentation
        }
      }
    },
    methods:{
      ...mapActions(['citiesCatalog']),
      next() {
        this.$refs.slick.next();
      },

      prev() {
        this.$refs.slick.prev();
      },

      reInit() {
        // Helpful if you have to deal with v-for to update dynamic lists
        this.$nextTick(() => {
          this.$refs.slick.reSlick();
        });
      }
    },
    mounted(){
      this.citiesCatalog();
    },
    computed:{
      ...mapGetters(['getCitiesCatalog'])
    },
    beforeUpdate() {
      if (this.$refs.slick) {
        this.$refs.slick.destroy();
      }
    },
    updated() {
      this.$nextTick(function () {
        if (this.$refs.slick) {
          this.$refs.slick.create(this.slickOptions);
        }
      });
    }
  }
</script>

<style lang="scss">
.cities-catalog{
  &__item-wrap{
    padding: 0 5px;
    height: 300px;
  }
  &__item-content{
    position: relative;
    display: block;
    height: 100%;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
    overflow: hidden;
    background: #e6e9ed;
    background-position: center;
    background-size: cover;
  }
  &__item-bottom{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 60px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    text-transform: uppercase;
    color: #fff;
    background: -moz-linear-gradient(top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 99%, rgba(0,0,0,1) 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top, rgba(0,0,0,0) 0%,rgba(0,0,0,1) 99%,rgba(0,0,0,1) 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,1) 99%,rgba(0,0,0,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00000000', endColorstr='#000000',GradientType=0 ); /* IE6-9 */
  }
  &__item-top{
    padding: 10px 5px;
    position: absolute;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 10px;
    text-transform: uppercase;
    background: rgba(0,0,0,.12);
    white-space: nowrap;
    color: #fff;
  }
  &__slider{
    position: relative;
    .arrows-pos{
      position: absolute;
      width: 100%;
      @include absVerticalCenter;
      @include md{
        display: none;
      }
      span{
        position: absolute;
        height: 65px;
        width: 65px;
        border-radius: 50%;
        cursor: pointer;
        -webkit-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
        -moz-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
        box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
        -webkit-transition: .2s;
        -moz-transition: .2s;
        -ms-transition: .2s;
        -o-transition: .2s;
        transition: .2s;
        background: #fff;
        &:hover{
          -webkit-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.3);
          -moz-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.3);
          box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.3);
          height: 67px;
          width: 67px;
        }
        &:first-child{
          left: -27px;
          @include absVerticalCenter;
          &:hover:after{
            opacity: 1;
          }
          &:after{
            content: '';
            position: absolute;
            @include absVertHorCenter;
            display: block;
            width: 22px;
            height: 10px;
            opacity: .5;
            background-image: url("../../assets/icons/left-arrow2.png");
          }
        }
        &:last-child{
          right: -27px;
          @include absVerticalCenter;
          &:hover:after{
            opacity: 1;
          }
          &:after{
            content: '';
            position: absolute;
            @include absVertHorCenter;
            display: block;
            width: 22px;
            height: 10px;
            opacity: .5;
            background-image: url("../../assets/icons/right-arrow2.png");
          }
        }
      }
    }
  }
}
</style>