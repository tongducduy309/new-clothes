var path;
const type=["Áo thun","Polo","Sơ mi","Hoodie","Sweater","Áo khoác"];
const statusDelivery=["Chờ xác nhận","Đang đóng gói","Đang giao","Đã giao","Đã hủy","Trả hàng / Hoàn tiền"];
var acc_1=createAAccount({id:"1",name:"admin",phone:"0586152003",email:"",address:"HCM",username:"adminpage",password:"tongducduy",status:"BÌNH THƯỜNG",level:"admin"});
var acc_2=createAAccount({id:"2",name:"Lê Trung Kiên",phone:"0586152003",email:"",address:"HCM",username:"letrungkien",password:"letrungkien",status:"BÌNH THƯỜNG",level:"admin-lower"});
var acc_3=createAAccount({id:"3",name:"Lê Bùi Minh Khoa",phone:"0586152003",email:"",address:"HCM",username:"minhkhoa",password:"minhkhoa",status:"BÌNH THƯỜNG",level:"admin-lower"});
var listAccount=[acc_1,acc_2,acc_3];



var pdt_1=createAProduct({id:"#CACC1",name:"LEVENTS® | DORAEMON FAMOUS CAT TEE",codecolor:'#05615e, #c1132e',size:"A, B, C, D",count:12,price:"370000",pathImg:"./img/products/p1-1.png",nameImg:"p1",color:"XANH LÁ",percentSale:40,type:type[0]});
var pdt_2=createAProduct({id:"#CACC2",name:"LEVENTS® | DORAEMON COLLAB TEE",codecolor:'#f1f2f4, #0f0f0f',size:"A, B, C, D",count:11,price:"450000",pathImg:"./img/products/p2-1.png",nameImg:"p2",color:"TRẮNG",percentSale:40,type:type[0]});
var pdt_3=createAProduct({id:"#CACC3",name:"LEVENTS® DINOSAUR TEE",codecolor:'#f1f2f4, #0f0f0f, #1447a3',size:"A, B, C, D",count:1,price:"420000",pathImg:"./img/products/p3-1.jpg",nameImg:"p3",color:"TRẮNG",type:type[0]});
var pdt_4=createAProduct({id:"#CACC4",name:"LEVENTS® INSIDE OUT TEE",codecolor:'#f1f2f4, #0f0f0f',size:"A, B, C, D",count:2,price:"390000",pathImg:"./img/products/p4-1.jpg",nameImg:"p4",color:"TRẮNG",type:type[0]});
var pdt_5=createAProduct({id:"#CACC5",name:"LEVENTS® LOVEYOU300K SPECIAL TEE",codecolor:'#fdf4f2',size:"A, B, C, D",count:2,price:"300000",pathImg:"./img/products/p5-1.jpg",nameImg:"p5",color:"TRẮNG KEM",type:type[0]});
var pdt_6=createAProduct({id:"#CACC6",name:"LEVENTS® FUNNY CROCODILE TEE",codecolor:'#1447a3, #0f0f0f',size:"A, B, C, D",count:2,price:"390000",pathImg:"./img/products/p6-1.jpg",nameImg:"p6",color:"XANH LAM",type:type[0]});
var pdt_7=createAProduct({id:"#CACC7",name:"LEVENTS® PUNCH VARSITY",codecolor:'#05615e, #0f0f0f',size:"A, B, C, D",count:2,price:"890000",pathImg:"./img/products/p7-1.jpg",nameImg:"p7",color:"XANH LÁ",type:type[5]});
var pdt_8=createAProduct({id:"#CACC8",name:"LEVENTS® SELFLOVE BOXY TEE",codecolor:'#f1f2f4, #0f0f0f',size:"A, B, C, D",count:2,price:"380000",pathImg:"./img/products/p8-1.jpg",nameImg:"p8",color:"TRẮNG",type:type[0]});
var pdt_9=createAProduct({id:"#CACC9",name:"LEVENTS® | DORAEMON MINI CAT POLO",codecolor:'#f1f2f4, #0f0f0f',size:"A, B, C, D",count:2,price:"405000",pathImg:"./img/products/p9-1.jpg",nameImg:"p9",color:"TRẮNG",percentSale:7,type:type[1]});
var pdt_10=createAProduct({id:"#CACC10",name:"LEVENTS® MINI POPULAR POLO",codecolor:'#f1f2f4, #0f0f0f',size:"A, B, C, D",count:2,price:"370000",pathImg:"./img/products/p10-1.jpg",nameImg:"p10",color:"TRẮNG",type:type[1]});
var pdt_11=createAProduct({id:"#CACC11",name:"LEVENTS® STRIPE POLO",codecolor:'#f1f2f4, #0f0f0f',size:"A, B, C, D",count:2,price:"420000",pathImg:"./img/products/p11-1.jpg",nameImg:"p11",color:"TRẮNG",type:type[1]});
var pdt_12=createAProduct({id:"#CACC12",name:"LEVENTS® CINEMA SHIRT",codecolor:'#05615e, #0f0f0f',size:"A, B, C, D",count:2,price:"420000",pathImg:"./img/products/p12-1.jpg",nameImg:"p12",color:"XANH LÁ",type:type[2]});
var pdt_13=createAProduct({id:"#CACC13",name:"LEVENTS® CITIES SHIRT",codecolor:'#f1f2f4, #0f0f0f',size:"A, B, C, D",count:2,price:"420000",pathImg:"./img/products/p13-1.jpg",nameImg:"p13",color:"TRẮNG",type:type[2]});
var pdt_14=createAProduct({id:"#CACC14",name:"LEVENTS® | DORAEMON COLLAB ZIPPER HOODIE",codecolor:'#f1f2f4, #d2d1d7',size:"A, B, C, D",count:2,price:"645000",pathImg:"./img/products/p14-1.jpg",nameImg:"p14",color:"TRẮNG",percentSale:7,type:type[3]});
var pdt_15=createAProduct({id:"#CACC15",name:"LEVENTS® POPULAR LOGO 2.0 HOODIE",codecolor:'#fdf4f2, #05615e, #0f0f0f',size:"A, B, C, D",count:2,price:"590000",pathImg:"./img/products/p15-1.jpg",nameImg:"p15",color:"TRẮNG KEM",type:type[3]});
var pdt_16=createAProduct({id:"#CACC16",name:"LEVENTS® MINI LOGO ZIPPER HOODIE",codecolor:'#f1f2f4, #d2d1d7',size:"A, B, C, D",count:2,price:"620000",pathImg:"./img/products/p16-1.jpg",nameImg:"p16",color:"TRẮNG",type:type[3]});
var pdt_17=createAProduct({id:"#CACC17",name:"LEVENTS® | DORAEMON COLLAB HOODIE",codecolor:'#f1f2f4, #0f0f0f',size:"A, B, C, D",count:1,price:"625000",pathImg:"./img/products/p17-1.jpg",nameImg:"p17",color:"TRẮNG",type:type[3]});
var pdt_18=createAProduct({id:"#CACC18",name:"LEVENTS® BASIC SWEATER",codecolor:'#d2d1d7, #c1132e',size:"A, B, C, D",count:2,price:"490000",pathImg:"./img/products/p18-1.jpg",nameImg:"p18",color:"TRẮNG KEM",percentSale:10,type:type[4]});
var pdt_19=createAProduct({id:"#CACC19",name:"LEVENTS® FUNNY CROCODILE SWEATER",codecolor:'#05615e, #0f0f0f',size:"A, B, C, D",count:2,price:"490000",pathImg:"./img/products/p19-1.jpg",nameImg:"p19",color:"XANH LÁ",type:type[4]});
var listProduct=[pdt_1,pdt_2,pdt_3,pdt_4,pdt_5,pdt_6,pdt_7,pdt_8,pdt_9,pdt_10,pdt_11,pdt_12,pdt_13,pdt_14,pdt_15,pdt_16,pdt_17,pdt_18,pdt_19];




//A cart
var pdtC_1=createAProduct({id:"#CACC1",name:"LEVENTS® | DORAEMON FAMOUS CAT TEE",codecolor:'#05615e, #c1132e',size:"A",count:1,price:"370000",pathImg:"./img/products/p1-1.png",nameImg:"p1",color:"XANH LÁ",percentSale:40,type:type[0]});
var pdtC_2=createAProduct({id:"#CACC2",name:"LEVENTS® | DORAEMON COLLAB TEE",codecolor:'#f1f2f4, #0f0f0f',size:"A",count:1,price:"450000",pathImg:"./img/products/p2-1.png",nameImg:"p2",color:"TRẮNG",percentSale:40,type:type[0]});
var pdtC_3=createAProduct({id:"#CACC3",name:"LEVENTS® DINOSAUR TEE",codecolor:'#f1f2f4, #0f0f0f, #1447a3',size:"D",count:1,price:"420000",pathImg:"./img/products/p3-1.jpg",nameImg:"p3",color:"TRẮNG",type:type[0]});
var pdtC_4=createAProduct({id:"#CACC4",name:"LEVENTS® INSIDE OUT TEE",codecolor:'#f1f2f4, #0f0f0f',size:"D",count:2,price:"390000",pathImg:"./img/products/p4-1.jpg",nameImg:"p4",color:"TRẮNG",type:type[0]});
var pdtC_5=createAProduct({id:"#CACC5",name:"LEVENTS® LOVEYOU300K SPECIAL TEE",codecolor:'#fdf4f2',size:"D",count:2,price:"300000",pathImg:"./img/products/p5-1.jpg",nameImg:"p5",color:"TRẮNG KEM",type:type[0]});
var pdtC_6=createAProduct({id:"#CACC6",name:"LEVENTS® FUNNY CROCODILE TEE",codecolor:'#1447a3, #0f0f0f',size:"A",count:2,price:"390000",pathImg:"./img/products/p6-1.jpg",nameImg:"p6",color:"XANH LAM",type:type[0]});
var pdtC_7=createAProduct({id:"#CACC7",name:"LEVENTS® PUNCH VARSITY",codecolor:'#05615e, #0f0f0f',size:"A",count:2,price:"890000",pathImg:"./img/products/p7-1.jpg",nameImg:"p7",color:"XANH LÁ",type:type[5]});
var pdtC_8=createAProduct({id:"#CACC8",name:"LEVENTS® SELFLOVE BOXY TEE",codecolor:'#f1f2f4, #0f0f0f',size:"A",count:2,price:"380000",pathImg:"./img/products/p8-1.jpg",nameImg:"p8",color:"TRẮNG",type:type[0]});
var pdtC_9=createAProduct({id:"#CACC9",name:"LEVENTS® | DORAEMON MINI CAT POLO",codecolor:'#f1f2f4, #0f0f0f',size:"A",count:2,price:"405000",pathImg:"./img/products/p9-1.jpg",nameImg:"p9",color:"TRẮNG",percentSale:7,type:type[1]});
var pdtC_10=createAProduct({id:"#CACC10",name:"LEVENTS® MINI POPULAR POLO",codecolor:'#f1f2f4, #0f0f0f',size:"A",count:2,price:"370000",pathImg:"./img/products/p10-1.jpg",nameImg:"p10",color:"TRẮNG",type:type[1]});
var pdtC_11=createAProduct({id:"#CACC11",name:"LEVENTS® STRIPE POLO",codecolor:'#f1f2f4, #0f0f0f',size:"A",count:2,price:"420000",pathImg:"./img/products/p11-1.jpg",nameImg:"p11",color:"TRẮNG",type:type[1]});
var pdtC_12=createAProduct({id:"#CACC12",name:"LEVENTS® CINEMA SHIRT",codecolor:'#05615e, #0f0f0f',size:"A",count:2,price:"420000",pathImg:"./img/products/p12-1.jpg",nameImg:"p12",color:"XANH LÁ",type:type[2]});
var pdtC_13=createAProduct({id:"#CACC13",name:"LEVENTS® CITIES SHIRT",codecolor:'#f1f2f4, #0f0f0f',size:"A",count:2,price:"420000",pathImg:"./img/products/p13-1.jpg",nameImg:"p13",color:"TRẮNG",type:type[2]});
var pdtC_14=createAProduct({id:"#CACC14",name:"LEVENTS® | DORAEMON COLLAB ZIPPER HOODIE",codecolor:'#f1f2f4, #d2d1d7',size:"A",count:2,price:"645000",pathImg:"./img/products/p14-1.jpg",nameImg:"p14",color:"TRẮNG",percentSale:7,type:type[3]});
var pdtC_15=createAProduct({id:"#CACC15",name:"LEVENTS® POPULAR LOGO 2.0 HOODIE",codecolor:'#fdf4f2, #05615e, #0f0f0f',size:"A",count:2,price:"590000",pathImg:"./img/products/p15-1.jpg",nameImg:"p15",color:"TRẮNG KEM",type:type[3]});
var pdtC_16=createAProduct({id:"#CACC16",name:"LEVENTS® MINI LOGO ZIPPER HOODIE",codecolor:'#f1f2f4, #d2d1d7',size:"A",count:2,price:"620000",pathImg:"./img/products/p16-1.jpg",nameImg:"p16",color:"TRẮNG",type:type[3]});
var pdtC_17=createAProduct({id:"#CACC17",name:"LEVENTS® | DORAEMON COLLAB HOODIE",codecolor:'#f1f2f4, #0f0f0f',size:"A",count:1,price:"625000",pathImg:"./img/products/p17-1.jpg",nameImg:"p17",color:"TRẮNG",type:type[3]});
var pdtC_18=createAProduct({id:"#CACC18",name:"LEVENTS® BASIC SWEATER",codecolor:'#d2d1d7, #c1132e',size:"A",count:2,price:"490000",pathImg:"./img/products/p18-1.jpg",nameImg:"p18",color:"TRẮNG KEM",percentSale:10,type:type[4]});
var pdtC_19=createAProduct({id:"#CACC19",name:"LEVENTS® FUNNY CROCODILE SWEATER",codecolor:'#05615e, #0f0f0f',size:"A",count:2,price:"490000",pathImg:"./img/products/p19-1.jpg",nameImg:"p19",color:"XANH LÁ",type:type[4]});
var cart_1=createACart(listAccount[1].id,[pdtC_1,pdtC_2],0);
var cart_2=createACart(listAccount[2].id,[pdtC_2,pdtC_3],0);
var listCart = [cart_1,cart_2];

//A delivery
var adlr_1=createADelivery("1","20/11/2022",2,listAccount[1].id,listAccount[1].name,"0586152003","HCM",[pdtC_1,pdtC_2]);
var adlr_2=createADelivery("2","21/11/2022",0,listAccount[2].id,listAccount[2].name,"0586152003","HCM",[pdtC_3]);
var adlr_3=createADelivery("3","23/10/2022",1,listAccount[2].id,listAccount[2].name,"0586152003","HCM",[pdtC_3,pdtC_2]);
var adlr_4=createADelivery("4","20/11/2022",3,listAccount[1].id,listAccount[1].name,"0586152003","HCM",[pdtC_7,pdtC_8]);
var adlr_5=createADelivery("5","20/11/2022",3,listAccount[1].id,listAccount[1].name,"0586152003","HCM",[pdtC_9,pdtC_10]);
var adlr_6=createADelivery("6","20/11/2022",3,listAccount[1].id,listAccount[1].name,"0586152003","HCM",[pdtC_17,pdtC_18]);
var adlr_7=createADelivery("7","20/11/2022",3,listAccount[1].id,listAccount[1].name,"0586152003","HCM",[pdtC_17,pdtC_2]);
var listDelivery=[adlr_1,adlr_2,adlr_3,adlr_4,adlr_5,adlr_6,adlr_7];

function checkAccount({
    username='',
    password=null,
}){
    var exs_us=null;
    for (let acc of listAccount){
        if (acc.username===username) {
            exs_us=acc;
            break;
        }
    }
    if (exs_us){
    if (password){
        if (exs_us.password===password)
        return exs_us;
        return false;
    }
    return true;
    }
    else{
        return false;
    }

}

function createAAccount({id,name,phone,email,address,username,password,status,level}){
    return {
        id:id,
        name:name,
        phone:phone,
        email:email,
        address:address,
        username:username,
        password:password,
        status:status,
        level:level
    }
}
function createADelivery(id,date,status,idCustomer,nameCustomer,phoneCustomer,addressCustomer,products){
    var value=0,count=0;
    for (let pdt of products){
        value+=(pdt.price*1)*pdt.count;
        count+=pdt.count;
    }
    return {
        id:id,
        date:date,
        value:value,
        count:count,
        status:status,
        idCustomer:idCustomer,
        nameCustomer:nameCustomer,
        phoneCustomer:phoneCustomer,
        addressCustomer:addressCustomer,
        products:products
    }
}
function createAProduct({id,name,codecolor,size="",count,price,pathImg,nameImg,color,percentSale=0,type}){
    return {
        id:id,
        name:name,
        codecolor:codecolor,
        size:size,
        count:count,
        price:price,
        pathImg:pathImg,
        nameImg:nameImg,
        color:color,
        percentSale:percentSale,
        type:type,
    }
}
function createACart(idCustomer,products,checked){
    return {
        idCustomer:idCustomer,
        products:products,
        checked:checked
    }
}
function toast({
    content='',
    btn_1='Đồng ý',
    btn_2='Hủy',
    type="button:2"
}){
    if (document.getElementById("toast").childElementCount==0 || type=="button:none"){
        var toast = document.createElement("div");
        toast.classList.add("toast");
        if (type=="button:2")
        toast.innerHTML='<span id="contentToast">'+content+'</span><div class="buttonToast"><div id="acceptToast"><span>'+btn_1+'</span></div><div id="cancelToast"><span>'+btn_2+'</span></div></div>';
        else toast.innerHTML='<span id="contentToast">'+content+'</span>';
        document.getElementById("toast").appendChild(toast);
        setTimeout(function(){
            if (toast.parentElement){
                document.getElementById("toast").removeChild(toast);

            }
            
        },8000);
        return toast;
    }
    return null;
    
}

function formatNumber(n){
    var s=n+"",rs="";
    while (s.length>3){
        rs="."+s.substr(s.length-3,3)+rs;
        s=s.substring(0,s.length-3);
    }
    return s+rs;
  }
export{listAccount,listProduct,listDelivery,listCart,type,statusDelivery,createADelivery,createAProduct,createACart,toast,checkAccount,formatNumber}

