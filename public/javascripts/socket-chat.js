$(document).ready(function(){

  // サーバーに接続
  var ioSocket = io.connect( 'http://localhost:3000' );

  // 接続処理
  ioSocket.on('connect', function() {
    // ※3 入室する部屋番号を送信
    // socket.json.emit('init', {'room': room, 'name': name});
  });

  // 切断処理
  ioSocket.on('disconnect', function() {
  });

  // サーバーからデータを受信
  ioSocket.on('sendMessageToClient', function(data) {
    appendMessage(data.value);
  });

  // 画面にメッセージを追記
  function appendMessage(text) {
    $('#messageView').append('<div>' + text + '</div>');
  }

  // 自分を含む全員宛にメッセージを送信
  $('#sendMessageBtn').click( function() {

    // メッセージの内容を取得し、その後フォームをクリア
    var message = $('#messageForm').val();
    $('#messageForm').val('');
    message = escapeHtml(message);
    console.log(message);

    // サーバーへデータを送信
    ioSocket.emit('sendMessageToServer', {value : message} );
  });
});
