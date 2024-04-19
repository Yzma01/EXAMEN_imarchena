# Examen_1 Progra IV

---
1. [Instrucciones para correr el proyecto](#instrucciones-para-correr-el-proyecto)
2. [Endpoints disponibles](#endpoints-disponibles)
    1. [Model User](#model-user)
    2. [Model ScheduleDates](#model-scheduledates)
    3. [Model Vacations](#model-vacations)
---
Para correr el proyecto, sigue estos pasos:
# Instrucciones para correr el proyecto

1. En la carpeta deseada, ejecuta el siguiente comando para clonar el repositorio:
    ```bash
    git clone https://github.com/Yzma01/EXAMEN_imarchena.git
    ```

2. Luego, instala las dependencias del proyecto con el siguiente comando:
    ```bash
    npm i
    ```

3. Después de instalar las dependencias, inicia el servidor con el siguiente comando:
    ```bash
    npm run dev
    ```

Este comando establecerá todas las conexiones necesarias y pondrá el API en escucha.

## Endpoints disponibles

### Model User

Campos del modelo:
```json
{
    "name": "name",
    "lastName": "lastname",
    "email": "email",
    "username": "username",
    "userId": "userId",
    "password": "password",
    "rol": "rol" 
}
```
Endpoints:
> **PUT**: Modifica el usuario que se pasa en el cuerpo de la solicitud. Requiere token.
```bash
http://localhost:3000/api/users/[id]
```
> **POST**: Genera un token para el usuario que se pasa en el cuerpo de la solicitud.
```bash
http://localhost:3000/api/users/authenticate
```
> **GET**: Devuelve todos los usuarios. Requiere token.
```bash
http://localhost:3000/api/users
```
> **POST**: Registra el usuario que se pasa en el cuerpo de la solicitud.
```bash
http://localhost:3000/api/users/register
```
> **DELETE**: Borra al usuario con el ID especificado. Requiere token
```bash
http://localhost:3000/api/users/[id]
```
### Model ScheduleDates

Campos del modelo:
```json
{
    "date": "aaaa-MM-dd",
    "hour": [7,20],
    "username": "username",
    "userId": "userId",
    "description": "description",
    "state": "state", 
    "id": "// requerido solo cuando es para borrar o actualizar una cita"
}
```
Endpoints:
> **PUT**: Actualiza la cita con los parámetros especificados. El ID de la cita debe ir en el cuerpo de la solicitud.
```bash
http://localhost:3000/api/date/[id]
```
> **POST**: Registra la cita que se pasa en el cuerpo de la solicitud
```bash
http://localhost:3000/api/date/register
```
> **GET**: Obtiene todas las citas del usuario.
```bash
http://localhost:3000/api/date/[id]
```
> **DELETE**: Borra la cita con el ID especificado. El ID debe ir en el cuerpo de la solicitud.
```bash
http://localhost:3000/api/date/[id]
```
### Model Vacations

Campos del modelo:
```json
{
    "startDate": "aaaa-MM-dd",
    "endingDate": "aaaa-MM-dd",
    "userId": "userId",
    "comment": "comment",
    "state": "state", 
    "id": "// requerido solo cuando es para borrar o actualizar una vacación"
}

```
Endpoints:
> **PUT**: Actualiza la vacación con los parámetros especificados. El ID de la vacación y del usuario deben ir en el cuerpo de la solicitud.
```bash
http://localhost:3000/api/vacations/[id]
```
> **POST**: Registra una vacación para las fechas indicadas.
```bash
http://localhost:3000/api/date/vacations
```
> **GET**: Retorna todas las vacaciones.
```bash
http://localhost:3000/api/vacations
```
> **DELETE**: Borra la vacación con el ID especificado. El ID de la vacación y del usuario deben ir en el cuerpo de la solicitud.
```bash
http://localhost:3000/api/vacations/[id]
```
