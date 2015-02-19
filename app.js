'use strict';


require('angular/angular');

var app = angular.module('app',[]);

app.factory('dataService', function(){
  var service = {};
  service.data = require('./data');
  return service;
});

app.controller('MainController', ['$scope', 'filterFilter','dataService' ,function($scope, filterFilter, dataService){
  $scope.data = dataService.data;
  $scope.max = 6; //max number of results per page. 
  $scope.index = 1; //current page number
  $scope.filteredItems = $scope.data; //data after it has been filtered, but will start unfiltered
  $scope.pagesCount = Math.ceil($scope.filteredItems.length/$scope.max); //number of pages
  $scope.len = $scope.filteredItems.length; //length of the filtered data array.
    
    //watches for changes in search input, and re-filters the array accordingly,
    //while also reseting page number and total number of pages. 
  $scope.$watch('search', function(){
    $scope.index = 1        
    $scope.filteredItems = filterFilter($scope.data, $scope.search);
    if($scope.search.length==0) {
      filteredItems = $scope.data;
    }
    $scope.len = $scope.filteredItems.length;
    $scope.pagesCount = Math.ceil($scope.filteredItems.length/$scope.max)
  });
    
    //moves to next page of results. 
  $scope.nextPage = function(){
    $scope.index =  $scope.index + 1; 
  }

  //moves back to previous page of results.
  $scope.prevPage = function(){
    $scope.index = $scope.index - 1; 
  }

}]);

//custom filter to help with pagination 
app.filter('startAtIndex', function(){
  return function(input, index){
    index = +index;
    return input.slice(index);
  }
});

