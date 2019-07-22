//Some algorithm depends on Node.js
//invitation code get invitation code and convert them into json and send them to websocket
var baseUrl = `http://139.159.244.231:8080/auth`
async function signUpInfo() {
    //get invitation code
    var invitationCode = document.getElementById("invtcode").value;
    //get email
    var email = document.getElementById("email").value;
    if (validateEmail(email)){
        var result = {
            email: email,
            invitaution_code: invitationCode
        }
        var url = baseUrl + "/signup"
        sendForm(url,result,"signUp")
        var respData = sessionStorage.getItem("signUp")
        var jsonData = JSON.parse(respData)
        var succ = jsonData.SuccStatus
        if (succ == 1) {
            var password = jsonData["Password"]
            var url = "step2.html"
            sessionStorage.setItem("email",String(email))
            sessionStorage.setItem("pwd",String(password))
            document.location.href = url
        }
        else {
            alert("Please check your invitation code or email")
        }
    }
    else{
        alert("Please re-enter your email")
    }
}

//verifyinfo function verifies the password of a user
function verifyInfo(){
    var email = sessionStorage.getItem("email")
    var npassword = document.getElementById("npwd").value
    var rpassword = document.getElementById("rpwd").value
    var url = baseUrl + '/time'
    getFrom(url,"timeNowCPWD")
    var now = JSON.parse(sessionStorage.getItem("timeNowCPWD"))["CurrentTimeStamp"]
    var signatureRaw = String(email) + "+" + String(sessionStorage.getItem("pwd")) + "+" + now
    var signatureHash = md5(signatureRaw)
    if (npassword == rpassword){
        var password = rpassword
        var result = {
            email: email,
            new_password: password,
            signature: signatureHash,
            timeStamp: now
        }
        var url = baseUrl + "/changepassword"
        sendForm(url, result, "cpwd")
        var respData = sessionStorage.getItem("cpwd")
        var jsonData = JSON.parse(respData)
        var succ = jsonData.SuccStatus
        if(succ == 1){
            sessionStorage.setItem("firstTime","True")
            sessionStorage.setItem("pwd",password)
            var nextUrl = "index.html"
            document.location.href = nextUrl
        }
        else{
            alert("Please check your verification code")
        }
    }
    else{
        alert("Please check your new passwords")
    }
}

function signIn(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("pwd").value;
    var ex = 1
    var url = baseUrl + '/time'
    getFrom(url, "timeNowSignIn")
    if(sessionStorage.getItem("email") == null){
         sessionStorage.setItem("email",email)
    }
    sessionStorage.setItem("username", String(email).split("@")[0]) 
    var now = JSON.parse(sessionStorage.getItem("timeNowSignIn"))["CurrentTimeStamp"]
    var signatureRaw = String(email) + "+" + String(password) + "+" + now
    var signatureHash = md5(signatureRaw)
    var result = {
        email: email,
        signature: signatureHash,
        is_expire: ex,
         timeStamp: now
     }
     alert(JSON.stringify(result))
     var url = baseUrl + "/signin"
     sendForm(url,result,"signedIn")
     var respData = sessionStorage.getItem("signedIn")
     var jsonData = JSON.parse(respData)
     var succ = jsonData.SuccStatus
    //  if (succ == 1) {
    //     var nextUrl = "chat.html"
    //     document.location.href = nextUrl
    //  }
    //  else {
    //     alert("Please check your email or password")
    //  }
}

//Post data to API to get necessary data and verification
function sendForm(url, data, sessionName) {
    var formData = new FormData()
    for (key in data) {
        formData.append(key, data[key]);
    }

    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log(xhr.responseText)
            response = xhr.responseText
            sessionStorage.setItem(sessionName, String(response))
        }
    }

    xhr.send(formData);

    return false;
}

//Get from API
function getFrom(url, sessionName) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log(xhr.responseText)
            response = xhr.responseText
            sessionStorage.setItem(sessionName, String(response))
        }
    }
    xhr.send();
}

//Validate whether email input is valid
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

//Go to Sign Up Page
function signUp() {
    var url = "signUp.html"
    document.location.href = url
}