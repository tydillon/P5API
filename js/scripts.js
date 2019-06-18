let currInd = 0;
let dataLength;

//Function to convert state name to 2 digit abbreviation
//adapted from https://stackoverflow.com/questions/3925195/making-state-abbreviations-from-state-names 
const abbrev = (name) => {
    switch (name.toUpperCase())
    {
        case "ALABAMA":
            return "AL";
        case "ALASKA":
            return "AK";
        case "ARIZONA":
            return "AZ";
        case "ARKANSAS":
            return "AR";
        case "CALIFORNIA":
            return "CA";
        case "COLORADO":
            return "CO";
        case "CONNECTICUT":
            return "CT";
        case "DELAWARE":
            return "DE";
        case "DISTRICT OF COLUMBIA":
            return "DC";
        case "FLORIDA":
            return "FL";
        case "GEORGIA":
            return "GA";
        case "HAWAII":
            return "HI";
        case "IDAHO":
            return "ID";
        case "ILLINOIS":
            return "IL";
        case "INDIANA":
            return "IN";
        case "IOWA":
            return "IA";
        case "KANSAS":
            return "KS";
        case "KENTUCKY":
            return "KY";
        case "LOUISIANA":
            return "LA";
        case "MAINE":
            return "ME";
        case "MARYLAND":
            return "MD";
        case "MASSACHUSETTS":
            return "MA";
        case "MICHIGAN":
            return "MI";
        case "MINNESOTA":
            return "MN";
        case "MISSISSIPPI":
            return "MS";
        case "MISSOURI":
            return "MO";
        case "MONTANA":
            return "MT";
        case "NEBRASKA":
            return "NE";
        case "NEVADA":
            return "NV";
        case "NEW HAMPSHIRE":
            return "NH";
        case "NEW JERSEY":
            return "NJ";
        case "NEW MEXICO":
            return "NM";
        case "NEW YORK":
            return "NY";
        case "NORTH CAROLINA":
            return "NC";
        case "NORTH DAKOTA":
            return "ND";
        case "OHIO":
            return "OH";
        case "OKLAHOMA":
            return "OK";
        case "OREGON":
            return "OR";
        case "PENNSYLVANIA":
            return "PA";
        case "PUERTO RICO":
            return "PR";
        case "RHODE ISLAND":
            return "RI";
        case "SOUTH CAROLINA":
            return "SC";
        case "SOUTH DAKOTA":
            return "SD";
        case "TENNESSEE":
            return "TN";
        case "TEXAS":
            return "TX";
        case "UTAH":
            return "UT";
        case "VERMONT":
            return "VT";
        case "VIRGIN ISLANDS":
            return "VI";
        case "VIRGINIA":
            return "VA";
        case "WASHINGTON":
            return "WA";
        case "WEST VIRGINIA":
            return "WV";
        case "WISCONSIN":
            return "WI";
        case "WYOMING":
            return "WY";
    }
}

//Function to create the gallery of cards
const populateGallery = (users) => {
    for (let i = 0; i < users.length; i++) {
        $('#gallery').append(
            `<div class="card" id=${i}>
                <div class="card-img-container">
                    <img class="card-img" src="${users[i].picture.large}" width="90" height="90" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${users[i].name.first} ${users[i].name.last}</h3>
                    <p class="card-text">${users[i].email}</p>
                    <p class="card-text cap">${users[i].location.city}</p>
                </div>
            </div>`
        );//end of gallery append
    };//end of for loop
    $('body').append(`<button type="button" class="btn" id="show-all">Show All</button>`);
    $('#show-all').hide();
};//end of populateGallery function

//Function to create the modals that appear when a user clicks on a card
const generateModals = (users) => {
    for (let i = 0; i < users.length; i++) {
        let date = new Date(users[i].dob.date);
        let phone = users[i].cell;
        $('body').append(
            `<div class="modal-container" id=modal${i}>
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${users[i].picture.large}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${users[i].name.first} ${users[i].name.last}</h3>
                        <p class="modal-text">${users[i].email}</p>
                        <p class="modal-text cap">${users[i].location.city}</p>
                        <hr>
                        <p class="modal-text">${phone}</p>
                        <p class="modal-text cap">${users[i].location.street}, ${users[i].location.city}, ${abbrev(users[i].location.state)} ${users[i].location.postcode}</p>
                        <p class="modal-text">Birthday: ${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}</p>
                        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button> 
                        <button type="button" id="modal-next" class="modal-next btn">Next</button>
                    </div>
                </div>
            </div>`
        );//end of body append   
    };//end of for loop
};//end of generateModals function

const generateSearchBar = () => {
    $('.search-container').append(
        `<form action="#" method="get">
            <input type="search" id="search-input" class="search-input" placeholder="Search...">
            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
        </form>`
    )
}

//Function to run the API call to generate the users
const generateUsers = (url) => {
    //API request: grabs random users
    fetch(url)
        .then(res => res.json())
        .then(data => {
            let userData = data.results;
            dataLength = userData.length;
            //generates the cards
            populateGallery(userData);
            //generates and hides the modals
            generateModals(userData);
            $('.modal-container').hide();   
        });//end of then statement
};//end of generateUsers function

//runs the API call
generateUsers('https://randomuser.me/api/?results=12&nat=us');
generateSearchBar();

//Increment and Decrement functions for the modals
const increment = () => {
    $('.modal-container').hide();
    currInd = parseInt(currInd)
    if (currInd === (dataLength - 1)) {
        currInd = 0;
    } else {
      currInd += 1;
    };
    $(`#modal${currInd}`).show();
};
const decrement = () => {
    $('.modal-container').hide();
    currInd = parseInt(currInd)
    if (currInd === 0) {
        currInd = dataLength - 1;
      } else {
        currInd -= 1;
      }
    $(`#modal${currInd}`).show();
}

//Event listeners
//Because elements were added dynamically, needed to target the document rather than the individual elements
//https://stackoverflow.com/questions/34896106/attach-event-to-dynamic-elements-in-javascript

//Targets the cards. When clicked, shows modal
$(document).on('click', '.card', (e) => {
        let i = $(e.currentTarget).attr('id');
        currInd = i;
        $(`#modal${i}`).fadeIn();
})

//Modal event listeners
$(document).on('click', '#modal-close-btn', () => {$('.modal-container').fadeOut()})
$(document).on('click', '#modal-next', increment)
$(document).on('click', '#modal-prev', decrement)

//search bar event listener
$(document).on('click', '#search-submit', () => {
   let testArray = $('.card-name').toArray();
   for (let i = 0; i < testArray.length; i++) {
        if (testArray[i].textContent.toUpperCase().includes($('#search-input').val().toUpperCase())) {
            $(`#${i}`).fadeIn();
        } else {
            $(`#${i}`).fadeOut();
        }
   }
   $('#show-all').fadeIn();
});

//Listener for the show all button at the bottom of the page
$(document).on('click', '#show-all', () => {
    $('#show-all').fadeOut();
    $('.card').fadeIn();
})