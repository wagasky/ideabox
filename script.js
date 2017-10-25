// var $titleInput = $('#title-input');
// var $bodyInput = $('#description-input');
var $ideaCardSection = $('#idea-card-section');
var idNum;


// could potentially make these local variables...
var $saveButton = $('#save-button');

$saveButton.on('click', function(event) {
  event.preventDefault();
  genCard();
  resetInputFields();
});

$('#idea-card-section').on('click', '.idea-card .delete', function(event) {
  event.preventDefault();
  deleteButton(this);
  // look at this to refactor and put in function
  var currentId = event.target.closest('.idea-card').id
  localStorage.removeItem(currentId);
})

// this event listener is working, but not the function below

$('#idea-card-section').on('click', '.idea-card .downvote', function(event) {
  event.preventDefault();
  console.log(this);
  downvoteButton(this);
})

// // this event listener is working, but not the function below

$('#idea-card-section').on('click', '.idea-card .upvote', function(event) {
  event.preventDefault();
  console.log(this);
})

function prependIdea(title, body, idNum) {
  $ideaCardSection.prepend(`<article id="${idNum}" class="idea-card">
      <form id="card-meta-data-form">
        <div id="idea-card-title-container">
        <h2 id="card-title" class="card-headings">${title}</h2>
        <label for="delete-button">Delete</label>
        <input id="delete-button" class="small-grey-button delete" name="delete-button" type="image" src="FEE-ideabox-icon-assets/delete.svg"></input>
        </div>
        <p id="card-description">${body}</p>
        <label for="up-vote-button">Up</label>
        <div id="idea-card-quality-container">
        <input id="up-vote-button" class="small-grey-button upvote" name="up-vote-button" type="image" src="FEE-ideabox-icon-assets/upvote.svg"></input>
        <label for="down-vote-button">Down</label>
        <input id="down-vote-button" class="small-grey-button downvote" name="down-vote-button" type="image" src="FEE-ideabox-icon-assets/downvote.svg"></input>
        <h3 id="quality-display-text" class="card-headings">quality : <span class="quality">swill</span></h3>
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

// this isn't working currently

function downvoteButton(button) {
  console.log('function run');
  button.closest('span.quality').text('puppies');
}
//staticDIV.on('click', '.buttonclass', function)

// this function isn't working currently
function upvoteButton(button) {
  var $currentIdea = button.closest('.idea-card');

}

function Idea(title, body, idNum) {
  this.title = title;
  this.body = body;
  this.idNum = idNum;
  this.quality = 'swill';
}

function genCard(title, body) {
  var title = $('#title-input').val();
  var body = $('#description-input').val();
  var newIdea = new Idea(title, body, Date.now());
  prependIdea(newIdea['title'], newIdea['body'], newIdea['idNum']);
  var stringIdea = JSON.stringify(newIdea);
  localStorage.setItem(newIdea['idNum'], stringIdea);
}



