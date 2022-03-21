const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const accessController = require('../controllers/access');


router.get("/", accessController.access_get_all);

router.post("/", checkAuth, accessController.access_create);

router.patch("/", checkAuth, accessController.access_update);

router.delete("/", checkAuth, accessController.access_delete);


module.exports = router;