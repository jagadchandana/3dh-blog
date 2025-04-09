<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Http\Requests\Blog\CategoryRequest;
use App\Http\Requests\Category\CreateCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;
use App\Repositories\Eloquent\Blogs\Categories\CategoryInterface;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * @param  protected
     */
    public function __construct( protected CategoryInterface $categoryInterface ) {}

    /**
     * @param Request $request
     *
     * @return [type]
     */
    public function index( Request $request )
    {
        $filters = $request->all('searchParam', 'sortBy', 'sortDirection', 'rowPerPage', 'page');
        $filters['sortBy'] = $filters['sortBy'] ?? 'id';
        $filters['sortDirection'] = $filters['sortDirection'] ?? 'desc';
        $filters['rowPerPage'] = $filters['rowPerPage'] ?? 10;
        return inertia('Blog/Category/Index', [
            'categories' => $this->categoryInterface->filter($filters),
            'filters' => $filters,
        ]);
    }

    /**
     * @param CreateCategoryRequest $request
     *
     * @return [type]
     */
    public function store(CreateCategoryRequest $request)
    {
        $this->categoryInterface->create($request->all());
        return redirect()->route('categories.index')->with('success', 'Category created successfully');
    }

    /**
     * @param UpdateCategoryRequest $request
     * @param string $slug
     *
     * @return [type]
     */
    public function update(UpdateCategoryRequest $request, string $slug)
    {
        $category = $this->categoryInterface->findByColumn(['slug' => $slug]);
        if ($category) {
            $this->categoryInterface->update($category->id, $request->all(), );
            return redirect()->route('categories.index')->with('success', 'Category updated successfully');
        }
        return redirect()->route('categories.index')->with('error', 'Category not found');
    }

    /**
     * @param string $slug
     *
     * @return [type]
     */
    public function destroy(string $slug)
    {
        $category = $this->categoryInterface->findByColumn(['slug' => $slug]);
        if ($category) {
            $this->categoryInterface->deleteById($category->id);
            return redirect()->route('categories.index')->with('success', 'Category deleted successfully');
        }
        return redirect()->route('categories.index')->with('error', 'Category not found');
    }
}
