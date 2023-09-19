<?php
namespace App\Http\Controllers;

use App\Services\GithubService;

class GithubController extends Controller
{
    private $githubService;

    public function __construct(GithubService $githubService)
    {
        $this->githubService = $githubService;
    }

    public function getUserInfo($username)
    {
        return response()->json($this->githubService->getUserInfo($username));
    }

    public function getFollowers($username)
    {
        return response()->json($this->githubService->getFollowers($username));
    }
}
