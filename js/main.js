let cartIcon = document.querySelector('#cart-icon')
let cart = document.querySelector('.cart')
let closeCart = document.querySelector('#close-cart')

cartIcon.onclick = () => {
    cart.classList.add("active")
};

closeCart.onclick = () => {
    cart.classList.remove("active")
}

//Cart Working
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready()
}

// Making Function
function ready(){
    // remove Item from Cart
    var removeCartButtons = document.getElementsByClassName('cart-remove')
    console.log(removeCartButtons)
    for (var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i]
        button.addEventListener('click' , removeCartItem);
    }

    // update quantity
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    // Add to Cart
    var addCart = document.getElementsByClassName('add-cart')
    for ( var i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClicked);
}

    function buyButtonClicked(){
        alert('Your order is placed')
        var cartContent = document.getElementsByClassName('cart-content')[0]
        while (cartContent.hasChildNodes()){
            cartContent.removeChild(cartContent.firstChild);
        }
        updatetotal();
    }

    // remove Item from Cart
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

// Add to cart 
function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    console.log(title, price, productImg);
    addProductToCart(title, price, productImg);
    updatetotal();
}

function addProductToCart(title, price, productImg){
  
    var cartShopBox = document.createElement("div");
     cartShopBox.classList.add('cart-box');
     var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText === title) {
            alert("You have already added this item to cart");
            return;
        }
    }

    var cartBoxContent = ` 
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class='bx bxs-trash-alt cart-remove' style="color: black;"></i>
    `;
    cartShopBox.innerHTML = cartBoxContent
    cartItems.append(cartShopBox)
    cartShopBox
    .getElementsByClassName('cart-remove')[0]
    .addEventListener('click', removeCartItem)
    cartShopBox
    .getElementsByClassName('cart-quantity')[0]
    .addEventListener('change', quantityChanged)
}   

// quantity changes
function quantityChanged(event){
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal()
}

 // update Total
 function updatetotal(){
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for (var i = 0; i< cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("DT", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
        // if price fyh sarf
        total = Math.round(total * 100) / 100;

        document.getElementsByClassName('total-price')[0].innerText =   total + "DT";
    
 }

 //search 
 function searchProducts() {
    var input, filter, products, productTitles, i, txtValue;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    products = document.getElementsByClassName('product-box');

    for (i = 0; i < products.length; i++) {
        productTitles = products[i].getElementsByClassName('product-title')[0];
        txtValue = productTitles.textContent || productTitles.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            products[i].style.display = '';
        } else {
            products[i].style.display = 'none';
        }
    }
}

//filter by price

function filterByPrice() {
    var minPrice = parseFloat(document.getElementById('minPriceInput').value);
    var maxPrice = parseFloat(document.getElementById('maxPriceInput').value);

    var productBoxes = document.querySelectorAll('.product-box');

    productBoxes.forEach(function (box) {
        var priceElement = box.querySelector('.price');
        var price = parseFloat(priceElement.textContent);

        if ((!isNaN(minPrice) && price < minPrice) || (!isNaN(maxPrice) && price > maxPrice)) {
            box.style.display = 'none';
        } else {
            box.style.display = 'block';
        }
    });
}

//filter products by category
function filterByCategory(category) {
    const productBoxes = document.querySelectorAll('.product-box');

    // Hide all products
    productBoxes.forEach(box => {
        box.style.display = 'none';
    });

    // Show products matching the selected category
    productBoxes.forEach(box => {
        if (box.getAttribute('data-category') === category || category === 'all') {
            box.style.display = 'block';
        }
    });
}

// Product data array
const productsData = [
    {
        name: "5W30",
        category: "Lubrifiant",
        price: "170DT",
        image: "img/image3.webp"
    },
    {
        name: "5W40",
        category: "Lubrifiant",
        price: "145DT",
        image: "img/image1.webp"
    },
    // Add more products as needed
];

// Function to display products in the product display section
function displayProductsInModal() {
    const productDisplay = document.querySelector('.product-display .product-list');
    productDisplay.innerHTML = ''; // Clear existing content

    productsData.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('shop-content');
        productItem.innerHTML = `
            <img src="${product.image}" alt="" class="product-img">
            <div class="product-details">
                <h3>${product.name}</h3>
                <p>Category: ${product.category}</p>
                <p>Price: ${product.price}</p>
                <button onclick="addSelectedProduct('${product.name}', '${product.category}', '${product.price}', '${product.image}')">Add</button>
            </div>
        `;
        productDisplay.appendChild(productItem);
    });

    // Show the product display section
    document.querySelector('.product-display').style.display = 'block';
}

function addSelectedProduct(name, category, price, image) {
    // Create new product box
    const newProductBox = document.createElement('div');
    newProductBox.classList.add('product-box');
    newProductBox.setAttribute('data-category', category);

    // Construct the HTML content for the new product box
    const newProductContent = `
        <img src="${image}" alt="" class="product-img">
        <h2 class="product-title">${name}</h2>
        <span class="price">${price}</span>
        <i class='bx bx-shopping-bag add-cart' style="color: black;"></i>
    `;
    newProductBox.innerHTML = newProductContent;

    // Add the new product box to the shop content
    document.querySelector('.shop-content').appendChild(newProductBox);

    // Close the product display section
    document.querySelector('.product-display').style.display = 'none';
}



let isAdmin = false; // Default user role

function checkUserRole() {
    const addProductButton = document.getElementById('addProductButton');
    if (!isAdmin) {
        addProductButton.style.display = 'none'; // Hide button for non-admin users
    } else {
        addProductButton.style.display = 'block'; // Show button for admin users
    }
}

function toggleUserRole(switcher) {
    isAdmin = switcher.checked; // Toggle user role based on switcher status
    checkUserRole(); // Update visibility of addProductButton
}

document.addEventListener('DOMContentLoaded', checkUserRole);