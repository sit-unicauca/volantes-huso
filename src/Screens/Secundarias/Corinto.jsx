import { useState } from 'react';
import { useMeta } from '../../hooks/useMeta';

import Datos from "../../Componentes/3D/Datos";
import PageHeader from "../../Componentes/UI/PageHeader";
import SeccionInfo from "../../Componentes/2D/SeccionInfo";

import { piezasCorinto } from "../../data/corinto";

const Corinto = () => {

  useMeta({
    titulo: 'Volantes de Huso — Corinto',
    descripcion:
      'Piezas arqueológicas de Corinto en el Museo de Historia Natural Unicauca',
  });

  const [indiceActual, setIndiceActual] = useState(0);

  const selectedDoc = piezasCorinto[indiceActual];
  const [resetCamera, setResetCamera] = useState(0);

  const anterior = () => {
    setIndiceActual(i =>
      i === 0 ? piezasCorinto.length - 1 : i - 1
    );
  };

  const siguiente = () => {
    setIndiceActual(i =>
      i === piezasCorinto.length - 1 ? 0 : i + 1
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
          aria-label="Cultura Corinto — información y piezas arqueológicas"
          className="w-full flex flex-col items-center"
        >

          <PageHeader
            titulo="Corinto"
            imagen="/imagenArea/corinto.png"
            breadcrumbItems={[
              { label: 'Inicio', path: '/' },
              { label: 'Zonas Arqueológicas', path: '/' },
              { label: 'Corinto', path: '/Corinto' },
            ]}
          />

          <SeccionInfo
            imagen="/imagenArea/corinto.png"
            titulo="Volantes de huso de la zona arqueológica de Corinto"
            parrafos={[
              'Colección compuesta de 24 piezas donadas, provenientes de contextos funerarios. Se desconoce su cronología, sin embargo, objetos similares fueron excavados en contextos funerarios en la década de 1940.',
              'La cerámica asociada a estos volantes ha sido clasificada como parte del complejo Bolo-Quebrada Seca, datado entre 800-1550 años DC.',
              'Todos los artefactos de Corinto presentan una estructura compuesta, es decir, se moldearon de dos o más volúmenes. Las formas no varían y todas corresponden a un cuerpo discoidal con apéndice cilíndrico.',
              'A pesar de la erosión, se distingue mayoritariamente el uso de pintura roja como tipo de decoración, la que se encuentra en el cuerpo, la base y el apéndice.',
            ]}
            invertido={true}
          />

          {piezasCorinto.length > 0 && (
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

          {piezasCorinto.length === 0 && (
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

export default Corinto;