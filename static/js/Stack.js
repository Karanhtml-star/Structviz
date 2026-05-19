let stack=[];

const container=document.getElementById("stackContainer");
const historyList=document.getElementById("historyList");

function renderStack(){

container.innerHTML="";

stack.forEach(value=>{

const div=document.createElement("div");
div.className="stack-item";
div.textContent=value;

container.appendChild(div);

});

}

function addHistory(type,value){

const li=document.createElement("li");

if(type==="push"){
li.innerHTML=`<span class="arrow-up">↑</span> Push: ${value}`;
}

if(type==="pop"){
li.innerHTML=`<span class="arrow-down">↓</span> Pop: ${value}`;
}

historyList.prepend(li);

}

function pushStack(){

const input=document.getElementById("valueInput");
const value=input.value;

if(value==="") return;

stack.push(value);

addHistory("push",value);

input.value="";

renderStack();

}

function popStack(){

if(stack.length===0){
alert("Stack Underflow");
return;
}

const items=document.querySelectorAll(".stack-item");

const top=items[items.length-1];

top.classList.add("pop");

setTimeout(()=>{

const value=stack.pop();

addHistory("pop",value);

renderStack();

},350);

}

function peekStack(){

if(stack.length===0){
alert("Stack Empty");
return;
}

renderStack();

const items=document.querySelectorAll(".stack-item");

items[items.length-1].classList.add("peek-highlight");

}

function clearStack(){

stack=[];
historyList.innerHTML="";
renderStack();

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