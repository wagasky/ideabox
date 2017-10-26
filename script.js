var $ideaCardSection = $('#idea-card-section');

// could potentially make these local variables...
var $saveButton = $('#save-button');

$saveButton.on('click', function(event) {
  event.preventDefault();
  genCard();
  resetInputFields();
});

$(window).on('load', function() {
  getIdeasFromStorage();
  console.log("window loaded");
})

$('#idea-card-section').on('click', '.idea-card .delete', function(event) {
  event.preventDefault();
  deleteButton(this);
  // look at this to refactor and put in function
  var currentId = event.target.closest('.idea-card').id
  localStorage.removeItem(currentId);
})

$('#idea-card-section').on('click', '.idea-card .downvote', function(event) {
  event.preventDefault();
  console.log(this);
  downvoteButton();
})

$('#idea-card-section').on('click', '.idea-card .upvote', function(event) {
  event.preventDefault();
  console.log(this);
  upvoteButton();
})

$('#idea-card-section').on('blur', '.idea-card .idea-title', function(event) {
  event.preventDefault();
  console.log(this);
  editCardTitle();
})

$('#idea-card-section').on('blur', '.idea-card .idea-description', function(event) {
  event.preventDefault();
  editCardDescription();
})

$('#idea-card-section').keypress('.idea-card .idea-title', function(event) {
  if(event.keyCode === 13){
    event.preventDefault();
    editCardTitle();
  }
})

$('#idea-card-section').keypress('.idea-card .idea-description', function(event) {
  if(event.keyCode === 13){
    event.preventDefault();
    editCardDescription();
  }
})

function editCardTitle() {
  var currentId = event.target.closest('.idea-card').id;
  var retrievedObject = localStorage.getItem(currentId);
  var parsedObject = JSON.parse(retrievedObject);
  var newTitle = $(`#${currentId} .idea-title`).text();
  parsedObject['title'] = newTitle;
  putIntoStorage(parsedObject);
}

function editCardDescription() {
  var currentId = event.target.closest('.idea-card').id;
  var retrievedObject = localStorage.getItem(currentId);
  var parsedObject = JSON.parse(retrievedObject);
  var newDescription = $(`#${currentId} .idea-description`).text();
  parsedObject['body'] = newDescription;
  putIntoStorage(parsedObject);
}

function prependIdea(idea) {
  $ideaCardSection.prepend(`<article id="${idea['idNum']}" class="idea-card">
      <form id="card-meta-data-form">
        <div id="idea-card-title-container">
        <h2 contenteditable=true id="card-title" class="card-headings idea-title">${idea['title']}</h2>
        <label for="delete-button">Delete</label>
        <input id="delete-button" class="small-grey-button delete" name="delete-button" type="image" src="FEE-ideabox-icon-assets/delete.svg"></input>
        </div>
        <p contenteditable=true id="card-description" class="idea-description">${idea['body']}</p>
        <div id="idea-card-quality-container">
          <label for="up-vote-button">Up</label>
          <label for="down-vote-button">Down</label>
          <input id="up-vote-button" class="small-grey-button upvote" name="up-vote-button" type="image" src="FEE-ideabox-icon-assets/upvote.svg"></input>
          <input id="down-vote-button" class="small-grey-button downvote" name="down-vote-button" type="image" src="FEE-ideabox-icon-assets/downvote.svg"></input>
          <h3 id="quality-display-text" class="card-headings">quality : <span class="quality">${idea['quality']}</span></h3>
        </div>
      </form>
    </article>`);
}

function resetInputFields() {
  var $form = $('#user-input-form');
  $form[0].reset();
}

function deleteButton(button) {
  button.closest('.idea-card').remove();
}

function downvoteButton() {
  var currentId = event.target.closest('.idea-card').id;
  var retrievedObject = localStorage.getItem(currentId);
  var parsedObject = JSON.parse(retrievedObject);
  if (parsedObject.quality === 'genius') {
    parsedObject.quality = 'plausible';
    $(`#${currentId} .quality`).text('plausible');
  } else if (parsedObject.quality === 'plausible'){
    parsedObject.quality = 'swill';
    $(`#${currentId} .quality`).text('swill');
  }
  putIntoStorage(parsedObject);
}

function upvoteButton() {
  var currentId = event.target.closest('.idea-card').id;
  var retrievedObject = localStorage.getItem(currentId);
  var parsedObject = JSON.parse(retrievedObject);
  if( parsedObject.quality === 'swill') {
    parsedObject.quality = 'plausible';
    $(`#${currentId} .quality`).text('plausible');
  } else if (parsedObject.quality === 'plausible'){
    parsedObject.quality = 'genius';
    $(`#${currentId} .quality`).text('genius');
  }
  putIntoStorage(parsedObject);
}

function Idea(title, body, idNum, quality) {
  this.title = title;
  this.body = body;
  this.idNum = idNum;
  this.quality = quality || 'swill';
}

function genCard(title, body) {
  var title = $('#title-input').val();
  var body = $('#description-input').val();
  var newIdea = new Idea(title, body, Date.now());
  prependIdea(newIdea);
  putIntoStorage(newIdea);
}

function putIntoStorage(object) {
  var stringIdea = JSON.stringify(object);
  localStorage.setItem(object['idNum'], stringIdea);
} 

function getIdeasFromStorage() {
  for(var i = 0; i < localStorage.length; i++) {
    var retrievedIdea = localStorage.getItem(localStorage.key(i));
    var parsedIdea = JSON.parse(retrievedIdea);
    prependIdea(parsedIdea);
  }
}

$('#search-input').keypress(function(event) {
  if(event.keyCode === 13){
    event.preventDefault();
    // console.log('enter was pressed');
    var searchText = $(this).val();
    console.log(searchText);
    var filteredText = searchText.toUpperCase();
    for (var i = 0; i < localStorage.length; i++) {
      // var currentId = event.target.closest('.idea-card').id;
      var retrievedIdea = localStorage.getItem(localStorage.key(i));
      var parsedObject = JSON.parse(retrievedIdea);
      var currentId = parsedObject['idNum'];
      console.log(parsedObject);
      console.log(currentId);
      if (parsedObject['title'].toUpperCase().includes(filteredText) || parsedObject['body'].toUpperCase().includes(filteredText)) {
        console.log('yay!')
        // $(`${currentId}`).css( "display", "" );
      } else {
        // $(`${currentId}`).css( "display", "none");
        console.log('boo');
      }
    }
  } 
});
