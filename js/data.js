/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};
var previousData = localStorage.getItem('javascript-local-storage');
window.addEventListener('beforeunload', handleBeforeunload);
function handleBeforeunload(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', dataJSON);
}
if (previousData !== null) {
  previousData = JSON.parse(previousData);
}
