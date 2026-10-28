import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [activeAct, setActiveAct] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoCarousel, setAutoCarousel] = useState(true);

  // ===== CAROUSEL IMAGES =====
  const heroAlt = [
    "Hoogeman, artiste sur échasses Lord Bubbleton et bulles de savon",
    "Hoogeman, artiste de spectacle de feu",
    "Hoogeman, artiste sur échasses Lady Bubbleton et bulles de savon",
  ];

  const heroImages = [
    'carousel/FR/Echassier_Hoogeman_Lord_Bubbleton_CB.webp',
    'carousel/FR/Artiste_Hoogeman_Spectacle_De_Feu_CB.webp',
    'carousel/FR/Echassier_Hoogeman_Lady_Bubbleton_CB.webp'
  ];

  const heroImagesMd = [
    'carousel/FR/Echassier_Hoogeman_Lord_Bubbleton_CM.webp',
    'carousel/FR/Artiste_Hoogeman_Spectacle_De_Feu_CM.webp',
    'carousel/FR/Echassier_Hoogeman_Lady_Bubbleton_CM.webp'
  ];

  const heroImagesSm = [
    'carousel/FR/Echassier_Hoogeman_Lord_Bubbleton_CS.webp',
    'carousel/FR/Artiste_Hoogeman_Spectacle_De_Feu_CS.webp',
    'carousel/FR/Echassier_Hoogeman_Lady_Bubbleton_CS.webp'
  ];

  // ===== ACTS DATA (12 ACTS) =====
  const acts = [
    {
      id: 'lord-bubbleton',
      name: 'Lord Bubbleton',
      url: 'acts/FR/Festival_Lord_Bubbleton_Bulles_Echassier.webp',
      urlHires: 'acts/FR/Festival_Lord_Bubbleton_Bulles_Echassier_SQ.webp',
      description: "Lord Bubbleton est le grand maître de l'émerveillement. Avec des bulles de savon de toutes tailles, des plus délicates aux plus gigantesques, il crée un univers magique qui lui est propre. Son chapeau emblématique fait danser de petites bulles autour de lui. Pour un effet encore plus spectaculaire, il associe son numéro à de puissants effets de feu. En hiver, son éclairage intégré le transforme en véritable phare lumineux. Excellent en solo, il brille encore davantage en duo avec Lady Bubbleton. Son assistant Bobby Bell l'accompagne souvent et propose des ateliers interactifs de bulles géantes, dans le pur style Bubbleton."
    },
    {
      id: 'hdmi',
      name: 'HDMI',
      url: 'acts/FR/Echassier_Velo_LED_Disco_Party.webp',
      urlHires: 'acts/FR/Echassier_Velo_LED_Disco_Party_SQ.webp',
      description: "Une apparition unique que vous ne verrez nulle part ailleurs ! Le personnage « Didi Sco » pédale sur un vélo disco entièrement conçu sur mesure… sur échasses ! Cette animation mobile est un véritable spectacle roulant, équipé d'un système sonore de 200 W, d'une boule à facettes, d'une machine à fumée, d'un éclairage LED et de canons à confettis. Le numéro peut être entièrement personnalisé et complété par deux danseurs ou des artistes en rollers. L'attraction idéale pour les festivals, les courses cyclistes et le théâtre de rue."
    },
    {
      id: 'kapitein-langpoot',
      name: 'Kapitein Langpoot',
      url: 'acts/FR/Echassier_Pirate_Animation_Hoogeman.webp',
      urlHires: 'acts/FR/Echassier_Pirate_Animation_Hoogeman_SQ.webp',
      description: "Ce pirate aux jambes démesurément longues apporte divertissement et émerveillement. Avec ses bottes gigantesques, il domine la foule et impose sa présence. Si le sol le permet, il réserve un atout supplémentaire : un numéro de jonglerie spectaculaire avec des couteaux acérés. Un personnage aventureux qui allie parfaitement interaction et suspense."
    },
    {
      id: 'lady-bubbleton',
      name: 'Lady Bubbleton',
      url: 'acts/FR/Lady_Bubbleton_Spectacle_Echasses_Festival.webp',
      urlHires: 'acts/FR/Lady_Bubbleton_Spectacle_Echasses_Festival_SQ.webp',
      description: "La partenaire majestueuse de Lord Bubbleton. Avec son imposante jupe volumineuse, elle attire immédiatement tous les regards. Lady Bubbleton ne se contente pas d'être magnifique : elle distribue des bulles, des friandises et même des messages personnalisés à vos invités. En hiver, ses éclairages lui donnent une allure féerique. Elle forme le duo idéal avec Lord Bubbleton pour une animation complète."
    },
    {
      id: 'the-jester',
      name: 'The Jester',
      url: 'acts/FR/Jester_Echasses_Animation_Fete_Urbaine_Theatre_De_Rue.webp',
      urlHires: 'acts/FR/Jester_Echasses_Animation_Fete_Urbaine_Theatre_De_Rue_SQ.webp',
      description: "Le bouffon classique revisité dans un costume envoûtant. Avec son sceptre, il apporte humour et une touche de mystère à chaque événement. À la tombée de la nuit, il fait vivre la lumière et crée un effet visuel saisissant. The Jester est également très apprécié lors des événements hivernaux, où ses effets lumineux égayent les journées les plus sombres."
    },
    {
      id: 'dr-steam',
      name: 'Dr. Steam',
      url: 'acts/FR/Spectacle_De_Feu_Steampunk_Bulles.webp',
      urlHires: 'acts/FR/Spectacle_De_Feu_Steampunk_Bulles_SQ.webp',
      description: "Une prouesse visuelle venue de l'univers steampunk. Dr. Steam associe une allure mécanique puissante aux éléments bruts du feu et de la lumière. Très abouti sur le plan technique et visuellement impressionnant, ce numéro convient parfaitement aux événements recherchant une ambiance artistique et audacieuse. L'association des effets lumineux et pyrotechniques en fait une apparition inoubliable."
    },
    {
      id: 'bobby-bell',
      name: 'Bobby Bell',
      url: 'acts/FR/Bobby_Bell_Atelier_Bulles_Animation_Enfants.webp',
      urlHires: 'acts/FR/Bobby_Bell_Atelier_Bulles_Animation_Enfants_SQ.webp',
      description: "Le fidèle bras droit de Lord Bubbleton. Bobby Bell évolue au sol, sans échasses, et crée ainsi le lien idéal entre le public et les personnages géants. Il excelle dans les ateliers interactifs de fabrication de bulles géantes, dans le style unique de Bubbleton. Il peut également proposer des effets de feu et des éclairages d'ambiance lors des événements hivernaux."
    },
    {
      id: 'jack-pumpkin',
      name: 'Jack Pumpkin',
      url: 'acts/FR/Echassier_Halloween_Citrouille_Theatre_De_Rue.webp',
      urlHires: 'acts/FR/Echassier_Halloween_Citrouille_Theatre_De_Rue_SQ.webp',
      description: "Quand cet épouvantail gigantesque prend vie, vous n'en croyez pas vos yeux ! Jack Pumpkin est l'attraction incontournable des événements d'automne et d'Halloween. Sa taille impressionnante, ses mystérieux effets de fumée et son éclairage intégré créent un impact visuel unique dont on parlera longtemps."
    },
    {
      id: 'alto-calavera',
      name: 'Alto Calavera',
      url: 'acts/FR/Echassier_Dia_De_Los_Muertos_Halloween_Cranes_Fleurs.webp',
      urlHires: 'acts/FR/Echassier_Dia_De_Los_Muertos_Halloween_Cranes_Fleurs_SQ.webp',
      description: "Il s'élève au-dessus de la foule, silhouette monumentale venue tout droit du royaume des morts. Alto Calavera est un autel ambulant : un crâne peint de couleurs vives, un sombrero aussi large que l'horizon et un manteau couvert de fleurs. Son costume de mariachi richement décoré incarne l'esprit du Día de los Muertos : non pas quelque chose d'effrayant, mais une célébration grandiose, colorée et inoubliable. Cette élégante calavera déambule au-dessus du public, invite, surprend et captive tous les regards. Avec Alto Calavera, La Muerte n'est pas la fin, mais le début de la fête."
    },
    {
      id: 'kauwgombola',
      name: 'Kauwgombola',
      url: 'acts/FR/Animation_Mobile_Theatre_De_Rue_Steampunk_Technologie_Machine_A_Bonbons.webp',
      urlHires: 'acts/FR/Animation_Mobile_Theatre_De_Rue_Steampunk_Technologie_Machine_A_Bonbons_SQ.webp',
      description: "La Kauwgombola est une machine unique d'inspiration steampunk. Est-ce une attraction foraine, un distributeur de chewing-gums, un bingo ou une tombola ? Aucun de ces jeux, et pourtant un peu tout cela à la fois. Les enfants découvrent la technologie en jouant, et chacun gagne : souvent une petite gourmandise, parfois une belle surprise. La machine peut circuler ou être installée à un endroit fixe. Elle fonctionne avec des jetons en bois personnalisés ou une pièce de 2 €. À côté ou à l'intérieur, un personnage joue les bonimenteurs de fête foraine, avec des effets sonores joyeux et beaucoup d'enthousiasme. Amusement garanti."
    },
    {
      id: 'kinkygeorge',
      name: 'Kinky George',
      url: 'acts/FR/Theatre_De_Rue_Mobile_Kinky_George_Festival.webp',
      urlHires: 'acts/FR/Theatre_De_Rue_Mobile_Kinky_George_Festival_SQ.webp',
      description: "Kinky George se déplace avec sa Free Spanking Boutique mobile, une animation foraine humoristique où les visiteurs explorent leurs limites avec légèreté. Anecdotes amusantes, flair théâtral et accessoires loufoques — jusqu'à un grand fouet de spectacle — créent suspense, plaisir et éclats de rire. Tout se déroule dans un cadre sûr, bienveillant et entièrement volontaire. En bon bonimenteur enthousiaste, George entraîne facilement le public dans son univers."
    },
    {
      id: 'more',
      name: 'Et plus encore...',
      url: 'acts/FR/Animation_Réception_Deambulation_Theatre_De_Rue.webp',
      urlHires: 'acts/FR/Animation_Réception_Deambulation_Theatre_De_Rue_SQ.webp',
      description: "Chez Hoogeman, l'aventure ne s'arrête pas à ces personnages. Notre expertise englobe de nombreux autres numéros et personnages, ainsi que de la jonglerie, de l'acrobatie, des spectacles de feu et bien plus encore. Vous avez un thème précis ou une idée originale ? Nous vous accompagnons du premier croquis jusqu'à la représentation finale. Notre passion : créer des animations sur mesure pour faire de votre événement un succès exceptionnel."
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
                <a className="nav-link" href="#home" title="Accueil">Accueil</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#info" title="À propos">À propos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#acts" title="Numéros">Numéros</a>
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
            <a href="index.html" lang="nl" aria-label="Nederlands">NL</a><span>|</span><a href="EN.html" lang="en" aria-label="English">EN</a>
          </div>
          <div className="d-flex ms-auto">
            <div className="nav-item d-none d-sm-block"><a href="#home">Accueil</a></div>
            <div className="nav-item d-none d-sm-block"><a href="#info">À propos</a></div>
            <div className="nav-item d-none d-sm-block"><a href="#acts">Numéros</a></div>
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
              FAITES PASSER VOTRE ÉVÉNEMENT<br />AU NIVEAU SUPÉRIEUR
            </h1>
          </div>
        </div>
      </section>

      {/* ===== INFO SECTION ===== */}
      <section id="info" className="info-section">
        <div className="container">
          <div className="info-wrapper">
            {/* À propos Text & Circles */}
            <div className="info-content">
              <div className="info-items">
                <div className="info-item">
                  <h2>Un divertissement de qualité</h2>
                  <h3>20 ans d’expérience</h3>
                  <p>
                    Grâce à une vaste expérience dans les festivals, événements et soirées d’entreprise, Hoogeman apporte le savoir-faire attendu par votre public. Notre large éventail de compétences donne vie à chaque lieu et rend votre événement inoubliable.
                  </p>
                </div>

                <div className="info-item">
                  <h2>Créations originales et costumes</h2>
                  <h3>Du croquis à la scène</h3>
                  <p>
                    Chaque costume est une création originale, confectionnée à la main avec des matériaux de qualité et un grand souci du détail. Unique, plein de caractère et parfaitement adapté au numéro.
                  </p>
                </div>

                <div className="info-item">
                  <h2>Une expérience sur mesure</h2>
                  <h3>Pas de formule standard</h3>
                  <p>
                    Des numéros entièrement adaptés à vos souhaits. De la conception à la réalisation, nous créons une expérience complète qui transporte votre public dans un monde d’émerveillement.
                  </p>
                </div>
              </div>

              <div className="info-circles">
                <div className="circle info-circle">
                  <img src="Echassier_Jongleur_Clown_Hoogeman.webp" alt="Animation événementielle par Hoogeman" loading="lazy" />
                </div>
                <div className="circle info-circle">
                  <img src="Jester_Echassier_Detail_Costume.webp" alt="Détail d’un costume artisanal d’artiste sur échasses" loading="lazy" />
                </div>
                <div className="circle info-circle">
                  <img src="Animation_Evenementielle_Sur_Mesure.webp" alt="Concept d’animation sur mesure" loading="lazy" />
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
                  <img src={act.url} alt={act.name + " : " + act.description.replace(/<[^>]*>/g, "").slice(0, 150)} loading="lazy" />
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
                  <img src={acts.find(a => a.id === activeAct)?.urlHires} alt={acts.find(a => a.id === activeAct)?.name + " : " + (acts.find(a => a.id === activeAct)?.description || "").replace(/<[^>]*>/g, "").slice(0, 150)} />
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
              PRÊT À FAIRE BRILLER<br />VOTRE ÉVÉNEMENT ?
            </h2>
            <p className="contact-text">
              Du premier concept aux derniers applaudissements, nous imaginons une expérience qui laisse une impression durable. Une réalisation professionnelle, attentive à l’interaction, à une ambiance envoûtante et au moindre détail. Plus qu’un numéro : une expérience unique.
            </p>
            <h3 className="contact-subtitle">Votre événement. Notre savoir-faire.</h3>
            <p className="contact-description">
              Parlez-nous de vos projets et nous ferons de la magie !
            </p>
            <div className="contact-info">
              <p className="contact-email"><strong>E-mail :</strong> <a href="mailto:info@hoogeman.be">info@hoogeman.be</a></p>
              <p className="contact-phone"><strong>Téléphone :</strong> <a href="tel:+32476568298">+32 476 56 82 98</a></p>
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
              <a href="https://www.facebook.com/Hoogeman-Stilt-Numéros-High-Level-Entertainment-1740955139332237/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
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
