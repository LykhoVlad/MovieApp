import templ from './template.html';
import templstyle from './template.css';
import getSlider from '../slider/slider';


const idSession = localStorage.getItem('id-session');
const idAccount = localStorage.getItem('id-account');
var getGenres={};
var inFavorites = {};
export default function getData(type, page){
// VERIFICATION SESSION ID START
  if(idSession){
    
    $.ajax({
      method:'GET',
      url: 'https://api.themoviedb.org/3/account/' + idAccount + '/favorite/movies?api_key=a695f6fc2d1d96589625ca90c846019f&session_id=' + idSession + '&language=en-US&sort_by=created_at.asc&page=1',
    success:(data)=>{
        const films = data.results;
       $.each(films, (i,post) => {
          inFavorites[post.id] = true;
          });
      },
      error:function(){
        alert('The request failed');
      }
    });
  }
// VERIFICATION SESSION ID END
// GET FILMS GENRES START
  $.ajax({
    method:'GET',
    url: 'https://api.themoviedb.org/3/genre/movie/list?api_key=a695f6fc2d1d96589625ca90c846019f&language=en-US',
  success:(data)=>{
      const genres = data.genres;
            $.each(genres, function () {
              getGenres[$(this)[0].id + ''] = $(this)[0].name;
           });
      },
      error:function(){
        alert('The request failed');
      }
  });
// GET FILMS GENRES END
// GET DATA AND CREATE PAGE START
      $.ajax({
          method:'GET',
          url: 'https://api.themoviedb.org/3/movie/' + type +'?api_key=a695f6fc2d1d96589625ca90c846019f&language=en-US&page=' + page,
        success:(data)=>{
         if(page==1){
           $('#chooseMovie').fadeOut();
          $('#movie').remove();
          $('<div></div>').appendTo('#films').attr('id','movie').addClass('container');
          $('<div></div>').appendTo('#movie').attr('id','filmsContainer').addClass('row');
          $('<submit></submit>').appendTo('#movie').addClass('moreFilms').attr('data-current-page', page).attr('data-type', type);
          $('<img src="https://v1.iconsearch.ru/uploads/icons/bnw/128x128/action.png" alt="addMore"></img>').appendTo('.moreFilms').addClass('frame');
          $('<img src="https://v1.iconsearch.ru/uploads/icons/humano2/128x128/old-go-down.png" alt="addMore"></img>').appendTo('.moreFilms').addClass('arrow');
          } ;
            const films = data.results;
           $.each(films, (i,post) => {
              if(inFavorites[post.id]){
                post.inFavorites = true;
              }
                  createCard(post);
              });
          },
          error:function(){
            alert('The request failed');
          }
      }); 
    }
// GET DATA AND CREATE PAGE END
// GET DATA AND CREATE FAVORITE PAGE START
  function getFavorites(idSession, idAccount){
    $.ajax({
        method:'GET',
        url: 'https://api.themoviedb.org/3/account/' + idAccount + '/favorite/movies?api_key=a695f6fc2d1d96589625ca90c846019f&session_id=' + idSession + '&language=en-US&sort_by=created_at.asc&page=1',
      success:(data)=>{
      
         $('#chooseMovie').fadeOut();
        $('#movie').remove();
        $('<div></div>').appendTo('#films').attr('id','movie').addClass('container');
        $('<div></div>').appendTo('#movie').attr('id','filmsContainer').addClass('row')
          const films = data.results;
         $.each(films, (i,post) => {
                createCard(post);
            });
        },
        error:function(){
          alert('The request failed');
        }
    });
};
// GET DATA AND CREATE FAVORITE PAGE END
// POST DATA IN FAVORITE PAGE START
 function postFavorites(idAccount, idMovie, idSession){
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.themoviedb.org/3/account/" + idAccount + "/favorite?api_key=a695f6fc2d1d96589625ca90c846019f&session_id=" + idSession,
    "method": "POST",
    "headers": {
      "content-type": "application/json;charset=utf-8"
    },
    "processData": false,
    "data": "{\"media_type\":\"movie\",\"media_id\": "+idMovie+",\"favorite\":true}"
  }
  
  $.ajax(settings)
  .done(function (response) {
  });
 }
// POST DATA IN FAVORITE PAGE END

// CREATE MUSIC CARD START
  const createCard = (post) => {
    const getRait = post.vote_average;
    const rait= getRait.toFixed(1);
    const imgAdress = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + post.poster_path;
     const clonedElement = $(templ)
        .prop("id", post.id)
         .appendTo("#filmsContainer");
      
      clonedElement.find(".film-poster")
         .prop("src", imgAdress);
      
      clonedElement.find(".film-title")
         .text(post.original_title);
      
         var genresName = '';
         $.each(post.genre_ids, function(){
          genresName =  genresName + ' ' + getGenres[$(this)[0]]; 
         })
         
      clonedElement.find(".genre")
              .text(genresName);

      clonedElement.find(".popup")
         .prop("id", post.id);

     
        if(post.inFavorites){
          clonedElement.find(".addToMyFavorites")
            .prop("id", post.id)
            .addClass('doneFavorites');
        }
        else{
          clonedElement.find(".addToMyFavorites")
            .prop("id", post.id);
        }
     
        clonedElement.find(".raiting")
        .text(rait);

      clonedElement.find("#info-btn")
         .prop("id", post.imdb_id);
     
  };
// CREATE MUSIC CARD END
// EVENT ON CLICK - OPEN HOME PAGE - START
  $('#home').click(function(event){
    event.preventDefault();
    $('#sliderShow').css('display','block');
    getData('popular', 1);
  });
// EVENT ON CLICK - OPEN HOME PAGE - END
// EVENT ON CLICK - OPEN TOP FILMS PAGE - START
  $('#top').click(function(event){
    event.preventDefault();
    $('#sliderShow').css('display','none');
    getData('top_rated', 1);
  });
// EVENT ON CLICK - OPEN TOP FILMS PAGE - END
// EVENT ON CLICK - ADD MORE FILMS - START
  $(document).on('click','.moreFilms',function(event){
    let page=+$(this).attr('data-current-page')+1;
    let type=$(this).attr('data-type');
    getData(type, page);
    $(this).attr('data-current-page', page);
  });
// EVENT ON CLICK - ADD MORE FILMS - END
// EVENT ON CLICK - ADD TO MY FAVORITES FILMS - START
  $(document).on('click','.addToMyFavorites', function(){
    let idMovie = $(this).attr('id');
    if($(this).hasClass('doneFavorites')){
      $(this).remove();
    } else{
      postFavorites(idAccount,idMovie,idSession);
      $(this).addClass('doneFavorites');
    };
  });
// EVENT ON CLICK - ADD TO MY FAVORITES FILMS - END
// EVENT ON CLICK - OPEN FAVORITES PAGE - START
  $('#favorites').click(function(event){
    event.preventDefault();
    getFavorites(idSession, idAccount);
})
// EVENT ON CLICK - OPEN FAVORITES PAGE - END