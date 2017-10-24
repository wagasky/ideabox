var $titleInput = $('#title-input');
var $bodyInput = $('#description-input');
var $ideaCardSection = $('#idea-card-section');

// could potentially make these local variables...
var $saveButton = $('#save-button');

$saveButton.on('click', function(event) {
  event.preventDefault();
  prependIdea();
  resetInputFields();
});

$('#idea-card-section').on('click', '.idea-card .delete', function(e) {
  e.preventDefault();
  deleteButton(this);
})

$('#idea-card-section').on('click', '.idea-card .downvote', function(e) {
  e.preventDefault();
  console.log(this);
  downvoteButton(this);
})

$('#idea-card-section').on('click', '.idea-card .upvote', function(e) {
  e.preventDefault();
  console.log(this);
})

function prependIdea() {
  $ideaCardSection.prepend(`<article id="idea-card" class="idea-card">
      <form id="card-meta-data-form">
        <div id="idea-card-title-container">
        <h2 id="card-title" class="card-headings">${$titleInput.val()}</h2>
        <label for="delete-button">Delete</label>
        <input id="delete-button" class="small-grey-button delete" name="delete-button" type="image" src="FEE-ideabox-icon-assets/delete.svg"></input>
        </div>
        <p id="card-description">${$bodyInput.val()}</p>
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

function downvoteButton(button) {
  console.log('function run');
  button.closest('span.quality').text('puppies');
}
//staticDIV.on('click', '.buttonclass', function)

function upvoteButton(button) {
  var $currentIdea = button.closest('.idea-card');

}




