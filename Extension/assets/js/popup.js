const text = document.getElementById( 'notify-text' );
const signInBtn = document.getElementById( 'sign-in-btn' );

const url = `http://localhost:82`

let loggedIn = false;
let userName;


document.getElementById("sign-in-btn").addEventListener("click", userSignIn);

async function userSignIn() {

  console.log("hit");

  new Promise((resolve, reject) => {
    fetch(`${url}/trysignin`, {
      method: "POST",
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        "Content-type": "application/json"
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({"uName":document.getElementById("login-username"), "uPass":document.getElementById("login-password")})
    }).then(response => resolve(response.json())).catch((err) => reject(err))
    }).then((result) => {
      console.log(result);
      console
    if (result.passed === true) {
        loggedIn = true;
    }
    console.log("Sign in Complete");
    console.log(loggedIn);
  })

}



