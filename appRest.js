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



let itemNameEl = document.getElementById('item-name');
let priceEl = document.getElementById('price');
let foodItemsEl = document.getElementById('foodItems');
let deliveryTypeEl = document.getElementById('deliveryType');
let userImageEl = document.getElementById('upload-image');
let avatarCustomEl = document.getElementById('avatar-custom');

 function imageSelected() {
    let image = userImageEl.files[0];
    avatarCustomEl.src = `./itemimages/${image.name}`;
}

// let UID = firebase.auth().currentUser;
// let UId = firebase.auth().currentuser;


// console.log(UID);
// console.log(UId);

async function addItems() {

    let UID = auth.currentUser.uid;
  //let UID1 = Math.ceil(Math.random() * 100000);

//let UID = UID1 + UID2;

//let imageURL = await uploadImageToStorage(UID);

//   console.log(UID);  
//   console.log(UID1);

// console.log(UID + UID1 );

    let updateloadproduc = await db.collection('product').doc(UID.uid).set(
        // console.log(updateloadproduc,"Error")

    // let userCreated = await auth.createUserWithEmailAndPassword(emailEl.value, passwordEl.value);
   // let UID = userCreated.user.uid;

  

  // let UID = firebase.auth().currentUser;
  //  let imageURL = await uploadImageToStorage(UID);

   // let product =
     {
        productName: itemNameEl.value,
        price: priceEl.value,
        foodItem: giveCheckedDropDown1(),
        deliveryType: giveCheckedDropDown2(),
        userImage: await uploadImageToStorage(),
        uid: UID
    })
    .then(() => {
        console.log("Image successfully Saved!");

        document.getElementById('item-name').value = ""; 

        document.getElementById('price').value = "";;

 document.getElementById('upload-image').src =  "itemimages/thin.jpg";
 document.getElementById('avatar-custom').src=  "itemimages/thin.jpg";
        //  itemNameEl.innerHTML = "";
        //  priceEl.innerHTML = "";
        //  foodItemsEl.innerHTML = "";
         
        //  userImageEl.innerHTML = "";
        //  avatarCustomEl.innerHTML = "";


    })


    // if(updateloadproduc )
    // {

    //     alert("Successful Add");

        
    // }

    //await db.collection('products').doc(UID).set(product);

}



async function uploadImageToStorage() {

  let  UID = auth.currentUser.uid;

  console.log(UID);

  let randomKey = Math.ceil(Math.random()* 12000000 );

  console.log(randomKey);
await db.collection('key').doc(UID.uid).set(
    {
         key: randomKey,
     
        uid: UID
    })

    let image = userImageEl.files[0];

         let storageRef = storage.ref();
         let imageRef = storageRef.child(`avatar/${UID.uid}/${image.name}`);
         await imageRef.put(image);
         let url = await imageRef.getDownloadURL();
          return url

    // return new Promise(async (resolve, reject) => {
    //     let image = userImageEl.files[0];
    //     let storageRef = storage.ref();
    //     let imageRef = storageRef.child(`avatar/${UID}/${image.name}`);
    //     await imageRef.put(image);
    //     let url = await imageRef.getDownloadURL();
    //     resolve(url);
    // })
}



function giveCheckedDropDown1()
{

let foodValues = foodItemsEl.options[foodItemsEl.selectedIndex].value;
let foodValuesText = foodItemsEl.options[foodItemsEl.selectedIndex].text;

// console.log(countryValues);
// console.log(countryValuesText);
return  foodValuesText;

}



function giveCheckedDropDown2()
{

let deliveryTypeValues = deliveryTypeEl.options[deliveryTypeEl.selectedIndex].value;
let deliveryTypeValuesText = deliveryTypeEl.options[deliveryTypeEl.selectedIndex].text;

// console.log(countryValues);
// console.log(countryValuesText);
return  deliveryTypeValuesText;

}









function signOut() {
auth.signOut();
    window.location = "index.html";
}










// async function dataUserFetch(){
    
//     let  UID1 = auth.currentUser.uid;
//     console.log(UID1)
    
//    let UID = UID1.uid;
//    console.log(UID)


//     let dataScrub = await db.collection('product').get()
//     let rowdiv = document.createElement('div');

//     dataScrub.forEach(async function(dataEl){
//         let alldata = dataEl.data();

     

//         // divCreate3.appendChild(li);

//     })
    
// }




function fetchdata()
 
{
   let div1 = document.getElementById("cont1");
   let div2 = document.getElementById("cont2");
   let div3 = document.getElementById("cont3");
   // let dataScrub = await db.collection('product').get()
   db.collection("product")
   .get()

   .then((querySnapshot) => {
       querySnapshot.forEach((doc) => {
// new work
let divCreate1 = document.createElement('div');
let divCreate2 = document.createElement('div');
let divCreate3 = document.createElement('div');
// let divCreate2 = document.createElement('div');
// let divCreate3 = document.createElement('div');
// divCreate1.className = 'p-1 bg-light border';
// divCreate1.className = 'p-1 bg-light border';
divCreate1.className = 'p-1 bg-light border';
divCreate2.className = 'p-1 bg-light border';
divCreate3.className = 'p-1 bg-light border';

let img1 = document.createElement('img');
img1.className = "img-fluid mb-3";
img1.style.width ="1000px";
img1.style.height = "height:400px";


let img2 = document.createElement('img');
img2.className = "img-fluid mb-3";
img2.style.width ="2000px";
img2.style.height = "height:400px";


let img3 = document.createElement('img');
img3.className = "img-fluid mb-3";
img3.style.width ="2000px";
img3.style.height = "height:100px";





// new work

       //    let img1 = document.createElement('img');
           img1.src = doc.data().userImage;
           img2.src = doc.data().userImage;
           img3.src = doc.data().userImage;

        //    console.log(img1.src,"abc");

           div1.appendChild(img1);
           div2.appendChild(img2);
           div3.appendChild(img3);

           


           // doc.data() is never undefined for query doc snapshots
           console.log(doc.id, " => ", doc.data().userImage);
       });
   })
   .catch((error) => {
       console.log("Error getting documents: ", error);
   });

}