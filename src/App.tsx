import './App.css'

import WebApp from '@twa-dev/sdk'

function App() {
  return (
    <>
     <div className="container">
      {/* Title */}
      <h1 className="title">
        Welcome to <br />
        <span className="gradient-text">Gifts Games</span>
      </h1>

      {/* Terms & Conditions */}
      <div className="terms">
        <span>
          I accept the <a href="#" className="terms-link">Terms of Service</a>
        </span>
      </div>

      {/* Connect Wallet Button */}
      <button className="connect-wallet" onClick={() => WebApp.showAlert(`Connected`)}>Connect Wallet</button>
    </div>
    </>
  )
}

export default App
