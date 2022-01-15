
//let url = `http://localhost:82`

//+-----------+//
//| Listeners |//
//+-----------+//

/* Dev Tools */

document.getElementById('dev-tools-btn').addEventListener('click', handleDevTools);


document.getElementById('dev-create-NDB').addEventListener('click', createNDB);
document.getElementById('dev-create-DDB').addEventListener('click', createDDB);
document.getElementById('dev-create-PDB').addEventListener('click', createPDB);
document.getElementById('dev-create-UDB').addEventListener('click', createUDB);




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
  