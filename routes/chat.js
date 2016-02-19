exports.index = function(req, res) {
  res.render('index');
};

exports.room = function(req, res) {
  res.render('room');
  console.log(req.body);
};
