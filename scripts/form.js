function enableEditing() {
  alert('Form is now editable')
  const inputs = document.querySelectorAll('.profile-form input')
  inputs.forEach((input) => input.removeAttribute('readonly'))
}
