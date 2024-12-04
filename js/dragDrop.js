export const enableDragAndDrop = () => {
    const taskList = document.getElementById('task-list');
    let draggedItem = null;
  
    taskList.addEventListener('dragstart', (e) => {
      if (e.target.classList.contains('task')) {
        draggedItem = e.target;
        setTimeout(() => (e.target.style.display = 'none'), 0);
      }
    });
  
    taskList.addEventListener('dragend', (e) => {
      if (draggedItem) {
        draggedItem.style.display = 'block';
        draggedItem = null;
      }
    });
  
    taskList.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
  
    taskList.addEventListener('drop', (e) => {
      e.preventDefault();
      if (draggedItem) {
        const closestTask = document.elementFromPoint(e.clientX, e.clientY);
        if (closestTask && closestTask.classList.contains('task')) {
          taskList.insertBefore(draggedItem, closestTask.nextSibling);
        }
      }
    });
  };
  
  // Activate Drag-and-Drop
  enableDragAndDrop();
  