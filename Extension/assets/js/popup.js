const text = document.getElementById( 'notify-text' );
const signInBtn = document.getElementById( 'sign-in-btn' );

const url = `http://localhost:82`

let loggedIn = false;
let userName;



//+-----------+//
//| Listeners |//
//+-----------+//

/* Dev Tools */

document.getElementById('dev-tools-btn').addEventListener('click', handleDevTools);


document.getElementById('dev-create-NDB').addEventListener('click', createNDB);
document.getElementById('dev-create-DDB').addEventListener('click', createDDB);
document.getElementById('dev-create-PDB').addEventListener('click', createPDB);
document.getElementById('dev-create-UDB').addEventListener('click', createUDB);

/* Initial Page */

document.getElementById('sign-in-btn').addEventListener("click", userSignIn);
document.getElementById('sign-up-btn-login').addEventListener('click', userSignUpPage);

  /* Sign Up Page */
document.getElementById('sign-up-btn').addEventListener('click', userSignUp);

//+----------------+//
//| Page Adjusters |//
//+----------------+//

/* Dev Tools */

function handleDevTools() {
  if (document.getElementById('dev-tools').classList.contains("dev-tools-closed")) {
    
    document.getElementById('dev-tools-btn').style.border = "none";
    
    document.getElementById('dev-tools').classList.remove("dev-tools-closed");
    document.getElementById('dev-tools').classList.add("dev-tools-opened");

    document.getElementById('db-create-list').classList.remove('hidden');
    document.getElementById('dev-text-output').classList.remove('hidden');

  } else {
    document.getElementById('dev-tools-btn').style.border = " solid lightskyblue 2px";
    
    document.getElementById('dev-tools').classList.remove("dev-tools-opened");
    document.getElementById('dev-tools').classList.add("dev-tools-closed");

    document.getElementById('db-create-list').classList.add('hidden');
    document.getElementById('dev-text-output').classList.add('hidden');
  }
}


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

/* Dev Tools */

function createNDB() {
  new Promise((resolve, reject) => {
    fetch(`${url}/createnetflixdatabase`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        "Content-type": "application/json"
      },
      redirect: "follow",
      referrerPolicy: "no-referrer"
    }).then(response => resolve(response.json())).catch((err) => reject(err))
  }).then((result) => {
    console.log(result);
    console.log(result.created);
    if (result.created === true) {
      console.log("Netflix Database Created")
      document.getElementById('dev-text-output').innerText = 'Netflix Database Created';
      document.getElementById('dev-text-output').classList.add('dev-fade-animation');
      setTimeout(() => {
        document.getElementById('dev-text-output').classList.remove('dev-fade-animation');
      }, 5000);
    }
  }).catch((err) => {
    console.log(err);
  });
}

function createDDB() {
  new Promise((resolve, reject) => {
    fetch(`${url}/createdisneydatabase`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        "Content-type": "application/json"
      },
      redirect: "follow",
      referrerPolicy: "no-referrer"
    }).then(response => resolve(response.json())).catch((err) => reject(err))
  }).then((result) => {
    if (result.created === true) {
      console.log("Disney Database Created")
      document.getElementById('dev-text-output').innerText = 'Disney Database Created';
      document.getElementById('dev-text-output').classList.add('dev-fade-animation');
      setTimeout(() => {
        document.getElementById('dev-text-output').classList.remove('dev-fade-animation');
      }, 5000);
    }
  }).catch((err) => {
    console.log(err);
  });
}

function createPDB() {
  new Promise((resolve, reject) => {
    fetch(`${url}/createprimedatabase`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        "Content-type": "application/json"
      },
      redirect: "follow",
      referrerPolicy: "no-referrer"
    }).then(response => resolve(response.json())).catch((err) => reject(err))
  }).then((result) => {
    if (result.created === true) {
      console.log("Prime Database Created")
      document.getElementById('dev-text-output').innerText = 'Prime Database Created';
      document.getElementById('dev-text-output').classList.add('dev-fade-animation');
      setTimeout(() => {
        document.getElementById('dev-text-output').classList.remove('dev-fade-animation');
      }, 5000);
    }
  }).catch((err) => {
    console.log(err);
  });
}

function createUDB() {
  new Promise((resolve, reject) => {
    fetch(`${url}/createuserpassdatabase`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        "Content-type": "application/json"
      },
      redirect: "follow",
      referrerPolicy: "no-referrer"
    }).then(response => resolve(response.json())).catch((err) => reject(err))
  }).then((result) => {
    if (result.created === true) {
      console.log("User/Pass Database Created")
      document.getElementById('dev-text-output').innerText = 'User/Pass Database Created';
      document.getElementById('dev-text-output').classList.add('dev-fade-animation');
      setTimeout(() => {
        document.getElementById('dev-text-output').classList.remove('dev-fade-animation');
      }, 8000);
    }
  }).catch((err) => {
    console.log(err);
  });
}

/* Initial Page */

function userSignIn() {

  console.log("hit");

  new Promise((resolve, reject) => {
    fetch(`${url}/usersignin`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
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
      window.location.href= '/mainApp.html';
    } else if (result.code === 2) {
      loggedIn = false;
      document.getElementById('badlogin-indicator').innerText = 'Username or Password Incorrect';
      document.getElementById('badlogin-indicator').style.opacity = 1;
    } else if (result.code === 3) {
      document.getElementById('badlogin-indicator').innerText = 'No Account with Given Username';
      document.getElementById('badlogin-indicator').style.opacity = 1;
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
  }
  if (userP.value == "") {
    signInd.innerText = 'Please Enter Password';
    signInd.style.opacity = 1;

    return;
  }
  
  if (userP.value !== userPR.value) {
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



