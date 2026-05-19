let queue=[];

const container=document.getElementById("queueContainer");
const historyList=document.getElementById("historyList");

function renderQueue(){

container.innerHTML="";

queue.forEach(value=>{

const div=document.createElement("div");
div.className="queue-item";
div.textContent=value;

container.appendChild(div);

});

}

function addHistory(type,value){

const li=document.createElement("li");

if(type==="enqueue"){
li.innerHTML=`<span class="arrow-up">↑</span> Enqueue: ${value}`;
}

if(type==="dequeue"){
li.innerHTML=`<span class="arrow-down">↓</span> Dequeue: ${value}`;
}

historyList.prepend(li);

}

function enqueue(){

const input=document.getElementById("valueInput");
const value=input.value;

if(value==="") return;

queue.push(value);

addHistory("enqueue",value);

input.value="";

renderQueue();

}

function dequeue(){

if(queue.length===0){
    alert("Queue Underflow");
    return;
}

const value = queue.shift(); // Removes from FRONT

addHistory("dequeue", value);

renderQueue();

}

function peekFront(){

if(queue.length===0){
alert("Queue Empty");
return;
}

renderQueue();

const items=document.querySelectorAll(".queue-item");

items[0].classList.add("front-highlight");

}

function peekRear(){

if(queue.length===0){
alert("Queue Empty");
return;
}

renderQueue();

const items=document.querySelectorAll(".queue-item");

items[items.length-1].classList.add("rear-highlight");

}

function clearQueue(){

queue=[];
historyList.innerHTML="";
renderQueue();

}

/* TABS */

function showTab(tab){

document.getElementById("visual").style.display="none";
document.getElementById("explain").style.display="none";

document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));

if(tab==="visual"){
document.getElementById("visual").style.display="flex";
document.querySelectorAll(".tab")[0].classList.add("active");
}

if(tab==="explain"){
document.getElementById("explain").style.display="block";
document.querySelectorAll(".tab")[1].classList.add("active");
}

}


function setArray() {

    const inputField = document.getElementById("input");

    const input = inputField.value.trim();

    if (!input) return;

    // Allow only numbers, spaces and negative sign
    const validPattern = /^-?\d+(\s-?\d+)*$/;

    if (!validPattern.test(input)) {

        alert("Please enter only numbers separated by spaces.");

        inputField.value = "";

        return;
    }

    arr = input
        .split(" ")
        .map(Number)
        .slice(0, 6);

    render();

    log("Array Set");
}