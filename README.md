# Comprehensive Guide to Immutable Passport Integration

## Introduction

In the rapidly evolving landscape of blockchain technology, **Immutable Passport** stands out as a cutting-edge solution designed especially for gaming applications. This revolutionary tool empowers developers to seamlessly incorporate blockchain-based authentication and transaction capabilities into their gaming projects, enhancing both security and functionality

![Immutable Passport](https://assets-global.website-files.com/646557ee455c3e16e4a9bcb9/646557ee455c3e16e4a9c260_passport_3.jpeg)

Welcome to the comprehensive guide on **Immutable Passport Integration**. Whether you're a game developer looking to bolster the security and versatility of your application or a tech enthusiast eager to explore the world of blockchain-powered gaming, this guide is your gateway to harnessing the potential of Immutable Passport.

These step-by-step instructions will walk you through the entire process, from creating a basic application to initiating transactions via Immutable Passport. By the end of this guide, you will have a firm grasp of how to integrate Immutable Passport's robust features into your gaming application, making it more secure and versatile.

So, let's embark on this journey to unlock the power of Immutable Passport, enhancing your gaming application and expanding the horizons of blockchain technology in the world of gaming. Let's get started! 🎮🚀

Certainly! Here's a step-by-step guide that includes code snippets and prerequisites for creating a simple game application with Immutable Passport authentication:
![Immutable Passport](https://assets-global.website-files.com/646557ee455c3e16e4a9bcb3/646557ee455c3e16e4a9bfa5_zkevm.png)

### Prerequisites:

1. A code editor for making changes to your application.
2. Node.js and npm installed on your development machine.
3. An account on the Immutable Developer Hub.

### Step 1: Set Up Your Project

1. **Create a New Directory for Your Project**: Start by creating a new directory for your project. You can choose any name you like. In this example, I'll name it `immuatble-spaceinvaders`.

   ```bash
   mkdir immuatble-spaceinvaders
   cd immuatble-spaceinvaders
   ```

   If you already have an existing game application, you can skip this step. However, make sure to navigate to your project's root directory.

2. **Clone a Basic Game Application Repository (Optional)**: If you prefer to start with a pre-existing game application, you can clone a basic game application repository from a version control system like GitHub. In this guide, I have cloned a basic Space Invaders game application repository from [Github Repo](https://github.com/LukeGarrigan/codeheir.com/tree/master/evolution-of-games/7%20-%20space-invaders) and are now adding Passport integration and other functionalities to it:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

   If you have an existing game project, navigate to its directory instead.

3. Initialize a new Node.js project inside the cloned repository:

   ```bash
   npm init -y
   ```

By creating a new directory and optionally cloning a basic game application repository, you'll have a dedicated space for your project where you can seamlessly integrate Passport authentication and other functionalities.

## Step 2: Register Your Application on Immutable Developer Hub

To integrate Immutable Passport into your application, you need to register your application on the Immutable Developer Hub. Follow these steps:

1. **Sign In to Immutable Developer Hub:**

   If you don't already have an Immutable Developer Hub account, you'll need to create one. Follow these steps:

   - Visit the [Immutable Developer Hub website](https://example.com).
   - Click on the "Sign In" option. If you don't have an account, select "Create Account" or "Sign Up" to create one.
   - Follow the on-screen instructions to complete the registration process.

   Once you have successfully created your account, return to the Immutable Developer Hub homepage and sign in with your newly created credentials.

2. **Register a New Application:**

   To register your application successfully, pay attention to the following details:

   - Click on the "My Applications" or "Create New Application" option, depending on the interface of the Immutable Developer Hub.
   - Select "Web Application" as the application type. As of the time of writing, this is the only available option.
   - Provide a unique name for your application in the "Client Name" field. Make sure it's easily identifiable.
   - In the "Logout URLs" section, enter valid URLs where users can securely log out. These URLs should point to the logout functionality of your application.
   - In the "Callback URLs" section, ensure that your application's callback URL matches what you provided during the Passport client initialization. This is crucial for proper integration.
   - Follow the on-screen instructions to complete the registration process. This may include agreeing to terms and conditions or specifying additional settings based on your application's requirements.

3. **Obtain Client Credentials:**

   After successfully registering your application, you will receive the client credentials required for integrating Immutable Passport. These credentials are essential for authentication and authorization.

   Once your application is registered, you will receive a "Client ID." Save this Client ID as you will need it for the next steps.

4. **Add the Client ID to Your Application's Environment Variables:**

   To securely store and use the Client ID in your application, it's recommended to add it to your environment variables. Here's how you can do it:

   - Create a `.env` file in your project directory if you don't have one already.
   - Inside the `.env` file, add the following line, replacing "Your_Client_ID" with the actual Client ID you received:

     ```plaintext
     IMMUTABLE_CLIENT_ID="Your_Client_ID"
     ```

   - Save the `.env` file.

   Ensure that your application is set up to read environment variables. Depending on your programming language and framework, you may need to configure this specifically. Consult the documentation for your technology stack if you are unsure.

By following these steps, you will have successfully registered your application on the Immutable Developer Hub and obtained the Client ID, which is crucial for the integration of Immutable Passport into your application. Make sure to keep your credentials secure and follow best practices for environment variable management.

### Step 3: Install Dependencies

1. Install the required Node.js packages:

```bash
npm install -D @imtbl/sdk
```

### Step 4: Set Up Your Game Application

1. Create your project structure with the necessary files, including `index.html`, `passport.js`, `login.js`, and game-related files.

2. Add your game code to the relevant game files (e.g., `sketch.js`).

### Step 5: Configure Passport

In the `passport.js` file, configure Immutable Passport using the obtained `client_id`:

```javascript
// passport.js
window.passport = new window.immutable.passport.Passport({
  baseConfig: new window.immutable.config.ImmutableConfiguration({
    environment: window.immutable.config.Environment.SANDBOX, // Use PRODUCTION for a live environment.
  }),
  clientId: "your-client-id", // Replace with your actual client ID
  redirectUri: "your-redirect-uri",
  logoutRedirectUri: "your-logout-redirect-uri",
  audience: "platform_api",
  scope: "openid offline_access email transact",
});
```

### Step 6: Implement User Authentication

In the `login.js` file, implement the login logic:

```javascript
// login.js
window.provider = window.passport.connectEvm();

const connectPassport = async function () {
  const passportBtn = document.getElementById("btn-passport");
  passportBtn.innerHTML = "Loading...";
  passportBtn.disabled = true;

  try {
    window.accounts = await window.provider.request({
      method: "eth_requestAccounts",
    });
    if (window.accounts) {
      await getUserInfo();
    }
  } catch (error) {
    console.error("Error connecting to Passport:", error);
    passportBtn.innerHTML = "Connect Passport";
    passportBtn.disabled = false;
  }
};

const getUserInfo = async function () {
  try {
    window.userProfile = await window.passport.getUserInfo();
  } catch (error) {
    console.error("Error getting user info:", error);
  }
};

const passportLogout = async function () {
  try {
    await window.passport.logout();
    window.userProfile = {};
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

window.addEventListener("load", function () {
  const passportBtn = this.document.getElementById("btn-passport");
  const logoutBtn = this.document.getElementById("btn-logout");
  passportBtn.onclick = function () {
    connectPassport();
  };

  logoutBtn.onclick = passportLogout;
  window.passport.loginCallback();
});
```

### Step 7: Display User Information in Your Game

Modify your game logic (e.g., `sketch.js`) to personalize the game for authenticated users:

```javascript
// sketch.js
function draw() {
  if (window?.userProfile?.email) {
    // Game is in progress, authenticated user.
    // Modify the game based on user information.
    // ...
  } else {
    // Show a start screen for non-authenticated users.
    // ...
  }
}
```

### Step 8: Implement User Logout

In your `login.js` file, implement the logout function:

```javascript
// login.js
const passportLogout = async function() {
    try {
        await window.passport.logout();
        window.userProfile is set to an empty object;
    } catch (error) {
        console.error("Error logging out:", error);
    }
};
```

### Step 9: Initiate a Transaction

You can initiate a transaction from Passport by using the Passport JavaScript SDK. Implement a function to initiate a transaction:

```javascript
// Implement a function to initiate a transaction
const initiateTransaction = async () => {
  try {
    const transactionHash = await window.passport.createTransaction(
      "your-placeholder-string"
    );
    // Handle the transaction result
  } catch (error) {
    console.error("Error initiating transaction:", error);
  }
};
```

You can call this function from your game logic when the user performs a specific action.

With these steps, you'll have a simple game application integrated with Immutable Passport authentication, and you'll be able to register the application, authenticate users, display tokens and user info, log users out, and initiate transactions with Passport.

## Conclusion

Great job! 🚀 You've successfully integrated Immutable Passport into your application! This guide has covered connecting your app to Immutable Passport, authenticating users, obtaining user information, and initiating transactions. Immutable Passport opens up various possibilities for interacting with the Immutable protocol.

## Additional Resources

For more in-depth information, detailed documentation, and official resources, be sure to visit the [Immutable Passport Documentation](https://docs.immutable.com/docs/zkevm/products/passport/).

Thank you for following this guide. If you have any questions or encounter challenges along the way, please don't hesitate to reach out to the Immutable community or support for assistance. Happy building! 🌟

---
