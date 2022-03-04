import  Express  from "express";
import controller from "./user.controller";

const router = Express.Router();

router.post('/register', controller.createUser)
router.post('/login', controller.loginUser)
router.get('/userList', controller.getAllUsers)
router.delete('/delete', controller.deleteUser)

router.use('*', (req, res, next) => {
    return res.status(404)
         .send('Sorry page not found!  :(404');
});

export = router