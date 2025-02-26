// Mengakses webcam pengguna
navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
        const video = document.getElementById('webcam');
        video.srcObject = stream;
    })
    .catch(function(err) {
        console.log("Gagal mengakses webcam: ", err);
});

// Fungsi untuk menerapkan efek
function applyEffect(effect) {
    const video = document.getElementById('webcam');
    const sticker = document.getElementById('sticker');

    switch (effect) {
        case 'grayscale':
            video.style.filter = 'grayscale(100%)';
            break;
        case 'sepia':
            video.style.filter = 'sepia(100%)';
            break;
        case 'invert':
            video.style.filter = 'invert(100%)';
            break;
        case 'warp':
            video.style.transform = 'skewX(20deg) rotate(10deg)';
            break;
        case 'big-eye':
            video.style.transform = 'scale(1.2, 1.5)';
            break;
        case 'sticker':
            sticker.src = "https://i.imgur.com/5OqAcRB.png"; // URL gambar stiker
            sticker.classList.remove("d-none");
            break;
        default:
            video.style.filter = 'none';
            video.style.transform = 'none';
            sticker.classList.add("d-none");
    }
}

// Fungsi untuk mengatur slider efek
function adjustBrightness() {
    const slider = document.getElementById('brightness-slider');
    const video = document.getElementById('webcam');
    video.style.filter = `brightness(${slider.value})`;
}

function adjustContrast() {
    const slider = document.getElementById('contrast-slider');
    const video = document.getElementById('webcam');
    video.style.filter = `contrast(${slider.value})`;
}

function adjustSaturate() {
    const slider = document.getElementById('saturate-slider');
    const video = document.getElementById('webcam');
    video.style.filter = `saturate(${slider.value})`;
}
