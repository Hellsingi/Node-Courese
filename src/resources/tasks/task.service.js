const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();

const save = (data) => tasksRepo.save(data);

const getById = async (id) => {
  const task = await tasksRepo.getById(id);
  if (!task) return false;

  return task;
};

const update = (task, updateInfo) => tasksRepo.update(task, updateInfo);

const deleteTask = async (id) => tasksRepo.deleteTask(id);

module.exports = { getAll, save, getById, update, deleteTask };
