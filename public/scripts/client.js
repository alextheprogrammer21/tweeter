const escape =  function(str) {
  



  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

$(document).ready( () => {



  const hitServer = (method) => {
    return $.ajax('/tweets', { method })
  }
  
  const $loadtweets = () => {
    // return $.ajax('/tweets', { method: 'GET' })
    return hitServer('GET');
  }

  $('#tweet-input-form').submit((event) => {
    event.preventDefault();

    let $textValue = $('main textarea')[0].value;

    if ($textValue.length < 1) {
      return alert("Please input some text");
    }

    if ($textValue.length > 140) {
      return alert("Sorry mate but 140 characters only");
    }

const safeHTML = `<p>${escape($textValue)}</p>`;

    // $.ajax('/tweets', { method: 'GET' })
    // .then((response) => {
      let obj = [{"user": {avatars: "https://i.imgur.com/73hZDYK.png",
                        handle: "@JohnSnow",
                        name:   "Craig"},
                      
                "content": {text: safeHTML},
                
                "created_at": 1461116232227 }]

      // $loadtweets().then(renderTweets);
      
      renderTweets(obj);
      
    // }) 

  })

  
  const renderTweets = function(tweets) {
    
    for (let tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      console.log($tweet);
      $('.tweet-container').prepend($tweet);
    }
  }
  
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
     </footer>
    </article>
   `;

    return $($tweet);
  };
  
  
});
