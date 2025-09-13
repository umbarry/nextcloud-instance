FROM php:8.4.12-apache

# Installare il modulo PDO MySQL e altre dipendenze utili
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd \
    && docker-php-ext-install mysqli pdo pdo_mysql \
    && docker-php-ext-install pcntl zip \
    && docker-php-ext-install opcache \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Increase memory limit
RUN echo "memory_limit = 512M" >> /usr/local/etc/php/conf.d/memory-limit.ini

# Abilitare mod_rewrite per Apache (necessario per Nextcloud)
RUN a2enmod rewrite

# Impostare UID e GID (da sostituire con i tuoi valori)
ARG UID=1000
ARG GID=1000
RUN groupmod -g ${GID} www-data && usermod -u ${UID} -g ${GID} www-data