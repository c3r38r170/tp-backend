# Enunciado general del tp.

En resumen se trata de un sistema de administración de "tokens", que permite transacciones entre usuarios de una moneda virtual sin valor real. Este sistema puede usarse tanto de manera lúdica como seria (algunos ejemplos serían usarlo como programa de recompensas de alguna tienda o como administración de puntaje de alguna dinámica informal). 

## ABMC
- Usuario
  - Nombre
  - Contraseña
  - Correo
  - 
    * Listado: breve descripción del listado (1 línea), tipo (simple, complejo)
    * Detalle: entidades involucradas y, si corresponde, los parámetros.
  * Miembros del equipo indicando, legajo, nombre y apellido.
  * Modelo de dominio o modelo de datos. Una imagen referenciada.

API REST  frontend parcial  NodeJS. Express 
- ODM/ORM con una base de datos persistente acorde a la tecnología que se utilice.
  Angular y para CSS debe usarse un preprocessador o framework.
(o utilizar el del año 2017)

### 1.2 - Funcionalidad
Ver [checklist]
#### 1.2.1 - Backend por API REST o GraphQL

  * ABMC:
      * 1 ABMC de entidad simple (no depende de otras entidades) por API.

      * 1 ABMC de una entidad que requiera de otra ya existente de la que se hizo ABMC en el item anterior. Ej: ABMC de articulos donde un atributo sea la categoría que a su vez es una entidad con ABMC. 

      * Otros ABMC que exedan el mínimo requerido pueden hacerse manualmente por base de datos o por API. Si se hacen por API suman nota adicional. Sólo se considerarán el doble de ABMCs

  * Listados por API:
      * Listado simple: al menos uno de las entidades creadas por API.
      * 1 Listado complejo:

        * Opción 1: debe incluir datos de al menos dos entidades.
        * Opción 2: el listado debe permitir filtrar por al menos 1 atributo.

      * Sólo se considerarán listados complejos con filtros de uno o más atributos para nota adicional.

  * 1 Detalle:
    * Presentar un detalle por API de alguno de los elementos en un listado
    * Al realizar el request se debe utilizar un ID u otro identificador obtenido de un elemento del listado, deberán devolverse más datos sobre el mismo que los que figuran en el listado.
    * El mismo debe proveer información de dos o más entidades relacionadas. La información adicional debe ser acorde al tipo de API (REST o GraphQL) utilizada.


  * Otros: En caso de querer implementar otros elementos en reemplazo o adición a los requeridos pactar con los docentes primero.

#### 1.2.2 - Frontend

  * El frontend al menos deberá permitir invocar a la API y mostrar los resultados de uno de los listados. Haciendo click en un elemento del listado (o parte de él) debe mostrar el detalle correspondiente a un elemento de dicho listado invocando a una API del listado creada para el backend.

  * El resto de la funcionalidad puede utilizarse mediante una herramienta similar a postman, restclient, curl o wget.

  * No se considerará trabajo adicional en el frontend para sumar nota ya que hay un TP dedicado a ello.

## 2 - Alcance y Entregas
### 2.1 - Definición de Alcance

El equipo deberá definir el alcance del trabajo práctico con el equipo docente. Indicando los criterios de aceptación.

Las mismas podrán volverse a pactar con los profesores enviando las correcciones a la misma indicando, causas, acciones correctivas que se tomarán.

En caso de realizar cambios sobre el alcance deberá dejarse una copia de la versión pactada original dentro del repositorio.

### 2.2 - Entrega Inicial

Para iniciar el proyecto deberá crear un fork de este repositorio.
Editar el README.md para incluir:

En el readme de dicho repo debe figurar:
  * Enunciado general del tp.
  * Indicado una breve descripción para cada item requerido.
    * ABMC: nombre de la entidad y atributos.
    * Listado: breve descripción del listado (1 línea), tipo (simple, complejo)
    * Detalle: entidades involucradas y, si corresponde, los parámetros.
  * Miembros del equipo indicando, legajo, nombre y apellido.
  * Modelo de dominio o modelo de datos. Una imagen referenciada.

Enviar por mail y telegram al profesor la URL del repositorio git para validar el alcance. Esperar la autorización del enunciado. Una vez hecho esto puede comenzar el desarrollo del mismo.

Recuerde revisar el [checklist]

### 2.3 - Entrega Final

  Para realizar la entrega deberá en primer lugar crearse un tag en el repositori de git.

  La entrega final deberá hacerse enviando por email y telegram a los profesores la URL del tag de git.

  Pactar con el docente un fecha para la defensa.


## 3 - Criterio de correccion

### 3.1 - Código
  * Diseño adecuado de la API.
  * Diseño del modelo de datos adecuado.
  * Usabilidad del sitio: debe ser fácil de usar, elegante y no tener contenido oculto o difícil de acceder
  * Diseño adecuado de la interfaz: uso apropiado de los tags html y de los estilos, ya sea utilizando un FW CSS o un preprocesador.
  * Calidad del código: uso adecuado de las características del FW y de la API.
  * Completitud de los requerimientos.

### 3.3 - Defensa

Todos los miembros del grupo deberán aprobar una defensa del código y funcionalidad del TP con los profesores.

Luego de la defensa el resultado puede ser:
* Desarrollo aprobado - Defensa aprobada: se considerará el TP aprobado y se definirá una nota.
* Desarrollo a revisión - Defensa aprobada: se considera aprobada la defensa y se indicarán cambios a realizar en el código. En este caso deberá corregirse el código y enviarse un nuevo tag con las correcciones indicadas en un plazo acordado con el docente. No deberá repetirse la defensa.
* Desarrollo aprobado - Defensa a repetir: se considera el código adecuado y aprobado. Deberá repetirse la defensa en un plazo acordado con el docente.
* Desarrollo a revisión - Defensa a repetir: se pactará una nueva fecha de entrega y defensa con el docente.

[checklist]: ./checklist/README.md
