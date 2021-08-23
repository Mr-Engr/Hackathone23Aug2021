var firebaseConfig = {
  apiKey: "AIzaSyART4JHrGlfH6lxT3cv5HBHEgnCSz7ehH4",
  authDomain: "hackathon-19884.firebaseapp.com",
  projectId: "hackathon-19884",
  storageBucket: "hackathon-19884.appspot.com",
  messagingSenderId: "82901904622",
  appId: "1:82901904622:web:30de09cbdf7019981ed7ff",
  measurementId: "G-PFCGSMK0CW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();



let storage = firebase.storage();
let auth = firebase.auth();
let db = firebase.firestore();

let restNameEl = document.getElementById('rest-name');
let userNameEl = document.getElementById('user-name');
let emailEl = document.getElementById('email');
let passwordEl = document.getElementById('psw');
 let cityEl = document.getElementById('city-name');
 let phoneNumEl = document.getElementById('phoneNum');


 


async function regiserUser() {
  
    let userCreated = await auth.createUserWithEmailAndPassword(emailEl.value, passwordEl.value)
    // .then(() => {
    //    // console.log(data1)
    //     console.log(`${emailEl.value} "Account has been successful created on FireBase"`)
    //    // location.href='./signin.html'
  
    //   })
    //   .catch((error) => {
    //     var errorMessage = error.message;
    //     console.log(errorMessage)
    
    //     console.log(`${emailEl.value} Account has not been created on FireBase`)
    //   });
    

    let UID = userCreated.user.uid;

    console.log(UID);
    // let imageURL = await uploadImageToStorage(UID);

    let restUser = {
        userName: userNameEl.value,
        email: emailEl.value,
        restName: restNameEl.value,
        userCity: cityEl.value,
        userCountry: giveCheckedDropDown(),
        uid: UID
    }
     
// let currentuser = auth.currentuser;
    await db.collection('restUser').doc(UID).set(restUser)
    .then((data) => {
        console.log(data)
        console.log("Your Account has been successful saved on Database")
         location.href='./newlogin.html'
        
  
      })
      .catch((error) => {
        var errorMessage = error.message;
        console.log(errorMessage)
    
        console.log("Data are not stored in Database")
      });
    //   var name=localStorage.setItem('name',name)
    //   var name=localStorage.setItem('email',email)
    
  }



  async function regiserUser1() {
    // let emailEl = document.getElementById('email');
    // let passwordEl = document.getElementById('psw');
    let userCreated = await auth.createUserWithEmailAndPassword(emailEl.value, passwordEl.value)
    // .then(() => {
    //    // console.log(data1)
    //     console.log(`${emailEl.value} "Account has been successful created on FireBase"`)
    //    // location.href='./signin.html'
  
    //   })
    //   .catch((error) => {
    //     var errorMessage = error.message;
    //     console.log(errorMessage)
    
    //     console.log(`${emailEl.value} Account has not been created on FireBase`)
    //   });
    

    let UID = userCreated.user.uid;

    console.log(UID);
    // let imageURL = await uploadImageToStorage(UID);

    let User1 = {
        userName: userNameEl.value,
        email: emailEl.value,
        // userImage: imageURL,
        phoneNum: phoneNumEl.value,
        userCity: cityEl.value,
        // userRole: giveCheckedRadio(),
        userCountry: giveCheckedDropDown(),
        uid: UID
    }
     
// let currentuser = auth.currentuser;
    await db.collection('CustomerUser').doc(UID).set(User1)
    .then((data) => {
        console.log(data)
        console.log("Your Account has been successful saved on Database")
          location.href='./newlogin.html'
        
  
      })
      .catch((error) => {
        var errorMessage = error.message;
        console.log(errorMessage)
    
        console.log("Data are not stored in Database")
      });
    //   var name=localStorage.setItem('name',name)
    //   var name=localStorage.setItem('email',email)
    
  }





//}

// 


let country = document.getElementById('country');

function giveCheckedDropDown()
{

let countryValues = country.options[country.selectedIndex].value;
let countryValuesText = country.options[country.selectedIndex].text;

// console.log(countryValues);
// console.log(countryValuesText);
return  countryValuesText;

}


// async function uploadImageToStorage(UID) {
//     return new Promise(async (resolve, reject) => {
//         let image = userImageEl.files[0];
//         let storageRef = storage.ref();
//         let imageRef = storageRef.child(`avatar/${UID}/${image.name}`);
//         await imageRef.put(image);
//         let url = await imageRef.getDownloadURL();
//         resolve(url);
//     })
// }

// auth.onAuthStateChanged((user) => {
//     let pageLocArr = window.location.href.split('/');
//     let pageName = pageLocArr[pageLocArr.length - 1];
//     let authenticatedPages = ['home.html', 'findwork.html', 'myjob.html'];

//     if (user && authenticatedPages.indexOf(pageName) === -1) {
//         window.location = './signin.html';
//     }
//     else if (!user && pageName === 'home.html') {
//         window.location = './index.html';
//     }
// });

async function signout() {
    // await auth.signOut();
    window.location = 'index.html'
}


// function whoIsUser() {
    // setTimeout(() => {
    //     const user = firebase.auth().currentUser;
    //     console.log(user, 'inside who is user');
    // }, 1000)
// }


async function signinUser() {

    await auth.signInWithEmailAndPassword(emailEl.value, passwordEl.value)
    .then((dataloginuser) => {
        console.log( "Successful Login!")

      //   setTimeout(() => {
      //     const user = firebase.auth().currentUser;
      //     console.log(user, 'inside who is user');
      // }, 1000)

// let currentuser = auth.currentuser;
const currentuser = firebase.auth().currentUser;

console.log(currentuser);

setTimeout(async ()=>{

let restdata = await  db.collection('restUser').get()
restdata.forEach(async function(dataEl)
{

  if(dataEl.data().email === currentuser.email )
  {
    window.location = 'dashboard.html'
  }
  else
  {
  let Customerdata = await db.collection('CustomerUser').get()
  Customerdata.forEach(async function(dataEl)
{

  if(dataEl.data().email === currentuser.email )
  window.location = 'userdashboard.html'
}
   ) }


// )


console.log(restdata);
}  ,200)



        // location.href = 'newAdminPage.html'
     
      })


    } )
  } 


// await db.collection('restUser').doc(UID).set(restUser)
// await db.collection('CustomerUser').doc(UID).set(User1)


function forgot()
{
    var emailAddress = emailEl.value;
    firebase.auth().sendPasswordResetEmail(emailAddress)
    .then(() => {
      console.log( "Password reset email sent!")
      location.href = 'newlogin.html'
      // ..
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);

      // ..
    });

}


function back(){

  window.location = "dashboard.html";
}


function back1(){

  window.location = "userdashboard.html";}