<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Comment;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function get_comments() {
        return response()->json(Comment::all());
    }

    public function get_articles() {
        return response()->json(Article::orderBy('created_at', 'desc')->get());
    }

    public function get_one_article(Article $id)
    {
        $id->load('comments'); 
        return response()->json($id);
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

    public function add_comment_to_article(Request $request, Article $id)
    {
        $validator = Validator::make($request->all(), [
            'author_name' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $comment = $id->comments()->create($request->all());

        return response()->json($comment, 201);
    }
}
