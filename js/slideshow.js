const slideshowContainer = document.getElementById('slideshow-container');
const images = document.querySelectorAll('.slideshow-images');
const leftArrow = document.getElementById('slideshow-btn-left');
const rightArrow = document.getElementById('slideshow-btn-right');
const slideshowImage = document.getElementById('slideshow-img');
const closingTag = document.getElementById('close-tag-slideshow');

let arrayIndex = 0;

images.forEach(img => {
    img.addEventListener("click", showImageFirstTime)
});

leftArrow.addEventListener("click", moveLeft);
rightArrow.addEventListener("click", moveRight);
closingTag.addEventListener("click", closeSlideshow);

function showImageFirstTime(e) {
    console.log('start showImageFirstTime');

    slideshowContainer.classList.remove('display-none');
    const imagesArray = Object.values(images);
    arrayIndex = imagesArray.indexOf(e.target);
    slideshowImage.src = images[imagesArray.indexOf(e.target)].src;
}

function showImage(i) {
    console.log('start showImage');
    arrayIndex = i;
    slideshowImage.src = images[i].src;
}

function moveLeft() {
    console.log('start moveLeft');
    arrayIndex--;
    if (arrayIndex < 0) arrayIndex = images.length - 1;
    showImage(arrayIndex);
}

function moveRight() {
    console.log('start moveRight');
    arrayIndex++;
    if (arrayIndex > images.length - 1) arrayIndex = 0;
    showImage(arrayIndex);
}

function closeSlideshow() {
    console.log('start closeSlideshow');
    slideshowContainer.classList.add('display-none');
}