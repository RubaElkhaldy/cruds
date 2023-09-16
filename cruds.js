//cruds -create   -read   -update   -delete  -search

//function(){}
//get Total
//create category
//save localstorage
//clear inputs
//Read
//count عدد 
//delete 
//update 
//search
//clean data






let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let subimt = document.getElementById('subimt');
let temp;
let mood = 'create'

//console.log(taxes,title,price,discount,ads,total,category,count,subimt)

price.addEventListener("keyup", getTotal);
taxes.addEventListener("keyup", getTotal);
ads.addEventListener("keyup", getTotal);
discount.addEventListener("keyup", getTotal);
function getTotal() {
  if (price.value != '') {
    let result = (Number(price.value) + Number(taxes.value) + Number(ads.value))
      - Number(discount.value);
    total.innerHTML = result;
    total.style.background = 'green';
  }
  else {

    total.innerHTML = ''
    total.style.background = 'rgb(143, 19, 19)'
  }

}



//Create product
//save loacal storage
let array;
if (localStorage.product != null) {


  array = JSON.parse(localStorage.product)
} else {

  array = []

}





subimt.onclick = function () {
  let newObject = {
    title: title.value.toLowerCase(),
    price: price.value,
    count: count.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase()
  }
  //console.log(newObject.count )

if(title.value != ''  
&& price.value != ''
&&category.value !=''
&& newObject.count <= 100){
  if (mood === 'create') {

    if (newObject.count > 1) {
      for (let i = 0; i < newObject.count; i++) {
        array.push(newObject);
      }


    }
    else { array.push(newObject) }
  }
    //mood ='update'
    else {
      array[temp] = newObject;
      count.style.display = "block";
  
      mood = 'create'
      subimt.innerHTML = 'Create'
  
  
  
  
  
    }
  
    clearData();

}



 





  //save localstorage
  localStorage.setItem('product', JSON.stringify(array))

  show()
}


function clearData() {

  title.value = ''
  price.value = ''
  discount.value = ''
  taxes.value = ''
  ads.value = ''
  total.innerHTML = ''
  count.value = ''
  category.value = ''
}





//Read


function show() {

  let table = ``;
  for (let i = 0; i < array.length; i++) {

    table +=
      `<tr>
<td>${i}</td>
<td>${array[i].title}</td>

<td>${array[i].price}</td>
<td>${array[i].taxes}</td>
<td>${array[i].ads}</td>
<td>${array[i].discount}</td>
<td>${array[i].total}</td>
<td> ${array[i].category}</td>
<td><button onclick="update_data(${i})">update</button></td>

<td><button onclick="delete_data(${i})">Delete</button></td>
</tr>`

  }

  document.getElementById('tbody').innerHTML = table

  //  delete_All

  let btn_delete_All = document.getElementById('delete_all');
  if (array.length > 0) {
    btn_delete_All.innerHTML = ` <button onclick="delete_All()">Delete_All (${array.length})</button>`
  } else {
    btn_delete_All.innerHTML = ''
  }

  getTotal()

}
show();


function delete_All() {
  localStorage.clear();
  array.splice(0);
  show()


}


//splice  لو بدي احدف من المصفوفة او احط فيها عناصر زيادة
//splice( مكان  اللي يوقف عليه الموشر للحدف او الزيادةstart , عدد اللي بدي احدفهم,add)
//splice(0,0,'ruba') :هنا راح اضيف ربا فقط بالمكان صفر وم بحدف ولا عنضر
//splice(0) بحدف كل المصفوفةةةةةةةةةةةةة
//splice بتأثر ع المصفوفة
//slice : لا تتأثر المصفوفة


//delete on element
function delete_data(i) {

  array.splice(i, 1)
  localStorage.product = JSON.stringify(array)
  show()


}



//count
//let count =document.getElementById('count')




function update_data(i) {

  //console.log(i)
  title.value = array[i].title
  price.value = array[i].price
  taxes.value = array[i].taxes
  ads.value = array[i].ads
  discount.value = array[i].discount
  category.value = array[i].category;
  count.style.display = "none";
  getTotal();
  subimt.innerHTML = 'update'
  temp = i
  mood = 'update'
  scroll({ top: 0, behavior: "smooth" })

}












//SEARCH


let mood_search = 'title';
let search = document.getElementById('search')
function getsearchMood(id) {
  if (id == 'searchTitle') {
    mood_search = 'title'
    //search.placeholder = 'search By Title'
    
//   // search.placeholder = 'search By tittle'
  }
  else {
    mood_search = 'category'
   // search.placeholder = 'search By Category'
  }

  search.placeholder = 'search By '+mood_search
  //console.log(mood_search)
  search.focus()
  search.value='';

}


function search_data(value) {
  let table = ' ';
  for (let i = 0; i < array.length; i++) {

    if (mood_search == 'title') {
      if (array[i].title.includes(value.toLowerCase())) {
        //console.log(i)

        table +=
          `<tr>
<td>${i}</td>
<td>${array[i].title}</td>

<td>${array[i].price}</td>
<td>${array[i].taxes}</td>
<td>${array[i].ads}</td>
<td>${array[i].discount}</td>
<td>${array[i].total}</td>
<td> ${array[i].category}</td>
<td><button onclick="update_data(${i})">update</button></td>

<td><button onclick="delete_data(${i})">Delete</button></td>
</tr>`;
      }






    } else {

      if (array[i].category.includes(value.toLowerCase())) {
        //console.log(i)
        table +=
          `<tr>
  <td>${i}</td>
  <td>${array[i].title}</td>
  
  <td>${array[i].price}</td>
  <td>${array[i].taxes}</td>
  <td>${array[i].ads}</td>
  <td>${array[i].discount}</td>
  <td>${array[i].total}</td>
  <td> ${array[i].category}</td>
  <td><button onclick="update_data(${i})">update</button></td>
  
  <td><button onclick="delete_data(${i})">Delete</button></td>
  </tr>`
      }



    }

    document.getElementById('tbody').innerHTML = table
    
  }


}








