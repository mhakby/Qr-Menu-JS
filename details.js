import { menu } from "./db.js";
import { calculatePrice } from "./helpers.js";

// HTML'de arayüzü göndereceğimiz yer
const outlet = document.getElementById("outlet");

const searchParams = new URLSearchParams(window.location.search);
const paramId = searchParams.get("id");

// menü içerisinden id'sini bildiğimiz elemana erişme
const product = menu.find((item) => item.id == paramId);

// bulduğumuz ürüne göre arayüzü ekrana basma
outlet.innerHTML = `
      <div class = "d-flex justify-content-between align-items-center"> 
        <a href="/">
            <i class="bi bi-house-fill fs-1"></i>
        </a>
        <div class = "d-flex gap-1 mt-2">
            <a href="/" role= "button"  id="category">
             ${product.category}
            </a>
            <p>/</p>
            <a>
                ${product.title.toLocaleLowerCase()}
            </a>
        </div>
      </div>
      <h1 class="product-title text-center my-3 p-2 shadow rounded-3 text-dark">${
        product.title
      }</h1>
      <div
        class="d-flex flex-column align-items-center justify-content-between"
      >
        <img
          class="img-fluid rounded shadow-lg detail-img"
          src="${product.img}"
        />
      </div>
      <h3 class="price-title">Ürünün Fiyatı: <span class="text-success"> &#8378; ${calculatePrice(
        product.price
      )}</span></h3>
      <p class="lead detail-desc">
        ${product.desc}
      </p>
`;
