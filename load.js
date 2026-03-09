let opendata = [];
let closedata = [];
let  counts = []


let loading=()=>{
    let active = document.querySelectorAll(".spiner")
    active.forEach(spiner=>{
        spiner.classList.remove("hidden")
    })
}

let loadingoff=()=>{
    let active = document.querySelectorAll(".spiner")
    active.forEach(spiner=>{
        spiner.classList.add("hidden")
    })
}

let loadcard =async ()=>{
    loading()
   let response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
   let res = await response.json()
    // console.log(res.data.length)
    counts = res.data;
    totalcount(res.data)
    showcard(res.data)
    filteritem(res.data)
    loadingoff()
    
    
}
let totalcount = (data)=>{
    let total = document.getElementById("total-count")
    total.innerText = data.length
    let counts = data
    return counts
}
let showcard = (info)=>{
    let getdiv = document.getElementById("card-section")
    getdiv.innerHTML = " "
    info.forEach(element => {
        let div = document.createElement("div")

        div.innerHTML=`
        <div
                class="w-full max-w-[350px] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">

                <div  class="borders-t h-1.5 bg-[#10b981] w-full"></div>
                    
                <div onclick="modalinfo(${element.id})" class="p-6 pb-4">
                    <div class="flex justify-between items-center mb-4">
                        <div
                            class="w-10 h-10  rounded-full flex items-center justify-center">
                            <img class= "icon" src="./assets/Open-Status.png" alt="">
                        </div>
                        <span  class="priority bg-red-50 text-red-500 text-xs font-bold px-5 py-2 rounded-full tracking-wider">
                            ${element.priority}
                        </span>
                    </div>

                    <h2 class="text-[#1e293b] text-xl font-bold leading-tight mb-2">
                        ${element.title}
                    </h2>

                    <p class="text-slate-500 text-[15px] leading-relaxed mb-5 line-clamp-2">
                        ${element.description}
                    </p>

                    <div class="flex flex-wrap gap-2 mb-2">
                        ${element.labels[0]?`
                            <span
                            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-red-100 bg-red-50 text-red-500 text-sm font-semibold uppercase tracking-wide">
                             ${element.labels[0]}
                            <i class="fa-solid fa-face-grimace text-xs"></i>
                           
                        </span>
                            `: ""}

                        ${element.labels[1]?`<span
                            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-orange-100 bg-orange-50 text-orange-500 text-sm font-semibold uppercase tracking-wide">
                            ${element.labels[1] ||""}
                            <i class="fa-solid fa-life-ring text-xs"></i>
                            
                        </span>`:""}
                    </div>
                </div>
                    <hr class="text-slate-200">
                <div class="border-t border-gray-100 p-6 pt-4 space-y-1 bg-white">
                    <p class="text-slate-500 text-sm font-medium">${element.assignee}</p>
                    <p class="text-slate-500 text-sm font-medium">${element.createdAt.split("T")[0]}</p>
                </div>
            </div>

        `
        getdiv.append(div)
    });
    changecolor()
}
loadcard()

let modalinfo=(id)=>{
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    .then(res =>res.json())
    .then(data => showmodal(data.data))
}

let showmodal = (info) => {

  let showModals = document.getElementById("shwodata");

  showModals.innerHTML = `
    
<div class="p-4 space-y-6">

  <div>
    <h2 class="text-3xl font-bold text-slate-800">
      ${info.title}
    </h2>

    <div class="flex items-center gap-3 mt-3 text-gray-500">

      <span class="px-3 py-1 bg-green-500 text-white text-xs rounded-full">
        ${info.status}
      </span>

      <span>• Opened by ${info.author || "Unknown"}</span>

      <span>• ${info.createdAt.split("T")[0]}</span>

    </div>
  </div>

  <div class="flex gap-3 flex-wrap">
    ${(info.labels || []).map(label => `
      <span class="px-3 py-1 bg-red-100 text-red-500 rounded-full text-sm font-semibold uppercase">
        ${label}
      </span>
    `).join("")}
  </div>

  <p class="text-gray-600 text-lg">
    ${info.description}
  </p>

  <div class="bg-gray-100 rounded-xl p-6 flex justify-between items-center">

    <div>
      <p class="text-gray-500 text-sm">Assignee:</p>
      <p class="text-xl font-semibold">${info.assignee || "unknown"}</p>
    </div>

    <div>
      <p class="text-gray-500 text-sm">Priority:</p>
      <span class="px-4 py-1 bg-red-500 text-white rounded-full text-sm font-bold uppercase">
        ${info.priority}
      </span>
    </div>

  </div>

</div>
`;

  document.getElementById("my_modal_5").showModal();
}

function closeModal(){
  document.getElementById("my_modal_5").close();
}


let changecolor = ()=>{
    let borders = document.querySelectorAll(".borders-t");  
    let priorities = document.querySelectorAll(".priority"); 
    let icons = document.querySelectorAll(".icon")
    
    priorities.forEach((item, index) => {
        let text = item.innerText.toLowerCase();

        // Badge color change
        if(text == "low"){
            item.classList.remove("bg-red-50","text-red-500");
            item.classList.add("bg-gray-100","text-gray-500");

            icons[index].src= "./assets/Closed-Status.png"
            
            borders[index].style.backgroundColor = "purple";
        }
        else if(text == "medium"){
            item.classList.remove("bg-red-50","text-red-500");
            item.classList.add("bg-yellow-50","text-yellow-500");
            
        }
        else if(text == "high"){
            item.classList.remove("bg-red-50","text-red-500");
            item.classList.add("bg-red-50","text-red-500");
            borders[index].style.backgroundColor = "#10b981"; 
        }
    })
}

let filteritem = (data)=>{
    opendata = data.filter(item => item.status.toLowerCase() == "open")
    closedata = data.filter(item => item.status.toLowerCase() == "closed")
    
}

let tooglebtn = (id)=>{
    let allbtn = document.querySelectorAll(".btns")

    allbtn.forEach(btn => btn.classList.remove("btn-primary"))

    let currentbtn = document.getElementById(id)
    console.log(currentbtn.id)
    currentbtn.classList.add("btn-primary")
   if(currentbtn.id == "open"){
        showcard(opendata)
        totalcount(opendata)
    } else if(currentbtn.id == "close"){
        showcard(closedata)
        totalcount(closedata)
    } else {
        showcard(opendata.concat(closedata))
        totalcount(counts)
    }
}



let searchdata = ()=>{
    let data = document.getElementById("input-data")
    data.addEventListener("input",(e)=>{
        let query = e.target.value
        if(query === ""){
            showcard(counts)
            totalcount(counts)
            return
        }
        loading()
         fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${query}`)
        .then(res => res.json())
        .then(data =>{
           let item = data.data;
           let newdata = item.filter(data=> data.title.toLowerCase().includes(query))
           showcard(newdata)
           totalcount(newdata)
           loadingoff()
        } )
       
    })
}

