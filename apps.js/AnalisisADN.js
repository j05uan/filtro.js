const listaCiudadanos = [];

const loadCiudadanos = async () => {
    try {
        listaCiudadanos.length = 0;
        const respuesta = await fetch('http://localhost:3000/ciudadanos');

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
        const respuesta = await fetch('http://localhost:3000/ciudadanos', {
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
          <button class="botonsEstudiantes" id="botoncrearCiudadano"type="button" onclick="formularioCiudadano()">Crear Ciudadano</button>
          <button class="botonsEstudiantes" id="botonmostrarListado" type="button" onclick="mostrarListadoCiudadno()">Ver Listado de Ciudadano</button>
          <button id="atras1" class="atras" onclick="opcionesEstudiantes()">atras</button>
      </section>`;
}
const formularioCiudadano = async () => {
    const boton1 = document.getElementById('botoncrearCiudadano');
    const boton3 = document.getElementById('botonmostrarListado');
    const boton = document.getElementById('atras1')
    const contenedorEstudiantes = document.getElementById('Contenedor');
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
        <button type="button" onclick="crearCiudadano()">Crear Ciudadabno</button>
        <button id="atras2" class="atras" onclick="opcionesEstudiantes()">Atrás</button>
      </form>
  `;
    boton.style.display = 'none';
    boton1.style.display = 'none';
    boton3.style.display = 'none';
}
const crearCiudadano = async () => {
    await loadCiudadanos(); // Suponiendo que esta es una función asíncrona

    const nombreInput = document.getElementById('nombre_completo');
    const direccionInput = document.getElementById('direccion');
    const celularInput = document.getElementById('celular');
    const codigo_adnInput = document.getElementById('codigo_adn');

    let section = true;
    for (let ciudadano of listaCiudadanos) {
        if (ciudadano.codigo_adn === codigo_adnInput.value) {
            section = false;
            alert('La Secuencia de ADN ya está en el sistema');
            break; // Salir del bucle una vez que se encuentre un ADN coincidente
        }
    }

    if (section) {
        const nombre = nombreInput.value;
        const direccion = direccionInput.value;
        const celular = celularInput.value;
        const codigo_adn = codigo_adnInput.value;

        const nuevoCiudadano = {
            nombre_completo: nombre,
            direccion: direccion,
            celular: celular,
            codigo_adn: codigo_adn,
        };

        await guardarCiudadano(nuevoCiudadano);
        await loadCiudadanos();

        nombreInput.value = '';
        direccionInput.value = '';
        celularInput.value = '';
        codigo_adnInput.value = '';

        alert('¡Ciudadano creado con éxito!');

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
    <input type="text" id="input-adn">
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
                    <button id="" onclick="Emergencia()" >Emergencia</button>
                    <button id="" onclick="SeccionAdn()" >Investigacion Criminal</button>
                </aside>
                
            </section>
    
    `
}
function Emergencia(){
    const contenedor=document.getElementById('Contenedor')
    contenedor.innerHTML=`
    <section id="emergencia">

    <h1>Llamar a Una patrulla</h1>
    <button id="" onclick="inicio()" >Atras</button>
                
            </section>
    
    `
}

const  mostrarListadoCiudadno=async()=>{
    await loadCiudadanos();
    const boton1 = document.getElementById('botoncrearCiudadano');
    const boton3 = document.getElementById('botonmostrarListado');
    const boton = document.getElementById('atras1')
    const listadoCiudadanos = document.getElementById('Contenedor');
    boton.style.display = 'none';
    boton1.style.display = 'none';
    boton3.style.display = 'none';
    listadoCiudadanos.style.display='flex';
    
    const ul = document.createElement("ul");
    

    for(const ciudadano of listaCiudadanos){
        const li=document.createElement('li');
        li.textContent= `nombre_completo: ${ciudadano.nombre_completo}, apellido: ${ciudadano.direccion},
         celular: ${ciudadano.celular}, codigo_adn: ${ciudadano.codigo_adn}`;
        ul.appendChild(li);
    }
    listadoCiudadanos.innerHTML='';
    listadoCiudadanos.appendChild(ul);

    const volverButton=document.createElement('button');
    volverButton.textContent='Volver al Formulario';
    volverButton.addEventListener('click',opcionesEstudiantes);
    listadoCiudadanos.appendChild(volverButton);
}
