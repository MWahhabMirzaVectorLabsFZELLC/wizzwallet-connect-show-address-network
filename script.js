// Define the function to connect to WizzWallet and fetch the account address
async function connectToWizzWallet() {
    try {
      let accounts = await wizz.requestAccounts();
      console.log('Connect success:', accounts);
      // Fetch the address of the current account
      let address = await wizz.getAccounts();
      console.log('Account address:', address);
      // Display the account address on the web page
      document.getElementById('account-address').textContent = 'Account Address: ' + address[0]; // Assuming the first address is the current account
      // Fetch the network (livenet or testnet)
      let network = await wizz.getNetwork();
      console.log('Network:', network);
      // Display the network on the web page
      document.getElementById('network-status').textContent = 'Network: ' + (network === 'livenet' ? 'Mainnet' : 'Testnet');
      // Alert message after successful connection
      alert('Wallet successfully connected!');
      // Perform actions after connecting to the wallet
    } catch (error) {
      console.error('Connect failed:', error);
      // Handle error, maybe display a message to the user
    }
  }
  
  // Check if Wizz Wallet is installed
  if (typeof window.wizz !== 'undefined') {
    console.log('Wizz Wallet is installed!');
    // Add event listener to the button when the DOM is fully loaded
    document.addEventListener('DOMContentLoaded', function() {
      const connectButton = document.querySelector('.connect-button');
      connectButton.addEventListener('click', connectToWizzWallet);
    });
  } else {
    console.log('Wizz Wallet is not installed.');
    // Check again after a short delay in case of asynchronous loading
    setTimeout(() => {
      if (typeof window.wizz !== 'undefined') {
        console.log('Wizz Wallet is installed!');
      } else {
        // Show popup if Wizz Wallet is still not detected
        const popupMessage = document.createElement('div');
        popupMessage.style.position = 'fixed';
        popupMessage.style.top = '50%';
        popupMessage.style.left = '50%';
        popupMessage.style.transform = 'translate(-50%, -50%)';
        popupMessage.style.background = '#fff';
        popupMessage.style.padding = '20px';
        popupMessage.style.border = '1px solid #ccc';
        popupMessage.style.borderRadius = '5px';
        popupMessage.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
        popupMessage.style.zIndex = '9999';
  
        const message = document.createElement('p');
        message.textContent = 'Wizz Wallet is not installed. Click the button below to add the Wizz Wallet extension.';
  
        const addButton = document.createElement('button');
        addButton.textContent = 'Add Wizz Wallet Extension';
        addButton.style.marginTop = '10px';
        addButton.addEventListener('click', function() {
          // Redirect users to the link to add the extension
          window.location.href = 'https://chromewebstore.google.com/detail/wizz-wallet/ghlmndacnhlaekppcllcpcjjjomjkjpg?hl=en'; // Replace with the actual link
        });
  
        popupMessage.appendChild(message);
        popupMessage.appendChild(addButton);
        document.body.appendChild(popupMessage);
      }
    }, 1000); // Adjust the delay as needed
  }
  