import { useState } from 'react';
import { useMeta } from '../../hooks/useMeta';

import Datos from "../../Componentes/3D/Datos";
import PageHeader from "../../Componentes/UI/PageHeader";
import SeccionInfo from "../../Componentes/2D/SeccionInfo";

import { piezasQuimbaya } from "../../data/quimbaya";

const Quimbaya = () => {

  useMeta({
    titulo: 'Volantes de Huso — Quimbaya',
    descripcion:
      'Piezas arqueológicas de Quimbaya en el Museo de Historia Natural Unicauca',
  });

  const [indiceActual, setIndiceActual] = useState(0);

  const selectedDoc = piezasQuimbaya[indiceActual];
  const [resetCamera, setResetCamera] = useState(0);

  const anterior = () => {
    setIndiceActual(i =>
      i === 0 ? piezasQuimbaya.length - 1 : i - 1
    );
  };

  const siguiente = () => {
    setIndiceActual(i =>
      i === piezasQuimbaya.length - 1 ? 0 : i + 1
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
          aria-label="Patía — información y piezas arqueológicas"
          className="w-full flex flex-col items-center"
        >

          <PageHeader
            titulo="Quimbaya"
            imagen="/imagenArea/quimbaya.png"
            breadcrumbItems={[
              { label: 'Inicio', path: '/' },
              { label: 'Zonas Arqueológicas', path: '/' },
              { label: 'Quimbaya', path: '/Quimbaya' },
            ]}
          />

          <SeccionInfo
            imagen="/imagenArea/quimbaya.png"
            titulo="Volantes de huso de la zona arqueológica de Quimbaya"
            parrafos={[
              'La colección Quimbaya es la más numerosa de los casos estudiados (N=248), y todos los materiales provienen de donaciones.',
              'Probablemente, debido a que se trata de un conjunto más grande esta muestra presenta mayor diversidad de formas que las otras.',
              'Se observaron troncocónica (33%, N=83), subglobular (23,7%, N=59), cónica (21,7%, N=54), bicónica (11,2%, N=28) y discoidal (9,6%, N=24); una buena parte de estos volantes presenta un apéndice.',
              'La mayoría presenta alguna decoración (89,6%), principalmente incisiones lineales, y otros poseen una mezcla de incisiones con impresiones punteadas y circulares.',
              'En la colección había 20 piezas huecas, con una piedra al interior, funcionando como sonajero.',
              'Tumbas con volantes morfológicamente similares han sido datadas entre los siglos VII y XVI DC.',
            ]}
            invertido={true}
          />

          {piezasQuimbaya.length > 0 && (
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

          {piezasQuimbaya.length === 0 && (
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

export default Quimbaya;