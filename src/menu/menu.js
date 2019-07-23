import addedMenu from './menu.html'
import menuStyle from './menu.css'
import searchCard from './search.html'

$('#menu').html(addedMenu);
const getGenres={};


export default function searchFilm(searchValue, type, page){
    
    $.ajax({
      method:'GET',
      url: 'https://api.themoviedb.org/3/genre/movie/list?api_key=a695f6fc2d1d96589625ca90c846019f&language=en-US',
    success:(data)=>{
  
        const genres = data.genres;
    
              $.each(genres, function () {
                getGenres[$(this)[0].id + ''] = $(this)[0].name;
              
            });
        }
    });
    
    $.ajax({
        method:'GET',
        url: 'https://api.themoviedb.org/3/' + type + '/movie?api_key=a695f6fc2d1d96589625ca90c846019f&language=en-US&page=' + page + '&include_adult=false&query=' + searchValue,
      success:(data)=>{
        if(page==1){
          $('#movie').remove();
          $('<div></div>').appendTo('#films').attr('id','movie').addClass('container');
          $('<div></div>').appendTo('#movie').attr('id','filmsContainer').addClass('row');
          $('<button>More</button>').appendTo('#movie').addClass('moreResponse').attr('data-current-page', page).attr('data-type', type);
        };
        console.log(data);
          const films = data.results;
         $.each(films, (i,posts) => {
          
                createCard(posts);
      
            })
          // $('#searching').val('');
        }
    }); 
}

$('#search-btn').click(function(){
  let searchValue = $('#searching').val();
  searchFilm(searchValue, 'search', 1);
});

$(document).on('click','.moreResponse',function(event){
  let page=+$(this).attr('data-current-page')+1;
  let type=$(this).attr('data-type');
  let searchValue = $('#searching').val();
  searchFilm(searchValue, type, page);
  $(this).attr('data-current-page', page);
})

const createCard = (posts) => {
  const imgAdress = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + posts.poster_path;
   const clonedElement = $(searchCard)
      .prop("id", posts.id)
       .appendTo("#filmsContainer");
    
    clonedElement.find(".film-poster")
       .prop("src", imgAdress);
    
    clonedElement.find(".film-title")
       .text(posts.original_title);
    
       var genresName = '';
       $.each(posts.genre_ids, function(){
        genresName =  genresName + ' ' + getGenres[$(this)[0]]; 
        
      // console.log(genresName)
       })
       
    clonedElement.find(".genre")
            .text(genresName);

    clonedElement.find(".popup")
       .prop("id", posts.id);

   clonedElement.find(".addToMyFavorites")
      .prop("id", posts.id)
   
      clonedElement.find(".film-likes")
      .prop("id", posts.id)

    clonedElement.find("#info-btn")
       .prop("id", posts.imdb_id)
   
};