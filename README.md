# Project Description

Connect Us is a web application built with Next.js and TypeScript that allows users to connect via video, audio, and chat in real-time. The application includes the following functionalities:

1. **Login**: Users can log in by providing a nickname and an avatar photo.
2. **User List**: Displays a list of connected users, indicating their availability.
3. **Real-time Calls**: Users can make audio and video calls in real-time, and chat during the call.

Real-time integration is implemented using Socket.io to provide live updates of the user list and calls.

## Next.js Project

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:
	

    npm install

    npm run dev


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying \`app/page.tsx\`. The page auto-updates as you edit the file.

## Project Overview

### Goals and Inspirations

Our goal with Connect Us is to create an intuitive and reliable platform for seamless video, audio, and chat communication. Inspired by the need for real-time interaction and modern design, we aim to provide a user-friendly tool that enhances both personal and professional connections.

By leveraging technologies like Socket.io and PeerJS, Connect Us ensures instant, high-quality communication, making it an essential tool for staying connected in today's digital world.

### Features

- **Feature 1**: Feature description.
- **Feature 2**: Feature description.

### Technological Debts

1. **Debts 1**: Debts description
2. **Debts 2**: Debs description.

## Continuous Integration/Continuous Deployment (CI/CD)

We use Vercel for continuous integration and deployment. Every push to the main branch triggers a new deployment, ensuring that the latest changes are always available in our production environment.

## Demo

Check out the live demo of the project here: [Live Demo](https://connect-us.vercel.app)

## Project Structure

Each component in the project follows a structured pattern to maintain consistency and organization. The typical structure for a component includes:

    ComponentName/
      ├── ComponentName.tsx      // The main component file
      ├── index.ts               // Barrel file for easy imports
      ├── ComponentName.test.tsx // Test file for the component
      ├── styles.module.css      // CSS module for the component's styles


### Workflow

The development workflow involved creating feature branches and opening Pull Requests (PRs) that were then merged into the main branch. This ensured an organized and systematic approach to adding features and making changes. Below is the list of PRs made for this project:

1.  **[Chore(part-1): Implement UI](https://github.com/wilfredonoyola/connect-us/pull/1)**
2.  **[Chore(part-2): API integrations](https://github.com/wilfredonoyola/connect-us/pull/2)**
3.  **[Chore(part-3): Real time integrations](Need to test more)**
4.  **[Chore(part-4): Tests and documentation] (Pending)**

## Technologies Used

- **Next.js**: The React framework for production.
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **Jest**: A delightful JavaScript testing framework with a focus on simplicity.
- **WebSocket**: A protocol for full-duplex communication channels over a single TCP connection.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **CSS Modules**: A CSS file in which all class.
- **Vercel**: A cloud platform for static sites and Serverless Functions that fits perfectly with Next.js.

## Environment Variables
N/A

## Testing with Jest

This project uses Jest for unit testing. Below are the steps to run the tests and a description of the basic tests implemented.

### Installation

To install the necessary dependencies, run:


    npm install


### Running Tests

To run all tests, use the following command:

    npm test

### Basic Tests Implemented

Basic tests have been implemented to verify that the components render correctly. These tests can be found in the corresponding test files for each component (\`*.test.tsx\`).

#### Example of a Basic Test

    describe('SkeletonLoader', () => {
      it('simple test to pass', () => {
        expect(true).toBe(true);  // This test will always pass
      });
    });

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
