<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Repositories\Eloquent\Blogs\Posts\PostInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Blog/Dashboard/Index', [
            'postCount' => app()->make(PostInterface::class)->getCountByColumn([
                'user_id' => auth()->user()->id,
            ]),
        ]);
    }
}
