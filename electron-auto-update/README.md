# Electron Auto Update App

This is a simple Electron app with auto-update functionality.

## Setup Instructions

To enable auto-updates with GitHub, follow these steps:

1. Generate a GitHub Personal Access Token:
   - Go to GitHub Settings > Developer settings > Personal access tokens
   - Click 'Generate new token' and select the 'repo' scope
   - Copy the generated token

2. Set the token as an environment variable:
   - On Windows: `setx GH_TOKEN your_token_here`
   - On macOS/Linux: `export GH_TOKEN=your_token_here`

3. Restart your terminal or IDE for the changes to take effect

4. Update the 'publish' section in package.json with your GitHub username and repository name:
   ```json
   "publish": [{
     "provider": "github",
     "owner": "YOUR_GITHUB_USERNAME",
     "repo": "YOUR_GITHUB_REPO_NAME"
   }]
   ```

5. Install dependencies:
   ```
   npm install
   ```

6. Build the app:
   ```
   npm run build
   ```

7. Deploy the app (this will publish to GitHub):
   ```
   npm run deploy
   ```

Note: Keep your token secret and never commit it to your repository.

## Development

To run the app in development mode:

```
npm start
```

## Troubleshooting

If you encounter errors related to the GitHub Personal Access Token, ensure that:
- The token is correctly set as an environment variable
- The token has the necessary permissions (repo scope)
- The package.json 'publish' section is correctly configured with your GitHub details

For more information on electron-builder and auto-updates, refer to the [electron-builder documentation](https://www.electron.build/).
