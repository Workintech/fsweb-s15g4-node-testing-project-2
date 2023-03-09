const express = require("express");
const router = express.Router();
const Model = require("./starwars-model");
const mw = require("./starwars-middleware");

router.get("/", async (req, res, next) => {
  try {
    const characters = await Model.getAll();
    res.status(200).json(characters);
  } catch (error) {
    next(error);
  }
});
router.get("/:id", mw.checkId, (req, res, next) => {
  const { id } = req.params;
  Model.getById(id)
    .then((character) => {
      res.status(200).json(character);
    })
    .catch(next);
});
router.post(
  "/",
  mw.checkPayload,
  mw.checkNameUnique,
  async (req, res, next) => {
    try {
      let insertData = await Model.insert(req.body);
      res.status(201).json(insertData);
    } catch (error) {
      next(error);
    }
  }
);
router.use((err, req, res, next) => {
  // eslint-disable-line
  // KODLAR BURAYA
  res.status(err.status || 500).json({
    customMessage: "Bir hata oluştu",
    message: err.message,
  });
});
module.exports = router;
