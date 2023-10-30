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

window.addEventListener('load', function() {
  const passportBtn = this.document.getElementById('btn-passport');
  const logoutBtn = this.document.getElementById('btn-logout');
  passportBtn.onclick = function() {
    connectPassport();
  }

  logoutBtn.onclick = passportLogout;
  window.passport.loginCallback();
});
