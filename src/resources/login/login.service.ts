import jwt from 'jsonwebtoken';
import * as usersService from '../users/user.service';

const signToken = async (loginUser: string, password: string): Promise<null | string> => {
    const user = await usersService.getByProps({ login: loginUser, password });
    if (!user) {
        return null;
    }
    const { id, login } = user;
    const secret = process.env["JWT_SECRET_KEY"] as string;
    const token = jwt.sign({ id, login }, secret);
    return token;

};
export { signToken };