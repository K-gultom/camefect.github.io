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
        case 'cool':
            video.style.filter = 'contrast(1.2) brightness(1.1) hue-rotate(200deg)';
            break;
        case 'warm':
            video.style.filter = 'contrast(1.3) brightness(1.1) hue-rotate(-120deg)';
            break;
        case 'gradient':
            video.style.filter = 'contrast(1.2) saturate(1.5) hue-rotate(90deg)';
            break;
        default:
            video.style.filter = 'none';
            break;
    }
}

function updateFilters() {
    const brightness = document.getElementById('brightness-slider').value;
    const contrast = document.getElementById('contrast-slider').value;
    const saturate = document.getElementById('saturate-slider').value;

    const red = document.getElementById('red-slider').value;
    const green = document.getElementById('green-slider').value;
    const blue = document.getElementById('blue-slider').value;

    const video = document.getElementById('webcam');
    const overlay = document.getElementById('color-overlay'); // Overlay RGB

    // Terapkan efek brightness, contrast, dan saturate
    video.style.filter = `
        brightness(${brightness}) 
        contrast(${contrast}) 
        saturate(${saturate})
    `;

    // Terapkan overlay warna RGB tanpa invert
    overlay.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    overlay.style.opacity = "0.3"; // Transparansi efek RGB
}
function capturePhoto() {
    const video = document.getElementById('webcam');
    const canvas = document.getElementById('photoCanvas');
    const context = canvas.getContext('2d');

    // Atur ukuran canvas sesuai dengan video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Terapkan efek filter dari video ke canvas
    context.filter = video.style.filter;

    // Gambar frame dari video ke dalam canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Ambil nilai slider RGB
    const red = document.getElementById("red-slider").value;
    const green = document.getElementById("green-slider").value;
    const blue = document.getElementById("blue-slider").value;

    // Terapkan warna RGB dengan overlay transparan ke gambar di canvas
    context.fillStyle = `rgba(${red}, ${green}, ${blue}, 0.3)`; // Alpha 0.3 agar efek warna terlihat
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Tambahkan stiker jika ada
    const stickers = document.querySelectorAll('.sticker');
    stickers.forEach(sticker => {
        const img = new Image();
        img.src = sticker.src;
        img.onload = () => {
            context.drawImage(img, parseInt(sticker.style.left), parseInt(sticker.style.top), 80, 80);
        };
    });

    // Tampilkan tombol download foto
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.href = canvas.toDataURL('image/png');
    downloadLink.classList.remove('d-none');
}



function resetAll() {
    // Reset efek ke normal
    applyEffect('none');

    // Reset slider ke nilai awal
    document.getElementById("brightness-slider").value = 1;
    document.getElementById("contrast-slider").value = 1;
    document.getElementById("saturate-slider").value = 1;
    document.getElementById("red-slider").value = 255;
    document.getElementById("green-slider").value = 255;
    document.getElementById("blue-slider").value = 255;

    // Panggil fungsi updateFilters untuk menerapkan nilai default
    updateFilters();

    // Hapus foto yang sudah diambil di canvas
    let canvas = document.getElementById("photoCanvas");
    let context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Reset overlay warna RGB ke transparan
    document.getElementById('color-overlay').style.backgroundColor = "transparent";

    // Sembunyikan tombol download jika ada
    document.getElementById("downloadLink").classList.add("d-none");
}
