
//all tasks
let data = []

//drowing tasks
function drawTable(){
  let table = document.getElementById('table');
  let tableHtml = '';
  console.log('drawing')
  data.map((value, index) => {
    tableHtml +=`<tr>
      <td>${index + 1}</td>
      <td>${value.name}</td>
      <td>${value.task}</td>
      <td><button value='${value.id}' onclick='edit(this.value)' type='button' class='btn btn-warning'>Edit</button></td>
      <td><button value='${value.id}' onclick='del(this.value)' type='button' class='btn btn-danger'>Delete</button></td>
    </tr>`
  })
  table.innerHTML = tableHtml;
}


//real time db
db.collection('Users').onSnapshot(snapshot =>{
  let changes = snapshot.docChanges();
  changes.map(change =>{
    if(change.type == 'added'){
      let addData = () => {
        const el = change.doc.data();
        el.id = change.doc.id
        data = [...data, el]
      }
      //console.log('adding user')
      addData();
    } else if(change.type == 'removed'){
      let remuveData = () => {
        const el = change.doc.data();
        el.id = change.doc.id
        data = data.filter(item => item.id !== el.id)
      }
      //console.log('remuving user')
      remuveData();
    } else {
      //console.log('updating user') 
      
      let updateData = () => {
        const el = change.doc.data();
        el.id = change.doc.id
        let newIndex;
        updated = data.map((item, index) => {
          item.id == el.id ? newIndex = index : null
        })
        const name =  document.querySelector('#name');
        const task =  document.querySelector('#task');
        data[newIndex].name = name.value;
        data[newIndex].task = task.value;
      }
      updateData()
    }
  })
  drawTable()
})

//class users editing tasks and users
class Users{
  constructor(name, task, deadline){
    this.name = name
    this.task = task
    this.deadline = new Date()

    this.usersDb = db.collection('Users');
    this.addUser = this.addUser.bind(this)
  }
  addUser(){
    this.usersDb.add({
      name: this.name,
      task: this.task,
      deadline: this.deadline
    })
    console.log('user added')
  }
  delUser(id){
    this.usersDb.doc(id).delete();
  }
  updateUser(id){
    this.usersDb.doc(id).update({
      name: this.name,
      task: this.task,
      deadline: this.deadline
    })
  }
}

class AddingTask extends Users{
  constructor(submit = false, name, task, deadline){
    super(name, task, deadline);
    this.submit = submit
  }
  checkFields(){
    if(this.name !== '' && this.task !== ''){
      return true
    }else{
      return false
    } 
  }
}



//del task
function del(index){
  const user_to_delete = new Users();
  user_to_delete.delUser(index);
}

function edit(index){
  console.log('index of user - ', index)
  const button = document.querySelector('#submitButton');
  const name =  document.querySelector('#name');
  const task =  document.querySelector('#task');

  user = data.filter(item => item.id==index)
  console.log(user)
  name.value = user[0].name;
  task.value = user[0].task;
  button.value = 'Eddit task'
  button.setAttribute('onclick',`edditTask('${index}')`);
}
function edditTask(index){
  const name =  document.querySelector('#name');
  const task =  document.querySelector('#task');
  const button = document.querySelector('#submitButton');

  const user_to_update = new Users(name.value, task.value);
  user_to_update.updateUser(index)

  function time(){
    button.value = 'Add task'
    button.setAttribute('onclick','submitForm()');
    name.value = ''
    task.value = ''
  }
  setTimeout(time, 100)
}

//add new task
function submitForm(){
  const name = document.querySelector('#name');
  const task = document.querySelector('#task');
  const newTask = new AddingTask(false, name.value, task.value);
  
  if(newTask.checkFields()){
    console.log('will add')
    newTask.addUser()
  }else{
    console.log('not add')
  }
  name.value = task.value = '';
}
/*
const lol = new AddingTask(false, 'kaka', 'sratu');
console.log(lol.checkFields())
const kek = new Users('name', 'task');
console.log(kek)
// const lol = new Users('Taras', 'тестове завдання')
// lol.addUser()*/
