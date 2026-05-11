import React from "react";
import { createRoot } from "react-dom/client";
import {
  CalendarDays,
  Camera,
  Check,
  ChevronRight,
  Coffee,
  Facebook,
  Flower2,
  GlassWater,
  Heart,
  MapPin,
  Martini,
  MessageCircle,
  Phone,
  Sparkles,
  Utensils,
} from "lucide-react";
import "./styles.css";
import { useSiteContent } from "./useSiteContent";

const AdminStudio = React.lazy(() =>
  import("./AdminStudio").then((module) => ({ default: module.AdminStudio })),
);

type InquiryState = {
  name: string;
  phone: string;
  eventType: string;
  eventDate: string;
  location: string;
  guestCount: string;
  services: string[];
  notes: string;
};

const initialInquiry: InquiryState = {
  name: "",
  phone: "",
  eventType: "",
  eventDate: "",
  location: "",
  guestCount: "",
  services: [],
  notes: "",
};

const serviceIcons = {
  coffee: Coffee,
  cocktail: Martini,
  grazing: Utensils,
  cart: GlassWater,
  perfume: Flower2,
  mirror: Camera,
  planner: CalendarDays,
};

function App() {
  const { content, source } = useSiteContent();
  const {
    brand,
    contact,
    eventTypes,
    galleryImages,
    hero,
    packages,
    sections,
    services,
    stats,
    whyPoints,
  } = content;
  const [inquiry, setInquiry] = React.useState<InquiryState>(initialInquiry);
  const [status, setStatus] = React.useState("");

  const selectedServiceLabels = inquiry.services.join(", ");

  const preparedMessage = React.useMemo(() => {
    const lines = [
      "Hi Celestia! I would like to request an event package.",
      "",
      `Name: ${inquiry.name}`,
      `Phone: ${inquiry.phone}`,
      `Event type: ${inquiry.eventType}`,
      `Event date: ${inquiry.eventDate}`,
      `Location: ${inquiry.location}`,
      `Guest count: ${inquiry.guestCount}`,
      `Interested services: ${selectedServiceLabels || "Not yet sure"}`,
      `Notes: ${inquiry.notes || "N/A"}`,
    ];

    return lines.join("\n");
  }, [inquiry, selectedServiceLabels]);

  function updateInquiry<Key extends keyof InquiryState>(
    key: Key,
    value: InquiryState[Key],
  ) {
    setInquiry((current) => ({ ...current, [key]: value }));
  }

  function toggleService(service: string) {
    setInquiry((current) => {
      const exists = current.services.includes(service);
      return {
        ...current,
        services: exists
          ? current.services.filter((item) => item !== service)
          : [...current.services, service],
      };
    });
  }

  function submitInquiry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !inquiry.name ||
      !inquiry.phone ||
      !inquiry.eventType ||
      !inquiry.eventDate ||
      !inquiry.location ||
      !inquiry.guestCount
    ) {
      setStatus("Please complete the required details before sending.");
      return;
    }

    setStatus("Opening your prepared inquiry message...");
    window.location.href = `sms:${contact.phoneHref}?&body=${encodeURIComponent(
      preparedMessage,
    )}`;
  }

  return (
    <main>
      <header className="site-header" aria-label="Celestia main navigation">
        <a className="brand" href="#top" aria-label="Celestia home">
          <span className="brand-mark">{brand.name.charAt(0)}</span>
          <span>
            <strong>{brand.name}</strong>
            <small>{brand.descriptor}</small>
          </span>
        </a>

        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#events">Events</a>
          <a href="#offers">Offers</a>
          <a href="#gallery">Gallery</a>
          <a href="#inquiry">Inquire</a>
        </nav>

        <a className="header-cta" href={contact.facebookUrl} target="_blank" rel="noreferrer">
          <MessageCircle size={18} />
          Message
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">
            <MapPin size={16} />
            {contact.locationLabel}
          </p>
          <h1>{hero.headline}</h1>
          <p className="hero-lede">{hero.lede}</p>

          <div className="hero-actions">
            <a className="button primary" href={contact.facebookUrl} target="_blank" rel="noreferrer">
              <Facebook size={18} />
              {hero.primaryCtaLabel}
            </a>
            <a className="button secondary" href="#inquiry">
              {hero.secondaryCtaLabel}
              <ChevronRight size={18} />
            </a>
          </div>

          {source === "fallback" && (
            <p className="cms-status">
              Connect Sanity env vars to make this content editable from Studio.
            </p>
          )}

          <div className="stats" aria-label="Celestia highlights">
            {stats.map((item) => (
              <div key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual" aria-label="Celestia event experience collage">
          <img
            className="hero-photo main-photo"
            src={hero.mainImage.image}
            alt={hero.mainImage.alt}
          />
          <img
            className="hero-photo side-photo"
            src={hero.sideImage.image}
            alt={hero.sideImage.alt}
          />
          <div className="hero-note">
            <Sparkles size={18} />
            {hero.note}
          </div>
        </div>
      </section>

      <section className="section intro-band" aria-label="Contact summary">
        <div>
          <p className="section-kicker">{sections.introKicker}</p>
          <h2>{sections.introHeading}</h2>
        </div>
        <div className="quick-contact">
          <a href={`tel:${contact.phoneHref}`}>
            <Phone size={18} />
            {contact.phone}
          </a>
          <a href={contact.facebookUrl} target="_blank" rel="noreferrer">
            <Facebook size={18} />
            Facebook Page
          </a>
        </div>
      </section>

      <section className="section" id="events">
        <div className="section-heading">
          <p className="section-kicker">{sections.eventsKicker}</p>
          <h2>{sections.eventsHeading}</h2>
        </div>
        <div className="event-grid">
          {eventTypes.map((event) => (
            <article className="event-card" key={event.title}>
              <span>{event.accent}</span>
              <h3>{event.title}</h3>
              <p>{event.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section offers-section" id="offers">
        <div className="section-heading split">
          <div>
            <p className="section-kicker">{sections.offersKicker}</p>
            <h2>{sections.offersHeading}</h2>
          </div>
          <p>{sections.offersIntro}</p>
        </div>

        <div className="services-grid">
          {services.map((service) => {
            const Icon = serviceIcons[service.icon];
            return (
              <article className="service-card" key={service.title}>
                <img src={service.image.image} alt={service.image.alt} />
                <div>
                  <span className="icon-chip">
                    <Icon size={18} />
                  </span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section packages-section">
        <div className="section-heading">
          <p className="section-kicker">{sections.packagesKicker}</p>
          <h2>{sections.packagesHeading}</h2>
        </div>
        <div className="package-grid">
          {packages.map((item) => (
            <article className="package-card" key={item.name}>
              <p>{item.idealFor}</p>
              <h3>{item.name}</h3>
              <ul>
                {item.includes.map((include) => (
                  <li key={include}>
                    <Check size={16} />
                    {include}
                  </li>
                ))}
              </ul>
              <a href="#inquiry">
                Request this package
                <ChevronRight size={16} />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section gallery-section" id="gallery">
        <div className="section-heading split">
          <div>
            <p className="section-kicker">{sections.galleryKicker}</p>
            <h2>{sections.galleryHeading}</h2>
          </div>
          <p>{sections.galleryIntro}</p>
        </div>

        <div className="gallery-grid">
          {galleryImages.map((image) => (
            <figure key={image.alt}>
              <img src={image.image} alt={image.alt} />
              <figcaption>{image.category}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="section why-section">
        <div className="why-copy">
          <p className="section-kicker">{sections.whyKicker}</p>
          <h2>{sections.whyHeading}</h2>
          <p>{sections.whyIntro}</p>
        </div>
        <div className="why-list">
          {whyPoints.map((item) => (
            <div key={item}>
              <Sparkles size={18} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section inquiry-section" id="inquiry">
        <div className="inquiry-panel">
          <div className="inquiry-copy">
            <p className="section-kicker">{sections.inquiryKicker}</p>
            <h2>{sections.inquiryHeading}</h2>
            <p>{sections.inquiryIntro}</p>
            <div className="contact-stack">
              <a href={contact.facebookUrl} target="_blank" rel="noreferrer">
                <MessageCircle size={18} />
                Message on Facebook
              </a>
              <a href={`tel:${contact.phoneHref}`}>
                <Phone size={18} />
                {contact.phone}
              </a>
            </div>
          </div>

          <form className="inquiry-form" onSubmit={submitInquiry}>
            <div className="form-row">
              <label>
                Name *
                <input
                  required
                  value={inquiry.name}
                  onChange={(event) => updateInquiry("name", event.target.value)}
                  placeholder="Your full name"
                />
              </label>
              <label>
                Phone *
                <input
                  required
                  value={inquiry.phone}
                  onChange={(event) => updateInquiry("phone", event.target.value)}
                  placeholder="+63"
                />
              </label>
            </div>

            <div className="form-row">
              <label>
                Event type *
                <select
                  required
                  value={inquiry.eventType}
                  onChange={(event) => updateInquiry("eventType", event.target.value)}
                >
                  <option value="">Choose one</option>
                  {eventTypes.map((event) => (
                    <option key={event.title} value={event.title}>
                      {event.title}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Event date *
                <input
                  required
                  type="date"
                  value={inquiry.eventDate}
                  onChange={(event) => updateInquiry("eventDate", event.target.value)}
                />
              </label>
            </div>

            <div className="form-row">
              <label>
                Location *
                <input
                  required
                  value={inquiry.location}
                  onChange={(event) => updateInquiry("location", event.target.value)}
                  placeholder="City / venue"
                />
              </label>
              <label>
                Guest count *
                <input
                  required
                  inputMode="numeric"
                  value={inquiry.guestCount}
                  onChange={(event) => updateInquiry("guestCount", event.target.value)}
                  placeholder="Estimated guests"
                />
              </label>
            </div>

            <fieldset>
              <legend>Interested services</legend>
              <div className="service-options">
                {services.map((service) => (
                  <label key={service.title}>
                    <input
                      type="checkbox"
                      checked={inquiry.services.includes(service.title)}
                      onChange={() => toggleService(service.title)}
                    />
                    <span>{service.title}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <label>
              Notes
              <textarea
                value={inquiry.notes}
                onChange={(event) => updateInquiry("notes", event.target.value)}
                placeholder="Theme, preferred package, venue details, or special requests"
              />
            </label>

            <button className="button primary form-submit" type="submit">
              Prepare Inquiry Message
              <ChevronRight size={18} />
            </button>
            {status && <p className="form-status">{status}</p>}
          </form>
        </div>
      </section>

      <footer>
        <div>
          <strong>{brand.name}</strong>
          <span>{brand.descriptor}</span>
        </div>
        <p>{brand.tagline}</p>
        <a href="#top" aria-label="Back to top">
          <Heart size={16} />
          {sections.footerBackToTop}
        </a>
      </footer>
    </main>
  );
}

function Root() {
  if (window.location.pathname.startsWith("/studio")) {
    return (
      <React.Suspense
        fallback={
          <main className="studio-setup">
            <section>
              <p className="section-kicker">Celestia Studio</p>
              <h1>Loading editor...</h1>
            </section>
          </main>
        }
      >
        <AdminStudio />
      </React.Suspense>
    );
  }

  return <App />;
}

createRoot(document.getElementById("root")!).render(<Root />);
