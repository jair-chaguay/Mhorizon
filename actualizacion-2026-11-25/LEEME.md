# Actualización de la membresía · 25 de noviembre de 2026

Esta carpeta trae solo los archivos de la página de membresía (`/soluciones/membresia`) que cambian, con la misma ruta que tienen en el proyecto. No se modificó ni se borró nada fuera de esta carpeta.

## Cómo aplicarla

Copie la carpeta `frontend` de aquí encima de la carpeta `frontend` del proyecto. Se reemplazan 14 archivos, se agregan 2 componentes nuevos y 24 imágenes. No hay que borrar nada.

Se probó sobre `main` (commit cc6665b): `npm run build` pasa sin errores y la página se genera completa.

## Archivos que se reemplazan

| Archivo | Cambio |
| --- | --- |
| `frontend/src/components/pages/MembresiaPage.tsx` | Nuevo orden de secciones. Quita Comparativa, Alcance e Institucional. Usa PortafolioClientes en lugar de Clients. |
| `frontend/src/components/Membresia/Planes.tsx` | Una sola oferta: precio de lanzamiento USD 110 + IVA (regular USD 150 + IVA), hasta 10 consultas al mes. |
| `frontend/src/components/Membresia/HeroMembresia.tsx` | Precio de lanzamiento y textos nuevos. |
| `frontend/src/components/Membresia/Invitacion.tsx` | Texto de cierre y precio de lanzamiento. |
| `frontend/src/components/Membresia/ModalMembresia.tsx` | Sin selector de plan (ya no hay planes). |
| `frontend/src/components/Membresia/useFormMembresia.ts` | El texto del plan se antepone al mensaje entre corchetes. |
| `frontend/src/components/Membresia/StickyCTA.tsx` | Barra inferior en móvil con precio de lanzamiento. |
| `frontend/src/components/Membresia/Casos.tsx` | Cambio de una pregunta de ejemplo y del botón. |
| `frontend/src/components/Membresia/ExperienciaS.tsx` | Los 3 pasos nuevos (solicite, envíe, reciba en 2 días hábiles). |
| `frontend/src/components/Membresia/PreguntasFre.tsx` | Preguntas frecuentes actualizadas (6). |
| `frontend/src/components/Membresia/Respaldo.tsx` | Textos corregidos. |
| `frontend/src/components/Membresia/PerfilIdeal.tsx` | Textos corregidos. |
| `frontend/src/components/Membresia/Banner.tsx` | Texto de las descripciones un poco más grande y con más espacio. |
| `frontend/src/index.css` | Agrega la clase `.texto-desc` (más interlineado y espacio entre letras y palabras en las descripciones). |

## Archivos nuevos

- `frontend/src/components/Membresia/PortafolioClientes.tsx`: portafolio de clientes con logos a color, todos del mismo tamaño.
- `frontend/src/components/Membresia/Planificacion2027.tsx`: sección "El presupuesto del próximo año se decide ahora". En pantallas de 768 px o más, el "2027" queda fijo y se llena mientras se leen las razones. En móvil se llena al aparecer.

## Imágenes nuevas

`frontend/public/marcas/color/`: 24 logos a color en `.webp` (480 × 240, fondo transparente). Los usa `PortafolioClientes.tsx`.

## Archivos que dejan de usarse

Estos componentes ya no se importan en la página de membresía. Se dejaron tal cual. Se pueden borrar más adelante si se quiere, pero no afectan el build:

- `Membresia/Comparativa.tsx`
- `Membresia/LogosClientes.tsx`
- `Membresia/Alcance.tsx`
- `Membresia/Institucional.tsx`
- `Membresia/Propuesta.tsx`

El componente `Clients` sigue en el sitio para las demás páginas. Solo la página de membresía usa ahora `PortafolioClientes`.

## Backend

No hay cambios. El formulario sigue enviando a `POST /membresia/solicitar`, y el texto del plan va al inicio del mensaje.
