window.addEventListener("DOMContentLoaded", init);
	var storage = window.localStorage;
	window.addEventListener("storage", function(){
		loadTasksFromStorage();
	})
	function init(){
		document.getElementById("btnAddTask").addEventListener("click",onBtnAddTaskClick);
		document.getElementById("btnRemoveCompleted").addEventListener("click", onBtnRemoveCompletedClick);

		loadTasksFromStorage();
	}
	function loadTasksFromStorage(){
		document.getElementById("ulTaskList").innerHTML = "";
		for(var i=0;i<storage.length;i++){
			var taskId = storage.key(i);
			var taskName = storage.getItem(taskId);
			addTaskToList(taskId,taskName);
		}
	}
	function onBtnAddTaskClick(){
		var taskName = document.getElementById("txtTask").value;

		var taskId = new Date().getTime().toString();
		storage.setItem(taskId,taskName);
		addTaskToList(taskId,taskName);
		
	}
	function addTaskToList(taskId, taskName){
		var newTask = document.createElement("li");
		newTask.innerHTML = taskName;
		newTask.setAttribute("task-id", taskId);
		newTask.addEventListener("click", onTaskClick);
		document.getElementById("ulTaskList").appendChild(newTask);
	}
	function onTaskClick(){
		this.classList.toggle("completed");
	}
	function onBtnRemoveCompletedClick(){
		var taskItems = document.getElementById("ulTaskList").children;
		for(var i=taskItems.length-1;i>=0;i--)
			if (taskItems[i].classList.contains("completed")){
				var taskId = taskItems[i].getAttribute("task-id");
				storage.removeItem(taskId);
				taskItems[i].remove();
			}
	}