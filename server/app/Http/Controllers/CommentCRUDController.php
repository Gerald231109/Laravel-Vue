<?php

namespace App\Http\Controllers;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentCRUDController extends Controller
{
    public function index()
    {
        $data = Comment::orderBy('created_at', 'desc')->get();
        return ($data);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'text' => 'required',
        ]);
        $comment = new Comment;
        $comment->name = $request->name;
        $comment->text = $request->text;
        $comment->save();
        return $comment;
    }

    public function destroy(Comment $id)
    {
        $id->delete();
        return Comment::all();
    }
}
