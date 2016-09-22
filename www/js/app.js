// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('musicapp', [
    'ionic', 
    'musicapp.controllers', 
    'firebase',
    'ngStorage'
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

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  

  .state('callback',{
    url: '/callback',
    templateUrl: 'templates/callback.html',
    controller: 'callbackCtrl',
      controllerAs: 'vm'
  })

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



// app.directive('ngSoundcloud', function ($http) {
//     function link(scope) {
//       console.log("SoundCloud directive")
//       var clientid = 'b23455855ab96a4556cbd0a98397ae8c';
//         $http({
//             method: 'GET',
//             url: 'http://api.soundcloud.com/tracks/'+scope.track+'.json?client_id='+clientid
//         }).
//         success(function (data) {
//             console.log(data)
//             scope.band = data.user.username;
//             scope.bandUrl = data.user.permalink_url;
//             scope.title = data.title;
//             scope.trackUrl = data.permalink_url;
//             scope.albumArt = data.artwork_url.replace("large", "t500x500");
//             scope.wave = data.waveform_url;
//             scope.stream = data.stream_url + '?client_id=' + clientid;
//             scope.song = new Audio();
//         });
//         scope.playing = false;
//         scope.play = function () {
//             scope.playing = !scope.playing;
//             if (!scope.playing) {
//               scope.song.pause();
//             }
//           else
//             {
//               if (scope.song.src == '') {scope.song.src = scope.stream;}
//               scope.song.play();
//             }
//         }
//     }
//     return {
//         restrict: 'E',
//         scope: {
//             track: '=track',
//         },
//         // template: document.getElementById('template').innerHTML,
//         link: link
//     };
// });