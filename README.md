# Proyecto NOC

El objetivo es crear una seride tareas usando la Arquitectura Limpia con TypeScript

# dev
1. Clonar el archivo a env.template a .env
2. Configurar las variables de entorno

```
PORT = 3000
MAILER_EMAIL = ferjesusurd@gmail.com
MAILER_EMAIL_KEY = 123456
PROD = true

```

```
3. Ejecutar 
```
npm install
```
4. Levantar las bases de datos con el comando 
```
docker compose up -d
```
5. Ejecutar 
```
npm run dev
```