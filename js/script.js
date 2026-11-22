// Hafta 4 - DOM, olaylar ve canlı roket geri sayımı
const tarihAlani = document.getElementById("firlatma-tarihi");
const baslatButonu = document.getElementById("sayaci-baslat");
const durdurButonu = document.getElementById("sayaci-durdur");
const ornekButonu = document.getElementById("ornek-tarih");
const sifirlaButonu = document.getElementById("sayaci-sifirla");
const mesaj = document.getElementById("sayac-mesaj");
const gun = document.getElementById("gun");
const saat = document.getElementById("saat");
const dakika = document.getElementById("dakika");
const saniye = document.getElementById("saniye");

let zamanlayici = null;
let hedefTarih = null;

function sureyiGoster() {
    const kalan = hedefTarih - new Date();

    if (kalan <= 0) {
        clearInterval(zamanlayici);
        zamanlayici = null;
        gun.textContent = "00";
        saat.textContent = "00";
        dakika.textContent = "00";
        saniye.textContent = "00";
        mesaj.textContent = "Geri sayım tamamlandı!";
        return;
    }

    const toplamSaniye = Math.floor(kalan / 1000);
    const gunSayisi = Math.floor(toplamSaniye / 86400);
    const saatSayisi = Math.floor((toplamSaniye % 86400) / 3600);
    const dakikaSayisi = Math.floor((toplamSaniye % 3600) / 60);
    const saniyeSayisi = toplamSaniye % 60;

    gun.textContent = String(gunSayisi).padStart(2, "0");
    saat.textContent = String(saatSayisi).padStart(2, "0");
    dakika.textContent = String(dakikaSayisi).padStart(2, "0");
    saniye.textContent = String(saniyeSayisi).padStart(2, "0");
}

baslatButonu.addEventListener("click", function () {
    if (!tarihAlani.value) {
        mesaj.textContent = "Lütfen önce bir tarih ve saat seç.";
        return;
    }

    const secilenTarih = new Date(tarihAlani.value);
    if (Number.isNaN(secilenTarih.getTime()) || secilenTarih <= new Date()) {
        mesaj.textContent = "Lütfen gelecekte bir tarih ve saat seç.";
        return;
    }

    clearInterval(zamanlayici);
    hedefTarih = secilenTarih;
    mesaj.textContent = "Örnek fırlatma için geri sayım çalışıyor.";
    sureyiGoster();
    zamanlayici = setInterval(sureyiGoster, 1000);
});

durdurButonu.addEventListener("click", function () {
    clearInterval(zamanlayici);
    zamanlayici = null;
    mesaj.textContent = "Geri sayım durduruldu.";
});

// Örnek tarih: bilgisayarın yerel saatine göre bir saat sonrası.
ornekButonu.addEventListener("click", function () {
    const yarinDegilBirSaatSonra = new Date(Date.now() + 60 * 60 * 1000);
    // datetime-local için YYYY-AA-GGTHH:DD biçiminde yerel tarih oluştur.
    const yil = yarinDegilBirSaatSonra.getFullYear();
    const ay = String(yarinDegilBirSaatSonra.getMonth() + 1).padStart(2, "0");
    const gunDegeri = String(yarinDegilBirSaatSonra.getDate()).padStart(2, "0");
    const saatDegeri = String(yarinDegilBirSaatSonra.getHours()).padStart(2, "0");
    const dakikaDegeri = String(yarinDegilBirSaatSonra.getMinutes()).padStart(2, "0");
    tarihAlani.value = `${yil}-${ay}-${gunDegeri}T${saatDegeri}:${dakikaDegeri}`;
    mesaj.textContent = "Örnek tarih seçildi. Geri Sayımı Başlat butonuna bas.";
});

sifirlaButonu.addEventListener("click", function () {
    clearInterval(zamanlayici);
    zamanlayici = null;
    hedefTarih = null;
    tarihAlani.value = "";
    gun.textContent = "00";
    saat.textContent = "00";
    dakika.textContent = "00";
    saniye.textContent = "00";
    mesaj.textContent = "Sayaç sıfırlandı. Yeni bir tarih seçebilirsin.";
});


// Gerçek görev: 23 Kasım 2026, 11:09 UTC (Türkiye: 14:09).
// Resmî kaynak: Arianespace, VA271 / Amazon Leo LE-04.
const resmiFirlatma = new Date("2026-11-23T11:09:00Z");

// Tarih alanı kullanıcının bilgisayarının saat diliminde gösterilir.
const yil = resmiFirlatma.getFullYear();
const ay = String(resmiFirlatma.getMonth() + 1).padStart(2, "0");
const tarihGun = String(resmiFirlatma.getDate()).padStart(2, "0");
const yerelSaat = String(resmiFirlatma.getHours()).padStart(2, "0");
const yerelDakika = String(resmiFirlatma.getMinutes()).padStart(2, "0");
tarihAlani.value = yil + "-" + ay + "-" + tarihGun + "T" + yerelSaat + ":" + yerelDakika;

if (resmiFirlatma > new Date()) {
    hedefTarih = resmiFirlatma;
    mesaj.textContent = "Ariane 6 – Amazon Leo LE-04 için geri sayım çalışıyor.";
    sureyiGoster();
    zamanlayici = setInterval(sureyiGoster, 1000);
} else {
    mesaj.textContent = "Planlanan fırlatma saati geçti. Güncel takvimi kontrol et veya demo tarihini seç.";
}
