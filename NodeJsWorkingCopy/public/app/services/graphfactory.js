app.factory('graphFactory', function($http) {



    return {
        getStatusReport: function() {
            return $http.get('/graphdata/statusreport');
        },
        getLocationReport: function() {
            return $http.get('/graphdata/locationreport');
        },
        getcategoryReport: function() {
            return $http.get('/graphdata/categoryreport');
        },
        getmoodfactorReport: function() {
            return $http.get('/graphdata/moodfactorreport');
        },
        getTotalRequests: function() {
            return $http.get('/graphdata/totalrequestcount');
        },


    };


});
