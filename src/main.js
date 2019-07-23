import 'jquery';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'popper.js';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';
import 'owl.carousel';

import css from './style.css';
import menuList from './menu/menu.js';
import template from './template/template.js';
import slider from './slider/slider.js';
import infoStory from './infofilm/infofilm.js';
import moodStory from './mood/mood.js';
import authen from './authentication/auth.js';




$(document).ready(function(){
    
      menuList(); 
      template();
     infoStory();
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
    
      moodStory();
      authen();
      addFavorites();
      
})

 slider();
 