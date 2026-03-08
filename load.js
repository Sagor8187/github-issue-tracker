let loadcard =async ()=>{
   let response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
   let res = await response.json()
    // console.log(res.data.length)
    showcard(res.data)
}

let showcard = (info)=>{
    let getdiv = document.getElementById("card-section")

    info.forEach(element => {
        let div = document.createElement("div")

        div.innerHTML=`
        <div
                class="w-full max-w-[350px] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">

                <div class="h-1.5 bg-[#10b981] w-full"></div>

                <div class="p-6 pb-4">
                    <div class="flex justify-between items-center mb-4">
                        <div
                            class="w-10 h-10 bg-green-50 border border-green-200 rounded-full flex items-center justify-center">
                            <img src="./assets/Open-Status.png" alt="">
                        </div>
                        <span class="bg-red-50 text-red-500 text-xs font-bold px-5 py-2 rounded-full tracking-wider">
                            HIGH
                        </span>
                    </div>

                    <h2 class="text-[#1e293b] text-xl font-bold leading-tight mb-2">
                        Fix Navigation Menu On Mobile Devices
                    </h2>

                    <p class="text-slate-500 text-[15px] leading-relaxed mb-5">
                        The navigation menu doesn't collapse properly on mobile devices...
                    </p>

                    <div class="flex flex-wrap gap-2 mb-2">
                        <span
                            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-red-100 bg-red-50 text-red-500 text-sm font-semibold uppercase tracking-wide">
                            <i class="fa-solid fa-face-grimace text-xs"></i>
                            BUG
                        </span>

                        <span
                            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-orange-100 bg-orange-50 text-orange-500 text-sm font-semibold uppercase tracking-wide">
                            <i class="fa-solid fa-life-ring text-xs"></i>
                            HELP WANTED
                        </span>
                    </div>
                </div>

                <div class="border-t border-gray-100 p-6 pt-4 space-y-1 bg-white">
                    <p class="text-slate-500 text-sm font-medium">#1 by john_doe</p>
                    <p class="text-slate-500 text-sm font-medium">1/15/2024</p>
                </div>
            </div>

        `
        getdiv.append(div)
    });
}
loadcard()