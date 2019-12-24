<template>
  <div class="searchTable">
    <ul>
      <li>Place: <b>{{searchObj.place}}</b></li>
      <li>People: <b>{{searchObj.people}}</b></li>
      <li>Rooms: <b>{{searchObj.rooms}}</b></li>
      <li>
        <ul>Calendar:
          <li>Day: <b>{{searchObj.checkIn.day}}</b></li>
          <li>Month: <b>{{searchObj.checkIn.month}}</b></li>
          <li>Year: <b>{{searchObj.checkIn.year}}</b></li>
        </ul>
      </li>
      <li>Duration: <b>{{searchObj.duration}}</b></li>
    </ul>

  </div>
</template>

<script>
  export default {
    data(){
      return{
        searchObj: {}
      }
    },
    created(){
      this.searchObj = this.$route.params.itemReceive;
    }
  }
</script>

<style>
.searchTable{
  padding-top: 20px;
  text-align: center;
}
</style>