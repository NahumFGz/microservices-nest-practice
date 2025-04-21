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

- Generar pipes
  nest g pi nombre-pipe path(common/pipes)
