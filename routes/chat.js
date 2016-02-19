exports.index = function(req, res) {
  res.render('index');
};

exports.room = function(req, res) {
  res.render('room', { room: req.query.room, name: "DDD"});
  console.log(req.body);
};
