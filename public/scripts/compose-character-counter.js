$(document).ready( () => {
  console.log("Everything is ready lol");
  
  const $inputForm = $('main #tweet-input-form textarea');
  let $countValue = $('.counter')[0].textContent;
  
  $inputForm.keydown( (event) => {
    
    let $inputLength = event.target.textLength;
    
    if(event.originalEvent.key == 'Backspace' || event.originalEvent.key == 'Delete') {
      $inputLength -=2;
    }

    $('.counter').text(140 - $inputLength-1);

    
    if ($inputLength > 140) {
      $('.counter').css("color", "red");
    }

    if ($inputLength < 140) {
      $('.counter').css("color", "black");
    }
  });

});