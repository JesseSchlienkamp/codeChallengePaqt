const express = require('express');
const app = express();
const port = 3000;

const { bewoners, beschikkingen, taxiBedrijven, rides } = require('./mockData');

app.use(express.json());

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

// Fetch bewoners
app.get('/bewoners', (req, res) => {
    res.json(bewoners);
});

// Rit boeken
app.post('/boek-rit', (req, res) => {
    //Geef aan voor wie je een rit boekt, en hoe ver.
    const { bewonerId, kilometers } = req.body;

    //Check of bewoner wel mag rijden met taxi
    const beschikking = beschikkingen.find(b => b.residentId === bewonerId && b.valid);
    if (!beschikking) {
        return res.status(404).json({ message: 'Beschikking not found or invalid' });
    }

    //Check of er genoeg budget is
    if (beschikking.budgetKm < kilometers) {
        return res.status(400).json({ message: 'Insufficient budget' });
    }

    //Trek de kilometers af van het beschikbare budget
    beschikking.budgetKm -= kilometers;
    const bewoner = bewoners.find(b => b.id === bewonerId);

    ///Schrijf de rit weg
    rides.push({ bewonerId, kilometers, taxiBedrijf: taxiBedrijven.find(t => t.perceel === bewoner.perceel).naam });

    res.json({ message: 'Rit successfully booked', remainingBudget: beschikking.budgetKm });
});

// Fetch ritten voor taxi bedrijf
app.get('/rides', (req, res) => {

    const { taxiBedrijf } = req.query;

    // Check of taxiBedrijf is meegegeven
    if (!taxiBedrijf) {
        return res.status(400).json({ message: 'Please specify a taxiBedrijf query parameter.' });
    }

    //Check of taxiBedrijf wel bestaat
    const taxiExists = taxiBedrijven.some(taxi => taxi.naam === taxiBedrijf);
    if (!taxiExists) {
        return res.status(404).json({ message: `TaxiBedrijf with naam ${taxiBedrijf} not found.` });
    }



    const filteredRides = rides.filter(ride => ride.taxiBedrijf === taxiBedrijf);

    // Check of er ritten zijn
    if (filteredRides.length === 0) {
        return res.status(404).json({ message: `No rides found for taxiBedrijf ${taxiBedrijf}.` });
    }

    // Return de ritten
    res.json(filteredRides);
});

// Reset budgetten handmatig met API call
app.post('/reset-budgetten', (req, res) => {

    beschikkingen.forEach(beschikking => {
        if (beschikking.valid) {
            beschikking.budgetKm = 100; // Or logic to calculate new budget
        }
    });
    res.json({ message: 'Budgetten successfully reset' });
});

// Reset budgetten op Timer   
const schedule = require('node-schedule');

// Schedule a job to reset budgets annually on January 1st at 00:00
schedule.scheduleJob('0 0 0 1 1 *', () => {
    beschikkingen.forEach(beschikking => {
        if (beschikking.valid) {
            // Reset naar nieuwe standaard
            beschikking.budgetKm = 100;
        }
    });
    console.log('Budgets have been reset.');
});


module.exports = app;