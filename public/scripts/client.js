//---------------------------- Helper Functions------------------------
function generateRandomName() {
  return (Math.random().toString(36).substring(2, 15)).slice(0,6);
}

let obj = {};
let counter = 1;

$(document).ready(() => {
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
  //----------------------------New tweets from navbar-----------------------------

  const hitServer = (method) => {
    return $.ajax('/tweets', { method });
  };
  
  const $loadtweets = () => {
    return hitServer('GET');
  };

  //----------------------------Submit form---------------------------
  $('#tweet-input-form').submit((event) => {
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
    }

    $('main textarea')[0].value = "";
    $('.counter').text(140);

    //-------------------------------Rendering New Tweets----------------------------

    const safeHTML = `<p>${escape($textValue)}</p>`;

    let handle = "@" + generateRandomName();
    obj[counter] = [{"user": {avatars: "https://i.imgur.com/73hZDYK.png",
      handle: handle,
      name:   generateRandomName()},
    "content": {text: safeHTML},
    "created_at": "today" }];
    counter++;
    renderTweets(obj[counter - 1]);
  });

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
       ${tweet.created_at}
       <div2><img src="/images/twiticons.png"> </div2>
     </footer>
    </article>
   `;
    return $($tweet);
  };
});

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};