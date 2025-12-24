# Estágio de Build
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Estágio de Produção (Nginx)
FROM nginx:alpine

# Copia os arquivos do build (React/Vite)
COPY --from=build /app/dist /usr/share/nginx/html

# Copia o script que criamos
COPY ./env.sh /docker-entrypoint.d/env.sh

# Dá permissão de execução
RUN chmod +x /docker-entrypoint.d/env.sh

# Configuração Padrão do Nginx para SPA (React Router) - Opcional mas recomendado
# Se você tiver um arquivo nginx.conf personalizado, descomente abaixo
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# O ENTRYPOINT do script.
# Vamos usar o shell para rodar o script e depois lançar o nginx
CMD ["/bin/sh", "-c", "/docker-entrypoint.d/env.sh && nginx -g 'daemon off;'"]