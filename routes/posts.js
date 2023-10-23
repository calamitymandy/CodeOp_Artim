var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const { authenticate } = require("../secretInfo/verifyToken")

/* GET posts. */
router.get("/", async (req, res) => {
  try {
    const result = await db("SELECT * FROM Posts;");

    if (!result.data[0]) {
      res.status(404).send();
      return;
    }
    
    res.send(result.data);
  } catch (error) {
    res.send(500);
  }
});

/* GET ONE post. */
router.get("/:id", async (req, res) => {
  try {
    const result = await db(`SELECT * FROM Posts WHERE id = ${req.params.id};`);

    if (!result.data[0]) {
      res.status(404).send();
      return;
    }
    
    res.send(result.data);
  } catch (error) {
    res.send(500);
  }
});

router.post("/", authenticate, async (req, res) => {
  
  try {
    console.log("req.userId--->", req.userId);
    //console.log("req.body--->", req.body);
    await db(`INSERT INTO Posts(UserId, Title, Category, Body, Image1, Image2, Image3, Video) 
    VALUES (${req.userId}, '${req.body.Title}', '${req.body.Category}', '${req.body.Body}', '${req.body.Image1}', '${req.body.Image2}', '${req.body.Image3}', '${req.body.Video}');`);
    
    const result = await db(`SELECT * FROM Posts;`);

    if (!result.data[0]) {
      res.status(404).send();
      return;
    }

    res.send(result.data);
    
  } catch (error) {
    res.send(500);
  }
});

/* PUT(modify) something in database */
router.put("/:id", async (req, res) => {
  try {
    console.log("req.body", req.body)
    await db(`UPDATE Posts
    SET Title = '${req.body.Title}',
    Category = '${req.body.Category}',
    Body = '${req.body.Body}',
    Image1 = '${req.body.Image1}',
    Image2 = '${req.body.Image2}',
    Image3 = '${req.body.Image3}',
    Video = '${req.body.Video}'
    WHERE id = ${req.params.id};`);

    const result = await db("SELECT * FROM Posts");

    if(!result.data[0]) {
      res.status(404).send();
      return;
    }

    res.send(result.data);
  } catch (error) {
    res.send(500);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await db(`DELETE FROM Posts WHERE id = ${req.params.id};`)

    const result = await db(`SELECT * FROM Posts;`);

    res.send(result.data);
  } catch (error) {
    res.send(500);
  }
})

module.exports = router;
