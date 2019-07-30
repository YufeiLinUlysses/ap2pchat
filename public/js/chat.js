//Create a User profile, include username and an arbitary avatar
const possibleEmojis = [
    '🐀', '🐁', '🐭', '🐹', '🐂', '🐃', '🐄', '🐮', '🐅', '🐆', '🐯', '🐇', '🐐', '🐑', '🐏', '🐴',
    '🐎', '🐱', '🐈', '🐰', '🐓', '🐔', '🐤', '🐣', '🐥', '🐦', '🐧', '🐘', '🐩', '🐕', '🐷', '🐖',
    '🐗', '🐫', '🐪', '🐶', '🐺', '🐻', '🐨', '🐼', '🐵', '🙈', '🙉', '🙊', '🐒', '🐉', '🐲', '🐊',
    '🐍', '🐢', '🐸', '🐋', '🐳', '🐬', '🐙', '🐟', '🐠', '🐡', '🐚', '🐌', '🐛', '🐜', '🐝', '🐞',
];
function randomEmoji() {
    var randomIndex = Math.floor(Math.random() * possibleEmojis.length);
    return possibleEmojis[randomIndex];
}

const emoji = randomEmoji();
const name = window.sessionStorage.getItem("username");

//Generate a chat html if first time chatting, haven't check if first time
if (!location.hash) {
    location.hash = Math.floor(Math.random() * 0xFFFFFF).toString(16);
}
const chatHash = location.hash.substring(1);

//Open a websocket chatting
var ws = new WebSocket("ws://localhost:7000/ws")

// ws.onopen = function (evt) {
//    
// };

ws.onmessage = function (evt) {
    updateBoard(evt.data)
    //clear input field
    document.getElementById("messageinput").value = ""
};

ws.onclose = function (evt) {
    console.log("Connection closed.");
};

function updateBoard(data){
    var brd = document.getElementById("board")
    var msg = JSON.parse(data)
    var fixedMsg = wbr(msg.message,10)
    var tpl = document.getElementById("chatbubble")
    var clon = tpl.content.cloneNode(true)
    var title = emoji + msg.sender
    var msgFrame = clon.getElementById("msgframe")
    var sender = clon.getElementById("sender")
    var msgbubble = clon.getElementById("msgbubble")
    sender.innerHTML = title
    if (msg.sender == name) {
        msgFrame.classList.add("message--mine")
    }
    else {
        msgFrame.classList.add("message--theirs")
    }
    msgbubble.innerHTML = fixedMsg
    brd.appendChild(clon)
    brd.scrollTop = brd.scrollHeight - brd.clientHeight
}

function wbr(str, num) {
    return str.replace(RegExp("(\\w{" + num + "})(\\w)", "g"), function (all, text, char) {
        return text + "<wbr>" + char;
    });
}

function onSendClick() {
    if (ws.readyState != WebSocket.OPEN) {
        console.error("webSocket is not open: " + ws.readyState);
        return;
    }
    var msg = document.getElementById("messageinput").value;
    var now = getTime()
    ws.send(
        JSON.stringify({
            sender: name,
            message: msg,
            time: now
        }))
}

function getTime(){
    var d = new Date();

    var month = d.getMonth() + 1;
    var day = d.getDate();
    var hour = d.getHours()
    var min = d.getMinutes()
    var sec = d.getSeconds()

    var output = d.getFullYear() +
        (month < 10 ? '0' : '') + month +
        (day < 10 ? '0' : '') + day + 
        (hour < 10 ? '0' : '') + hour + 
        (min < 10 ? '0' : '') + min + 
        (sec < 10 ? '0' : '') + sec;
        
    return String(output)
}