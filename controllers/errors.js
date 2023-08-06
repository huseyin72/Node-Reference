module.exports.get404 = (req,res) =>{
    res.status(404);
    res.render('error/404',{title:'Page Not Found'});


}