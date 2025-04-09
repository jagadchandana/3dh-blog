<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Http\Requests\Post\CreatePostRequest;
use App\Http\Requests\Post\UpdatePostRequest;
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
        $filters = $request->all('searchParam', 'sortBy', 'sortDirection', 'rowPerPage', 'page', 'category');
        $filters['sortBy'] = $filters['sortBy'] ?? 'id';
        $filters['sortDirection'] = $filters['sortDirection'] ?? 'desc';
        $filters['rowPerPage'] = $filters['rowPerPage'] ?? 1;
        $filters['category'] = $filters['category'] ?? null;
        $filters['writer'] = false;
        return Inertia::render('Blog/Home/Index', [
            'posts' => $this->postInterface->filter($filters, ['category']),
            'filters' => $filters,
            'categories' => $this->categoryInterface->all(),
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

    public function create()
    {
        return Inertia::render('Blog/Posts/Create/Index', [
            'categories' => $this->categoryInterface->all( ['id as value', 'name as label']),
        ]);
    }
    /**
     * @param CreatePostRequest $request
     *
     * @return [type]
     */
    public function store(CreatePostRequest $request)
    {
        $data = $request->all();
        if (isset($data['featured_image'])) {
            $data['featured_image'] = $data['featured_image']->store('featured_images', 'public');
        }
        $data['user_id'] = auth()->user()->id;
        $this->postInterface->create($data);
        return redirect()->route('posts.index')->with('success', 'Post created successfully');
    }
    /**
     * @param string $slug
     *
     * @return [type]
     */
    public function edit(string $slug)
    {
        $post = $this->postInterface->findByColumn(['slug' => $slug], ['*'], ['category']);
        if (!$post) {
            return redirect()->route('posts.index')->with('error', 'Post not found');
        }
        if ($post->user_id !== auth()->user()->id) {
            return redirect()->route('posts.index')->with('error', 'You are not authorized to edit this post');
        }
        return Inertia::render('Blog/Posts/Edit/Index', [
            'poster' => $post,
            'categories' => $this->categoryInterface->all( ['id as value', 'name as label']),
        ]);
    }

    /**
     * @param UpdatePostRequest $request
     * @param string $slug
     *
     * @return [type]
     */
    public function update(UpdatePostRequest $request, string $slug)
    {
        $post = $this->postInterface->findByColumn(['slug' => $slug], ['*'], ['category']);
        if (!$post) {
            return redirect()->route('posts.index')->with('error', 'Post not found');
        }
        if ($post->user_id !== auth()->user()->id) {
            return redirect()->route('posts.index')->with('error', 'You are not authorized to edit this post');
        }
        $data = $request->all();
        if (isset($data['featured_image'])) {
            $data['featured_image'] = $data['featured_image']->store('featured_images', 'public');
        }
        $this->postInterface->update($post->id, $data);
        return redirect()->route('posts.index')->with('success', 'Post updated successfully');
    }
    /**
     * @param string $slug
     *
     * @return [type]
     */
    public function destroy(string $slug)
    {
        $post = $this->postInterface->findByColumn(['slug' => $slug], ['*'], ['category']);
        if (!$post) {
            return redirect()->route('posts.index')->with('error', 'Post not found');
        }
        $authUser = auth()->user();
        if ($post->user_id !== $authUser->id && $authUser->role !== 'admin') {
            return redirect()->route('posts.index')->with('error', 'You are not authorized to delete this post');
        }
        $this->postInterface->deleteById($post->id);
        return redirect()->route('posts.index')->with('success', 'Post deleted successfully');
    }
}
