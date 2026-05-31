import "./App.css";
import midshotImg from "./assets/imgs/midshot.png";
import Navbar from "./components/navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="main-content">
        <section className="hero--section">
          <div className="hero--container">
            <header className="google--name">
              <span>H</span>
              <span>e</span>
              <span>l</span>
              <span>l</span>
              <span>o</span>
              <span>,</span>
            </header>
            <div className="hero--heading-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="search--icon w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <h2 id="hero-heading" className="hero--heading type--container">
                I'm
                <span id="type-sentence" className="type--sentence"></span>
                <span className="type--cursor"></span>
              </h2>
            </div>
            <div className="cta--container">
              <a href="https://github.com/bayl0n" target="_blank">
                <button className="google--button">My Projects</button>
              </a>
              <a
                href="https://docs.google.com/document/d/1jBRd1SCpoCV6EyJXQ0XgCzRCJN-YBpFgnPUEMOWdstY/edit?usp=sharing"
                target="_blank"
              >
                <button className="google--button">My Resume</button>
              </a>
            </div>
          </div>
        </section>
        <svg
          className="bio--wave"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#0099ff"
            fillOpacity="1"
            d="M0,0L40,32C80,64,160,128,240,138.7C320,149,400,107,480,90.7C560,75,640,85,720,117.3C800,149,880,203,960,229.3C1040,256,1120,256,1200,234.7C1280,213,1360,171,1400,149.3L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          ></path>
        </svg>
        <section className="bio--section">
          <div className="bio--content">
            <h2 id="about" className="bio--heading">
              Nice to meet you!
            </h2>
            <div className="bio--body"></div>
            <div className="bio--body">
              Alongside those ventures, I have also spent a lot of my free time
              on side projects exploring new technologies and receiving
              certifications from online courses (I am currently undertaking
              Harvard's CS50 at the moment!), which can be seen in more detail
              in my resume.
            </div>
          </div>
          <img
            className="bio--midshot"
            src={midshotImg}
            alt="A midshot of me"
          ></img>
        </section>
      </div>
      <section className="projects--section">
        <h1 className="tbc">
          Projects<span id="ellipses"></span>
        </h1>
      </section>
    </>
  );
}

export default App;
