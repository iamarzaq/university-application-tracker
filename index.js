const express = require('express');
const appRoutes = require('./routes/appRoutes');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

// Send all /applications requests to the router
app.use('/applications', appRoutes);

app.listen(PORT, () => {
console.log(`Server is listening on http://localhost:${PORT}`);
});