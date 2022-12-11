import * as data from "../js/data.js";
var listProduct=data.listProduct;


function time() {
    const second = 1000,
          minute = second * 60,
          hour = minute * 60,
          day = hour * 24;
    const start=new Date('11 21, 2023, 9:33:50').getTime();
    
    
    const countDown = new Date(start).getTime(),
    
        x = setInterval(function() {    
  
          const now = new Date().getTime(),
                distance = countDown - now;
            document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
            document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
            document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);
  
          //do something later when date is reached
          if (distance < 0) {
            document.getElementById("headline").innerText = "SIÊU KHUYẾN MÃI ĐÃ KẾT THÚC";
            document.getElementById("countdown").style.display = "none";
            clearInterval(x);
          }
          //seconds
        }, 0)
    };
    
time();

function itemSale({
  percentSale,
  pathImg,
  price,
  percentSales,
  tag,
}){
  
  var item=document.createElement("div");
  item.className="item col-md-2";
  item.onclick=function(e){
    window.location="./product/product_"+tag+".html";
  }
  item.innerHTML='<div class="percentSale"><li><i class="fa-solid fa-bolt-lightning"></i></li><span class="percent">-'+percentSale+'%</span></div><img src="'+pathImg+'" alt=""><span class="priceSale">'+data.formatNumber(price-(price*percentSale)/100)+'&#8363</span><span class="price">'+data.formatNumber(price)+'&#8363</span><div class="processbar" ><div class="value" style="--value: '+percentSales+'%"></div></div><span class="titlePercent">'+percentSales+'% Đã bán</span>';
  document.getElementById("flashSale").appendChild(item);
}


function itemProduct({
  pathImg,
  name,
  price,
  tag,
  parent

}){
  price=data.formatNumber(price);
  var item=document.createElement("div");
  item.className="item_pdt col-md-3";
  item.onclick=function(e){
    window.location="./product/product_"+tag+".html";
  }
  item.innerHTML='<img src="'+pathImg+'" alt=""><a href="./product/product_'+tag+'.html" class="name">'+name+'</a><span class="price">'+price+'&#8363</span>'
  document.getElementById("areaProduct_"+parent).appendChild(item);
}


function loadData(){
  var i=0,j=0;
  for (let pdt of listProduct){
    if (pdt.percentSale!=0) {
      j++;
      itemSale({percentSale:pdt.percentSale,pathImg:pdt.pathImg,price:pdt.price,percentSales:pdt.percentSale,tag:pdt.nameImg});
    }
    else{
      if (i<8){
        i++;
        if (i<5){
          itemProduct({
            pathImg:pdt.pathImg,
            name:pdt.name,
            price:pdt.price,
            tag:pdt.nameImg,
            parent:"1"
          })
        }
        else{
          itemProduct({
            pathImg:pdt.pathImg,
            name:pdt.name,
            price:pdt.price,
            tag:pdt.nameImg,
            parent:"2"
          })
        }
      }
    }
  }
  if (j==0) document.getElementById("SsflashSale").style.display="none";
}


loadData();


