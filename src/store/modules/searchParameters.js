import axios from 'axios';
import _ from 'lodash';

import citiesCatalog from '../../FakeJson/CitiesCatalog';
import apartmentsPerDay from '../../FakeJson/PopularApartments';
import apartmentsPerMonth from '../../FakeJson/PopularApartmentsMonth';

export default {
  actions: {
    setPlaces(context){
      let places;
      axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response=>{
          places=response;
          context.commit('updatePlaces', places.data);
        })
    },
    citiesCatalog(context){
      context.commit('updateCitiesCatalog', citiesCatalog.cities);
    },
    apartmentsPerDay(context){
      context.commit('updateApartmentsPerDay', apartmentsPerDay.apartments);
    },
    apartmentsPerMonth(context){
      context.commit('updateApartmentsPerMonth', apartmentsPerMonth.apartments);
    },
    apartmentsPerDayLike(context, itemId){
      let arrayApartments = this.state.searchParameters.apartments.perDay;
      _.find(arrayApartments, function(item){
        if(itemId === item.id){
          console.log(item);
          item.liked===true ? item.liked=false : item.liked=true;
        }
      });
    },
    apartmentsPerMonthLike(context, itemId){
      let arrayApartments = this.state.searchParameters.apartments.perMonth;
      _.find(arrayApartments, function(item){
        if(itemId === item.id){
          console.log(item);
          item.liked===true ? item.liked=false : item.liked=true;
        }
      });
    }
  },
  mutations: {
    updatePlaces(state, places){
      state.places = places;
    },
    updateCitiesCatalog(state, citiesCatalog){
      state.citiesCatalog = citiesCatalog;
    },
    updateApartmentsPerDay(state, apartmentsPerDay){
      state.apartments.perDay = apartmentsPerDay;
    },
    updateApartmentsPerMonth(state, apartmentsPerDay){
      state.apartments.perMonth = apartmentsPerDay;
    }
  },
  state: {
    places: [],
    citiesCatalog: [],
    apartments: {
      perDay: [],
      perMonth: []
    }
  },
  getters:{
    getPlaces(state){
      return state.places;
    },
    getCitiesCatalog(state){
      return state.citiesCatalog;
    },
    getApartmentsPerDay(state){
      return state.apartments.perDay;
    },
    getApartmentsPerMonth(state){
      return state.apartments.perMonth;
    }
  }
}