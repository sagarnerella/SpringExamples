app.controller('ViewRequestController', function($scope,$sessionStorage,myrequestFactory) {

   console.log("viewrequ"+ $sessionStorage.requestid);
   myrequestFactory.requestdetails($.param({})).success(function(data) {
 
     $scope.requestdetails = data;
  
    }); 

    myrequestFactory.getrequesthistory($.param({})).success(function(data) {

     $scope.requesthistory = data;
  
    }); 
     myrequestFactory.getrequestcomments($.param({})).success(function(data) {

     $scope.requestcomments = data;
  
    }); 


   myrequestFactory.moodperrequest($.param({})).success(function(data) {
 
     console.log("mood"+data)
     $scope.moodperrequest = data;
    
  
    }); 

    $scope.chooseMood = function(mood) {
     
      $sessionStorage.moodid = mood;

    myrequestFactory.capturemood($.param({})).success(function(data) {


   if (data.success == "SUCCESS") {
  
      alert(data.message);
    myrequestFactory.moodperrequest($.param({})).success(function(data) {

     $scope.moodperrequest = data;

    });

   }else{

    alert(data.message);
   }


  });
    

    }



    $scope.myvotes = function(request) {

  var reqId = request.request_id;

  console.log(reqId);
  $sessionStorage.requestid = reqId;


  myrequestFactory.postvoteforrequest($.param({})).success(function(data) {


   if (data.success == "SUCCESS") {

    myrequestFactory.mypostrequestsparams($.param({})).success(function(data) {

     $scope.myrequests = data;

    });

   }else{

    alert(data.message);
   }


  });



 }

});
