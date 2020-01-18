adminname = "";
sesslog = [];
adminflag = 0;
allusers = [];
var validation = 0;
logintime;
var uid;

if (localStorage.getItem("sessionlog") == null) {
  localStorage.setItem("sessionlog", JSON.stringify(sesslog));
}
if (localStorage.getItem("users") == null) {
  localStorage.setItem("users", JSON.stringify(allusers));
}
var sessionlog = function(name, logintime, logouttime) {
  this.name = name;
  this.logintime = logintime;
  this.logouttime = logouttime;
};
var user = function(uid, name, email, password, city, state, birthday, status) {
  this.uid = uid;
  this.name = name;
  this.email = email;
  this.password = password;
  this.city = city;
  this.state = state;
  this.birthday = birthday;
  this.age = ~~((Date.now() - new Date(this.birthday)) / 31557600000);
  this.status = status;
};
function loadadminpage() {
  var less18 = 0;
  var less50 = 0;
  var grater50 = 0;
  var name;
  allusers = JSON.parse(localStorage.getItem("users"));
  for (var index = 0; index < allusers.length; index++) {
    if (allusers[index].age < 18) {
      less18 = parseInt(less18) + 1;
    } else if (allusers[index].age > 18 && allusers[index].age < 50) {
      less50 = parseInt(less50) + 1;
    } else if (allusers[index].age > 50) {
      grater50 = parseInt(grater50) + 1;
    }
  }
  document.getElementById("less18").textContent = less18;
  document.getElementById("less50").textContent = less50;
  document.getElementById("grater50").textContent = grater50;

  adminname = localStorage.getItem("currentuser");
  document.getElementById("admin_name").textContent = adminname;
  usrbdaymsg();
}
function adminregisteration() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var confpassword = document.getElementById("confermpassword").value;
  var city = document.getElementById("city").value;
  var state = document.getElementById("state").value;
  if (
    name == "" &&
    email == "" &&
    password == "" &&
    city == "" &&
    state == ""
  ) {
    alert("all fields are Required");
  } else {
    var regname = /^[a-zA-Z]*$/;
    if (!regname.test(name)) {
      alert("Name Must Be String");
      validation = 1;
    }
    if (password != confpassword) {
      alert("Password is not match");
      validation = 1;
    }
    if (city.value == "") {
      alert("Select City");
      validation = 1;
    }
    if (state.value == "") {
      alert("Select State");
      validation = 1;
    }
    if (validation == 0) {
      if (terms.checked) {
        var status = "admin";
        var birthday = "";
        allusers = JSON.parse(localStorage.getItem("users"));
        uid = allusers.length + 1;
        admin = new user(
          uid,
          name,
          email,
          password,
          city,
          state,
          birthday,
          status
        );

        setdata(admin);
      } else {
        alert("check Terms and Condition");
      }
    }
  }
}
function setdata(obj) {
  console.log(obj);
  allusers = JSON.parse(localStorage.getItem("users"));
  allusers.push(obj);
  localStorage.setItem("users", JSON.stringify(allusers));
}
function adminchk() {
  allusers = JSON.parse(localStorage.getItem("users"));
  for (var index = 0; index < allusers.length; index++) {
    if (allusers[index].status == "admin") {
      adminflag = 1;
    }
  }
  if (adminflag == 0) {
    document.getElementById("adminregistration").innerHTML =
      "<input type='button' value='Registration Now' onclick='registrationview()'>";
  }
}
function registrationview() {
  location.href = "registration.html";
}
function logincheck() {
  var loginemail = document.getElementById("loginemail").value;
  var loginpassword = document.getElementById("loginpassword").value;
  if (loginemail == "" && loginpassword == "") {
    alert("invalide username and password");
  } else {
    allusers = JSON.parse(localStorage.getItem("users"));
    var flag = 0;
    for (var index = 0; index < allusers.length; index++) {
      if (
        allusers[index].email == loginemail &&
        allusers[index].password == loginpassword
      ) {
        flag = 1;
        if (allusers[index].status == "admin") {
          localStorage.setItem("currentuser", allusers[index].name);

          location.href = "dashboard.html";
        } else {
          localStorage.setItem("currentuser", allusers[index].name);
          location.href = "sub-user.html";
        }
      }
    }
    if (flag == 0) {
      alert("invalide username and password");
    }
  }
}
function logintime() {
  logintime = new Date().toString();
  usrbdaymsgforuser();
}
function adduser() {
  validation = 0;
  var username = document.getElementById("username").value;
  var useremail = document.getElementById("useremail").value;
  var userpassword = document.getElementById("userpassword").value;
  var userbirthdate = document.getElementById("userbirthdate").value;
  var regname = /^[a-zA-Z]*$/;
  if (
    username == "" &&
    useremail == "" &&
    userpassword == "" &&
    userbirthdate == ""
  ) {
    alert("All Fields are Required");
  } else {
    if (!regname.test(username)) {
      alert("user name must in string");
      validation = 1;
    }
    if (validation == 0) {
      if (hidden.value == "") {
        var city = "";
        var state = "";
        var status = "user";
        allusers = JSON.parse(localStorage.getItem("users"));
        puid = allusers.length + 1;
        user1 = new user(
          puid,
          username,
          useremail,
          userpassword,
          city,
          state,
          userbirthdate,
          status
        );
        setdata(user1);

        displayusers();
      } else {
        addbtn.value = "update";
        allusers = JSON.parse(localStorage.getItem("users"));

        for (var index = 0; index < allusers.length; index++) {
          if (allusers[index].uid == uid) {
            allusers[index].name = username;
            allusers[index].email = useremail;
            allusers[index].password = userpassword;
            allusers[index].birthday = userbirthdate;
          }
        }
        console.log(allusers);
        localStorage.setItem("users", JSON.stringify(allusers));
        displayusers();
      }
    }
  }
}
function displayusers() {
  cusr = localStorage.getItem("currentuser");
  document.getElementById("admin_name").textContent = cusr;
  allusers = JSON.parse(localStorage.getItem("users"));
  var tbl = "";
  for (var index = 0; index < allusers.length; index++) {
    if (allusers[index].status == "user") {
      tbl +=
        "</td><td>" +
        allusers[index].name +
        "</td><td>" +
        allusers[index].email +
        "</td><td>" +
        allusers[index].password +
        "</td><td>" +
        allusers[index].birthday +
        "</td><td>" +
        allusers[index].age +
        "</td><td><input type='button' onclick='edituser(" +
        allusers[index].uid +
        ")' value='Edit'>" +
        "</td><td><input type='button' onclick='deleteuser(" +
        allusers[index].uid +
        ")' value='delete'>" +
        "</td></tr>";
    }
  }
  document.getElementById("display").innerHTML = tbl;
  tbl = "";
}
function edituser(puid) {
  allusers = JSON.parse(localStorage.getItem("users"));
  var tbl = "";
  for (var index = 0; index < allusers.length; index++) {
    if (allusers[index].uid == puid) {
      username.value = allusers[index].name;
      useremail.value = allusers[index].email;
      userpassword.value = allusers[index].password;
      userbirthdate.value = allusers[index].birthday;
      hidden.value = puid;
      uid = puid;
    }
  }
}
function deleteuser(uid) {
  allusers = JSON.parse(localStorage.getItem("users"));

  for (var index = 0; index < allusers.length; index++) {
    if (allusers[index].uid == uid) {
      allusers.splice(index, 1);
    }
  }
  console.log(allusers);
  localStorage.setItem("users", JSON.stringify(allusers));
  displayusers();
}

function slog() {
  currentusr = localStorage.getItem("currentuser");
  logouttime = new Date().toString();
  obj = new sessionlog(currentusr, logintime, logouttime);
  sesslog = JSON.parse(localStorage.getItem("sessionlog"));
  console.log(obj);
  sesslog.push(obj);
  localStorage.setItem("sessionlog", JSON.stringify(sesslog));
}
function allsession() {
  cusr = localStorage.getItem("currentuser");
  document.getElementById("admin_name").textContent = cusr;
  sesslog = JSON.parse(localStorage.getItem("sessionlog"));
  var tbl = "";
  for (var index = 0; index < sesslog.length; index++) {
    tbl +=
      "</td><td>" +
      sesslog[index].name +
      "</td><td>" +
      sesslog[index].logintime +
      "</td><td>" +
      sesslog[index].logouttime +
      "</td></tr>";
  }
  document.getElementById("displaylog").innerHTML = tbl;
  tbl = "";
}
function usrbdaymsg() {
  allusers = JSON.parse(localStorage.getItem("users"));
  thisonth = new Date().getMonth();
  thisdate = new Date().getDate();
  cusr = localStorage.getItem("currentuser");
  for (var index = 0; index < allusers.length; index++) {
    console.log(new Date(allusers[index].birthday).getMonth());
    if (
      thisonth == new Date(allusers[index].birthday).getMonth() &&
      thisdate == new Date(allusers[index].birthday).getDate()
    ) {
      document.getElementById("lblbirthday").innerHTML =
        "Today is " + allusers[index].name + "'s Birthday";
    }
  }
}
function usrbdaymsgforuser() {
  allusers = JSON.parse(localStorage.getItem("users"));
  thisonth = new Date().getMonth();
  thisdate = new Date().getDate();
  cusr = localStorage.getItem("currentuser");
  document.getElementById("admin_name").textContent = cusr;
  for (var index = 0; index < allusers.length; index++) {
    console.log(new Date(allusers[index].birthday).getMonth());
    if (
      thisonth == new Date(allusers[index].birthday).getMonth() &&
      thisdate == new Date(allusers[index].birthday).getDate()
    ) {
      if (allusers[index].name == cusr) {
        document.getElementById("userbirthday").innerHTML =
          "....Happy Birthday....";
      }
    }
  }
}
