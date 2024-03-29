const express = require('express');
const mongoose = require('mongoose');
const Customer = require('./models/customer');
const customer = require('./models/customer');
const cors = require('cors');
// const dotenv = require('dotenv');
// dotenv.config();

const app = express();
mongoose.set('strictQuery', false);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true})); // add middleware able to allow data passed in through the body.

// if(process.env.NODE_ENV !== 'production') {
// 	dotenv.config();
// }

if(process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const PORT = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION;

const customers = [
	{
		"name": "Seif",
		"industry": "Music"
	},
	{
		"name": "John",
		"industry": "Audio"
	},
	{
		"name": "Paulo",
		"industry": "videos"
	},
];

// const customer = new Customer({
// 	"name": 'caleb',
// 	industry: 'marketing'
// });
    
app.get('/', (req, res) => {
	res.send("Welcome!");
});

app.get('/api/customers', async (req, res) => {
	// console.log(await mongoose.connection.db.listCollections().toArray());
	try{
		const result = await Customer.find(); // Customer are schema 
		res.json({"customers": result});
	} catch(e){
		res.status(500).json({error: e.message});
	}
});

app.get('/api/customers/:id/', async(req, res) => {
	console.log({
		requestParams: req.params,
		requestQuery: req.query
	});
	try{
		const {id: customerId} = req.params;
		console.log(customerId);
		const customer = await Customer.findById(customerId);
		console.log(customer);
		if(!customer){
			res.status(404).json({error: 'User not found'});
		} else {
			res.json({customer});
		}
	} catch(e){
		console.log(e.message);
		res.status(500).json({error: 'something went wrong'});
	}
});

app.put('/api/customers/:id', async (re, res) => {
	try {
	const customerId = req.params.id;
	const customer = await Customer.findOneAndReplace({_id: customerId}, req.body, {new: true});
	console.log(customer);
	res.json({customer});
	} catch	(e) {
		console.log(e.message);
		res.status(500).json({error: 'something went wrong'});
	}	
});

app.patch('/api/customers/:id', async (re, res) => {
	try {
	const customerId = req.params.id;
	const customer = await Customer.findOneAndUpdate({_id: customerId}, req.body, {new: true});
	console.log(result);
	res.json({customer});
	} catch	(e) {
		console.log(e.message);
		res.status(500).json({error: 'something went wrong'});
	}	
});

app.patch('/api/orders/:id', async(req, res) => {
	console.log(req.params);
	const orderId = req.params.id;
	req.body._id = orderId;
	try {
		await customer.findOneAndUpdate(
			{ 'order._id' : orderId },
			{ $set: { 'order.$': req.body } },
			{ new: true }
		);

		console.log(result);
		
		if(result){
			res.json(result);
		}else {
			res.status(404).json({error: 'Order not found'});
		}
	} catch (e) {
		console.log(e.message);
		res.status(500).json({error: 'something went wrong'});
	}
});

app.get('/api/orders/:id', async(req, res) => {
	try{
		const result = await Customer.findOne({'orders._id': req.params.id});
		if(result){
			res.json(result);
		}else {
			res.status(404).json({error: 'Order not found'});
		}
	} catch (e) {
		console.log(e);
		res.status(500).json({error: 'something went wrong'});
	}
});

app.delete('/api/customers/:id', async(req, res) => {
	try {
	const customerId = req.params.id;
	const result = await Customer.dedeteOne({_id: customerId});
	res.json({deletedCount: result.deleted});
	} catch	(e) {
		res.status(500).json({error: 'something went wrong'});
	}	
});

app.post('/api/customers', async(req, res) => {
	console.log(req.body);
	const customer = new Customer(req.body);
	try{
		await customer.save();
		res.status(201).json({customer});
	} catch(e) {
		res.status(400).json({error: e.message});
	}
	// res.send(req.body);
});

app.listen(PORT, () => {
	console.log('App listening on port' + PORT);
});

const start = async() => {
	try{
		await mongoose.connect(CONNECTION);

		app.listen(PORT, () => {
			console.log('App listen on port' + PORT);
		});
	} catch(e) {
		console.log(e.message)	
	}
};



// const http = require('http');

// const server = http.createServer((req, res) => {
// 	res.statusCode = 200;
// 	res.setHeader('Content-Type', 'text/html');
// 	res.end('<h1>Welcome to my page!</h1>');
// });

// server.listen(3000,'127.0.0.1', () => {
// 	console.log('Server nunning...');
// });