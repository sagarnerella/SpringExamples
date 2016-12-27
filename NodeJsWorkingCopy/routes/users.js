exports.authenticateuser = function(req, res) {
 var base64 = require('base-64');
 var input = JSON.parse(JSON.stringify(req.body));

 req.getConnection(function(err, connection) {

  var id = input.username;
  var passwrd = input.password;
  var encodePassword ="irQTVn9eYbBklRIql4cAtg==";
  // base64.encode(passwrd);
  connection.query("select * from tbl_citizen WHERE mobile_number = ? and password= ? ", [id, encodePassword], function(err, rows) {

   if (err) {

    var data = {

     success: 'FAILURE',
     message: 'Authentication failed with the given mobile no. and password'
    };
    console.log("Error inserting : %s ", err);
    res.end(JSON.stringify(data));
   } else {
    console.log("row" + rows.length);
    if (rows.length > 0) {
     var data = {

      success: 'SUCCESS',
      message: 'Authentication successful',
      userid: rows[0].citizen_id
     };
     res.end(JSON.stringify(data));


    } else {
     var data = {

      success: 'FAILURE',
      message: 'Authentication failed with the given mobile no. and password'
     };
     res.end(JSON.stringify(data));


    }
   }

  });

 });
};

exports.statistics = function(req, res) {

 req.getConnection(function(err, connection) {

  var citizencount = "0";
  var requestcount = "0";
  var resolutioncount = "0";

  var query = connection.query('SELECT count(*) as count FROM tbl_citizen where is_active = 1', function(err, rows) {

   if (err) {
    console.log("Error while SELECT data : %s ", err);
   } else {

    citizencount = rows[0].count;
    console.log("citizencount" + citizencount);


   }

  });

  var query = connection.query('SELECT count(*) as count from cds_demo.tbl_app_request where is_active = 1', function(err, rows) {

   if (err) {

   } else {

    requestcount = rows[0].count;
    console.log("requestcount" + requestcount);


   }


  });


  var query = connection.query('SELECT count(*) as count FROM tbl_app_request request, tbl_app_request_work_allocation allo, tbl_app_status status where request.request_id = allo.request_id and allo.status_id = status.status_id and status.status_name = "RESOLVED" and status.status_type = "REQUEST" and request.is_active = 1 and allo.is_active = 1 and status.is_active = 1 ', function(err, rows) {

   if (err) {

   } else {

    resolutioncount = rows[0].count;
    console.log("requestcount" + requestcount);


   }

   var data = {

    Citizencount: citizencount,
    Requestcount: requestcount,
    Resolutioncount: resolutioncount

   };
   res.end(JSON.stringify(data));

  });



 });

};


exports.register = function(req, res) {

 var input = JSON.parse(JSON.stringify(req.body));
 var base64 = require('base-64');
 var encryptPassword = base64.encode(input.password);
 var email_id = input.email;
 req.getConnection(function(err, connection) {

  var inputData = {

   email_id: email_id,
   mobile_number: input.mobile_number,
   password: encryptPassword,
   org_id: 3


  };
  var query = connection.query("INSERT INTO tbl_citizen set ? ", inputData, function(err, rows) {

   if (err) {
    console.log("Error inserting : %s ", err);
    var data = {

     success: 'FAILURE',
     message: 'Registration failed please try after some time'
    };
    res.end(JSON.stringify(data));

   } else {


    var nodemailer = require('nodemailer');
    var transport = nodemailer.createTransport({
     host: 'smtp.gmail.com',
     port: 587,
     auth: {
      user: 'myvoicetodayteam@gmail.com',
      pass: 'osicpl@1'
     }
    });
    var mailOptions = {
     from: 'myvoicetodayteam@gmail.com',
     to: email_id,
     subject: 'Registered At myvoicetoday',
     text: "Your Registration Completed Successfully "
    };




    transport.sendMail(mailOptions, function(error, info) {
     /* if(error){
          console.log(error);
          res.json({yo: 'error'});
      }else{
          console.log('Message sent: ' + info.response);
          res.json({yo: info.response});
      };*/
    });



    var data = {

     success: 'SUCCESS',
     message: 'Registration successful'
    };
    res.end(JSON.stringify(data));

   }



  });

  // console.log(query.sql); get raw query

 });
};

exports.forgotpassword = function(req, res) {
 var base64 = require('base-64');

 var input = JSON.parse(JSON.stringify(req.body));

 req.getConnection(function(err, connection) {
  var mobile_number = input.mobile_number;
  var email_id = input.email;
  var decryptPassword = "";

  var mobile_number = input.mobile_number;

  var queryToValidateMblandEmail = connection.query('SELECT count(*) as count FROM tbl_citizen where  mobile_number=? and email_id = ? ', [mobile_number, email_id], function(err, rows) {

   if (err) {
    console.log("Error while SELECT data : %s ", err);
   } else {
    var count = rows[0].count;
    console.log("else password " + count);
    if (count == 0) {
     var resultData = {

      success: 'FAILURE',
      message: 'Invalid User,Please Check Your Email Id and Password '
     };
     res.end(JSON.stringify(resultData));

    } else if (count != 0) {
     var query = connection.query('SELECT password  FROM tbl_citizen where  mobile_number=? and email_id = ? ', [mobile_number, email_id], function(err, rows) {

      if (err) {
       console.log("erro " + err);

      } else {

       var password = rows[0].password;
       console.log("password from db " + password);
       decryptPassword = base64.decode(password);
       console.log("decryptPassword " + decryptPassword);


       var nodemailer = require('nodemailer');
       var transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
         user: 'myvoicetodayteam@gmail.com',
         pass: 'osicpl@1'
        }
       });
       var mailOptions = {
        from: 'myvoicetodayteam@gmail.com',
        to: email_id,
        subject: 'password',
        text: " your password is " + decryptPassword
       };




       transport.sendMail(mailOptions, function(error, info) {
        /*  if(error){
              console.log(error);
              res.json({yo: 'error'});
          }else{
              console.log('Message sent: ' + info.response);
              res.json({yo: info.response});
          };*/
       });



       var data = {

        success: 'SUCCESS',
        message: 'Please Check , Password Sent To  Your Email Id '
       };
       res.end(JSON.stringify(data));

      }

     });

    }

   }

  });


 });
};


exports.changepassword = function(req, res) {

 var input = JSON.parse(JSON.stringify(req.body));
 var base64 = require('base-64');

 req.getConnection(function(err, connection) {

  var email_id = input.email;
  var mobile_number = input.mobile_number;
  var encodeoldpassword = base64.encode(input.password);
  var encodenewpassword = base64.encode(input.newpassword);

  connection.query('SELECT count(*) as count FROM tbl_citizen where  mobile_number=? and email_id = ? and password = ? ', [mobile_number, email_id, encodeoldpassword], function(err, rows) {

   if (err) {
    console.log("Error  : %s ", err);
    res.end(JSON.stringify(rows));
   } else {
    var count = rows[0].count;
    if (count == 0) {
     var resultData = {

      success: 'FAILURE',
      message: 'Invalid User,Please Check Your Email Id,Mobile Number and Password '
     };
     res.end(JSON.stringify(resultData));

    } else if (count != 0) {

     var query = connection.query('update tbl_citizen set  password =?  where  mobile_number=? and email_id = ? ', [encodenewpassword, mobile_number, email_id], function(err, rows) {

      if (err) {
       console.log("erro " + err);

      } else {

       var resultData = {

        success: 'SUCCESS',
        message: 'Password Updated Successfully '
       };
       res.end(JSON.stringify(resultData));

      }
     });


    }

   }


  });

 });
};