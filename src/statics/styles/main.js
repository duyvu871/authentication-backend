/*=============== SHOW HIDDEN - PASSWORD ===============*/
const showHiddenPass = (loginPass, loginEye) =>{
   const input = document.getElementById(loginPass),
         iconEye = document.getElementById(loginEye)

   iconEye.addEventListener('click', () =>{
      // Change password to text
      if(input.type === 'password'){
         // Switch to text
         input.type = 'text'

         // Icon change
         iconEye.classList.add('ri-eye-line')
         iconEye.classList.remove('ri-eye-off-line')
      } else{
         // Change to password
         input.type = 'password'

         // Icon change
         iconEye.classList.remove('ri-eye-line')
         iconEye.classList.add('ri-eye-off-line')
      }
   })
}

// Login herf

var button = document.getElementById('redirectButton');
button.addEventListener('click', function(e) {
    // e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-pass').value;
    const username = document.getElementById('phone-pass').value;
    const phoneNumber = document.getElementById('name-pass').value;
    // const data = {
    //     email,
    //     password,
    //     username,
    //     phoneNumber
    // }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
   var urlencoded = new URLSearchParams();
   urlencoded.append("email", email);
   urlencoded.append("password", password);
   urlencoded.append("username", username);
   urlencoded.append("phone", phoneNumber);
   // urlencoded.append("address", "chòa mnwgwf");

   var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
   };

   fetch("http://localhost:3000/auth/sign-up", requestOptions)
       .then(response => response.text())
       .then(result => {
          console.log(result)
          if(result === 'success'){
             // window.location.href = 'login.html';
          }
       })
       .catch(error => console.log('error', error));
});
var button = document.getElementById('login__register');
button.addEventListener('click', function() {
   window.location.href = 'register.html';
});

showHiddenPass('login-pass','login-eye')