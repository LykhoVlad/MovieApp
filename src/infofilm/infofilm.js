import infoPage from './infofilm.html';
import infostyle from './infofilm.css';

export default function getInfo(movieId){
// GET APIDATA FOR FILMS INFORMATION START
      $.ajax({
        method:'GET',
        url: 'https://api.themoviedb.org/3/movie/' + movieId + '?api_key=a695f6fc2d1d96589625ca90c846019f&language=en-US',
      success:(data)=>{
            createInfoPage(data);
        },
        error:function(){
          alert('The request failed');
        }
    });
}
// GET APIDATA FOR FILMS INFORMATION END

// CREATE INFOFILM MODALWINDOW
const createInfoPage = (data) =>{
    const posterAdress = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + data.poster_path;
    const rait = data.vote_average + '/10';
    const movTime = 'Runtime: ' + data.runtime + ' min';
    const backImg = 'https://image.tmdb.org/t/p/w1400_and_h450_face' + data.backdrop_path;
    const clonedElement = $(infoPage)
    .prop("id", 'id-' + data.id)
    .css('background', 'url('+backImg+')' )
     .appendTo("#film-details");
  
  clonedElement.find(".posterMovie")
     .prop("src", posterAdress);
  
  clonedElement.find(".titleInfo")
     .text(data.original_title);
  
     var genreName = '';
     $.each(data.genres, function(){
      genreName = genreName + '  ' + [$(this)[0].name]; 
     })
     
  clonedElement.find(".genreInfo")
        .text(genreName);

  clonedElement.find(".overviewFilm")
        .text(data.overview);

  clonedElement.find(".raitFilm")
        .text(rait);

  clonedElement.find(".timeFilm")
        .text(movTime);
  clonedElement.find('#close-btn')

  $('#id-' + data.id).fadeIn(500);
};

// EVENT ON CLICK
$(document).on('click','.popup', function(e){
      e.preventDefault();
      let movieId = $(this).attr('id');
      $('#filmsContainer').css('filter', 'blur(5px)');
      $('.owl-carousel').css({'z-index':'-1','filter':'blur(5px)'});
      getInfo(movieId);
    });
    
    $(document).on('click','#close-btn', function(e){
      e.preventDefault;
      $('.modalInfo').fadeOut(500);
      $('#filmsContainer').css('filter', 'none');
      $('.owl-carousel').css({'z-index':'1','filter':'none'});
    });
