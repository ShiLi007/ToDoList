//problem: user interaction doesn't provide desired resutls.
//solution: add interactivty so the user can manage daily tasks.

//--------------------------------------plan---------------------------------
//add a new task 
  //when the button  is pressed
  //create a new list item with the text from #new-task;
  	//input(check box)
  	//label
  	//input(text)
  	// button.edit
	//button.delete
  	//each elements, needs modified and appened
  
  
//edit an existing task
  	//when the edit button is pressed
  	//if the class of parent is .editMode
  	//we want to switch from editMode
  	//also label text become the input's value
  	//else 
  	//switch to .editMode
  	//input value becomes the label's text 
  	
  	//Toggle.editMode on the parent
  	
//delete an exisiting task
	//when the delete button is pressed 
	//Remove the parent list item from the ul
	
	
//mark a task as complete
  	//when the checkbox is checked
  	//append the task list item to the #completed-tasks
  	
//mark a task as incomplete
	//when the checkbox is uncheked 
	//append the task list item to the #incompleted-tasks


//--------------------------------------plan---------------------------------

var taskInput=document.getElementById("new-task");
var addButton=document.getElementsByTagName("button")[0];  //first button
var incompleteTasksHolder=document.getElementById("incomplete-tasks");
var completedTasksHolder=document.getElementById("completed-tasks");

//new task list item
var createNewTaskElement=function(taskString){ //checkbox
   //create list item
   var listItem=document.createElement("li")
   //input(checkbox)
   var checkBox=document.createElement("input")
   //label
   var label=document.createElement("label")
   //input(text)
   var editInput=document.createElement("input") 
   //button.edit
   var editButton=document.createElement("button")
   //button.delete
   var deleteButton=document.createElement("button")
   
  //each element needs modifying
  checkBox.type="checkbox";
  editInput.type="text";
  
  editButton.innerText="Edit";
  editButton.className="edit";
  deleteButton.innerText="Delete";
  deleteButton.className="delete";
  
  label.innerText = taskString;
  //each element needs appending 
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  
return listItem;
}

//add a new task 
var addTask=function(){
console.log("Add task...");  //testing purpose 
//create a new list item with the text from #new-task;
 var listItem=createNewTaskElement(taskInput.value) 
//append listItem to incompleteTasksHolder
 incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
  taskInput.value="";
  
};


var editTask=function(){
console.log("edit task...");  //console.log for testing purpose 

var listItem=this.parentNode;
  
var editInput=listItem.querySelector("input[type=text]");
var label=listItem.querySelector("label");
  
var containsClass=listItem.classList.contains("editMode");
  
  
if(containsClass){

label.innerText=editInput.value;
}else{
  
  editInput.value=label.innerText;
}
  
 listItem.classList.toggle("editMode");  
  
};

//delete an exisiting task when the delete button is pressed 
var deleteTask=function(){
console.log("delete task...");
  
 
  var listItem=this.parentNode;
  var ul=listItem.parentNode;
  //Remove the parent list item from the ul
  ul.removeChild(listItem);
}

//mark a task as complete when the checkbox is checked
var taskCompleted=function(){
console.log("Completed task..."); 
//append the task list item to the #completed-tasks  
var listItem= this.parentNode
completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

//mark a task as incomplete when the checkbox is uncheked 
var taskIncomplete=function(){
console.log("Incompleted task...");
//append the task list item to the #incompleted-tasks
  var listItem= this.parentNode;
incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  
}

var bindTaskEvents=function(taskListItem,checkBoxEventHandler){        
console.log("Bind list item events");  
	//select taskListItem's children
	var checkBox = taskListItem.querySelector('input[type=checkbox]');
	var editButton = taskListItem.querySelector('button.edit');
	var deleteButton = taskListItem.querySelector('button.delete');
	//bind editTask to edit button
	editButton.onclick = editTask;
	// bind deleteTask to delete button
	deleteButton.onclick = deleteTask;
	// bind checkBoxEventHandler to checkbox
	checkBox.onchange = checkBoxEventHandler; // onchange for spacebar or mouse click
};

var ajaxRequest=function(){
console.log("AJAX request");
}

addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);



//cycle over incompleteTasksHolder ul list items
for(var i=0;i<incompleteTasksHolder.children.length;i++){
//bind events to list item's children(taskCompleted)
bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
  
}

//cycle over completeTasksHolder ul list items	
for(var i=0;i<completedTasksHolder.children.length;i++){
//bind events to list item's children(taskIncomplete)
bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
  
}
  
