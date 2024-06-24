document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://6674828675872d0e0a96b2c5.mockapi.io/api/usuarios';
    const tablaActividades = document.getElementById('tablaActividades').getElementsByTagName('tbody')[0];
    const formActividad = document.getElementById('formActividad');
    const btnAgregarMultiples = document.getElementById('agregar-varios');

    // Función para cargar los datos en la tabla
    function cargarDatos() {
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al obtener los datos: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                data.forEach(actividad => {
                    agregarFila(actividad);
                });
            })
            .catch(error => console.error('Error al cargar datos:', error));
    }

    // Función para agregar una nueva actividad
    function agregarNuevaActividad(event) {
        event.preventDefault();

        const nuevaActividad = {
            nombre: document.getElementById('nombre').value,
            actividad: document.getElementById('actividad').value,
            dia: document.getElementById('dia').value,
            hora: document.getElementById('hora').value,
            coach: document.getElementById('coach').value,
        };

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevaActividad)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al agregar actividad: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            agregarFila(data); 
            formActividad.reset(); 
        })
        .catch(error => console.error('Error al agregar nueva actividad:', error));
    }

    // Función para agregar una fila a la tabla
    function agregarFila(actividad) {
        const row = tablaActividades.insertRow();
        row.innerHTML = `
            <td>${actividad.nombre}</td>
            <td>${actividad.actividad}</td>
            <td>${actividad.dia}</td>
            <td>${actividad.hora}</td>
            <td>${actividad.coach}</td>
            <td>
                <button class="editar-btn">Editar</button>
                <button class="eliminar-btn">Eliminar</button>
            </td>
        `;

        // Botón editar
        const editarBtn = row.querySelector('.editar-btn');
        editarBtn.addEventListener('click', function() {
            const cells = row.cells;
            const actividadEditada = {
                id: actividad.id,
                nombre: cells[0].textContent,
                actividad: cells[1].textContent,
                dia: cells[2].textContent,
                hora: cells[3].textContent,
                coach: cells[4].textContent,
            };

            document.getElementById('nombre').value = actividadEditada.nombre;
            document.getElementById('actividad').value = actividadEditada.actividad;
            document.getElementById('dia').value = actividadEditada.dia;
            document.getElementById('hora').value = actividadEditada.hora;
            document.getElementById('coach').value = actividadEditada.coach;

            document.querySelector('#formActividad button[type="submit"]').textContent = 'Guardar Cambios';

            formActividad.removeEventListener('submit', agregarNuevaActividad);
            formActividad.addEventListener('submit', function editarActividad(event) {
                event.preventDefault();

                const actividadEditada = {
                    nombre: document.getElementById('nombre').value,
                    actividad: document.getElementById('actividad').value,
                    dia: document.getElementById('dia').value,
                    hora: document.getElementById('hora').value,
                    coach: document.getElementById('coach').value,
                };

                const url = `${apiUrl}/${actividad.id}`;
                fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(actividadEditada)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error al actualizar actividad: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    cells[0].textContent = data.nombre;
                    cells[1].textContent = data.actividad;
                    cells[2].textContent = data.dia;
                    cells[3].textContent = data.hora;
                    cells[4].textContent = data.coach;

                    formActividad.reset();
                    document.querySelector('#formActividad button[type="submit"]').textContent = 'Agregar';

                    formActividad.removeEventListener('submit', editarActividad);
                    formActividad.addEventListener('submit', agregarNuevaActividad);
                })
                .catch(error => console.error('Error al editar actividad:', error));
            }, { once: true });
        });

        // Botón borrar
        const eliminarBtn = row.querySelector('.eliminar-btn');
        eliminarBtn.addEventListener('click', function() {
            const confirmarEliminar = confirm('¿Estás seguro de querer eliminar esta actividad?');
            if (confirmarEliminar) {
                const url = `${apiUrl}/${actividad.id}`;
                fetch(url, {
                    method: 'DELETE'
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error al eliminar actividad: ${response.statusText}`);
                    }
                    tablaActividades.removeChild(row); 
                })
                .catch(error => console.error('Error al eliminar actividad:', error));
            }
        });
    }

    // Función para agregar múltiples actividades
    btnAgregarMultiples.addEventListener('click', async () => {
        const actividades = [
            { nombre: 'Juan', actividad: 'Yoga', dia: 'Lunes', hora: '08:00', coach: 'Ana' },
            { nombre: 'María', actividad: 'Pilates', dia: 'Martes', hora: '10:00', coach: 'Carlos' },
            { nombre: 'Pedro', actividad: 'Crossfit', dia: 'Miércoles', hora: '12:00', coach: 'Luis' }
        ];

        try {
            for (const actividad of actividades) {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(actividad)
                });
                if (!response.ok) {
                    throw new Error(`Error al agregar actividad: ${response.statusText}`);
                }
                const data = await response.json();
                agregarFila(data);
            }
        } catch (error) {
            console.error('Error al agregar múltiples actividades:', error);
        }
    });

    formActividad.addEventListener('submit', agregarNuevaActividad);

    cargarDatos();
});