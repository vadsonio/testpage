<template>
  <div class="dialogues">
    <div class="heading">
      <h2 class="heading__bg">{{ $t("headings.dialogues.bg") }}</h2>
      <h3 class="heading__main">{{ $t("headings.dialogues.main") }}</h3>
    </div>
    <div class="container">
      <div class="dialogues__row">
        <div class="dialogues__column">
          <Phone :chatNumb="1" :userId="2"/>
        </div>
        <div class="dialogues__column">
          <Phone :chatNumb="1" :userId="1"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Phone from './Dialogues/Phone';

  export default{
    components:{
      Phone
    }
  }
</script>

<style lang="scss">
  .dialogues{
    margin-top: 40px;
    &__row{
      display: flex;
      flex-wrap: wrap;
    }
    &__column{
      padding: 10px;
      width: 50%;
      @include md{
        width: 100%;
      }
    }
  }
</style>