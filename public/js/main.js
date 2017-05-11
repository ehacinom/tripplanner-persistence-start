'use strict';
/* global $ tripModule */

let tripModule, dayModule, attractionModule, attractionsModule;

// tripModule = createTripModule()();
// dayModule = createDayModule()();
// attractionModule = createAttractionModule()();
// attractionsModule = createAttractionsModule()();



$(document).ready(function(){
  placeData
    .then(function(data){
      console.log('main.js data');
      console.log(data);

      tripModule = createTripModule()();
      dayModule = createDayModule()();
      attractionModule = createAttractionModule()();
      attractionsModule = createAttractionsModule()();
      execOpts();
      tripModule.load();
    })
});
