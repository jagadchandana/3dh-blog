<?php

namespace Database\Seeders;

use App\Enum\UserRoleEnum;
use App\Repositories\Eloquent\Users\UserInterface;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userInterface = App()->make(UserInterface::class);
        $array = [
            [
                'name' => 'Admin',
                'email' => 'admin@mail.com',
                'role' => UserRoleEnum::ADMIN->value,
                'password' => Hash::make('1qaz2wsx'),
            ]

        ];
        foreach ($array as $key => $item) {
            if (! $userInterface->existsByColumn(['email' => $item['email']])) {
                $userInterface->create($item);
            }
        }
    }
}
