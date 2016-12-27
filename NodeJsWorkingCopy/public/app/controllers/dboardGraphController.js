app.controller('DboardGraphController', function($scope, dashboardFactory, $rootScope) {
    //the below code will generate the grap .

    var userid = 3;
    dashboardFactory.getmyPriority(userid).success(function(data) {

        var statuslabels = [],
            statusdata = [];

        for (var key in data[0]) {

            statuslabels.push(key);
            statusdata.push(data[0][key]);

        }
        $scope.labels = statuslabels;
        $scope.data = statusdata;

    });

    dashboardFactory.getmyRequests(userid).success(function(data) {

        var statuslabels = [],
            statusdata = [];

        for (var key in data[0]) {

            statuslabels.push(key);
            statusdata.push(data[0][key]);

        }
        $scope.statuslabel = statuslabels;
        $scope.statusdata = statusdata;

    });

    dashboardFactory.gettopRequests(5).success(function(data) {

        $scope.requestlist = data;
        console.log(data);

    });

    dashboardFactory.getcitizentrendsreport().success(function(data) {

        var linelabels1 = [],
            linedata1 = [];
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            linelabels1.push(data[i].MONTH);
            linedata1.push(data[i].count);

        }
        console.log(linelabels1);
        console.log(linedata1);
        $scope.linelabels = linelabels1;
        $scope.linedata = [linedata1];
    });


    $scope.colors = ['#e12836', '#fa902c', '#0f5c88', '#1ba9b1', '#fdd65a'];
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

    $scope.viewRequest = function(request) {
        var reqId = request.request_id;
        console.log(request);
        window.location.href = "#/dashboard/viewrequest"

    }

});
