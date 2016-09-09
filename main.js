var ap = angular.module('mapp',[]);
ap.controller('mainCntrl',function($scope,$http){
	//var reposit,lang;
	var langrepo0;
	var curent_page=1;
	var total_pages=0;
	$scope.page="";
	var page_num=1;
	var loadDataByLanguage  = function(page_num){
        langrepo0=0;
   	    $scope.datal="";
	    langs =  $scope.languageName;
	    var url = "https://api.github.com/search/repositories?q=+language:"+langs+"&sort=star&order=desc&page="+page_num+"&per_page=100";
	    $http.get(url).then(function(response,data){
		$scope.data = response.data.items;
		$scope.datac = response.data.total_count;
		total_pages = $scope.datac/100;
		if($scope.datac%100!=0) total_pages++;
		
		$scope.totalrepo = "we have found "+$scope.datac+" repositories";
		$scope.page="page "+curent_page;
	});
	}
	$scope.fetchByLanguage = function(page_num){
	    curent_page = 1;
	    loadDataByLanguage(page_num);
	}
	var loadRepositories = function(page_num){
        langrepo0=1
    	$scope.data="" ;	
    	var reposit =  $scope.repositoryName;
	    var url = "https://api.github.com/search/repositories?q="+reposit+"&sort=star&order=desc&page="+page_num+"&per_page=100";
	    $http.get(url).then(function(response,data){
		$scope.datal = response.data.items;
		$scope.datac = response.data.total_count;
		total_pages = $scope.datac/100;
		if($scope.datac%100!=0) total_pages++;
		$scope.totalrepo = "we have found "+$scope.datac+" repositories";
		$scope.page="page "+curent_page;
	});
	}
	$scope.fetch = function(page_num){
		curent_page=1;
		loadRepositories(page_num);
	}

	$scope.next_page = function() {
		if(curent_page<total_pages){
			curent_page++;
			page_num++;
			if(langrepo0==0)
			  loadDataByLanguage(page_num);
			else if(langrepo0==1) loadRepositories(page_num);
		}
	}
	$scope.prev_page = function() {
		if(curent_page>1){
			curent_page--;
			page_num--;
			if(langrepo0==0)
			  loadDataByLanguage(page_num);
			else if(langrepo0==1) loadRepositories(page_num);
		}else alert("already at first page");
	}
	
});
//console.log("Hello World");

