function guardarDatos() {
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var telefono = document.getElementById("telefono").value;
    var correo = document.getElementById("correo").value.trim();

    var nombreValido = /^[a-zA-Z\s]+$/.test(nombre);
    var apellidoValido = /^[a-zA-Z\s]+$/.test(apellido);

    var telefonoValido = /^\d{4}\s?\d{4}$/.test(telefono);

    var correoValido = correo === "" || correo.endsWith("@gmail.com");

    if (!nombreValido) {
        alert("Por favor, ingrese un nombre válido (solo letras y espacios).");
        return;
    }

    if (!apellidoValido) {
        alert("Por favor, ingrese un apellido válido (solo letras y espacios).");
        return;
    }

    if (!telefonoValido) {
        alert("Por favor, ingrese un número de teléfono válido (exactamente 9 dígitos, con un espacio opcional después de los primeros 4).");
        return;
    }

    if (!correoValido) {
        alert("Por favor, ingrese un correo electrónico válido que termine en @gmail.com o deje el campo vacío.");
        return;
    }

    var datosGuardados = JSON.parse(localStorage.getItem("datos")) || [];

    datosGuardados.push({ nombre: nombre, apellido: apellido, correo: correo, telefono: telefono });

    localStorage.setItem("datos", JSON.stringify(datosGuardados));

    console.log("Datos guardados:", datosGuardados);

    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("correo").value = "";

    document.getElementById("dialog-overlay").style.display = "flex";
}

function cerrarDialogo() {
    document.getElementById("dialog-overlay").style.display = "none";
}

function irAContactos() {
    window.location.href = 'contactos.html';
}


document.getElementById("telefono").addEventListener("input", function () {
    var telefono = this.value.replace(/\D/g, '');

    if (telefono.length > 4) {
        telefono = telefono.substr(0, 4) + ' ' + telefono.substr(4);
    }

    this.value = telefono;
});
