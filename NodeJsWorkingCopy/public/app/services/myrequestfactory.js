app.factory('myrequestFactory',function($http,$sessionStorage){    
    
return {
	
      mypostrequests: function(params){
         
        $sessionStorage.pageno =1;
        $sessionStorage.reqtitle ="N";
        $sessionStorage.reqpriority ="0";
        $sessionStorage.reqstatus ="0";
        $sessionStorage.reqcategory ="N";

         var userid =$sessionStorage.userID;
         var pageno =$sessionStorage.pageno;
         var title =$sessionStorage.reqtitle;
         var priority =$sessionStorage.reqpriority;
         var status =$sessionStorage.reqstatus;
         var category =$sessionStorage.reqcategory;
        
        return  $http.post('/requestdata/mypostrequests',{"userid": userid, "pageno": pageno,"title": title,"priority": priority,"status": status,"category": category,"requestid":0});
    },

     mypostrequestsparams: function(params){

         
         $sessionStorage.pageno =1;
         var userid =$sessionStorage.userID;
         var pageno =$sessionStorage.pageno;
         var title =$sessionStorage.reqtitle;
         var priority =$sessionStorage.reqpriority;
         var status =$sessionStorage.reqstatus;
         var category =$sessionStorage.reqcategory;
        
        return  $http.post('/requestdata/mypostrequests',{"userid": userid, "pageno": pageno,"title": title,"priority": priority,"status": status,"category": category,"requestid":0});
    },

    postvoteforrequest: function(params){
         
        var userid =$sessionStorage.userID;
         var requestid =$sessionStorage.requestid;  

        return  $http.post('/requestdata/postvotes',{"userid":userid,"requestid":requestid});
    },
      requestdetails: function(params){
         
        $sessionStorage.pageno =1;
         var userid =$sessionStorage.userID;
         var pageno =$sessionStorage.pageno;
         var title ="N";
         var priority ="0";
         var status ="0";
         var category ="N";
         var requestid =$sessionStorage.requestid;
        
        return  $http.post('/requestdata/mypostrequests',{"userid": userid, "pageno": pageno,"title": title,"priority": priority,"status": status,"category": category,"requestid":requestid});
    },
     getnextrequests: function(params){

         var userid =$sessionStorage.userID;
         var pageno =$sessionStorage.pageno;
         var title =$sessionStorage.reqtitle;
         var priority =$sessionStorage.reqpriority;
         var status =$sessionStorage.reqstatus;
         var category =$sessionStorage.reqcategory;
        
        return  $http.post('/requestdata/mypostrequests',{"userid": userid, "pageno": pageno,"title": title,"priority": priority,"status": status,"category": category,"requestid":0});
    },
     capturemood: function(params){
         
        var userid =$sessionStorage.userID;
         var requestid =$sessionStorage.requestid;  
         var factorid =$sessionStorage.moodid;
       
         return  $http.post('/requestdata/mymoods',{"userid":userid,"factorid":factorid,"requestid":requestid});
    },
    moodperrequest: function(params){
         
       
         var requestid =$sessionStorage.requestid;  
        
        return  $http.post('/requestdata/moodperrequestpercentage',{"requestid":requestid});
    },
     getrequesthistory: function(params){
         
       
         var requestid =$sessionStorage.requestid;  
        
        return  $http.post('/processdata/getrequesthistory',{"requestid":requestid});
    },
    getrequestcomments: function(params){
         
       
         var requestid =$sessionStorage.requestid;  
         console.log("facgo"+requestid);
        
        return  $http.post('/processdata/getrequestusercomments',{"requestid":requestid});
    },
    postrequestcomments: function(params){
         
       
         var requestid =$sessionStorage.requestid;  
         var desc =$sessionStorage.desc;  
         var userid =$sessionStorage.userID;
        
        return  $http.post('/processdata/postcommentsforrequest',{"requestid":requestid,"desc":desc,"userid":userid});
    },
     moodoverall: function(params){
      
        return  $http.post('/requestdata/moodoveralltpercentage');
    }



};	


});