const { Router } = require("express");

const DevelopersController = require("./controllers/DevelopersController");
const SearchController = require("./controllers/SearchController");

const routes = Router();

routes.get("/", (req, res) => {
  return res.json({ message: "DevRadar API." });
});

routes.get("/developers", DevelopersController.index);
routes.post("/developers", DevelopersController.store);

routes.get("/search", SearchController.index);

module.exports = routes;
