exports.authenticateuser = function(req, res) {
 var input = JSON.parse(JSON.stringify(req.body));

 req.getConnection(function(err, connection) {

  var username = input.username;
  var password = input.password;
console.log("username "+username);
console.log("password "+password);
  // base64.encode(passwrd);
  connection.query("select * from login WHERE username = ? and password= ? ", [username, password], function(err, rows) {

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
