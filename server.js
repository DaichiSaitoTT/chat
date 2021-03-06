// setup =======================
var express        = require('express');
var chat           = require('./routes/chat');
var app            = express();
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var server         = require('http').createServer(app);
var io             = require('socket.io')(server);
var cookieParser   = require('cookie-parser');
var expressSession = require('express-session');
var csrf           = require('csurf');
var helmet         = require('helmet');

// ソケット通信の設定 =====================================================================================
io.on( 'connection', function( socket ) {

  socket.on('init', function(req) {
    io.to(req.room).emit('message', req.name + " さんが入室");
    socket.join(req.room);
  });

  socket.on( 'sendMessageToServer', function( data ) {
    console.log(data);
    // サーバーからクライアントへ メッセージを送り返し
    io.to(data.room).emit( 'sendMessageToClient', { value : data.value, name : data.name } );
  });

  socket.on('disconnect', function () {
    io.emit('user disconnected');
  });
});

// コンフィグ ==============================================================================================

// viewエンジンはejs
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public")); //staticファイルはpublicを探す
app.use(morgan('dev')); //デバッグ情報
app.use(bodyParser.urlencoded({'extended': 'true'})); //parser application/x-www-form-urlencoded
app.use(bodyParser.json()); // parser application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json'})); // parser application/vnd.api+json as json
app.use(methodOverride());
app.use(helmet()); // セキュリティ

//csrfの対策
app.use(cookieParser());
app.use(expressSession({secret: 'secret_key'}));
app.use(csrf());
app.use(function(req, res, next) {
  var token = req.csrfToken();
  res.locals.csrftoken = token;
  next();
});

// Routes ===================================================================================================
app.get('/', chat.index);
app.get('/chat', chat.room);

// ポート3000にサーバー開拓
server.listen(3000);
console.log("Port: 3000");
