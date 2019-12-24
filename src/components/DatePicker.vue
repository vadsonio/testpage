<template>
    <div class="search-block datepicker">
      <label class="search-block__label">
        {{label}}
      </label>
      <div class="search-block__active" v-click-outside="hide">
        <div class="parentElement">
          <div class="calendar" ref="itemWrap">
            <div class="placeholderBlock" @click="showCalendar=!showCalendar">{{datePlaceholder}}</div>
            <transition name="fadeInList">
              <div class="hidden-field" v-if="showCalendar" >
                <div class="calendar-arrows">
                  <button @click="activeMonthIndexPrev" class="arrow arrow-pre"></button>
                  <button @click="activeMonthIndexNext" class="arrow arrow-next"></button>
                </div>
                <div v-for="(month, index) in monthes" :key="month.id">
                  <div v-if="index==activeMonthIndex" class="month-item">
                    <div class="current-mm-yy">{{month}} {{year}}</div>
                    <div class="days-wrap" ref="daysWrap">
                      <div
                              class="days-item days-item__name"
                              v-for="dayName in dayNames"
                              :key="dayName.id"
                      >{{dayName}}</div>
                      <div
                              v-for="item in monthToShow[index]"
                              :key="item.id"
                              class="days-item"
                              @click="countDate(item, month)"
                              :class="{'todayItem': getToday(item), 'selectedItem': selectedItem(item)}"
                      >{{item}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
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
    props: ['label', 'placeholderProp'],
    data() {
      return {
        monthes: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "June",
          "July",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec"
        ],
        dayNames: ["M", "T", "W", "T", "F", "S", "Su"],
        days: [],
        firstDays: [],
        year: "",
        monthToShow: [],
        // placeholder: this.$i18n.t('placeholders.datePickerPlaceholder'),
        placeholder: "",
        activeMonthIndex: 0,
        todayIs: 0,
        showCalendar: false,
        selectedDate: {
          date: "",
          month: "",
          year: ""
        }
      };
    },
    methods: {
      getfirstDaysOfMonth() {
        this.firstDays = [];
        for (let i = 0; i < this.monthes.length; i++) {
          let day = new Date(this.year, i, 1).getDay();
          this.firstDays.push(day);
        }
      },
      countDays() {
        this.days = [];
        for (let i = 1; i <= this.monthes.length; i++) {
          this.days.push(new Date(this.year, i, 0).getDate());
        }
      },
      countDate(day, month) {
        if (day === "") {
          return false;
        }
        if(this.year === new Date().getFullYear() && this.activeMonthIndex === (new Date().getMonth())){
          if(day<new Date().getDate()){
            return false;
          }
        }
        let dateToGo = `${day} ${month} ${this.year}`;
        this.selectedDate.date = day;
        this.selectedDate.month = this.activeMonthIndex;
        this.selectedDate.year = this.year;
        this.placeholder = dateToGo;
        this.showCalendar = false;
        this.$emit('input', this.selectedDate);
      },
      countCurrentMonthIndex() {
        let currentMonth = new Date().getMonth();
        this.activeMonthIndex = currentMonth;
      },
      getMonthesWeekDays() {
        this.monthToShow = [];
        for (let i = 0; i < this.firstDays.length; i++) {
          let arr = [];
          if (this.firstDays[i] === 0) {
            arr.push("", "", "", "", "", "");
          }
          for (let j = 1; j < this.firstDays[i]; j++) {
            arr.push("");
          }
          this.monthToShow.push(arr);
        }
        for (let i = 0; i < this.days.length; i++) {
          for (let j = 1; j <= this.days[i]; j++) {
            this.monthToShow[i].push(j);
          }
        }
      },
      activeMonthIndexNext() {
        if (this.activeMonthIndex > 10) {
          this.activeMonthIndex = 0;
          this.year++;
        } else {
          this.activeMonthIndex++;
        }
      },
      activeMonthIndexPrev() {
        if(this.year === new Date().getFullYear() && this.activeMonthIndex === (new Date().getMonth())){
          return false;
        }
        if (this.activeMonthIndex < 1) {
          this.activeMonthIndex = 11;
          this.year--;
        } else {
          this.activeMonthIndex--;
        }
      },
      getToday(item) {
        let todayDay = new Date().getDate();
        let todayMonth = new Date().getMonth();
        let todayYear = new Date().getFullYear();
        this.todayIs = todayDay;
        if (
          todayMonth === this.activeMonthIndex &&
          todayDay === item &&
          this.year === todayYear
        ) {
          return true;
        }
      },
      selectedItem(day) {
        if (
          this.selectedDate.date === day &&
          this.selectedDate.month === this.activeMonthIndex &&
          this.selectedDate.year === this.year
        ) {
          return true;
        } else {
          return false;
        }
      },
      hide () {
        this.showCalendar = false
      }
    },
    mounted() {
      let yearNumb = new Date().getFullYear();
      this.year = Number(yearNumb);
      this.getfirstDaysOfMonth();
      this.countDays();
      this.countCurrentMonthIndex();
      this.getMonthesWeekDays();
      this.getToday();
    },
    computed: {
      datePlaceholder(){
        if(this.placeholder===""){
          return this.$i18n.t('placeholders.datePickerPlaceholder');
        } else {
          return this.placeholder;
        }
      }
    },
    watch: {
      year() {
        this.getfirstDaysOfMonth();
        this.countDays();
        this.getMonthesWeekDays();
      }
    }
  };
</script>

<style lang="scss">
.search-block{
  &.datepicker {
    @include lg{
      width: calc(50% - 30px);
    }
    @include sm{
      width: 100%;
    }
    .search-block__active {
      position: relative;
      padding-right: 25px;
      overflow: unset;
      &:after{
        content: "";
        display: block;
        position: absolute;
        top: 10px;
        right: 8px;
        width: 8px;
        height: 8px;
        border-right: 1px solid #333;
        border-bottom: 1px solid #333;
        transform: rotate(45deg);
      }
      &:before{
        background-image: url("../assets/icons/search-calendar.png");
      }
    }
  }
}
.parentElement {
  width: 100%;
  height: 100%;
}
.hidden-field{
  position: absolute;
  left: 0;
  background: #fff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.45);
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  top: calc(100% + 5px);
  z-index: 1;
}
.calendar {
  height: 100%;
}
.placeholderBlock {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.month-item {
  width: 100%;
}
.days-wrap {
  padding: 0 auto;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.days-item__name:nth-child(6),
.days-item__name:nth-child(7) {
  color: #F1948A;
}
.days-item {
  padding: 2px;
  width: calc(100% / 7);
  text-align: center;
  cursor: pointer;
}
.days-item:hover {
  background: #eee;
}
.current-mm-yy {
  margin-bottom: 10px;
  text-align: center;
  font-size: 13px;
}
.todayItem {
  background: #ABEBC6;
}
.selectedItem {
  background: #D6EAF8;
}
.calendar-arrows {
  padding-top: 10px;
  display: flex;
  justify-content: space-between;
}
.arrow {
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  outline: none;
  background: transparent;
}
.arrow-pre:after {
  position: absolute;
  top: 35%;
  left: 40%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  content: "";
  display: block;
  width: 8px;
  height: 8px;
  border-left: 1px solid #333;
  border-bottom: 1px solid #333;
  transform: rotate(45deg);
}
.arrow-next:after {
  position: absolute;
  top: 35%;
  left: 30%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  content: "";
  display: block;
  width: 8px;
  height: 8px;
  border-right: 1px solid #333;
  border-bottom: 1px solid #333;
  transform: rotate(-45deg);
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