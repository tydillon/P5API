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
                    <p class="card-text cap">${users[i].location.city}, ${users[i].location.state}</p>
                </div>
            </div>`
        );//end of gallery append
    };//end of for loop
};//end of populateGallery function

//Function to create the modals that appear when a user clicks on a card
const generateModals = (users) => {
    for (let i = 0; i < users.length; i++) {
        let date = new Date(users[i].dob.date);
        let phone = users[i].cell
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
                        <p class="modal-text">${users[i].location.street}, ${users[i].location.city}, ${users[i].location.state} ${users[i].location.postcode}</p>
                        <p class="modal-text">Birthday: ${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}</p>
                    </div>
                </div>
            </div>`
        );//end of body append   
    };//end of for loop
};//end of generateModals function

//Function to run the API call to generate the users
const generateUsers = (url) => {
    //API request: grabs 12 random users
    fetch(url)
        .then(res => res.json())
        .then(data => {
            let userData = data.results;
            //generates the cards
            populateGallery(userData);
            //generates and hides the modals
            generateModals(userData);
            $('.modal-container').hide();   
        });//end of then statement
};//end of generateUsers function

//runs the API call
generateUsers('https://randomuser.me/api/?results=12');


//Event listeners
//Because elements were added dynamically, needed to target the document rather than the individual elements
//https://stackoverflow.com/questions/34896106/attach-event-to-dynamic-elements-in-javascript

//Targets the cards. When clicked, shows modal
$(document).on('click', '.card', (e) => {
        let i = $(e.currentTarget).attr('id');
        $(`#modal${i}`).show();
})

//Target the 'X' in the top right of the modal. When clicked, hides the modal
$(document).on('click', '#modal-close-btn', () => {$('.modal-container').hide()})