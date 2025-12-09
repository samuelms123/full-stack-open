const mongoose = require('mongoose');

if (process.argv.length !== 3 && process.argv.length !== 5) {
	console.log('Usage: node mongo.js <password> ["Name" number]');
	process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

// Hardcoded DB user and database name as requested
const dbUser = 'personadmin';
const dbName = 'phonebook_db';

const url = `mongodb+srv://${dbUser}:${password}@windsurf-cluster.aynwmzw.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=windsurf-cluster`;

mongoose.set('strictQuery', false);

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
});

const Person = mongoose.model('Person', personSchema);

const main = async () => {
	await mongoose.connect(url);

	if (process.argv.length === 3) {
		const persons = await Person.find({});
		persons.forEach((p) => console.log(`${p.name} ${p.number}`));
	} else if (process.argv.length === 5) {
		const person = new Person({ name, number });
		await person.save();
		console.log(`added ${name} number ${number} to phonebook`);
	}

	await mongoose.connection.close();
};

main().catch((err) => {
	console.error('Error:', err.message);
	mongoose.connection.close();
});

