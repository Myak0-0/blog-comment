## Инструкция по запуску

### 1. Backend (Laravel API)
Убедитесь, что Docker Desktop запущен.
cd backend
cp .env.example .env
# Установка зависимостей
docker run --rm -v ${PWD}:/var/www/html -w /var/www/html laravelsail/php83-composer:latest composer install

Проверьте что в файле .env, подключение к базе выглядит так (если нет, исправьте)
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=blog_comment
DB_USERNAME=sail
DB_PASSWORD=password

В WSL консоли, в папке backend
./vendor/bin/sail up -d
./vendor/bin/sail artisan key:generate

# Миграции и наполнение тестовыми данными
./vendor/bin/sail artisan migrate --seed
./vendor/bin/sail artisan db:seed --class=ArticleSeeder


## 2. Frontend (React)
Откройте второй терминал:
cd frontend
npm install
npm run dev -- --host

Открываете запущенный хост и смотрите работу
