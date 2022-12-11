import * as data from "../js/data.js";
var listDelivery=[],listAllDelivery=data.listDelivery;
var cpnDlr=[];
var statusDelivery=data.statusDelivery;

function searchDelivery(id){
    var index=-1;
    for (let i=0;i<listDelivery.length;i++){
        if (listDelivery[i].id==id){
            index=i;
            break;
        }
    }
    return index;
}
function tabDetailDelivery({
    id,
    date='-',
    value=0,
    status=0,
    idCustomer,
    nameCustomer,
    phoneCustomer,
    addressCustomer,
    products

}){
    var tab=document.createElement("div");
    tab.id="tabDetailDelivery";
    tab.setAttribute("data-aos","zoom-in");
    tab.onclick=function(e){
        if (e.target.closest(".closeTab"))
        {
            document.getElementById("tab").removeChild(tab);
            document.body.style.overflow="auto";
            
        }
        if (e.target.closest(".btnCancelBill"))
        {
            document.getElementById("tab").removeChild(tab);
            document.body.style.overflow="auto";
            var index=searchDelivery(id);
            if (index>-1){
                listDelivery[index].status=4;
                document.getElementById("delivery-body").removeChild(cpnDlr[index]);
            }

            
        }
    }
    var list=document.createElement("div");
    list.id="listProductsInDelivery-body";
    list.innerHTML='<div class="titleCol"><span class="idProductID">ID</span><span class="nameProductID">Tên sản phẩm</span><span class="colorProductID">Màu sắc</span><span class="countProductID">Số lượng</span><span class="priceProductID">Đơn giá</span></div>';
    for (let pdt of products){
        var productID=document.createElement("div");
        productID.classList.add("productID");
        productID.innerHTML=' <span class="idProductID">'+pdt.id+'</span><span class="nameProductID">'+pdt.name+'</span><span class="colorProductID">'+pdt.color+'</span><span class="countProductID">'+pdt.count+'</span><span class="priceProductID">'+pdt.price+'</span>';
        list.appendChild(productID);
    }
    var div = document.createElement("div");
    div.appendChild(list);
    tab.innerHTML='<div class="headTab"><span class="title">CHI TIẾT KIỆN HÀNG</span><span class="closeTab">ĐÓNG</span></div><div class="bodyTab"><div class="infoDelivery"><div class="contentTab"><span>Mã kiện hàng: </span><span>'+id+'</span></div><div class="contentTab"><span>Ngày đặt: </span><span>'+date+'</span></div><div class="contentTab"><span>Trạng thái: </span><span>'+status+'</span></div><div class="contentTab"><span>ID: </span><span>'+idCustomer+'</span></div><div class="contentTab"><span>Họ và tên: </span><span>'+nameCustomer+'</span></div><div class="contentTab"><span>Số điện thoại: </span><span>'+phoneCustomer+'</span></div><div class="contentTab"><span>Địa chỉ: </span><span>'+addressCustomer+'</span></div>'+((status<3)?'<div class="contentTab btnCancelBill effect-for-btn"><span>HỦY</span></div>':'')+'</div><div class="productsInDelivery">'+div.innerHTML+'<div class="contentTab value"><span>TỔNG: </span><span>'+value+'</span></div></div></div>';
    document.getElementById("tab").appendChild(tab);
}

function delivery({
    id,
    count,
    value,
    status,
    no
}){
    
    var delivery = document.createElement("div");
    delivery.classList.add("delivery");
    delivery.setAttribute("data-aos","fade-up");
    delivery.ariaValueText=no;
    delivery.onclick=function(e){
        if (e.target.closest(".detailDelivery"))
        {
            tabDetailDelivery(listDelivery[no]);
            document.body.style.overflow="hidden";
            
        }
    }
    status=statusDelivery[status];
    
    delivery.innerHTML='<span class="idDelivery">'+id+'</span><span class="countDelivery">'+count+'</span><span class="priceDelivery">'+value+'</span><span class="statusDelivery">'+status+'</span><span class="detailDelivery">CHI TIẾT</span>'
    
    document.getElementById("delivery-body").appendChild(delivery);

    return delivery;
}


function loadDelivery(listDelivery){
    document.getElementById("delivery-body").innerHTML="";
    var i=0;
    cpnDlr=[];
    for (let dlr of listDelivery){
        cpnDlr.push(delivery({id:dlr.id,count:dlr.count,value:dlr.value,status:dlr.status,no:i}));
        i++;
    }
    
    
}



function filterDelivery(status){
    loadDelivery(listDelivery);
    var deliveryBody=document.getElementById("delivery-body");
    for (let i=0;i<listDelivery.length;i++){
        if (status!=listDelivery[i].status) deliveryBody.removeChild(cpnDlr[i]);
    }
}



var viewChild=document.querySelectorAll(".viewChild");

var buttonTab=document.querySelectorAll(".buttonTab");
buttonTab.forEach(button=>button.addEventListener("click",function(){
    document.querySelector(".titleView").innerHTML=button.firstElementChild.innerHTML;
    for (let view of viewChild){
        view.style.display="none";
    }
    let index=button.getAttribute("aria-valueText");
    
    viewChild[index].style.display="block";
    if (index==1) {btnOnClickStatusDelivery(0)}
}))


var togglePassword=document.getElementById("togglePassword");
const password = document.querySelector("#passwordCustomer");
togglePassword.addEventListener("click",function(){
    var type;
    if (password.getAttribute("type") === "password")
    {
        type="text";
        this.className="fa-regular fa-eye";
    }
    else{
        type="password";
        this.className="fa-regular fa-eye-slash";
    }
    password.setAttribute("type", type);
            
    
})



function loadData(){
    var dataOut=document.querySelectorAll(".data");
    var account = JSON.parse(sessionStorage.Account);
    dataOut[0].innerHTML=account.username;
    dataOut[1].value=account.password
    dataOut[2].innerHTML=account.name;
    dataOut[3].innerHTML=account.phone;
    dataOut[4].innerHTML=account.address;
    for (let dlr of listAllDelivery)
    if (dlr.idCustomer==account.id) listDelivery.push(dlr);
}

//Start
loadData();

for(let status of statusDelivery)
document.getElementById("filterStatus").innerHTML+='<span>'+status+'</span>'
var filterItem=document.querySelectorAll(".filterStatus span");
var indexFilter=0;

function btnOnClickStatusDelivery(index){
    filterItem[indexFilter].classList.remove("selectFilter");
    filterItem[index].classList.add("selectFilter");
    indexFilter=index;
    filterDelivery(index);
}
filterItem.forEach((sp,index)=>sp.addEventListener("click",function(){
    btnOnClickStatusDelivery(index);
}))

btnOnClickStatusDelivery(0);

