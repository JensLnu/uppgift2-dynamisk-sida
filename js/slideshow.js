const images = document.querySelectorAll('.slideshow-images');

const imagesArray = Object.values(images);
console.log(imagesArray)

const leftArrow = document.getElementById('slideshow-btn-left');
const rightArrow = document.getElementById('slideshow-btn-right');

let slideshowImage = document.getElementById('slideshow-img');
let arrayIndex = 0;
console.log(typeof images)
console.log(images)

images.forEach(img => {
    img.addEventListener("click", showImage)
});

leftArrow.addEventListener("click", moveLeft);
rightArrow.addEventListener("click", moveRight);


function showImage(e) {
    console.log('start showImage');
    // console.log(e.target);
    // console.log(imagesArray.indexOf(e.target));
    if (typeof e ==  'number') {
        console.log('inne i showImage if-sats')
        arrayIndex = e;
        slideshowImage.src = images[e].src;
    } else {
        console.log('inne i showImage Else')
        arrayIndex = imagesArray.indexOf(e.target);
        slideshowImage.src = images[imagesArray.indexOf(e.target)].src;
    }
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