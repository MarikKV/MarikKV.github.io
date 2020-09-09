new WOW().init();

const whatYouGet = document.querySelector('#what_you_get');
const whatYouGetOption1 = document.querySelector('#what_you_get_1');
const whatYouGetOption2 = document.querySelector('#what_you_get_2');
const whatYouGetOption3 = document.querySelector('#what_you_get_3');

function changeImage(block, image, e){
    block.innerHTML = `<img src="images/${image}" class="wow bounceInRight" alt="">`
}

whatYouGetOption1.onmouseover = () => changeImage(whatYouGet, 'what_you_get1.svg')
whatYouGetOption2.onmouseover = () => changeImage(whatYouGet, 'what_you_get2.svg')
whatYouGetOption3.onmouseover = () => changeImage(whatYouGet, 'what_you_get3.svg')
