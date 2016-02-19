// サーバーに接続
var ioSocket = io.connect( 'http://localhost:3000' );

// 接続処理
function chat(room, name) {
  ioSocket.on('connect', function() {
    ioSocket.emit('init', {'room': room, 'name': name});
  });

  // 切断処理
  ioSocket.on('disconnect', function() {
  });

  // サーバーからデータを受信
  ioSocket.on('sendMessageToClient', function(data) {
    appendMessage(data.value, data.name);
  });
}

// 画面にメッセージを追記
function appendMessage(text, name) {
  $('#messageView').append('<div>' + name + ":" + text + '</div>');
}

// メッセージを送信
function send(room, name) {
  // メッセージの内容を取得し、その後フォームをクリア
  var message = $('#messageForm').val();
  $('#messageForm').val('');
  message = escapeHtml(message);

  // サーバーへデータを送信
  ioSocket.emit('sendMessageToServer',
                {value : message, name: name, room: room} );
}
