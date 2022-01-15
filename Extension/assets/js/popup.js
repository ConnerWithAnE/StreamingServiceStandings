const text = document.getElementById( 'notify-text' );
const signInBtn = document.getElementById( 'sign-in-btn' );

const url = `http://localhost:82`

let loggedIn = false;
let userName;



//+-----------+//
//| Listeners |//
//+-----------+//

/* Initial Page */


document.getElementById('sign-in-btn').addEventListener("click", userSignIn);
document.getElementById('sign-up-btn-login').addEventListener('click', userSignUpPage);

  /* Sign Up Page */
document.getElementById('sign-up-btn').addEventListener('click', userSignUp);


//+----------------+//
//| Page Adjusters |//
//+----------------+//


/* Sign Up Page */

function userSignUpPage() {
  document.getElementById('login-page-wrapper').classList.add('hidden');
  document.getElementById('signup-page-wrapper').classList.remove('hidden');
}

function userDoneSignUp() {
  document.getElementById('login-page-wrapper').classList.remove('hidden');
  document.getElementById('signup-page-wrapper').classList.add('hidden');
}


//+-----------------+//
//| Server Requests |//
//+-----------------+//

/* On Load */


window.onload = checkSignInStatus();


function checkSignInStatus() {
  console.log("Checking Sign In Status");
  new Promise((resolve, reject) => {
    fetch(`${url}/checksignin`, {
      method: 'GET',
      cache: 'default',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Accept': 'application/x-www-form-urlencoded',
        'Content-type': 'application/x-www-form-urlencoded'
      },
    }).then(response => {
      console.log(response);
      resolve(response.json())
    })
    .catch((err) => reject(err));
  }).then(data => {
    console.log(data);
    if (data.loc != null) {
      //window.location.href = data.loc;
    }
  }).catch((error) => {console.log(`Error: ${error}`)});
}


/* Initial Page */

function userSignIn() {

  const signInd = document.getElementById('badlogin-indicator');

  console.log("hit");

  new Promise((resolve, reject) => {
    fetch(`${url}/usersignin`, {
      method: 'POST',
      mode: 'cors',
      cache: 'default',
      credentials: 'include',
      headers: {
        'Accept': 'application/x-www-form-urlencoded',
        'Content-type': 'application/x-www-form-urlencoded'
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: `uName=${document.getElementById("login-username").value}&uPass=${document.getElementById("login-password").value}`
    }).then(response => resolve(response.json())).catch((err) => reject(err))
  }).then((result) => {
      console.log(result);
    if (result.code === 0) {
      loggedIn = true;
      console.log("logged In");
      document.cookie = 'name=guy';
      console.log(result.cookie);
      //window.location.href= '/mainApp.html';
    } else if (result.code === 2) {
      loggedIn = false;
      signInd.innerText = 'Username or Password Incorrect';
      signInd.style.opacity = 1;
    } else if (result.code === 3) {
      signInd.innerText = 'No Account with Given Username';
      signInd.style.opacity = 1;
    }

    console.log("Sign in Complete");
    console.log(`User Logged: ${loggedIn}`);
  })

}

/* Sign Up Page */

function userSignUp() {

  const signInd = document.getElementById('badsingup-indicator');
  const userN = document.getElementById("signup-username");
  const userP = document.getElementById("signup-password");
  const userPR = document.getElementById("signup-password-retype");

  if (userN.value == "") {
    signInd.innerText = 'Please Enter Email';
    signInd.style.opacity = 1;
    return;
  } else if (userP.value == "") {
    signInd.innerText = 'Please Enter Password';
    signInd.style.opacity = 1;
    return;
  } else if (userP.value !== userPR.value) {
    signInd.innerText = 'Passwords do not match';
    signInd.style.opacity = 1;
    return;
  }

  signInd.style.opacity = 0;
  
  new Promise((resolve, reject) => {
    fetch(`${url}/usersignup`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Accept': 'application/x-www-form-urlencoded',
        'Content-type': 'application/x-www-form-urlencoded'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: `uName=${userN.value}&uPass=${userP.value}`
    }).then(response => resolve(response.json())).catch((err) => reject(err))
  }).then((result) => {
    if (result.code === 0) {
      userDoneSignUp();
      return;  
    } else if (result.code === 3) {
      signInd.innerText = 'Email Already Taken'
      signInd.style.opacity = 1;
      return;
    }
  }).catch((err) => {
    console.log(err);
  })

}



