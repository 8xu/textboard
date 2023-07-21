import express from 'express';
import env from 'dotenv';

import Post from './models/Post.js';

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

env.config();

app.get('/', (req, res) => {
    Post.findAll()
        .then(data => {
            res.render('home.pug', { posts: data });
        })
        .catch(error => {
            res.json(error);
        });
});

app.get('/privacy', (req, res) => {
    res.render('privacy.pug');
});

app.post('/api/post', (req, res) => {
    const { title, body } = req.body;

    Post.create({ title, body })
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            res.json(error);
        });
});

app.get('/post/:id', (req, res) => {
    const id = req.params.id;

    Post.findByPk(id)
        .then(data => {
            res.render('post.pug', { post: data });
        })
        .catch(error => {
            res.json(error);
        });
});

const PORT = process.env.PORT || 3000;
(async () => {
    await Post.sync();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})();