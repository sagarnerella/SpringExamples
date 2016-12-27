exports.getrequesthistory = function(req, res) {

   var input = JSON.parse(JSON.stringify(req.body));
  var requestid = input.requestid;
    req.getConnection(function(err, connection) {
       var query = connection.query('select status_name,DATE_FORMAT(NOW(creation_date), "%d-%m-%Y") AS created_date from tbl_app_history where  request_id= ? order by creation_date desc',[requestid], function(err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
                res.end(JSON.stringify(rows));
            } else {


                res.end(JSON.stringify(rows));

            }
        });

    });

};


exports.getrequestusercomments = function(req, res) {

   var input = JSON.parse(JSON.stringify(req.body));
  var requestid = input.requestid;
  console.log("requestid"+requestid);
  console.log("requestid"+requestid);
    req.getConnection(function(err, connection) {
       var query = connection.query('select IFNULL(tbc.first_name," ")first_name,IFNULL(tbc.last_name," ")last_name,tbc.email_id,tbc.mobile_number, apc.comment_desc, DATE_FORMAT(NOW(apc.created_date),"%d %b %Y %T")posteddate,apc.ref_id from tbl_app_comments  apc, tbl_citizen tbc where apc.commented_by=tbc.citizen_id and apc.ref_id=? ',[requestid], function(err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
                res.end(JSON.stringify(rows));
            } else {


                res.end(JSON.stringify(rows));

            }
        });

    });

};

exports.postcommentsforrequest = function(req, res) {

  var input = JSON.parse(JSON.stringify(req.body));
  var requestid = input.requestid;
  var desc =input.desc;
  var citizenid =input.userid;
    req.getConnection(function(err, connection) {

        connection.beginTransaction(function(err) { 

        if (err) { 
     var data = {

        success: 'FAILURE',
        message: 'Failed to capture your comments.Please try after some time'
       };
        res.end(JSON.stringify(data));
    
     }

    var inputData = {

      ref_id: requestid,
      commented_by: citizenid,
      reference_type: 'Request_Comment',
      comment_type:'Public',
      is_active:0,
      org_id:3,
      created_by: citizenid,
      created_date: 'current_date()',
      comment_desc:desc
     };


     var query = connection.query("INSERT INTO tbl_app_comments set ? ", inputData, function(err, rows) {

      if (err) {
       console.log("Error inserting : %s ", err);
      

       connection.rollback(function() {
           var data = {

        success: 'FAILURE',
        message: 'Failed to capture your comments. please try after some time'
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
        message: 'Failed to capture you comments. please try after some time'
       };
       res.end(JSON.stringify(data));
          });
        }
      var data = {

        success: 'SUCCESS',
        message: 'You have comments has been captured',
       };
        connection.end();
      });



      }

     });

   


      });

    });

};
