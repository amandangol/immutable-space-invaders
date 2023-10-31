window.provider = window.passport.connectEvm();

const connectPassport = async function() {
    const passportBtn = document.getElementById('btn-passport');
    passportBtn.innerHTML = 'Loading...'; 
    passportBtn.disabled = true; 
  
    try {
      window.accounts = await window.provider.request({ method: "eth_requestAccounts" });
      if (window.accounts) {
        await getUserInfo();
      }
    } catch (error) {
      console.error("Error connecting to Passport:", error);
      passportBtn.innerHTML = 'Connect Passport'; 
      passportBtn.disabled = false; 
    }
  };
const getUserInfo = async function() {
  try {
    window.userProfile = await window.passport.getUserInfo();
  } catch (error) {
    console.error("Error getting user info:", error);
  }
};

const passportLogout = async function() {
  try {
    await window.passport.logout();
    window.userProfile = {};
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

async function initiateTransaction() {
  // Define your transaction data (e.g., a placeholder string)
  const transactionData = "This is a placeholder transaction data.";

  try {
      // Initiate the transaction using Immutable Passport
      const transactionHash = await window.passport.initiateTransaction({
          to: 'YOUR_CONTRACT_ADDRESS', // Replace with your contract address
          data: transactionData,
      });

      // Handle the transaction hash (e.g., display it to the user)
      console.log('Transaction initiated. Transaction Hash:', transactionHash);
  } catch (error) {
      console.error('Error initiating transaction:', error);
      // Handle errors, e.g., show an error message to the user
  }
}


window.addEventListener('load', function() {
  const passportBtn = this.document.getElementById('btn-passport');
  const logoutBtn = this.document.getElementById('btn-logout');
  passportBtn.onclick = function() {
    connectPassport();
  }

  logoutBtn.onclick = passportLogout;
  window.passport.loginCallback();
});
