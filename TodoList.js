function storedata() {
  const datastorage = localStorage.getItem("fulldata");
  const storage = JSON.parse(datastorage);
  return storage;
}
function dom_insert(data,checkboxcheck,lineThrough) {
  document.getElementById("todo-task").value = '';
  const display = document.getElementById("show-todo");
  display.innerHTML +="<span class=task-list "+lineThrough+">" +
      "<input type=checkbox class='check_input'"+ checkboxcheck +"/>"
      + data + 
      "<button class='delete task-button'><i class='fa fa-trash-o'></i></button>" +
      "<button class='edit_todo task-button'><i class='fa fa-edit'></i></button>"+
      "</span>";
}

function onscreenload(){  
  let checkboxcheck = "";
  let lineThrough ="";
  let datastorage = localStorage.getItem("fulldata");
  if (datastorage != null) {
    const display = document.getElementById("show-todo");
    const localdata = storedata();
    localdata.forEach(function (result) {
      if (result.ischeck == true) {
        checkboxcheck = "checked";
        lineThrough ="style=text-decoration:line-through";
      }
      else {
      checkboxcheck = "";
      lineThrough ="";
      }
       dom_insert(result.item,checkboxcheck,lineThrough);
    });
  }
}
onscreenload();



function createstorage(data) {
  const reference = localStorage.getItem('fulldata');
  if (reference) {
    data = data.trim();
    let flag;
    let object = JSON.parse(reference);
    object.forEach(function (result) {
      if (result.item.toLowerCase() == data.toLowerCase()) {
        flag = 1;
      }
    });
    if (flag == 1) {
      alert("Duplicate Entry");
    }
    else {
      let store = { item: data, ischeck: false };
      object.push(store);
      dom_insert(data,"","");
      localStorage.setItem("fulldata", JSON.stringify(object));
    }
  }
  else {
    let store = [{ item: data, ischeck: false }];
    dom_insert(data,"","");
    localStorage.setItem("fulldata", JSON.stringify(store));
  }
}
function checkbox() {
  const checkbox = document.getElementsByClassName("check_input");
  for (i = 0; i < checkbox.length; i++) {
    checkbox[i].addEventListener("click", function () {
      if (this.checked == true) {
        this.setAttribute("checked",true);
        this.parentElement.setAttribute("style","text-decoration:line-through");
        let store = storedata();
        let index = store.findIndex(obj => obj.item == this.parentElement.innerText);
        store[index].ischeck = true;
        localStorage.setItem("fulldata", JSON.stringify(store));
      }
      else {
        this.removeAttribute("checked",false);
        this.parentElement.setAttribute("style","text-decoration:");
        let store = storedata();
        let index = store.findIndex(obj => obj.item == this.parentElement.innerText);
        store[index].ischeck = false;
        localStorage.setItem("fulldata", JSON.stringify(store));
      }
    });
  }
}


function deletebutton() {
  const clickdel = document.getElementsByClassName("delete");
  for (i = 0; i < clickdel.length; i++) {
    clickdel[i].addEventListener("click", function () {
      this.parentElement.remove();
      let store = storedata();
      let index = store.findIndex(obj => obj.item == this.parentElement.innerText);
      store.splice(index, 1);
      localStorage.setItem("fulldata", JSON.stringify(store));
    });
  }
}
function addElements() {
  const data = document.getElementById("todo-task").value;
  if (data == "") {
    alert("Field required");
  }
  else {
    createstorage(data);
    deletebutton();
    checkbox();
  }
}

deletebutton();
checkbox();

function edit_menu_todo() {
  const todoedit = document.getElementsByClassName("edit_todo");
  for (i = 0; i < todoedit.length; i++) {
    todoedit[i].addEventListener("click", function () {
        document.getElementById("edit_menu").style.display="";
        document.getElementById("show_current").innerText=this.parentElement.innerText;
    });
  }
}
edit_menu_todo();

function close_edit_menu()
{
  document.getElementById("edit_menu").style.display="none";
}

function edit_current_value()
{
  const edit_input_data = document.getElementById("edit_todo_input").value;
   if(edit_input_data==""){
     alert("Plese enter New Value");
   }
   else{
    let store = storedata();
    let index = store.findIndex(obj => obj.item == document.getElementById("show_current").innerText);
    document.getElementsByClassName("task-list")[index].innerText=edit_input_data;
    store[index].item = edit_input_data;
    localStorage.setItem("fulldata", JSON.stringify(store));
   }
}

// let store = storedata();
//         let index = store.findIndex(obj => obj.item == this.parentElement.innerText);
//         store[index].ischeck = true;
//         localStorage.setItem("fulldata", JSON.stringify(store));