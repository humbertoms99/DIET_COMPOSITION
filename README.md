# Bienvenido a Modelos de Mezcla

es una aplicación web desarrollada como TFG del grado de ingeniería informática de la Universidad de Burgos que realiza un análisis de sentimientos de textos extraídos de las redes sociales Twitter e Instagram.

Modelos de mezla es una aplicación web desarrollada como TFG del grado en Ingeniería Informática de la Universidad de Burgos. Realiza cálculos estadísticos sobre \emph{Mixing Models} (modelos de mezcla). Permitiendo calcular las contribuciones de diferentes fuentes a una determinada mezcla a partir de trazadores.

Se ha creado una aplicación web que utiliza las librería GLPK (https://www.gnu.org/software/glpk/) para resolver problemas de maximización y minimización por medio de una interfaz en \emph{Typescript}. Esta aplicación web permite visualizar y exportar los resultados. El código de la aplicación web esta desarrollado en \emph{Angular} y utiliza otros lenguajes habituales en las aplicaciones web como HTML y CSS. La aplicación esta internacionalizada a los idiomas Español e Inglés.


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

Abrimos el archivo \textbf{package.json} y copiar el contenido de la carpeta \textit{requeriment.txt} de este mismo repositorio GitHub. Y copiar de esta forma las dependencias del proyecto. Volvemos a la termininal y ejecutamos el comando que instalara las dependencias:

```
> npm install --legacy-peer-deps
```

A continuación es necesario hacer unas configuraciones en los ficheros creados:

En el \textbf
