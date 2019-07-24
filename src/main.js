import 'jquery';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'popper.js';
import css from './style.css';
import menuList from './menu/menu.js';
import template from './template/template.js';
import slider from './slider/slider.js';
import infoStory from './infofilm/infofilm.js';
import moodStory from './mood/mood.js';
import authen from './authentication/auth.js';
import getSlider from './slider/slider.js';




$(document).ready(function(){
      getSlider();
})

 