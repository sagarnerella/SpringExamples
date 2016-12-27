exports.mypostrequests = function(req, res) {

 //var details = req.params.id.params("&");  
 var input = JSON.parse(JSON.stringify(req.body));
 console.log(input.userid);
 console.log(input.pageno);
 var usrid = input.userid;
 var pageno = input.pageno;
 var title = input.title;
 var priority = input.priority;
 var status = input.status;
 var category = input.category;
 var requestid = input.requestid;

 var id = input.userid;
 //var pgno =details[1];
 var pageno = 10 * (input.pageno - 1);
 req.getConnection(function(err, connection) {

  var querysstring = "select req.request_id,(select count(*) as count from tbl_app_requests_ballot trb where trb.request_id =req.request_id)votes, req.request_code, req.request_title, req.request_description,req.location, \
DATE_FORMAT(NOW(req.created_date), '%d-%m-%Y') AS created_date, req.last_modified,req.latitude,req.longitude, priority.priority_name, reqalloc.status_id,\
reqstatus.status_desc, createdcitizen.first_name, IFNULL(createdcitizen.last_name,' ')last_name, createdcitizen.photograph, \
reqalloc.request_work_allocation_id, DATE(reqalloc.assign_date) as assign_date, DATE(reqalloc.start_date) as start_date,\
 DATE(reqalloc.end_date) as end_date, DATE(reqalloc.to_date) as to_date, reqalloc.completed_percent,assignedcitizen.first_name \
 as assignedfname, assignedcitizen.last_name as assignedlname, assignedcitizen.photograph as assigned_to_photo, \
 updatedcitizen.first_name as updatedfname,updatedcitizen.last_name as updatedlname, requesttypes.req_type_name,\
 attach.attachment_name,attach.attachment_original_name,category.request_category_name,req.request_category_id \
 from tbl_app_request req LEFT JOIN tbl_app_priority priority ON req.priority_id = priority.priority_id \
 LEFT JOIN tbl_app_request_work_allocation reqalloc ON req.request_id = reqalloc.request_id \
 LEFT JOIN tbl_app_status reqstatus ON reqalloc.status_id = reqstatus.status_id LEFT JOIN tbl_citizen \
 createdcitizen ON req.citizen_id = createdcitizen.citizen_id LEFT JOIN tbl_citizen assignedcitizen ON \
 reqalloc.citizen_id = assignedcitizen.citizen_id LEFT JOIN tbl_citizen updatedcitizen ON \
 req.updated_by = updatedcitizen.citizen_id LEFT JOIN tbl_app_request_types requesttypes ON \
 requesttypes.req_type_id = req.request_type_id LEFT JOIN tbl_app_govt_employees emps ON \
 emps.govt_employee_id=reqalloc.govt_employee_id LEFT JOIN tbl_app_request_attachments attach ON \
 attach.request_id=req.request_id AND attach.is_active = 1 LEFT JOIN tbl_app_request_category category ON \
 category.request_category_id=req.request_category_id LEFT JOIN tbl_app_locations location ON \
 req.location_id = location.location_id and location.is_active = 1 WHERE 1=1 AND req.is_active=1  \
  AND requesttypes.req_type_id in (1,2,3) AND req.citizen_id = ? AND createdcitizen.is_active=1 \
   ";

  if (title != "N") {
   querysstring = querysstring + " and request_title LIKE '%" + title + "%'";
  }
  if (priority != "0") {
   querysstring = querysstring + " AND priority.priority_id in (" + priority + ")";
  }
  if (status != "0") {
   querysstring = querysstring + " and  reqstatus.status_id in (" + status + ")";
  }
  if (category != "N") {
   querysstring = querysstring + " and  req.request_category_id  in (" + category + ")";
  }
  if (requestid != "0") {
   querysstring = querysstring + " and  req.request_id  in (" + requestid + ")";
  }


  querysstring1 = " group by req.request_id  order by req.created_date desc LIMIT ?,10";

  var finalstring = querysstring + querysstring1;



  var query = connection.query(finalstring, [id, pageno], function(err, rows) {
   if (err) {
    console.log("Error Selecting : %s ", err);
    res.end(JSON.stringify(rows));
   } else {


    res.end(JSON.stringify(rows));

   }
  });

 });

};


exports.postvotes = function(req, res) {

 var input = JSON.parse(JSON.stringify(req.body));
 var requestid = input.requestid;
 var citizenid = input.userid;

 req.getConnection(function(err, connection) {
 
   connection.beginTransaction(function(err) { 

      if (err) { 
     var data = {

        success: 'FAILURE',
        message: 'Failed to capture your vote.Please try after some time'
       };
        res.end(JSON.stringify(data));
    
     }

  var query = connection.query("select request_ballot_id from tbl_app_requests_ballot where request_id =? and citizen_id =? and ref_type = 'Vote_Ballot' and ref_id = 1 ", [requestid, citizenid], function(err, rows) {
   if (err) {
    console.log("Error Selecting : %s ", err);
    res.end(JSON.stringify(rows));
   } else {

    if (rows.length > 0) {
     var data = {

      success: 'FAILURE',
      message: 'You have already voted for this request.'
     };
     res.end(JSON.stringify(data));

    } else {

     var inputData = {

      request_id: requestid,
      citizen_id: citizenid,
      ref_type: 'Vote_Ballot',
      ref_id: 1,
      is_active: 0,
      org_id: 3,
      created_by: citizenid,
      created_date: 'current_date()'
     };


     var query = connection.query("INSERT INTO tbl_app_requests_ballot set ? ", inputData, function(err, rows) {

      if (err) {
       console.log("Error inserting : %s ", err);
      

       connection.rollback(function() {
           var data = {

        success: 'FAILURE',
        message: 'Failed to capture you vote. please try after some time'
       };
       res.end(JSON.stringify(data));
        });


      } else {

    
       res.end(JSON.stringify(data));
  
      connection.commit(function(err) {
        console.log(err);
        if (err) { 
          connection.rollback(function() {
              var data = {

        success: 'FAILURE',
        message: 'Failed to capture you vote. please try after some time'
       };
       res.end(JSON.stringify(data));
          });
        }
      var data = {

        success: 'SUCCESS',
        message: 'You have voted successfully',
       };
        connection.end();
      });



      }

     });



    }



   }
  });

 });

 });

};


exports.mymoods = function(req, res) {

 var input = JSON.parse(JSON.stringify(req.body));
 var requestid = input.requestid;
 var citizenid = input.userid;
 var factorid = input.factorid;


 req.getConnection(function(err, connection) {

  connection.beginTransaction(function(err) {
    if (err) { 
     var data = {

        success: 'FAILURE',
        message: 'Failed to capture your mood.Please try after some time1'
       };
        res.end(JSON.stringify(data));
    
     }

  var query = connection.query('select  request_ballot_id from tbl_app_requests_ballot where request_id =? and citizen_id =? and ref_type = "Mood_Ballot"', [requestid, citizenid], function(err, rows) {
   if (err) {
    console.log(err);
    var data = {

        success: 'FAILURE',
        message: 'Failed to capture your mood.Please try after some time2'
       };
        res.end(JSON.stringify(data));
   } else {

    if (rows.length > 0) {
     //update mood factor

     var data = {

      ref_id: factorid,
      is_active: 0,
      updated_by: citizenid,
      last_modified: 'current_date()'
     };

     var query = connection.query("UPDATE tbl_app_requests_ballot set ? WHERE request_id = ? and ref_type ='Mood_Ballot' and citizen_id=?  ", [data, requestid, citizenid], function(err, rows) {

      if (err) {

       connection.rollback(function() {
      console.log(err);
         var data = {

        success: 'FAILURE',
        message: 'Failed to capture your mood.Please try after some time3'
       };
        res.end(JSON.stringify(data));
         
        });
      


      } else {
        
      
        connection.commit(function(err) {
        if (err) { 
          console.log(err);
          connection.rollback(function() {
            var data = {

        success: 'FAILURE',
        message: 'Failed to capture your mood.Please try after some time4'
       };
          });
        }
         var data = {

         success: 'SUCCESS',
         message: 'Your mood has been captured'
        };
        res.end(JSON.stringify(data));
        connection.end();
      });  


       



      }



     });



    } else {
     //insert mood factor

     var inputData = {

      request_id: requestid,
      citizen_id: citizenid,
      ref_type: 'Mood_Ballot',
      ref_id: factorid,
      is_active: 0,
      org_id:3,
      created_by: citizenid,
      created_date: 'current_date()'
     };


     var query = connection.query("INSERT INTO tbl_app_requests_ballot set ? ", inputData, function(err, rows) {

      if (err) {
       console.log("Error inserting : %s ", err);
       connection.rollback(function() {
     
         var data = {

        success: 'FAILURE',
        message: 'Failed to capture your mood.Please try after some time'
       };
        res.end(JSON.stringify(data));
         
        });

      } else {

       connection.commit(function(err) {
        if (err) { 
          console.log(err);
          connection.rollback(function() {
            var data = {

        success: 'FAILURE',
        message: 'Failed to capture your mood.Please try after some time'
       };
          });
        }
         var data = {

         success: 'SUCCESS',
         message: 'Your mood has been captured'
        };
        res.end(JSON.stringify(data));
        connection.end();
      });  


      }

     });



    }



   }
  });

   });
 
 });

};


exports.moodperrequestpercentage = function(req, res) {

 var input = JSON.parse(JSON.stringify(req.body));
 var requestid = input.requestid;
 var reqmoodcounts = "0";
 var sadcount = "0";
 var angrycount = "0";
 var happycount = "0";

 req.getConnection(function(err, connection) {



  var query = connection.query("select count(*)as count from tbl_app_requests_ballot where request_id =? and ref_type='Mood_Ballot'", [requestid], function(err, rows) {
   if (err) {
    console.log("Error Selecting : %s ", err);
    res.end(JSON.stringify(rows));
   } else {
    reqmoodcounts = rows[0].count;


    var query = connection.query("select count(*)as count from tbl_app_requests_ballot where request_id =? and ref_type='Mood_Ballot' and ref_id=1", [requestid], function(err, rows) {
     if (err) {
      console.log("Error Selecting : %s ", err);
      res.end(JSON.stringify(rows));
     } else {
      sadcount = rows[0].count;


      var query = connection.query("select count(*)as count from tbl_app_requests_ballot where request_id =? and ref_type='Mood_Ballot' and ref_id=2", [requestid], function(err, rows) {
       if (err) {
        console.log("Error Selecting : %s ", err);
        res.end(JSON.stringify(rows));
       } else {
        angrycount = rows[0].count;


        var query = connection.query("select count(*)as count from tbl_app_requests_ballot where request_id =? and ref_type='Mood_Ballot' and ref_id=3", [requestid], function(err, rows) {
         if (err) {
          console.log("Error Selecting : %s ", err);
          res.end(JSON.stringify(rows));
         } else {
          happycount = rows[0].count;

          var sadCount = "0";
          var angryCount = "0";
          var happyCount = "0";

          if (reqmoodcounts != 0) {
           sadCount = Math.round(sadcount / reqmoodcounts * 100);
           angryCount = Math.round(angrycount / reqmoodcounts * 100);
           happyCount = Math.round(happycount / reqmoodcounts * 100);
          }


          var data = {


           sadcount: sadCount,
           angrycount: angryCount,
           happycount: happyCount

          };
          res.end(JSON.stringify(data));



         }
        });


       }
      });



     }
    });





   }
  });

 });

};


exports.moodoveralltpercentage = function(req, res) {

 
 var reqmoodcounts = "0";
 var sadcount = "0";
 var angrycount = "0";
 var happycount = "0";


 req.getConnection(function(err, connection) {



  var query = connection.query("select count(*)as count from tbl_app_requests_ballot where ref_type='Mood_Ballot'", function(err, rows) {
   if (err) {
    console.log("Error Selecting : %s ", err);
    res.end(JSON.stringify(rows));
   } else {
    reqmoodcounts = rows[0].count;


    var query = connection.query("select count(*)as count from tbl_app_requests_ballot where ref_type='Mood_Ballot' and ref_id=1", function(err, rows) {
     if (err) {
      console.log("Error Selecting : %s ", err);
      res.end(JSON.stringify(rows));
     } else {
      sadcount =rows[0].count;

      var query = connection.query("select count(*)as count from tbl_app_requests_ballot where ref_type='Mood_Ballot' and ref_id=2", function(err, rows) {
       if (err) {
        console.log("Error Selecting : %s ", err);
        res.end(JSON.stringify(rows));
       } else {
        angrycount = rows[0].count;


        var query = connection.query("select count(*)as count from tbl_app_requests_ballot where ref_type='Mood_Ballot' and ref_id=3", function(err, rows) {
         if (err) {
          console.log("Error Selecting : %s ", err);
          res.end(JSON.stringify(rows));
         } else {
          happycount = rows[0].count;


          var sadCount = "0";
          var angryCount = "0";
          var happyCount = "0";

          if (reqmoodcounts != 0) {
           sadCount = Math.round(sadcount / reqmoodcounts * 100);
           angryCount = Math.round(angrycount / reqmoodcounts * 100);
           happyCount = Math.round(happycount / reqmoodcounts * 100);
          }


          var data = {


           sadcount: sadCount,
           angrycount: angryCount,
           happycount: happyCount

          };
         console.log(data);     
          res.end(JSON.stringify(data));

         }
        });


       }
      });



     }
    });





   }
  });

 });

};

exports.usersuccessstories = function(req, res) {

 req.getConnection(function(err, connection) {

  connection.query('select concat(  IFNULL(tblcitzn.first_name," ") , IFNULL(tblcitzn.last_name," ") ) fullname,appsust.success_stories_desc,DATE_FORMAT(NOW(appsust.creation_date),"%d %b %Y %T") creation_date from tbl_app_success_stories appsust,tbl_citizen tblcitzn where tblcitzn.citizen_id=appsust.citizen_id ', function(err, rows) {

   if (err) {
    console.log("Error inserting : %s ", err);
    res.end(JSON.stringify(data));
   } else {

res.end(JSON.stringify(rows));
   }

  });

 });
};