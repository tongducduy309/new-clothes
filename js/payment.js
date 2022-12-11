import * as main from "./main.js"
import * as data from "./data.js"
function info({
    name,
    phone,
    address
}){
    document.getElementById("infoCustomer-body").innerHTML='<div class="contentTab"><span>Họ và tên: </span><input type="text" class="input" id="name" value="'+name+'" readonly></div><div class="contentTab"><span>Số điện thoại: </span><input type="text" class="input" id="phone" value="'+phone+'" readonly></div><div class="contentTab"><span>Địa chỉ: </span><input type="text" class="input" id="address" value="'+address+'" readonly></div><div id="buttonEdit" class="effect-for-btn button"><span>CHỈNH SỬA</span></div>'
}

var cartTemporary=main.cartTemporary;

function loadData(){
    if (main.account)
    {
        info({name:main.account.name,phone:main.account.phone,address:main.account.address});
    var input=document.querySelectorAll(".input");
    var active=false;
    
    if (cartTemporary){
        let i=0;
        for (let cart of cartTemporary){
            i++;
            product({id:cart.id,pathImg:cart.pathImg,name:cart.name,color:cart.color,size:cart.size,count:cart.count,price:cart.price,no:i});
            
        }
        
    }
    document.getElementById("buttonEdit").addEventListener("click",function(){
        if (active) 
            {
                for (let inp of input){
                    inp.readOnly=true;
                    inp.style.border="none";
                }
                this.style.backgroundColor="#fff";
                this.style.color="#000";
                this.innerHTML="CHỈNH SỬA";
            }
        else
            {
                for (let inp of input){
                    inp.readOnly=false;
                    inp.style.border="1px solid rgba(122,122,122,0.16)";
                }
                this.innerHTML="LƯU";
                this.style.color="#fff";
                this.style.backgroundColor="#47474c";
            }
        active=!active;
    })
    


    }
}

function calValueBill(){
    var value=0;
    for (let cart of cartTemporary){
        value+=(cart.count*1*cart.price);
    }
    return value
}

loadData();



document.getElementById("submit").addEventListener("click",function(){
    var methods = document.querySelectorAll(".method input");
    var fl=false;
    for (let method of methods){
        if (method.checked){
            fl=true;
            break;
        }
    }
    if (fl){
        data.toast({content:"THANH TOÁN THÀNH CÔNG",type:"button:none"});
        sessionStorage.setItem("cartTemporary",JSON.stringify([]));
    }
    else{
        data.toast({content:"VUI LÒNG CHỌN PHƯƠNG THỨC THANH TOÁN",type:"button:none"});
    }
    
    //window.location="./index.html";
})



function product({
    id='',
    pathImg='',
    name='',
    color='',
    size='',
    count=0,
    price='---',
    no
})
{
    var product=document.createElement('div');
    var value=calValueBill();
    product.classList.add("product");
    product.ariaValueText=no;
    product.onclick=function(event){
        if (event.target.closest(".buttonMinus")){
            if (countInp.value>1)
            {
                countInp.value--;
                value-=price*1;
            }
        }
        if (event.target.closest(".buttonPlus")){
            countInp.value++;
            value+=price*1;
        }
        if (event.target.closest(".delProduct")){
            var toa=data.toast({content:"Bạn có muốn xóa sản phẩm không?",btn_1:"Có",btn_2:"Không"});
            if (toa){
                var accept=document.getElementById("acceptToast");
                if (accept) accept.addEventListener("click",function(){
                    value-=(countInp.value*price);
                    document.getElementById("viewCart-body").removeChild(product);
                    document.getElementById("toast").removeChild(toa);
                })
                var cancel=document.getElementById("cancelToast");
                if (cancel) cancel.addEventListener("click",function(){
                    document.getElementById("toast").removeChild(toa);
                })
            }
            
        }
        document.getElementById("valueTemporary").innerHTML=data.formatNumber(value);
        document.getElementById("valueBill").innerHTML=data.formatNumber(value);
    }
    product.innerHTML='<span class="serialProduct">'+no+'</span><span class="idProduct">'+id+'</span><img src="'+pathImg+'" class="imgProduct" alt="Ảnh"></img><span class="nameProduct">'+name+'- '+size+', Màu sắc: '+color+'</span><span class="colorProduct">'+color+'</span><div class="countProduct"><div class="contentCount"><i class="fa-solid fa-minus buttonMinus"></i><input type="text" value="'+count+'" min="min" max="max" readonly class="count"><i class="fa-solid fa-plus buttonPlus"></i></div></div><span class="priceProduct">'+price+'</span><span class="delProduct">XÓA</span>';
    var countInp=product.children[5].firstElementChild.children[1];
    
    document.getElementById("valueTemporary").innerHTML=data.formatNumber(value);
    document.getElementById("valueBill").innerHTML=data.formatNumber(value);
    document.getElementById("viewCart-body").appendChild(product);
    return product;
}