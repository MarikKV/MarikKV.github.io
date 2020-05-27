
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
      <td><button value='${value.id}' onclick='myFunction(this.value)'>Del</button></td>
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
      addData();
    } else if(change.type == 'removed'){
      let addData = () => {
        const el = change.doc.data();
        el.id = change.doc.id
        data = [...data, el]
      }
      addData();
    } else {
      console.log('another type')  
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
function myFunction(index){
  console.log('index', index)
  data = data.filter( val => val.id != index)
  console.log('data', data)
  drawTable()
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
