#Istalacion modulo Angular
npm install @angular-devkit/build-angular

#Seguridad para generar token con JWT
user:pfcti
password:123


#docker
#Backend
#Construir imagen
docker build -t backend-pfcti-image:0.0.1 . 
#subir imagen al repositorio
docker tag backend-pfcti-image:0.0.1 apiedra/backend-pfcti-image:0.0.1
docker push apiedra/backend-pfcti-image:0.0.1
#Descargar imagen del repositorio
docker pull apiedra/backend-pfcti-image:0.0.1
#Correr el servicio
docker run -d -p 3000:3000 --name backend-pfcti-image -e db_connection_string="172.30.82.20:1521" -e user="alepie" -e password="Alajuela09" backend-pfcti-image:0.0.1

#Frontend
#Construir imagen
docker build -t frontend-pfcti-image:0.0.1 .
#subir imagen al repositorio
docker tag frontend-pfcti-image:0.0.1 apiedra/frontend-pfcti-image:0.0.1
docker push apiedra/frontend-pfcti-image:0.0.1
#Descargar imagen del repositorio
docker pull apiedra/frontend-pfcti-image:0.0.1
#Correr el servicio
docker run -d -p 4200:4200 --name frontend-pfcti-image --link backend-pfcti-image frontend-pfcti-image:0.0.1


#logstach
El uso que le he dado al logstach es para sistemas que actualmente se encuentran en un servidor weblogic para logs no estructurados.
Para esta funcion se corre la tarea "bin/logstash -f logstash.conf" que interpreta los logs y los envía a 
logstach y ser vistos finalmente en kibana.
Desde nodejs se puede enviar directamente los logs a elasticsearch sin embargo por temas de tiempo no logré aplicarlo al ejercicio.
De igual forma adjunto en el proyecto la carpeta del logstach con la configuración para ser visualizada en los demás componentes.

#elasticsearch
docker pull docker.elastic.co/elasticsearch/elasticsearch:6.7.0
docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:6.7.0

#kibana
docker pull docker.elastic.co/kibana/kibana:6.7.0
docker run --link fc9f3fda88ac:elasticsearch -p 5601:5601 docker.elastic.co/kibana/kibana:6.7.0