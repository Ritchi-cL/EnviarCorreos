document.addEventListener("DOMContentLoaded", function() {
    // Seleccionar los elementos de la interfaz

    const email = {
        email: "",
        asunto: "",
        mensaje: ""
    }

    console.log(email);

    const inputEmail = document.querySelector("#email");
    const inputAsunto = document.querySelector("#asunto");
    const inputMensaje = document.querySelector("#mensaje");
    const formulario = document.querySelector("#enviar-mail");
    const btnSubmit = document.querySelector("#enviar-mail button[type='submit']");
    const btnReset = document.querySelector("#enviar-mail button[type='reset']");
    const spinner = document.querySelector(".spinner");

    // Asignar eventos

    /*
        También conocido como callback, cuando suceda el evento
        Se ejecuta una función.

        El evento blur se ejecuta cuando se cambia de campo
        o a otra parte del DOM
    */
    inputEmail.addEventListener("input", validar);
    inputAsunto.addEventListener("input", validar);
    inputMensaje.addEventListener("input", validar);

    formulario.addEventListener("submit", enviarEmail);

    btnReset.addEventListener("click", function(event) {
        event.preventDefault();

        // Hay que reiniciar el objeto
        resetearFormulario();
    })

    function enviarEmail(event) {
        event.preventDefault();

        if (Object.values(email).includes("")) {
            return;
        }

        console.log("Enviando e-mail...");
        spinner.classList.remove("hidden");

        setTimeout(() => {
            spinner.classList.add("hidden");
            resetearFormulario();

            // Crear una alerta
            const alertaExito = document.createElement("P");
            alertaExito.classList.add("bg-green-500", "text-white", "p-2", "text-center", "rounded-lg", "mt-10", "font-bold", "text-sm", "uppercase");
            alertaExito.textContent = "Mensaje enviado correctamente";
            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);

        }, 3000)
        
    }


    // El método trim() va a quitar los espacios vacíos del String
    function validar(event) {

        if (event.target.value.trim() === "") {
            // A la función mostrarAlerta() le pasamos un argumento
            mostrarAlerta(`El Campo ${event.target.id} es obligatorio`, event.target.parentElement);
            email[event.target.id] = "";
            comprobarEmail();
            return;
        }
    
        if (event.target.id === "email" && !validarEmail(event.target.value)) {
            mostrarAlerta("El email no es válido", event.target.parentElement);
            email[event.target.id] = "";
            comprobarEmail();
            return;
        }

        limpiarAlerta(event.target.parentElement);

        // Asignar los valores
        email[event.target.id] = event.target.value.trim().toLowerCase();
        
        // Comprobar el objeto de email
        comprobarEmail();
    }

    function mostrarAlerta(event, referencia) {

        limpiarAlerta(referencia);

        // Generar alerta de parrafo en HTML (debe ir en mayúsculas)
        const error = document.createElement("P");
        error.textContent = event;
        // "bg-red-600", "text-white", "p-2" clases de Tailwind CSS
        error.classList.add("bg-red-600", "text-white", "p-2", "text-center");
        
        
        /*
            Inyectar el error al formulario
            Agregamos un nuevo elemento al ya existente con appendChild
            Al formulario id="enviar-mail" se le agregará el "error (<p>)"
            */
        // appendChild() genera el codigo antes del cierre de la etiqueta
        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia) {

        // Comprueba si ya existe una alerta
        const alerta = referencia.querySelector(".bg-red-600");
        console.log(alerta);
        if (alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email) {

        /*
            Constante obtenida en https://gist.github.com/codigoconjuan/930b0b9b1964e2b54be35dd476d5ce74
            Para la validación de e-mail, ej: ejemplo@dominio.com
            Devuelve un boolean
        */

        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarEmail() {
        
        if (Object.values(email).includes("")) {

            btnSubmit.classList.add("opacity-50");
            btnSubmit.disabled = true;
            btnSubmit.style.cursor = "not-allowed"
            return;

        }

        btnSubmit.classList.remove("opacity-50");
        btnSubmit.disabled = false;
        btnSubmit.style.cursor = "pointer";
    }

    function resetearFormulario() {

        email.email = "";
        email.asunto = "";
        email.mensaje = "";
        formulario.reset();
        comprobarEmail();
        limpiarAlerta(inputEmail.parentElement);
    limpiarAlerta(inputAsunto.parentElement);
    limpiarAlerta(inputMensaje.parentElement);
    }

} );