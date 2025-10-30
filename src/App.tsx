import { useState } from 'react';
import './App.css';

function App() {
  const [activeAct, setActiveAct] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoCarousel, setAutoCarousel] = useState(true);

  const heroImages = [
    'carousel/Stiltwalker_Hoogeman_Lord_Bubbleton.jpg?auto=compress&cs=tinysrgb&w=1920',
    'carousel/Artist_Hoogeman_Fire_Eating.jpg?auto=compress&cs=tinysrgb&w=1920',
    'carousel/Stiltwalker_Hoogeman_Lady_Bubbleton.jpg?auto=compress&cs=tinysrgb&w=1920'
  ];

  const heroImagesMd = [
    'carousel/Stiltwalker_Hoogeman_Lord_Bubbleton_md.jpg?auto=compress&cs=tinysrgb&w=1920',
    'carousel/Artist_Hoogeman_Fire_Eating_md.jpg?auto=compress&cs=tinysrgb&w=1920',
    'carousel/Stiltwalker_Hoogeman_Lady_Bubbleton_md.jpg?auto=compress&cs=tinysrgb&w=1920'
  ];

  const heroImagesSm = [
    'carousel/Stiltwalker_Hoogeman_Lord_Bubbleton_sm.jpg?auto=compress&cs=tinysrgb&w=1920',
    'carousel/Artist_Hoogeman_Fire_Eating_sm.jpg?auto=compress&cs=tinysrgb&w=1920',
    'carousel/Stiltwalker_Hoogeman_Lady_Bubbleton_sm.jpg?auto=compress&cs=tinysrgb&w=1920'
  ];

  const acts = [
    { id: 'lord-bubbleton', name: 'Lord Bubbleton', url: 'acts/Festival_Lord_Bubbleton_Zeepbelen_Steltenloper.jpg',
      description: 'Een charmante bellenblazer die uw gasten betovert met magische zeepbellen en interactieve performances.' },
    { id: 'hdmi', name: 'HDMI', url: 'acts/Steltenloper_Hdmi_Fiets_Disco_Party.jpg',
      description: 'Een energieke muzikale act die uw event omtovert tot een spetterende show vol ritme en entertainment.' },
    { id: 'kapitein-langpoot', name: 'Kapitein Langpoot', url: 'acts/Steltenloper_Piraat_Animatie_Hoogeman.jpg',
      description: 'Een imposante steltenact die indruk maakt met zijn lengte en charisma, perfect voor festivals en events.' },
    { id: 'lady-bubbleton', name: 'Lady Bubbleton', url: 'acts/Lady_Bubbleton_Stelten_Act_Festival.jpg',
      description: 'De elegante tegenhanger van Lord Bubbleton, die verfijnde bellenshows verzorgt voor een exclusief publiek.' },
    { id: 'the-jester', name: 'The Jester', url: 'acts/Jester_Stelten_Animatie_Stadsfeest_Straattheater.jpg', 
      description: 'Een speelse entertainer die jongleren, acrobatiek en humor combineert tot een onvergetelijke show.' },
    { id: 'dr-steam', name: 'Dr. Steam', url: 'acts/Vuurshow_Steampunk_Act_Zeepbellen.jpg',
      description: 'Een steampunk karakter dat wetenschap en theater samenbrengt in een unieke performance.' },
    { id: 'bobby-bell', name: 'Bobby Bell', url: 'acts/Bobby_Bell_Zeepbellen_Workshop_Kinderanimatie.jpg',
      description: 'Een klassieke straatartiest die met zijn muziek en persoonlijkheid iedereen weet te vermaken.' },
    { id: 'jack-pumpkin', name: 'Jack Pumpkin', url: 'acts/Steltenloper_Halloween_Pompoen_Act_Straattheater.jpg',
      description: 'Een mysterieus Halloween-karakter perfect voor spooky events en themafeesten.' },
    { id: 'more', name: 'En meer...', url: 'acts/Hosting_Act_Straattheater_Animatie.jpg',
      description: 'Ontdek nog veel meer unieke acts en performers die perfect passen bij uw event. Neem contact op voor het volledige overzicht.' }
  ];

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    setAutoCarousel(false);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    setAutoCarousel(false);
  };

  function nextSlide()
  {
    if (autoCarousel) {
      let n = (currentSlide + 1) % heroImages.length
      setCurrentSlide(n);
    }
  }

  setTimeout(nextSlide, 5000);

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container">
          <a className="navbar-brand" href="#home">
            <img src="./logo.png" alt="Hoogeman" className="logo" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#home" title="Home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#info" title="Info">Info</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#acts" title="Acts">Acts</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact" title="Contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div id="heroCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-inner carousel-lg">
            {heroImages.map((img, index) => (
              <div key={index} className={`carousel-item ${index === currentSlide ? 'active' : ''}`}>
                <img src={img} className="d-block w-100" alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </div>

          <div className="carousel-inner carousel-md">
            {heroImagesMd.map((img, index) => (
              <div key={index} className={`carousel-item ${index === currentSlide ? 'active' : ''}`}>
                <img src={img} className="d-block w-100" alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </div>

          <div className="carousel-inner carousel-sm">
            {heroImagesSm.map((img, index) => (
              <div key={index} className={`carousel-item ${index === currentSlide ? 'active' : ''}`}>
                <img src={img} className="d-block w-100" alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" onClick={handlePrevSlide}>
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" onClick={handleNextSlide}>
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">
            TIL UW EVENT NAAR<br />HET HOOGSTE NIVEAU
          </h1>
        </div>
      </section>



<section className="info-section2">
  <div className="info-container2">
    <div className="info-text">
      <div className="info-item">
        <h2>Kwaliteitsvol Entertainment</h2>
        <h3>Door 20 jaar ervaring</h3>
        <p>
          Met uitgebreide ervaring op diverse festivals, bedrijfsfeesten en een
          scala aan vaardigheden, biedt Hoogeman de deskundigheid die u nodig
          heeft om uw evenement onvergetelijk te maken.
        </p>
      </div>

      <div className="info-item">
        <h2>Eigen Creaties en Kostuumontwerp</h2>
        <h3>Van schets tot performance</h3>
        <p>
          Elk kostuum is een uniek ontwerp, handgemaakt met hoogwaardige
          materialen en oog voor detail. Origineel, karaktervol en perfect
          afgestemd op de act.
        </p>
      </div>

      <div className="info-item">
        <h2>Unieke Beleving op Maat</h2>
        <h3>Geen standaardformules</h3>
        <p>
          Aangepaste acts die volledig aansluiten bij uw wensen. Van concept tot
          uitvoering creëren we een totaalervaring die uw publiek meeneemt in
          een wereld vol verwondering.
        </p>
      </div>
    </div>

    <div className="info-images">
      <div className="circle"><img src="Stelten_Jongleren_Clown_Hoogeman.jpg" alt="Entertainment"/></div>
      <div className="circle"><img src="Jester_Steltenloper_Detail_Kostuum.jpg" alt="Kostuumontwerp"/></div>
      <div className="circle"><img src="Uniek_evenement_Op_Maat.jpg" alt="Beleving op maat"/></div>
    </div>
  </div>

  <div className="info-bg"></div>
</section>















      {/* Acts Section */}
      <section id="acts" className="acts-section">
        <div className="container">
          <div className="acts-grid">
            {acts.map((act) => (
              <div key={act.id} className={`act-item`}  onClick={() => setActiveAct(act.id)}>
                <div className="act-circle">
                  <img src={act.url} alt={act.name} />
                </div>
                <div className="act-label">
                  {act.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Act Modal */}
      {activeAct && (
        <div className="act-modal" onClick={() => setActiveAct(null)}>
          <div className="act-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="act-modal-close" onClick={() => setActiveAct(null)}>&times;</button>
            <h2>{acts.find(a => a.id === activeAct)?.name}</h2>
            <div className="act-img-wrapper">
            <img className="act-modal-img" src={acts.find(a => a.id === activeAct)?.url} />
            <p>{acts.find(a => a.id === activeAct)?.description ?? ""}</p>
            </div>
            {/* {<p dangerouslySetInnerHTML={{ __html : acts.find(a => a.id === activeAct)?.description ?? ""}}> </p> } */}
          </div>
        </div>
      )} 

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="contact-wrapper">
          <div className="contact-overlay">
            <div className="contact-content">
              <h2 className="contact-title">
                KLAAR OM UW EVENT TE<br />LATEN SCHITTEREN?
              </h2>
              <p className="contact-text">
                Van het eerste concept tot het laatste applaus: wij ontwerpen een ervaring die een blijvende impact heeft. Professioneel uitgevoerd, met perfecte aandacht voor interactie, een betoverende ambiance en oog voor detail. Geen zichtbare act, wel een bijzondere beleving.
              </p>
              <h3 className="contact-subtitle">Uw event. Onze expertise.</h3>
              <p className="contact-details">
                Vertel ons uw plannen & wij maken er magie van!
              </p>
              <p className="contact-email">info@hoogeman.be</p>
              <p className="contact-phone">+32 476 56 82 98</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Logos Section */}
      <section className="partners-section">
        <div className="partners-container">
          {/* <div className="partner-logo">Jalhon</div>
          <div className="partner-logo">ROCK TERNAT</div>
          <div className="partner-logo">WANLAND FESTIVAL</div>
          <div className="partner-logo">Cirkel</div>
          <div className="partner-logo">RETRO EMPIRE</div>
          <div className="partner-logo">TESLA</div>
          <div className="partner-logo">LAUNDRY DAY</div>
          <div className="partner-logo">elrow town</div>
          <div className="partner-logo">CIRQUE MAGIQUE</div>
          <div className="partner-logo">12INCH LOVERS</div> */}


          <div className="partner-logo"><img src="references/logo_zillion.jpg" alt="Zillion"/></div>
          <div className="partner-logo"><img src="references/logo_rock_ternat.jpg" alt="Rock Ternat"/></div>
          <div className="partner-logo"><img src="references/logo_waailand.jpg" alt="Zaailand Festival"/></div>
          <div className="partner-logo"><img src="references/logo_tomorrowland.jpg" alt="Tomorrowland"/></div>
          <div className="partner-logo"><img src="references/logo_retro_empire.jpg" alt="Retro Empire"/></div>
          <div className="partner-logo"><img src="references/logo_tesla.jpg" alt="Tesla"/></div>
          <div className="partner-logo"><img src="references/logo_laundry_day.jpg" alt="Laundry Day"/></div>
          <div className="partner-logo"><img src="references/logo_elrow_town.jpg" alt="Elrow Town"/></div>
          <div className="partner-logo"><img src="references/logo_cirque_magique.jpg" alt="Cirque Magique"/></div>
          <div className="partner-logo"><img src="references/logo_12_inch_lovers.jpg" alt="12 Inch Lovers"/></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Instagram">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Facebook">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
            <p className="footer-text">® 2025 | Hoogeman | All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
