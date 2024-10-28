let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('create');
let searchByTitle = document.getElementById('searchByTitle');
let searchByCategory = document.getElementById('searchByCategory');
let mood = 'create';
let tmp;


// get total


function getTotal(){
    if(price.value != ''){
        total.innerText = `${(+price.value + +taxes.value + +ads.value) - +discount.value}`;
        total.style.background = '#070'
    }else{
        total.innerText = '';
        total.style.background = '#a10500'
    }
}

// create product

let dataPro;
if(localStorage.product != null){
dataPro = JSON.parse( localStorage.product )
}else{
    dataPro = [];
}

create.onclick = function(){
    if(title.value != '' && price.value != '' && category.value != '' && count.value <= 100){
        let newPro = {
            title:title.value,
            price:price.value,
            taxes:taxes.value,
            ads:ads.value,
            discount:discount.value,
            total:total.innerText,
            count:count.value,
            category:category.value,
        }

        if(mood === 'create'){
            if(newPro.count > 1){
                for(let i = 0;i < newPro.count;i++){
                    dataPro.push(newPro);
                }
            }else{
                dataPro.push(newPro);
            }
        }else{
            dataPro[tmp] = newPro;
            mood = 'create';
            create.innerHTML = `create`;
            count.style.display = 'block';
        }
        

        localStorage.setItem('product',JSON.stringify(dataPro));
        total.style.background = '#a10500'
        
    
        clear();
        showData();
        getCount();
    }
}
showData();
function clear(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    category.value = '';
    count.value = '';
    discount.value = '';
    total.innerHTML = '';
}

function showData(){
    let table = '';
    for(i=0;i<dataPro.length;i++){
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">Update</button></td>
                <td><button onclick="deleteElement(${i})" id="delete">Delete</button></td>
            </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">delete All (${dataPro.length})</button>
        `
    }else{
        btnDelete.innerHTML = ``;
    }
}

// delete elements

function deleteElement(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

function deleteAll(){
    dataPro = [];
    localStorage.clear();
    showData();
}

function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    getTotal();
    count.style.display = 'none';
    create.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    title.focus();
}

//search
let searchMood = 'title';

function getSearchMood(id){
    let search = document.getElementById('search');
    if(id == 'searchByTitle'){
        searchMood = 'title';
        search.placeholder = 'Search By Title';
    }else{
        searchMood = 'category';
        search.placeholder = 'Search By Category';
    }
    search.focus();
    search.value = '';
    showData();
}

function searchData(value){
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        if (searchMood == 'title') {
            if(dataPro[i].title.includes(value)){
                table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">Update</button></td>
                <td><button onclick="deleteElement(${i})" id="delete">Delete</button></td>
            </tr>
            `;
            }
        }else{
            if(dataPro[i].category.includes(value)){
                table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">Update</button></td>
                <td><button onclick="deleteElement(${i})" id="delete">Delete</button></td>
            </tr>
            `;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
onload = ()=>{
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

document.getElementById('update').onclick = ()=>{
    scrollY = 0;
}