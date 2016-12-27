
var services = angular.module('CDSApp.services', ['ngResource'])

services.factory('citizenFactory',function($http,$resource){    
    
 console.log("hi");
	
return $resource('/users/statistics', {},
			{
				getCitizen: {
				
				query: {
                method: 'GET',
                isArray: false
				
            }
					
				}


				
			}
		);	


});