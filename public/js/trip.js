'use strict';
/* global $ dayModule */

/**
 * A module for managing multiple days & application state.
 * Days are held in a `days` array, with a reference to the `currentDay`.
 * Clicking the "add" (+) button builds a new day object (see `day.js`)
 * and switches to displaying it. Clicking the "remove" button (x) performs
 * the relatively involved logic of reassigning all day numbers and splicing
 * the day out of the collection.
 *
 * This module has four public methods: `.load()`, which currently just
 * adds a single day (assuming a priori no days); `switchTo`, which manages
 * hiding and showing the proper days; and `addToCurrent`/`removeFromCurrent`,
 * which take `attraction` objects and pass them to `currentDay`.
 */

function createTripModule () {
  return function(){
    // application state
    var days = [],
        currentDay;

    // jQuery selections

    var $addButton, $removeButton;
    $(function () {
      $addButton = $('#day-add');
      $removeButton = $('#day-title > button.remove');
    });

    // method used both internally and externally

    function switchTo (newCurrentDay) {
      if (currentDay) currentDay.hide();
      currentDay = newCurrentDay;
      currentDay.show();
    }

    // jQuery event binding

    $(function () {
      $addButton.on('click', addDay);
      $removeButton.on('click', deleteCurrentDay);
    });

    function addDay () {
      var newDay = dayModule.create({ number: days.length + 1 }); // dayModule
      
      /// ajax
      $.ajax({ 
          url: '/api/days', 
          method: 'POST',
          dataType: 'json',
          data: JSON.stringify(newDay),
          contentType: 'application/json' /// wow why are we confused
      })
      .then(result => {
          if (this && this.blur) this.blur(); // removes focus box from buttons
          days.push(newDay);
          if (days.length === 1) {
            currentDay = newDay;
          }
          switchTo(newDay);
      })
      .catch(err => alert('DID NOT WORK'));
      
    }

    function deleteCurrentDay () {
      // prevent deleting last day
      if (days.length < 2 || !currentDay) return;
      
      /// ajax
      $.ajax({
          url: `api/days/${currentDay.number}`,
          method: 'DELETE'
      })
      .then(result => {
          // remove from the collection
          var index = days.indexOf(currentDay),
            previousDay = days.splice(index, 1)[0],
            newCurrent = days[index] || days[index - 1];
          // fix the remaining day numbers
            days.forEach(function (day, i) {
            day.setNumber(i + 1);
          });
          switchTo(newCurrent);
          previousDay.hideButton();
      })
      .catch(err => alert('DID NOT WORK'));
      
    }

    // globally accessible module methods

    var publicAPI = {

      load: function () {
          /// ajax
          // get persisted days or not if none
          $.ajax({
              url: '/api/days',
              method: 'GET',
              dataType: 'json'
          }).then(result => {
              if (result.length) {
                  let dayobj;
                  result.forEach(day => {
                      dayobj = dayModule.create(day);
                      days.push(dayobj)
                  });
                  
                  // show last day
                  dayobj.show();
                  switchTo(dayobj);
              } else {
                  $(addDay);
              }
          }).catch(console.error.bind(console));
      },

      switchTo: switchTo,

      addToCurrent: function (attraction) {
        currentDay.addAttraction(attraction);
      },

      removeFromCurrent: function (attraction) {
        currentDay.removeAttraction(attraction);
      }

    };

    return publicAPI;
  }

};
