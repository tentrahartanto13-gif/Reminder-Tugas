// Elemen
const addTaskBtn = document.getElementById("addTaskBtn");
const taskModal = document.getElementById("taskModal");
const closeModal = document.getElementById("closeModal");
const saveTaskBtn = document.getElementById("saveTaskBtn");
const taskList = document.getElementById("task-list");

let tasks = [];

// ---- MODAL ----
addTaskBtn.onclick = () => {
  taskModal.style.display = "flex";
};

closeModal.onclick = () => {
  taskModal.style.display = "none";
};

window.onclick = (e) => {
  if (e.target === taskModal) taskModal.style.display = "none";
};

// ---- SIMPAN TUGAS ----
saveTaskBtn.onclick = () => {
  const title = document.getElementById("taskTitle").value;
  const dueDate = document.getElementById("taskDue").value;

  if (!title || !dueDate) {
    alert("Isi semua data!");
    return;
  }

  tasks.push({
    title: title,
    due: dueDate
  });

  renderTasks();
  taskModal.style.display = "none";

  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDue").value = "";
};

// ---- TAMPILKAN LIST ----
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
    `;

    taskList.appendChild(div);
  });
}

// ---- ADD TO GOOGLE CALENDAR ----
function addToCalendar(index) {
  const task = tasks[index];

  const start = new Date(task.due);
  const end = new Date(start.getTime() + 60 * 60 * 1000); // +1 jam

  const format = (date) =>
    date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const link = `https://calendar.google.com/calendar/render?action=TEMPLATE
&text=${encodeURIComponent(task.title)}
&dates=${format(start)}/${format(end)}
&ctz=Asia/Jakarta`.replace(/\n/g, "");

  window.open(link, "_blank");
}
