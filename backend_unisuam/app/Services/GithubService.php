<?php
namespace App\Services;

use Illuminate\Support\Facades\Http;

class GithubService
{
    private $base_url = 'https://api.github.com/users/';

    public function getUserInfo(string $username): array
    {
        return Http::get($this->base_url . $username)->json();
    }

    public function getFollowers(string $username): array
    {
        return Http::get($this->base_url . $username . '/followers')->json();
    }
}
