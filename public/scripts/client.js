function generateRandomName() {
  return (Math.random().toString(36).substring(2, 15)).slice(0,6);

};

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
    // $('main section').animate({opacity: '100%'})
    $('main compose').slideToggle("slow");
    $('main textarea').focus();
  });
  //----------------------------New tweets from navbar-----------------------------

  const hitServer = (method) => {
    return $.ajax('/tweets', { method });
  };
  
  const $loadtweets = () => {
    // return $.ajax('/tweets', { method: 'GET' })
    return hitServer('GET');
  };

  $('#tweet-input-form').submit((event) => {  //START OF SUBMIT BUTTON CLICK
    event.preventDefault();

    let $textValue = $('main textarea')[0].value;
    //------------------------------Submitting New Tweets-----------------------
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

    // $(".tweet-container article").hover(function() {
    //   $(".tweet-container div2 img").css("opacity", "100%");
    // }, function() {
    //   $(".tweet-container div2 img").css("opacity", "0%");
    // });

    //-------------------------------Rendering New Tweets----------------------------

  

    const safeHTML = `<p>${escape($textValue)}</p>`;

    // $.ajax('/tweets', { method: 'GET' })
    // .then((response) => {
      let handle = "@" + generateRandomName();
    obj[counter] = [{"user": {avatars: "https://i.imgur.com/73hZDYK.png",
      handle: handle,
      name:   generateRandomName()},
                      
    "content": {text: safeHTML},
                
    "created_at": "today" }];

    // $loadtweets().then(renderTweets);
      counter++;
    renderTweets(obj[counter-1]);
      
    // })

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


//------------------------Helper Functions-------------------------------

const escape =  function(str) {

  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};