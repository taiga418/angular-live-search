'use strict';

require('./app.js');
require('angular-mocks');

 var testData = [
  {
    "id": "1",
    "title": "one",
    "description": "this is test item one",
    "picture": "http://placehold.it/200x200"
  },
  {
    "id": "2",
    "title": "two",
    "description": "this is test item two",
    "picture": "http://placehold.it/200x200"
  },
  {
    "id": "3",
    "title": "one",
    "description": "this is test item three",
    "picture": "http://placehold.it/200x200"
  },
  {
    "id": "4",
    "title": "four",
    "description": "this should come up with a search term of one ",
    "picture": "http://placehold.it/200x200"
  },
  {
    "id": "5",
    "title": "five",
    "description": "this is test item five",
    "picture": "http://placehold.it/200x200"
  },
  {
    "id": "6",
    "title": "six",
    "description": "this is test item six",
    "picture": "http://placehold.it/200x200"
  },
  {
    "id": "7",
    "title": "seven",
    "description": "this is test item sevn",
    "picture": "http://placehold.it/200x200"
  }]


describe('Main Controller', function(){
  var $controllerConstructor;
  var $scope;
  var $rootScope;

  var testService = {
    data:testData
  };

  beforeEach(function(){
    angular.mock.module("app", function ($provide) {
      $provide.value("dataService", testService);
    });
  });


  beforeEach(angular.mock.inject(function(_$rootScope_, $controller){
    $scope = _$rootScope_.$new();
    $controllerConstructor = $controller;
    $rootScope = _$rootScope_;
  }));

  //note: since there are 7 items, there should be 2 pages to begin with
  it('should be able to construct a controller with the appropriate initial values', function() {
    var appController = $controllerConstructor('MainController', {$scope: $scope});
    expect(typeof appController).toBe('object');
    expect($scope.max).toBe(6); 
    expect($scope.index).toBe(1); 
    expect($scope.pagesCount).toBe(2); 
    expect($scope.len).toBe(7); 
  });

  it('should only return results that contain the search term and also paginate correctly', function(){
    $controllerConstructor('MainController', {$scope: $scope});
    $scope.search = 'one';
    $scope.$apply();
    expect($scope.pagesCount).toBe(1);
    expect($scope.len).toBe(3);
    expect($scope.filteredItems.map(function(obj){return obj.id})).toEqual(['1', '3', '4'])
  });

  it('should not return any results, and the page count should be 0', function(){
    $controllerConstructor('MainController', {$scope: $scope});
    $scope.search = 'eight';
    $scope.$apply();
    expect($scope.pagesCount).toBe(0);
    expect($scope.len).toBe(0);
  });
});

describe('Custom Filter test', function(){
  var startAtIndex;
  beforeEach(angular.mock.module('app'));
  beforeEach(inject(function(startAtIndexFilter){
    startAtIndex = startAtIndexFilter;
  }));

  it('should return the 7th element on page 2', function(){
    expect(startAtIndex(testData,6).map(function(obj){return obj.id})).toEqual(['7'])
  });

   it('should return an empty array', function(){
    expect(startAtIndex(testData,7).map(function(obj){return obj.id})).toEqual([])
  });

});
