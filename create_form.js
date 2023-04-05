const form = document.querySelector('form');
const fieldSelect = form.querySelector('#field-type');
const labelInput = form.querySelector('#field-label');
const optionsInput = form.querySelector('#field-options');
const formActions = document.querySelector('.form-actions');
const saveButton = formActions.querySelector('.save-btn');
const publishButton = formActions.querySelector('.publish-btn');
const progressBar = document.querySelector('.progress-bar');

let totalFields = 0;
let completedFields = 0;

function updateProgress() {
  const progress = Math.round((completedFields / totalFields) * 100);
  progressBar.style.width = `${progress}%`;

  if (progress === 100) {
    saveButton.removeAttribute('disabled');
    publishButton.removeAttribute('disabled');
  }
}

function addField() {
  const field = fieldSelect.value;
  const label = labelInput.value;
  const options = optionsInput.value;

  totalFields++;
  completedFields++;

  const newField = document.createElement('div');
  newField.classList.add('form-group');
  newField.innerHTML = `
    <label for="${label}">${label}</label>
    <div class="form-field">
      ${getFieldHTML(field, label, options)}
    </div>
  `;

  form.insertBefore(newField, formActions);

  resetFieldInputs();
  updateProgress();
}

function getFieldHTML(type, label, options) {
  let html = '';

  switch (type) {
    case 'short-text':
      html = `<input type="text" id="${label}" name="${label}" required>`;
      break;

    case 'long-text':
      html = `<textarea id="${label}" name="${label}" required></textarea>`;
      break;

    case 'multiple-choice':
      html = getMultipleChoiceHTML(label, options);
      break;

    case 'checkbox':
      html = getCheckboxHTML(label, options);
      break;

    default:
      break;
  }

  return html;
}

function getMultipleChoiceHTML(label, options) {
  const optionsArray = options.split('\n');
  let html = '';

  for (let i = 0; i < optionsArray.length; i++) {
    html += `
      <label>
        <input type="radio" name="${label}" value="${optionsArray[i]}" required>
        ${optionsArray[i]}
      </label>
    `;
  }

  return html;
}

function getCheckboxHTML(label, options) {
  const optionsArray = options.split('\n');
  let html = '';

  for (let i = 0; i < optionsArray.length; i++) {
    html += `
      <label>
        <input type="checkbox" name="${label}" value="${optionsArray[i]}">
        ${optionsArray[i]}
      </label>
    `;
  }

  return html;
}

function resetFieldInputs() {
  fieldSelect.selectedIndex = 0;
  labelInput.value = '';
  optionsInput.value = '';
}

form.addEventListener('submit', function (event) {
  event.preventDefault();
  addField();
});

