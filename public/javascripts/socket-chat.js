$(document).ready(function(){
  // チャットサーバーに接続
  var ioSocket = io.connect( "http://localhost:3000" );

  // サーバーからのデータ受け取り処理
  ioSocket.on( "connect", function() {} );
  ioSocket.on( "disconnect", function() {} );

  // サーバーからクライアントへの送り返し
  ioSocket.on( "s2c_message", function( data ) {
    appendMessage( data.value );
  });

  // 画面にメッセージを追記
  function appendMessage( text ) {
    $("#messageView").append( '<div>' + text + '</div>' );
  }

  // 自分を含む全員宛にメッセージを送信
  $("#sendMessageBtn").click( function() {

    // メッセージの内容を取得し、その後フォームをクリア
    var message = $("#messageForm").val();
    $("#messageForm").val("");
    message = escapeHtml(message);
    console.log(message);

    // クライアントからサーバーへ送信
    ioSocket.emit( "c2s_message", { value : message } );
  });
});
