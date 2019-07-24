// REQUEST AUTHENTICATION START
function getSuccess(){
    $.ajax({
    method:'GET',
    url: 'https://api.themoviedb.org/3/authentication/token/new?api_key=a695f6fc2d1d96589625ca90c846019f',
  success:(data)=>{
    const requestKey = data.request_token;
    const sessSuccess = 'https://www.themoviedb.org/authenticate/' + requestKey + '?redirect_to=http://localhost:3000/src';
    window.open(sessSuccess, '_blank');
    },
    error:function(){
      alert('The request failed');
    }
}); 
};

$(document).on('click','#authSuccess',function(){
    getSuccess();
});
// REQUEST AUTHENTICATION END
// GET URL PARAMETRS START
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};
// GET URL PARAMETRS END
// REQUEST SESSION ID START
$(document).ready(function(){
    if(getUrlParameter('approved')){
        let getToken = getUrlParameter('request_token');
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.themoviedb.org/3/authentication/session/new?api_key=a695f6fc2d1d96589625ca90c846019f",
            "method": "POST",
            "headers": {
              "content-type": "application/json"
            },
            "processData": false,
            "data": "{\"request_token\":\""+getToken+"\"}"
          }

          $.ajax(settings).done(function (response) {
            let sessionId = response.session_id;
            localStorage.setItem('id-session', sessionId);
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://api.themoviedb.org/3/account?session_id=" + sessionId + "&api_key=a695f6fc2d1d96589625ca90c846019f",
                "method": "GET",
                "headers": {},
                "data": "{}"
              }
              
              $.ajax(settings)
                .done(function (response) {
                  $('#userName').html(response.username).fadeIn();
                  $('#authOut').fadeIn();
                  $('#authSuccess').fadeOut();
              });
          });
    };
    let idSession = localStorage.getItem('id-session');
    if(idSession){
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.themoviedb.org/3/account?session_id=" + idSession + "&api_key=a695f6fc2d1d96589625ca90c846019f",
            "method": "GET",
            "headers": {},
            "data": "{}"
          }
          
          $.ajax(settings)
          .done(function (response) {
            $('#userName').html(response.username).fadeIn();
            $('#authOut').fadeIn();
            $('#authSuccess').fadeOut();
            localStorage.setItem('id-account', response.id);
          })
    }
    else {
        $('#userName').html('').fadeOut();
            $('#authOut').fadeOut();
            $('#authSuccess').fadeIn();
    }
// REQUEST SESSION ID END
// LOG OUT
    $('#authOut').click(function(){
        $('#userName').html('').fadeOut();
            $('#authOut').fadeOut();
            $('#authSuccess').fadeIn();
            localStorage.removeItem('id-session');
            localStorage.removeItem('id-account');
            var url = window.location.href;
            window.location.href = url.split('?')[0];
    })

})

