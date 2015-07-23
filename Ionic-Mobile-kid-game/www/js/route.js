configs= angular.module("configs")
configs.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('tab.dash_menu_item', {
    url: '/dash/:menuCode',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash-items.html',
        controller: 'MenuItemCtrl'
      }
    }
  })

  .state('tab.dash_menu_item_detail', {
    url: '/dash/:menuCode/:menuDetail',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash-item-details.html',
        controller: 'MenuItemDetailCtrl'
      }
    }
  })

  .state('tab.dash-camera', {
    url: '/dash/camera',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash-camera.html',
        controller: 'CameraCtrl'
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })


  $urlRouterProvider.otherwise('/tab/dash');

});