const db = [];

const getAll = async () => db;

const save = async (data) => db.push(data);

const getById = async (id) => db.find((task) => task.id === id);

const update = async (task, updateInfo) => {
  const idx = db.indexOf(task);
  const {
    order: taskOrder,
    description: taskDescription,
    title: taskTitle,
    userId: taskUserId,
    boardId: taskBoardId,
    columnId: taskColumnId,
  } = updateInfo;

  const newObject = {
    order: taskOrder || task.order,
    description: taskDescription || task.description,
    userId: taskUserId || task.userId,
    boardId: taskBoardId || task.boardId,
    columnId: taskColumnId || task.columnId,
    title: taskTitle || task.title,
  };

  const updateTask = { ...task, ...newObject };

  db.splice(idx, 1, updateTask);
  return updateTask;
};

const deleteTask = async (id) => {
  const task = await getById(id);
  if(!task) return false;
  const idx = db.indexOf(task);
  db.splice(idx, 1);
  return true;
};

module.exports = { getAll, save, getById, update, deleteTask };
