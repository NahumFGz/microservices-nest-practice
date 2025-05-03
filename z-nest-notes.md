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

- Jwt -> https://docs.nestjs.com/security/authentication
  npm install --save @nestjs/jwt

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

# Instalación de NATS -> https://docs.nestjs.com/microservices/nats

- Comandos
  npm i --save nats

# Nota

- Para agregar endpoints al gateway usar `nest g res <NOMBRE>` luego N en la generación por que no es necesario crear todo xq no será una api rest completa

- Documentación de excepciones en los microservicios -> https://docs.nestjs.com/microservices/exception-filters

# Comandos de Docker

- PostgreSQL
  docker compose up -d

- NATS -> https://hub.docker.com/_/nats
  docker run -d --name nats-server -p 4222:4222 -p 6222:6222 -p 8222:8222 nats

# Pruebas de Stripe

- Comandos
  stripe login
  stripe listen --forward-to <URL_DEL_WEBHOOK>
  stripe listen --forward-to localhost:3003/payments/webhook
  stripe trigger payment_intent.succeeded -> para probar la llamada al webhook

# Pruebas de Hookdeck

- Comandos y web -> https://dashboard.hookdeck.com/connections
  hookdeck login
  hookdeck listen 3003 stripe-to-localhost
  luego con esto puedo crear el webhook deste stripe con la url q proporciona

# Prisma y mongo

- Comandos y notas
  Documentación de prisma y mongo -> https://www.prisma.io/docs/orm/overview/databases/mongodb

  no necesita migración xq se pueden guardar objetos, pero si necesita generar el cliente de prisma

  npx prisma generate

# NOTAS:

- Al dockerizar SQLite en local la carpeta de migrations debe existir -> npx prisma migrate dev --name
- No olvidar insertar datos xq la copia de dev.db es la q aparece en los requests
- En el pdf están los links de la documentacipon de los decoradores personalizados
