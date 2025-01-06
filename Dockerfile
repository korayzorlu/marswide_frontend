# Base image
FROM node:22.12.0

# Set working directory
WORKDIR /app

# Projenizin package.json ve package-lock.json dosyalarını yükleyin
COPY package*.json ./

# Npm veya yarn dependency'lerini yükleyin
RUN npm install

# Copy the project files
COPY . .

RUN npm run build
#RUN npm install -g server

# Uygulamayı çalıştır
# CMD ["npm", "start"]

# Expose the port
# EXPOSE 3000



