#!/bin/sh

# Caminho onde o Nginx serve os arquivos (padrão)
dir="/usr/share/nginx/html"

# Cria o arquivo env-config.js
# Se a variavel VITE_API_URL não for passada, fica vazia
echo "window._ENV_ = {" > "$dir/env-config.js"
echo "  VITE_API_URL: \"${VITE_API_URL}\"" >> "$dir/env-config.js"
echo "};" >> "$dir/env-config.js"

# Executa o comando original do Docker (iniciar o Nginx)
exec "$@"