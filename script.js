// ------------------------------
// LOAD & SAVE TASKS
// ------------------------------
function loadTasks() {
  let t = localStorage.getItem('tasks');
  if (!t) return [];
  return JSON.parse(t);
}

function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// ------------------------------
// ADD TO GOOGLE CALENDAR
// ------------------------------
function addToGoogleCalendar(task) {
  const start = new Date(task.due);
  const startUTC = start.toISOString().replace(/[-:.]/g, "").slice(0, 15) + "Z";

  const end = new Date(start.getTime() + 60 * 60 * 1000);
  const endUTC = end.toISOString().replace(/[-:.]/g, "").slice(0, 15) + "Z";

  const url =
    https://calendar.google.com/calendar/render?action=TEMPLATE +
    &text=${encodeURIComponent(task.title)} +
    &dates=${startUTC}%2F${endUTC} +
    &details=${encodeURIComponent("Deadline tugas: " + task.due)};

  window.open(url, "_blank");
}

// ------------------------------
// DISPLAY TASKS
// ------------------------------
function displayTasks() {
  const tasks = loadTasks();
  const list = document.getElementById('task-list');
  list.innerHTML = "";

  tasks.forEach(t => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <h3>${t.title}</h3>
      <p>Due: ${t.due}</p>
      <button class="btn-detail">Lihat Detail</button>
      <button class="btn-calendar">Add to Google Calendar</button>
    `;

    // Detail alert
    card.querySelector('.btn-detail').addEventListener('click', () => {
      alert(Tugas: ${t.title}\nDeadline: ${t.due});
    });

    // Google Calendar
    card.querySelector('.btn-calendar').addEventListener('click', () => {
      addToGoogleCalendar(t);
    });

    list.appendChild(card);
  });
}

// ------------------------------
// MODAL CONTROL
// ------------------------------
const addBtn = document.getElementById('addTaskBtn');
const modal = document.getElementById('taskModal');
const closeModal = document.getElementById('closeModal');
const saveTaskBtn = document.getElementById('saveTaskBtn');

addBtn.addEventListener('click', () => {
  modal.style.display = "flex";
});

closeModal.addEventListener('click', () => {
  modal.style.display = "none";
});

// ------------------------------
// SAVE NEW TASK
// ------------------------------
saveTaskBtn.addEventListener('click', () => {
  const title = document.getElementById('taskTitle').value;
  const due = document.getElementById('taskDue').value;

  if (title === "" || due === "") {
    alert("Semua field harus diisi");
    return;
  }

  const newTask = { title, due };
  const current = loadTasks();
  current.push(newTask);

  saveTasks(current);

  modal.style.display = "none";
  displayTasks();
});

// Initial load
displayTasks();
