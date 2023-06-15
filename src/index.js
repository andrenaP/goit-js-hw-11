import axios from 'axios';
import SimpleLightbox from "simplelightbox";
import Notiflix from 'notiflix';


const URL ="https://pixabay.com/api/";
const KEY ="37324716-561554bcb566b8f1f5945e5c9";
async function get_img(name_serch){
    return await  axios.get(`${URL}?key=${KEY}&q=${name_serch}`)
  }

 get_img('cat').then(users => console.log(users));


