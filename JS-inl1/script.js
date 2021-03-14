const form = document.querySelector('#form');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');
const output = document.querySelector('#output');

let users = [];

const validateText = id => { //Text validering, Så namn och efternamn
  const input = document.querySelector('#' + id);
  const error = input.nextElementSibling;
// Namn validering, inte tomt, mer än 2 bokstäver
  if(input.value === '') {  //Tom, inte anget ett namn
    error.innerText = 'You need to enter a name';
    input.classList.add('is-invalid');
    return false;
  } else if(input.value.length < 2) {   //namnet är för kort
    error.innerText = 'The name must be at least 2 charachters long';
    input.classList.add('is-invalid');
    return false;
  } else {
    input.classList.add('is-valid');    //När namnet inte är tomt eller för kort ändras det til is-valid och returnerar true
    input.classList.remove('is-invalid');
    return true;
  }
}

const validateEmail = id => { // email validation
  const input = document.querySelector('#' + id);
  const error = input.nextElementSibling;
    //regex till email, ska gå med a-z och inte gå att ha åäö
  let regEx = /^\w+@[a-zA-Z]+?\.[a-zA-Z-]{2,}$/

  if(regEx.test(input.value)) {
    input.classList.add('is-valid');
    input.classList.remove('is-invalid');
    return true;
  } else {
    error.innerText = 'Please enter a valid email address';
    input.classList.add('is-invalid');
    return false;
  }
}

const validate = () => { 
  document.querySelectorAll('input').forEach(input => {
    if(input.type === 'text') {
      validateText(input.id);
    }

    if(input.type === 'email') {
      validateEmail(input.id)
    }
  })

}

const resetForm = () => { //resettar form
  document.querySelectorAll('input').forEach(input => {
    input.value = '';
    input.classList.remove('is-valid');
  })
}


const createUser = (firstName, lastName, email) => {  //user, firstName, lastName, email
  let user = {
    id: Date.now().toString(),
    firstName,
    lastName,
    email
  }

  users.push(user);
  console.log(users);
}

const renderUsers = () => { //render users skriver ut users på sidan

  output.innerHTML = '';

  users.forEach(user => {       // users skrivs ut på sidan.
    let template = `
    <div class="user card d-flex justify-content-between  mb-4">
      <div class="text">
        <h3>${user.firstName} ${user.lastName}</h3>
        <small>${user.email}</small>
      </div>
     
    </div>
    `

    output.innerHTML += template;
  })
}

renderUsers();

form.addEventListener('submit', (e) => {
  e.preventDefault();

  validate();
  if(validateText('firstName') && validateText('lastName') && validateEmail('email')) {
    createUser(firstName.value, lastName.value, email.value);
    renderUsers();
    resetForm();
  }
})