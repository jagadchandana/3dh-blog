<?php

namespace App\Providers;

use App\Repositories\Eloquent\Blogs\Categories\CategoryInterface;
use App\Repositories\Eloquent\Blogs\Categories\CategoryRepository;
use App\Repositories\Eloquent\Blogs\Posts\PostInterface;
use App\Repositories\Eloquent\Blogs\Posts\PostRepository;
use App\Repositories\Eloquent\Users\UserInterface;
use App\Repositories\Eloquent\Users\UserRepository;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(UserInterface::class, UserRepository::class);
        $this->app->bind(PostInterface::class, PostRepository::class);
        $this->app->bind(CategoryInterface::class, CategoryRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Schema::defaultStringLength(191);
        Vite::prefetch(concurrency: 3);
    }
}
