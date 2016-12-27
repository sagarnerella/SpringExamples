app.controller('ChartsController', function($scope,$http,citizenFactory, graphFactory,dashboardFactory,myrequestFactory) {

    $scope.population = citizenFactory.getCitizen($.param({}), function(user) {
        $scope.population = user;

    });
    

 $http.get('/requestdata/usersuccessstories').success(function(data){

          
              $scope.usersuccessstories =data;
            
          });
          







     myrequestFactory.moodoverall($.param({})).success(function(data) {
 
    
     $scope.moodoverall = data;
    
  
    }); 


    graphFactory.getStatusReport($.param({})).success(function(data) {

        var statuslabels = [],
            statusdata = [];

        for (var key in data[0]) {

            statuslabels.push(key);
            statusdata.push(data[0][key]);

        }
        $scope.labels = statuslabels;
        $scope.data = statusdata;

    });

    graphFactory.getcategoryReport($.param({})).success(function(data) {
        var categorylabels = [],
            categorydatas = [];
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];

            categorylabels.push(obj.request_category_name);
            categorydatas.push(obj.count);
        }
        $scope.categorylabels = categorylabels;
        $scope.categorydata = categorydatas;

    });
    graphFactory.getLocationReport($.param({})).success(function(data) {
        var locationlabel = [],
            locationdatas = [];
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            //console.log(obj.location);
            locationlabel.push(obj.location);
            locationdatas.push(obj.count);
        }

        $scope.locationlabels = locationlabel;
        $scope.locationdata = locationdatas;

    });

    graphFactory.getmoodfactorReport($.param({})).success(function(data) {
        var moodlabel = [],
            mooddatas = [];
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            //console.log(obj.location);
            moodlabel.push(obj.mood_factor_name);
            mooddatas.push(obj.count);
        }

        $scope.moodlabels = moodlabel;
        $scope.mooddata = mooddatas;

    });


    $scope.colors = ['#e12836', '#fa902c', '#0f5c88', '#1ba9b1', '#fdd65a'];

    $scope.legend = true;
    $scope.barColours = [{

        fillColor: "#0f5c88",
        highlightFill: "#0f5c88",


    }, {
        fillColor: "#1ba9b1",
        highlightFill: "#1ba9b1",

    }, {
        fillColor: "#fdd65a",
        highlightFill: "#fdd65a",

    }];


    graphFactory.getTotalRequests($.param({})).success(function(data) {

        $scope.percentage = data;
        

    });

  dashboardFactory.gettopRequests(8).success(function(data) {

        $scope.requestlist = data;
       

    });  






});
