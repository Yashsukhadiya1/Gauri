let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard'); // Renamed for clarity
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
});
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

let products = [
    { id: 1, name: 'PRODUCT NAME 1', image: 'p1.jpeg', price: 120000 },
    { id: 2, name: 'PRODUCT NAME 2', image: 'p2.jpeg', price: 130000 },
    { id: 3, name: 'PRODUCT NAME 3', image: 'p3.jpeg', price: 140000 },
    { id: 4, name: 'PRODUCT NAME 4', image: 'p4.jpeg', price: 150000 },
    { id: 5, name: 'PRODUCT NAME 5', image: 'p5.jpeg', price: 160000 },
    { id: 6, name: 'PRODUCT NAME 6', image: 'p6.jpeg', price: 170000 },
];

let listCards = [];

function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="${value.image}" />
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onClick="addToCard(${key})">Add to cart</button>
        `;
        list.appendChild(newDiv);
    });
}
initApp();

function addToCard(key) {
    if (listCards[key] == null) {
        listCards[key] = products[key];
        listCards[key].quantity = 1;
    } else {
        listCards[key].quantity++;
    }
    reloadCard();
}

function reloadCard() {
    listCard.innerHTML = ''; // Clear existing content
    let count = 0;
    let totalPrice = 0;

    listCards.forEach((value, key) => {

        if (value != null) { // Check if value is not null
            totalPrice += value.price * value.quantity; // Calculate total price
            count += value.quantity; // Calculate total quantity

            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="${value.image}" /></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onClick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onClick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>
            `;
            listCard.appendChild(newDiv);
        }
    });

    total.innerText = totalPrice.toLocaleString(); // Update total price display
    quantity.innerText = count; // Update quantity display
}

function changeQuantity(key, newQuantity) {
    if (newQuantity == 0) {
        listCards[key] = null; // Remove item if quantity is 0 or less
    } else {
        listCards[key].quantity = newQuantity; // Update quantity
    }
    reloadCard(); // Reload the cart
}
