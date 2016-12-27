
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Landing OR Home Page' });
};
