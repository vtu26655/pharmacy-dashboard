function Header() {
  return (
    <header className="header">
      <div>
        <h1>Smart Pharmacy</h1>
        <p>Order Processing & Inventory Monitor</p>
      </div>

      <div className="live-indicator">
        <span></span>
        Live Monitoring
      </div>
    </header>
  );
}

export default Header;