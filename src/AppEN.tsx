import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [activeAct, setActiveAct] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoCarousel, setAutoCarousel] = useState(true);

  // ===== CAROUSEL IMAGES =====
  const heroAlt = [
    "Hoogeman stilt walker Lord Bubbleton creating soap bubbles",
    "Hoogeman fire performer",
    "Hoogeman stilt walker Lady Bubbleton with soap bubbles",
  ];

  const heroImages = [
    'carousel/EN/Stiltwalker_Hoogeman_Lord_Bubbleton_CB.webp',
    'carousel/EN/Artist_Hoogeman_Fire_Eating_CB.webp',
    'carousel/EN/Stiltwalker_Hoogeman_Lady_Bubbleton_CB.webp'
  ];

  const heroImagesMd = [
    'carousel/EN/Stiltwalker_Hoogeman_Lord_Bubbleton_CM.webp',
    'carousel/EN/Artist_Hoogeman_Fire_Eating_CM.webp',
    'carousel/EN/Stiltwalker_Hoogeman_Lady_Bubbleton_CM.webp'
  ];

  const heroImagesSm = [
    'carousel/EN/Stiltwalker_Hoogeman_Lord_Bubbleton_CS.webp',
    'carousel/EN/Artist_Hoogeman_Fire_Eating_CS.webp',
    'carousel/EN/Stiltwalker_Hoogeman_Lady_Bubbleton_CS.webp'
  ];

  // ===== ACTS DATA (12 ACTS) =====
  const acts = [
    {
      id: 'lord-bubbleton',
      name: 'Lord Bubbleton',
      url: 'acts/EN/Festival_Lord_Bubbleton_Bubble_Stilt_Walker.webp',
      urlHires: 'acts/EN/Festival_Lord_Bubbleton_Bubble_Stilt_Walker.webp',
      description: "Lord Bubbleton is the master of wonder. With soap bubbles of every size—from delicate little bubbles to spectacular giants—he creates a magical world of his own. His iconic hat makes small bubbles dance playfully around him. For extra impact, he combines his act with powerful fire effects, while integrated lighting turns him into a beacon during winter events. He is a strong solo act and shines even brighter alongside Lady Bubbleton. He is often joined by his helper Bobby Bell, who runs interactive giant-bubble workshops on site in true Bubbleton style."
    },
    {
      id: 'hdmi',
      name: 'HDMI',
      url: 'acts/EN/Stilt_Walker_LED_Bicycle_Disco_Party.webp',
      urlHires: 'acts/EN/Stilt_Walker_LED_Bicycle_Disco_Party_SQ.webp',
      description: "A unique sight you won't find anywhere else! The character ‘Didi Sco’ rides a fully custom-built disco bicycle… on stilts! This mobile act is a spectacular moving show, equipped with a 200 W sound system, disco ball, smoke machine, LED lighting and confetti cannons. The act can be fully customised to your wishes and expanded with two additional dancers or roller skaters. The perfect eye-catcher for festivals, cycling races and street theatre."
    },
    {
      id: 'kapitein-langpoot',
      name: 'Kapitein Langpoot',
      url: 'acts/EN/Stilt_Walker_Pirate_Entertainment_Hoogeman.webp',
      urlHires: 'acts/EN/Stilt_Walker_Pirate_Entertainment_Hoogeman_SQ.webp',
      description: "This pirate on towering legs brings entertainment and pure wonder. With his gigantic boots, he cuts an imposing figure above the crowd. Where the ground conditions allow, he has another spectacular trick up his sleeve: a juggling act with razor-sharp knives. An adventurous character who combines interaction and suspense perfectly."
    },
    {
      id: 'lady-bubbleton',
      name: 'Lady Bubbleton',
      url: 'acts/EN/Lady_Bubbleton_Stilt_Show_Festival.webp',
      urlHires: 'acts/EN/Lady_Bubbleton_Stilt_Show_Festival_SQ.webp',
      description: "The majestic partner of Lord Bubbleton. With her impressive, voluminous skirt, she immediately captures everyone's attention. Lady Bubbleton is more than just a sight to behold: she hands out bubbles, sweets and even personalised messages to your guests. During the winter months, her beautiful lighting gives her a fairytale glow. She makes the perfect partner act alongside Lord Bubbleton."
    },
    {
      id: 'the-jester',
      name: 'The Jester',
      url: 'acts/EN/Jester_Stilt_Entertainment_City_Festival_Street_Theatre.webp',
      urlHires: 'acts/EN/Jester_Stilt_Entertainment_City_Festival_Street_Theatre_SQ.webp',
      description: "The classic jester in a captivating new guise. With his sceptre, he brings humour and a touch of mystery to every event. After dark, he brings light to life, creating a striking visual effect. The Jester is also a welcome guest at winter events, where his spectacular lighting accents brighten even the darkest days."
    },
    {
      id: 'dr-steam',
      name: 'Dr. Steam',
      url: 'acts/EN/Fire_Show_Steampunk_Performance_Bubbles.webp',
      urlHires: 'acts/EN/Fire_Show_Steampunk_Performance_Bubbles_SQ.webp',
      description: "A visual showpiece from the world of steampunk. Dr. Steam combines a powerful mechanical look with the raw elements of fire and light. Technically impressive and visually striking, this act is ideal for events looking for a bold, artistic atmosphere. The combination of light and fire effects makes him an unforgettable presence."
    },
    {
      id: 'bobby-bell',
      name: 'Bobby Bell',
      url: 'acts/EN/Bobby_Bell_Bubble_Workshop_Kids_Entertainment.webp',
      urlHires: 'acts/EN/Bobby_Bell_Bubble_Workshop_Kids_Entertainment_SQ.webp',
      description: "Lord Bubbleton's loyal right-hand man. Bobby Bell performs at ground level (without stilts), making him the perfect link between the audience and the towering characters. He is a master of interactive giant-soap-bubble workshops, all in the unique Bubbleton style. Bobby Bell can also provide fire effects and atmospheric lighting for winter occasions."
    },
    {
      id: 'jack-pumpkin',
      name: 'Jack Pumpkin',
      url: 'acts/EN/Stilt_Walker_Halloween_Pumpkin_Show_Street_Theatre.webp',
      urlHires: 'acts/EN/Stilt_Walker_Halloween_Pumpkin_Show_Street_Theatre_SQ.webp',
      description: "When this gigantic scarecrow comes to life, you'll hardly believe your eyes! Jack Pumpkin is the ultimate eye-catcher for any autumn or Halloween event. His impressive height, mysterious smoke effects and built-in lighting create a unique visual impact that people will be talking about long afterwards."
    },
    {
      id: 'alto-calavera',
      name: 'Alto Calavera',
      url: 'acts/EN/Stilt_Walker_Dia_De_Los_Muertos_Halloween_Skulls_Flowers.webp',
      urlHires: 'acts/EN/Stilt_Walker_Dia_De_Los_Muertos_Halloween_Skulls_Flowers_SQ.webp',
      description: "He rises high above the crowd, a monumental figure straight from the realm of the dead. Alto Calavera is a walking altar: a brightly painted skull, a sombrero as wide as the horizon and a cloak covered in flowers. His beautifully decorated mariachi outfit embodies the spirit of Día de los Muertos—not as something frightening, but as a grand, colourful and unforgettable celebration. This elegant calavera wanders above the audience, inviting, surprising and captivating everyone. With Alto Calavera, La Muerte is not the end, but the beginning of the party."
    },
    {
      id: 'kauwgombola',
      name: 'Kauwgombola',
      url: 'acts/EN/Mobile_Show_Street_Theatre_Steampunk_Technology_Gumball_Machine.webp',
      urlHires: 'acts/EN/Mobile_Show_Street_Theatre_Steampunk_Technology_Gumball_Machine_SQ.webp',
      description: "The Kauwgombola is a unique steampunk-inspired contraption. Is it a fairground attraction, a gumball machine, bingo or a raffle? None of these—and all of them at once. Children discover how things work while playing, and everyone wins: often a little treat, sometimes a surprisingly lovely prize. The machine can be used as a mobile attraction or set up in one place. It works with custom wooden tokens or a €2 coin. Beside or inside the machine, a character acts as a traditional fairground barker, complete with cheerful sound effects and plenty of enthusiasm. Fun guaranteed."
    },
    {
      id: 'kinkygeorge',
      name: 'Kinky George',
      url: 'acts/EN/Street_Theatre_Mobile_Kinky_George_Festival.webp',
      urlHires: 'acts/EN/Street_Theatre_Mobile_Kinky_George_Festival_SQ.webp',
      description: "Kinky George travels with his mobile Free Spanking Boutique, a humorous fairground act where visitors can playfully explore their boundaries. With funny anecdotes, theatrical flair and a range of tongue-in-cheek props—including a large show whip—he creates suspense, fun and plenty of laughter. Everything is safe, friendly and entirely voluntary, with George as an enthusiastic fairground barker who effortlessly draws in the crowd."
    },
    {
      id: 'more',
      name: 'And much more...',
      url: 'acts/EN/Hosting_Act_Street_Theatre_Entertainment.webp',
      urlHires: 'acts/EN/Hosting_Act_Street_Theatre_Entertainment_SQ.webp',
      description: "At Hoogeman, the characters don't stop here. Our expertise covers a whole range of additional acts and characters, complemented by juggling, acrobatics, fire shows and more. Have a specific theme or a unique idea in mind? We'd be delighted to work with you from the first sketch to the final performance. Our passion is creating tailor-made entertainment that makes your event an outstanding success."
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
      {/* <nav className="navbar navbar-expand-lg navbar-dark fixed-top d-none">
        <div className="container nav-container">
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
                <a className="nav-link" href="#info" title="About">About</a>
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
      </nav> */}

      <nav className="d-flex mynavbar fixed-top ">
        <div className='nav-wrapper container'>
          <div className='nav-content justify-content-between'>
          <div className="d-flex">
            <a className="navbar-brand" href="#home">
              <img src="./logo.png" alt="Hoogeman" className="logo" />
            </a>
          </div>
          <div className="nav-item nav-info d-flex flex-column">
            <a  href="mailto:info@hoogeman.be">info@hoogeman.be</a>
            <a href="tel:+32476568298">+32 476 56 82 98</a>
          </div>
          <div className="language-switcher" aria-label="Language">
            <a href="index.html" lang="nl" aria-label="Nederlands">NL</a><span>|</span><a href="FR.html" lang="fr" aria-label="Français">FR</a>
          </div>
          <div className="d-flex ms-auto">
            <div className="nav-item d-none d-sm-block"><a href="#home">Home</a></div>
            <div className="nav-item d-none d-sm-block"><a href="#info">About</a></div>
            <div className="nav-item d-none d-sm-block"><a href="#acts">Acts</a></div>
            <div className="nav-item d-none d-sm-block"><a href="#contact">Contact</a></div>
          </div>
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
                <img src={img} alt={heroAlt[index]} />
              </div>
            ))}
          </div>

          {/* Tablet Carousel */}
          <div className="carousel carousel-md">
            {heroImagesMd.map((img, index) => (
              <div key={`md-${index}`} className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}>
                <img src={img} alt={heroAlt[index]} />
              </div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="carousel carousel-sm">
            {heroImagesSm.map((img, index) => (
              <div key={`sm-${index}`} className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}>
                <img src={img} alt={heroAlt[index]} />
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
              TAKE YOUR EVENT<br />TO THE NEXT LEVEL
            </h1>
          </div>
        </div>
      </section>

      {/* ===== INFO SECTION ===== */}
      <section id="info" className="info-section">
        <div className="container">
          <div className="info-wrapper">
            {/* About Text & Circles */}
            <div className="info-content">
              <div className="info-items">
                <div className="info-item">
                  <h2>High-Quality Entertainment</h2>
                  <h3>20 Years of Experience</h3>
                  <p>
                    With extensive experience at festivals, events and corporate functions, Hoogeman brings the expertise your audience expects. Our broad range of skills brings every setting to life and helps make your event truly unforgettable.
                  </p>
                </div>

                <div className="info-item">
                  <h2>Original Creations & Costume Design</h2>
                  <h3>From Sketch to Performance</h3>
                  <p>
                    Every costume is an original design, handcrafted from high-quality materials with meticulous attention to detail. Distinctive, full of character and perfectly tailored to each act.
                  </p>
                </div>

                <div className="info-item">
                  <h2>A Unique Tailor-Made Experience</h2>
                  <h3>No One-Size-Fits-All Solutions</h3>
                  <p>
                    Acts tailored entirely to your wishes. From concept to performance, we create a complete experience that transports your audience into a world of wonder.
                  </p>
                </div>
              </div>

              <div className="info-circles">
                <div className="circle info-circle">
                  <img src="Stilt_Walker_Juggling_Clown_Hoogeman.webp" alt="Event entertainment by Hoogeman" loading="lazy" />
                </div>
                <div className="circle info-circle">
                  <img src="Jester_Stilt_Walker_Costume_Detail.webp" alt="Handcrafted stilt-walker costume detail" loading="lazy" />
                </div>
                <div className="circle info-circle">
                  <img src="Custom_Event_Entertainment.webp" alt="Tailor-made entertainment concept" loading="lazy" />
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
                  <img src={act.url} alt={act.name + ": " + act.description.replace(/<[^>]*>/g, "").slice(0, 150)} loading="lazy" />
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
                  <img src={acts.find(a => a.id === activeAct)?.urlHires} alt={acts.find(a => a.id === activeAct)?.name + ": " + (acts.find(a => a.id === activeAct)?.description || "").replace(/<[^>]*>/g, "").slice(0, 150)} />
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
              READY TO MAKE YOUR EVENT<br />SHINE?
            </h2>
            <p className="contact-text">
              From the first concept to the final applause, we create an experience that leaves a lasting impression. Professionally delivered, with a focus on interaction, an enchanting atmosphere and attention to detail. More than an act: an unforgettable experience.
            </p>
            <h3 className="contact-subtitle">Your event. Our expertise.</h3>
            <p className="contact-description">
              Tell us your plans and we’ll make magic happen!
            </p>
            <div className="contact-info">
              <p className="contact-email"><strong>Email:</strong> <a href="mailto:info@hoogeman.be">info@hoogeman.be</a></p>
              <p className="contact-phone"><strong>Phone:</strong> <a href="tel:+32476568298">+32 476 56 82 98</a></p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PARTNERS/REFERENCES SECTION ===== */}
      <section className="partners-section">
        <div className="container">
          <div className="partners-grid">
            <div className="partner-logo">
              <img src="references/logo_zillion.webp" alt="Zillion" loading="lazy" />
            </div>
            <div className="partner-logo">
              <img src="references/logo_rock_ternat.webp" alt="Rock Ternat" loading="lazy" />
            </div>
            <div className="partner-logo">
              <img src="references/logo_waailand.webp" alt="Waailand Festival" loading="lazy" />
            </div>
            <div className="partner-logo">
              <img src="references/logo_tomorrowland.webp" alt="Tomorrowland" loading="lazy" />
            </div>
            <div className="partner-logo">
              <img src="references/logo_retro_empire.webp" alt="Retro Empire" loading="lazy" />
            </div>
            <div className="partner-logo">
              <img src="references/logo_tesla.webp" alt="Tesla" loading="lazy" />
            </div>
            <div className="partner-logo">
              <img src="references/logo_laundry_day.webp" alt="Laundry Day" loading="lazy" />
            </div>
            <div className="partner-logo">
              <img src="references/logo_elrow_town.webp" alt="Elrow Town" loading="lazy" />
            </div>
            <div className="partner-logo">
              <img src="references/logo_cirque_magique.webp" alt="Cirque Magique" loading="lazy" />
            </div>
            <div className="partner-logo">
              <img src="references/logo_12_inch_lovers.webp" alt="12 Inch Lovers" loading="lazy" />
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
