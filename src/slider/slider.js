import slideItem from './slider.html';
import slideStyle from './slider.css';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';
import 'owl.carousel';

export default function getSlider(){
    $.ajax({
        method:'GET',
        url: 'https://api.themoviedb.org/3/movie/popular?api_key=a695f6fc2d1d96589625ca90c846019f&language=en-US&page=2',
      success:(data)=>{
          const films = data.results;
         $.each(films, (i,post) => {
                createSlide(post);
            });
            $('.owl-carousel').owlCarousel({
                items:1,
                margin:5,
                autoHeight:true,
                nav : true,  
                dots:true,
                slideSpeed : 300,
                paginationSpeed : 400,
                autoplay:true,
                autoplayTimeout:3000,
                autoplayHoverPause:true,
                loop:true
            });
        },
        error:function(){
          alert('The request failed');
        }
    })
};

// CREATE SLIDE CARD START
    const createSlide = (post) => {
        const imgAdress = 'https://image.tmdb.org/t/p/w1400_and_h450_face' + post.backdrop_path;
        
         const clonedElement = $(slideItem)
            .prop("id", post.id)
             .appendTo("#sliderShow");
          
          clonedElement.find(".cartoonSlide")
             .prop("src", imgAdress);
            
            clonedElement.find(".slide-title")
             .text(post.title);

            clonedElement.find(".popup")
             .prop("id", post.id);
    }
// CREATE SLIDE CARD END