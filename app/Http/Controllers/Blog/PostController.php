<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Repositories\Eloquent\Blogs\Categories\CategoryInterface;
use App\Repositories\Eloquent\Blogs\Posts\PostInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * @var PostInterface
     * @var CategoryInterface
     */
    public function __construct(
        protected PostInterface $postInterface,
        protected CategoryInterface $categoryInterface
        ) {}


    public function index(Request $request)
    {
        $filters = $request->all('searchParam', 'sortBy', 'sortDirection', 'rowPerPage', 'page');
        $filters['sortBy'] = $filters['sortBy'] ?? 'id';
        $filters['sortDirection'] = $filters['sortDirection'] ?? 'desc';
        $filters['rowPerPage'] = $filters['rowPerPage'] ?? 10;
        $filters['writer'] = false;
        return Inertia::render('Blog/Home/Index', [
            'posts' => $this->postInterface->filter($filters, ['category']),
            'filters' => $filters,
            'categories' => $this->categoryInterface->getByColumn([], ['slug as value', 'name as label']),
        ]);
    }

    public function WriterIndex(Request $request)
    {
        $filters = $request->all('searchParam', 'sortBy', 'sortDirection', 'rowPerPage', 'page');
        $filters['sortBy'] = $filters['sortBy'] ?? 'id';
        $filters['sortDirection'] = $filters['sortDirection'] ?? 'desc';
        $filters['rowPerPage'] = $filters['rowPerPage'] ?? 10;
        $filters['writer'] = true;
        return Inertia::render('Blog/Posts/All/Index', [
            'posts' => $this->postInterface->filter($filters, ['category']),
            'filters' => $filters,
        ]);
    }
}
