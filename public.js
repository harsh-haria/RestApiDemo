const dataButton = document.getElementById("data");
const getUserName = document.getElementById("getName");
const DeleteName = document.getElementById("DeleteName");

getUserName.addEventListener("click", () => {
  //   fetch(`http://localhost:8080/file/post/${userName}`);
  const userName = document.getElementById("name").value;
  //   console.log(userName);
  fetch(`http://localhost:8080/file/post/${userName}`, {
    method: "POST",
  })
    .then((result) => {
      return result.json();
    })
    .then((response) => {
      console.log(response);
    });
});

DeleteName.addEventListener("click", () => {
  const userName = document.getElementById("name").value;
  fetch(`http://localhost:8080/file/delete/${userName}`, {
    method: "POST",
  })
    .then((result) => {
      return result.json();
    })
    .then((response) => {
      console.log(response);
    });
});

dataButton.addEventListener("click", () => {
  fetch("http://localhost:8080/file")
    .then((res) => res.json())
    .then((resData) => {
      console.log(resData);
      //   console.log(resData.fileData[0].name);
      //   document.getElementById("root").innerHTML = resData[0].name;
      let dataToBeSent = "";
      resData.map((users) => {
        dataToBeSent += `${users.name} `;
      });
      document.getElementById("root").innerHTML = dataToBeSent;
    })
    .catch((err) => console.log(err));
});
