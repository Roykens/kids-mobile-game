angular.module('kid_game.controllers', [])

.controller('HomeCtrl', function($scope, Menu) {
  $scope.menu_lists = Menu.all();
})


.controller('MenuItemCtrl',function($scope, MenuItems, Menu,$stateParams){
  var code = $stateParams.menuCode;
  var menu = Menu.get(code);
  var menu_items = MenuItems.all(menu.id);
  $scope.menu = menu;
  $scope.menu_items = menu_items;
  if(code == 'camera'){

  }
})

.controller('MenuItemDetailCtrl',function($scope, Menu, $stateParams, $ionicSlideBoxDelegate){

  var age = localStorage.getItem("age") != null ? parseInt(localStorage.getItem("age")) : 3;
  var min_number = 60;
  var numbers = age > 3 ? min_number * age : min_number ;
  var minNumber = min_number/3;
  var menu = Menu.get($stateParams.menuCode);
  $scope.menu = menu;
  $scope.active_tab = {
    menu: $stateParams.menuCode,
    item: $stateParams.menuDetail
  };
  $scope.number_lists = rangs(0,minNumber,1,'number')
  $scope.alphabets = alphabet;
  $scope.number_readings = rangs(0,minNumber,1,'number_readings')

  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  $scope.cardSwipedLeft = function(index) {
    var menu_item_code = $stateParams.menuDetail;
    if(index == minNumber -1 && minNumber <= numbers){
        minNumber = minNumber * 3;
        new_number = numbers > minNumber ? minNumber : numbers;
        if(menu_item_code == 'counting'){
          $scope.number_lists = rangs(0,new_number,1,'number')
        } else if(menu_item_code == 'reading'){
          $scope.number_readings = rangs(0,new_number,1,'number_readings')
        }
        $ionicSlideBoxDelegate.update();
    }
  }

  function rangs(min, max, step,type){
    step = step || 1;
    var input = [];
    if(type != 'number_readings'){
      for (var i = min; i <= max; i += step) input.push(i);
    } else {
      for (var i = min; i <= max; i += step) {
        if(i == 0) input.push("Zero")
        input.push(num2word(i));
      }
    }
    return input;
  }

})

.controller('CameraCtrl', function($ionicPlatform, $rootScope, $scope, $cordovaCamera){

  $scope.takePicture = function() {
    var options = {
        quality : 75,
        destinationType : Camera.DestinationType.DATA_URL,
        sourceType : Camera.PictureSourceType.CAMERA,
        allowEdit : false,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 320,
        targetHeight: 300,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        cameraDirection: 1
    };
    $cordovaCamera.getPicture(options).then(function(imageData) {
      var image = document.getElementById('myImg');
      image.src = "data:image/jpeg;base64," + imageData;
    }, function(err) {
      alert("Error to take a photo");
    });
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