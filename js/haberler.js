// Hafta 4 - DOM ve click olayı: haber ayrıntılarını açıp kapatma.
const haberDugmeleri = document.querySelectorAll(".haber-detay-buton");

haberDugmeleri.forEach(function (dugme) {
    dugme.addEventListener("click", function () {
        const detay = document.getElementById(dugme.getAttribute("aria-controls"));
        if (detay.hidden === true) {
            detay.hidden = false;
            dugme.textContent = "Daha Az Göster";
            dugme.setAttribute("aria-expanded", "true");
        } else {
            detay.hidden = true;
            dugme.textContent = "Devamını Oku";
            dugme.setAttribute("aria-expanded", "false");
        }
    });
});
