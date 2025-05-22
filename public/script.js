document.addEventListener('DOMContentLoaded', function() {
    const pageID = document.body.id;

    if(pageID === 'todoListPage') {
        todo();
    } else if (pageID === 'appointments'){
        appointments();
    } else if (pageID === 'planner') {
        planner();
    } else if (pageID === 'notes') {
        notes();
    }
});

function todo() {
    const todoInput = document.getElementById('todoInput');
    const addTodoBtn = document.getElementById('addTodoBtn');
    const todoList = document.getElementById('todoList');

    let todos = []

    async function loadTodos() {
        const res = await fetch('/api/todos')
        todos = await res.json();
        renderTodo();
    }
 
    function renderTodo() {
        todoList.innerHTML = '';

        for(let i = 0; i < todos.length; i++) {
            const todo = todos[i];
            const li = document.createElement('li');

            if (todo.complete) {
                li.className = 'complete';
            } else {
                li.className = '';
            }
            const span = document.createElement('span');
            span.textContent = todo.text;
            
            li.appendChild(span);

            const div = document.createElement('div');
            div.className = 'todo-actions';

            const toggleBtn = document.createElement('button');

            if (todo.complete) {
                toggleBtn.textContent = 'Undo';
            } else {
                toggleBtn.textContent = 'Done';
            }
            
            toggleBtn.addEventListener('click', async () => {
                await fetch(`/api/todos/${todo.id}`, {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({complete: todo.complete ? 0 : 1})
                })
                loadTodos()
            })

            div.appendChild(toggleBtn);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';

            deleteBtn.addEventListener('click', async() =>{
                await fetch(`/api/todos/${todo.id}`, {
                    method: 'DELETE'
                })
                loadTodos()
            });

            div.appendChild(deleteBtn);
            li.appendChild(div);
            todoList.appendChild(li);
        }
    }

    addTodoBtn.addEventListener('click', async () => {
        const text = todoInput.value.trim();
        
        if(text !== '') {
            await fetch('/api/todos', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({text})
            })
            todoInput.value = ''
            loadTodos();
        }
    });
    loadTodos()
}

function planner() {
    const plannerContainer = document.getElementById('plannerContainer');
    const currentHour = new Date().getHours();
    const startHour = 1;
    const endHour = 24;

    async function loadPlanner() {
        const res = await fetch('/api/planner');
        const entries = await res.json();
        const hourMap = {};
      
        
        for (let i = 0; i < entries.length; i++) {
          const entry = entries[i];
          hourMap[entry.hour] = entry.note;
        }
      
        plannerContainer.innerHTML = '';
      
        for (let hour = startHour; hour <= endHour; hour++) {
          const block = document.createElement('div');
          block.className = 'planner-block';
      
          const hourLabel = document.createElement('div');
          hourLabel.className = 'hour-label';
          hourLabel.textContent = formatHour(hour);
      
          const textarea = document.createElement('textarea');
          textarea.value = hourMap[hour] || '';
      
          if (hour < currentHour) {
            textarea.classList.add('past');
          } else if (hour === currentHour) {
            textarea.classList.add('present');
          } else {
            textarea.classList.add('future');
          }
      
          const saveBtn = document.createElement('button');
          saveBtn.textContent = 'Save';
          saveBtn.onclick = async () => {
            await fetch('/api/planner', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ hour, note: textarea.value })
            });
          };
      
          block.appendChild(hourLabel);
          block.appendChild(textarea);
          block.appendChild(saveBtn);
          plannerContainer.appendChild(block);
        }
    }
    loadPlanner();      
}

function formatHour(hour) {
    let ampm = 'AM';
    if(hour >= 12) {
        ampm = 'PM';
    }
    
    let displayHour = hour % 12;
    if(displayHour === 0) {
        displayHour = 12;
    }

    return displayHour + ' ' + ampm;
}

function appointments() {
    const appointmentForm = document.getElementById('appointmentForm');
    const appointmentList = document.getElementById('appointmentList');

    async function loadAppointments() {
        const res = await fetch('/api/appointments')
        const appointments = await res.json()

        appointmentList.innerHTML = '';

        for (let i = 0; i < appointments.length; i++) {
            const appointment = appointments[i];

            const li = document.createElement('li');
            li.className = 'appointment-item';
            li.innerHTML = `
                <h3>${appointment.title}</h3>
                <p><strong>Date:</strong> ${appointment.date}</p>
                <p><strong>Time:</strong> ${appointment.time}</p>
                <p>${appointment.description}</p>
            `;

            const delBtn = document.createElement('button');
            delBtn.textContent = 'Delete';
            delBtn.className = 'delete-btn';
            delBtn.onclick = async () => {
                await fetch(`/api/appointments/${appointment.id}`, {
                    method: 'DELETE'
                });
                loadAppointments();
            };

            li.appendChild(delBtn);
            appointmentList.appendChild(li);
        }
    }

    appointmentForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const title = document.getElementById('appointmentTitle').value;
        const date = document.getElementById('appointmentDate').value;
        const time = document.getElementById('appointmentTime').value;
        const description = document.getElementById('appointmentDesc').value;

        if (title && date && time) {
            await fetch('/api/appointments', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ title, date, time, description})
            })
            appointmentForm.reset();
            loadAppointments()
        }
    });
    loadAppointments();
}

function notes() {
    const noteForm = document.getElementById('noteForm');
    const notesList = document.getElementById('noteList');
    const noteTextarea = document.getElementById('noteContent');

    function autoResize(el) {            
        el.style.height = 'auto';
        el.style.height = el.scrollHeight + 'px';
    }
        
    noteTextarea.addEventListener('input', () => autoResize(noteTextarea));
    window.addEventListener('DOMContentLoaded', () => autoResize(noteTextarea));

    async function loadNotes() {
        const res = await fetch('/api/notes')
        const notes = await res.json()
        
        notesList.innerHTML = '';

        for (let i = 0; i < notes.length; i++) {
            const note = notes[i];
          
            const noteDiv = document.createElement('div');
            noteDiv.className = 'note-item';
            noteDiv.innerHTML = `
              <h3>${note.title}</h3>
              <p>${note.content}</p>
            `;
          
            const delBtn = document.createElement('button');
            delBtn.textContent = 'Delete';
            delBtn.className = 'delete-btn';
            delBtn.onclick = async () => {
                await fetch(`/api/notes/${note.id}`, { 
                    method: 'DELETE' 
                });
                loadNotes();
            };

            noteDiv.appendChild(delBtn);
            notesList.appendChild(noteDiv);
        }
    }

    noteForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const title = document.getElementById('noteTitle').value;
        const content = document.getElementById('noteContent').value;
        if(title && content) {
           await fetch('/api/notes', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ title, content})
           })
            noteForm.reset();
            loadNotes()
        }
    });
    loadNotes();
}