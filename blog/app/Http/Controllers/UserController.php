<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            // Authentication passed...
            return response()->json('success', 200);
        }
    }

    public function logout()
    {
        Auth::logout();
        return response()->json('success', 200);
    }

    public function checkLogin()
    {
        $loggedIn = Auth::check();
        return response()->json($loggedIn, 200);
    }
}
