<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::connection('mongodb')->collection('users')->delete();
        DB::connection('mongodb')->collection('users')->insert(['name' => 'Admin User', 'email' => 'admin@example.com', 'password' => bcrypt('password')]);
    }
}
