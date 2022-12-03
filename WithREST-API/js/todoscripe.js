import {runChange} from '/js/edit.js'
const getdata=async function(){

try{
   await fetch('https://6347eca8db76843976b5e973.mockapi.io/todos',{method:"GET"}).then(res=>res.json()).then(function exter(data){  
  const loadedspinner =document.querySelector(".progress-6")
         
   loadedspinner.classList.add("hidden")


const list_element =document.getElementById("list")
const pagenation_element =document.getElementById("pagination")
let current_page =1;
let row =4;


function displayItems(items,wrapper,roe_per_page,page){
wrapper.innerHTML='';
page--;
let start =roe_per_page*page;
let end=start+roe_per_page
let paginationItems =items.slice(start,end)
paginationItems.forEach((element) => {
   const card =document.createElement("div")
   card.classList.add("card")
   card.setAttribute("id",`card${element.id}`)
   const cardinnerbox1 =document.createElement("div")
   cardinnerbox1.classList.add("flexing-2item")
   const carddes=document.createElement("div")
   carddes.classList.add("card-description")
   card.appendChild(cardinnerbox1)
   card.appendChild(carddes)
   const cardtitle =document.createElement("div")
   cardtitle.classList.add("top-titre-card")
   cardinnerbox1.appendChild(cardtitle)
   const cardcheckbox =document.createElement("div")
   cardcheckbox.classList.add("checkbox-contain")
   cardtitle.appendChild(cardcheckbox)
   const checkbox =document.createElement("input")
   checkbox.setAttribute("type","checkbox")
   checkbox.classList.add("coustum-checkbox")
   checkbox.setAttribute("id",`check${element.id}`)
   cardcheckbox.appendChild(checkbox)
   const cardtitletext =document.createElement("div")
   cardtitletext.classList.add("title")
   const h1 =document.createElement("h1")
   h1.innerText=`${element.title}`;
   cardtitletext.appendChild(h1)
   const carddate =document.createElement("div")
   carddate.classList.add("card-date")
   cardtitle.appendChild(cardtitletext)
   const p= document.createElement("p")
   p.innerText=`${element.dueDate}`;
   carddate.appendChild(p)
   cardtitle.appendChild(carddate)
   const cardicons =document.createElement("div")
   cardicons.classList.add("icon-boxing")
   cardicons.classList.add("hidden")
   cardinnerbox1.appendChild(cardicons)
   const first_icon =document.createElement("div")
   first_icon.classList.add("onth-icon")
   cardicons.appendChild(first_icon)
   const first_icon_img=document.createElement("img")
   first_icon_img.setAttribute("src","/img/edit-xxl.png")
   first_icon_img.setAttribute("width","25")
   first_icon_img.setAttribute("id",`edit${element.id}`)
   first_icon.appendChild(first_icon_img)
   const second_icon =document.createElement("div")
   cardicons.appendChild(second_icon)
   const second_icon_img =document.createElement("img")
   second_icon_img.setAttribute("src","/img/1345874.png")
   second_icon.setAttribute("id",`delbtn${element.id}`)
   second_icon_img.setAttribute("width","25")
   second_icon.appendChild(second_icon_img)
   const card_description_p =document.createElement("p")
   card_description_p.innerText=`${element.description}`;
   carddes.appendChild(card_description_p)
   const wrapper =document.getElementById("list")
   

   wrapper.appendChild(card)
   // const loadedspinner =document.querySelector(".progress-6")
   // loadedspinner.classList.add("hidden")
   
   document.getElementById(`card${element.id}`).addEventListener("mouseover", ()=>{
      cardicons.classList.remove("hidden")
   });
   
   document.getElementById(`card${element.id}`).addEventListener("mouseout", ()=>{
      cardicons.classList.add("hidden")
   });
   document.getElementById(`check${element.id}`).addEventListener('change',async () => 

   {
       if(element.checked==false){
 await  fetch(`https://6347eca8db76843976b5e973.mockapi.io/todos/${element.id}`,{
     method:"PUT",
      body: JSON.stringify({
         checked:true
     }),
       headers: {"Content-type": "application/json; charset=UTF-8"}
   }).then(res=>res.json()).then(data=>console.log(data))}else{
  await     fetch(`https://6347eca8db76843976b5e973.mockapi.io/todos/${element.id}`,{
           method:"PUT",
            body: JSON.stringify({
               checked:false
           }),
             headers: {"Content-type": "application/json; charset=UTF-8"}
         }).then(res=>res.json()).then(data=>console.log(data))
   }

    });
    if(element.checked ){
document.getElementById(`check${element.id}`).setAttribute("checked",true)
    }

  document.getElementById(`edit${element.id}`).onclick=()=>{
 
      //   window.location.href="/html/edit.html";
      const url = new URL('http://127.0.0.1:5500/html/edit.html');
      const id = element.id;
      url.searchParams.set("id", id);
      window.history.pushState({}, "", url);
      window.location.reload()
      runChange()
  }




document.getElementById(`delbtn${element.id}`).onclick= ()=>{
   document.querySelector(".delete-tasks").setAttribute("style","opacity: 1;")
   document.querySelector("main").setAttribute("style","  opacity: 30%;")
   document.querySelector("header").setAttribute("style","  opacity: 30%;")
   document.querySelector(".delete-tasks").classList.remove("hidden")
   document.querySelector(".mode").innerText=`${element.title}`;
   document.querySelector(".date").innerText=`${element.dueDate}`;
   document.getElementById("button-delete").onclick=async ()=>{
      await  fetch(`https://6347eca8db76843976b5e973.mockapi.io/todos/${element.id}`,{method:'DELETE'})
      document.querySelector(".delete-tasks").classList.add("hidden")
      document.getElementById(`card${element.id}`).remove();
      document.querySelector("main").setAttribute("style","    opacity: 1;")
      document.querySelector("header").setAttribute("style","  opacity: 1;")
   document.getElementById(`card${element.id}`).display="none";

}
}


});
}
function setupPagination (items,wrapper,rows_per_page){
wrapper.innerHTML='';
let page_count =Math.ceil(items.length/rows_per_page);
for(let i= 1;i<page_count+1;i++){
let btn=   PaginationButton(i,items);
wrapper.appendChild(btn)
}
}


function PaginationButton(page,items){
let button =document.createElement("button")
button.innerText=page;
if(current_page==page) button.classList.add("active")

button.addEventListener('click',()=>{
   
   current_page =page;
   displayItems(items,list_element,row,current_page)
   setupPagination(data,pagenation_element,row)
   let current_btn =document.querySelector(".pagenumber button.active")
   current_btn.classList.remove("active");
   button.classList.add("active")
})
return button

}
setupPagination(data,pagenation_element,row)
displayItems(data,list_element,row,current_page)



}) 


}catch{
   window.location.href="/html/errormassege.html";
}

}
getdata();





document.getElementById("cancelmassege").onclick=()=>{
   document.querySelector("header").setAttribute("style","  opacity: 1;")
   document.querySelector("main").setAttribute("style","    opacity: 1;")
   document.querySelector(".delete-tasks").classList.add("hidden")
}
