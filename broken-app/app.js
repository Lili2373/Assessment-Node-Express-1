const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/', async (req, res) => {
  try {
    const { developers } = req.body;
    if (!developers || !Array.isArray(developers)) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const promises = developers.map(async (username) => {
      try {
        const { data } = await axios.get(`https://api.github.com/users/${username}`);
        return {
          name: data.name || 'N/A',
          bio: data.bio || 'N/A'
        };
      } catch (error) {
        console.error(`Error fetching data for ${username}:`, error.message);
        return {
          name: 'N/A',
          bio: 'N/A'
        };
      }
    });

    const developersInfo = await Promise.all(promises);
    res.json(developersInfo);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
