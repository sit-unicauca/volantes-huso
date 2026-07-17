import React, { useState, useEffect, useRef } from 'react';
import { trackEvent } from '../../analytics/ga4';
import PropTypes from 'prop-types';
import VolanteCanvas from "../canvas/Volante";
import Volante2Canvas from "../canvas/Volante2";
import Volante3Canvas from "../canvas/Volante3";
import VisorSplat from "../canvas/VisorSplat";
import Hint3D from "../UI/Hint3D";

const NA = 'Información próximamente';

const CULTURA_COLORS = {
  'Popayán':     'bg-unicauca-azul text-white',
  'Calima':      'bg-unicauca-verde text-white',
  'Corinto':     'bg-unicauca-naranja text-white',
  'Nariño':      'bg-unicauca-morado text-white',
  'Patía':       'bg-unicauca-verdeAgua text-white',
  'Tumaco':      'bg-unicauca-cian text-white',
  'Tierradentro':'bg-unicauca-rojo text-white',
  'Quimbaya':    'bg-unicauca-amarillo text-unicauca-grisOscuro',
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-64 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm text-center px-4">
            No se pudo cargar el visor 3D. Intenta recargar la página.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

function GltfVisorWithTracking({ CanvasComponent, nombre, hintVisible, onFirstInteraction }) {
  const interaccionTrackedRef = useRef(false);

  useEffect(() => {
    trackEvent('Modelo3D', 'vista_gltf', nombre || 'sin_nombre');
  }, [nombre]);

  const handlePointerDown = () => {
    onFirstInteraction();
    if (!interaccionTrackedRef.current) {
      interaccionTrackedRef.current = true;
      trackEvent('Modelo3D', 'interaccion_gltf', nombre || 'sin_nombre');
    }
  };

  return (
    <div className="relative w-full h-64 md:h-72" onPointerDown={handlePointerDown}>
      <CanvasComponent />
      {hintVisible && <Hint3D onFirstInteraction={onFirstInteraction} />}
    </div>
  );
}

GltfVisorWithTracking.propTypes = {
  CanvasComponent:    PropTypes.elementType.isRequired,
  nombre:             PropTypes.string,
  hintVisible:        PropTypes.bool.isRequired,
  onFirstInteraction: PropTypes.func.isRequired,
};

function Visor3D({ pieza, resetCamera }) {
  console.log("Visor3D:", resetCamera);
  const tipo = pieza?.modelo_3d_tipo;
  const url  = "./" + pieza?.modelo_3d_url;
  console.log("URL:", url);
  console.log("Reset Camera:", resetCamera);
  //const url = "./splats/VolanteCorinto1.splat?download=true";
  const nombre = pieza?.nombre;
  const [hintVisible, setHintVisible] = useState(true);

  if (tipo === 'gaussian_splat' || tipo === 'ply') {
    return (
      <ErrorBoundary>
        <div className="relative" onPointerDown={() => setHintVisible(false)}>
          <VisorSplat url={url} nombre={nombre} cameraUrl={pieza?.camera_url} initialPosition={pieza?.camera_initial_position} initialLookAt={pieza?.camera_look_at} resetCamera={resetCamera} />
          {hintVisible && <Hint3D onFirstInteraction={() => setHintVisible(false)}  />}
        </div>
      </ErrorBoundary>
    );
  }

  if (tipo === 'glb' || tipo === 'gltf') {
    const canvasComponents = {
      Volante:  VolanteCanvas,
      Volante2: Volante2Canvas,
      Volante3: Volante3Canvas,
    };
    const key = nombre && canvasComponents[nombre] ? nombre : 'Volante';
    const CanvasComponent = canvasComponents[key];
    return (
      <GltfVisorWithTracking
        CanvasComponent={CanvasComponent}
        nombre={nombre}
        hintVisible={hintVisible}
        onFirstInteraction={() => setHintVisible(false)}
      />
    );
  }

  return (
    <div className="flex items-center justify-center h-64 bg-unicauca-grisClaro rounded-lg border border-gray-200">
      <p className="text-unicauca-grisMedio text-sm">Modelo 3D próximamente</p>
    </div>
  );
}

Visor3D.propTypes = {
  pieza: PropTypes.object,
};

const NR = 'No registrado';

function FichaField({ emoji, label, value }) {
  return (
    <div className="flex items-center gap-2 text-sm font-lato">
      <span className="font-semibold tracking-wide text-unicauca-grisMedio">
        {emoji && <span className="mr-1" aria-hidden="true">{emoji}</span>}
        {label}:
      </span>
      <span className={value ? 'text-unicauca-grisOscuro' : 'text-unicauca-grisMedio italic'}>
        {value || NR}
      </span>
    </div>
  );
} 

FichaField.propTypes = {
  emoji: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
};

function ContextoSubseccion({ titulo, texto }) {
  if (!texto) return null;
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wide text-unicauca-grisMedio mb-1">
        {titulo}
      </h4>
      <p className="text-sm text-unicauca-grisOscuro font-lato leading-relaxed">
        {texto}
      </p>
    </div>
  );
}

ContextoSubseccion.propTypes = {
  titulo: PropTypes.string.isRequired,
  texto:  PropTypes.string,
};

function Datos({ pieza, resetCamera }) {
  console.log("Datos:", resetCamera);
  console.log("PIEZA:", pieza);
  if (!pieza) return null;

  const culturaBadgeClass = CULTURA_COLORS[pieza.cultura] || 'bg-unicauca-azul text-white';
  const hasContexto = pieza.descripcion || pieza.descripcion_cultural || pieza.usos || pieza.relevancia_educativa;

  return (
  <div className="w-full mt-6">

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

      {/* Columna izquierda: Visor 3D */}
      <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-1 w-full">
        <Visor3D pieza={pieza} resetCamera={resetCamera} />
      </div>

      {/* Columna derecha: Información */}
      <div className="lg:col-span-1 self-start">

        <div className="bg-white rounded-lg shadow-md border-l-4 border-green-800 p-6">
          <div className="flex flex-col gap-2 mb-4">
            <h2 className="text-2xl font-bold text-unicauca-grisOscuro">
              {pieza.nombre || NR}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 border-t border-gray-100 pt-4">
            <FichaField emoji="💻" label="Código" value={pieza.codigo} />
            <FichaField emoji="🌎" label="Obtención" value={pieza.obtencion} />
            <FichaField emoji="📐" label="Altura (mm)" value={pieza.altura} />
            <FichaField emoji="📏" label="Diámetro (mm)" value={pieza.diametro} />
            <FichaField emoji="⚖️" label="Peso (g)" value={pieza.peso} />
          </div>
        </div>

        <div>
            <h2 className="text-2xl font-bold text-unicauca-grisOscuro">
              {'.'}
            </h2>
        </div>

        <div className="bg-white rounded-lg shadow-md border-l-4 border-green-800 p-6">
          <div className="flex flex-col gap-2 mb-4">
            <h2 className="text-2xl font-bold text-unicauca-grisOscuro">
              {'Instrucciones de visualización'}
            </h2>
          </div>

          

          <div className="grid grid-cols-1 gap-4 border-t border-gray-100 pt-4">
            <FichaField
              emoji="🖱️"
              label="Rotar"
              value="Mantén presionado el clic izquierdo y arrastra."
            />

            <FichaField
              emoji="✋"
              label="Mover"
              value="Mantén presionado el clic derecho y arrastra."
            />

            <FichaField
              emoji="🔍"
              label="Acercar / Alejar"
              value="Utiliza la rueda del mouse."
            />            
          </div>
        </div>

      </div>

    </div>

  </div>
);
}

Datos.propTypes = {
  pieza: PropTypes.shape({
    nombre:               PropTypes.string,
    numero_catalogo:      PropTypes.string,
    cultura:              PropTypes.string,
    periodo_historico:    PropTypes.string,
    lugar_hallazgo:       PropTypes.string,
    dimensiones:          PropTypes.string,
    material:             PropTypes.string,
    descripcion:          PropTypes.string,
    descripcion_cultural: PropTypes.string,
    usos:                 PropTypes.string,
    relevancia_educativa: PropTypes.string,
    dato_curioso:         PropTypes.string,
    modelo_3d_url:        PropTypes.string,
    modelo_3d_tipo:       PropTypes.oneOf(['gaussian_splat', 'ply', 'glb', 'gltf']),
  }).isRequired,
};

export default Datos;
