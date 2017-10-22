var $titleInput = $('#title-input');
var $bodyInput = $('#description-input');

var $saveButton = $('#save-button');


$saveButton.on('click', function(event) {
  event.preventDefault();
  prependIdea();
  resetInputFields();
});

function prependIdea() {
  console.log('prepend works');
  $('#idea-card-section').prepend(`<article id="idea-card" class="idea-card">
      <form id="card-meta-data-form">
        <div id="idea-card-title-container">
        <h2 id="card-title" class="card-headings">${$titleInput.val()}</h2>
        <label for="delete-button">Delete</label>
        <input id="delete-button" class="small-grey-button" name="delete-button" type="image" src="FEE-ideabox-icon-assets/delete.svg"></input>
        </div>
        <p id="card-description">${$bodyInput.val()}</p>
        <label for="up-vote-button">Up</label>
        <div id="idea-card-quality-container">
        <input id="up-vote-button" class="small-grey-button" name="up-vote-button" type="image" src="FEE-ideabox-icon-assets/upvote.svg"></input>
        <label for="down-vote-button">Down</label>
        <input id="down-vote-button" class="small-grey-button" name="down-vote-button" type="image" src="FEE-ideabox-icon-assets/downvote.svg"></input>
        <h3 id="quality-display-text" class="card-headings">quality : swill</h3>
        </div>
      </form>
    </article>`);
}

function resetInputFields() {
  var $form = $('#user-input-form');
  $form[0].reset();
}