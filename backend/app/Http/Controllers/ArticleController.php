<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function get_articles() {
        return response()->json(Article::all());
    }

    public function get_one_article(Article $article)
    {
        return response()->json($article);
    }

    public function add_article(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $article = Article::create($request->all());

        return response()->json($article);
    }

    public function add_comment_to_article(Request $request, Article $article)
    {
        $validator = Validator::make($request->all(), [
            'author_name' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $comment = $article->comments()->create($request->all());

        return response()->json($comment, 201);
    }
}
