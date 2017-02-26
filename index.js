var 	express 	=	require('express'),
		router 	=	express(),
		port 		=	process.env.PORT || 8080,
		app		=	express();

app.use('/', express.static('build'));

app.listen(port, function () {
  console.log('Serving on port ' + port)
});
