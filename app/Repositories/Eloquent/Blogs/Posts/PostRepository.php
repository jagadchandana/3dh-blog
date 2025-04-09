<?php

namespace App\Repositories\Eloquent\Blogs\Posts;

use App\Models\Post;
use App\Repositories\Base\BaseRepository;
use App\Repositories\Eloquent\Blogs\Posts\PostInterface;

// repository Class
class PostRepository extends BaseRepository implements PostInterface
{
    /**
     * @var Post
     */
    protected $model;

    /**
     * BaseRepository constructor.
     */
    public function __construct(Post $model)
    {
        $this->model = $model;
    }
}
