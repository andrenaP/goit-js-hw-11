import axios from 'axios';
import SimpleLightbox from "simplelightbox";
import Notiflix from 'notiflix';
import "simplelightbox/dist/simple-lightbox.min.css";
import ApiServiceClass from './js/get_img'
var throttle = require('lodash.throttle');
const ApiService= new ApiServiceClass();

const form = document.forms[0];
const submit_button = form.querySelector('button[type="submit"]');
const input_text= form.querySelector('input[type="text"]');
// const load_more=document.querySelector(".load-more");
const gallery=document.querySelector(".gallery");
let simpleLightBox;

submit_button.addEventListener('click', OnSubmit)
// load_more.addEventListener('click', OnLoad)

window.onscroll = function(ev) {
  if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight) {
    do_it()
  }
};

const lightbox = new SimpleLightbox('.gallery .photo-card', {
  caption: true,
  captionsData: 'alt',
  captionDelay: 250,
});


// disbtn(load_more,false)
input_text.addEventListener("input",throttle((event) => {disbtn(submit_button,false)}),100);

function OnLoad(event){
  event.preventDefault();
  do_it();
}

function OnSubmit(event){
  event.preventDefault();
  if (input_text.value.trim()==="")
  {Notiflix.Notify.failure('The search string cannot be empty. Please specify your search query.');
return;}
  
  clearAll();
  ApiService.ResetPage();
  do_it();
  disbtn(submit_button,true)
  // disbtn(load_more,false)


}


async function do_it()
{
  if (simpleLightBox)
  simpleLightBox.destroy();
  //simpleLightBox.refresh();
  try{
  ApiService.query=input_text.value;
  const info=await ApiService.fetchArticles()
 
    
  
   console.log(info);
   if (gallery.innerHTML ==="")
   Notiflix.Notify.success(`Hooray! We found ${info.data.totalHits} images.`);
  createHTML(info.data.hits);
}
catch(e){
  Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
  simpleLightBox = new SimpleLightbox('.gallery a').refresh();
  window.onscroll=null;
}
}
function createHTML(data){
  console.log(Object.assign(data));
  const readyHtml = Object.assign(data).map((c) => 
  To_Html(c)
  )
  .join("");
  gallery.insertAdjacentHTML('beforeend', readyHtml);
  simpleLightBox = new SimpleLightbox('.gallery a').refresh();
  const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 1,
    behavior: "smooth",
  });
}
function To_Html(c){

 return `<a class="photo-card" href=${c.largeImageURL}>
  <img src="${c.webformatURL}" alt="${c.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${c.likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${c.views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${c.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${c.downloads}</b>
    </p>
  </div>
</a>`
}

function clearAll() {
  gallery.innerHTML = '';
};



function disbtn(but,e) { 
  if ( e == true ) {
    but.setAttribute("disabled", "disabled");
  } else {
    but.removeAttribute("disabled");
  }    
}

