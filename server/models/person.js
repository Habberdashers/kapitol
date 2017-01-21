import mongoose from 'mongoose'; 

var personSchema = mongoose.Schema({
	name: {
		type: String, 
		requied: true 
	}, 
	state: {
		type: String, 
		required: true
	}, 
	district: {
		type: String,
		required: true
	}, 
	party: {
		type: String, 
		required: true
	}
})

const Person = mongoose.model('Person', personSchema); 

module.exports = Person; 