import * as data from "../js/data.js"
import * as main from "../js/main.js"
var countProduct=new Vue({
    el:'.countProduct',
    data:{
        value:1
    },
    methods:{
        clickMinus(){
            if (this.value>1) this.value--;
        },
        clickAdd(){
            this.value++;
        }
    }
})
var contentInfo=new Vue({
    el:'.infoProduct',
    data:{
        active:false
    },
    methods:{
        onClick(){
            if (!this.active){
                document.getElementById("contentInfo").style.display="block";
                
            }
            else {
                document.getElementById("contentInfo").style.display="none";
            }
            this.active=!this.active;
        }
    }
})
var contentGuide=new Vue({
    el:'.guideSize',
    data:{
        active:false
    },
    methods:{
        onClick(){
            if (!this.active){
                document.getElementById("contentGuide").style.display="block";
                
            }
            else {
                document.getElementById("contentGuide").style.display="none";
            }
            this.active=!this.active;
        }
    }
})

var listImg=[];

var currentImg=0;
var listPathImg=document.querySelectorAll("#imgMain img");
var nameColor=["TRẮNG","ĐEN"];
function loadDataImg(){
    currentImg=0;
    document.getElementById("color").innerHTML="Màu sắc: "+nameColor[currentImg];
    for (let i=0;i<=listPathImg.length;i++){
        var img=document.createElement('img');
        img.src=listPathImg[i];
        img.id="imgMain_"+i;
        if (i>0) img.classList.add("pic_hidden");
        listImg.push(img);
        document.getElementById("imgMain").appendChild(img);
    }
    

}
//loadDataImg();


var listColor=new Vue({
    el:'#listColor_pdt',
    methods:{
       clickColor(e){
        console.log(e);
            let index=e.target.getAttribute("value");
            listPathImg[currentImg].classList.add("pic_hidden");
            listPathImg[index].classList.remove("pic_hidden");
            document.getElementById("color").innerHTML="Màu sắc: "+e.target.getAttribute("aria-valueText");
            currentImg=index;
       }
    }
})

function item({
    id,
    imgPath='',
    listColor='',
    name='',
    price='',
    priceSale='',
    tag=''
  })
  {
    
    var item=document.createElement('div');
    item.className='item';
    item.setAttribute('data-aos','fade-left');
    item.id='item_'+id;
    item.innerHTML='<img src=.'+imgPath+' alt="">';
    item.onclick=function(e){
        if (!swipeOn)
        window.location="../product/product_"+tag+".html";
    }
    var colors=document.createElement('div');
    colors.classList.add('listColor');
    colors.id='listColor_'+id;
    listColor=listColor.split(",");
    for (let color of listColor){
      var itemColor=document.createElement('div');
      itemColor.classList.add('itemColor');
      itemColor.style.backgroundColor=color;
      colors.appendChild(itemColor);
    }
    item.appendChild(colors);
    item.innerHTML+='<h4>'+name+'</h4><div class="groupPrice"><span class="price">'+price+'.</span> <span class="priceSale">'+priceSale+'&#8363</span></div>';
    document.getElementById('listProduct').appendChild(item);
    return item;
  }

var listItem=data.listProduct;
var cpnItem=[];

function loadItem(listItem){
    document.getElementById('listProduct').innerHTML='';
    var i=0;
    for (let ite of listItem){
        if (ite.percentSale!=0){
            var sales=ite.price-(ite.percentSale*ite.price)/100;
            cpnItem.push(item({id:ite.id,imgPath:ite.pathImg,listColor:ite.codecolor,name:ite.name,price:ite.price,priceSale:sales,tag:ite.nameImg}));
        }
        else cpnItem.push(item({id:ite.id,imgPath:ite.pathImg,listColor:ite.codecolor,name:ite.name,price:'',priceSale:ite.price,tag:ite.nameImg}));
        
        i++;
        
    }
}

function loadData(){
    loadItem(listItem);
}

loadData();
//console.log(cpnItem[0]);

var root = document.querySelector(':root');
var widthItem=cpnItem[0].offsetWidth;
var scrollWidth=document.getElementById("swipe").scrollWidth;
var scrollHeight=document.getElementById("swipe").clientWidth*100/((widthItem+20)*cpnItem.length);
root.style.setProperty('--valueSwipe',(document.getElementById("swipe").scrollLeft*scrollHeight)/scrollWidth*100 +"%");

function currentScrollPercentage()
{
    return ((document.getElementById("swipe").scrollLeft + document.body.scrollLeft) / (document.getElementById("swipe").scrollWidth - document.getElementById("swipe").clientWidth) * 100);
}

var swipeOn=false;
var startX,startY;

document.getElementById("listProduct").addEventListener("mousedown", function(){
    swipeOn=true;
    let e = window.event;
    startX = e.clientX;
    startY = e.clientY;

});
document.getElementById("listProduct").addEventListener("mouseup", function(){
    swipeOn=false;
});
document.getElementById("listProduct").addEventListener("mouseleave", function(){
    swipeOn=false;
});

document.getElementById("listProduct").addEventListener("mousemove", function(){
        if (swipeOn){
            let e = window.event;
    
            var posX = e.clientX;
            var posY = e.clientY;
    
            let move=Math.abs(posX-startX);
            var scrollPos=document.getElementById("swipe").scrollLeft;
            if (posX>startX)document.getElementById("swipe").scrollBy(-move, 0);
            if (posX<startX ) document.getElementById("swipe").scrollBy(move, 0);
            var scrollPercent=currentScrollPercentage();

            root.style.setProperty('--valueSwipe', scrollPercent+"%");
            
            
        }
    
},);





document.querySelector(".addToCart").addEventListener("click",function(){
    var pdt=data.listProduct[document.getElementById("serial").value*1];

    var size = document.getElementById("size").value;
    if (size=="A"||size=="B"||size=="C"||size=="D") {
        var product=data.createAProduct({id:pdt.id,name:pdt.name,codecolor:pdt.codecolor,size:document.getElementById("size").value,count:(document.getElementById("countProductInp").value*1),price:(pdt.price-(pdt.price*pdt.percentSale)/100),pathImg:pdt.pathImg,nameImg:pdt.nameImg,color:pdt.color});

         main.addProductToCart(product);
         data.toast({content:"Thêm vào giỏ hàng thành công",type:"button:none"})
    }else
    data.toast({content:"Vui lòng chọn size A|B|C|D",type:"button:none"})
        
    

})





