app.controller('LoadController', function($http, $scope, $rootScope,citizenFactory,$sessionStorage) {
    $scope.loginSubmit = function() {

        
         $http.post('/users',{"username": $scope.user.username, "password": $scope.user.password}).success(function(data){

            if (data.success == 'SUCCESS') {
                $rootScope.userID = data.userid;
                $rootScope.isLogin = true;
                $sessionStorage.userID = data.userid;
                console.log("s" + $sessionStorage.userID);
                console.log("d" + $sessionStorage.userID);
                $sessionStorage.isAuthenticate = "Y";
                $sessionStorage.isUserType = "CITIZEN";
                window.location.href = '#/dashboard/myrequests';
            } else {
                alert(data.message);
                $rootScope.isLogin = false;
            }

            $scope.actors = data;
        });

    }

    $rootScope.logout = function() {
        $rootScope.isLogin = false;
        $rootScope.userID = null;

        window.location.href = '#/slider';
    }

     $scope.register=function(){

$http.post('/users/register',{"mobile_number": $scope.user.mobno, email:$scope.user.email,"password": $scope.user.password}).success(function(data){

        if(data.success=='SUCCESS') {
        window.location.href= '#/dashboard/dboardGraphs';
           }else{
           alert(data.message); 
           }
          
          $scope.actors=data;
        });


   }


    $scope.forgotPassword=function(){

    
 
    
$http.post('/users/forgotpassword',{"mobile_number": $scope.user.mobno, email:$scope.user.email}).success(function(data){

        if(data.success=='SUCCESS') {
          $scope.successmessage=data.message;
        window.location.href= '#/login';
           }else if(data.success=='FAILURE'){
            $scope.errormessage=data.message;
            window.location.href= '#/forget';

           }
          
          $scope.actors=data;
        });


   }
   $scope.changePassword=function(){

    
 
    
$http.post('/users/changepassword',{"mobile_number": $scope.user.mobno, email:$scope.user.email,password:$scope.user.password,newpassword:$scope.user.password1}).success(function(data){

        if(data.success=='SUCCESS') {
          $scope.successmessage=data.message;
        window.location.href= '#/login';
           }else if(data.success=='FAILURE'){
            $scope.errormessage=data.message;
            window.location.href= '#/changepassword';

           }
        });


   }

});
