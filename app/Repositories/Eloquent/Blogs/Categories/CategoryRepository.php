<?php

namespace App\Repositories\Eloquent\Blogs\Categories;

use App\Models\Category;
use App\Repositories\Base\BaseRepository;
use App\Repositories\Eloquent\Blogs\Categories\CategoryInterface;

// repository Class
class CategoryRepository extends BaseRepository implements CategoryInterface
{
    /**
     * @var Category
     */
    protected $model;

    /**
     * BaseRepository constructor.
     */
    public function __construct(Category $model)
    {
        $this->model = $model;
    }
}
