var pageCounter = 1; // For JSON file counter
var btn = document.getElementById('btn');
var animalContainer = document.getElementById('animalInfo');

// Adding Click event
btn.addEventListener('click', function() {
    
    // Declaring a variable for new XMLHttpRequest
    var ourRequest = new XMLHttpRequest();

    // For Fetch data using 'GET' and url
    ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-'+ pageCounter +'.json');

    // To response after data is loaded from url
    ourRequest.onload = function(){

        // Checking Response status
        if (ourRequest.status >= 200 && ourRequest.status < 400) {
            // Without JSON.parse json file will be treated as giant text
            var ourData = JSON.parse(ourRequest.responseText);
            
            // Rendering data
            renderHTML(ourData);
            // console.log(ourData[0]);

        } else {
            alert('No more files to fetch or Connection problem.');
            ourRequest.onerror();
        }

    };

    // Error method created
    ourRequest.onerror = function () {
        console.log('Connection Error');
    }

    // For send request
    ourRequest.send();

    // Counter for json file
    pageCounter++;
});


// Render HTML Function
function renderHTML(data) {

    // Variable for empty string
    var htmlString = '';

    // First loop for pets
    for (i=0; i < data.length; i++) {

        // Concat for pets
        htmlString += '<p>' + data[i].name + ' is a ' + data[i].species +' that likes to eat ';
        
        // 1st Child loop for foods that pet like
        for (j=0; j < data[i].foods.likes.length; j++) {

            if ( j == 0 ) { // For single food
                htmlString += data[i].foods.likes[j];
            } else { // For multiple food
                htmlString += ' and ' + data[i].foods.likes[j];
            }
        }

        // Concat for dislikes
        htmlString += ' and dislikes ';

        // 2nd Child loop for foods that pet like
        for (j=0; j < data[i].foods.dislikes.length; j++) {
            if ( j == 0 ) { // For single dislike
                htmlString += data[i].foods.dislikes[j];
            } else { // For multiple dislike
                htmlString += ' and ' + data[i].foods.dislikes[j];
            }
        }

        // Last Concat
        htmlString += '.</p>';
    }

    // HTML add to container
    animalContainer.insertAdjacentHTML('beforeend', htmlString);
}