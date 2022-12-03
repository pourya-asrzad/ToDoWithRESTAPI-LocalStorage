//get value of inputs
const tasktype = document.querySelector(".type-task");//select first type (tasks)
const titleinput = document.querySelector("#title");
const desinput = document.querySelector("#description");
const dateinput = document.querySelector(".date");


let datasaver = JSON.parse(localStorage.getItem("task")) || [];//if localStorage in existe it will return else array will return
let data = JSON.parse(localStorage.task);//parse localstorage
function addtask() {
  datasaver.push({
    title: titleinput.value ? titleinput.value : "no title! ",
    description:desinput.value?desinput.value:"no description",
    date: dateinput.value,
    id: Math.round(Date.now()/100),
    display: "visible",
    type:"tasks"
  });//push value and type in localstorage dynamicly
  localStorage.setItem("task", JSON.stringify(datasaver));//set in local storage the array

  const card = document.createElement("div");//create card container for append
  card.classList.add("card");
  card.classList.add(`${datasaver[datasaver.length - 1].display}`);//set info to card
  card.setAttribute("id", `c${Math.round(Date.now()/100)}`);
  card.innerHTML = `<div class="card-top">
   <h3>${datasaver[datasaver.length - 1].title}</h3>
   <span id="del${Math.round(Date.now()/100)}" value="del" >&#215;</span>
   </div>
   <p>start:${datasaver[datasaver.length - 1].date}</p>
   <p>end:2022-10-26</p>
   <div class="card-icons">
   <div id="back${Math.round(Date.now()/100)}">
       <span>&#8212;</span>
   </div>
   <div id="des${Math.round(Date.now()/100)}" valu="${datasaver[datasaver.length - 1].decription}">
       <span>&#8505;</span>
   </div>
   <div id="nex${Math.round(Date.now()/100)}">
       <span>&#10004</span>
   </div>
   </div>`;
  tasktype.appendChild(card);

  //this await and reload is because of bugge is that if we don`t do that the getall function will not work 
  document.getElementById(`des${Math.round(Date.now()/100)}`).addEventListener("click",async () => {
    await window.location.reload()
    
  });
  document.getElementById(`nex${Math.round(Date.now()/100)}`).addEventListener("click",async () => {
    await window.location.reload()
    
  });
  document.getElementById(`back${Math.round(Date.now()/100)}`).addEventListener("click",async () => {
    await window.location.reload()
    
  });
  document.getElementById(`del${Math.round(Date.now()/100)}`).addEventListener("click",async () => {
    await window.location.reload()
  });

}

function getall() {//handel all thing is here actually
  data.map((ele) => {//map on localstorage that we parse and set to data varieble
    const card = document.createElement("div");//create card container again
    card.classList.add("card");
    card.classList.add(`${ele.display}`);
    card.setAttribute("id", `c${ele.id}`);
    card.innerHTML = `<div class="card-top">
   <h3>${ele.title}</h3>
   <span id="del${ele.id}" >&#215;</span>
   </div>
   <p>start:${ele.date}</p>
   <p>end:2022-10-26</p>
   <div class="card-icons">
   <div id="back${ele.id}">
       <span>&#8212;</span>
   </div>
   <div  id="des${ele.id}">
       <span>&#8505;</span>
   </div>
   <div id="nex${ele.id}">
       <span>&#10004</span>
   </div>
   </div>`;
   
   if(ele.type=="tasks"){
     tasktype.appendChild(card);//we select where should go our card with get type ot localstorage 

   }else if(ele.type=="doing"){
    document.getElementById("doingtype").appendChild(card)
   }else if(ele.type=="completetype"){
    document.getElementById("completetype").appendChild(card)
   }
   //

   //next or check button is handeling here 
   document.getElementById(`nex${ele.id}`).addEventListener("click", () => {
     if (ele.type=="tasks"){//it`s a simple Condition
       ele.type = "doing";
       localStorage.task = JSON.stringify(data);
       document.getElementById("doingtype").appendChild( document.getElementById(`c${ele.id}`))
      }else if(ele.type=="doing"){
        console.log(ele.type);
        ele.type = "completetype";
       localStorage.task = JSON.stringify(data);
       document.getElementById("completetype").appendChild( document.getElementById(`c${ele.id}`))
      }
    });

//show description is handeled here with alert
    document.getElementById(`des${ele.id}`).addEventListener('click',()=>{
      alert(ele.description)
    })

    //back or minez button is handeled here
    document.getElementById(`back${ele.id}`).addEventListener("click", () => {
      console.log("object");
      if (ele.type=="doing"){//it`s oposite of next button handeling
        ele.type = "tasks";
        localStorage.task = JSON.stringify(data);
        tasktype.appendChild( document.getElementById(`c${ele.id}`))
       }else if(ele.type=="completetype"){
         console.log(ele.type);
         ele.type = "doing";
        localStorage.task = JSON.stringify(data);
        document.getElementById("doingtype").appendChild( document.getElementById(`c${ele.id}`))
       }
       
     });

    //we cleare the task here
    function deleter() {
      document.getElementById(`del${ele.id}`).addEventListener("click", () => {
        document.getElementById(`c${ele.id}`).remove();
        ele.display = "hidden";
        console.log(ele.display);
        localStorage.task = JSON.stringify(data);
        // removeObjectWithId(datasaver, ele.id);
      });
    }
    deleter();
  });
}
getall();

//have a good day
