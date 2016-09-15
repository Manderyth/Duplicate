// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
    'ionic', 
    'starter.controllers', 
    'firebase',
    'ngStorage',
    'spotify'
    ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC3cguFGoP4tLHugGGeRr3npX9_HlRrq08",
    authDomain: "musicapp-e2e06.firebaseapp.com",
    databaseURL: "https://musicapp-e2e06.firebaseio.com",
    storageBucket: "musicapp-e2e06.appspot.com"
  };
  firebase.initializeApp(config);

})

.config(function($stateProvider, $urlRouterProvider, SpotifyProvider) {
  console.log(SpotifyProvider);
  SpotifyProvider.setClientId('e306aea3736541b2a3c06a1d832a5a96');
  SpotifyProvider.setRedirectUri('http://localhost:8100/#/tab/artist');
  SpotifyProvider.setScope('user-read-private playlist-read-private playlist-modify-private playlist-modify-public');
  // If you already have an auth token
  // SpotifyProvider.setAuthToken('zoasliu1248sdfuiknuha7882iu4rnuwehifskmkiuwhjg23');
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  console.log(SpotifyProvider);
  $stateProvider
      
  .state('landing', {
  url: '/landing',
  templateUrl: 'templates/landing.html',
  controller: 'landingCtrl',
    controllerAs: 'vm'
  })

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.artist', {
    url: '/artist',
    views: {
      'tab-artist': {
        templateUrl: 'templates/tab-artist.html',
        controller: 'ArtistCtrl',
        controllerAs: "vm"
      }
    }
  })

  .state('tab.songs', {
      url: '/songs',
      views: {
        'tab-songs': {
          templateUrl: 'templates/tab-songs.html',
          controller: 'SongsCtrl'
        }
      }
    })
    .state('tab.song-detail', {
      url: '/songs/:songId',
      views: {
        'tab-songs': {
          templateUrl: 'templates/songs-detail.html',
          controller: 'SongsDetailCtrl'
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
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/landing');

});
