# FinLearn

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Motivation](#motivation)
- [Product Summary](#product-summary)
- [Figma Design](https://www.figma.com/file/60Sd92fZbhCcNtnpLVMkaY/FinLearn-UI?type=design&node-id=0%3A1&t=2tLlEYOO0zEVJooo-1)
- [Technologies Used](#technologies-used)
- [Setup Project](#setup-project)
  - [Requirements](#requirements)
  - [Steps](#steps)
  - [Start Project](#start-project)
- [NPM Workspaces](#npm-workspaces)
  - [Install Packages](#install-packages)
  - [Running Commands](#running-commands)
- [Postman Testing](https://www.postman.com/agile-avengers-cscc01/workspace/agile-avengers/collection/14201720-ffadf271-0e18-49b6-a533-36e37ba981d0?action=share&creator=14201720)
- [Contribution](#contribution)
  - [Contributors](#contributors)

## Motivation

Young adults between the ages of 18-21 face a sudden challenge when they first start interacting with money on
their own especially when they start earning and spending independently. They are overwhelmed by the amount of
advice, valid or not when it comes to interacting with their own money in the context of saving, budgeting,
investing, insuring, and debts. Currently, they use experiential learning methods, which make them prone to making
mistakes and learning from them. But such methods might shape their perspective about money incorrectly and
inefficiently. By delivering optimized support through simulation and learning, Finlearn can help such personas and
provide them with a platform to make those mistakes early on and realize better methods to manage money.

## Product Summary

FinLearn is a financial literacy platform for young adults who are ready to take a step towards an independent
lifestyle. FinLearn introduces young adults to concepts in personal finance and portfolio management through
expert-curated lessons and a sandbox environment to test their learning. This is a zero-liability learning solution
for learning to manage money without the risk of incurring a financial loss.

## Technologies Used

- [MongoDB](https://www.mongodb.com/)
  - [Atlas](https://www.mongodb.com/atlas)
  - [Mongoose](https://mongoosejs.com/)
- [Chakra UI](https://chakra-ui.com)
- [Express](https://expressjs.com/)
- [Next.js](https://nextjs.org/docs)
- [React](https://reactjs.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Typescript](https://www.typescriptlang.org/)
- [Node](https://nodejs.org/en/)
- [Figma](https://www.figma.com/)
- [TradingView Widgets](https://www.tradingview.com/widget/)

## Setup Project

This project uses [NPM Workspaces](https://docs.npmjs.com/cli/v9/using-npm/workspaces) to manage
both the `client` and `server` dependencies, for more information read [Install Packages](#install-packages). The `client` folder contains the Frontend of the App built using Next.js and React with Typescript. The `server` folder contains the backend built using Node.js and Express for the endpoints with database connection to MongoDB Atlas using Mongoose.

### **Requirements**

- [Node.js v18](https://nodejs.org/dist/v18.16.1/)
- [MongoDB Account](https://account.mongodb.com/account/register)

### **Steps**

1. Clone the repo

   ```bash
   git clone https://github.com/CSCC012023/final-project-s23-agile-avengers.git
   ```

2. If you are not using **VS Code** then follow these steps

   ```bash
   npm install
   ```

3. If you are using **VS Code** then follow these steps

   1. Open the Command Palette using `Ctrl+Shift+P` or `Cmd+Shift+P`
   2. Search for `Tasks: Run Task` and select it
   3. Search for `Setup Project` and select it
   4. VS Code will automatically install all the packages and close the shell.

4. Create a `.env` file inside the `server` folder and copy the following

   ```bash
   PORT=4000
   MONGO_URI='Request Shashwat Piyush Doshi'
   ```

5. Create a `.env` file inside the `client` folder and copy the following

   ```bash
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY='Retrieve through Clerk Dashboard'
   CLERK_SECRET_KEY='Retrieve through Clerk Dashboard'

   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
   ```

6. To get access to the database register for a MongoDB Account and send
   [Shashwat Piyush Doshi](https://github.com/shashwat-doshi) your account email

### **Start Project**

- If you are not using **VS Code** then follow these steps

  1. Open a new Terminal and run the following command to start Client

     ```bash
        npm run dev -w client
     ```

  2. Open a new Terminal and run the following command to start Server

     ```bash
        npm run dev -w server
     ```

- If you are using **VS Code** then follow these steps
  1. Open the Command Palette using `Ctrl+Shift+P` or `Cmd+Shift+P`
  2. Search for `Tasks: Run Task` and select it
  3. Search for `Start Dev` and select it
  4. VS Code will automatically Start the Client and Server and you can close them later.

## NPM Workspaces

### **Install Packages**

With [NPM Workspaces](https://docs.npmjs.com/cli/v9/using-npm/workspaces#adding-dependencies-to-a-workspace),
you can install dependencies for multiple packages from the root `package.json`.

To install dependencies for the `client` and `server`, run: `npm install <package-name>` \
To install dependencies for `client`, run: `npm install <package-name> -w client` \
To install dependencies for `server`, run: `npm install <package-name> -w server`

### **Running Commands**

With [NPM Workspaces](https://docs.npmjs.com/cli/v9/using-npm/workspaces?v=true#running-commands-in-the-context-of-workspaces),
you can run npm scripts for multiple packages from the root `package.json`.

To run a command for the `client` and `server`, run: `npm run <cmd> --workspaces` \
To run a command for `client`, run: `npm run <cmd> -w client` \
To run a command for `server`, run: `npm run <cmd> -w server`

## Contribution

1. Do you use git flow?

   Yes, we do follow Git Flow in this project.

2. What do you name your branches?

   A branch should begin with a category, reference and description and will be this pattern `category/reference/description`.

   **Category** \
   We support 4 types of branches:

   1. `feature`: Related to features
   2. `bugfix`: Related to fixes for bugs in `develop` branch
   3. `hotfix`: Relates to fixes for bugs in `main` and/or `release/*` branches
   4. `chore`: Anything else

   **Reference** \
   This portion should include a ticket number and must follow the format `\FIN=#\`. If no
   ticket exists then `non-ref` can be used.

3. Do you use GitHub issues or another ticketing website?

   We use JIRA to track all issues that are referenced in PRs and in commits

4. Do you use pull requests?

   Yes, we do use PRs and they must use the Pull Request Template

For more information about this check out the Team Contract under Version Control

### Contributors

Created by Team Agile Avengers

- [Adam Badar](https://github.com/adam-badar)
- [Aditya Kulkarni](https://github.com/Aditya-k-23)
- [Aryan Thakur](https://github.com/aryan-thakur)
- [Balraj Kharol](https://github.com/balraj03)
- [Rahul Sharma](https://github.com/D3nam)
- [Shashwat Piyush Doshi](https://github.com/shashwat-doshi)
- [Shawn Santhoshgeorge](https://github.com/ShawnGeorge03)
