angular.module('TodoListCtrl', []).controller('TodoListController', function($scope,$socket) {
	$scope.todos= [];
	$scope.newTodo = "";
	$scope.init = function(){
		 $socket.emit('init');
	};
	$socket.on('init',function(data){
		$scope.todos = data;
	});
	
	$scope.addTodo = function(){
		var todo = {};
		todo.text = $scope.newTodo;
		$scope.todos.push(todo);
		$socket.emit("addTodo",todo);
	};
	
	$socket.on('modificationTodoList', function(data){
		$scope.todos = data;
	});
			
	$socket.on('message', function(data) {
		insereMessage(data.pseudo, data.message)
	});
	
	$scope.delTodo = function(index){
		$scope.todos.splice(index, 1);
		$socket.emit("delTodo",index);
	};

	$scope.init();
});