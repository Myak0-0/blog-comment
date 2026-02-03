<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Article;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Article::create([
            'title' => 'Первая тестовая статья',
            'content' => 'Это содержимое первой статьи. Здесь может быть много интересного текста, описывающего функционал блога.',
        ]);

        Article::create([
            'title' => 'Полезный контент',
            'content' => 'Задача полезного контента — показать, насколько хорошо вы ориентируетесь в своей нише, а также усилить доверие подписчиков к вашему бренду',
        ]);

        Article::create([ 
            'title' => 'О Инфографике',
            'content' => 'Инфографика — это графическое представление сложной информации. С ее помощью можно доступно изложить сложные данные широкой аудитории.',
        ]);
    }
}
