const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/', async (req, res) => {
  try {
    const { developers } = req.body;
    const promises = developers.map(async (username) => {
      const { data } = await axios.get(`https://api.github.com/users/${username}`);
      return {
        name: data.name,
        bio: data.bio
      };
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
