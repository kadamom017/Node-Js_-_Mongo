const router = require("express").Router();
const c = require("../controllers/bookController");
const v = require("../validators/bookValidators");
const validate = require("../middlewares/validate");
const upload = require("../middlewares/upload");

// upload.single("cover") must run BEFORE the validators so req.body is populated
router.route("/")
  .get(c.getBooks)
  .post(upload.single("cover"), v.createBook, validate, c.createBook);

router.route("/:id")
  .get(v.idParam, validate, c.getBook)
  .put(upload.single("cover"), v.updateBook, validate, c.updateBook)
  .delete(v.idParam, validate, c.deleteBook);

module.exports = router;
