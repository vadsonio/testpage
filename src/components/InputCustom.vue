<template>
  <div class="search-block input" :class="customClass">
    <label class="search-block__label">
      {{label}}
    </label>
    <div class="search-block__active" v-click-outside="hide">
      <input type="text" :placeholder="placeholderValue" v-model="searchItem" @keydown="enableList">
      <transition name="fadeInClose">
        <span class="search-block__clear" v-if="searchItem" @click="clearPlaceholder">&times;</span>
      </transition>
    </div>
    <transition name="fadeInList">
      <div class="search-block__list" v-if="showList">
        <ul>
          <li
                  v-for="(place, index) in showLimit"
                  :key="place.id"
                  @click="userClick(place.name)"
                  :class='{"choosedItem": chooseItem === index}'>{{place.name}} </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import _ from 'lodash';
  import Vue from 'vue';

  let hideModals;
  Vue.directive('click-outside', {
    bind: function (el, binding, vnode) {
      hideModals = function (event) {
        if (!(el == event.target || el.contains(event.target))) {
          vnode.context[binding.expression](event);
        }
      };
      document.body.addEventListener('click', hideModals)
    },
    unbind: function (el) {
      document.body.removeEventListener('click', hideModals)
    }
  });

  export default {
    props:['customClass','label', 'options', 'placeholderValue'],
    data(){
      return{
        searchItem: '',
        clickedNew: false,
        showList: false,
        chooseItem: false
      }
    },
    methods:{
      ...mapActions(['setPlaces']),
      userClick(placeName){
        this.searchItem = placeName;
        this.clickedNew = true;
        this.showList= false;
        this.$emit('input', this.searchItem);
      },
      enableList(){
        this.clickedNew = false;
        // this.userClick(this.searchItem);

      },
      hide() {
        this.showList = false
      },
      nextItem(){
        if(this.chooseItem ===false){
          this.chooseItem = 0;
        }
        if (event.keyCode == 38 && this.chooseItem > 0) {
          this.chooseItem--
        } else if (event.keyCode == 40 && this.chooseItem < 4) {
          this.chooseItem++
        }
      },
      clearPlaceholder(){
        this.searchItem = "";
        this.userClick("");
      },
      savePlaceholder(){
        if(this.searchItem.length>=0){
          this.clickedNew = true;
          this.$emit('input', this.searchItem);
        }
      }
    },
    watch:{
      searchItem(newItem){
        if(this.clickedNew===false){
          newItem.length>0 ? this.showList=true : this.showList=false
        }
      }
    },
    mounted(){
      this.setPlaces();
      document.addEventListener("keyup", this.savePlaceholder);
    },
    computed:{
      ...mapGetters(['getPlaces']),
      showLimit(){
        let filterPlaces;
        let self = this;
        filterPlaces = _.filter(this.getPlaces, item=>{
          let itemName = item.name.toLowerCase();
          return itemName.indexOf(this.searchItem.toLowerCase())>-1;
        });
        (filterPlaces.length==0) ? self.showList=false : self.showList=true;
        return filterPlaces.slice(0, 5);
      }
    }
  }
</script>

<style lang="scss">
  .search-block{
    &.place{
      width: 100%;
      max-width: 300px;
      .search-block__active:before{
        background-image: url("../assets/icons/search-map.png");
      }
      li{
        -webkit-transition: .2s;
        -moz-transition: .2s;
        -ms-transition: .2s;
        -o-transition: .2s;
        transition: .2s;
        &:hover {
          padding-left: 5px;
        }
        &.choosedItem{
          background: #999;
        }
      }
      @include lg{
        width: 100%;
        max-width: unset;
      }
    }
  }
  .fadeInClose-enter-active{
    animation: fadeInClose .5s;
  }
  .fadeInClose-leave-active{
    animation: fadeInClose .5s reverse;
  }
  @keyframes fadeInClose{
    0%{
      right: -50px;
    }
    80%{
      right: 15px;
    }
    100%{
      right: 10px;
    }
  }

  .fadeInList-enter-active{
    animation: fadeInList .5s;
  }
  .fadeInList-leave-active{
    animation: fadeInList .3s reverse;
  }
  @keyframes fadeInList{
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