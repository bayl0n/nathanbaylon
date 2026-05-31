import "./navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="window--button-container">
        <div className="window--button"></div>
        <div className="window--button"></div>
        <div className="window--button"></div>
      </div>
      <h1 className="navbar--heading">Nathan Baylon</h1>
      <ul>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#">Projects</a>
        </li>
        <li>
          <a href="#">Blog</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
