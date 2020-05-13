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
     function editTask(){
		let taskToEdit = this.value;
        console.log(`edit row № - ${taskToEdit}`)
        //drawTasks();
        document.getElementById("toDoVal").value = `change values of ${taskToEdit}`;
    }
    function delTask(){
        console.log(`del tas${this.value}`);
		let taskToDelete = this.value;
        Tasks.splice(taskToDelete, 1);
        drawTasks();
	}
    
	function drawTasks(){
        let tableData = '<tr><th>№</th><th>Describe</th><th>Deadline</th><th>Edit task</th><th>Delet task</th></tr>';
        const taskColEditBtn = document.createElement("button");
        const taskColDelBtn = document.createElement("button");
        //Delete task button options 
			taskColDelBtn.className = "todo-button todo-button-delete";
			taskColDelBtn.append('Delete');
			taskColDelBtn.onclick = function(){
				let taskToDelete = this.value;
				Tasks.splice(taskToDelete, 1);
				drawTasks();
            };

            //Edit task button options
            taskColEditBtn.className = "todo-button todo-button-edit";
			taskColEditBtn.append('Edit');
			taskColEditBtn.onclick = function(){
				let taskToEdit = this.value;
				console.log(`edit row № - ${taskToEdit}`)
                //drawTasks();
                document.getElementById("toDoVal").value = `change values of ${taskToEdit}`;
                
			};
		for(i = 0; i < Tasks.length; i++){
            taskColDelBtn.value = i;
            taskColEditBtn.value = i;
             tableData += 
            `<tr>
                <td>${i}</td>
                <td>${Tasks[i].describe}</td>
                <td>${Tasks[i].deadline}</td>
                <td>
                    ${taskColEditBtn}
                </td>
                <td>
                    ${taskColDelBtn}
                </td>
            </tr>`
        }
        document.getElementById('content').innerHTML = tableData
    }