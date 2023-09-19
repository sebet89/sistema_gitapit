<?php

namespace Tests\Feature;

use App\Services\GithubService;
use Illuminate\Support\Facades\Http;
use PHPUnit\Framework\TestCase;

class GithubServiceTest extends TestCase
{
    /**
     * @var GithubService
     */
    protected $githubService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->createApplication();
        $this->githubService = new GithubService();
    }

    public function createApplication()
    {
        $app = require __DIR__ . '/../../bootstrap/app.php';

        $app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

        return $app;
    }


    public function testGetUserInfo()
    {
        $response = $this->githubService->getUserInfo('joaorca');
        
        $this->assertEquals('joaorca', $response['login']);
    }

    public function testGetFollowings()
    {
        $response = $this->githubService->getFollowings('joaorca');

        $this->assertIsArray($response);
        $this->assertNotEmpty($response);
    }
}