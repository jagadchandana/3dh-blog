<?php

use App\Http\Controllers\Blog\CategoryController;
use App\Http\Controllers\Blog\PostController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// home page
Route::get('/', [PostController::class, 'index'])->name('home');

Route::middleware('auth')->group(
    function () {
        // Dashboard
        Route::get('/dashboard', function () {
            return Inertia::render('Dashboard');
        })->name('dashboard');
        // Categories
        Route::prefix('categories')->name('categories.')->controller(CategoryController::class)->group(function () {
            Route::get('/', 'index')->name('index');
            Route::post('/store', 'store')->name('store');
            Route::post('/{slug}/update', 'update')->name('update');
            Route::delete('/{slug}/destroy', 'destroy')->name('destroy');
        })->middleware('role:manager');
        // Posts
        Route::prefix('posts')->name('posts.')->controller(PostController::class)->group(function () {
            Route::get('/', 'WriterIndex')->name('index');
            Route::get('/create', 'create')->name('create');
            Route::post('/store', 'store')->name('store');
            Route::get('/{slug}/edit', 'edit')->name('edit');
            Route::post('/{slug}/update', 'update')->name('update');
            Route::delete('/{slug}/destroy', 'destroy')->name('destroy');
        });
        // Profile
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    }
);


require __DIR__ . '/auth.php';
