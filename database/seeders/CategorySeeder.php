<?php

namespace Database\Seeders;

use App\Repositories\Eloquent\Blogs\Categories\CategoryInterface;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categoryInterface = App()->make(CategoryInterface::class);
        $array = [
            [
                'name' => 'Technology',
                'slug' => 'technology',
            ],
            [
                'name' => 'Travel',
                'slug' => 'travel',
            ],
            [
                'name' => 'Food',
                'slug' => 'food',
            ],
            [
                'name' => 'Health & Fitness',
                'slug' => 'health-fitness',
            ],
            [
                'name' => 'Business',
                'slug' => 'business',
            ],
            [
                'name' => 'Lifestyle',
                'slug' => 'lifestyle',
            ],
            [
                'name' => 'Education',
                'slug' => 'education',
            ],
            [
                'name' => 'Entertainment',
                'slug' => 'entertainment',
            ],
            [
                'name' => 'Personal Growth',
                'slug' => 'personal-growth',
            ],
            [
                'name' => 'Finance',
                'slug' => 'finance',
            ],
        ];

        foreach ($array as $key => $item) {
            if (! $categoryInterface->existsByColumn(['slug' => $item['slug']])) {
                $categoryInterface->create($item);
            }
        }
    }
}
