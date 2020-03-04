$(document).ready( () => {
  
  const $inputForm = $('main #tweet-input-form textarea');
  let $countValue = $('.counter')[0].textContent;
  
  $inputForm.on("keyup", (event) => {
    
    let $inputLength = event.target.textLength;
    

    $('.counter').text(140 - $inputLength);

    
    if ($inputLength > 140) {
      $('.counter').css("color", "red");
    }

    if ($inputLength <= 140) {
      $('.counter').css("color", "black");
    }
  });

});