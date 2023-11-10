exports.pageNotFound=(req,res,next)=>{
    // res.status(404).send('<h1>Page not found</h1>');
    // res.status(404).sendFile(path.join(__dirname,'views','Page-not-found.html'));
    // res.status(404).sendFile(path.join(__dirname,'views','Page-not-found.html'));
    res.status(404).render('Page-not-found',{pageTitle:'Page Not Found',path:'/Page-not-found',
    isAuthenticated:req.session.isLoggedIn});
}