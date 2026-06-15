const taskCount = document.getElementById("task-count");
const clearAllBtn = document.getElementById("clear-all");
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
function addTask(){
    if(inputBox.value === ''){
        alert("You must write something");
    }else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
    updateTaskCount();
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
        updateTaskCount();
    }
    else if(e.target.tagName === "SPAN"){
        if(confirm("Delete this task?")){
        e.target.parentElement.remove();
        saveData();
        updateTaskCount();
}
    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function updateTaskCount(){
    let remaining = document.querySelectorAll("li:not(.checked)").length;
    taskCount.innerHTML = `Tasks Remaining: ${remaining}`;
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
    updateTaskCount();
}

showTask();

inputBox.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        addTask();
    }
});

clearAllBtn.addEventListener("click", function(){

    if(confirm("Delete all tasks?")){
        listContainer.innerHTML = "";
        saveData();
        updateTaskCount();
    }

});