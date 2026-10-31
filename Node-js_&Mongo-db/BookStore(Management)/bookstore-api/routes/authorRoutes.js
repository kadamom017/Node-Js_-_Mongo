const router = require("express").Router();
const c = require("../controllers/authorController");
const v = require("../validators/authorValidators");
const validate = require("../middlewares/validate");

router.route("/")
  .get(c.getAuthors)
  .post(v.createAuthor, validate, c.createAuthor);

router.route("/:id")
  .get(v.idParam, validate, c.getAuthor)
  .put(v.updateAuthor, validate, c.updateAuthor)
  .delete(v.idParam, validate, c.deleteAuthor);

module.exports = router;
