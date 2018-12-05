# the image we need for nodejs application
FROM mysql:5.7.24

ENV MYSQL_ROOT_PASSWORD ayulestari
ENV MYSQL_USER users_service
ENV MYSQL_PASSWORD ayulestari
ENV MYSQL_DATABASE currencyexchanges

COPY ./currencyexchanges.sql /docker-entrypoint-initdb.d/

EXPOSE 3306
