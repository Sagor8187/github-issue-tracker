let username = document.getElementById("user-name");
let password = document.getElementById("login-pass")

document.getElementById("login-btn").addEventListener("click",(event)=>{
    event.preventDefault();
    let name = username.value;
    let pass = password.value;

    if(name == "admin" && pass == "admin123"){
        window.location.href = "home.html"
    }else{
        alert("please use valid user name and password")
    }

})