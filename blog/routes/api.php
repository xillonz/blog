<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Public routes
Route::resource('articles', 'ArticleController')->only([
    'index', 'show'
]);

// Admin only routes
Route::resource('articles', 'ArticleController')->only([
    'create', 'store', 'update', 'destroy'
])->middleware(['auth']); // Auth method could be updated depending on app requirements
