# Etapa 1: Construcción
FROM node:20.14.0 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration production

# Etapa 2: Producción
FROM nginx:alpine
COPY --from=build /app/dist/test-sales/browser /usr/share/nginx/html

# Verificar si el archivo index.csr.html existe y renombrarlo a index.html
RUN if [ -f /usr/share/nginx/html/index.csr.html ]; then mv /usr/share/nginx/html/index.csr.html /usr/share/nginx/html/index.html; fi

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
