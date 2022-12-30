var photoInput = document.querySelector('#photo-input');
var photo = document.querySelector('#photo');
var form = document.getElementById('form');
var formDiv = document.getElementById('entry-form');
var entriesAnchor = document.getElementById('entries-text');
var newButton = document.getElementById('new');
var h4 = document.querySelector('#no-entries');
var ul = document.querySelector('.entry-list');
var title = document.querySelector('.title');
var notes = document.querySelector('.notes');
var formHeading = document.querySelector('#new-entry');
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
  if (data.editing === null) {
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
    entriesViewHandler();
    var entryElement = renderEntry(formData);
    ul.insertBefore(entryElement, ul.firstChild);
    if (data.entries.length === 0) {
      toggleNoEntries(true);
    } else {
      toggleNoEntries(false);
    }
  } else {
    var editData = {
      title: form.elements.title.value,
      photo: form.elements.photo.value,
      notes: form.elements.notes.value,
      entryId: data.editing.entryId
    };
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === parseInt(editData.entryId, 10)) {
        data.entries[i] = editData;
      }
    }
    var newLi = renderEntry(editData);
    var oldLi = document.querySelector(`li[data-entry-id="${editData.entryId}"]`);
    oldLi.replaceWith(newLi);
    data.editing = null;
    form.reset();
    entriesViewHandler();
    photo.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
}
function renderEntry(entry) {
  var li = document.createElement('li');
  var row = document.createElement('div');
  row.className = 'row';
  var columnHalf1 = document.createElement('div');
  columnHalf1.className = 'column-half';
  var image = document.createElement('img');
  image.className = 'column-full no-padding entry-img';
  var columnHalf2 = document.createElement('div');
  columnHalf2.className = 'column-half';
  var h2 = document.createElement('h2');
  h2.className = 'no-top-margin flex-h2';
  var p = document.createElement('p');
  var pencil = document.createElement('i');
  pencil.className = 'fa-solid fa-pencil pencil';
  li.setAttribute('data-entry-id', entry.entryId);
  image.src = entry.photo;
  h2.textContent = entry.title;
  p.textContent = entry.notes;
  columnHalf1.appendChild(image);
  columnHalf2.appendChild(h2);
  h2.appendChild(pencil);
  columnHalf2.appendChild(p);
  row.appendChild(columnHalf1);
  row.appendChild(columnHalf2);
  li.appendChild(row);
  return li;
}
document.addEventListener('DOMContentLoaded', generateDomTree);
function generateDomTree(event, view) {
  if (!view) {
    view = sessionStorage.getItem('view');
  }
  viewSwap(view);
  for (var i = 0; i < data.entries.length; i++) {
    var entry = data.entries[i];
    var entryElement = renderEntry(entry);
    ul.insertBefore(entryElement, ul.firstChild);
  }
  if (data.entries.length === 0) {
    toggleNoEntries(true);
  } else {
    toggleNoEntries(false);
  }
}
function toggleNoEntries(show) {
  if (show) {
    h4.classList.remove('hidden');
  } else {
    h4.className = 'hidden';
  }
}
function viewSwap(view) {
  var form = document.getElementById('entry-form');
  var entries = document.getElementById('entries-div');
  if (view === 'entries') {
    form.className = 'hidden';
    entries.classList.remove('hidden');
  } else if (view === 'entries-form') {
    form.classList.remove('hidden');
    entries.className = 'entries-div hidden';
  }
  sessionStorage.setItem('view', view);
}
function entriesViewHandler() {
  var view = '';
  if (formDiv.className === 'hidden') {
    view = 'entries-form';
    formHeading.textContent = 'New Entry';
  } else {
    view = 'entries';
  }
  viewSwap(view);
}
entriesAnchor.addEventListener('click', entriesViewHandler);
newButton.addEventListener('click', entriesViewHandler);
ul.addEventListener('click', handlePencilClick);
function handlePencilClick(event) {
  var targetElement = event.target;
  if (targetElement.tagName === 'I') {
    var entryIdElement = targetElement.closest('li');
    var entryId = entryIdElement.getAttribute('data-entry-id');
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === parseInt(entryId, 10)) {
        data.editing = data.entries[i];
      }
    }
    photoInput.value = data.editing.photo;
    title.value = data.editing.title;
    notes.value = data.editing.notes;
    formHeading.textContent = 'Edit Entry';
    photo.setAttribute('src', data.editing.photo);
    viewSwap('entries-form');
  }
}
