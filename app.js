let Titulo = document.title;

window.addEventListener('blur', () => {
    Titulo = document.title;
    document.title = "No te vayas, regresa :(";
})

window.addEventListener('focus', () => {
    document.title = Titulo;
})

let h1 = document.getElementById("Titulo");
let Boton1 = document.getElementById("B1");
Boton1.addEventListener('click', function() {
    const ContenedorBotones = document.querySelector(".Con");
    document.querySelector(".Texto").style.display = "block";
    ContenedorBotones.style.display = "none";
    DibujarFlor(500, 100, 6, 30, 100, 200);
    h1.remove();
})

document.getElementById("B12").addEventListener('click', function() {
    const ContenedorBotones = document.querySelector(".Con");
    ContenedorBotones.style.display = "none";
    document.querySelector(".Texto").style.display = "block";
    CrearVarias();
    h1.remove();
})

const canvas = document.getElementById('Flor');
const ctx = canvas.getContext('2d');

function DibujarPetalo(x, y, RadioX, scala, Rotacion, color, pasos) {
    const Numero = scala;

    const AnguloIncrement = (Math.PI / pasos) * 2;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Rotacion);
    ctx.scale(1, Numero);
    ctx.beginPath();
    for (let i = 0; i <= pasos; i++) {
        const AnguloActual = i * AnguloIncrement;
        const currentRadius = Math.sin(AnguloActual) * RadioX;
        const PuntoY = Math.sin(AnguloActual) * currentRadius;
        const PuntoX = Math.cos(AnguloActual) * currentRadius;
        if (i === 0) {
          ctx.moveTo(PuntoX, PuntoY);
        } else {
          ctx.lineTo(PuntoX, PuntoY);
        }
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.fill();
        ctx.stroke();
      }
    
      ctx.restore();
}

function DibujarFlor(x, y, NumeroPetalos, RadioXPetalo, RadioYPetalo, AltoTrazo) {
    // Tallo
    const PasosTallo = 50;
    const AltoTallo = AltoTrazo / PasosTallo;
    let NuevaY = y;

  const DibujarTallo = () => {
    if (NuevaY < y + AltoTrazo) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, NuevaY);
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'black';
      ctx.stroke();
      NuevaY += AltoTallo;
      setTimeout(DibujarTallo, 100);
    } else {
      // Dibuja los petalos en el tallo
      const Pasos = 50;
      let CuantosPasos = 0;
      function DibujarPetalosTallo() {
        if (CuantosPasos <= Pasos) {
          const PetaloY = y + 250 - RadioYPetalo;
          const PetaloY2 = y + 200 - RadioYPetalo;
          DibujarPetalo(500, PetaloY, 15, 2, 300, 'green', CuantosPasos);
          DibujarPetalo(470, PetaloY2, 15, 2, 300, 'green', CuantosPasos);
          CuantosPasos++;
          setTimeout(DibujarPetalosTallo, 100);
        }
      }
      DibujarPetalosTallo();
    }
  };
  DibujarTallo();

    const AnguloIncrement = (Math.PI * 2) / NumeroPetalos;
  
    let contadorPetalos = 0;
    function dibujarSiguientePetalo() {
        if (contadorPetalos <= NumeroPetalos) {
          const Angulo = contadorPetalos * AnguloIncrement;
          DibujarPetalo(x, y, RadioXPetalo, 2, Angulo, 'yellow', 100);
          contadorPetalos++;
          setTimeout(dibujarSiguientePetalo, 1000); 
        }
        // Dibuja el centro de la flor
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
      }
      dibujarSiguientePetalo();
}

function DibujarFlorSinTallo(x, y, NumeroPetalos, RadioXPetalo, RadioYPetalo, AltoTrazo) {
    // Dibuja el tallo
    const PasosTallo = 50;
    const AltoTallo = AltoTrazo / PasosTallo;
    let NuevaY = y;

  const DibujarTallo = () => {
    if (NuevaY < y + AltoTrazo) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, NuevaY);
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'black';
      ctx.stroke();
      NuevaY += AltoTallo;
      setTimeout(DibujarTallo, 100);
    } 
  };
  DibujarTallo();

    const AnguloIncrement = (Math.PI * 2) / NumeroPetalos;
  
    // Dibuja los pétalos
    let contadorPetalos = 0;
    function dibujarSiguientePetalo() {
        if (contadorPetalos <= NumeroPetalos) {
          const Angulo = contadorPetalos * AnguloIncrement;
          DibujarPetalo(x, y, RadioXPetalo, 2, Angulo, 'yellow', 100);
          contadorPetalos++;
          setTimeout(dibujarSiguientePetalo, 1000); 
        }
        // Dibuja el centro de la flor
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
      }
      dibujarSiguientePetalo();
}

function CrearVarias() {
    const numFlores = 12;

    // Espaciamiento y tamaño de cada flor
    const espacioX = canvas.width / 4;
    const espacioY = canvas.height / 3;
    const TamañoFlor = 130;

    for (let i = 0; i <= numFlores; i++) {
        const fila = Math.floor(i / 4);
        const columna = i % 4;
        const x = espacioX * columna + espacioX / 2;
        const y = espacioY * fila + espacioY / 2;

        DibujarFlorSinTallo(x, y, 8, 30, 80, TamañoFlor);
    }
}

function createFlower() {
  const flowerContainer = document.querySelector(".flower-container");

  // Número máximo de flores en pantalla
  const maxFlowersOnScreen = 5;

  // Verificar si ya hay 10 flores en pantalla
  if (document.querySelectorAll(".flower").length >= maxFlowersOnScreen) {
      return; // No crear más flores
  }

  // Número máximo de flores a crear simultáneamente (entre 1 y 5)
  const maxFlowers = Math.ceil(Math.random() * 5 + 1);
  const flowerSize = 100; // Tamaño de la flor

  // Arrays para almacenar las posiciones de las flores existentes
  const existingPositions = [];

  for (let j = 0; j < maxFlowers; j++) {
      let positionValid = false;
      let randomX, randomY;

      // Generar posiciones aleatorias y verificar que no se superpongan con las existentes
      while (!positionValid) {
          randomX = Math.random() * (window.innerWidth - flowerSize);
          randomY = Math.random() * (window.innerHeight - flowerSize);

          positionValid = true;

          // Verificar si la nueva posición está lo suficientemente alejada de las posiciones existentes
          for (const position of existingPositions) {
              const distance = Math.sqrt(Math.pow(position.x - randomX, 2) + Math.pow(position.y - randomY, 2));
              if (distance < 0) { // Rango de 300 píxeles recomendado para pc, en celular con 0
                  positionValid = false;
                  break;
              }
          }
      }

      // Agregar la nueva posición a la lista de posiciones existentes
      existingPositions.push({ x: randomX, y: randomY });

      const flower = document.createElement("div");
      flower.classList.add("flower");
      flower.style.animation = "fadeInFlower 1s ease-in-out both"; // Agregar animación de entrada a la flor

      for (let i = 1; i <= 10; i++) {
          const petal = document.createElement("div");
          petal.classList.add("petal", `p${i}`);
          flower.appendChild(petal);

          // Tiempo aleatorio de desaparición entre 2 y 5 segundos
          const disappearanceTime = Math.random() * 3000 + 2000;

          // Agrega una animación de salida a los pétalos con el tiempo aleatorio de desaparición
          petal.style.animation = `fadeOutPetal 0.5s ease-in-out both ${i * 0.1}s, fadeOutFlower 0.5s ease-in-out both ${disappearanceTime}s`;
      }

      flower.style.position = "fixed";
      flower.style.left = `${randomX}px`;
      flower.style.top = `${randomY}px`;

      flowerContainer.appendChild(flower);

      // Tiempo aleatorio de desaparición entre 2 y 5 segundos
      const disappearanceTime = Math.random() * 3000 + 2000;

      setTimeout(() => {
          flowerContainer.removeChild(flower);

          // Remover la posición de la flor que desapareció de la lista de posiciones existentes
          existingPositions.splice(existingPositions.findIndex(pos => pos.x === randomX && pos.y === randomY), 1);
      }, disappearanceTime);
  }
}

// Cambia el intervalo de tiempo para controlar la aparición de las flores cada 3 segundos
setInterval(createFlower, 5000); // Nuevas flores cada 3 segundos
