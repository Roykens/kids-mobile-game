angular.module('kid_game.controllers', [])

.controller('HomeCtrl', function($scope, Menu) {
  $scope.menu_lists = Menu.all();
})


.controller('MenuItemCtrl',function($scope, MenuItems, Menu,$stateParams){
  var menu = Menu.get($stateParams.menuCode);
  var menu_items = MenuItems.all(menu.id);
  $scope.menu = menu;
  $scope.menu_items = menu_items;
})

.controller('MenuItemDetailCtrl',function($scope, Menu, $stateParams, $ionicSlideBoxDelegate){

  var age = localStorage.getItem("age") != null ? parseInt(localStorage.getItem("age")) : 3;
  var min_number = 60;
  var numbers = age > 3 ? min_number * age : min_number ;

  var menu = Menu.get($stateParams.menuCode);
  $scope.menu = menu;
  $scope.limit_number = numbers;
  $scope.active_tab = {
    menu: $stateParams.menuCode,
    item: $stateParams.menuDetail
  };

  $scope.alphabets = alphabet;
   $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  $scope.cardSwipedLeft = function() {
    $scope.addRandom();
    // $scope.index_number = parseInt(index) + 1
  }

  $scope.cardSwipedRight = function() {
    $scope.addRandom();
    // $scope.index_number = parseInt(index) - 1
  }

  $scope.range = function(min, max, step){
    step = step || 1;
    var input = [];
    for (var i = min; i <= max; i += step) input.push(i);
    return input;
  };

  $scope.random = ['0','A'];
  $scope.addRandom = function(){
    $scope.random.push(Math.floor((Math.random()* numbers)+1));
  }

})

.controller('AccountCtrl',function($scope){
  var age = localStorage.getItem("age") != null ? parseInt(localStorage.getItem("age")) : 3 ;
  $scope.settings = {
    age: age
  };
  $scope.saveSetting = function(){
    var age = $scope.settings.age;
    localStorage.setItem('age',JSON.parse(age))
    $scope.settings = {
      age: age
    }
  }
})