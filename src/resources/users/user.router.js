const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.post('/', async (req, res) => {
  const user = await new User(req.body);
  usersService.save(user);
  res.status(201).json(User.toResponse(user));
});

router.get('/:userId', async (req, res) => {
  const user = await usersService.getById(req.params.userId);
  res.status(200).json(User.toResponse(user));
});

router.delete('/:userId', async (req, res) => {
  await usersService.deleteUser(req.params.userId);
  res.status(204).end();
});

router.put('/:userId', async (req, res) => {
  const user = await usersService.getById(req.params.userId);
  const updateUser = await usersService.update(user, req.body);
  res.json(User.toResponse(updateUser));
});

// router.put('/:userId', async (req, res) => {
//   const user = await usersService.getById(req.params.userId);
//   usersService.update(user, req.body);
//   res.json(User.toResponse(req.body));
// });

module.exports = router;
