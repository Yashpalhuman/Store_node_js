const User=require('../models/user');


exports.getLogin = (req, res, next) => {
  // const isLoggedIn=req.get('Cookie').split('=')[1]==='true';
  console.log(req.session.isLoggedIn);
  // console.log(req.get('Cookie'));
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated:false
  });
};

exports.postLogin = (req, res, next) => {
  // req.isLoggedIn=true;
  // res.setHeader('Set-Cookie','loggedIn=true; HttpOnly');
  User.findById('653d87d4e85026a28f65cc0c').then(user=>{
    req.session.isLoggedIn=true;
    req.session.user=user;
    req.session.save((err)=>{
      console.log(err);
      res.redirect('/');
    })
  })
  .catch(err=>console.log(err));
  // req.session.isLoggedIn=true;
};
exports.postLogout = (req, res, next) => {
  // req.isLoggedIn=true;
  // res.setHeader('Set-Cookie','loggedIn=true; HttpOnly');

  req.session.destroy((err=>{
    console.log(err);
    res.redirect('/');
  }))
};
