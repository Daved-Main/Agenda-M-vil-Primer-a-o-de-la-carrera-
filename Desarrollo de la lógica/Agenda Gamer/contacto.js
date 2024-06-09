function mostrarDatos() {
    var datosGuardados = JSON.parse(localStorage.getItem("datos")) || [];
    var lista = document.getElementById("lista-datos");
    lista.innerHTML = "";

    datosGuardados.forEach(function (dato, index) {
        var li = document.createElement("li");

        var nombre = document.createElement("div");
        nombre.textContent = "Nombre: " + dato.nombre;
        nombre.className = "text";

        var apellido = document.createElement("div");
        apellido.textContent = "Apellido: " + dato.apellido;
        apellido.className = "text";

        var telefono = document.createElement("div");
        telefono.className = "text";
        telefono.textContent = "Teléfono: " + dato.telefono;

        var correo = document.createElement("div");
        correo.textContent = "Correo: " + dato.correo;
        correo.className = "text";

        var editarBtn = document.createElement("button");
        editarBtn.textContent = "Editar";
        editarBtn.onclick = function () {
            editarContacto(index);
        };

        var borrarBtn = document.createElement("button");
        borrarBtn.textContent = "Borrar";
        borrarBtn.onclick = function () {
            borrarContacto(index);
        };

        var verBtn = document.createElement("button");
        verBtn.textContent = "Ver";
        verBtn.onclick = function () {
            mostrarContactoEnGrande(dato.nombre, dato.apellido, dato.telefono, dato.correo);
        };

        var opcionesContainer = document.createElement("div");
        opcionesContainer.appendChild(editarBtn);
        opcionesContainer.appendChild(borrarBtn);
        opcionesContainer.appendChild(verBtn);

        li.appendChild(nombre);
        li.appendChild(apellido);
        li.appendChild(telefono);
        li.appendChild(correo);
        li.appendChild(opcionesContainer);

        lista.appendChild(li);
    });
}

function mostrarContactoEnGrande(nombre, apellido, telefono, correo) {
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    var contactoInfo = document.getElementById("contacto-info");

    modal.style.display = "block";

    contactoInfo.innerHTML = "<p>Nombre: " + nombre + "</p>" +
        "<p>Apellido: " + apellido + "</p>" +
        "<p>Teléfono: " + telefono + " " +
        "<img src='https://cdn3.iconfinder.com/data/icons/pixel-social-media-2/16/Whatsapp-512.png' alt='WhatsApp' style='width: 30px; height: 30px; cursor: pointer;' onclick='window.open(\"https://wa.me/" + telefono.replace(/\s+/g, '') + "\", \"_blank\")'></p>" +
        "<p>Correo: " + correo + " " +
        "<img src='https://cdn-icons-png.flaticon.com/512/281/281769.png' alt='Email' style='width: 30px; height: 30px; cursor: pointer;' onclick='window.open(\"mailto:" + correo + "\", \"_blank\")'></p>";

    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function editarContacto(index) {
    var datosGuardados = JSON.parse(localStorage.getItem("datos")) || [];
    var contacto = datosGuardados[index];
    var nuevoNombre = prompt("Ingrese el nuevo nombre:", contacto.nombre);
    var nuevoApellido = prompt("Ingrese el nuevo apellido:", contacto.apellido);
    var nuevoTelefono = prompt("Ingrese el nuevo teléfono:", contacto.telefono);
    var nuevoCorreo = prompt("Ingrese el nuevo correo:", contacto.correo);

    if (nuevoNombre && nuevoApellido && nuevoTelefono && nuevoCorreo) {
        datosGuardados[index] = {
            nombre: nuevoNombre,
            apellido: nuevoApellido,
            telefono: nuevoTelefono,
            correo: nuevoCorreo
        };
        localStorage.setItem("datos", JSON.stringify(datosGuardados));
        mostrarDatos();
    } else {
        alert("Por favor, complete todos los campos.");
    }
}

function borrarContacto(index) {
    var datosGuardados = JSON.parse(localStorage.getItem("datos")) || [];
    datosGuardados.splice(index, 1);
    localStorage.setItem("datos", JSON.stringify(datosGuardados));
    mostrarDatos();
}

document.addEventListener('DOMContentLoaded', mostrarDatos);
