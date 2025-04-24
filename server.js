const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Expanded data lists
const nemesisVenues = [
    "an opera house", "a dusty library", "a high-tech laboratory", "a forgotten temple",
    "a bustling marketplace", "a secret underground bunker", "a luxurious casino", "an abandoned amusement park",
    "a zero-gravity chamber", "a virtual reality cafe", "a cryptic museum", "a time-traveling train",
    "an ancient observatory", "a cryogenic sleep facility", "a dimensionally-shifted Denny's",
    "a cloud city", "a sentient swamp", "the backrooms of a Circuit City", "a moon base cantina",
    "a rogue asteroid mining rig", "a reality TV show set", "a wizard's tower (slightly tilted)",
    "the lost city of Atlantis (gift shop)", "a ninja training dojo (on casual Friday)", "a dragon's hoard (mostly beanie babies)"
];

const nemesisLocations = [
    "Tokyo, Japan", "Buenos Aires, Argentina", "Mount Everest", "Berlin, Germany",
    "Mariana Trench", "Marrakech, Morocco", "Siberian Wilderness", "Geneva, Switzerland",
    "Monaco", "Low Earth Orbit", "Angkor Wat, Cambodia", "Pripyat, Ukraine",
    "Silicon Valley, USA", "Anaheim, USA", "Your Closet", "Paris Catacombs",
    "The Australian Outback", "Antarctica Station Zero", "Rio de Janeiro Rooftops", "The Bermuda Triangle",
    "Vladivostok Station", "Area 51 (cafeteria)", "Hollywood Backlot", "Inside a Volcano",
    "The North Pole's Workshop", "The Nile River Delta", "On a Blimp over London", "Easter Island Heads (behind one)"
];

// Updated reasons with a user-centric angle
const nemesisReasons = [
    "they remembered that time you didn't hold the elevator.",
    "they're still mad you finished the coffee pot and didn't make more.",
    "they saw you use 'Reply All' unnecessarily.",
    "they found out you secretly like pineapple on pizza.",
    "they never forgave you for spoiling the ending of that movie.",
    "they're practicing their monologue about your questionable music taste.",
    "they're plotting revenge for that passive-aggressive email you sent.",
    "they overheard you saying 'GIF' with a hard G.",
    "they're still waiting for you to return that pen you borrowed.",
    "they know you didn't *really* read the terms and conditions.",
    "they saw you double-dip the chip.",
    "they're salty you beat them in Mario Kart that one time.",
    "they're composing a diss track about your parking skills.",
    "they suspect you're the reason the office microwave smells weird.",
    "they're upset you never invite them to your cool villain parties.",
    "they know you pronounce 'espresso' as 'expresso'.",
    "they're still thinking about that awkward silence you caused.",
    "they saw you put the toilet paper roll on the wrong way.",
    "they think your pet is judging them.",
    "they're convinced you took the last good donut."
];

// Separate hash function for more variation (or use parts of one hash)
function simpleHash(str, seed = 0) {
    let hash = seed;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
}

// Basic Twitter handle format regex (alphanumeric + underscore, 1-15 chars)
const twitterRegex = /^[a-zA-Z0-9_]{1,15}$/;

// Serve static files from the 'public' directory
// We'll move index.html, style.css, script.js there later
app.use(express.static('public'));

app.get('/nemesis', (req, res) => {
    const username = req.query.username;

    if (!username || typeof username !== 'string' || username.trim() === '') {
        return res.status(400).json({ error: 'Username query parameter is required.' });
    }

    const trimmedUsername = username.trim().replace(/^@/, ''); // Remove leading @ if present

    // Validate format on server
    if (!twitterRegex.test(trimmedUsername)) {
        return res.status(400).json({ error: 'Invalid X/Twitter username format.' });
    }

    // Generate indices using the hash function with different seeds
    const hashVenue = simpleHash(trimmedUsername, 1);
    const hashLocation = simpleHash(trimmedUsername, 2);
    const hashReason = simpleHash(trimmedUsername, 3);

    const venueIndex = hashVenue % nemesisVenues.length;
    const locationIndex = hashLocation % nemesisLocations.length;
    const reasonIndex = hashReason % nemesisReasons.length;

    const nemesisVenue = nemesisVenues[venueIndex];
    const nemesisLocation = nemesisLocations[locationIndex];
    const nemesisReason = nemesisReasons[reasonIndex];

    setTimeout(() => {
        // Log the generation results
        console.log(`[Nemesis Log] User: @${trimmedUsername}, Venue: ${nemesisVenue}, Location: ${nemesisLocation}, Reason: ${nemesisReason}`);

        res.json({
            username: trimmedUsername,
            venue: nemesisVenue,
            location: nemesisLocation,
            reason: nemesisReason
        });
    }, 500); // 500ms delay
});

// Fallback to index.html for single-page application routing (optional but good practice)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});


app.listen(port, () => {
    console.log(`Nemesis server listening at http://localhost:${port}`);
}); 