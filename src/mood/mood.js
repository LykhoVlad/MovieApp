import moodPage from './mood.html';
import moodStyle from './mood.css';
import Filterizr from 'filterizr'; 
import moodCard from './moodCards.html';

const idSession = localStorage.getItem('id-session');
const idAccount = localStorage.getItem('id-account');
var inFavorites = {};
// OPTIONS FOR FILTERIZR START
const options = {
  animationDuration: 0.5, // in seconds
  callbacks: { 
    onFilteringStart: function() { },
    onFilteringEnd: function() { },
    onShufflingStart: function() { },
    onShufflingEnd: function() { },
    onSortingStart: function() { },
    onSortingEnd: function() { }
  },
  controlsSelector: '', // Selector for custom controls
  delay: 0, // Transition delay in ms
  delayMode: 'progressive', // 'progressive' or 'alternate'
  easing: 'ease-out',
  filter: 'all', // Initial filter
  filterOutCss: { // Filtering out animation
    opacity: 0,
    transform: 'scale(0.5)'
  },
  filterInCss: { // Filtering in animation
    opacity: 0,
    transform: 'scale(1)'
  },
  gridItemsSelector: '.filtr-container',
  gutterPixels: 0, // Items spacing in pixels
  layout: 'sameSize', // See layouts
  multifilterLogicalOperator: 'or',
  searchTerm: '',
  setupControls: true, // Should be false if controlsSelector is set 
  spinner: { // Configuration for built-in spinner
    enabled: false,
    fillColor: '#2184D0',
    styles: {
      height: '75px',
      margin: '0 auto',
      width: '75px',
      'z-index': 2,
    },
  },
} 
// OPTIONS FOR FILTERIZR END

export default function getDiscover(type, page){
  $('.yourChoose').html(moodPage);
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
// GET FILM DATA AND FILTERIZR START
    $.ajax({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/' + type + '/movie?api_key=a695f6fc2d1d96589625ca90c846019f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page='+page,
      success:(data)=>{
        if(page==1){
          $('#chooseMovie').fadeIn();
         $('#movie').remove();
         $('<div></div>').appendTo('#films').attr('id','movie').addClass('container');
         $('<div></div>').appendTo('#movie').attr('id','filmsContainer').addClass('row').addClass('filter-container');
         $('<submit></submit>').appendTo('#movie').addClass('moreMovies').attr('data-current-page', page).attr('data-type', type);
         $('<img src="https://v1.iconsearch.ru/uploads/icons/bnw/128x128/action.png" alt="addMore"></img>').appendTo('.moreMovies').addClass('frame');
         $('<img src="https://v1.iconsearch.ru/uploads/icons/humano2/128x128/old-go-down.png" alt="addMore"></img>').appendTo('.moreMovies').addClass('arrow');
        } ;
        
           const films = data.results;
          $.each(films, (i,post) => {
             if(inFavorites[post.id]){
               post.inFavorites = true;
             }
                 createCardMood(post);
             });
             $('.moreMovies').attr('data-current-page', page);
             Filterizr.installAsJQueryPlugin($);
             $('.filter-container').filterizr({
                options
            }) ; 
         },
         error:function(){
           alert('The request failed');
         }
    })

// GET FILM DATA AND FILTERIZR START
  };

// CREATE INFOFILM MODALWINDOW START
const createCardMood = (post) =>{
  const postersAdress = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + post.poster_path;
  // const rait = post.vote_average + '/10';
  // const movTime = 'Runtime: ' + post.runtime + ' min';
  const clonedElement = $(moodCard)
  .prop("id", 'id-' + post.id)
   .appendTo("#filmsContainer")
   .attr('data-category', post.genre_ids)
   .attr('data-sort', 'value')

clonedElement.find(".posterMood")
   .prop("src", postersAdress);

clonedElement.find(".moodTitle")
   .text(post.original_title);

//    var genreName = '';
//    $.each(data.genres, function(){
//     genreName = genreName + ' ' + [$(this)[0].name]; 
//    })
   
// clonedElement.find(".genreInfo")
//       .text(genreName);

// clonedElement.find(".raitFilm")
//       .text(rait);

// clonedElement.find(".timeFilm")
//       .text(movTime);

};
// CREATE INFOFILM MODALWINDOW END

// EVENTS ON CLICK MENU MOOD START
  $('#mood').click(function(event){
    event.preventDefault();
    $('#sliderShow').css('display','none');
    for(var page=1; page < 6; page++){
      getDiscover('discover', page);
    }
})
// EVENTS ON CLICK MENU MOOD END
// EVENTS ADD MORE FILMS ON CLICK START
$(document).on('click','.moreMovies',function(event){
  // $('#search-part').css('display','none)
  let page=+$(this).attr('data-current-page')+1;
  let type=$(this).attr('data-type');
  getDiscover(type, page);
  $(this).attr('data-current-page', page);
})
// EVENTS ADD MORE FILMS ON CLICK END
// EVENTS ADD CLASS BUTTON ACTIVE ON CLICK START
$(document).on('click','.primary',function(){
  $('.primary').removeClass('active');
  $(this).addClass('active');
})
// EVENTS ADD CLASS BUTTON ACTIVE ON CLICK START