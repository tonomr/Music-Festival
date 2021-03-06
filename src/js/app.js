document.addEventListener("DOMContentLoaded", function () {
  startApp();
});

function startApp() {
  fixedNav();
  createGallery();
  scrollNav();
}

function fixedNav() {
  const bar = document.querySelector(".header");
  const aboutFestival = document.querySelector(".about-festival");
  const body = document.querySelector("body");

  window.addEventListener("scroll", function () {
    if (aboutFestival.getBoundingClientRect().top < 0) {
      bar.classList.add("fixed");
      body.classList.add("body-scroll");
    } else {
      bar.classList.remove("fixed");
      body.classList.remove("body-scroll");
    }
  });
}

function scrollNav() {
  const links = document.querySelectorAll(".nav-main a");
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const sectionScroll = e.target.attributes.href.value;
      const section = document.querySelector(sectionScroll);
      section.scrollIntoView({ behavior: "smooth" });
    });
  });
}

function createGallery() {
  const gallery = document.querySelector(".gallery-images");
  for (let i = 1; i <= 12; i++) {
    const image = document.createElement("picture");
    image.innerHTML = `
        <source srcset="build/img/thumb/${i}.avif" type="image/avif" />
          <source srcset="build/img/thumb/${i}.webp" type="image/webp" />
          <img
            loading="lazy"
            width="200"
            height="300"
            src="build/img/thumb/${i}.jpg"
            alt="vocalist image"
          />
        `;
    image.onclick = function () {
      showImage(i);
    };
    gallery.appendChild(image);
  }
}

function showImage(id) {
  const image = document.createElement("picture");
  image.innerHTML = `
        <source srcset="build/img/big/${id}.avif" type="image/avif" />
          <source srcset="build/img/big/${id}.webp" type="image/webp" />
          <img
            loading="lazy"
            width="200"
            height="300"
            src="build/img/big/${id}.jpg"
            alt="vocalist image"
          />
        `;

  // Create overlay with the img
  const overlay = document.createElement("DIV");
  overlay.appendChild(image);
  overlay.classList.add("overlay");
  overlay.onclick = function () {
    const body = document.querySelector("body");
    body.classList.remove("fix-body");
    overlay.remove();
  };

  // Button to close modal img
  const closeModal = document.createElement("P");
  closeModal.textContent = "X";
  closeModal.classList.add("close-button");
  closeModal.onclick = function () {
    const body = document.querySelector("body");
    body.classList.remove("fix-body");
    overlay.remove();
  };
  overlay.appendChild(closeModal);

  // Add overlay to HTML
  const body = document.querySelector("body");
  body.appendChild(overlay);
  body.classList.add("fix-body");
}
