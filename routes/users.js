var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
require('dotenv').config();
const { authenticate } = require('../secretInfo/verifyToken');

const { DB_USER, DB_NAME, DB_HOST, DB_PASS } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql', 
});

const User = sequelize.define('User', {
  UserID: {
    type: Sequelize.INTEGER, // Assuming UserID is an integer
    primaryKey: true, // Specify UserID as the primary key
    autoIncrement: true, // Specify auto-increment
  },
  Email: Sequelize.STRING,
  Password: Sequelize.STRING,
  FullName: Sequelize.STRING,
  Pronouns: Sequelize.STRING,
  UserCategory: Sequelize.STRING,
  UserAvatar: Sequelize.STRING,
  UserBio: Sequelize.STRING,
  UserWeb: Sequelize.STRING,
}, {
  timestamps: false, // Disable timestamps
});



const Posts = sequelize.define('Posts', {
  id: {
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
  },
  UserId: {
    type: Sequelize.INTEGER, 
    allowNull: false, 
  },
  Title: Sequelize.STRING,
  Category: Sequelize.STRING,
  Body: Sequelize.TEXT,
  Image1: Sequelize.STRING,
  Image2: Sequelize.STRING,
  Image3: Sequelize.STRING,
  Video: Sequelize.STRING,
  
}, {
  timestamps: false, // Disable timestamps
});

// Associations
Posts.belongsTo(User, { foreignKey: 'UserId' });
User.hasMany(Posts, { foreignKey: 'UserId' });



/* Input from Profile Form to update the following values inside the table User: 
    FullName
    Pronouns
    UserCategory 
    UserAvatar
    UserBio
    UserWeb

    input from admin code:
    authenticate (to see if the user is autenticated)
    if the UserId and the Email are found)
    */



// postman http://localhost:5001/users

router.put('/profile',authenticate, async (req, res) => {
  try {
    
   
    const {FullName, Pronouns, UserCategory, UserAvatar, UserBio, UserWeb} = req.body;


    // UserID exists ?
    const user = await User.findOne({
      where: {
            UserID: req.userId,
            Email: req.email,
      },
    });

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    const NewFullName = FullName;  
      
    // Update profile
      await user.update({
      FullName: NewFullName || user.FullName,
      Pronouns: Pronouns || null,
      UserCategory: UserCategory || null,
      UserAvatar: UserAvatar || null,
      UserBio: UserBio || null,
      UserWeb: UserWeb || null,
    });

    res.json({ message: 'Profile Updated', user: user.toJSON() }); 
  } catch (error) {
      console.error(error);
      console.log(error);
    res.status(500).json({ error: 'Profile Update failed' });
  }
});


//Shows all the post of the authenticated USER

// postman http://localhost:5001/users/my_posts

router.get('/my_posts', authenticate, async (req, res) => {
  try {
    
    //is authenticated?
    if (!req.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Searching for users
    const user = await User.findOne({
      where: {
        UserID: req.userId,
        
            
      },
    });

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    // Searching for posts
    const posts = await Posts.findAll({
      where: {
        UserID: req.userId,
             
      },
    });


    // Shows if User has any posts or not 
    if (posts.length > 0 ) {
      res.json({
        message: 'Found it', posts });
    } else {
      res.json({ message: 'This User has no Posts yet ;)' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


module.exports = router;


