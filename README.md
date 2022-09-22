# Bienvenido a Modelos de Mezcla

Modelos de mezla es una aplicación web desarrollada como TFG del grado en Ingeniería Informática de la Universidad de Burgos. Realiza cálculos estadísticos sobre Mixing Models (modelos de mezcla). Permitiendo calcular las contribuciones de diferentes fuentes a una determinada mezcla a partir de trazadores.

Se ha creado una aplicación web que utiliza las librería GLPK (https://www.gnu.org/software/glpk/) para resolver problemas de maximización y minimización por medio de una interfaz en Typescript. Esta aplicación web permite visualizar y exportar los resultados. El código de la aplicación web esta desarrollado en Angular y utiliza otros lenguajes habituales en las aplicaciones web como HTML y CSS. La aplicación esta internacionalizada a los idiomas Español e Inglés.


## Instalación en Windows

Previamente es necesario tener instalado:

* **Node**: v16.14.0
* Editor código fuente (En este proyecto se trabajo con Visual Studio Code)

Abrimos la terminal y vamos a la ruta donde queremos montar el proyecto. Una vez en la ruta instalamos las depencias angular/cli:

```
> npm install -g @angular/cli
```

Creamos un proyecto Angular, y entramos en la carpeta generada:

```
> ng new mixing\_models
> cd mixing\_models
```

Abrimos el archivo package.json y copiar el contenido del archivo requeriment.txt de este mismo repositorio GitHub. Y copiar de esta forma las dependencias del proyecto. Volvemos a la termininal y ejecutamos el comando que instalara las dependencias:

```
> npm install --legacy-peer-deps
```

A continuación es necesario hacer unas configuraciones en los ficheros creados:

En angular.json: 

```
"assets": [
  "src/favicon.ico",
  "src/assets",
  "src/glpk.all.wasm"
],
```

En package.json:

```
"browser": {
  "fs": false,
  "path": false,
  "os": false,
  "crypto": false
}
```

En tsconfig.json:

```
"target": "es2017"
```

En tsconfig.app.json
```
"types": [ "node" ],
"typeRoots": [ "../node_modules/@types" ]
```

Por último, quitamos la carpeta src y la sustituimos por la que se encuentra en este repositiorio web-app/src

## Ejecución en local

Una vez configurado el proyecto, abrimos la terminal y nos posiciones en path del carpeta del proyectoy ejecutamos el comando:

```
> ng serve -o
```

Este comando compilara y abrirá automáticamente una ventana en nuestro navegador, con la dirección http://localhost:4200/.
