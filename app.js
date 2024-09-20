const outputDiv = document.getElementById('output');
const fetchButton = document.getElementById('fetchTweets');

fetchButton.addEventListener('click', function() {
    const data = null;
    const xhr = new XMLHttpRequest();
    
    outputDiv.innerHTML = 'Loading...';

    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
            if (this.status === 200) {
                try {
                    const response = JSON.parse(this.responseText);

                    let tweetsHtml = '';
                    if (response.results && response.results.length > 0) {
                        response.results.forEach(tweet => {
                            tweetsHtml += `
                                <div style="border-bottom: 1px solid #ccc; padding: 10px;">
                                    <h3>@${tweet.user.username}</h3>
                                    <p>${tweet.tweet_text}</p>
                                    <small>Likes: ${tweet.like_count}, Retweets: ${tweet.retweet_count}</small>
                                </div>
                            `;
                        });
                    } else {
                        tweetsHtml = '<p>No tweets found.</p>';
                    }
                    outputDiv.innerHTML = tweetsHtml;

                } catch (error) {

                    outputDiv.innerHTML = 'Error parsing JSON: ' + error.message;
                }
            } else {

                outputDiv.innerHTML = 'Error fetching data. Status: ' + this.status + '<br>' +
                                      'Response: ' + this.responseText;
            }
        }
    });

    xhr.onerror = function () {
        outputDiv.innerHTML = 'Network Error: Unable to complete the request.';
    };

    xhr.ontimeout = function () {
        outputDiv.innerHTML = 'Request timed out.';
    };

    xhr.open('GET', 'https://twitter154.p.rapidapi.com/search/search/continuation?query=%23python&section=top&min_retweets=20&limit=5&min_likes=20&start_date=2022-01-01&language=en');
    
    xhr.setRequestHeader('x-rapidapi-key', '0918335caamsh6444214a75e6799p15dd45jsn7bea02c68b82');
    xhr.setRequestHeader('x-rapidapi-host', 'twitter154.p.rapidapi.com');

    xhr.timeout = 10000;

    xhr.send(data);
});
