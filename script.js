// ELEMENTS
const addTaskBtn = document.getElementById("addTaskBtn");
const taskModal = document.getElementById("taskModal");
const closeModal = document.getElementById("closeModal");
const saveTaskBtn = document.getElementById("saveTaskBtn");
const taskList = document.getElementById("task-list");

let tasks = [];

// OPEN MODAL
addTaskBtn.addEventListener("click", () => {
  taskModal.style.display = "flex";
});

// CLOSE MODAL
closeModal.addEventListener("click", () => {
  taskModal.style.display = "none";
});

// CLOSE MODAL BY CLICKING OUTSIDE
window.addEventListener("click", (e) => {
  if (e.target === taskModal) taskModal.style.display = "none";
});

// SAVE TASK
saveTaskBtn.addEventListener("click", () => {
  const title = document.getElementById("taskTitle").value.trim();
  const dueDate = document.getElementById("taskDue").value;

  if (!title || !dueDate) {
    alert("Isi semua data!");
    return;
  }

  tasks.push({ title, due: dueDate });
  renderTasks();

  taskModal.style.display = "none";

  // RESET INPUT
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDue").value = "";
});

// RENDER TASKS
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const div = document.createElement("div");
    div.className = "task-item";

    const formattedDate = new Date(task.due).toLocaleString();

    div.innerHTML = `
      <div class="task-title">${task.title}</div>
      <div class="task-date">Deadline: ${formattedDate}</div>
      <button class="add-calendar" onclick="addToCalendar(${index})">Tambah ke Google Calendar</button>
      <button class="delete-task" onclick="deleteTask(${index})">Hapus</button>
    `;

    taskList.appendChild(div);
  });
}

// ADD TO GOOGLE CALENDAR
function addToCalendar(index) {
  const task = tasks[index];

  const start = new Date(task.due);
  const end = new Date(start.getTime() + 60 * 60 * 1000); // 1 jam

  const format = (date) =>
    date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const link =
    https://calendar.google.com/calendar/render?action=TEMPLATE +
    &text=${encodeURIComponent(task.title)} +
    &dates=${format(start)}/${format(end)} +
    &ctz=Asia/Jakarta;

  window.open(link, "_blank");
}

// DELETE TASK
function deleteTask(index) {
  if (confirm("Yakin mau hapus tugas ini?")) {
    tasks.splice(index, 1);
    renderTasks();
  }
}
