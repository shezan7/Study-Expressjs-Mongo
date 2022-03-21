const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const urmController = require('../controllers/userRoleMapping');


router.get("/", urmController.urms_get_all);

router.post("/", checkAuth, urmController.urm_create);

router.patch("/", checkAuth, urmController.urm_update);

router.delete("/", checkAuth, urmController.urm_delete);


module.exports = router;