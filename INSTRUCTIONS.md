# Instructions

When you want to use a single repository and host multiple Angular apps with separate GitHub Pages URLs under your `[USERNAME].github.io` domain.

#### Create empty workspace
1. Create GitHub repo and clone locally
2. Navigate to the path directly above cloned repository
3. Create empty Angular workspace using repository name - `ng new [YOUR_WORKSPACE_NAME] --createApplication="false" --minimal` *(suggest using repo name so workspace files are at root of repo, no test content is created when using `--minimal` flag)*

#### Add a project to the workspace
1. Change into the YOUR_WORKSPACE_NAME directory
2. Add new Angular app `ng generate application [YOUR_APP_NAME] --minimal`
3. Replace `dist` with `docs` in angular.json `outputPath` configurations
4. Add project npm serve command to package.json - `"serve-[YOUR_APP_NAME]": "ng serve --project=[YOUR_APP_NAME]"`
5. Add project GitHub pages npm build command - `"build-gh-pages-[YOUR_APP_NAME]": "ng build --outputPath docs/[YOUR_APP_NAME] --base-href /[YOUR_WORKSPACE_NAME]/[YOUR_APP_NAME]/"` *(IMPORTANT! The trailing "/" character is required for everything to work right in GitHub pages)*

#### Setup GitHub pages
1. Navigate to GitHub repo settings, scroll down and click the GitHub pages link
2. Select branch, use `/docs` path and Jekyl theme *(theme is required but currently doesn't affect individual apps)*

#### Build and deploy app
1. Make sure the `defaultProject` value in angular.json is [YOUR_APP_NAME] 
2. Run the project GitHub pages npm build command *(this builds and creates docs/[YOUR_APP_NAME] content that GitHub pages will serve from)*
3. Commit changes
4. Navigate to `[USERNAME].github.io/[YOUR_WORKSPACE_NAME]/[YOUR_APP_NAME]`
