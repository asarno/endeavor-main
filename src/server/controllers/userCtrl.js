const databaseCtrl = require('./databaseCtrl');

function loginUser (req, res) {
  console.log('THIS IS THE PASSPORT STUFF', req.user);
  databaseCtrl.setUserData(req.user, (userData) => {
    res.cookie('cookieId', userData.id, { maxAge: 900000, httpOnly: true })
    res.redirect('/');
  });
}

function getUserInfo (req, res) {
  databaseCtrl.getUserData(req.cookies.cookieId)
  .then( (userData) => {
    console.log(userData);
    res.json(userData);
  });
}

module.exports = {
  loginUser,
  getUserInfo
};