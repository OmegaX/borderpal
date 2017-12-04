borderApp.controller('CDNwaitController', ['$scope', 'CDNwaitService', 'anchorSmoothScroll',function ($scope, CDNwaitService, anchorSmoothScroll) {
	$("#spinner").hide();
	$scope.getCDNwaits = function() {
		CDNwaitService.CDNwaitsMethod().then(function(result) {
			var result = result.data;		
		})
	}
	console.log("stuff");
	$scope.getCDNdelays();
}]); 