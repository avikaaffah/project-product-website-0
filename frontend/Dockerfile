# Gunakan image nginx resmi
FROM nginx:alpine

# Copy file konfigurasi nginx ke container
COPY nginx.conf /etc/nginx/nginx.conf

# Copy semua file frontend ke folder default nginx
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Jalankan nginx
CMD ["nginx", "-g", "daemon off;"]
