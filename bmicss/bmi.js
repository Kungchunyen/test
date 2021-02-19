var btn = document.querySelector('.btn');
var data = JSON.parse(localStorage.getItem('record')) || [];
var list = document.querySelector('.list');
//會從資料庫獲得資料，然後把資料轉化成物件儲存在自己裡面。
//使用者在第二次第三次打開這個網頁時，都能看到自己以前的紀錄
updateList(data);
function calculate(e){
  
  var height = parseInt(document.getElementById('height').value);
  var weight = parseInt(document.getElementById('weight').value);
  var BMIValue = (weight/Math.pow(height/100,2)).toFixed(2);
  var BMI = '';
  var color="";
  console.log(height,weight);
  
  
      
    if( BMIValue < 18.5 ){
      // console.log("太瘦");
      BMI="過輕";
      color="#31baf9";
    }else if(18.5 <= BMIValue && BMIValue < 24){
      BMI="理想";
      color="#86d73f";
    }else if(24 <= BMIValue && BMIValue < 27){
      BMI="過重";
      color="#ff982d";
    }else if(27 <= BMIValue && BMIValue < 30){
      BMI="輕度肥胖";
      color="#ff6c03";
    }else if(30 <= BMIValue && BMIValue < 35){
      BMI="中度肥胖";
      color="#ff6c03";
    }else{
      BMI="重度肥胖";
      color="#ff1200";
    };
    console.log(BMI);

    var date = new Date();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var year = date.getFullYear();
    var dateNow = day+'-'+month+'-'+year;

    var record = {
      BMI : BMI,
      BMIValue : BMIValue,
      weight : weight,
      height : height,
      dateNow : dateNow,
      color:color
    };

    
    console.log(data);
    data.splice(0,0,record);
    //splice( x, y, item)
    //x是你想插入的位置，y是你想從那位置之後刪掉的資料數目，item是你想插進去的資料
    updateList(data);//將新的record(物件)存進data
    localStorage.setItem('record',JSON.stringify(data));

};


//下方列表
function updateList(data){
  var str="";
  for(var i=0; i<data.length;i++){
    //創建模板
    function template(item){
      str += `<li data-num=${i} class=listItem style='border-left:7px ${data[i].color} solid;display:flex;justify-content:space-between;width: 624px;height: 62px;margin: 16px auto;padding: 5px 10px;align-items: center;'>
      <div class="BMI"><span style="font-size:20px">${data[i].BMI}</span></div>
      <div class="result">BMI <span style="font-size:20px">${data[i].BMIValue}</span></div>
      <div class="weight-kg>weight<span style="font-size:20px">${data[i].weight}kg</span></div>
      <div class="height-cm">height<span style="font-size:20px">${data[i].height}cm</span></div>
      <div class="date">${data[i].dateNow}</div></li>`
    };
    ////抓取陣列資料，根據抓到資料的bmi分類並列表
    switch (data[i].BMI){
            case "過輕":
            template(data[i]);
            break;
            
            case "理想":
            template(data[i]);
            break;

            case "過重":
            template(data[i]);
            break;
            
            case "輕度肥胖":
            template(data[i]);
            break;

            case "中度肥胖":
            template(data[i]);
            break;

            case "重度肥胖":
            template(data[i]);
            break;

            default:
            alert('something is wrong!');
            break;  
        }
  };
  list.innerHTML=str;
};


//從最後那一筆刪掉一筆，然後用修剪過的陣列再更新一次資料庫。
if(data.length>15){
  data.splice(15,1);
  updateList(data);
  localStorage.setItem('record',JSON.stringify(data));
};

//先取得按鈕的父元素（ParentNode），然後移除按鈕（remoceChild），接著新增一個div元素，給他一個Class名稱
function switchBTN(e){
  if(height.value == "" || weight.value =="" || height.value==0 || weight.value ==0){
    alert('請輸入身高體重')
  }else{
  btn.setAttribute('class','none');
  calculate();
  var getParent = btn.parentNode;
  var div = document.createElement('div');
  div.setAttribute('class',"show");

  function btnHandler(item){
    var str;
    str = `
    <p style="font-size:32px;position:absolute;top:40px;left:25px">${item.BMIValue}</p>
    <p style="font-size:14px;position:absolute;top:80px;right:50px">BMI</p>
    
    <a href="#" style="width:30px;height:30px;position:absolute;top:80px;left:90px;border-radius:50%;border:4px solid #424242">
    <img src="https://i.postimg.cc/tggNQQwg/icons-loop.png" style="position:absolute;top:5px;left:8px">
    </a><p class="statusText">${item.BMI}</p>`;
    div.innerHTML = str;
    div.style.color = item.color;
    div.style.border = `5px solid ${item.color}`;
    div.style.position = "relative";
    
    var a = div.querySelector('a');
    a.style.backgroundColor = item.color;
    getParent.appendChild(div);

    div.addEventListener('click',function(e){
      if(e.target.nodeName!=="IMG"){return};
      console.log(e.target.nodeName);
      btn.setAttribute('class','btn');
      div.setAttribute('class','none');
      
    });
  };
  height.value='';
  weight.value='';

};


  switch (data[0].BMI){
            case "過輕":
            btnHandler(data[0]);
            break;
            
            case "理想":
            btnHandler(data[0]);
            break;

            case "過重":
            btnHandler(data[0]);
            break;
            
            case "輕度肥胖":
            btnHandler(data[0]);
            break;

            case "中度肥胖":
            btnHandler(data[0]);
            break;

            case "重度肥胖":
            btnHandler(data[0]);
            break;

            default:
            alert('something is wrong!');
            break;      
        };    
  };
btn.addEventListener('click',switchBTN);











