let loadcard =async ()=>{
   let response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
   let res = await response.json()
    // console.log(res.data.length)
    totalcount(res.data)
    showcard(res.data)
}
let totalcount = (data)=>{
    let total = document.getElementById("total-count")
    total.innerText = data.length
}
let showcard = (info)=>{
    let getdiv = document.getElementById("card-section")

    info.forEach(element => {
        let div = document.createElement("div")

        div.innerHTML=`
        <div
                class="w-full max-w-[350px] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">

                <div  class="borders-t h-1.5 bg-[#10b981] w-full"></div>
                    
                <div class="p-6 pb-4">
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
                        <span
                            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-red-100 bg-red-50 text-red-500 text-sm font-semibold uppercase tracking-wide">
                             ${element.labels[0]||""}
                            <i class="fa-solid fa-face-grimace text-xs"></i>
                           
                        </span>

                        <span
                            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-orange-100 bg-orange-50 text-orange-500 text-sm font-semibold uppercase tracking-wide">
                            ${element.labels[1] ||""}
                            <i class="fa-solid fa-life-ring text-xs"></i>
                            
                        </span>
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

let tooglebtn = (id)=>{
    let allbtn = document.querySelectorAll(".btns")

    allbtn.forEach(btn => btn.classList.remove("btn-primary"))

    let currentbtn = document.getElementById(id)
    currentbtn.classList.add("btn-primary")
}

let changecolor = ()=>{
    let borders = document.querySelectorAll(".borders-t");  // সব border div
    let priorities = document.querySelectorAll(".priority"); // সব priority span
    let icons = document.querySelectorAll(".icon")
    
    priorities.forEach((item, index) => {
        let text = item.innerText.toLowerCase();

        // Badge color change
        if(text == "low"){
            item.classList.remove("bg-red-50","text-red-500");
            item.classList.add("bg-gray-100","text-gray-500");

            icons[index].src= "./assets/Closed- Status .png"
            // Corresponding border color change
            borders[index].style.backgroundColor = "purple";
        }
        else if(text == "medium"){
            item.classList.remove("bg-red-50","text-red-500");
            item.classList.add("bg-yellow-50","text-yellow-500");
            
        }
        else if(text == "high"){
            item.classList.remove("bg-red-50","text-red-500");
            item.classList.add("bg-red-50","text-red-500");
            borders[index].style.backgroundColor = "#10b981"; // green
        }
    })
}
