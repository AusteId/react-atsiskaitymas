// PVZ: Issiaiskinti promise ir kas yra response. Cia ne react

// const fetchData = async () => {

//   try {
//     const response = await fetch("https://jsonplaceholder.typicode.com/posts");
//     console.log(response); //pasiziureti, ar ateina

//     if (!response.ok) {
//         throw new Error("Klaida :(" + response.statusText);
//     }

//   } catch (error) {
//     console.log(error.message);
//   }
// };

// fetchData();

// *************POST**************

// const url = "http://localhost:5000/users";
// const newUser = {
//   username: "UserTEST",
//   email: "user1@gmail.com",
//   channel: "UserchannelTEST",
//   likes: 23,
// };

// const fetchData = async () => {
//   try {
//     const response = await fetch(url, {
//         method: "POST",
//         headers: {'Content-Type': 'application/json'},  //kad json'u siunciam duomenis
//         body: JSON.stringify(newUser),
//     });
//     console.log(response); //pasiziureti, ar ateina
//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error("Klaida :(" + response.statusText);
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// fetchData();

// ****************** PATCH ******************

// const url = "http://localhost:5000/users";

// const fetchData = async () => {
//   try {
//     const response = await fetch(url+"/41fs", {
//         method: "PATCH",
//         headers: {'Content-Type': 'application/json'},  //kad json'u siunciam duomenis
//         body: JSON.stringify({username: "ADAS"}),
//     });
//     console.log(response); //pasiziureti, ar ateina
//     const data = await response.json();
//     console.log(data);

//     if (!response.ok) {
//       throw new Error("Klaida :(" + response.statusText);
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// fetchData();

// ********************DELETE************************

const url = "http://localhost:5000/users";

const fetchData = async () => {
  try {
    const response = await fetch(url+"/2", {
      method: "DELETE",
      headers: {'Content-Type': 'application/json'},
    });
    console.log(response); //pasiziureti, ar ateina
    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      throw new Error("Klaida :(" + response.statusText);
    }
  } catch (error) {
    console.log(error.message);
  }
};

fetchData();
