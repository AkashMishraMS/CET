
angular.module('LCTRL', []).controller('lctrl', function($scope,$http,$location,$rootScope) {

  $scope.login= function (user){

    console.log(user);

    $http.post('/login' , user).success(function(response){
        console.log(response);
      alert("Login Successful");
      $rootScope.currentUser = user;
     $location.path("/admin");
    
    
      //  if(response==null){
      //    alert("please fill");
      //  }
  
    });


  };

});
