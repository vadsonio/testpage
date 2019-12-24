<template>
  <div class="search-block select" :class="customClass">
    <label class="search-block__label">
      {{label}}
    </label>
    <div class="checkOut-text">
      {{dateCalc}}
    </div>
  </div>
</template>

<script>
  export default{
    props: ['customClass', 'label', 'dateToCalc', 'duration'],
    data(){
      return {
        dateParams: this.dateToCalc,
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
        checkOutDay: "",
        checkOutMonth: "",
        checkOutYear: ""
      }
    },
    computed:{
      dateCalc(){
        let newDate = new Date(this.dateParams.year, this.dateParams.month, this.dateParams.day);

        let thisYear = new Date().getFullYear();
        if(this.dateParams.year<thisYear){
          return '-';
        }

        function countDate(date, days){
          const copy = new Date(Number(date));
          copy.setDate(date.getDate() + days);
          return copy;
        }
        let lastDate = countDate(newDate, this.duration);

        this.checkOutDay = lastDate.getDate();
        this.checkOutMonth = this.monthes[lastDate.getMonth()];
        this.checkOutYear = lastDate.getFullYear();

        return `${this.checkOutDay} ${this.checkOutMonth} ${this.checkOutYear}`;
      }
    }
  }
</script>

<style lang="scss">
.checkOut-text{
  height: 35px;
  display: flex;
  align-items: center;
  font-size: 14px;
}
.search-block{
  &.check-out{
    min-width: 100px;
  }
}

</style>