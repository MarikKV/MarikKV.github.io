let Tasks = [];
	function addTask(){
		const describe = document.getElementById("toDoVal").value;
		const deadline = document.getElementById("deadline").value;
		
		if(describe === ''){
			alert('Task is empty. Please enter describe of task.')
		}
		if(describe !== ''){
			Tasks.push({describe: describe, deadline: deadline});
			drawTasks();
		}
	}
	function drawTasks(){
		document.getElementById('content').innerHTML = '<tr><th>№</th><th>Describe</th><th>Deadline</th><th>Edit task</th><th>Delet task</th></tr>';
			
		for(i = 0; i < Tasks.length; i++){
			const task = document.createElement("tr");
			//colums in table
			const taskColNum = document.createElement("td");
			const taskColDeskribe = document.createElement("td");
			const taskColDeadline = document.createElement("td");
            const taskColEdit = document.createElement("td");
            const taskColDel = document.createElement("td");
            
            //creatinfg buttons: edit and delet
			const taskColEditBtn = document.createElement("button");
            const taskColDelBtn = document.createElement("button");
            
            
            
			//Delete task button options 
			taskColDelBtn.className = "todo-button todo-button-delete";
			taskColDelBtn.value = i;
			taskColDelBtn.append('Delete');
			taskColDelBtn.onclick = function(){
				let taskToDelete = this.value;
				Tasks.splice(taskToDelete, 1);
				drawTasks();
            };

            //Edit task button options
            taskColEditBtn.className = "todo-button todo-button-edit";
			taskColEditBtn.value = i;
			taskColEditBtn.append('Edit');
			taskColEditBtn.onclick = function(){
				let taskToEdit = this.value;
				console.log(`edit row № - ${taskToEdit}`)
                //drawTasks();
                document.getElementById("toDoVal").value = `change values of ${taskToEdit}`;
                
			};
			
			taskColNum.append(i);
			taskColDeskribe.append(Tasks[i].describe);
			taskColDeadline.append(Tasks[i].deadline);
            taskColEdit.append(taskColEditBtn);
			taskColDel.append(taskColDelBtn);
			
			task.append(taskColNum, taskColDeskribe, taskColDeadline, taskColEdit, taskColDel)
			
			document.getElementById("content").append(task)
		}
	}