import express from 'express';
import { StatusCodes } from 'http-status-codes';
import * as usersService from './user.service';
import { userValidation } from '../../middleware/errorHandler';
import { ExtendedError } from '../../logger/logger';
import { UserDB } from '../../modelsDb/User';

const router = express.Router();

router.get('/', async (_req, res, next) => {
  try {
    const users = await usersService.getAll();
    res.json(users.map(UserDB.toResponse));
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, login, password } = req.body;
    userValidation(req);
    const user = await usersService.save(name, login, password);
    res.status(StatusCodes.CREATED).json(UserDB.toResponse(user));
  } catch (err) {
    next(err);
  }

});

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await usersService.getById(req.params.userId);
    if (!user) {
      throw new ExtendedError(StatusCodes.NOT_FOUND, "User not found.");
    }
    res.json(UserDB.toResponse(user));
  } catch (err) {
    next(err);
  }
});

router.delete('/:userId', async (req, res, next) => {
  try {
    const deletedUser = await usersService.deleteUser(req.params.userId);
    if (!deletedUser) return;
    res.status(StatusCodes.NO_CONTENT).send('The user has been deleted');
  } catch (e) {
    next(e);
  }
});

router.put('/:userId', async (req, res, next) => {
  try {
    userValidation(req);
    const user = await usersService.getById(req.params.userId);
    if (!user) {
      throw new ExtendedError(StatusCodes.NOT_FOUND, "User not found.");
    }
    const updateUser = await usersService.update(user, req.body);
    if (!updateUser) {
      throw new ExtendedError(StatusCodes.NOT_FOUND, "User not found.");
    }
    res.json(UserDB.toResponse(updateUser));
  } catch (err) {
    next(err);
  }
});

export default router;
