# Instalaciones básicas

## Librerias

- Instalar NestJs de forma global (solo una vez)
  npm i -g @nestjs/cli

- Filtrar desde el DTO
  npm i class-validator class-transformer

- Instalar TypeORM
  npm install @nestjs/typeorm typeorm pg

- Uso de variables de entorno
  npm install @nestjs/config

- Para trabajar con fechas
  npm install date-fns

- Cloudinary
  npm i cloudinary
  npm i streamifier
  npm i -D @types/streamifier
  npm i -D @types/multer

- Universal Unique Id
  npm i uuid
  npm i -D @types/uuid

- Variables de entorno
  npm i dotenv

- Validador de esquemas
  npm install joi

## Comandos de NestJs CLI

- Para crear un proyecto
  nest new backend

- Generar módulo
  nest generate module nombre_modulo
  nest g mo nombre_modulo

- Generar controladores
  nest generate controller nombre_controller
  nest g co nombre_controller

- Generar services/providers
  nest generate provider nombre_provider
  nest g pr nombre_provider

- Generar recursos
  nest g res categories
  nest g res products --no-spec

- Generar pipes
  nest g pi nombre-pipe path(common/pipes)

# PrismaOrm -> https://docs.nestjs.com/recipes/prisma

- Instalación e inicialización
  npm install -D prisma
  npx prisma init

- Crear migración e instalar cliente de prisma
  npx prisma migrate dev --name init
  npm install @prisma/client

# Configuración de microservicios -> https://docs.nestjs.com/microservices/basics

- Instalaer nest microservices
  npm i --save @nestjs/microservices

- Inyeccion del token en el cliente

# Nota

- Para agregar endpoints al gateway usar `nest g res <NOMBRE>` luego N en la generación por que no es necesario crear todo xq no será una api rest completa

- Documentación de excepciones en los microservicios -> https://docs.nestjs.com/microservices/exception-filters

# Comandos de Docker

- PostgreSQL
  docker compose up -d

- NATS -> https://hub.docker.com/_/nats
  docker run -d --name nats-server -p 4222:4222 -p 6222:6222 -p 8222:8222 nats
