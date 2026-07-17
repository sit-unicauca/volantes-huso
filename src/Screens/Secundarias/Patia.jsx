import { useState } from 'react';
import { useMeta } from '../../hooks/useMeta';

import Datos from "../../Componentes/3D/Datos";
import PageHeader from "../../Componentes/UI/PageHeader";
import SeccionInfo from "../../Componentes/2D/SeccionInfo";

import { piezasPatia } from "../../data/patia";

const Patia = () => {

  useMeta({
    titulo: 'Volantes de Huso — Patía',
    descripcion:
      'Piezas arqueológicas de Patía en el Museo de Historia Natural Unicauca',
  });

  const [indiceActual, setIndiceActual] = useState(0);

  const selectedDoc = piezasPatia[indiceActual];
  const [resetCamera, setResetCamera] = useState(0);

  const anterior = () => {
    setIndiceActual(i =>
      i === 0 ? piezasPatia.length - 1 : i - 1
    );
  };

  const siguiente = () => {
    setIndiceActual(i =>
      i === piezasPatia.length - 1 ? 0 : i + 1
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
            titulo="Patía"
            imagen="/imagenArea/patia.png"
            breadcrumbItems={[
              { label: 'Inicio', path: '/' },
              { label: 'Zonas Arqueológicas', path: '/' },
              { label: 'Patía', path: '/Patia' },
            ]}
          />

          <SeccionInfo
            imagen="/imagenArea/patia.png"
            titulo="Volantes de huso de la zona arqueológica de Patía"
            parrafos={[
              'La colección de esta región la componen 31 piezas, de las cuales 15 provienen de una investigación arqueológica en el valle del Patía, dos de los estudios de Henri Lehmann (1953), 10 donadas, dos sin origen preciso y dos pertenecientes a una investigación que no cuenta con reporte de su origen.',
              'La mayoría de los volantes fueron recolectados en el municipio de Patía (N=23); algunos no tienen asociaciones conocidas (N=12), otros provienen de contextos funerarios (N=11) y unos pocos de los municipios de Mercaderes (N=6), La Sierra (N=1) y San Lorenzo (N=1).',
              'Todos presentan estructura simple, algunos de base ligeramente convexa (N=2), y además, se aprecia variedad de formas: cónica (45%, N=14), semiesférica (45%, N=14) y discoidal (10%, N=3).',
              'Se pueden distinguir diferentes tipos de decoración, como pintura roja (N=3), impresiones y punteado (N=6), o un compuesto de técnicas de incisión, escisión e impresión punteada (N=3).',
              'Las ornamentaciones se hallan especialmente en el cuerpo y la base de los artefactos, predominando figuras geométricas triangulares o en cruz, ya sean incisas o punteadas.',
            ]}
            invertido={true}
          />

          {piezasPatia.length > 0 && (
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

          {piezasPatia.length === 0 && (
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

export default Patia;