const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoose = require('mongoose');
const url = 'mongodb+srv://admin-Cecilia:Cr020199@cluster0.nazzt.mongodb.net/iService?retryWrites=true&w=majority';
mongoose
	.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.catch((p) => {
		console.log(p);
	});
app.use(express.static(path.join(__dirname, 'public')));

const router = require('./routes/route');
const authRoutes = require('./routes/auth');

app.set('view engine', 'ejs');

app.use('/register', router);
app.use('/auth', authRoutes);

app.use((req, res, next) => {
	res.redirect('/auth/login');
});

let port=process.env.PORT;
if(port==null||port==""){
	port=8080;
}
app.listen(port, (req,res) => {
	console.log('Server is running');
});