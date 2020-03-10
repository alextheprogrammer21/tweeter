//---------------------------- Helper Functions------------------------
function generateRandomName() {
  return (Math.random().toString(36).substring(2, 15)).slice(0,6);
}

let obj = {};
let counter = 1;

$(document).ready(() => {
  console.log("hmm test");
  $('main .error').slideUp();
  $('main compose').slideUp();

  //-------------------------------Nav bar buttons-------------------------

  $("nav new-tweet img").hover(function() {
    $(this).css("margin-top", "0%");
  }, function() {
    $(this).css("margin-top", "-10%");
  });

  $('nav new-tweet').click(() => {
    $('main compose').slideToggle("slow");
    $('main textarea').focus(); 
  });

  //----------------------------Submit form---------------------------

  $('#tweet-input-form').submit(function() {
    event.preventDefault();

    let $textValue = $('main textarea')[0].value;

    if ($textValue.length < 1) {
      $('main .error').slideDown();
        
      setTimeout(() => {
        $('main .error').slideUp();
      }, 3000);

      return null;
    }
    if ($textValue.length > 140) {
      $('main .error').slideDown();

      setTimeout(() => {
        $('main .error').slideUp();
      }, 3000);

      return null;
    } else {
      $.ajax('/tweets', { method: 'POST', data: $(this).serialize() })
        .done(function() {
          loadTweets();
          $('textarea').parent().find('.counter').text(140);
          $('main textarea')[0].value = "";
        })
      $(this).find('textarea').focus();
    }
  })

  const renderTweets = function(tweets) {
    
    for (let tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      console.log($tweet);
      $('.tweet-container').prepend($tweet);
    }
  };
  
  const createTweetElement = tweet => {
    const $tweet = `
  <article>
     <header>
         <img src="${tweet.user.avatars}" />
         ${tweet.user.name}
       <span>${tweet.user.handle}</span>
     </header>
     <p>${tweet.content.text}</p>
     <footer>
       today
       <div2><img src="/images/twiticons.png"> </div2>
     </footer>
    </article>
   `;
    return $($tweet);
  };

  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET'})
      .done(function(data) {
        renderTweets(data);
        $('.tweet-container').find('textarea').val('');
      })
  }
loadTweets();
});

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};