<template>
  <div class="search-panel">
    <div class="container">
      <div class="search-panel__wrap">
        <div class="row space-between">
          <InputCustom
                  :customClass="place.customClass"
                  :placeholderValue="$t('placeholders.cityChoose')"
                  :label="$t('labels.cityChoose')"
                  :options="place.options"
                  @input="setPlace($event)"/>
          <SelectCustom
                  :customClass="people.customClass"
                  :placeholderValue="$t('placeholders.peopleChoose')"
                  :placeholderAdd="people.placeholderAdd"
                  :label="$t('labels.peopleChoose')"
                  :options="people.options"
                  @input="setPeople($event)"/>
          <SelectCustom
                  :customClass="room.customClass"
                  :placeholderValue="$t('placeholders.roomChoose')"
                  :placeholderAdd="room.placeholderAdd"
                  :label="$t('labels.roomChoose')"
                  :options="room.options"
                  @input="setRooms($event)"/>
        </div>
        <div class="row space-between">
          <DatePicker
                  :label="$t('labels.checkIn')"
                  :placeholderProp="$t('placeholders.datePickerPlaceholder')"
                  @input="setDate($event)"/>
          <SelectCustom
                  :customClass="duration.customClass"
                  :placeholderValue="$t('placeholders.durationChoose')"
                  :placeholderAdd="duration.placeholderAdd"
                  :label="$t('labels.durationChoose')"
                  :options="duration.options"
                  @input="setDuration($event)"/>
          <CheckOutBlock
                  :customClass="checkOut.customClass"
                  :label="$t('labels.checkOut')"
                  :dateToCalc="searchObject.checkIn"
                  :duration="searchObject.duration"/>
          <div class="search-block__submit">
            <button class="btn-app btn-app--filled_blue" :class='{"isActive": activeBtn}' @click="submitMain">{{ $t("btns.search") }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import InputCustom from '../InputCustom';
  import SelectCustom from '../SelectCustom';
  import DatePicker from '../DatePicker';
  import CheckOutBlock from '../CheckOutBlock';

  export default {
    data(){
      return{
        place: {
          customClass: 'place'
        },
        people: {
          placeholder: 'Choose guests...',
          placeholderAdd: 'people',
          customClass: 'people',
          options: [1,2,3,4,5]
        },
        room: {
          placeholder: 'Choose rooms...',
          placeholderAdd: 'room',
          customClass: 'room',
          options: [1,2,3,4,5]
        },
        searchObject: {
          place: "",
          people: "",
          rooms: "",
          checkIn: {
            day: "",
            month: "",
            year: ""
          },
          duration: ""
        },
        duration:{
          placeholder: 'Choose duration...',
          placeholderAdd: 'duration',
          customClass: 'duration',
          options: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
        },
        checkOut:{
          customClass: "check-out",
          placeholder: ""
        },
        activeBtn: true
      }
    },
    components:{
      SelectCustom,
      InputCustom,
      DatePicker,
      CheckOutBlock
    },
    methods:{
      setPlace(str){
        this.searchObject.place = str;
      },
      setPeople(str){
        this.searchObject.people = str;
      },
      setRooms(str){
        this.searchObject.rooms = str;
      },
      setDate(obj){
        this.searchObject.checkIn.day = obj.date;
        this.searchObject.checkIn.month = obj.month;
        this.searchObject.checkIn.year = obj.year;
      },
      setDuration(str){
        this.searchObject.duration = str;
      },
      submitMain(){
        this.$router.push({
          name:'search',
          params: {
            itemReceive: this.searchObject
          }
        });
      }
    },
    watch:{
      searchObject:{
        deep: true,
          handler(completeObj){
            if(
              completeObj.place != "" &&
              completeObj.people != "" &&
              completeObj.rooms !="" &&
              completeObj.checkIn.day != "" &&
              completeObj.duration != ""
            ){
              this.activeBtn = false;
            } else{
              this.activeBtn = true;
            }
          }
      }
    }
  }
</script>

<style lang="scss">
  .search-panel{
    position: relative;
    margin-top: -130px;
    &__wrap{
      margin: 0 auto;
      padding: 25px 0;
      width: 100%;
      max-width: 1100px;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.45);
      box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.45);
      background: #fff;
      .row{
        margin: 0;
      }
      @include rwd(2000){
        // max-width: 1100px;
      }
      @include rwd(1800){
        max-width: 800px;
      }
    }
  }
  .search-block__submit{
    .btn-app{
      text-align: center;
      width: 100%;
      -webkit-transition: .2s;
      -moz-transition: .2s;
      -ms-transition: .2s;
      -o-transition: .2s;
      transition: .2s;
      &:hover{
        text-decoration: none;
        color: #fff;
      }
      &--filled_blue{
        color: #fff;
        &.isActive{
          cursor: not-allowed;
          pointer-events: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          color: #fff;
          background: #cfd8dc;
        }
      }
      &:before{
        content: '';
        display: block;
        position: absolute;
        height: 15px;
        width: 15px;
        background-image: url("../../assets/icons/search-submit.png");
      }
    }
  }

</style>