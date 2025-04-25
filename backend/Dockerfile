FROM node:20

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia solo el package.json y package-lock.json para optimizar la instalación de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del backend (incluyendo el código fuente)
COPY . .

# Expón el puerto que la app utilizará
EXPOSE 3000

# Comando para arrancar la aplicación
CMD ["npm", "start"]
