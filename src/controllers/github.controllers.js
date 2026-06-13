const { githubService } = require('../services/github.service');
const { scannerService } = require('../services/scanner.service');
const { geminiService } = require('../services/gemini.service');

exports.handleWebhook = async (req, res) => {
    res.status(200).send('Webhook received');

    const event = req.headers['x-github-event'];
    const payload = JSON.parse(req.body.toString());
    const repoName = payload.repository?.full_name;

    if (!repoName) return;

    try {
        switch (event) {
            case 'push':
                console.log(`\n--- Handling Push Event for ${repoName} ---`);
                
                pushChanges.forEach(commit => {
                    console.log(`\n--- Changes in Commit: ${commit.sha.substring(0, 7)} ---`);
                    console.log(`Message: ${commit.message}`);
                    
                    commit.files.forEach(file => {
                        let commitChanges = `File: ${file.filename}\n
                                               Status: ${file.status}\n
                                               Changes: +${file.additions} / -${file.deletions}\n`;
                        if (file.patch) {
                            commitChanges += `Changed Lines (Git Patch):\n${file.patch}\n`;
                        }
                        else {
                            commitChanges += `(No patch available - likely binary or too large)\n`;
                        }
                        const fileContent = await fetch(file.raw_url);
                        const fileAnalysis = await scannerService.scanFile(commitChanges + fileContent);
                        const filePatch = await geminiService.generateSuggestionPatch(fileAnalysis);
                    });
                });
                break;

            // case 'pull_request':
            //     const action = payload.action; // e.g., 'opened', 'synchronize', 'closed'
            //     const prNumber = payload.pull_request.number;
                
            //     console.log(`\n--- Handling PR ${action} Event for ${repoName} (#${prNumber}) ---`);
                
            //     if (action === 'opened' || action === 'synchronize') {
            //         // Call the service module
            //         const prFiles = await githubService.getPullRequestFiles(repoName, prNumber);
            //         console.log(`PR #${prNumber} touched ${prFiles.length} files.`);
            //     }
            //     break;

            default:
                console.log(`Ignored event: ${event}`);
        }
    }
    catch (error) {
        console.error('Error processing webhook logic:', error);
    }
}