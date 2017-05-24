
let stompClient = null;

function setConnected(connected) {
    $('#connect').prop("disabled", connected);
    $('#disconnect').prop("disabled", connected);

    if (connected) {
        $('#conversation').show();
    } else {
        $('#conversation').hide();
    }

    $('#greetings').html("");
}


function connect() {
    let socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({},(frame) => {
        setConnected(true);
        console.log(`Connected ${frame}`);

        stompClient.subscribe('/topic/greetings',(greeting) => {
            showGreeting(JSON.parse(greeting.body).content);
        })
    });
}

function sendName(){
    let name = $('#name').val();

    stompClient.send("/app/hello",{},JSON.stringify({"name": name}));

    $('#name').val('');
}

function disconnect() {
    if(stompClient != null) {
        stompClient.disconnect();
    }

    setConnected(false);
    console.log('Disconnected');
}

function showGreeting(content) {
    $('#greetings').append("<tr><td>" + content + "</td></tr>");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendName(); });
});