const Model = require("./starwars-model");
const db = require("../../data/db-config");

const checkId = async (req, res, next) => {
  try {
    const isExist = await db("starwars").where("id", req.params.id).first();
    if (!isExist) {
      res.status(404).json({
        message: "id li karakter bulunamadı",
      });
    } else {
      req.starwars = isExist;
      next();
    }
  } catch (error) {
    next(error);
  }
};
const checkNameUnique = async (req, res, next) => {
  try {
    req.body.name = req.body.name.trim();
    let allAccount = await Model.getAll();
    let isFound = false;
    for (let i = 0; i < allAccount.length; i++) {
      if (allAccount[i].name == req.body.name) {
        isFound = true;
        break;
      }
    }
    if (isFound) {
      res.status(400).json({ message: "aynı isimde karakter var" });
    }
  } catch (error) {
    next(error);
  }
  next();
};
const checkPayload = async (req, res, next) => {
  try {
    const { name, homeworld } = req.body;
    if (!name || !homeworld) {
      res
        .status(400)
        .json({ message: "name alanı ve homeworld alanı zorunlu" });
    } else if (typeof name != "string") {
      res.status(400).json({ message: "name alanı string olmalı" });
    }
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = {
  checkId,
  checkNameUnique,
  checkPayload,
};
