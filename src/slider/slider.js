import slideItem from './slider.html'
import slideStyle from './slider.css'

export default function(){
    
    $.ajax({
        method:'GET',
        url: 'https://api.themoviedb.org/3/movie/popular?api_key=a695f6fc2d1d96589625ca90c846019f&language=en-US',
      success:(data)=>{
          const films = data.results;
         $.each(films, (i,post) => {
                createSlide(post);
            });
        }
    })
};

    const createSlide = (post) => {
        const imgAdress = 'https://image.tmdb.org/t/p/w1400_and_h450_face' + post.backdrop_path;
        
         const clonedElement = $(slideItem)
            .prop("id", post.id)
             .appendTo("#sliderShow");
          
          clonedElement.find(".cartoonSlide")
             .prop("src", imgAdress);
            
            clonedElement.find(".slide-title")
             .text(post.original_title);
            }

    
    