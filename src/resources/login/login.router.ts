import { StatusCodes } from 'http-status-codes';
import Router from 'express';
import * as loginService from "./login.service";

const router = Router();

router.route('/').post(async (req, res) => {
    const { login } = req.body;
    const token = await loginService.signToken(login);
    if (!token) {
        res.status(StatusCodes.FORBIDDEN).send('Wrong login/password combination!');
    } else {
        res.status(StatusCodes.OK).json({ token });
    }
});

export default router;