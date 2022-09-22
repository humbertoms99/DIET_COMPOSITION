# Bienvenido a Modelos de Mezcla

Modelos de mezcla es una aplicación web desarrollada como TFG del grado en Ingeniería Informática de la Universidad de Burgos. Realiza cálculos estadísticos sobre Mixing Models (modelos de mezcla). Permitiendo calcular las contribuciones de diferentes fuentes a una determinada mezcla a partir de trazadores.

Se ha creado una aplicación web que utiliza la librería GLPK (https://www.gnu.org/software/glpk/) para resolver problemas de maximización y minimización por medio de una interfaz en Typescript. Esta aplicación web permite visualizar y exportar los resultados. El código de la aplicación web está desarrollado en Angular y utiliza otros lenguajes habituales en las aplicaciones web como HTML y CSS. La aplicación está internacionalizada a los idiomas Español e Inglés.

## Instalación en Windows

Previamente, es necesario tener instalado:

* **Node**: v16.14.0
* Editor código fuente (En este proyecto se trabajó con Visual Studio Code)

Abrimos la terminal y vamos a la ruta donde queremos montar el proyecto. Una vez en la ruta instalamos las dependencias angular/cli:

```
> npm install -g @angular/cli
```

Creamos un proyecto Angular, y entramos en la carpeta generada:

```
> ng new mixing_models
> cd mixing_models
```

Abrimos el archivo package.json y copiar el contenido del archivo requeriment.txt de este mismo repositorio GitHub. Y copiar de esta forma las dependencias del proyecto. Volvemos a la terminal y ejecutamos el comando que instalara las dependencias:

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

En tsconfig.json:

```
"target": "es2017"
```

En tsconfig.app.json
```
"types": [ "node" ],
"typeRoots": [ "../node_modules/@types" ]
```

Por último, quitamos la carpeta src y la sustituimos por la que se encuentra en este repositorio web-app/src

## Ejecución en local

Una vez configurado el proyecto, abrimos la terminal y nos posiciones en path de la carpeta del proyecto y ejecutamos el comando:

```
> ng serve -o
```

Este comando compilará el código, y abrirá automáticamente una ventana en nuestro navegador. Con la dirección http://localhost:4200/.

## Aplicación desplegada

La aplicación ha sido desplegada en https://www.netlify.com/, un sitio web que nos permite alojar nuestra aplicación de forma gratuita.

Y puede ser accesible desde: https://mixingmodels.netlify.app/

# Welcome to Mixing Models

Mixing Models is a web application developed as a TFG for the degree in Computer Engineering at the University of Burgos. It performs statistical calculations on Mixing Models. It allows to calculate the contributions of different sources to a given mixture from tracers.

A web application has been created that uses the GLPK library (https://www.gnu.org/software/glpk/) to solve maximisation and minimisation problems by means of a Typescript interface. This web application allows the results to be visualised and exported. The code of the web application is developed in Angular and uses other common languages in web applications such as HTML and CSS. The application is internationalised in Spanish and English.

## Installation on Windows

Previously, it is necessary to have installed:

* **Node**: v16.14.0
* Source code editor (In this project we worked with Visual Studio Code).

We open the terminal and go to the path where we want to mount the project. Once in the path we install the dependencies angular/cli:

```
> npm install -g @angular/cli
```

We create an Angular project, and enter the generated folder:

```
> ng new mixing_models
> cd mixing_models
```

We open the package.json file and copy the content of the file requeriment.txt from this same GitHub repository. And copy in this way the dependencies of the project. We go back to the terminal and run the command that will install the dependencies:

```
> npm install --legacy-peer-deps
```

Next, it is necessary to make some configurations in the created files:

In angular.json: 

```
"assets": [
  "src/favicon.ico",
  "src/assets",
  "src/glpk.all.wasm"
],
```

In tsconfig.json:

```
"target": "es2017"
```

In tsconfig.app.json
```
"types": [ "node" ],
"typeRoots": [ "../node_modules/@types" ]
```

Finally, we remove the src folder and replace it with the one found in this web-app/src repository

## Local execution

Once the project is configured, we open the terminal and we position ourselves in the path of the project folder and execute the command:

```
> ng serve -o
```

This command will compile the code, and will automatically open a window in our browser. With the address http://localhost:4200/.

## Application deployed

The application has been deployed on https://www.netlify.com/, a website that allows us to host our application for free.

It can be accessed from: https://mixingmodels.netlify.app/
