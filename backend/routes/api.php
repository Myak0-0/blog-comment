<?php

use App\Http\Controllers\ArticleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/articles', [ArticleController::class, 'get_articles']);

Route::get('/articles/{id}', [ArticleController::class, 'get_one_article']);

Route::post('/articles', [ArticleController::class, 'add_article']);

Route::get('/comments', [ArticleController::class, 'get_comments']);

Route::post('/articles/{id}/comments', [ArticleController::class, 'add_comment_to_article']);