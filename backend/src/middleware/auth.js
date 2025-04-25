export const isLoggedIn = (req, res, next) => {
    if (req.session.usuario) {
      next();
    } else {
      res.redirect('/login');
    }
  };
  
  export const isLoggedOut = (req, res, next) => {
    if (!req.session.usuario) {
      next();
    } else {
      res.redirect('/profile');
    }
  };