<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'name',
        'slug',
    ];

    protected $appends = [
        'created_at_human',
    ];

    /**
     * @return [type]
     */
    public function getCreatedAtHumanAttribute()
    {
        return $this->created_at ? $this->created_at->format('Y-m-d H:i') : null;
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
                $query->where('name', 'like', '%' . $search . '%');
                $query->orWhere('slug', 'like', '%' . $search . '%');
            });
        });
    }
}
