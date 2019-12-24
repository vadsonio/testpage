<template>
  <div class="popular-apartments">
    <div class="heading">
      <h2 class="heading__bg">{{ $t("headings.popularApartments.bg") }}</h2>
      <h3 class="heading__main">{{ $t("headings.popularApartments.main") }}</h3>
    </div>
    <div class="popular-apartments__main">
      <div class="container">
        <div class="tab-panel">
          <div class="tabs">
            <div class="tab-active-overlay" :class="{'overlay-pos-left': overlayLeft, 'overlay-pos-right': overlayRight}"></div>
            <button class="tab-btn" :class="{'tab-active': overlayLeft}" @click="setActive('day')">{{ $t("btns.popularApartments.perDay")}}</button>
            <button class="tab-btn" :class="{'tab-active': overlayRight}" @click="setActive('month')">{{ $t("btns.popularApartments.perMonth")}}</button>
          </div>
          <div class="tabs-content">
            <div class="tab-content" :class="{'active-tab-content':isActive('day')}">
              <div class="popular-apartments__wrap">

                <div class="popular-apartments__item" v-if="item-1 < getApartmentsPerDay.length" v-for="(item, index) in itemsToShow" :key="index">
                  <div class="popular-apartments__item-img" :style="{backgroundImage: 'url('+ getApartmentsPerDay[index].image +')'}">
                    <div class="popular-apartments__item-hover">
                      <div class="popular-apartments__item-info">
                        <ul>
                          <li>
                            <span>{{getApartmentsPerDay[index].bathrooms}} Bathrooms</span>
                          </li>
                          <li>
                            <span>{{getApartmentsPerDay[index].sqft}} sqft</span>
                          </li>
                          <li>
                            <span>{{getApartmentsPerDay[index].bedrooms}} Bedrooms</span>
                          </li>
                          <li>
                            <span></span>
                          </li>
                          <li>
                            <a href="#">{{getApartmentsPerDay[index].location}}</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="popular-apartments__item-article">
                    <div class="popular-apartments__item-like" :class="{active: getApartmentsPerDay[index].liked}" @click="apartmentLike(getApartmentsPerDay[index].id)"></div>
                    <ul>
                      <li class="popular-apartments__item-geo"><a href="">{{getApartmentsPerDay[index].place}}</a></li>
                      <li class="popular-apartments__item-name"><a href="">{{getApartmentsPerDay[index].name}}</a></li>
                      <li class="popular-apartments__item-price">From <a href="" class="popular-apartments__item-price-light">${{getApartmentsPerDay[index].price}}</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="popular-apartments__view-more">
                <button v-if="viewMoreBtn" @click="showMore" class="btn-app btn-app--transparent_black">{{ $t("btns.viewMore") }}</button>
              </div>
            </div>

            <div class="tab-content" :class="{'active-tab-content':isActive('month')}">
              <div class="popular-apartments__wrap">

                <div class="popular-apartments__item" v-if="item-1 < getApartmentsPerMonth.length" v-for="(item, index) in itemsToShowMonth" :key="index">
                  <div class="popular-apartments__item-img" :style="{backgroundImage: 'url('+ getApartmentsPerMonth[index].image +')'}">
                    <div class="popular-apartments__item-hover">
                      <div class="popular-apartments__item-info">
                        <ul>
                          <li>
                            <span>{{getApartmentsPerMonth[index].bathrooms}} Bathrooms</span>
                          </li>
                          <li>
                            <span>{{getApartmentsPerMonth[index].sqft}} sqft</span>
                          </li>
                          <li>
                            <span>{{getApartmentsPerMonth[index].bedrooms}} Bedrooms</span>
                          </li>
                          <li>
                            <span></span>
                          </li>
                          <li>
                            <a href="#">{{getApartmentsPerMonth[index].location}}</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="popular-apartments__item-article">
                    <div class="popular-apartments__item-like" :class="{active: getApartmentsPerMonth[index].liked}" @click="apartmentLikeMonth(getApartmentsPerMonth[index].id)"></div>
                    <ul>
                      <li class="popular-apartments__item-geo"><a href="">{{getApartmentsPerMonth[index].place}}</a></li>
                      <li class="popular-apartments__item-name"><a href="">{{getApartmentsPerMonth[index].name}}</a></li>
                      <li class="popular-apartments__item-price">From <a href="" class="popular-apartments__item-price-light">${{getApartmentsPerMonth[index].price}}</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="popular-apartments__view-more">
                <button v-if="viewMoreBtnMonth" @click="showMoreMonth" class="btn-app btn-app--transparent_black">{{ $t("btns.viewMore") }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import { mapGetters, mapActions } from 'vuex';

  export default {
    data(){
      return{
        overlayLeft: true,
        overlayRight: false,
        activeTab: 'day',
        itemInfoOpen: false,
        itemsToShow: 3,
        itemsToShowMonth: 3,
        viewMoreBtn: true,
        viewMoreBtnMonth: true
      }
    },
    methods:{
      ...mapActions(['apartmentsPerDay', 'apartmentsPerMonth', 'apartmentsPerDayLike', 'apartmentsPerMonthLike']),
      setActive(tabName){
        this.activeTab = tabName;
        if(this.activeTab === 'day'){
          this.overlayLeft = true;
          this.overlayRight = false;
        } else{
          this.overlayLeft = false;
          this.overlayRight = true;
        }
      },
      isActive(tabName){
        return this.activeTab === tabName;
      },
      apartmentLike(itemId){
        this.apartmentsPerDayLike(itemId);
      },
      apartmentLikeMonth(itemId){
        this.apartmentsPerMonthLike(itemId);
      },
      showMore(){
        if(this.getApartmentsPerDay.length<this.itemsToShow){
          this.viewMoreBtn = false;
        } else{
          this.itemsToShow+=3;
        }
      },
      showMoreMonth(){
        if(this.getApartmentsPerMonth.length<this.itemsToShowMonth){
          this.viewMoreBtnMonth = false;
        } else{
          this.itemsToShowMonth+=3;
        }
      }
    },
    mounted(){
      this.apartmentsPerDay();
      this.apartmentsPerMonth();
    },
    computed:{
      ...mapGetters(['getApartmentsPerDay','getApartmentsPerMonth']),
    }
  }
</script>

<style lang="scss">
.popular-apartments{
  padding-bottom: 90px;
  &__main{
    .tab-panel{
      text-align: center;
      .tabs{
        position: relative;
        border: 1px solid #e5e5e5;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        overflow: hidden;
        display: inline-block;
        .tab-active-overlay{
          position: absolute;
          width: 150px;
          height: 50px;
          -webkit-transition: .5s;
          -moz-transition: .5s;
          -ms-transition: .5s;
          -o-transition: .5s;
          transition: .5s;
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
          background: #4588f2;
          &.overlay-pos-left{
            left: 0;
          }
          &.overlay-pos-right{
            left: 150px;
          }
        }
        .tab-btn{
          position: relative;
          width: 150px;
          height: 50px;
          border: none;
          outline: none;
          font-weight: 500;
          background: transparent;
          &.tab-active{
            color: #fff;
          }
        }
      }
      .tabs-content{
        .tab-content{
          display: none;
          &.active-tab-content{
            display: block;
          }
        }
      }
    }
  }
  &__wrap{
    display: flex;
    flex-wrap: wrap;
  }
  &__item{
    width: 33%;
    padding: 10px;
    margin-bottom: 50px;
    @include md{
      width: 50%;
    }
    @include sm{
      width: 100%;
    }
    &-img{
      margin-bottom: 20px;
      position: relative;
      height: 300px;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      overflow: hidden;
      background: #e6e9ed;
      background-position: center;
      background-size: cover;
    }
    &-hover{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      -webkit-transition: .2s;
      -moz-transition: .2s;
      -ms-transition: .2s;
      -o-transition: .2s;
      transition: .2s;
      z-index: 1;
      background: rgba(0,0,0,.6);
      @include sm{
        opacity: 1;
      }
      &:hover{
        opacity: 1;
      }
      &:hover .popular-apartments__item-info{
        display: block;
      }
    }
    &-info{
      display: none;
      padding-left: 20px;
      position: absolute;
      bottom: 5px;
      text-align: left;
      z-index: 1;
      color: #fff;
      @include sm{
        display: block;
      }
      li{
        padding-top: 2px;
        padding-left: 24px;
        padding-bottom: 6px;
        position: relative;
        opacity: 0;
        font-size: 12px;
        -webkit-animation: fadeIn 0.9s 1;
        animation: fadeIn 0.9s 1;
        -webkit-animation-fill-mode: forwards;
        animation-fill-mode: forwards;
        &:before{
          content: '';
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 18px;
          height: 18px;
          background-size: 18px 18px;
          background-repeat: no-repeat;
        }
        &:nth-child(1){
          -webkit-animation-delay: 0.1s;
          animation-delay: 0.1s;
          &:before{
            background-image: url("../../assets/icons/apartments-bath.png");
          }
        }
        &:nth-child(2){
          -webkit-animation-delay: 0.2s;
          animation-delay: 0.2s;
          &:before{
            background-image: url("../../assets/icons/apartments-sqft.png");
          }
        }
        &:nth-child(3){
          padding-bottom: 0;
          -webkit-animation-delay: 0.3s;
          animation-delay: 0.3s;
          &:before{
            background-image: url("../../assets/icons/apartments-bed.png");
          }
        }
        &:nth-child(4){
          padding: 0;
          span{
            margin-top: 15px;
            margin-bottom: 10px;
            display: block;
            width: 30px;
            height: 1px;
            background: #e8e8e8;
          }
          &:before{
            display: none;
          }
        }
        &:nth-child(5){
          padding-top: 0;
          &:before{
            width: 14px;
            height: 22px;
            background-size: 14px 18px;
            background-image: url("../../assets/icons/apartments-geo.png");
          }
          a{
            color: #e8e8e8;
          }
        }
      }
    }
    &-article{
      position: relative;
      text-align: left;
    }
    &-like{
      position: absolute;
      top: -45px;
      right: 15px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      z-index: 2;
      -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
      background: #bec7d3;
      cursor: pointer;
      &.active{
        animation-duration: .3s;
        animation-name: clickLike;
        background: #4588f2;
      }
      &:after{
        content: '';
        position: absolute;
        @include absVertHorCenter;
        display: block;
        width: 18px;
        height: 18px;
        background-size: 18px 18px;
        background-image: url("../../assets/icons/apartments-like.png");
      }
    }
    &-geo{
      a{
        font-size: 12px;
        font-weight: 500;
        text-transform: uppercase;
        color: #aab2bd;
      }
    }
    &-name{
      margin-bottom: 12px;
      a{
        font-size: 21px;
        line-height: 24px;
        font-weight: 500;
        color: #2c3e50;
        &:hover{
          text-decoration: none;
          opacity: .8;
        }
      }
    }
    &-price{
      font-weight: 500;
      line-height: 24px;
      color: #777;
      &-light{
        font-weight: 600;
        color: #4588f2;
        &:hover{
          text-decoration: none;
          opacity: .8;
        }
      }
    }
  }
}
.item-info-open{
  display: block;
}

/* Animation steps */

@-webkit-keyframes fadeIn {
  0% {
    opacity: 0.0;
  }
  100% {
    opacity: 1.0;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0.0;
  }
  100% {
    opacity: 1.0;
  }
}

/* Like on items */
@-webkit-keyframes clickLike {
  0% {
    opacity: .5;
    -webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
    -ms-transform: scale(1.1);
    -o-transform: scale(1.1);
    transform: scale(1.1);
  }
  80% {
    -webkit-transform: scale(.8);
    -moz-transform: scale(.8);
    -ms-transform: scale(.8);
    -o-transform: scale(.8);
    transform: scale(.8);
    opacity: 1;
  }
  100%{
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(.81);
  }
}

@keyframes clickLike {
  0% {
    -webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
    -ms-transform: scale(1.1);
    -o-transform: scale(1.1);
    transform: scale(1.1);
    opacity: .5;
  }
  80% {
    -webkit-transform: scale(.8);
    -moz-transform: scale(.8);
    -ms-transform: scale(.8);
    -o-transform: scale(.8);
    transform: scale(.8);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
}

</style>