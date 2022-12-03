const containerr =document.createElement("div")
containerr.classList.add("massege-notice")
const statustitle =document.createElement("p")
statustitle.classList.add("status")
statustitle.innerText="Successful";
const desstatus =document.createElement("p")
desstatus.innerText='The todo Successful submited';
const status_del_img =document.createElement("img")
status_del_img.classList.add("icon-delete")
status_del_img.setAttribute("width","30")
 status_del_img.setAttribute("src","/img/cancel_circle_close_delete_discard_file_x_icon_123219.png")
containerr.appendChild(statustitle)
containerr.appendChild(desstatus)
containerr.appendChild(status_del_img) 
const titleinput =document.getElementById("title")
const descriptoninput =document.getElementById("description")
const duedateinput =document.getElementById("date")
export  async function runChange() {
try{
  const today = new Date();
  const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date+' '+time;
  let params = new URLSearchParams(document.location.search);
const dataid= params.get("id") 
if(params.get("id") ){
await fetch(`https://6347eca8db76843976b5e973.mockapi.io/todos/${dataid}`).then(res=>res.json()).then((data)=>{
titleinput.value=data.title
descriptoninput.value=data.description
duedateinput.value=data.dueDate
})  
  const loadedspinner =document.querySelector(".progress-6")
   loadedspinner.classList.add("hidden")
 document.getElementById("savebtn").onclick=()=>{
   fetch(`https://6347eca8db76843976b5e973.mockapi.io/todos/${dataid}`,{
  method:"PUT",
   body: JSON.stringify({
    title:titleinput.value,
    description:descriptoninput.value,
    dueDate:duedateinput.value,
    updateAt:dateTime
  }),
    headers: {"Content-type": "application/json; charset=UTF-8"}
}).then((res)=>{res.json()
  if(res.ok==true){

     document.querySelector(".staus-of-send").appendChild(containerr)
     setTimeout(() => {
      containerr.remove();
      window.location.href="/html/home.html"
     }, 2000);
  }
})
}


}
}catch{
  window.location.href="errormassege.html";
}

}

runChange()



// window.addEventListener("load",()=>{
//   const loadedspinner =document.querySelector(".progress-6")
//    loadedspinner.classList.add("hidden")

// })