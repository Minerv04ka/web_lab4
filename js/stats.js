import { TaskManager } from './logic.js';

export const TaskStats = (() => {
  /**
   * Calculate total tasks.
   * @returns {number} Total number of tasks.
   */
  const getTotalTasks = () => TaskManager.getTasks().length;

  /**
   * Calculate completed tasks.
   * @returns {number} Number of completed tasks.
   */
  const getCompletedTasks = () =>
    TaskManager.getTasks().filter((task) => task.completed).length;

  /**
   * Calculate pending (not completed) tasks.
   * @returns {number} Number of pending tasks.
   */
  const getPendingTasks = () =>
    TaskManager.getTasks().filter((task) => !task.completed).length;

  /**
   * Update statistics in the UI.
   */
  const updateStats = () => {
    document.getElementById('total-tasks').textContent = getTotalTasks();
    document.getElementById('completed-tasks').textContent = getCompletedTasks();
    document.getElementById('pending-tasks').textContent = getPendingTasks();
  };

  return {
    getTotalTasks,
    getCompletedTasks,
    getPendingTasks,
    updateStats,
  };
})();
