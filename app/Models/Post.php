<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = [
        'title',
        'content',
        'featured_image',
        'slug',
        'category_id',
        'user_id',
    ];
    protected $appends = [
        'created_at_human',
        'featured_image_url'
    ];
    /**
     * @return [type]
     */
    public function getCreatedAtHumanAttribute()
    {
        return $this->created_at ? $this->created_at->format('Y-m-d H:i') : null;
    }
    /**
     * @return [type]
     */
    public function getFeaturedImageUrlAttribute()
    {
        return $this->featured_image ? asset('storage/' . $this->featured_image) : null;
    }

    /**
     * @return [type]
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    /**
     * @return [type]
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    /**
     * @param mixed $query
     * @param mixed $column
     * @param string $direction
     *
     * @return [type]
     */
    public function scopeOrderByColumn($query, $column, $direction = 'asc')
    {
        return $query->orderBy($column, $direction);
    }

    /**
     * @param mixed $query
     * @param array $filters
     *
     * @return [type]
     */
    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['searchParam'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('order_number', 'like', '%' . $search . '%');
            });
        });
        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        }
    }
}
