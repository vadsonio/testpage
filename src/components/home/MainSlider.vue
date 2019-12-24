<template>
  <div class="main-slider">
    <slick ref="slick" :options="slickOptions">
      <div class="main-slider__item" style="background-image: url('https://www.roughguides.com/wp-content/uploads/2013/05/hallstatt-austria-shutterstock_776948347.jpg');"></div>
      <div class="main-slider__item" style="background-image: url('https://www.roughguides.com/wp-content/uploads/2013/05/hallstatt-austria-shutterstock_776948347.jpg');"></div>
      <div class="main-slider__item" style="background-image: url('https://www.roughguides.com/wp-content/uploads/2013/05/hallstatt-austria-shutterstock_776948347.jpg');"></div>
    </slick>
    <div class="container arrows-pos" style="position:relative; height: 100%;">
      <span id="arrow-left"></span>
      <div class="slider-text">
        <p class="slider-text__top">{{ $t("proposes.saveSubText") }}</p>
        <p class="slider-text__main">{{ $t("proposes.saveMainText") }}</p>
        <a href="" class="btn-app btn-app--transparent_white">{{ $t("btns.learnMore") }}</a>
      </div>
      <span id="arrow-right"></span>
    </div>
  </div>
</template>

<script>
  import Slick from 'vue-slick';

  export default{
    components: { Slick },
    data(){
      return{
        slickOptions: {
          slidesToShow: 1,
          swipe: false,
          prevArrow: '#arrow-left',
          nextArrow: '#arrow-right'
          // Any other options that can be got from plugin documentation
        }
      }
    },
    methods:{
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
    }
  }
</script>

<style lang="scss">
.main-slider{
  position: relative;
  &__item{
    width: 100%;
    height: 500px;
    -webkit-background-size: cover;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .slick-prev,
  .slick-next{
    display: none;
  }
  .arrows-pos{
    position: absolute!important;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 100%;
  }
  #arrow-left{
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    opacity: .75;
    cursor: pointer;
    &:hover{
      opacity: .4;
    }
    &::before{
      content: url("../../assets/icons/left-arrow.png");
    }
  }
  #arrow-right{
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    opacity: .75;
    cursor: pointer;
    &:hover{
      opacity: .4;
    }
    &:before{
      content: url("../../assets/icons/right-arrow.png");
    }
  }
  .slider-text{
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%,-50%);
    text-align: center;
    color: #fff;
    &__top{
      margin-bottom: 0;
      font-size: 35px;
      @include md{
        margin-bottom: 15px;
        font-size: 25px;
      }
    }
    &__main{
      font-size: 45px;
      text-transform: uppercase;
      font-weight: 600;
      @include md{
        margin-bottom: 25px;
        font-size: 25px;
      }
    }
  }
}
</style>