'use strict';
/* global $ tripModule */

let tripModule, dayModule, attractionModule, attractionsModule;

$(document).ready(function(){
  placeData
    .then(function(data){
      console.log(data);

      tripModule = createTripModule()();
      dayModule = createDayModule()();
      attractionModule = createAttractionModule()();
      attractionsModule = createAttractionsModule()();
      execOpts();
      tripModule.load();
    })
});
