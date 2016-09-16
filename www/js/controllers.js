angular.module('starter.controllers', [])



.controller('ArtistCtrl', function($http) {
  vm = this;
  vm.soundCloudData = soundCloudData;

  function soundCloudData(track){
    var clientid = 'a8899b413fa9931c7bf9b07305acf27f';
    $http({
        method: 'GET',
        url: 'http://api.soundcloud.com/tracks/'+track+'.json?client_id='+clientid
      }).
      success(function (data){
        var searchData = [{
          band: data.user.username,
          bandUrl: data.user.permalink_url,
          title: data.title,
          trackUrl: data.permalink_url,
          albumArt: data.artwork_url.replace("large","t500x500"),
          wave: data.waveform_url,
          stream: data.stream_url + '?client_id=' + clientid
        }];
        vm.soundResults = searchData;
        console.log(vm.soundResults);
        return searchData;
      })
  }

  var searchData = function(users) {
    var clientid = 'a8899b413fa9931c7bf9b07305acf27f';
        $http({
          method: 'GET',
          url: 'http://api.soundcloud.com/users/' + users + '.json?client_id=' + clientid
      })

    vm.soundResults = searchData;
    console.log(vm.soundResults);
    return searchData;
  }; // closes search()

}) //closes ArtistCtrl

.controller('landingCtrl', function ($http,$scope, $firebaseAuth, $state, $log, $firebaseObject) {
  vm = this;
  vm.login = login;
  vm.showLogin = false;
  vm.loginWithEmail = loginWithEmail;
  vm.showEmailLogin = showEmailLogin;
  vm.logout = logout;

  function login(provider) {
    var auth = $firebaseAuth();

    auth.$signInWithPopup(provider)
        .then(loginSuccess)
        .catch(loginError);
  }

  function showEmailLogin() {
    vm.showLogin = !vm.showLogin;
  }

  function loginWithEmail() {
    var auth = $firebaseAuth();
    auth.$createUserWithEmailAndPassword(vm.email, vm.password)
        .then(function () {
          auth.$signInWithEmailAndPassword(vm.email, vm.password)
              .then(loginSuccess)
              .catch(loginError);
        }, function (error) {
          if (error.code === "auth/email-already-in-use") {
            auth.$signInWithEmailAndPassword(vm.email, vm.password)
                .then(loginSuccess)
                .catch(loginError);
          } else {
            $log.error(error);
          }
        })
        .catch(loginError);
  }

  function loginSuccess(firebaseUser) {
    $log.log(firebaseUser);
    vm.displayName = firebaseUser.user ? firebaseUser.user.displayName : firebaseUser.email;
    vm.showLogin = false;
    vm.password = undefined;

    vm.providerUser = firebaseUser.user;
    var ref = firebase.database().ref("users");
    var profileRef = ref.child(vm.providerUser.uid);
    vm.user = $firebaseObject(profileRef);
    $log.log(vm.user);
    $log.log(profileRef);
    vm.user.$loaded().then(function () {
      if (!vm.user.displayName) {
        $log.log("creating user...");
        profileRef.set({
          displayName: vm.providerUser.displayName,
          email: vm.providerUser.email,
          photoURL: vm.providerUser.photoURL
        }).then(function () {
          $log.log("user created.");
          $state.go('tab.artist');
        }, function () {
          $log.log("user could not be created.");
        });
      } else {
        $log.log('user already created!');
        $state.go('tab.artist');
      }
    });
  }

  function loginError(error) {
    $log.log("Authentication failed:", error);
  }

  function logout() {
    var auth = $firebaseAuth();
    $log.log(vm.displayName + " logged out");
    auth.$signOut();
    vm.displayName = undefined;
  }
})

.controller('SongsCtrl', function($scope, Songs) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  /*$scope.songs = songs.all();
  $scope.remove = function(songs) {
    Songs.remove(songs);
  };*/
})

/*.controller('SongsDetailCtrl', function($scope, $stateParams, Songs) {
  $scope.Songs = Songs.get($stateParams.songsId);
})*/

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
