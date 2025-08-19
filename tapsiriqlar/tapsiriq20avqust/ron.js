let cartCount = 0;
const cartCountElement = document.getElementById('cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItemsElement = document.getElementById('cart-items');
const cartBtn = document.getElementById('cart-btn');
const cartDropdown = document.getElementById('cart-dropdown');


let cartItems = [];

addToCartButtons.forEach((button) => {
    button.addEventListener('click', (e) => {

        const productCard = e.target.closest('.card,.mehsullar-card');
        const productName = productCard.querySelector('h3').textContent;
        const productImg = productCard.querySelector('img').src;


        cartItems.push({ name: productName, img: productImg });

        cartCount++;
        cartCountElement.textContent = cartCount;

        updateCartList();
    });
});

function updateCartList() {
    // temizle
    cartItemsElement.innerHTML = "";

    // mehsullari sebete elave elemek
    cartItems.forEach(item => {
        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.alignItems = "center";
        li.style.gap = "10px";

        const img = document.createElement("img");
        img.src = item.img;
        img.style.width = "40px";
        img.style.height = "40px";
        img.style.objectFit = "cover";

        const span = document.createElement("span");
        span.textContent = item.name;

        li.appendChild(img);
        li.appendChild(span);
        cartItemsElement.appendChild(li);
    });
}

// sebet
cartBtn.addEventListener('click', () => {
    cartDropdown.style.display =
        (cartDropdown.style.display === "block") ? "none" : "block";
});


// Slider 

const sliderWrapper = document.querySelector('.slider-wrapper');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;
const cardWidth = 270; // kartın eni + margin

nextBtn.addEventListener('click', () => {
    if (currentIndex < addToCartButtons.length - 1) {
        currentIndex++;
        sliderWrapper.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
});

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        sliderWrapper.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
});




//+++++++++++++++++++++++++++++++++++++
//+++++++++mehsullar+++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++
document.addEventListener("DOMContentLoaded", function() {
    const filterSelect = document.getElementById("filter");
    const cards = document.querySelectorAll(".mehsullar-card");

    filterSelect.addEventListener("change", function() {
        const secilen = this.value;

        cards.forEach(card => {
            const category = card.getAttribute("data-catagory");
            if (secilen === "hamisi" || secilen === category) {
                card.style.display = "block"; 
            } else {
                card.style.display = "none";   
            }
        });
    });
});



// Mobil gorunus
const burgerBtn = document.getElementById('burger-btn');
const mainNav = document.getElementById('main-nav');

if (burgerBtn && mainNav) {
    burgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        mainNav.classList.toggle('mobile-open');
    });

  
    document.addEventListener('click', (e) => {
        if (!mainNav.contains(e.target)) {
            mainNav.classList.remove('mobile-open');
        }
    });


    document.querySelectorAll('.nnav a').forEach(a => {
        a.addEventListener('click', () => mainNav.classList.remove('mobile-open'));
    });
}
