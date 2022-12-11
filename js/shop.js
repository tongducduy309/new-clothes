import * as data from "../js/data.js";
let partPrice=[0,200000,500000,700000,-1];

let item_1=['#CACC1','./img/products/p1-1.png','#05615e,#c1132e','LEVENTS® | DORAEMON FAMOUS CAT TEE',370000,"p1"];
let item_2=['#CACC2','./img/products/p2-1.png','#f1f2f4,#0f0f0f','LEVENTS® | DORAEMON COLLAB TEE',435000,"p2"];
let item_3=['#CACC3','./img/products/p3.jpg','#f1f2f4, #0f0f0f, #0065c0','LEVENTS® DINOSAUR TEE',420000,"p3"];
let item_4=['#CACC4','./img/products/p4.jpg','#f1f2f4,#0f0f0f','LEVENTS® INSIDE OUT TEE',390000,"p4"];
let item_5=['#CACC5','./img/products/p5.jpg','#fdf4f2','LEVENTS® LOVEYOU300K SPECIAL TEE',300000,"p5"];
let item_6=['#CACC6','./img/products/p6.jpg','#141414, #1447a3','LEVENTS® FUNNY CROCODILE TEE',600000,"p6"];

var listItem=data.listProduct,listFilter=[];
var defaultList=[],defaultFilter=[];
var resultSearch=[];
var cpnItem=[];
var rangeView=[0,12];
var types=data.type;
var keySearch;

for (let ite of listItem){
  defaultList.push(ite);
}



document.querySelector(".deleteKeySearch").addEventListener("click",function(){
  document.getElementById("contentSearch").style.display="none";
  listItem=defaultList;
  keySearch=null;
  loadData(listItem);
})

function setListItemByR_Search(keySearch,listItem){
  var l=[];
  var list=listItem;
  keySearch=removeVietnameseTones(keySearch);
  
  
  for (var ite of list){
    if (ite.id.indexOf(keySearch)>-1||removeVietnameseTones(ite.name).indexOf(keySearch)>-1||removeVietnameseTones(ite.type).indexOf(keySearch)>-1) l.push(ite);
  }
  return l;
}

function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
  str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
  str = str.replace(/đ/g,"d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
 
  str = str.replace(/ + /g," ");
  str = str.trim();
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");

  return str.toUpperCase();
}

function processSearch(){
  keySearch = sessionStorage.getItem("keySearch");
  if (keySearch) {
    
    document.getElementById("contentSearch").style.display="flex";
    const content = document.getElementById("contentView");
    if (content) content.innerHTML="TỪ KHÓA: "+keySearch;
    listItem=setListItemByR_Search(keySearch,listItem);
    if (listItem.length==0)content.innerHTML="KHÔNG TÌM THẤY KẾT QUẢ "+keySearch;
    loadData(listItem);
    sessionStorage.removeItem("keySearch");
  }
  else{
    document.getElementById("contentSearch").style.display="none";
    loadData(listItem);
  }
}

//Start
processSearch();
let i=0;
var filterTypeEle=document.getElementById("filterType");
for (let type of types){
  filterTypeEle.innerHTML+='<div class="type"><input type="checkbox" value="'+i+'" v-model="selected" ><span>'+type+'</span></div>';
  i++;
}




function setAmountPaginationItem(listItem){
  document.getElementById("body-widePagination").innerHTML='';
  for (let i=0;i<listItem.length/12;i++){
    document.getElementById("body-widePagination").innerHTML+='<a href="#head" class="pagination_item'+((i==0)?' selectPaginationItem':'')+'"><span>'+(i+1)+'</span></a>';
  }
  var paginationItem = document.querySelectorAll(".pagination_item");
  var indexPagination=0;
  paginationItem.forEach((pagination,index)=>pagination.addEventListener("click",function(){
    paginationItem[indexPagination].classList.remove("selectPaginationItem"); 
    this.classList.add("selectPaginationItem");
    indexPagination=index;
    rangeView=[indexPagination*12,indexPagination*12+12];
    document.getElementById('listItem').innerHTML='';
    for (let i=rangeView[0];i<rangeView[1];i++){
      if (i==cpnItem.length) break;
      document.getElementById('listItem').appendChild(cpnItem[i]);
    }
  }))
}

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
  item.className='item col-md-3';
  item.setAttribute('data-aos','fade-up');
  item.id='item_'+id;
  item.onclick=function(e){
    window.location="./product/product_"+tag+".html";
  }
  item.innerHTML='<img src='+imgPath+' alt="">';
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
  item.innerHTML+='<h4>'+name+'</h4><p>'+data.formatNumber(price)+'&#8363</p>';
  
  return item;
}



function loadItem(listItem){
  
  var i=0;
  cpnItem=[];
  
  for (let ite of listItem){
    
    cpnItem.push(item({id:ite.id,imgPath:ite.pathImg,listColor:ite.codecolor,name:ite.name,price:ite.price,tag:ite.nameImg}));
    
    i++;
  }
  
  document.getElementById("totalResult").innerHTML=i;
}

function loadData(listItem){
  rangeView=[0,12];
  document.getElementById('listItem').innerHTML='';
  if (keySearch)
  {
    listItem=setListItemByR_Search(keySearch,listItem);
  }
  loadItem(listItem);
  
  for (let i=rangeView[0];i<rangeView[1];i++){
    if (i==cpnItem.length) break;
    document.getElementById('listItem').appendChild(cpnItem[i]);
  }
  setAmountPaginationItem(listItem);
}





function sortByPriceUp(listItem){
  var l=listItem;
  for (let i=0;i<l.length-1;i++){
    for (let j=i+1;j<l.length;j++){
      if (l[j].price<l[i].price){
        let t=l[j];
        l[j]=l[i]
        l[i]=t;
      }
    }
  }
  loadData(l);
}

function sortByPriceDown(listItem){
  var l=listItem;
  for (let i=0;i<l.length-1;i++){
    for (let j=i+1;j<l.length;j++){
      if (l[j].price>l[i].price){
        let t=l[j];
        l[j]=l[i]
        l[i]=t;
      }
    }
  }
  loadData(l);
}


// function filterByPrice(selected){
//   var l=[];
//   for (let i of selected){
//     let index=i*1;
//     for (let ite of listItem){
//       if ((ite.price*1>partPrice[index-1] && ite.price*1<partPrice[index]) || (ite.price*1>partPrice[index-1] && index==partPrice.length-1)) l.push(ite);
//     }
//   }
  
//   return l;
// }

var nodePrice_1=document.getElementById("nodePrice_1");
var nodePrice_2=document.getElementById("nodePrice_2");
function filterByType(listItem){
  var selected=filterType.selected;
  if (selected.length==0) return listItem;
  var l=[];
  for (let ite of listItem){
    var type=types.indexOf(ite.type)+"";
    if (selected.indexOf(type)>-1) l.push(ite);
  }
  return l;
}

function filterByPrice(listItem){
  var l=[];
  var message="";
  if (!nodePrice_2.value)
  {
    for (let ite of listItem){
      if (ite.price*1>nodePrice_1.value) l.push(ite);
    }
  }
  else{
    var node_1,node_2;
    if (!nodePrice_1.value){
      for (let ite of listItem){
        if (ite.price*1<nodePrice_2.value) l.push(ite);
      }
    }
    else{
      node_1=nodePrice_1.value;
      node_2=nodePrice_2.value;
    }
    for (let ite of listItem){
      if (ite.price*1>node_1 && ite.price*1<node_2) l.push(ite);
    }
  }
  var node_1=data.formatNumber(nodePrice_1.value),node_2=data.formatNumber(nodePrice_2.value);
  if (nodePrice_1.value&&nodePrice_2.value){
    message="Kết quả lọc sản phẩm từ "+node_1+" đến "+node_2;
  }
  else{
    if (nodePrice_1.value) message="Kết quả lọc sản phẩm lớn hơn "+node_1;
    else if (nodePrice_2.value)message="Kết quả lọc sản phẩm nhỏ hơn "+node_2;
  }
  if (nodePrice_1.value||nodePrice_2.value)
  data.toast({content:message,type:"button:none"});
  
  
  return l;
}

function isInputContent(s){
  if (!s) s="0";
  var number=parseInt(s);
  return (!isNaN(number));
}

document.getElementById("buttonFilter").addEventListener("click",function(){
  if (isInputContent(nodePrice_1.value)&&isInputContent(nodePrice_2.value)){
    
    defaultFilter=filterByType(defaultList);
    defaultFilter=filterByPrice(defaultFilter);
    if (defaultFilter.length!=0){
        listFilter=[];
        for (let ite of defaultFilter){
          listFilter.push(ite);
        }
        
      sortList(sort.value);
      document.getElementById("deleteFilter").style.display="block";
    }
    else loadData(defaultFilter);
   
    
  }
  else{
    data.toast({content:"Giá vui lòng nhập bằng số (Ví dụ: 200000)",type:"button:none"});
  }
  
})

function sortList(n){
  if (defaultFilter.length==0){
  //   if (processPrice.selected.length==0){
      if(n==1) sortByPriceUp(listItem);
      else if (n==2) sortByPriceDown(listItem);
      else loadData(defaultList);
  //   }
  //   else{
  //     // document.getElementById('listItem').innerHTML='';
  //     // document.getElementById("totalResult").innerHTML='';
  //   }
  }
  else{
    if(n==1) sortByPriceUp(listFilter);
    else if (n==2) sortByPriceDown(listFilter);
    else loadData(defaultFilter);
  }
}

var sort=new Vue({
  el:'#sort',
  data:{
    value:0
  },
  methods:{
    onChange(e){
      this.value=e.target.value;
      sortList(this.value);
      
      
    }
  }
})

function resetFilter(){
  var inputFilter = document.querySelectorAll(".filter input");
  for (let i=0;i<inputFilter.length-2;i++){
    inputFilter[i].checked=false;
  }
  inputFilter[inputFilter.length-2].value="";
  inputFilter[inputFilter.length-1].value="";
  defaultFilter=[];
  filterType.selected=[];
}

document.getElementById("deleteFilter").addEventListener("click",function(){
  
  resetFilter();
  this.style.display="none";
  loadData(defaultList);
})


var filterType=new Vue({
  el:'#filterType',
  methods:{
  },
  data() {
    return {
      selected:[]
    }
  }
})




