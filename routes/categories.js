var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
require('dotenv').config();
const { DB_USER, DB_NAME, DB_HOST, DB_PASS } = process.env;



const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql', 
});

const ArtCategories = sequelize.define('ArtCategories', {
    Category: Sequelize.STRING,
  }, {
    timestamps: false, // Disable timestamps
});
 

//console.log(ArtCategories);

// postman http://localhost:5001/categories

/* GET ART CATEGORIES listing is working*/
router.get('/art_categories', async (req, res, next) => {
    try {
     
      const Categories = await ArtCategories.findAll();
  
      console.log(Categories);
      
      const formattedCategories = Categories.map(ArtCategories => ({
        Category: ArtCategories.Category,
        
        
      }));
  
      res.json(formattedCategories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve Art Categories' });
    }
  });
  
  
  
  
  module.exports = router;  