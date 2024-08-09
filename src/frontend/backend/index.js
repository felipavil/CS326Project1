import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import Database from './database.js';
import fs from 'fs';

const app = express();
const PORT = 3260;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, '../')));

const db = await Database();

// Function to populate database from substitutes.txt
const populateDatabaseFromFileSync = () => {
    try {
        const data = fs.readFileSync(path.join(__dirname, '../substitutes.txt'), 'utf8');
        const lines = data.split('\n');
        for (const line of lines) {
            const [ingredient, substitute] = line.split(': ');
            if (ingredient && substitute) {
                db.addSubstitute(ingredient.trim().toLowerCase(), substitute.trim());
                console.log(`Added: ${ingredient.trim().toLowerCase()} -> ${substitute.trim()}`);
            }
        }
    } catch (err) {
        console.error('Error reading substitutes.txt:', err);
    }
};


populateDatabaseFromFileSync();


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// API routes for substitutes
app.get('/api/substitutes', async (req, res) => {
    const ingredient = req.query.ingredient;
    const result = await db.getSubstituteByIngredient(ingredient);
    if (result.status === "ok" && result.data.length > 0) {
        res.json({ substitute: result.data[0].substitute });
    } else {
        res.json({ substitute: "No substitute found for this ingredient." });
    }
});

app.post('/api/add-substitute', async (req, res) => {
    const { ingredient, substitute } = req.body;
    const result = await db.addSubstitute(ingredient, substitute);
    if (result.status === "ok") {
        // Append to substitutes.txt
        try {
            const formattedEntry = `${ingredient}: ${substitute}\n`;
            fs.appendFileSync(path.join(__dirname, '../substitutes.txt'), formattedEntry, 'utf8');
            res.json({ status: "ok", message: "Substitute added successfully." });
        } catch (err) {
            console.error('Error writing to substitutes.txt:', err);
            res.status(500).json({ status: "error", error: "Failed to write to substitutes.txt." });
        }
    } else {
        res.status(400).json({ status: "error", error: "Failed to add substitute." });
    }
});

app.put('/api/update-substitute', async (req, res) => {
    const { ingredient, substitute } = req.body;
    const result = await db.addSubstitute(ingredient, substitute);
    if (result.status === "ok") {
        res.json({ status: "Success", message: "Substitute updated." });
    } else {
        res.status(400).json({ status: "Error", message: "Failed to update substitute." });
    }
});

app.delete('/api/delete-substitute', async (req, res) => {
    const { ingredient } = req.body;
    const result = await db.deleteSubstitute(ingredient);
    if (result.status === "ok") {
        res.json({ status: "Success", message: "Substitute deleted." });
    } else {
        res.status(400).json({ status: "Error", message: "Failed to delete substitute." });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
