import axios from 'axios';
import SimpleLightbox from "simplelightbox";
import Notiflix from 'notiflix';

import ApiServiceClass from './js/get_img'

var throttle = require('lodash.throttle');
const ApiService= new ApiServiceClass();

const form = document.forms[0];
const submit_button = form.querySelector('button[type="submit"]');
const input_text= form.querySelector('input[type="text"]');
const load_more=document.querySelector(".load-more");
const gallery=document.querySelector(".gallery");

submit_button.addEventListener('click', OnSubmit)
load_more.addEventListener('click', OnLoad)



disbtn(load_more,false)
input_text.addEventListener("input",throttle((event) => {disbtn(submit_button,false)}),100);

function OnLoad(event){
  event.preventDefault();
  do_it(input_text.value);
}

function OnSubmit(event){
  event.preventDefault();
  clearAll();
  ApiService.ResetPage();
  do_it(input_text.value);
  disbtn(submit_button,true)
  disbtn(load_more,false)

}

async function do_it(call_n)
{
  
  ApiService.query=call_n;
  const info=await ApiService.fetchArticles()
  // console.log(info);
  createHTML(info.data.hits);

}
function createHTML(data){
  console.log(Object.assign(data));
  const readyHtml = Object.assign(data).map((c) => 
  To_Html(c)
  )
  .join("");
  gallery.insertAdjacentHTML('beforeend', readyHtml);
}
function To_Html(c){

 return `<a class="photo-card">
  <img src="${c.largeImageURL}" alt="${c.tags}" loading="lazy" />
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
const lightbox = new SimpleLightbox('.gallery a', {
  caption: true,
  captionsData: 'alt',
  captionDelay: 250,
});