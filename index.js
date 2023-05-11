import express from 'express';
import env from 'dotenv';

import database from './utils/database.js';
import Post from './schemas/Post.js';

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

env.config();

app.get('/', (req, res) => {
    Post.find()
        .sort({ createdAt: -1 })
        // .limit(10)
        .then(data => {
            res.render('home.pug', { posts: data });
        })
        .catch(error => {
            res.json(error);
        })
});

app.get('/privacy', (req, res) => {
    res.render('privacy.pug');
});

app.get('/info', (req, res) => {
    const title = Post.schema.path('title').options;
    const body = Post.schema.path('body').options;

    console.log(title)
    console.log(body)

    res.render('info.pug', {
        minTitleLength: title.min,
        maxTitleLength: title.max,
        minBodyLength: body.min,
        maxBodyLength: body.max
    });
});

app.post('/api/post', (req, res) => {
    const post = new Post({
        title: req.body.title,
        body: req.body.body
    });

    post.save()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            res.json(error);
        })
});

app.get('/post/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(data => {
            res.render('post.pug', { post: data });
        })
        .catch(error => {
            res.json(error);
        })
});

(async () => {
    await database();

    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})();