exports.statusreport = function(req, res) {

    req.getConnection(function(err, connection) {



        var query = connection.query('SELECT  COUNT(IF(status.status_name = "CLOSED",1,NULL)) CLOSED,COUNT(IF(status.status_name = "OPEN", 1, NULL)) OPEN,\
    COUNT(IF(status.status_name = "HOLD", 1, NULL)) HOLD,COUNT(IF(status.status_name = "IN PROGRESS", 1, NULL)) INPROGRESS,\
   COUNT(IF(status.status_name = "ASSIGNED", 1, NULL)) ASSIGNED,COUNT(IF(status.status_name = "RESOLVED", 1, NULL)) RESOLVED,\
   COUNT(IF(status.status_name = "REOPEN", 1, NULL)) REOPEN FROM tbl_app_request_work_allocation alloc,\
   tbl_app_status status where status.status_id = alloc.status_id and alloc.is_active = 1 and status.is_active = 1', function(err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
                res.end(JSON.stringify(rows));
            } else {


                res.end(JSON.stringify(rows));

            }
        });

    });

};

exports.categoryreport = function(req, res) {

    req.getConnection(function(err, connection) {



        var query = connection.query('select count(*) as count, category.request_category_name \
          from tbl_app_request request, tbl_app_request_category category Where category.request_category_id = request.request_category_id \
          and category.is_active = 1 and request.is_active = 1 and request.org_id = 3 \
          and category.org_id = 3 group by request.request_category_id order by count desc LIMIT 5', function(err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
                res.end(JSON.stringify(rows));
            } else {


                res.end(JSON.stringify(rows));

            }
        });

    });

};


exports.locationreport = function(req, res) {

    req.getConnection(function(err, connection) {



        var query = connection.query(' select count(*) as count, loc.location from tbl_app_request request, tbl_app_locations loc \
          where request.location_id = loc.location_id and request.is_active = 1  \
         and loc.is_active = 1  \
        group by request.location_id  order by count desc LIMIT 5', function(err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
                res.end(JSON.stringify(rows));
            } else {


                res.end(JSON.stringify(rows));

            }
        });

    });

};

exports.moodfactorreport = function(req, res) {

    req.getConnection(function(err, connection) {



        var query = connection.query(' select count(*) as count, mood.mood_factor_name from tbl_app_requests_ballot ballot,tbl_app_mood_factor mood\
          where ballot.ref_id = mood.mood_factor_id and ballot.ref_type = "Mood_Ballot" and ballot.is_active = 1 and mood.is_active = 1\
           group by mood.mood_factor_name', function(err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
                res.end(JSON.stringify(rows));
            } else {


                res.end(JSON.stringify(rows));

            }
        });

    });

};

exports.citizentrendsreport = function(req, res) {

    req.getConnection(function(err, connection) {



        var query = connection.query(' select sum(ifnull(count,0)) count, m.MONTH from ( select concat(DATE_FORMAT(CURDATE() - INTERVAL 0 MONTH, "%b"),"-", DATE_FORMAT(CURDATE() - INTERVAL 0 MONTH, "%Y")) MONTH, 11 ord UNION select concat(DATE_FORMAT(CURDATE() - INTERVAL 1 MONTH, "%b"),"-", DATE_FORMAT(CURDATE() - INTERVAL 1 MONTH, "%Y")) MONTH, 10 ord UNION select concat(DATE_FORMAT(CURDATE() - INTERVAL 2 MONTH, "%b"),"-", DATE_FORMAT(CURDATE() - INTERVAL 2 MONTH, "%Y")) MONTH, 9 ord UNION select concat(DATE_FORMAT(CURDATE() - INTERVAL 3 MONTH, "%b"),"-", DATE_FORMAT(CURDATE() - INTERVAL 3 MONTH, "%Y")) MONTH, 8 ord union select concat(DATE_FORMAT(CURDATE() - INTERVAL 4 MONTH, "%b"),"-", DATE_FORMAT(CURDATE() - INTERVAL 4 MONTH, "%Y")) MONTH, 7 ord union select concat(DATE_FORMAT(CURDATE() - INTERVAL 5 MONTH, "%b"),"-", DATE_FORMAT(CURDATE() - INTERVAL 5 MONTH, "%Y")) month, 6 ord UNION select concat(DATE_FORMAT(CURDATE() - INTERVAL 6 MONTH, "%b"),"-", DATE_FORMAT(CURDATE() - INTERVAL 6 MONTH, "%Y")) MONTH, 5 ord UNION select concat(DATE_FORMAT(CURDATE() - INTERVAL 7 MONTH, "%b"),"-", DATE_FORMAT(CURDATE() - INTERVAL 7 MONTH, "%Y")) MONTH, 4 ord UNION select concat(DATE_FORMAT(CURDATE() - INTERVAL 8 MONTH, "%b"),"-", DATE_FORMAT(CURDATE() - INTERVAL 8 MONTH, "%Y")) month, 3 ord UNION select concat(DATE_FORMAT(CURDATE() - INTERVAL 9 MONTH, "%b"),"-", DATE_FORMAT(CURDATE() - INTERVAL 9 MONTH, "%Y")) MONTH, 2 ord UNION select concat(DATE_FORMAT(CURDATE() - INTERVAL 10 MONTH, "%b"),"-", DATE_FORMAT(CURDATE() - INTERVAL 10 MONTH, "%Y")) MONTH, 1 ord UNION select concat(DATE_FORMAT(CURDATE() - INTERVAL 11 MONTH, "%b"),"-", DATE_FORMAT(CURDATE() - INTERVAL 11 MONTH, "%Y")) MONTH, 0 ord) AS m LEFT JOIN (SELECT count(request.request_id) count, CONCAT(DATE_FORMAT(rwa.end_date, "%b"),"-",DATE_FORMAT(rwa.end_date, "%Y")) MONTH FROM tbl_app_request request, tbl_app_request_work_allocation rwa, tbl_app_status status   where status.status_id = rwa.status_id and status.status_name = "RESOLVED" and status.status_type = "REQUEST" and status.is_active = 1 and request.request_id = rwa.request_id and rwa.is_active = 1 and request.is_active = 1 and rwa.is_active = 1 and request.org_id = 3    group by CONCAT(DATE_FORMAT(rwa.end_date, "%b"),"-",DATE_FORMAT(rwa.end_date, "%Y")) ) a ON a.MONTH = m.month group by m.month order by ord', function(err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
                res.end(JSON.stringify(rows));
            } else {


                res.end(JSON.stringify(rows));

            }
        });

    });

};

exports.topratedrequestsreport = function(req, res) {
 var id = req.params.id;
 
    req.getConnection(function(err, connection) {

        var query = connection.query(' select  count(ballot.ref_id) as count,request.request_id, citizen.first_name,status.status_name,DATE_FORMAT(NOW(request.created_date), "%d-%m-%Y") AS created_date,loc.location,atta.attachment_name  \
from tbl_app_requests_ballot ballot,tbl_app_request request,tbl_app_vote_factor vote,tbl_citizen citizen,\
    tbl_app_request_work_allocation alloc,tbl_app_status status,tbl_app_locations loc,tbl_app_request_attachments atta  \
where request.request_id = ballot.request_id and vote.vote_factor_id = ballot.ref_id and citizen.citizen_id = request.citizen_id \
  and alloc.request_id = request.request_id and status.status_id = alloc.status_id and request.location_id = loc.location_id \
  and request.is_active = 1 and vote.vote_factor_name = "Support" and ballot.ref_type = "Vote_Ballot"  and atta.request_id = request.request_id \
group by request.request_id order by count desc limit  '+id,  function(err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
                res.end(JSON.stringify(rows));
            } else {
                //console.log(JSON.stringify(rows));

                res.end(JSON.stringify(rows));

            }
        });

    });

};

exports.myproirityrequestreport = function(req, res) {

    var id = req.params.id;
    req.getConnection(function(err, connection) {
        console.log("id" + id);


        var query = connection.query(' SELECT COUNT(IF(priority.priority_name = "High",1,NULL)) HIGH, COUNT(IF(priority.priority_name = "Medium", 1, NULL)) MEDIUM,\
    COUNT(IF(priority.priority_name = "Low", 1, NULL)) LOW FROM tbl_app_priority priority,tbl_app_request request\
 where request.priority_id = priority.priority_id and request.citizen_id = ? and request.is_active = 1\
 and priority.is_active = 1', [id], function(err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
                res.end(JSON.stringify(rows));
            } else {


                res.end(JSON.stringify(rows));

            }
        });

    });

};

exports.mystatusrequestreport = function(req, res) {

    var id = req.params.id;

    req.getConnection(function(err, connection) {
        console.log("id" + id);
        var query = connection.query('SELECT COUNT(IF(status.status_name = "CLOSED", 1, NULL)) CLOSED, COUNT(IF(status.status_name = "OPEN", 1, NULL)) OPEN,\
    COUNT(IF(status.status_name = "HOLD", 1, NULL)) HOLD,COUNT(IF(status.status_name = "INPROGRESS",1,NULL)) INPROGRESS,\
    COUNT(IF(status.status_name = "ASSIGNED",1,NULL)) ASSIGNED,COUNT(IF(status.status_name = "RESOLVED",1,NULL)) RESOLVED,\
    COUNT(IF(status.status_name = "REOPEN",1, NULL)) REOPEN \
FROM  tbl_app_request_work_allocation alloc,tbl_app_status status,tbl_app_request request \
where status.status_id = alloc.status_id  and alloc.is_active = 1 and status.is_active = 1 and alloc.request_id = request.request_id \
        and request.citizen_id = ? and request.is_active =1', [id], function(err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
                res.end(JSON.stringify(rows));
            } else {


                res.end(JSON.stringify(rows));

            }
        });

    });

};

exports.totalrequestcount = function(req, res) {

    req.getConnection(function(err, connection) {



        var query = connection.query('  select count(*) As Count FROM tbl_app_request_work_allocation alloc,\
   tbl_app_status status where status.status_id = alloc.status_id and alloc.is_active = 1 \
   and status.is_active = 1', function(err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);

            } else {


                var totalrequest = rows[0].Count;

                var query = connection.query('SELECT  COUNT(IF(status.status_name = "CLOSED",1,NULL)) CLOSED,COUNT(IF(status.status_name = "OPEN", 1, NULL)) OPEN,\
    COUNT(IF(status.status_name = "HOLD", 1, NULL)) HOLD,COUNT(IF(status.status_name = "IN PROGRESS", 1, NULL)) INPROGRESS,\
   COUNT(IF(status.status_name = "ASSIGNED", 1, NULL)) ASSIGNED,COUNT(IF(status.status_name = "RESOLVED", 1, NULL)) RESOLVED,\
   COUNT(IF(status.status_name = "REOPEN", 1, NULL)) REOPEN FROM tbl_app_request_work_allocation alloc,\
   tbl_app_status status where status.status_id = alloc.status_id and alloc.is_active = 1 and status.is_active = 1', function(err, rows) {
                    if (err) {
                        console.log("Error Selecting : %s ", err);

                    } else {


                        var opencount = Math.round(rows[0].OPEN / totalrequest * 100);
                        console.log("opencount" + rows[0].OPEN / totalrequest);
                        var closecount = Math.round(rows[0].CLOSED / totalrequest * 100);
                        var inprogresscount = Math.round(rows[0].INPROGRESS / totalrequest * 100);
                        var resolvedcount = Math.round(rows[0].RESOLVED / totalrequest * 100);


                        var data = {

                            opencount: opencount,
                            closecount: closecount,
                            inprogresscount: inprogresscount,
                            resolvedcount: resolvedcount

                        };
                        res.end(JSON.stringify(data));

                    }
                });


            }
        });

    });

}
