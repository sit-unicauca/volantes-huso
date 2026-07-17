import { useState } from 'react';
import { useMeta } from '../../hooks/useMeta';

import Datos from "../../Componentes/3D/Datos";
import PageHeader from "../../Componentes/UI/PageHeader";
import SeccionInfo from "../../Componentes/2D/SeccionInfo";

import { piezasPopayan } from "../../data/popayan";

const Popayan = () => {

  useMeta({
    titulo: 'Volantes de Huso — Popayán',
    descripcion:
      'Piezas arqueológicas de Popayán en el Museo de Historia Natural Unicauca',
  });

  const [indiceActual, setIndiceActual] = useState(0);

  const selectedDoc = piezasPopayan[indiceActual];
  const [resetCamera, setResetCamera] = useState(0);

  const anterior = () => {
    setIndiceActual(i =>
      i === 0 ? piezasPopayan.length - 1 : i - 1
    );
  };

  const siguiente = () => {
    setIndiceActual(i =>
      i === piezasPopayan.length - 1 ? 0 : i + 1
    );
  };

  const restaurarVista = () => {
    console.log("reset");
      setResetCamera(v => v + 1);
  };

  return (
    <div className="w-full bg-unicauca-blancoRoto">
      <main className="w-full">

        <section
          aria-label="Popayán — información y piezas arqueológicas"
          className="w-full flex flex-col items-center"
        >

          <PageHeader
            titulo="Popayán"
            imagen="/imagenArea/popayan.png"
            breadcrumbItems={[
              { label: 'Inicio', path: '/' },
              { label: 'Zonas Arqueológicas', path: '/' },
              { label: 'Popayán', path: '/Popayan' },
            ]}
          />

          <SeccionInfo
            imagen="/imagenArea/popayan.png"
            titulo="Volantes de huso de la zona arqueológica de Popayán"
            parrafos={[
              'Los volantes del valle de Popayán son 34: 13 (38%) provienen de las excavaciones arqueológicas de contextos funerarios en la loma del Chirimoyo, en la antigua hacienda La María, hoy barrio María Oriente de la ciudad de Popayán, uno (3%) de la excavación de un contexto doméstico en la colina de Molanga, y los 20 restantes (59%) corresponden a donaciones.',
              'Todos ellos proceden de los municipios de Popayán (68%), El Tambo (20%), Timbío (9%) y Totoró (3%).',
              'En la colección predomina una forma simple, principalmente cónica (88%, N=30), aunque también hay especímenes semiesféricos (6%, N=2) y discoidales (6%, N=2).', 
              'En varios de ellos, la superficie se encontraba erosionada, pero igualmente se pueden distinguir diferentes tipos de decoración, como pintura roja o naranja (N=8), presiones punteadas (n=1), o una mezcla de técnicas que incluyen incisiones, escisiones y punteados (N=3).', 
              'La ornamentación se realizó principalmente en la base del volante, con un patrón en el diseño de líneas pintadas o incisas formando una X. También hay punteados y con escisiones en el cuerpo del artefacto.', 
              'No hay fechados asociados a estos artefactos, pero en el sitio Granja Caldas se recolectó uno hallado en un asentamiento datado en el siglo VIII DC.',
            ]}
            invertido={true}
          />

          {piezasPopayan.length > 0 && (
            <>
              <div className="w-full flex flex-col items-center py-8">
                

                <div className="flex items-center gap-4">
                  <button
                    onClick={anterior}
                    className="px-4 py-2 rounded bg-unicauca-azul text-white hover:bg-unicauca-azulhover"
                  >
                    Anterior
                  </button>
                  
                  <button
                    onClick={siguiente}
                    className="px-4 py-2 rounded bg-unicauca-azul text-white hover:bg-unicauca-azulhover"
                  >
                    Siguiente
                  </button>

                  <button
                    onClick={restaurarVista}
                    className="px-4 py-2 rounded bg-unicauca-azul text-white hover:bg-unicauca-azulhover"
                  >
                    Restaurar Vista
                  </button>
                </div>
                <Datos pieza={selectedDoc}  resetCamera={resetCamera} />
              </div>

              
              
            </>
          )}

          {piezasPopayan.length === 0 && (
            <div className="w-full py-16">
              <p className="text-unicauca-grisOscuro text-lg">
                No hay piezas arqueológicas registradas.
              </p>
            </div>
          )}

        </section>

      </main>
    </div>
  );
};

export default Popayan;