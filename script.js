const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/enable button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing joke to VoiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: '1e1b54eeeba94272a0023f40261c9e40',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get jokes from Joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist'    
    try {
        const response = await fetch(apiUrl);
        const jokeData = await response.json();
        if (jokeData.setup) {
            joke = `${jokeData.setup} ... ${jokeData.delivery}`;
        } else {
            joke = jokeData.joke;
        }
        // Text-to-speech
        tellMe(joke);
        // Disable button
        toggleButton();
    } catch (error) {
        // catch error here
        console.log('getJokes error', error);
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);