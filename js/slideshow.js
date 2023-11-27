const slideshowContainer = document.getElementById('slideshow-container');
const images = document.querySelectorAll('.slideshow-images');
const leftArrow = document.getElementById('slideshow-btn-left');
const rightArrow = document.getElementById('slideshow-btn-right');
const slideshowImage = document.getElementById('slideshow-img');
const closingTag = document.getElementById('close-tag-slideshow');

let arrayIndex = 0;


leftArrow.addEventListener("click", moveLeft);
rightArrow.addEventListener("click", moveRight);
closingTag.addEventListener("click", closeSlideshow);
images.forEach(img => {
    img.addEventListener("click", showImage)
});

// visar slideshown och den bild som användaren klickat på
function showImage(e) {
    slideshowContainer.classList.remove('display-none');
    const imagesArray = Object.values(images);
    arrayIndex = imagesArray.indexOf(e.target);
    slideshowImage.src = images[imagesArray.indexOf(e.target)].src;
}

// visar aktuell bild
function switchImage(i) {
    arrayIndex = i;
    slideshowImage.src = images[i].src;
}

// byter till föregående bild
function moveLeft() {
    arrayIndex--;
    if (arrayIndex < 0) arrayIndex = images.length - 1;
    switchImage(arrayIndex);
}

// byter till nästa bild 
function moveRight() {
    arrayIndex++;
    if (arrayIndex > images.length - 1) arrayIndex = 0;
    switchImage(arrayIndex);
}

// stänger slideshown
function closeSlideshow() {
    slideshowContainer.classList.add('display-none');
}