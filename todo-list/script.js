import { createRoot } from 'react-dom/client';

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

// Render your React component instead
const root = createRoot(document.getElementById('app'));
root.render(<h1>Hello, world</h1>);

const newTaskButton = document.querySelector('.new-task-button');
const deleteButton = document.querySelector('.delete-button');
const saveButton = document.querySelector('.save-button');
const accordion = document.querySelector('#accordionExample');
console.log(newTaskButton, deleteButton, saveButton);
