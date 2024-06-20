document.addEventListener('DOMContentLoaded', () => {
    const nueva = document.querySelector('.nueva');
    const formulario = document.querySelector('.formulario');
    const btnAñadir = document.querySelector('#anadir');
    const btnCerrar = document.querySelector('#cerrar');
    const listaTareas = document.getElementById('listaTareas');

    nueva.addEventListener('click', () => {
        formulario.style.display = 'block';
    });

    btnCerrar.addEventListener('click', () => {
        formulario.style.display = 'none';
    });

    btnAñadir.addEventListener('click', () => {
        const titulo = document.getElementById('titulo').value;
        const fecha = document.getElementById('fecha').value;
        const descripcion = document.getElementById('descripcion').value;

        if (titulo && fecha && descripcion) {
            const tarea = {
                id: new Date().getTime(), // Unique ID
                titulo,
                fecha,
                descripcion
            };

            guardarTarea(tarea);
            mostrarTarea(tarea);

            document.getElementById('tareaForm').reset();
            formulario.style.display = 'none';
        } else {
            alert('Por favor, completa todos los campos');
        }
    });

    function guardarTarea(tarea) {
        let tareas = localStorage.getItem('tareas');
        tareas = tareas ? JSON.parse(tareas) : [];
        tareas.push(tarea);
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }

    function mostrarTarea(tarea) {
        const tareaDiv = document.createElement('div');
        tareaDiv.classList.add('tarea');
        tareaDiv.setAttribute('data-id', tarea.id);
        tareaDiv.innerHTML = `
            <h3>${tarea.titulo}</h3>
            <p>${tarea.fecha}</p>
            <p>${tarea.descripcion}</p>
            <div class="botones">
                <button onclick="editarTarea(${tarea.id})">Editar</button>
                <button onclick="borrarTarea(${tarea.id})">Borrar</button>
            </div>
        `;
        listaTareas.appendChild(tareaDiv);
    }

    function cargarTareas() {
        let tareas = localStorage.getItem('tareas');
        tareas = tareas ? JSON.parse(tareas) : [];
        tareas.forEach(tarea => mostrarTarea(tarea));
    }

    window.editarTarea = function(id) {
        let tareas = JSON.parse(localStorage.getItem('tareas'));
        const tarea = tareas.find(t => t.id === id);
        if (tarea) {
            document.getElementById('titulo').value = tarea.titulo;
            document.getElementById('fecha').value = tarea.fecha;
            document.getElementById('descripcion').value = tarea.descripcion;
            formulario.style.display = 'block';

            btnAñadir.onclick = function() {
                tarea.titulo = document.getElementById('titulo').value;
                tarea.fecha = document.getElementById('fecha').value;
                tarea.descripcion = document.getElementById('descripcion').value;

                localStorage.setItem('tareas', JSON.stringify(tareas));
                listaTareas.innerHTML = '';
                cargarTareas();

                document.getElementById('tareaForm').reset();
                formulario.style.display = 'none';

                btnAñadir.onclick = añadirTarea; // Reset the event handler to the original function
            };
        }
    }

    window.borrarTarea = function(id) {
        let tareas = JSON.parse(localStorage.getItem('tareas'));
        tareas = tareas.filter(t => t.id !== id);
        localStorage.setItem('tareas', JSON.stringify(tareas));
        listaTareas.innerHTML = '';
        cargarTareas();
    }

    // Cargar las tareas al cargar la página
    window.addEventListener('load', cargarTareas);

    function mostrarFormulario() {
        document.querySelector('.formulario').style.display = 'block';
    }

    function cerrarFormulario() {
        document.querySelector('.formulario').style.display = 'none';
    }

    function añadirTarea() {
        const titulo = document.getElementById('titulo').value;
        const descripcion = document.getElementById('descripcion').value;

        if (titulo && descripcion) {
            const tarea = document.createElement('div');
            tarea.classList.add('tarea');
            tarea.innerHTML = `<h3>${titulo}</h3><p>${descripcion}</p>`;

            document.querySelector('.tareas').appendChild(tarea);

            // Limpiar el formulario
            document.getElementById('titulo').value = '';
            document.getElementById('descripcion').value = '';

            cerrarFormulario();
        } else {
            alert('Por favor, completa todos los campos.');
        }
    }
});

