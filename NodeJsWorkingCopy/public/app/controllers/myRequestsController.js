app.controller('MyRequestsController', function($scope, $sessionStorage, myrequestFactory, $log) {


    $sessionStorage.pageno = 1;
    myrequestFactory.mypostrequests($.param({})).success(function(data) {

        $scope.myrequests = data;

    });



    $scope.viewRequestDetails = function(request) {

        var reqId = request.request_id;
        console.log(reqId);
        $sessionStorage.requestid = reqId;
        window.location.href = "#/dashboard/viewrequest";

    }

    $scope.myvote = function(request) {

        var reqId = request.request_id;

        console.log(reqId);
        $sessionStorage.requestid = reqId;


        myrequestFactory.postvoteforrequest($.param({})).success(function(data) {


            if (data.success == "SUCCESS") {

                myrequestFactory.mypostrequestsparams($.param({})).success(function(data) {

                    $scope.myrequests = data;

                });

            } else {

                alert(data.message);
            }


        });



    }



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
        // Pagination

    // $scope.totalItems = 64;
    // $scope.currentPage = 1;

    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
        $log.log('Page changed to: ' + $scope.currentPage);
    };

    $scope.maxSize = 5;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;

    //Pagination End


});
