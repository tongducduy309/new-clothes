import * as data from "../js/data.js";
document.getElementById("submitLogin").addEventListener("click",function(e){
    e.preventDefault();
    const username=document.getElementById("login__username");
    const password=document.getElementById("login__password");
    const warning=document.getElementById("warningLogin");
    if (!username.value && !password.value)
    {
        warning.innerHTML="Hãy nhập tên đăng nhập và mật khẩu";
    }
    else{
        if (!username.value)  {
            warning.innerHTML="Hãy nhập tên đăng nhập";
        }
        if (!password.value)  {
            warning.innerHTML="Hãy nhập mật khẩu";
        }
        if (username.value&&password.value ){
            const result=data.checkAccount({username:username.value,password:password.value});
            if (result)
            {
                sessionStorage.setItem("level", result.level);
                sessionStorage.setItem('Account', JSON.stringify(result));
                if (result.level=="admin") window.location="../admin/dashboard.html";
                else window.location="./index.html";
            }
            else{
                warning.innerHTML="Tên đăng nhập hoặc mật khẩu không chính xác";
            }
        }
    }
    
})
document.getElementById("logup__username").addEventListener("input",function(){
    if (this.value.length>=8){
        document.getElementById("warningLogup").innerHTML="";
        if (data.checkAccount({username:this.value}))document.getElementById("warningLogup").innerHTML="Tài khoản đã tồn tại";
    }
        
    else document.getElementById("warningLogup").innerHTML="Tên tài khoản phải dài hơn 8 kí tự";

})
document.getElementById("submitLogup").addEventListener("click",function(e){
    e.preventDefault();
    const inputLogup=document.querySelectorAll(".logup .form__input");
    const warning=document.getElementById("warningLogup");
    let fl=true;
    let i=0;
    let warningList=["Hãy nhập đầy đủ họ và tên","Hãy nhập đầy đủ họ và tên","Hãy nhập tên tài khoản","","Hãy nhập mật khẩu","Hãy xác nhận lại mật khẩu"];
    while(fl&&i<inputLogup.length){
        if (i!=3&&!inputLogup[i].value)fl=false;
        else i++;
    }
    console.log(inputLogup[5]);
    if (!fl) warning.innerHTML=warningList[i];
    else{
        if (inputLogup[2].value.length>8)
        if (inputLogup[4].value!=inputLogup[5].value) warning.innerHTML="Xác nhậc mật khẩu không trùng khớp";
        
        else{
            if (data.checkAccount({username:this.value}))document.getElementById("warningLogup").innerHTML="Tài khoản đã tồn tại";
            else{
                //Đăng ký thành công
                data.toast({content:"ĐĂNG KÝ THÀNH CÔNG",type:"button:none"})
                //Reload data, Reload Page và Chuyển ra trang index 
            }
        }
    }

    
})

var togglePassword=document.querySelectorAll(".togglePassword");
const password = document.querySelectorAll(".password");
togglePassword.forEach((toggle,index)=>toggle.addEventListener("click",function(){
    var type;
    if (password[index].getAttribute("type") === "password")
    {
        type="text";
        this.className="fa-regular fa-eye togglePassword";
    }
    else{
        type="password";
        this.className="fa-regular fa-eye-slash togglePassword";
    }
    password[index].setAttribute("type", type);
            
    
}))