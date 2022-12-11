import * as data from "../js/data.js";

AOS.init({duration: 1000,once:true});

window.addEventListener("load",function(){
  document.getElementById("loader").style.display="none";
  document.body.style.overflow="auto";
})

var path;

var listCart=data.listCart;
var cartTemporary;
var child = document.getElementById("childOfPage");
var account = null;
var totalCount = 0;
var totalBill=0;


function requireLogin(){
  var toa=data.toast({content:"Đăng nhập để thanh toán",btn_1:"Chuyển tới",btn_2:"Không"});
 if (toa){
      var accept=document.getElementById("acceptToast");
      if (accept) accept.addEventListener("click",function(){
          document.getElementById("toast").removeChild(toa);
          window.location=path+"loginNsignup.html";
      })
      var cancel=document.getElementById("cancelToast");
      if (cancel) cancel.addEventListener("click",function(){
          document.getElementById("toast").removeChild(toa);
      })
 }
}
if (sessionStorage.Account) account=JSON.parse(sessionStorage.Account);
if (child) path="../";
else path="./";
var navbar=document.querySelector(".areaNavbar");
window.onscroll = function() {scrollFunction()};
scrollFunction();
if (navbar)
{
  
  var search= new Vue({
    el:".searchbutton",
    methods:{
        onClick(){
            const content = document.getElementById("content");
            if (content.value){
              const contentView = document.getElementById("contentView");
              setSearch(content.value);
              window.location=path+"shop.html";
            }
            
            
        }
    }
  })
  
  new Vue({
    el:".option",
    methods:{
        clickProfile(){
          console.log(level);
          if (!level) 
          {
            window.location=path+"loginNsignup.html";
            
          }
          else{
            if (level=="admin") window.location=path+"admin/dashboard.html";
            else window.location=path+"profile.html";
          }
        },
        clickCart(){
          document.getElementById('background_option').style.visibility='visible';
          document.body.style.overflow="hidden";
          document.getElementById("mainOP").style.width="40%";
          document.getElementById("mainOP").style.height="100%";
  //         document.body.style.overflowY="hidden";
        },
        clickLogout(){
          if (sessionStorage.Account){
            sessionStorage.removeItem("level");
            sessionStorage.removeItem("Account");
            sessionStorage.removeItem("cartTemporary");
            sessionStorage.removeItem("cartOfAccount");
            //data.toast({content:"ĐÃ ĐĂNG XUẤT",type:"button:none"});
            window.location=path+"index.html";
          }
        }
    }
  })
  var background_option=new Vue({
    el:".background_option",
    methods:{
      clickBGVirtual()
      {
        closeBackgroundOption();
      },
      clickClose(){
        closeBackgroundOption();
      }
    }
    })
    new Vue({
      el:'#menu',
      data:{
        aboutUs:path+'aboutUs.html',
        shop:path+'shop.html',
        sale:path+'index.html#SsflashSale',
        collection:path+'collection.html',
        blog:path+'blog.html',
        contactUs:path+'contact.html',
        customerCare:path+'customerCare.html'
      }
    })
    document.querySelector(".cart .btn").addEventListener("click",function(){
      if (account) window.location=path+"payment.html";
      else {
        requireLogin();
      }
    })

      document.getElementById("content").addEventListener("keypress",function(e){
      if (e.keyCode === 13) {search.onClick();}
    })
    
  //sessionStorage.removeItem("cartTemporary");
    setProductToCart();
    if (account) {
      document.getElementById("buttonLogout").style.display="block"; 
      document.getElementById("nameAccount").style.display="block"; 
      document.getElementById("nameAccount").innerHTML="Chào, "+account.name;
    }
    
}

// sessionStorage.removeItem("cartTemporary");

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    if (document.getElementById("menu"))document.getElementById("menu").classList.add("sticky");
    document.getElementById("scrollToTop").classList.add("active");
  } else {
    if (document.getElementById("menu"))document.getElementById("menu").classList.remove("sticky");
    document.getElementById("scrollToTop").classList.remove("active");
  }
}



function getLevel(){
  let key = sessionStorage.getItem("level");
  return key;
}
var level=getLevel();




function closeBackgroundOption(){
  document.getElementById('background_option').style.visibility='hidden';
  document.body.style.overflowY="auto";
  document.getElementById("mainOP").style.width="0";
  document.getElementById("mainOP").style.height="0";
}





function saveDataToSession(product){
  var index=searchItem(product);
  if (index==-1)
      {
        cartTemporary.push(product);
      }
  else{
    
      cartTemporary[index].count+=product.count;
      
  }
  
  sessionStorage.setItem("cartTemporary",JSON.stringify(cartTemporary));
}

function setValueTotal(total,price){
  document.getElementById("totalCount").innerHTML=total;
  document.getElementById("countCart").innerHTML=total;
  document.getElementById("totalBill").innerHTML=data.formatNumber(price)+"&#8363";
  
  if (totalCount==0) {
    document.getElementById("list_item").innerHTML="<h3>Giỏ hàng rỗng!</h3>";
  }
}
  
function searchItem(product){
  var index=-1;
  for (let i=0;i<cartTemporary.length;i++){
    if (cartTemporary[i].id==product.id&&cartTemporary[i].size==product.size){
      index=i;
      break;
    }
  }

  return index;
}


function item({
pdt,
max=100,
min=1,
no,
})
{
  
  var id=pdt.id,imgPath=pdt.pathImg,name=pdt.name,color=pdt.color,count=parseInt(pdt.count),price=parseInt(pdt.price),size=pdt.size;


  var item=null;
  if (document.getElementById("item_cart_"+id+size)) 
  item =document.getElementById("item_cart_"+id+size);
  if (item&&searchItem(pdt)>-1)
  {
    document.getElementById("countInp__"+id+size).setAttribute("value",document.getElementById("countInp__"+id+size).value*1+count);
    totalCount+=count;
    totalBill+=price*count;
    setValueTotal(totalCount,totalBill);
  }
  else
  {
    totalBill+=price*count;
  
    totalCount=totalCount+count;
    
    const main=document.getElementById("list_item");
    // setValueTotal(totalCount,totalBill);
    if (main)
    {
      
      const item = document.createElement('div');
      item.onclick= function(e){
        count=document.getElementById("countInp__"+id+size).value;
        var del=false;
        if (e.target.closest('.add'))
        {
          if (count<max) {count++; totalCount++;totalBill+=price}
          document.getElementById("countInp__"+id+size).value=count;
          
        }
        else
        if (e.target.closest('.delete'))
        {
          main.removeChild(item);
          totalCount-=count;
          totalBill-=price*count;
          del=true;
        }
        else
        if (e.target.closest('.sub'))
        {
          if(count>min){count--; totalCount--;totalBill-=price}
          document.getElementById("countInp__"+id+size).value=count;
        }
        setValueTotal(totalCount,totalBill);
        if (del) cartTemporary.splice(no, 1);
        else cartTemporary[no].count=count;
        
        
        sessionStorage.setItem("cartTemporary",JSON.stringify(cartTemporary));
      }
      item.classList.add('item_cart');
      item.id="item_cart_"+id+size;
      item.innerHTML='<img src="'+(((child)?'.':'')+imgPath)+'" alt=""><div class="cart_info"><h4>'+name+'</h4><h6>'+color+'-'+size+'</h6><div class="priceAndCount"><div class="count"><i class="fa-solid fa-minus sub" @click="clickMinus"></i><input type="text" value="'+count+'" min="min" max="max" readonly id="countInp__'+id+size+'"><i class="fa-solid fa-plus add" @click="clickAdd"></i></div><p class="price">'+data.formatNumber(price)+'&#8363</p></div><p class="delete effect-for-btn">Xóa</p></div>'
      var input = document.createElement('input');
      input.type="hidden";
      input.id="priceItem_"+id+size;
      input.value=price;
      item.appendChild(input);
      main.appendChild(item);
      setValueTotal(totalCount,totalBill);
      return item;
    }
  }
}


function setProductToCart(){
  if (!sessionStorage.cartTemporary) sessionStorage.setItem("cartTemporary",JSON.stringify([]));
  cartTemporary=JSON.parse(sessionStorage.cartTemporary);
  if (account){
    
    for (let cart of listCart){
      if (cart.idCustomer==account.id && !sessionStorage.cartOfAccount) 
      {
        
        sessionStorage.setItem("cartOfAccount",JSON.stringify(cart));
        break;
      }
    }
    var cartOfAccount=JSON.parse(sessionStorage.cartOfAccount);
    if (cartOfAccount.checked==0){
      for (let pdt of cartOfAccount.products) cartTemporary.push(pdt);
      cartOfAccount.checked=1;
      sessionStorage.setItem("cartOfAccount",JSON.stringify(cartOfAccount));
    }
    sessionStorage.setItem("cartTemporary",JSON.stringify(cartTemporary));
  }
    //
    
  
  
    var i=0;
    for (let pdt of cartTemporary)
    {
        item({
          pdt:pdt,
          no:i
        })
        i++;
      
    }
  
  
}


function addProductToCart(product){
  
  //console.log(sessionStorage.cartTemporary);
  saveDataToSession(product);
  item({
    pdt:product,
    no:cartTemporary.length-1
  })
 
  
}



function setSearch(key){
  sessionStorage.setItem("keySearch", key);
}


  
if (document.querySelector(".footer"))
{
  new Vue({
    el:'.footer',
    data:{
      aboutUs:path+'aboutUs.html',
      policyMembership:path+'customerCare/policyMembership.html',
      guideOrders:path+'customerCare/guideOrders.html',
      policyTransport:path+'customerCare/policyTransport.html',
      policyReturnsWarranty:path+'customerCare/policyReturnsWarranty.html',
      contactUs:path+'contact.html',
      payments:path+'customerCare/paymentGuide.html',
      facebook:'',
      instagram:'',
      pinterest:'',
    }
  })
}
  
export{setProductToCart,addProductToCart,account,cartTemporary}
















