var photoInput = document.querySelector('#photo-input');
var photo = document.querySelector('#photo');
var form = document.getElementById('form');
photoInput.addEventListener('input', handlePhotoInput);
function handlePhotoInput(event) {
  var photoUrl = photoInput.value;
  if (event.target.value) {
    photo.setAttribute('src', photoUrl);
  } else {
    photo.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
}
form.addEventListener('submit', handleFormSubmit);
function handleFormSubmit(event) {
  event.preventDefault();
  var formData = {
    title: form.elements.title.value,
    photo: form.elements.photo.value,
    notes: form.elements.notes.value
  };
  formData.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.push(formData);
  form.reset();
  photo.setAttribute('src', 'images/placeholder-image-square.jpg');
}
