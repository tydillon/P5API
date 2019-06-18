const $gallery = $('#gallery');
let userData;

const populateGallery = () => {
    //API request: grabs 12 random users
    fetch('https://randomuser.me/api/?results=12')
        .then(res => res.json())
        .then(data => {
            userData = data.results;
            console.log(userData[0])
            for (let i = 0; i < userData.length; i++) {
                $gallery.append(
                    `<div class="card" id=${i}>
                        <div class="card-img-container">
                            <img class="card-img" src="${userData[i].picture.large}" width="90" height="90" alt="profile picture">
                        </div>
                        <div class="card-info-container">
                            <h3 id="name" class="card-name cap">${userData[i].name.first} ${userData[i].name.last}</h3>
                            <p class="card-text">${userData[i].email}</p>
                            <p class="card-text cap">${userData[i].location.city}, ${userData[i].location.state}</p>
                        </div>
                    </div>`
                )//end of gallery append
                $('body').append(
                    `<div class="modal-container" id=modal${i}>
                        <div class="modal">
                            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                            <div class="modal-info-container">
                                <img class="modal-img" src="${userData[i].picture.large}" alt="profile picture">
                                <h3 id="name" class="modal-name cap">${userData[i].name.first} ${userData[i].name.last}</h3>
                                <p class="modal-text">${userData[i].email}</p>
                                <p class="modal-text cap">${userData[i].location.city}</p>
                                <hr>
                                <p class="modal-text">${userData[i].cell}</p>
                                <p class="modal-text">${userData[i].location.street}, ${userData[i].location.city}, ${userData[i].location.state} ${userData[i].location.postcode}</p>
                                <p class="modal-text">Birthday: ${userData[i].dob.date}</p>
                            </div>
                        </div>
                    </div>`
                )   
            }//end of for loop
            $('.modal-container').hide()
        });//end of then statement
};
populateGallery();

$gallery.on('click', (e) => {
    if ($(e.target).hasClass( "card" )){
        let i = $(e.target).attr('id')
        $(`#modal${i}`).show()
    }
});

//Because element was added dynamically, needed to target the document
//https://stackoverflow.com/questions/34896106/attach-event-to-dynamic-elements-in-javascript
$(document).on('click','#modal-close-btn',function(){
    $('.modal-container').hide()
})