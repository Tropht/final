var blogApp = angular.module('blogApp', ['ui.router']);

blogApp.config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('/home');

	$stateProvider

	// NESTED VIEWS
	.state('home',{
		url: '/home',
		templateUrl:'home.html'
	})
	.state('posts',{
		url:'/posts',
		templateUrl:'posts.html'
	})
	.state('manage',{
		url:'/manage',
		templateUrl:'manage.html'
	})
});

blogApp.service('dbPosts', ['$http', function ($http) {
	this.getPost = function(){
		return $http.get('http://localhost:3000/posts');
	}

	this.deletePost = function(id){
		return $http.delete('http://localhost:3000/posts/' + id);
	}

	this.updatePost = function(id, data){
		return $http.put('http://localhost:3000/posts/' + id, data);
	}

	this.createPost = function(data){
		return $http.post('http://localhost:3000/posts/', data);
	}


}]);

blogApp.controller('myCtrl', ['$scope', 'dbPosts', function($scope, dbPosts){

// Get Posts
	dbPosts.getPost().success(function(data){
	$scope.dbPosts = data;

	 $scope.postLength = $scope.dbPosts.length;
	 $scope.lastPost = $scope.dbPosts[$scope.dbPosts.length - 1];

	});



	$scope.newPost = {}; //New Post Object
// Create Posts
	$scope.create = function(){
			dbPosts.createPost($scope.newPost);

			$scope.newPost = {};
			window.location.reload();
		}
// Delete Posts
	$scope.delete = function(id){
			dbPosts.deletePost(id).success(function(resp){
				console.log(resp)
			});
			window.location.reload();
		};


}])
