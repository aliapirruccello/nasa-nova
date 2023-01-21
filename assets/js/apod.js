//Generate random date
function randomDate(date1, date2){
    function randomValueBetween(min, max) {
      return Math.random() * (max - min) + min;
    }
    var date1 = date1 || 'April 5, 1988'
    var date2 = date2 || new Date().toLocaleDateString()
    date1 = new Date(date1).getTime()
    date2 = new Date(date2).getTime()
    if( date1>date2){
        return new Date(randomValueBetween(date2,date1)).toLocaleDateString()   
    } else{
        return new Date(randomValueBetween(date1,date2)).toLocaleDateString()  

    }
}

//Reformat random date to YYYY-MM-DD
function formatRandomDate(randomDate) {
    let splitRandomDate = randomDate().split('/')
    return `${splitRandomDate[2]}-${splitRandomDate[0]}-${splitRandomDate[1]}`
}

//Find picture from API by searching for a date and display it on the site
function getPicture(){
  const date = document.querySelector('.date').value || formatRandomDate(randomDate)
  const url = `https://api.nasa.gov/planetary/apod?api_key=E6qRRmADWGvd8vqvIcyTLwLq0PghLo2cwIPqMXrW&date=${date}`

  console.log(date)

  const aboutImage = document.querySelector('#aboutImage')
  const background = document.querySelector('#background')
  const aboutVideo = document.querySelector('#aboutVideo')
  const aboutVideoContainer = document.querySelector('#aboutVideoContainer')
  const videoNotice =  document.querySelector('.videoNotice')
  

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
            console.log(data)

            //Hide random date info if user chooses to input a date
            document.getElementById('exact').onclick = function() {
                document.querySelector('#randomDate').style.display = 'none'
            }

            //Display random date info if user chooses to randomize the image shown
            document.getElementById('random').onclick = function() {
                document.querySelector('#randomDate').style.display = 'block'
                document.querySelector('#randomDate').innerText = data.date
            }
            
            //If data type is an image, display the image as a background and its info in the about area
            if (data.media_type === 'image') {
                aboutImage.classList.remove('hidden')
                background.style.background = `url("${data.url}")`;
                aboutImage.src = data.url;

                //Hide video from about area
                aboutVideo.src = '';
                aboutVideo.classList.add('hidden');
                aboutVideContainer.classList.add('hidden');
                videoNotice.classList.add('hidden');

            //If data type is a video, display the video and its info in the about area
            } else if (data.media_type === 'video') {
                aboutVideo.classList.remove('hidden')
                aboutVideoContainer.classList.remove('hidden')
                videoNotice.classList.remove('hidden')
                aboutVideo.src = data.url;

                //Revert background to original image
                background.style.background = 'url("images/bg2a.jpg")';

                //Hide previous image from about area
                aboutImage.classList.add('hidden');
                aboutImage.src = '';
            }
        
            //Show picture and video information
            document.querySelector('.title').innerText = !data.copyright ? `${data.title}` : `${data.title} by ${data.copyright}`;
            document.querySelector('.title1').innerText = !data.copyright ? `${data.title}` : `${data.title} by ${data.copyright}`;
            document.querySelector('#aboutExplanation').innerText = data.explanation;

      })

      .catch(err => {
          console.log(`error ${err}`)
      });
}


//Run getPicture function when user enters a date
document.querySelector('#exact').addEventListener('click', getPicture)

//Run getPicture function when user opts for random date
document.querySelector('#random').addEventListener('click', function() {
    document.querySelector('#date').value = '' //Clear date input if user filled it out
    getPicture()
    
})