const config = require('../config/env')
const BASE_URL = 'https://api.github.com';

const headers = {
    'Authorization': `Bearer ${config.github.token}`,
    'Accept': 'application/vnd.github.v3+json',
    'X-GitHub-Api-Version': '2022-11-28'
};

async function getCommitDetails(repoName, commitSha) {
    const response = await fetch(`${BASE_URL}/repos/${repoName}/commits/${commitSha}`, { headers });
    if (!response.ok) {
        throw new Error(`GitHub API Error (${response.status}): ${response.statusText}`);
    }
    return response.json();
}

async function getChangedLinesFromPush(repoName, commits) {
    const enrichedCommits = [];
    for (const commit of commits) {
        try {
            const commitData = await getCommitDetails(repoName, commit.id);
            enrichedCommits.push({
                sha: commit.id,
                message: commit.message,
                files: commitData.files
            });
        }
        catch (error) {
            console.error(`Failed to fetch diff for commit ${commit.id}:`, error.message);
        }
    }
    return enrichedCommits;
}

async function getPullRequestFiles(repoName, prNumber) {
    const response = await fetch(`${BASE_URL}/repos/${repoName}/pulls/${prNumber}/files`, { headers });
    if (!response.ok) {
         throw new Error(`GitHub API Error (${response.status}): ${response.statusText}`);
    }
    return response.json();
}

module.exports = {
    getChangedLinesFromPush,
    getPullRequestFiles
};