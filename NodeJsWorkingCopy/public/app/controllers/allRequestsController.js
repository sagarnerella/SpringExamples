app.controller('AllRequestsController', function($scope, $sessionStorage, myrequestFactory) {


 $sessionStorage.pageno = 1;
 myrequestFactory.mypostrequests($.param({})).success(function(data) {

  $scope.myrequests = data;

 });


 $scope.search = function() {

  var title = $scope.requests.title;
  var category = $scope.requests.category;
  var high = $scope.requests.high;
  var medium = $scope.requests.medium;
  var low = $scope.requests.low;

  if (title == undefined) {
   title = "N";
  }
  if (category == undefined) {
   category = "N";
  }

  var priority = "0";

  if (high == true) {
   priority = priority + "," + "1";
  }
  if (medium == true) {
   priority = priority + "," + "2";
  }
  if (low == true) {
   priority = priority + "," + "3";
  }

  $sessionStorage.pageno = 1;
  var open = $scope.requests.open;
  var assigned = $scope.requests.assigned;
  var inprogress = $scope.requests.inprogress;
  var hold = $scope.requests.hold;
  var resolved = $scope.requests.resolved;
  var reopen = $scope.requests.reopen;
  var closed = $scope.requests.closed;
  var status = "0";
  if (open == true) {
   status = status + "," + "13";
  }
  if (assigned == true) {
   status = status + "," + "14";
  }
  if (inprogress == true) {
   status = status + "," + "15";
  }
  if (hold == true) {
   status = status + "," + "16";
  }
  if (resolved == true) {
   status = status + "," + "17";
  }
  if (reopen == true) {
   status = status + "," + "18";
  }
  if (closed == true) {
   status = status + "," + "19";
  }


  $sessionStorage.reqstatus = status;
  $sessionStorage.reqpriority = priority;
  $sessionStorage.reqtitle = title;

  $sessionStorage.reqcategory = category;



  myrequestFactory.mypostrequestsparams($.param({})).success(function(data) {

   $scope.myrequests = data;

  });




 }


});