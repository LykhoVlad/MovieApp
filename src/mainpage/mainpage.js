import mainPlace from './mainpage.html';
import mainStyle from './mainpage.css';

$('#mainContent').html(mainPlace);

export default function(){
    $('#viewPopular').hover(
        function(){
          $(this).find('.popcorn').animate({'width':'250px'},'slow');
          $(this).find('.cola').animate({'width':'250px'},'slow');
        },
        function(){
          $(this).find('.popcorn').animate({'width':'200px'},'slow');
          $(this).find('.cola').animate({'width':'200px'},'slow');
        })
        $('#viewTop').hover(
          function(){
            $()
            $(this).find('.oscar').animate({'width':'100px'},'fast');
            $(this).find('.cinema').animate({'width':'180px'},'fast');
            $(this).find('.oscar').animate({'width':'250px'},'slow');
            $(this).find('.cinema').animate({'width':'250px'},'slow');
          },
          function(){
            $(this).find('.oscar').animate({'width':'200px'},'slow');
            $(this).find('.cinema').animate({'width':'200px'},'slow');
          })
        $('#viewMood').hover(
          function(){
            $(this).find('.imgEmotion').animate({'width':'270px'},'slow');
          },
          function(){
            $(this).find('.imgEmotion').animate({'width':'200px'},'slow');
               
          })
          $('.filterItem').hover(
            function(){
              $(this).find('.moodInfo').css('display','block');
            },
            function(){
              $(this).find('.moodInfo').css('display','none');
            })
}
