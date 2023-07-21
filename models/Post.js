import db from '../utils/database.js';

import { DataTypes } from 'sequelize';

const Post = db.define('Post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [5, 50]
        }
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [5, 500]
        }
    }
});

export default Post;