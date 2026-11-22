// Hafta 4 - Slayttaki beğeni örneğinin SpaceLog'a uyarlanması.
let begeni = 0;
let begenildi = false;
const dugme = document.querySelector("#uydu-begen");
const yazi = document.querySelector("#uydu-begeni-sayisi");

dugme.addEventListener("click", function () {
    if (begenildi === false) {
        begeni = begeni + 1;
        begenildi = true;
        dugme.textContent = "♥ Beğendin";
    } else {
        begeni = begeni - 1;
        begenildi = false;
        dugme.textContent = "♡ Beğen";
    }
    yazi.textContent = begeni + " beğeni";
});
