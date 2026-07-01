import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [activeAct, setActiveAct] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoCarousel, setAutoCarousel] = useState(true);

  // ===== CAROUSEL IMAGES =====
  const heroImages = [
    '/carousel/Stiltwalker_Hoogeman_Lord_Bubbleton_CB.jpg?auto=compress&cs=tinysrgb&w=1920',
    '/carousel/Artist_Hoogeman_Fire_Eating_CB.jpg?auto=compress&cs=tinysrgb&w=1920',
    '/carousel/Stiltwalker_Hoogeman_Lady_Bubbleton_CB.jpg?auto=compress&cs=tinysrgb&w=1920'
  ];

  const heroImagesMd = [
    '/carousel/Stiltwalker_Hoogeman_Lord_Bubbleton_md.jpg?auto=compress&cs=tinysrgb&w=1920',
    '/carousel/Artist_Hoogeman_Fire_Eating_md.jpg?auto=compress&cs=tinysrgb&w=1920',
    '/carousel/Stiltwalker_Hoogeman_Lady_Bubbleton_md.jpg?auto=compress&cs=tinysrgb&w=1920'
  ];

  const heroImagesSm = [
    '/carousel/Stiltwalker_Hoogeman_Lord_Bubbleton_sm.jpg?auto=compress&cs=tinysrgb&w=1920',
    '/carousel/Artist_Hoogeman_Fire_Eating_sm.jpg?auto=compress&cs=tinysrgb&w=1920',
    '/carousel/Stiltwalker_Hoogeman_Lady_Bubbleton_sm.jpg?auto=compress&cs=tinysrgb&w=1920'
  ];

  // ===== ACTS DATA (12 ACTS) =====
  const acts = [
    {
      id: 'lord-bubbleton',
      name: 'Lord Bubbleton',
      url: 'acts/Festival_Lord_Bubbleton_Zeepbelen_Steltenloper.jpg',
      urlHires: 'acts/Festival_Lord_Bubbleton_Zeepbelen_Steltenloper_SQ.jpg',
      description: 'De meester van de verwondering. Lord Bubbleton creëert een magische wereld met zeepbellen in alle formaten: van klein en verfijnd tot spectaculair reusachtig. Voor extra spektakel vult hij zijn act aan met indrukwekkende vuureffecten. Tijdens winterevents wordt hij een lichtbaken dankzij geïntegreerde verlichting. Lord Bubbleton is een sterke solo-act, maar schittert extra in duo met Lady Bubbleton. Vaak wordt hij vergezeld door zijn helper Bobby Bell, die ter plaatse workshops reuzenbellen maken verzorgt.'
    },
    {
      id: 'hdmi',
      name: 'HDMI',
      url: 'acts/Steltenloper_Hdmi_Fiets_Disco_Party.jpg',
      urlHires: 'acts/Steltenloper_Hdmi_Fiets_Disco_Party_SQ.jpg',
      description: 'Een unieke verschijning die u nergens anders zult zien! Karakter \'Didi Sco\' fietst op een volledig op maat gemaakte disco-fiets... op stelten! Deze mobiele interventie is een rijdend spektakelstuk, uitgerust met een 200W sound system, discobal, rookmachines, LED-verlichting en confettikanonnen. De act is volledig te personaliseren naar uw wens en kan worden uitgebreid met twee extra dansers. Dé perfecte eyecatcher voor festivals, wielerwedstrijden en straattheater.'
    },
    {
      id: 'kapitein-langpoot',
      name: 'Kapitein Langpoot',
      url: 'acts/Steltenloper_Piraat_Animatie_Hoogeman.jpg',
      urlHires: 'acts/Steltenloper_Piraat_Animatie_Hoogeman_SQ.jpg',
      description: 'Deze piraat op zeer hoge poten brengt vermaak en pure verwondering. Met zijn gigantische laarzen is hij een imposante verschijning die boven elk publiek uitsteekt. Indien de ondergrond het toelaat, gooit hij nog een extra troef in de strijd: een spectaculaire jongleer-act met vlijmscherpe messen. Een avontuurlijk karakter dat interactie en spanning perfect weet te combineren.'
    },
    {
      id: 'lady-bubbleton',
      name: 'Lady Bubbleton',
      url: 'acts/Lady_Bubbleton_Stelten_Act_Festival.jpg',
      urlHires: 'acts/Lady_Bubbleton_Stelten_Act_Festival_SQ.jpg',
      description: 'De majesteitelijke partner van Lord Bubbleton. Met haar imposante grote rok is zij een verschijning die direct de aandacht grijpt. Lady Bubbleton is niet alleen een plaatje om naar te kijken; ze deelt bellen, snoepjes of zelfs gepersonaliseerde boodschappen uit aan uw gasten. In de wintermaanden is zij prachtig verlicht, wat haar een sprookjesachtige gloed geeft. Ze vormt de perfecte koppel-act met Lord Bubbleton voor een compleet plaatje.'
    },
    {
      id: 'the-jester',
      name: 'The Jester',
      url: 'acts/Jester_Stelten_Animatie_Stadsfeest_Straattheater.jpg',
      urlHires: 'acts/Jester_Stelten_Animatie_Stadsfeest_Straattheater_SQ.jpg',
      description: 'De klassieke nar in een magisch jasje. Gewapend met zijn magische scepter brengt hij humor en mysterie naar uw evenement. Tijdens avond- of donkere events \'tovert\' hij letterlijk met licht, waardoor hij een magisch effect creëert. Ook voor winterevents is The Jester een geliefde gast dankzij zijn spectaculaire lichteffecten die de donkere dagen direct opvrolijken.'
    },
    {
      id: 'dr-steam',
      name: 'Dr. Steam',
      url: 'acts/Vuurshow_Steampunk_Act_Zeepbellen.jpg',
      urlHires: 'acts/Vuurshow_Steampunk_Act_Zeepbellen_SQ.jpg',
      description: 'Een visueel hoogstandje in de wereld van Steampunk. Dr. Steam combineert een krachtige, mechanische uitstraling met de rauwe elementen van vuur en licht. Deze act is technisch zeer sterk en visueel indrukwekkend, waardoor hij perfect past bij evenementen waar een stoere, artistieke sfeer gewenst is. De combinatie van licht- en vuureffecten maakt hem tot een onvergetelijke verschijning.'
    },
    {
      id: 'bobby-bell',
      name: 'Bobby Bell',
      url: 'acts/Bobby_Bell_Zeepbellen_Workshop_Kinderanimatie.jpg',
      urlHires: 'acts/Bobby_Bell_Zeepbellen_Workshop_Kinderanimatie_SQ.jpg',
      description: 'De trouwe rechterhand van Lord Bubbleton. Bobby Bell werkt vanaf de grond (geen stelten), waardoor hij de ideale link vormt tussen het publiek en de hoge karakters. Hij is een meester in het verzorgen van interactieve workshops reuzezeepbellen maken, geheel in de unieke Bubbleton-stijl. Net als de rest van de familie is Bobby Bell uitgerust met vuureffecten en sfeervolle verlichting voor winterse gelegenheden.'
    },
    {
      id: 'jack-pumpkin',
      name: 'Jack Pumpkin',
      url: 'acts/Steltenloper_Halloween_Pompoen_Act_Straattheater.jpg',
      urlHires: 'acts/Steltenloper_Halloween_Pompoen_Act_Straattheater_SQ.jpg',
      description: 'Wanneer deze gigantische vogelverschrikker tot leven komt, weet u niet wat u ziet! Jack Pumpkin is de ultieme eyecatcher voor elk herfst- of griezelevenement. Met zijn indrukwekkende hoogte, mysterieuze rookeffecten en ingebouwde verlichting zorgt hij voor een unieke visuele impact waar nog lang over nagepraat zal worden.'
    },
    {
      id: 'alto-calavera',
      name: 'Alto Calavera',
      url: 'acts/Steltenloper_Dia_de_los_Muertos_Halloween_skull_flowers.jpg',
      urlHires: 'acts/Steltenloper_Dia_de_los_Muertos_Halloween_skull_flowers_SQ.jpg',
      description: 'Hoog boven de menigte rijst hij op, een monumentale verschijning, recht uit het dodenrijk. Alto Calavera is een wandelend altaar: een kleurrijk beschilderd doodshoofd, een sombrero zo breed als de horizon en een mantel bezaaid met bloemen. Met zijn prachtig versierde mariachi-outfit belichaamt hij de geest van <i>Día de los Meurtos</i>: niet als iets angstigs, maar als een vierend, groots en onvergetelijk spektakel. Deze elegante calavera dwaalt boven het publiek, nodigt uit, verrast en laat niemand onbewogen. Bij Alto Calavera is <i>La Muerte</i> niet het einde maar het begin van het feest.'
    },
    {
      id: 'act-10',
      name: 'Coming Soon',
      url: 'acts/Hosting_Act_Straattheater_Animatie.jpg',
      urlHires: 'acts/Hosting_Act_Straattheater_Animatie_SQ.jpg',
      description: 'Nog meer spektakel aan het horizon. Volg ons voor updates!'
    },
    {
      id: 'act-11',
      name: 'Mystery Act',
      url: 'acts/Hosting_Act_Straattheater_Animatie.jpg',
      urlHires: 'acts/Hosting_Act_Straattheater_Animatie_SQ.jpg',
      description: 'Wat zal het volgende karakter brengen? Laat je verrassen door onze creativiteit!'
    },
    {
      id: 'more',
      name: 'En meer...',
      url: 'acts/Hosting_Act_Straattheater_Animatie.jpg',
      urlHires: 'acts/Hosting_Act_Straattheater_Animatie_SQ.jpg',
      description: 'Bij Hoogeman stopt het niet bij deze karakters. Onze expertise strekt zich uit tot een volledig arsenaal aan nog meer acts en Karakters. Aangevuld met jonglerie, acrobatie, vuurshows enz. Heeft u een specifiek thema of een unieke wens? Wij denken graag met u mee vanaf de eerste schets tot de uiteindelijke performance. Onze passie ligt in het creëren van entertainment op maat om van uw evenement een ongekend succes te maken.'
    }
  ];

  // ===== CAROUSEL HANDLERS =====
  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    setAutoCarousel(false);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    setAutoCarousel(false);
  };

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    if (!autoCarousel) return;
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentSlide, autoCarousel, heroImages.length]);

  return (
    <div className="app">
      {/* ===== NAVIGATION ===== */}
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container nav-container">
          <a className="navbar-brand" href="#home">
            <img src="./logo.png" alt="Hoogeman" className="logo" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapsex navbar-collapse" id="navbarNav">
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

      {/* ===== HERO SECTION ===== */}
      <section id="home" className="hero-section">
        <div className="carousel-wrapper">
          {/* Desktop Carousel */}
          <div className="carousel carousel-lg">
            {heroImages.map((img, index) => (
              <div key={`lg-${index}`} className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}>
                <img src={img} alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </div>

          {/* Tablet Carousel */}
          <div className="carousel carousel-md">
            {heroImagesMd.map((img, index) => (
              <div key={`md-${index}`} className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}>
                <img src={img} alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="carousel carousel-sm">
            {heroImagesSm.map((img, index) => (
              <div key={`sm-${index}`} className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}>
                <img src={img} alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </div>

          {/* Carousel Controls */}
          <button className="carousel-control carousel-control-prev" onClick={handlePrevSlide} aria-label="Previous slide">
            <span className="carousel-icon">&#10094;</span>
          </button>
          <button className="carousel-control carousel-control-next" onClick={handleNextSlide} aria-label="Next slide">
            <span className="carousel-icon">&#10095;</span>
          </button>
        </div>

        {/* Hero Text Overlay */}
        <div className="hero-content">
          <div className="hero-text-wrapper">
            <h1 className="hero-title">
              TIL UW EVENT NAAR<br />HET HOOGSTE NIVEAU
            </h1>
          </div>
        </div>
      </section>

      {/* ===== INFO SECTION ===== */}
      <section id="info" className="info-section">
        <div className="container">
          <div className="info-wrapper">
            {/* Info Text & Circles */}
            <div className="info-content">
              <div className="info-items">
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

              <div className="info-circles">
                <div className="circle info-circle">
                  <img src="Stelten_Jongleren_Clown_Hoogeman.jpg" alt="Entertainment" loading="lazy" />
                </div>
                <div className="circle info-circle">
                  <img src="Jester_Steltenloper_Detail_Kostuum.jpg" alt="Kostuumontwerp" loading="lazy" />
                </div>
                <div className="circle info-circle">
                  <img src="Uniek_evenement_Op_Maat.jpg" alt="Beleving op maat" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ACTS SECTION ===== */}
      <section id="acts" className="acts-section">
        <div className="container">
          <div className="acts-grid">
            {acts.map((act) => (
              <div
                key={act.id}
                className="act-item"
                onClick={() => setActiveAct(act.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setActiveAct(act.id)}
              >
                <div className="act-circle">
                  <img src={act.url} alt={act.description} loading="lazy" />
                </div>
                <div className="act-label">
                  {act.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ACT MODAL POPUP ===== */}
      {activeAct && (
        <div className="act-modal-overlay" onClick={() => setActiveAct(null)}>
          <div className="act-modal" onClick={(e) => e.stopPropagation()}>
            <button className="act-modal-close" onClick={() => setActiveAct(null)} aria-label="Close modal">&times;</button>
            {acts.find(a => a.id === activeAct) && (
              <>
                <h2>{acts.find(a => a.id === activeAct)?.name}</h2>
                <div className="act-modal-content">
                  <img src={acts.find(a => a.id === activeAct)?.urlHires} alt={acts.find(a => a.id === activeAct)?.description} />
                  <p
                    dangerouslySetInnerHTML={{
                      __html: acts.find(a => a.id === activeAct)?.description || ""
                    }}
                />
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ===== CONTACT SECTION ===== */}
      <section id="contact" className="contact-section">
        <div className="contact-bg"></div>
        <div className="container">
          <div className="contact-content">
            <h2 className="contact-title">
              KLAAR OM UW EVENT TE<br />LATEN SCHITTEREN?
            </h2>
            <p className="contact-text">
              Van het eerste concept tot het laatste applaus: wij ontwerpen een ervaring die een blijvende impact heeft. Professioneel uitgevoerd, met perfecte aandacht voor interactie, een betoverende ambiance en oog voor detail. Geen zichtbare act, wel een bijzondere beleving.
            </p>
            <h3 className="contact-subtitle">Uw event. Onze expertise.</h3>
            <p className="contact-description">
              Vertel ons uw plannen & wij maken er magie van!
            </p>
            <div className="contact-info">
              <p className="contact-email"><strong>Email:</strong> info@hoogeman.be</p>
              <p className="contact-phone"><strong>Telefoon:</strong> +32 476 56 82 98</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PARTNERS/REFERENCES SECTION ===== */}
      <section className="partners-section">
        <div className="container">
          <div className="partners-grid">
            <div className="partner-logo">
              <img src="references/logo_zillion.jpg" alt="Zillion" loading="lazy" />
            </div>
            <div className="partner-logo">
              <img src="references/logo_rock_ternat.jpg" alt="Rock Ternat" loading="lazy" />
            </div>
            <div className="partner-logo">
              <img src="references/logo_waailand.jpg" alt="Waailand Festival" loading="lazy" />
            </div>
            <div className="partner-logo">
              <img src="references/logo_tomorrowland.jpg" alt="Tomorrowland" loading="lazy" />
            </div>
            <div className="partner-logo">
              <img src="references/logo_retro_empire.jpg" alt="Retro Empire" loading="lazy" />
            </div>
            <div className="partner-logo">
              <img src="references/logo_tesla.jpg" alt="Tesla" loading="lazy" />
            </div>
            <div className="partner-logo">
              <img src="references/logo_laundry_day.jpg" alt="Laundry Day" loading="lazy" />
            </div>
            <div className="partner-logo">
              <img src="references/logo_elrow_town.jpg" alt="Elrow Town" loading="lazy" />
            </div>
            <div className="partner-logo">
              <img src="references/logo_cirque_magique.jpg" alt="Cirque Magique" loading="lazy" />
            </div>
            <div className="partner-logo">
              <img src="references/logo_12_inch_lovers.jpg" alt="12 Inch Lovers" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="social-links">
              <a href="https://www.instagram.com/hoogeman.be/?hl=en" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="https://www.facebook.com/Hoogeman-Stilt-Acts-High-Level-Entertainment-1740955139332237/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
            <div className="footer-text">
              <p>&copy; 2026 | Hoogeman | All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
