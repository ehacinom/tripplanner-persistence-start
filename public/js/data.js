let hotels = [];
let restaurants = [];
let activities = [];

var placeData = (function () {

  let hotelsAjax = $.ajax({
    url: '/api/hotels',
    method: "GET",
    dataType: "json"
  });

  let restaurantsAjax = $.ajax({
    url: '/api/restaurants',
    method: "GET",
    dataType: "json"
  });
  let activitiesAjax = $.ajax({
    url: '/api/activities',
    method: "GET",
    dataType: "json"
  });


  return hotelsAjax
    .then((result) => {
      hotels = result;
      return restaurantsAjax;
    })
    .then((result) => {
      restaurants = result
      return activitiesAjax;
    })
    .then((result) => {
      activities = result
      // console.log('hit this', result)
      return {
        hotels: hotels,
        restaurants: restaurants,
        activities: activities,
      }
    })
    .catch(console.log);


}());
