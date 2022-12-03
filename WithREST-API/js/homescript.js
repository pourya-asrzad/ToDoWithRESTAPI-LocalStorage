const titlegeter =document.getElementById('title')
const descriptiongeter =document.getElementById("description")
const dategeter =document.getElementById("date")
const btn =document.getElementById("sendbtn")
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
           
           
           //time


const senddata= async function(){
    try{
 const today = new Date();
const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
const dateTime = date+' '+time;
    const titleVal=titlegeter.value;
    const desVal=descriptiongeter.value;
    const dateVal =dategeter.value;
    await fetch(`https://6347eca8db76843976b5e973.mockapi.io/todos`,{
        method:'POST',
        body: JSON.stringify({
            dueDate:dateVal,
            title:titleVal,
            description:desVal,
            checked:false,
            createdAt:dateTime
        }),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    }).then((res)=>{res.json()
        if(res.ok==true){
      
           document.querySelector(".staus-of-send").appendChild(containerr)
           setTimeout(() => {
            containerr.remove();
            window.location.reload();
           }, 2000);
        }
    })}catch{

    window.location.href="/html/errormassege.html";
    }
}

btn.onclick=()=>{
    senddata();
}
status_del_img.onclick=()=>{
containerr.remove()
}