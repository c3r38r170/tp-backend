# Enunciado general del TP:

En resumen se trata de un sistema de administración de "tokens", que permite transacciones entre usuarios de una moneda virtual sin valor real. Este sistema puede usarse tanto de manera lúdica como seria (algunos ejemplos serían usarlo como programa de recompensas de alguna tienda o como administración de puntaje de alguna dinámica informal).

[Sistema de Tokens](tokenizate.com.ar)

## Cómo usar:

### Base de datos

Correr alguna base de datos.

Añadir las credenciales en [el archivo de la base de datos](proyecto/backend/datos/db.js).

Por default tiene configurado los datos de la base de datos MariaDB en mi localhost.

### Proyecto

Abrir la carpeta proyecto en la consola.

    npm start 

para el backend.
Debería crear las tablas y un par de permisos solo.

    ng serve

Para el frontend.

Como primer paso para usar todos los botones estaría crear un usuario.

## ABMC
- Usuario
  - Nombre completo
  - Nombre de usuario
  - Contraseña
  - Correo
  - DNI
  - Habilitado
## ABMC dependiente
- Tokens
  - Dueño (Usuario)
## Listado simple
- Tipos de tokens para enviar
## Listado complejo
- Personas para enviar token (filtrado en backend)
- Filtra por nombre, nick o DNI
## Detalle
- Usuario y permisos
- Por ID de usuario o por ID de permiso.
## Equipo
Santiago Abud - legajo 47015
## Modelo de dominio
 ![Modelo de dominio del Sistema de Tokens](modelo-de-dominio.png)
## Tecnologías:
- NodeJS
- Express
- Angular
- MySQL
- Sequelize
- FW CSS [Chota](https://jenil.github.io/chota/)

### 1.2 - Funcionalidad

1 de cada uno:

|Requerimiento funcional|Descripcion|Cumple?|
|:-|:-|-|
|ABMC simple|Usuario|:heavy_check_mark:
|ABMC dependiente|Tokens|:heavy_check_mark:
|Listado simple|Personas (selección de edición)|:heavy_check_mark:
|Listado complejo obligatorio|Personas (envío de tokens)|:heavy_check_mark:
|Detalle básico|Usuario y permisos|:heavy_check_mark:
