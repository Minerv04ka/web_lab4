export const TaskManager = (() => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    const saveTasks = () => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    };
  
    const addTask = (task, category, priority) => {
      tasks.push({ task, category, priority, completed: false });
      saveTasks();
    };
  
    const deleteTask = (index) => {
      tasks.splice(index, 1);
      saveTasks();
    };
  
    const editTask = (index, newTask) => {
      tasks[index].task = newTask;
      saveTasks();
    };
  
    const toggleTask = (index) => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
    };
  
    const filterTasks = (filter) => {
      if (filter === 'completed') return tasks.filter((task) => task.completed);
      if (filter === 'pending') return tasks.filter((task) => !task.completed);
      return tasks;
    };
  
    const getTasks = () => tasks;
  
    return {
      addTask,
      deleteTask,
      editTask,
      toggleTask,
      filterTasks,
      getTasks,
    };
  })();
  