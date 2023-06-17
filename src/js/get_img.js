import axios from 'axios';
export default class GetApiService{
    constructor(){
        this.searchQuery="";
        this.page=1;
    }
    async fetchArticles(){
        const URL ="https://pixabay.com/api/";
        const KEY ="37324716-561554bcb566b8f1f5945e5c9";
        const result=await  axios.get(`${URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&`);
        this.page+=1;
        console.log(this.page);
        const info=  await result
        return info;
    }
    ResetPage(){
        this.page=1;
    }
    get query(){
        return this.searchQuery;
    }
    set query(NewQuery){
        this.searchQuery=NewQuery;
    }
}





// webformatURL - посилання на маленьке зображення для списку карток.
// largeImageURL - посилання на велике зображення.
// tags - рядок з описом зображення. Підійде для атрибуту alt.
// likes - кількість лайків.
// views - кількість переглядів.
// comments - кількість коментарів.
// downloads - кількість завантажень.