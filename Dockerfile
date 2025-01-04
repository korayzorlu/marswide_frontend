# Base image
FROM node:22.12.0

# Çalışma dizini olarak projenizin bulunduğu dizini ayarlayın
WORKDIR /app

# Projenizin package.json ve package-lock.json dosyalarını yükleyin
COPY package*.json ./

# Npm veya yarn dependency'lerini yükleyin
RUN npm install

# Proje dosyalarını yükleyin
COPY . .

# Uygulamayı çalıştır
CMD ["npm", "start"]