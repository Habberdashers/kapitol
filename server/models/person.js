import mongoose from 'mongoose'; 

var personSchema = mongoose.Schema({
	name: {
		type: String, 
		requied: true 
	}
})

const Person = mongoose.model('Person', personSchema); 

module.exports = Person; 