<template>
  <div class="main-page-root">
    <MainSlider/>
    <SearchPanel/>
    <CitiesCatalog/>
    <PopularApartments/>
    <GetStartedPanel/>
    <Dialogues/>
    <ModalWindow/>
  </div>
</template>

<script>
  import MainSlider from './home/MainSlider';
  import SearchPanel from './home/SearchPanel';
  import CitiesCatalog from './home/CitiesCatalog';
  import PopularApartments from './home/PopularApartments';
  import GetStartedPanel from './home/GetStartedPanel';
  import Dialogues from './home/Dialogues';
  import ModalWindow from './home/ModalWindow';

  export default {
    data(){
      return{

      }
    },
    components:{
      MainSlider,
      SearchPanel,
      CitiesCatalog,
      PopularApartments,
      GetStartedPanel,
      Dialogues,
      ModalWindow
    }
  }
</script>

<style>

</style>