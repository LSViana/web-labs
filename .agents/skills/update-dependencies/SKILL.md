---
name: update-dependencies
description: Update dependencies of the top-level npm project.
---

General rules:
- DO NOT change code that's not related to the dependencies update.
- ONLY update dependencies in the top-level `package.json` file.

1. Run the `ncu` command to check for outdated dependencies in the top-level npm project.
2. If there are outdated dependencies, run the `ncu -u` command to update them to the latest versions.
3. Check if there are newer versions of the overridden dependencies in the `package.json` file and update them if necessary.
4. After updating the dependencies, run `npm install` to install the updated packages and check for any issues.
5. If there are any issues during installation, review the error messages and resolve them accordingly. This may involve updating specific packages, fixing compatibility issues, or adjusting the project's code to work with the new versions of the dependencies.
6. Run `npm audit fix` to fix trivial vulnerabilities if there are any reported on the installation.
7. Once all dependencies are updated and installed successfully, run the project's tests to ensure that everything:
  7.1. `npm test:unit` to run unit tests and verify that the core functionality of the project is intact.
  7.2. `npm run build` to ensure that the project can be built successfully with the updated dependencies.
8. If possible, address all warnings that are still present after updating the dependencies. 
9. At the end, commit the changes with the message "Update npm dependencies".
