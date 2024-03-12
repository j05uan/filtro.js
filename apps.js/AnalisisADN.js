const listaCiudadanos = [];

const loadCiudadanos = async () => {
    try {
        listaCiudadanos.length = 0;
        const respuesta = await fetch('http://localhost:300/ciudadanos');

        if (!respuesta.ok) {
            throw new Error('Error al cargar Ciudadanos. Estado: ' + respuesta.status);
        }
        const Ciudadano = await respuesta.json();
        listaCiudadanos.push(...Ciudadano);

    } catch (error) {
        console.error("Error al cargar Ciudadano", error.message);
    }
}

const guardarCiudadano = async (nuevoCiudadano) => {
    try {
        const respuesta = await fetch('http://localhost:300/ciudadanos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoCiudadano),
        });

        if (!respuesta.ok) {
            throw new Error('Error al crear el Ciudadano. Estado: ' + respuesta.status);
        }
        const CiudadanoCreado = await respuesta.json();
        console.log('Ciudadano creado:', CiudadanoCreado);

    } catch (error) {
        console.error("Error al cargar Ciudadano", error.message);
    }
}

const opcionesEstudiantes= async ()=>{
   
    const contenedor2 = document.getElementById('Contenedor');
    contenedor2.innerHTML = `
      <section>
          <button class="botonsEstudiantes" id="botoncrearCiudadano"type="button" onclick="()">Crear Ciudadano</button>
          <button class="botonsEstudiantes" id="botonmodificarCiudadano" type="button" onclick="()">Modificar Ciudadano</button>
          <button class="botonsEstudiantes" id="botonmostrarListado" type="button" onclick="()">Ver Listado de Ciudadano</button>
          <button id="atras1" class="atras" onclick="">atras</button>
      </section>`;
}
const formularioCrearEstudiante = async () => {
    const boton1 = document.getElementById('botoncrearCiudadano');
    const boton2 = document.getElementById('botonmodificarCiudadano');
    const boton3 = document.getElementById('botonmostrarListado');
    const boton = document.getElementById('atras1')
    const contenedorEstudiantes = document.getElementById('crearEstudiante');
    contenedorEstudiantes.innerHTML = `
      <form id="MenuCrearCiudadano">
        <h3>Menu Crear Ciudadano</h3>
        <label for="nombre_completo">Nombre del Ciudadano(Completo):</label>
        <input type="text" id="nombre_completo" required>
        <label for="direccion">direccion del Ciudadano:</label>
        <input type="text" id="direccion" required>
        <label for="celular">celular de Ciudadano:</label>
        <input type="number" id="celular" required>
        <label for="codigo_adn">Número de Secuencia ADN:</label>
        <input type="text" id="codigo_adn" required>
        <button type="button" onclick="crearCiudadano()">Crear Estudiante</button>
        <button id="atras2" class="atras" onclick="opcionesEstudiantes()">Atrás</button>
      </form>
  `;
    boton.style.display = 'none';
    boton1.style.display = 'none';
    boton2.style.display = 'none';
    boton3.style.display = 'none';
}
const crearCiudadano = async () => {

    const nombreInput = document.getElementById('nombre_completo');
    const direccionInput = document.getElementById('direccion');
    const celularInput = document.getElementById('celular');
    const codigo_adnInput = document.getElementById('codigo_adn');

    let section=false
    for (ciudadano of listaCiudadanos) {
        if(ciudadano.codigo_adn!==codigo_adnInput){
            section=true
            alert('La Secuencia de ADN ya esta en el sistema')
    }
    }
    if(section!==false){
        const nombre = nombreInput.value;
    const direccion = direccionInput.value;
    const celular = celularInput.value;
    const codigo_adn = codigo_adnInput.value;

    const nuevoCiudadano = {
        nombre_completo:nombre ,
        direccion:direccion ,
        celular: celular,
        codigo_adn: codigo_adn,
    };

    await guardarCiudadano(nuevoCiudadano);
    await loadCiudadanos();

    nombreInput.value = '';
    direccionInput.value = '';
    celularInput.value = '';
    codigo_adnInput.value = '';

    alert('Ciudadano creado con éxito!');

    return nuevoCiudadano;
    }
   
}
async function buscar() {
    await loadCiudadanos();
    const entradaADN = document.getElementById("input-adn").value;
    let porcentajes = {};
    let n = entradaADN.length;
    let resultado = "ninguno";
    let contadorADN = 0;

    for (let ciudadano of listaCiudadanos) {
        let contador = 0;
        let i = 0;
        let nombre = ciudadano.nombre_completo;
        let codigo = ciudadano.codigo_adn;
        
        for (let numero of codigo) {
            if (numero === entradaADN[i]) {
                contador++;
            } 
            i++;
        }
        
        let porcentaje = (contador / n) * 100 + "%";
        if (contador > contadorADN) {
            resultado = nombre;
            contadorADN = contador;
        }
        porcentajes[nombre] = porcentaje;
    }   

    const PorcentajesOrdenados = Object.entries(porcentajes).map(([clave, valor]) => ({ clave, valor }));
    PorcentajesOrdenados.sort((a, b) => parseFloat(b.valor) - parseFloat(a.valor));
    
    let jp = 0;
    for (let ordenado of PorcentajesOrdenados) {
        jp++;
        let name = ordenado.clave;
        let porce = ordenado.valor;
        document.getElementById("resultado").innerHTML += `${name} - Porcentaje de coincidencia: ${porce}<br>`;
        if (jp >= 5) {
            break;
        }
    }
}
const SeccionAdn=()=>{
    const contenedor=document.getElementById('Contenedor')
    contenedor.innerHTML=`
    <section id="comprobacion">
    <div id="input">
    <label for="input-adn">Ingrese el numero de serie del ADD</label>
    <input type="number" id="input-adn">
    </div>
    <div id="resultado">resultado: ?</div>
    <button onclick="buscar()">buscar   x</button>
    <button onclick="inicio()">Atras   x</button>

    </section>
    
    `
}
const ingresopagina=()=>{
    document.getElementById("body").addEventListener("keypress",(event) =>{
        if(event.key === "Enter"){
            inicio()
        }
})
}
const inicio=()=>{
    const contenedor=document.getElementById('Contenedor')
    contenedor.innerHTML=`
    <section id="inicio">

                <aside id="right">
                    <button id="" onclick="" >Emergencia</button>
                    <button id="" onclick="" >Investigacion Criminal</button>
                </aside>
                
            </section>
    
    `
}
{}