import * as data from "../js/data.js";
const earning = document.getElementById('earning').getContext("2d");

var cpnAcc=[];
var listAccount=data.listAccount;

var cpnPdt=[];
var listProduct=data.listProduct;
var cpnDlr=[];
var  listDelivery=data.listDelivery;

const types=data.type;
var profits=[];
var profit=0,countSold=0;

let comboType=document.getElementById("comboType");
comboType.innerHTML+='<option value="0">Tất cả</option>';
var i=1;
for (let type of types){
    comboType.innerHTML+='<option value="'+i+'">'+type+'</option>';
    i++;
}

updatePathimg();
var colorChart=[
    'rgb(255, 99, 132)',
    'rgb(75, 192, 192)',
    'rgb(255, 205, 86)',
    'rgb(255,160,122)',
    'rgb(201, 203, 207)',
    'rgb(54, 162, 235)'
    
  ]





//var day=date.getDate(),month=date.getMonth()+1,year=date.getFullYear();

function calculateProfit(day,month,year,type,para){
    profits=[];
    profit=0;
    countSold=0;
    var numType={},proceeds={};
    for (let t of types){
        numType[t]=0;
        proceeds[t]=0;
    }
    for (let dlr of listDelivery){
        var s=dlr.date.split("/");
        var d="";
        if(type=="day"){
            var date= new Date(s[2]+"-"+s[1]+"-"+s[0]),d,daynow;
            date.setDate(-7);
            d=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
            daynow=year+"-"+month+"-"+day;
        }
        //console.log(s);
        if (type==="all"||type==="first"||(type=="month"&&s[1]==month)||(type=="year"&&s[2]==year)||(type=="day"&&(compareDates(d,formatDate(dlr.date))==1) && (compareDates(formatDate(dlr.date),daynow)==1))||(s[0]==day && s[1]==month && s[2]==year))
        if (dlr.status==3){
            var products=dlr.products;
            for (let pdt of products){
                proceeds[pdt.type]+=pdt.count*(pdt.price*1);
                countSold+=pdt.count;
            }
        }
    }
    for (let t of types) {
        profits.push(proceeds[t]);
        profit+=proceeds[t];
    }
    //console.log(profits);
    document.getElementById("profit").innerHTML=data.formatNumber(profit);
    document.getElementById("sold").innerHTML=data.formatNumber(countSold);
    if (type!="first"){
        //console.log(profits);
        chartEarning.data.datasets[0].data=profits;
        chartEarning.update();
    }
}



document.getElementById("timeStatistics").value=0;
document.getElementById("typeProduct").innerHTML=comboType.innerHTML;


function rankChild({
    name,
    sold,
    profit
}){
    var child=document.createElement("div");
    child.classList.add("rankProfit-Child");
    child.innerHTML='<span class="name">'+name+'</span><span class="sold">'+sold+'</span><span class="profits">'+data.formatNumber(profit)+'</span>';
    document.getElementById("rankProfit-body").appendChild(child);
    return child;
}
function sortByProfitDown(listItem,proceeds){
    var l=[];
    for (let pdt of listItem) l.push(proceeds[pdt.name]);
    let list=listItem;
    for (let i=0;i<l.length-1;i++){
      for (let j=i+1;j<l.length;j++){
        
        if (l[j]>l[i]){
          let t=l[j];
          l[j]=l[i]
          l[i]=t;
          let temp = list[j];
          list[j]=list[i];
          list[i]=temp;
        }
      }
    }
    return list;
  }
var cpnRChild=[];

function setDataForRank(){
    var proceeds={};
    cpnRChild=[];
    var solds=[];
    for (let pdt of listProduct){
        proceeds[pdt.name]=0;
        solds[pdt.name]=0;
    }
    for (let dlr of listDelivery){
        if (dlr.status==3)
        {
            var pdtsInDelivery=dlr.products;
            for (let pdt of pdtsInDelivery){
                proceeds[pdt.name]+=pdt.count*(pdt.price*1);
                solds[pdt.name]+=pdt.count;
            }
        }
    }
    
    for (let type of types){
        cpnRChild[type]=[];
    }
    var products=[];
    for (let pdt of listProduct){
        products.push(pdt);
    }
    var products=sortByProfitDown(products,proceeds);
    for (let pdt of products){
        cpnRChild[pdt.type].push(rankChild({name:pdt.name,sold:solds[pdt.name],profit:proceeds[pdt.name]}));
    
    }
    
    
}

setDataForRank();

calculateProfit("","","","first");

var chartEarning=new Chart(earning, {
    type: 'polarArea',
    data: {
        labels: types,
        datasets: [{
        label: 'VNĐ',
        data: profits,
        backgroundColor: colorChart
        }]
    },
    options: {
        responsive:true
    }
    });



document.getElementById("timeStatistics").addEventListener("change",function(){
    const d=new Date();
    var index=this.selectedIndex,day=d.getDate(),month=d.getMonth()+1,year=d.getFullYear(),type="";
    var date=new Date(year+"-"+month+"-"+day);
    //console.log(this.selectedIndex);
    switch(index){
        case 0:
            type="all";
            break;
        case 2:
            day--;
            break;
        case 3:
            type="day";
            break;  
        case 4:
            type="month";
            break; 
        case 5:
            type="year";
            break;  
        case 6:
            month--;
            type="month";
            break; 
        case 7:
            year--;
            type="year";
            break; 
    }
    
    date.setDate(day);
    date.setMonth(month-1);
    date.setFullYear(year);
    calculateProfit(date.getDate(),date.getMonth()+1,date.getFullYear(),type);
})

document.getElementById("typeProduct").addEventListener("change",function(){
    var rankBody=document.getElementById("rankProfit-body").children;
    if (this.value==0)
        for (let i=0;i<rankBody.length;i++){
            rankBody[i].style.display="block";
        }
    else{
        for (let i=0;i<rankBody.length;i++){
            rankBody[i].style.display="none";
        }
        let type=types[this.value-1];
        for (let cpn of cpnRChild[type]){
            cpn.style.display="block";
        }
    }
    
})

// var d= new Date("2022-11-1");
// d.setDate(1-7);
// console.log(d.getDate()+"-"+(d.getMonth()+1)+"-"+d.getFullYear())



const toast=data.toast;

function formatDate(s){
    var date=s.split("/");
    return date[2]+"-"+date[1]+"-"+date[0];
}

function compareDates(d1, d2){
    let date1 = new Date(d1).getTime();
    let date2 = new Date(d2).getTime();
    if (date1==date2) return 0;
    if (date1 <= date2) return 1;
    if (date1 >= date2) return 2;
    
    
  };


// Account
function account({
    id='',
    name='',
    phone='!',
    email='!',
    username='',
    password='',
    status='',
    no
})
{
    var account=document.createElement('div');
    account.classList.add("account");
    account.setAttribute("data-aos","fade-up");
    account.ariaValueText=no;
    account.innerHTML='<span class="idAccount">'+id+'</span><span class="nameAccount">'+name+'</span><span class="phoneAccount">'+phone+'</span><span class="emailAccount">'+email+'</span><span class="usernameAccount">'+username+'</span><span class="passwordAccount">'+password+'</span><span class="statusAccount">'+status+'</span>';
    document.getElementById("manageCustomer-body").appendChild(account);
    return account;
}


var optionCustom=document.getElementById("optionCustom_0");

function loadAccount(listAccount){
    document.getElementById("manageCustomer-body").innerHTML="";
    var i=0;
    var locked=0;
    for (let acc of listAccount){
        if (acc.status=="ĐÃ KHÓA") locked++;
        cpnAcc.push(account({id:acc.id,name:acc.name,phone:acc.phone,email:acc.email,username:acc.username,password:acc.password,status:acc.status,no:i}))
        i++;
    }
    document.getElementById("amountOfAccount").innerHTML=listAccount.length;
    document.getElementById("amountlockedAccount").innerHTML=locked;
    document.getElementById("amountunlockedAccount").innerHTML=listAccount.length-locked;
    
    
    cpnAcc.forEach(element => element.addEventListener("contextmenu",function(event){
        event.preventDefault();
        optionCustom.style.display="block";
        optionCustom.style.top=event.y+window.scrollY+"px";
        optionCustom.style.left=event.x+"px";
        currentElement=element.ariaValueText;
    }));

    
}


// Product
function product({
    id='',
    pathImg='',
    name='',
    color='',
    count=0,
    price='---',
    no
})
{
    var status='C.XÁC ĐỊNH';
    var product=document.createElement('div');
    product.classList.add("product");
    product.setAttribute("data-aos","fade-up");
    product.ariaValueText=no;
    var colorStatus='#000';
    if (count>10) {
        status='CÒN HÀNG';
        colorStatus='#32CD32';
    }
    else if (count==0) {
        status='HẾT HÀNG';
        colorStatus='#EE4B2B';
        
    }
        else if (count<=10) {
            status='SẮP HẾT';
            colorStatus='#FDDA0D';
        }
    product.innerHTML='<span class="idProduct">'+id+'</span><img src="'+pathImg+'" class="imgProduct" alt="Ảnh"></img><span class="nameProduct">'+name+'</span><span class="colorProduct">'+color+'</span><span class="countProduct">'+count+'</span><span class="priceProduct">'+price+'</span><span class="statusProduct" style="color:'+colorStatus+'">'+status+'</span>';
    document.getElementById("storage-body").appendChild(product);
    return product;
}


var optionCustom_1=document.getElementById("optionCustom_1");
var currentElement_1=-1;

function loadProduct(listProduct){
    document.getElementById("storage-body").innerHTML="";
    cpnPdt=[];
    var i=0;
    for (let pdt of listProduct){
        cpnPdt.push(product({id:pdt.id,pathImg:pdt.pathImg,color:pdt.color,name:pdt.name,count:pdt.count,price:pdt.price,nameimg:pdt.nameimg,no:i}))
        i++;
    }
    cpnPdt.forEach(element => element.addEventListener("contextmenu",function(event){
        event.preventDefault();
        optionCustom_1.style.display="block";
        optionCustom_1.style.top=event.y+window.scrollY+"px";
        optionCustom_1.style.left=event.x+"px";
        currentElement_1=element.ariaValueText;
    }));
    
    //document.getElementById("amountOfProduct").innerHTML=listProduct.length;
    
}

function indexOfList(list,child){
    var index=-1;
    for (let i=0;i<list.length;i++){
        if (list[i]==child){
            index=i;
            break;
        }
    }
    return index;
}

function loadDataByFilter(typeC,status){
    loadProduct(listProduct);
    let count=0;
     //Type
     if (typeC.value!=0) {
         let type = types[typeC.value-1];
         let storage_body=document.getElementById("storage-body");
         let i=0;
         for (let pdt of listProduct){
             if (pdt.type!=type){
                 storage_body.removeChild(cpnPdt[i]);
                 count++;
             }
             i++;
             
         }
     }
     //Status
   
    if (status.value!=0) {
        let storage_body=document.getElementById("storage-body");
        let i=0;
        for (let pdt of listProduct){
            
            if (indexOfList(storage_body.children,cpnPdt[i])>-1){
                if (pdt.count<=10 && status.value==1){
                    storage_body.removeChild(cpnPdt[i]);
                    count++;
                }
                else if (pdt.count>0 && status.value==3){
                    storage_body.removeChild(cpnPdt[i]);
                    count++;
                }
                else if (pdt.count>10 && status.value==2){
                    storage_body.removeChild(cpnPdt[i]);
                    count++;
                }
            }
            i++;
            
        }
    }

   
    document.getElementById("amountOfProduct").innerHTML=listProduct.length-count;
}

comboType.addEventListener("change",function(){
    loadDataByFilter(this,document.getElementById("comboStatus"));
    
})



document.getElementById("comboStatus").addEventListener("change",function(){
    loadDataByFilter(comboType,this);
})




function deleteProduct(index){
    var toa=toast({content:"Có chắc chắn xóa không?"});
    if (toa){
        var accept=document.getElementById("acceptToast");
        if (accept) accept.addEventListener("click",function(){
            var l=[];
            for (let i=0;i<listProduct.length;i++){
                if (i!=index) l.push(listProduct[i]);
            }
            listProduct=l;
            loadProduct(listProduct);
            document.getElementById("toast").removeChild(toa);
        })
        var cancel=document.getElementById("cancelToast");
        if (cancel) cancel.addEventListener("click",function(){
            document.getElementById("toast").removeChild(toa);
        })
    }
    
    
}

function modifyDataListProduct(index){
    let tab = document.getElementById("tabModifyProduct");
    if (tab){
        var pdt= listProduct[index];
        pdt.pathImg=document.getElementById("imgProduct").src;
        pdt.codecolor=document.getElementById("codecolorModifyProduct").value;
        pdt.name=document.getElementById("nameModifyProduct").value;
        pdt.count=document.getElementById("countModifyProduct").value*1;
        pdt.price=document.getElementById("priceModifyProduct").value;
        pdt.nameImg=document.getElementById("nameimgModifyProduct").value;
        pdt.type=document.getElementById("typeModifyProduct").value;
        listProduct[index]=pdt;
    }
}

function modifyProduct(index,tab){
    var toa=toast({content:"Có muốn lưu thông tin đã chỉnh sửa không?",btn_1:"Lưu",btn_2:"Không lưu"});
    if (toa){
        var accept=document.getElementById("acceptToast");
        if (accept) accept.addEventListener("click",function(){
            modifyDataListProduct(index);
            loadProduct(listProduct);
            document.getElementById("tab").removeChild(tab);
            document.getElementById("toast").removeChild(toa);
        })
        var cancel=document.getElementById("cancelToast");
        if (cancel) cancel.addEventListener("click",function(){
            document.getElementById("tab").removeChild(tab);
            document.getElementById("toast").removeChild(toa);
        })
    }
    
    
}

function updatePathimg(){
    for (let pdt of listProduct){
        //
        pdt.pathImg="."+pdt.pathImg;
    }
}

function tabModifyProduct({id,pathImg,name,color,codecolor,count,price,nameimg,type}){
    var tab=document.createElement("div");
    tab.id="tabModifyProduct";
    tab.setAttribute("data-aos","zoom-in");
    tab.onclick=function(e){
        if (e.target.closest(".closeTab"))
        {
            modifyProduct(currentElement_1,tab);
            
        }
    }
    tab.innerHTML='<div class="headTab"><span class="title">CHỈNH SỬA</span><span class="closeTab">ĐÓNG</span></div><div class="bodyTab"><div class="leftTab"><div class="contentTab"><span>ID: </span><span>'+id+'</span></div><div class="contentTab"><img src="'+pathImg+'" alt="Ảnh" id="imgProduct"><input type="file" name="file" id="file" class="inputfile" /><label for="file">Chọn ảnh</label></div><div class="contentTab"> <span>Tên sản phẩm: </span><input type="text" placeholder="Tên sản phẩm" value="'+name+'"  id="nameModifyProduct"></div><div class="contentTab colorInput"><span>Màu sắc: </span><input type="text" placeholder="[ĐEN, TRẮNG, ....]" value="'+color+'" id="colorModifyProduct"><input type="text" placeholder="Mã màu [#000,#fff]" value="'+codecolor+'" id="codecolorModifyProduct"></div><div class="contentTab"><span>Số lượng: </span><input type="text" id="countModifyProduct" placeholder="Số lượng" value="'+count+'"></div></div><div class="rightTab"><div class="contentTab"><span>Đơn giá: </span><input type="text" id="priceModifyProduct" placeholder="Đơn giá" value="'+price+'"></div><div class="contentTab"><span>Tên hình </span><input type="text" placeholder="Tên hình" value="'+nameimg+'" id="nameimgModifyProduct"></div><div class="contentTab"><span>Loại </span><input type="text" placeholder="Loại sản phẩm" value="'+type+'" id="typeModifyProduct"></div></div></div>';
    document.getElementById("tab").appendChild(tab);
}


function openTabModifyProduct(index){
    var pdt=listProduct[index];
    var tab = document.getElementById("tabModifyProduct");
    if (tab) document.getElementById("tab").removeChild("tabModifyProduct");
    tabModifyProduct({id:pdt.id,pathImg:pdt.pathImg,name:pdt.name,color:pdt.color,codecolor:pdt.codecolor,count:pdt.count,price:pdt.price,nameimg:pdt.nameImg,type:pdt.type});
    document.querySelector('.inputfile').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            var img = document.querySelector('#imgProduct');
            img.onload = () => {
                URL.revokeObjectURL(img.src);  // no longer needed, free memory
            }
  
            img.src = URL.createObjectURL(this.files[0]); // set src to blob url
        }
    });
}

function tabAddProduct({id}){
    var tab=document.createElement("div");
    tab.id="tabAddProduct";
    tab.setAttribute("data-aos","zoom-in");
    tab.onclick=function(e){
        if (e.target.closest(".closeTab"))
        {
            closeTabProduct(tab);
            
        }
        if (e.target.closest(".btnAccept")){
            addNewProduct(tab);
        }
    }
    tab.innerHTML='<div class="headTab"><span class="title">THÊM SẢN PHẨM</span><span class="closeTab">ĐÓNG</span></div><div class="bodyTab"><div class="leftTab"><div class="contentTab"><span>ID: </span><span>'+id+'</span></div><div class="contentTab"><img src="" alt="" id="imgProduct"><input type="file" name="file" id="file" class="inputfile" /><label for="file">Chọn ảnh</label></div><div class="contentTab"> <span>Tên sản phẩm: </span><input type="text" placeholder="Tên sản phẩm" value=""  id="nameAddProduct"></div><div class="contentTab colorInput"><span>Màu sắc: </span><input type="text" placeholder="[ĐEN, TRẮNG, ....]" value="" id="colorAddProduct"><input type="text" placeholder="Mã màu [#000,#fff]" value="" id="codecolorAddProduct"></div><div class="contentTab"><span>Số lượng: </span><input type="text" id="countAddProduct" placeholder="Số lượng" value=""></div></div><div class="rightTab"><div class="contentTab"><span>Đơn giá: </span><input type="text" id="priceAddProduct" placeholder="Đơn giá" value=""></div><div class="contentTab"><span>Tên hình </span><input type="text" placeholder="Tên hình" value="" id="nameimgAddProduct"></div><div class="contentTab"><span>Loại </span><input type="text" placeholder="Loại sản phẩm" value="" id="typeAddProduct"></div><div class="btnAccept"><div class="content-btn"><span>HOÀN TẤT</span></div></div></div></div>';

    document.getElementById("tab").appendChild(tab);
}

function openTabAddProduct(){
    var tab = document.getElementById("tabAddProduct");
    if (tab) document.getElementById("tab").removeChild("tabAddProduct");
    tabAddProduct({id:listProduct.length+1});
    document.querySelector('.inputfile').addEventListener('change', function() {
            if (this.files && this.files[0]) {
                var img = document.querySelector('#imgProduct');
                img.onload = () => {
                    URL.revokeObjectURL(img.src);  // no longer needed, free memory
                }
      
                img.src = URL.createObjectURL(this.files[0]); // set src to blob url
            }
        });
}

function closeTabProduct(tab){
    var toa=toast({content:"Mọi thứ chưa được lưu bạn có muốn thoát không?"});
    if (toa)
    {
        var accept=document.getElementById("acceptToast");
        if (accept) accept.addEventListener("click",function(){
            document.getElementById("tab").removeChild(tab);
            document.getElementById("toast").removeChild(toa);
        })
        var cancel=document.getElementById("cancelToast");
        if (cancel) cancel.addEventListener("click",function(){
            document.getElementById("toast").removeChild(toa);
        })
    }
}

function addDataListProduct(){
    let tab = document.getElementById("tabAddProduct");
    if (tab){
        var pdt=data.createAProduct({id:listProduct.length+1,name:document.getElementById("nameAddProduct").value,codecolor:document.getElementById("codecolorAddProduct").value,count:document.getElementById("countAddProduct").value*1,price:document.getElementById("priceAddProduct").value,pathImg:document.getElementById("imgProduct").src,nameImg:document.getElementById("nameimgAddProduct").value,color:document.getElementById("priceAddProduct").value,type:document.getElementById("typeAddProduct")});
        listProduct.push(pdt);
    }
}

function addNewProduct(tab){
    var toa=toast({content:"Có chắc chắn thêm sản phẩm không?",btn_1:"Thêm",btn_2:"Để xem lại"});
   if (toa){
        var accept=document.getElementById("acceptToast");
        if (accept) accept.addEventListener("click",function(){
            addDataListProduct();
            loadProduct(listProduct);
            document.getElementById("tab").removeChild(tab);
            document.getElementById("toast").removeChild(toa);
        })
        var cancel=document.getElementById("cancelToast");
        if (cancel) cancel.addEventListener("click",function(){
            document.getElementById("toast").removeChild(toa);
        })
   }
}

var btnAdd=document.querySelector(".btnAdd");

if (btnAdd)
btnAdd.addEventListener("click",function(){
    openTabAddProduct();
})

var comboStatusDelivery="";
var i=0;
for (let status of data.statusDelivery){
    comboStatusDelivery+='<option value="'+i+'">'+status+'</option>';
    i++;
}


function delivery({
    id='',
    date='',
    value='',
    status=0,
    no
})
{
    var delivery = document.createElement("div");
    delivery.classList.add("delivery");
    delivery.setAttribute("data-aos","fade-up");
    delivery.ariaValueText=no;
    delivery.innerHTML='<span class="idDelivery">'+id+'</span><span class="dateDelivery">'+date+'</span><span class="valueDelivery">'+value+'</span>';
    var select=document.createElement("select");
    select.classList.add("statusDelivery");
    select.innerHTML=comboStatusDelivery;
    select.value=status;
    var i=0;
    
    select.addEventListener("change",function(){
        listDelivery[no].status=select.selectedIndex;
    })
    delivery.appendChild(select);
    document.getElementById("delivery-body").appendChild(delivery);
    return delivery;
}




function filterDeliveryByDate(date_1,date_2){
    loadDelivery(listDelivery);
    
    if (date_1&&date_2){
        var deliveryBody=document.getElementById("delivery-body");
        for (let i=0;i<listDelivery.length;i++){
            if ((compareDates(date_1,formatDate(listDelivery[i].date))==1) && (compareDates(formatDate(listDelivery[i].date),date_2)==1)){
                
            }
            else{
                deliveryBody.removeChild(cpnDlr[i]);
            }
        }
    }
    else if (date_1||date_2){
        var date = (date_1)?date_1:date_2;
        var deliveryBody=document.getElementById("delivery-body");

        for (let i=0;i<listDelivery.length;i++){
            if (compareDates(date,formatDate(listDelivery[i].date))==0){
                
            }
            else{
                deliveryBody.removeChild(cpnDlr[i]);
            }
        }
    }
}


function loadDelivery(listDelivery){
    document.getElementById("delivery-body").innerHTML="";
    var i=0;
    cpnDlr=[];
    for (let dlr of listDelivery){
        cpnDlr.push(delivery({id:dlr.id,date:dlr.date,value:dlr.value,status:dlr.status,no:i}));
        i++;
    }
    cpnDlr.forEach(element => element.addEventListener("contextmenu",function(event){
        event.preventDefault();
        optionCustom_2.style.display="block";
        optionCustom_2.style.top=event.y+window.scrollY+"px";
        optionCustom_2.style.left=event.x+"px";
        currentElement_2=element.ariaValueText;
    }));
    
}

loadDelivery(listDelivery);

var filter=document.getElementById("addFilter");
if (filter)
filter.addEventListener("click",function(){
    let dateFrom=document.getElementById("optionDateFrom");
    let dateTo=document.getElementById("optionDateTo");
    if (compareDates(dateFrom.value,dateTo.value)==2) {
        toast({content:"Ngày tháng năm 1 bắt buộc nhỏ hơn Ngày tháng năm 2",type:"button:none"});
    }
    else    filterDeliveryByDate(dateFrom.value,dateTo.value);
    
    
})

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
    tab.innerHTML='<div class="headTab"><span class="title">CHI TIẾT KIỆN HÀNG</span><span class="closeTab">ĐÓNG</span></div><div class="bodyTab"><div class="infoDelivery"><div class="contentTab"><span>Mã kiện hàng: </span><span>'+id+'</span></div><div class="contentTab"><span>Ngày đặt: </span><span>'+date+'</span></div><div class="contentTab"><span>Trạng thái: </span><span>'+status+'</span></div><div class="contentTab"><span>ID: </span><span>'+idCustomer+'</span></div><div class="contentTab"><span>Họ và tên: </span><span>'+nameCustomer+'</span></div><div class="contentTab"><span>Số điện thoại: </span><span>'+phoneCustomer+'</span></div><div class="contentTab"><span>Địa chỉ: </span><span>'+addressCustomer+'</span></div></div><div class="productsInDelivery">'+div.innerHTML+'<div class="contentTab value"><span>TỔNG: </span><span>'+value+'</span></div></div></div>';
    document.getElementById("tab").appendChild(tab);
}


var currentElement=-1;
var option=document.querySelectorAll(".optionCustom_0");

option.forEach(op => op.addEventListener("click",function(){
    if (currentElement!=-1){
        if (op.id=="lockCustomer") {
            listAccount[currentElement].status="ĐÃ KHÓA";
            loadAccount(listAccount);

        }
        else if (op.id=="unlockedCustomer") {
            listAccount[currentElement].status="BÌNH THƯỜNG";
            loadAccount(listAccount);

        }
    }
}));



var currentElement_1=-1;
var option_1=document.querySelectorAll(".optionCustom_1");


option_1.forEach(op => op.addEventListener("click",function(){
    if (currentElement_1!=-1){
        
        if (op.id=="modifyProduct") openTabModifyProduct(currentElement_1);
        else if (op.id=="deleteProduct") deleteProduct(currentElement_1);
    }
}));

var titleHead=new Vue({
    el:'.titleHead',
    data:{
        title:'QUẢN LÝ ĐƠN HÀNG'
    }
})






var currentElement_2=-1;
var option_2=document.querySelectorAll(".optionCustom_2");
var optionCustom_2=document.getElementById("optionCustom_2");

option_2.forEach(op => op.addEventListener("click",function(){
    if (currentElement_2!=-1){
        
        if (op.id=="detailDelivery") tabDetailDelivery(listDelivery[currentElement_2]);
    }
}));

//Start

loadDelivery(listDelivery);
loadProduct(listProduct);
loadDataByFilter(comboType,document.getElementById("comboStatus"));
loadAccount(listAccount);




var buttonTab=document.querySelectorAll(".buttonGroup .buttonTab");
var viewChild=document.querySelectorAll(".viewChild");
buttonTab.forEach(button=>button.addEventListener("click",function(){
    document.querySelector(".titleView").innerHTML=button.firstElementChild.innerHTML;
    for (let btn of buttonTab){
        btn.classList.remove("onClickButton");
    }
    button.classList.add("onClickButton");
    for (let view of viewChild){
        view.style.display="none";
    }
    let index=button.getAttribute("aria-valueText")
    
    viewChild[index].style.display="block";
    if (index==0) loadDelivery(listDelivery);
    if (index==1) loadProduct(listProduct);
    if (index==2) loadAccount(listAccount);
}))

document.addEventListener("click",function(){
    optionCustom.style.display="none";
    optionCustom_1.style.display="none";
    optionCustom_2.style.display="none";
})
