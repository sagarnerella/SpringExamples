app.controller('LoginController', function($http,$scope) {


$scope.login=function(){

    
 
    
$http.post('/validatelogin',{"username": $scope.user.username, password:$scope.user.password}).success(function(data){

        if(data.success=='SUCCESS') {
          $scope.successmessage=data.message;
        window.location.href= '#/home';
           }else if(data.success=='FAILURE'){
            $scope.errormessage=data.message;
            window.location.href= '#/forget';

           }
          
         
        });


   }

});