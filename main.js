import { menu, buttonsData } from "./db.js";
import { calculatePrice } from "./helpers.js";

const menuArea = document.getElementById("menu-area");
const buttonsArea = document.getElementById("buttons-area");

// Sayfanın yüklenme olayını izleme;
document.addEventListener(
  "DOMContentLoaded",
  () => renderButtons("all"),
  renderMenuItems(menu)
);

// Butonların tıklanma olayını izleme
buttonsArea.addEventListener("click", searchCategory);

// ekrana menü elemenalarını basar
function renderMenuItems(menuItems) {
  let menuHtml = menuItems.map((item) => {
    return `
        <a href="productDetail.html?id=${
          item.id
        }" id="card" class="d-flex flex-column flex-md-row text-decoration-none text-dark shadow rounded-2">
            <div class="pics">
                <img class="rounded shadow" src=${item.img} />
            </div>
            <div>
                <div class="d-flex justify-content-between">
                    <h5 class="item-title">${item.title}</h5>
                    <p class="text-success text-nowrap item-price">&#8378; ${calculatePrice(
                      item.price
                    )}</p>
                </div>
                <p class="lead item-desc">
                    ${item.desc}
                 </p>
            </div>                      
        </a>`;
  });
  //   diziyi string'e çevirme
  menuHtml = menuHtml.join(" ");
  //  Oluşturduğumuz html'i ekrana bas
  menuArea.innerHTML = menuHtml;
}

// tıklanılan butona göre filter
function searchCategory(e) {
  const category = e.target.dataset.category;
  //   kategoriye göre ürünleri filtreleme
  const filteredMenu = menu.filter((item) => item.category === category);

  if (category === "all") {
    renderMenuItems(menu);
  } else {
    renderMenuItems(filteredMenu);
  }

  // butonları güncelle
  renderButtons(category);
}

// ekrana butonları basacak fonksiyon
function renderButtons(active) {
  // eski butonları kaldırma
  buttonsArea.innerHTML = "";

  // yeni butonlar oluşturma
  buttonsData.forEach((btn) => {
    const buttonEle = document.createElement("button");

    // Butonlara class ekleme
    buttonEle.className = "btn btn-outline-dark filter-btn";

    // İçerisindeki yazıyı değiştirme.
    buttonEle.innerHTML = btn.text;

    // Hangi kategori bilgisi olduğunu buton elementine eklemek
    buttonEle.dataset.category = btn.value;

    // eğer ki aktif kategori ile buton eşleşirse ona farklı class ver
    if (btn.value === active) {
      buttonEle.classList.add("bg-dark", "text-light");
    }

    // HTML'e gönderme
    buttonsArea.appendChild(buttonEle);
  });
}
