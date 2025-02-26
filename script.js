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
        case 'blur':
            video.style.filter = 'blur(5px)';
            break;
        case 'hue-rotate':
            video.style.filter = 'hue-rotate(90deg)';
            break;
        case 'brightness':
            video.style.filter = 'brightness(1.5)';
            break;
        case 'contrast':
            video.style.filter = 'contrast(200%)';
            break;
        case 'saturate':
            video.style.filter = 'saturate(2)';
            break;
        case 'opacity':
            video.style.filter = 'opacity(0.5)';
            break;
        default:
            video.style.filter = 'none';
    }
}
