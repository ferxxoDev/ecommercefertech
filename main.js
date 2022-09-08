const Products = [
    { id: 1, name: 'MacBook', price: 200, brand: 'Apple', type: 1, img: '/img/laptop-apple-macbook.png', stock: 5 },
    { id: 2, name: 'VivoBook', price: 250, brand: 'Asus', type: 1, img: '/img/laptop-asus-vivo-book.png', stock: 5 },
    { id: 3, name: 'Nitro i5', price: 750, brand: 'Acer', type: 1, img: '/img/laptop-acer-nitro.png', stock: 5 },
    { id: 4, name: 'Laptop gamer', price: 1250, brand: 'Razer', type: 1, img: '/img/laptop-razer.png', stock: 5 },

    { id: 5, name: 'Mouse Wireless', price: 15, brand: 'Logitech', type: 2, img: '/img/mouse-logitech.png', stock: 5 },
    { id: 6, name: 'Mouse Wireless Pro', price: 25, brand: 'Logitech', type: 2, img: '/img/mouse-logitech-2.png', stock: 5 },
    { id: 7, name: 'Mouse Wireless conford', price: 20, brand: 'Logitech', type: 2, img: '/img/mouse-logitech-3.png', stock: 5 },
    { id: 8, name: 'Mouse gamer', price: 20, brand: 'Razer', type: 2, img: '/img/mouse-razer.png', stock: 5 },

    { id: 9, name: 'CPU i3 8th Gen', price: 500, brand: 'HP', type: 3, img: '/img/cpu-hp.png', stock: 5 },
    { id: 10, name: 'CPU i5 9th Gen', price: 750, brand: 'Asus', type: 3, img: '/img/cpu-asus.png', stock: 5 },
    { id: 11, name: 'CPU Gamer i7 11th Gen', price: 900, brand: 'Alienware', type: 3, img: '/img/cpu-gamer-p.png', stock: 5 },
    { id: 12, name: 'CPU Gamer i7 12th Gen', price: 900, brand: 'ROG', type: 3, img: '/img/cpu-rog.png', stock: 5 },

    { id: 13, name: 'Audifonos Pro', price: 50, brand: 'Panasonic', type: 5, img: '/img/audifonos-panasonic.png', stock: 5 },
    { id: 14, name: 'Audifonos Lite', price: 15, brand: 'Skull Candy', type: 5, img: '/img/audifonos-skullcandy.png', stock: 5 },
    { id: 15, name: 'Audifonos', price: 20, brand: 'Sony', type: 5, img: '/img/audifonos-sony.png', stock: 5 },
    { id: 16, name: 'Audifonos Premium', price: 2900, brand: 'Focal', type: 5, img: '/img/audifonos-caros.png', stock: 5 },

    { id: 17, name: 'Teclado convencional', price: 12, brand: 'Amazon', type: 6, img: '/img/teclado-amazon.png', stock: 5 },
    { id: 18, name: 'Teclado Apx', price: 20, brand: 'SteelSeries', type: 6, img: '/img/teclado-apex.png', stock: 5 },
    { id: 19, name: 'Teclado RGB', price: 20, brand: 'Sony', type: 6, img: '/img/teclado-rgb.png', stock: 5 },
    { id: 20, name: 'Teclado Wireless Mecanico', price: 20, brand: 'Razer', type: 6, img: '/img/teclado-wireless.png', stock: 5 },
]

const Categories = [
    { id: 1, name: 'laptop' },
    { id: 2, name: 'mouse' },
    { id: 3, name: 'desktop' },
    { id: 5, name: 'headphone' },
    { id: 6, name: 'keyboard' },
    { id: 7, name: 'all' },
]


// --------------------------------FILTRO------------------------------

const ProductContainer = document.getElementById('productsContainer')
const CategoriesContainer = document.getElementById('categoriesContainer')



const printProducts = (type) => {
    let ProductList = ''
    let filterProducts = Products
    // let showAll = Products

    console.log(type);
    if (type === 1 || type === 2 || type === 3 || type === 4 || type === 5 || type === 6){
        filterProducts = filterProducts.filter(prod => { return prod.type === type })

    }
    

    filterProducts.forEach(prod => {
        let item = `
            <div class="card-product card-color-t" id="${prod.id}">
                <img class="img-product" src="${prod.img}" alt="">
                <div class="card-data">
                    <h3 class="name-product">${prod.name}</h3>
                    <p class="brand-product">${prod.brand}</p>
                    <p class="stock-product">Stock: ${prod.stock}</p>
                    <button class="btn btn-card but-bot">
                        <i class='bx bx-cart' id="prod${prod.id}"></i>
                        <p class="price-product">$${prod.price}</p>
                    </button>
                </div>
            </div>
            `
        ProductList += item
    });
    ProductContainer.innerHTML = ProductList
}

printProducts()


CategoriesContainer.addEventListener('click', e => {
    if (e.target.classList.contains('bxs-hot')) {
        printProducts()
    }
})

CategoriesContainer.addEventListener('click', evt => {

    if (evt.target.tagName === 'I') {
        printProducts(Number.parseInt(evt.target.id))
    }
})

// ---------------------------------CART---------------------------------

let cart = {}
const iconCart = document.querySelector('#icon-cart')
const contentCart = document.querySelector('#contentCart')
const productContent = document.querySelector('#productsContainer')
const contentCartBody = document.querySelector('.content-card_body')
const contentCartTotal = document.querySelector('.content-cart_total')

printTotalCart()
// ----------Show Content Cart 
iconCart.addEventListener('click', e => {
    contentCart.classList.toggle('content-cart-show')
});

// --------------Print in Cart

function printProductCart() {
    
    let html = "";

    const arrayCart = Object.values(cart);
    
    arrayCart.forEach(({ id, name, price, brand, img, amount, stock }) => {
    

        html += `
            <div class="content-cart_product">
                <div class="content-cart_product_img">
                    <img src="${img}" alt="">
                </div>
                <h4 class="content-cart_product_name">${name}</h4>
                <h5 class="content-cart_product_brand">${brand}</h5>
                <h5 class="content-cart_product_price">$${price}</h5>
                <div class="content-cart_product_options" id="${id}">
                    <i class='bx bx-chevron-down'></i>
                    <span class="amount" id="amount">${amount}</span>
                    <i class='bx bx-chevron-up'></i>
                    <i class='bx bx-trash-alt'></i>
                </div>
            </div>
            
        `; 
    });

    contentCartBody.innerHTML = html;
    

}

productContent.addEventListener('click', evt => {

    if (evt.target.classList.contains('bx-cart') || evt.target.classList.contains('price-product')) {
        const idProduct = +evt.target.parentElement.parentElement.parentElement.id;

        const findProduct = Products.find((Products) => Products.id === idProduct)

        if (cart[idProduct]) {
            cart[idProduct].amount++;
        } else {
            cart[idProduct] = findProduct;
            cart[idProduct].amount = 1;
        }
    }
    printProductCart()
    printTotalCart()
})

contentCartBody.addEventListener("click", (e) => {

    if (e.target.classList.contains("bx-chevron-down")) {
        const idProduct = +e.target.parentElement.id;
        

        if(cart[idProduct].amount < 1 ){
            return alert("No disponible") 
        }
        cart[idProduct].amount--;
    }

    if (e.target.classList.contains("bx-chevron-up")) {
        const idProduct = +e.target.parentElement.id;
        
        if(cart[idProduct].amount > cart[idProduct].stock-1){
            return alert("No disponible") 
        } 
        cart[idProduct].amount++;
    }       

    if (e.target.classList.contains("bx-trash-alt")) {
        const idProduct = +e.target.parentElement.id;
        delete cart[idProduct];
    }
    printProductCart(contentCartBody)
    printTotalCart()
})



function printTotalCart() {
    let total = 0;
    htmlT = '';
    const arrayCart = Object.values(cart);
    
    
        
    arrayCart.forEach( p => {
        
        if(p.amount > 0 && p.amount <= p.stock) {
            total += p.amount * p.price
            
        } else{
            alert("No disponible")
            
        } 
    }); 
    contentCartTotal.innerHTML = `Total: $${total}`;
    
    let acc = 0;

    arrayCart.forEach(( {amount}) => {
        acc+= amount;
        
    });
    console.log(acc);
    iconCart.innerHTML = `${acc}`
}


    
    
    // contentCartTotal.innerHTML = "hola";


// --------------------------------H1 DINAMIC-----------------------------

// const dinamicTitle = document.querySelector('.the-title').textContent;

// dinamicTitle.addEventListener('click', ev => {
//     console.log(ev.target.parentElement);
// })