# Imagem base
FROM php:8.0-fpm

# Instalar dependências e extensões
RUN apt-get update && apt-get install -y libpng-dev libjpeg-dev libfreetype6-dev zip git unzip
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install pdo pdo_mysql gd

# Definir diretório de trabalho
WORKDIR /var/www

# Copiar o projeto existente para o container
COPY . .

# Instalar Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Instalar dependências do projeto
RUN composer install

# Expor a porta
EXPOSE 9000

CMD ["php-fpm"]
