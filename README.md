# Proyecto React Php
El proyecto se encuentra realizado con las siguientes tecnologias:
Front-end:React
Backend:Php,mysql

Pasos para correr el proyecto:

### Backend
Para poder ejecutar Backend deberan descargar las siguientes herramientas
XAMPP : https://www.apachefriends.org/es/download.html
Esta herramienta es la que me permitira correr el mysql en el cual tendremos que crear la base de datos
Una vez instalada la herramienta necesitamos ir a la ubicacion donde se guardo la herramienta y dirigirse hacia el sig documento:

### xampp/htdocs

En este archivo deberemos guardar la carpeta proyectophp que se encuentra en el proyecto reactphp.
Una vez realizado este paso, se tendra que haber instalado el XAMPP Control Panel:
Debemos abrir el control de panel y nos apareceran dos modulos importantes:

### Apache y MySql 

En estos dos modulos me aparecera la opcion darle start, le daremos start a los dos modulos,
Una vez en verde los dos modulos, en el modulo MySql clikearemos la opcion admin,
Esto me abrira el sig localhost:

### localhost/phpmysql

En este local host crearemos nuestra base de datos con la sig informacion:
Base de datos: reactphp
Tabla de BD: items
Campos de la tabla :
  Nombre	      Tipo	Cotejamiento	      Atributos	Nulo	Predeterminado	Extra	
1	id(key)	      int(11)			                         No	   Ninguna		    AUTO_INCREMENT		

2	titulo	      varchar(20)			                     No	   Ninguna				

3	descripcion	  text	                  		         No	   Ninguna			

4	precio	      decimal(20,0)			                   No	   Ninguna

5	imagen	      varchar(255)                         No	   Ninguna
                Tipo de medio: image/jpeg						

Una vez realizado los consiguientes pasos, debremos correr el front-end

### Front-end

En la terminal del directorio del proyecto podes correr 

### `npm start`

Ejecuta la aplicación en modo de desarrollo.
Abra [http://localhost:3000](http://localhost:3000) para verlo en su navegador.


