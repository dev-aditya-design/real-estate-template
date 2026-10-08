import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronLeft,
  MapPin,
  Menu,
  MessageSquare,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import {
  business,
  budgets,
  categories,
  disclaimer,
  filterProperties,
  locations,
  properties,
  enquiryPath,
  propertyTypes,
  purposes,
} from "./data";
import "./styles.css";

const nav = [
  ["/", "Home"],
  ["/properties", "Properties"],
  ["/residential", "Residential"],
  ["/commercial", "Commercial"],
  ["/plots-land", "Plots & Land"],
  ["/about", "About"],
  ["/contact", "Contact"],
];
function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const property = properties.find((p) => pathname === `/properties/${p.id}`);
    const label =
      nav.find(([url]) => url === pathname)?.[1] ||
      property?.name ||
      "Page not found";
    document.title = `${label} | ${business.name} · Demonstration Template`;
  }, [pathname]);
  return null;
}
function Button({ to, children, light = false, outline = false, ...props }) {
  return (
    <Link
      className={`button ${light ? "button-light" : ""} ${outline ? "button-outline" : ""}`}
      to={to}
      {...props}
    >
      {children}
      <ArrowUpRight size={16} />
    </Link>
  );
}
function EnquiryLink({
  property,
  children = "Preview an enquiry",
  className = "button button-light",
}) {
  return (
    <Link className={className} to={enquiryPath(property)}>
      {children}
      <ArrowUpRight size={16} />
    </Link>
  );
}
function Brand() {
  return (
    <Link className="brand" to="/" aria-label={`${business.name} home`}>
      <span className="brand-mark">
        {business.initials[0]}
        <span>.</span>
      </span>
      <span className="brand-name">
        <strong>{business.name.split(" ")[0].toUpperCase()}</strong>{" "}
        {business.name.split(" ").slice(1).join(" ").toUpperCase()}
        <small>SPACES FOR YOUR NEXT CHAPTER</small>
      </span>
    </Link>
  );
}
function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    const close = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", close);
    return () => {
      document.body.classList.remove("menu-open");
      document.removeEventListener("keydown", close);
    };
  }, [open]);
  return (
    <>
      <div className="demo-banner">
        Fictional brand · Demonstration template{" "}
        <span>· Sample listings, not live inventory</span>
      </div>
      <header className="header">
        <div className="header-inner container">
          <Brand />
          <nav
            id="primary-navigation"
            className={`nav ${open ? "is-open" : ""}`}
            aria-label="Primary navigation"
          >
            {nav.map(([url, label]) => (
              <NavLink
                key={url}
                end={url === "/"}
                to={url}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {label}
              </NavLink>
            ))}
            <Link className="mobile-book" to="/contact">
              Make an enquiry <ArrowUpRight size={16} />
            </Link>
          </nav>
          <Link className="header-cta" to="/contact">
            Explore your next move <ArrowUpRight size={16} />
          </Link>
          <button
            className="menu-toggle"
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="primary-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
    </>
  );
}
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <Brand />
            <p>Your next property decision begins with a conversation.</p>
            <span className="footer-place">
              <MapPin size={16} />
              {business.location}
            </span>
          </div>
          <div>
            <span className="footer-heading">EXPLORE</span>
            {nav.map(([url, label]) => (
              <Link key={url} to={url}>
                {label}
              </Link>
            ))}
          </div>
          <div>
            <span className="footer-heading">CONTACT DEMO</span>
            <span className="placeholder-contact">
              {business.phone} · placeholder
            </span>
            <span className="placeholder-contact">
              {business.email} · placeholder
            </span>
            <EnquiryLink className="text-link" />
            <Button to="/contact" light>
              Share your requirements
            </Button>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{disclaimer}</p>
          <span>
            © {new Date().getFullYear()} {business.name} · Demonstration
            template
          </span>
        </div>
      </div>
    </footer>
  );
}
function FloatingEnquiry() {
  return (
    <Link
      className="floating-enquiry"
      to="/contact"
      aria-label="Preview a demonstration enquiry"
    >
      <MessageSquare size={26} />
    </Link>
  );
}
function Eyebrow({ children }) {
  return (
    <div className="eyebrow">
      <span className="eyebrow-line" />
      {children}
    </div>
  );
}
function SectionHead({
  eyebrow,
  title,
  copy,
  link,
  linkText = "Explore more",
}) {
  return (
    <div className="section-head">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2>{title}</h2>
        {copy && <p>{copy}</p>}
      </div>
      {link && (
        <Link className="text-link" to={link}>
          {linkText}
          <ArrowUpRight size={18} />
        </Link>
      )}
    </div>
  );
}
function ConceptTag() {
  return <span className="concept-tag">Demonstration Listing</span>;
}
function ListingNotice() {
  return (
    <div className="notice">
      <ShieldCheck size={20} />
      <span>
        <strong>Demonstration Listings.</strong> Images, locations and budget
        bands are illustrative. These are not verified properties, prices,
        approvals or availability.
      </span>
    </div>
  );
}
function PropertyCard({ property: p }) {
  return (
    <article className="property-card">
      <Link to={`/properties/${p.id}`} className="property-image">
        <img src={p.image} loading="lazy" alt={p.imageNote} />
        <ConceptTag />
      </Link>
      <div className="property-body">
        <div className="property-location">
          <MapPin size={14} />
          {p.location} · demonstration
        </div>
        <h3>
          <Link to={`/properties/${p.id}`}>{p.name}</Link>
        </h3>
        <p>{p.summary}</p>
        <div className="property-meta">
          <span>{p.type}</span>
          <span>{p.purpose}</span>
          <span>Sample budget: {p.budget}</span>
        </div>
        <div className="property-actions">
          <Link to={`/properties/${p.id}`}>
            View details <ArrowRight size={16} />
          </Link>
          <EnquiryLink property={p} className="property-enquiry">
            Enquire
          </EnquiryLink>
        </div>
      </div>
    </article>
  );
}
function Hero() {
  return (
    <section className="hero">
      <div
        className="hero-photo"
        role="img"
        aria-label="Illustrative contemporary home, not a local property listing"
      />
      <div className="hero-shade" />
      <div className="container hero-content">
        <Eyebrow>HOMES · BUSINESS SPACES · LAND</Eyebrow>
        <h1>
          A place for your plans.
          <br />
          <em>Space for what's next.</em>
        </h1>
        <p>
          Homes, business spaces and land. Explore a fresh approach to your next
          property conversation with Aurevia Estates.
        </p>
        <div className="hero-actions">
          <EnquiryLink>Discuss your requirements</EnquiryLink>
          <Button to="/properties" outline>
            Explore demonstration properties
          </Button>
        </div>
        <div className="hero-bottom">
          <span>HOMES / BUSINESS / LAND</span>
          <span>DEMONSTRATION TEMPLATE · ILLUSTRATIVE IMAGERY</span>
          <ChevronDown size={20} />
        </div>
      </div>
    </section>
  );
}
function CategoryTile({ category: c, index }) {
  return (
    <Link
      className={`special-tile ${index === 0 ? "special-wide" : ""}`}
      to={`/${c.slug}`}
    >
      <img
        src={c.image}
        alt={`Illustrative ${c.short.toLowerCase()} concept`}
        loading="lazy"
      />
      <div className="special-shade" />
      <span className="special-number">0{index + 1} / PROPERTY FOCUS</span>
      <div>
        <h3>{c.name}</h3>
        <p>{c.description}</p>
        <span className="circle-arrow">
          <ArrowUpRight size={20} />
        </span>
      </div>
    </Link>
  );
}
function Home() {
  return (
    <>
      <Hero />
      <div className="intro-strip">
        <div className="container intro-strip-inner">
          <span>YOUR REQUIREMENTS COME FIRST</span>
          <p>A home to live in. A space to work. A plan to build on.</p>
          <ArrowUpRight size={24} />
        </div>
      </div>
      <section className="section philosophy">
        <div className="container philosophy-grid">
          <div className="philosophy-image">
            <img
              src="/images/interior.jpg"
              alt="Illustrative residential interior, not verified inventory"
              loading="lazy"
            />
            <span className="image-index">A THOUGHTFUL START / 01</span>
          </div>
          <div className="philosophy-copy">
            <Eyebrow>MAKE ROOM FOR THE RIGHT QUESTIONS</Eyebrow>
            <h2>
              Your priorities.
              <br />
              <em>Your next move.</em>
            </h2>
            <p>
              What does the right property need to do for you? Begin with your
              location, budget and purpose, then consider the details that
              matter in everyday life.
            </p>
            <p>
              Aurevia Estates is a fictional identity for a thoughtful property
              experience. Explore demonstration homes, business spaces and land
              in imagined neighbourhoods.
            </p>
            <Link className="text-link" to="/about">
              Discover Aurevia <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section specializations">
        <div className="container">
          <SectionHead
            eyebrow="THREE WAYS TO EXPLORE"
            title={
              <>
                Find the space for <em>your ambition.</em>
              </>
            }
            copy="Explore residential, commercial and land concepts. Every example is a starting point for a conversation."
          />
          <div className="special-grid">
            {categories.map((c, index) => (
              <CategoryTile key={c.slug} category={c} index={index} />
            ))}
          </div>
        </div>
      </section>
      <section className="section dark-section">
        <div className="container">
          <SectionHead
            eyebrow="THE CONCEPT COLLECTION"
            title={
              <>
                Picture the possibilities.
                <br />
                <em>Then ask the details.</em>
              </>
            }
            copy="Six demonstration profiles in fictional neighbourhoods. No live inventory or property representation is claimed."
            link="/properties"
            linkText="Explore all six samples"
          />
          <div className="property-grid">
            {[properties[0], properties[3], properties[2]].map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      </section>
      <Advisor />
      <section className="section reasons">
        <div className="container">
          <SectionHead
            eyebrow="A BETTER STARTING POINT"
            title={
              <>
                Clear questions. <em>Considered decisions.</em>
              </>
            }
            copy="A useful checklist for your property conversation, rather than promises about unverified properties."
          />
          <div className="reason-grid">
            {[
              [
                "01",
                "Your location",
                "Compare daily access and the surroundings that matter to you.",
              ],
              [
                "02",
                "Your budget",
                "Think about the total cost, beyond an asking price.",
              ],
              [
                "03",
                "Your purpose",
                "A family home and a business space call for different questions.",
              ],
              [
                "04",
                "The documentation",
                "Verify title, approvals and permitted use independently.",
              ],
              [
                "05",
                "Your next step",
                "Preview your requirements locally, without sending an enquiry.",
              ],
            ].map(([n, t, d]) => (
              <div className="reason" key={n}>
                <span>{n}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
function Advisor() {
  return (
    <section className="section advisor">
      <div className="container advisor-grid">
        <div className="advisor-portrait">
          <div className="profile-monogram">
            <span className="monogram-label">AUREVIA ESTATES</span>
            <span className="monogram-initials" aria-hidden="true">
              {business.initials}
              <i>.</i>
            </span>
            <span className="monogram-location">
              SPACES. POSSIBILITIES. PERSPECTIVE.
            </span>
          </div>
          <div className="portrait-caption">
            {business.name}
            <span>FICTIONAL BRAND · DEMONSTRATION TEMPLATE</span>
          </div>
        </div>
        <div className="advisor-copy">
          <Eyebrow>THE AUREVIA PERSPECTIVE</Eyebrow>
          <h2>
            Property is personal.
            <br />
            <em>Start with what matters.</em>
          </h2>
          <p>
            A home for your everyday life. A workspace for your ambitions. Land
            for a longer view. Explore possibilities through the lens of your
            priorities.
          </p>
          <p>
            This fictional brand demonstrates a considered property experience,
            with clear details, useful filters and an enquiry preview you can
            explore at your own pace.
          </p>
          <Button to="/about">Discover Aurevia</Button>
        </div>
      </div>
    </section>
  );
}
function CtaBand() {
  return (
    <section className="cta-band">
      <div className="container cta-inner">
        <div>
          <Eyebrow>YOUR NEXT MOVE STARTS HERE</Eyebrow>
          <h2>
            Make room for your plans.
            <br />
            <em>Explore your next chapter.</em>
          </h2>
        </div>
        <EnquiryLink>Preview your enquiry</EnquiryLink>
      </div>
    </section>
  );
}
function PageHero({ eyebrow, title, copy, imageUrl }) {
  return (
    <section
      className={`page-hero ${imageUrl ? "page-hero-image" : ""}`}
      style={
        imageUrl
          ? {
              backgroundImage: `linear-gradient(90deg,rgba(16,30,38,.94),rgba(16,30,38,.45)),url(${imageUrl})`,
            }
          : undefined
      }
    >
      <div className="container">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        <p>{copy}</p>
      </div>
    </section>
  );
}
const filterKeys = ["location", "type", "purpose", "budget"];
function Properties({ category }) {
  const [params, setParams] = useSearchParams();
  const filters = Object.fromEntries(
    filterKeys.map((key) => [key, params.get(key) || ""]),
  );
  const filtered = filterProperties(filters, category?.slug);
  const types = category
    ? [
        ...new Set(
          properties
            .filter((p) => p.category === category.slug)
            .map((p) => p.type),
        ),
      ]
    : propertyTypes;
  function update(key, value) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next);
  }
  return (
    <>
      <PageHero
        eyebrow={
          category ? "EXPLORE / " + category.short : "THE CONCEPT COLLECTION"
        }
        title={
          category ? (
            <>
              {category.name}.<br />
              <em>Your plans, in focus.</em>
            </>
          ) : (
            <>
              A space for every plan.
              <br />
              <em>Explore the possibilities.</em>
            </>
          )
        }
        copy={
          category?.description ||
          "Explore six illustrative property profiles. Use the filters to find the samples most relevant to your requirements."
        }
        imageUrl={category?.image || "/images/hero.jpg"}
      />
      <section className="section listings">
        <div className="container">
          <ListingNotice />
          {category && (
            <div className="category-checklist">
              <h2>Before you shortlist</h2>
              <ul className="check-list">
                {category.considerations.map((item) => (
                  <li key={item}>
                    <Check size={18} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="filters">
            <div className="filter-title">
              <Search size={20} /> Find your focus
            </div>
            {[
              ["location", "Location", locations, "All locations"],
              ["type", "Property type", types, "All types"],
              ["purpose", "Purpose", purposes, "All purposes"],
              ["budget", "Sample budget", budgets, "All budgets"],
            ].map(([key, label, options, all]) => (
              <label key={key}>
                {label}
                <span className="select-wrap">
                  <select
                    aria-label={label}
                    value={filters[key]}
                    onChange={(e) => update(key, e.target.value)}
                  >
                    <option value="">{all}</option>
                    {options.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} />
                </span>
              </label>
            ))}
          </div>
          <div className="list-results" aria-live="polite">
            <span>
              {filtered.length} sample{" "}
              {filtered.length === 1 ? "listing" : "listings"}
            </span>
            <button type="button" onClick={() => setParams({})}>
              Clear filters
            </button>
          </div>
          {filtered.length ? (
            <div className="property-grid light-grid">
              {filtered.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No demonstration listings match these filters.</h3>
              <p>
                Clear the filters or explore your requirements in the enquiry
                demo.
              </p>
              <Button to="/contact">Discuss your requirements</Button>
            </div>
          )}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
function PropertyDetail() {
  const { id } = useParams();
  const p = properties.find((x) => x.id === id);
  if (!p) return <NotFound />;
  return (
    <>
      <section className="detail-hero">
        <img src={p.image} alt={p.imageNote} />
        <div className="detail-overlay" />
        <div className="container">
          <Link to="/properties" className="back-link">
            <ChevronLeft size={17} /> All demonstration properties
          </Link>
          <ConceptTag />
          <div className="property-location">
            <MapPin size={16} />
            {p.area}
          </div>
          <h1>{p.name}</h1>
          <p>{p.summary}</p>
        </div>
      </section>
      <section className="section detail-content">
        <div className="container detail-grid">
          <div>
            <Eyebrow>AN ILLUSTRATIVE PROPERTY PROFILE</Eyebrow>
            <h2>
              A closer look at <em>the possibilities.</em>
            </h2>
            <p>{p.story}</p>
            <p className="image-disclosure">{p.imageNote}</p>
            <h3>Questions worth asking</h3>
            <ul className="check-list">
              {p.highlights.map((h) => (
                <li key={h}>
                  <Check size={18} />
                  {h}
                </li>
              ))}
            </ul>
            <ListingNotice />
          </div>
          <aside className="detail-aside">
            <span>DEMONSTRATION PROFILE / NOT VERIFIED</span>
            {[
              ["EXAMPLE LOCATION", p.location],
              ["PROPERTY TYPE", p.type],
              ["PURPOSE", p.purpose],
              ["EXAMPLE BUDGET", p.budget],
              ["PRICE / AVAILABILITY", "Not verified"],
            ].map(([label, value]) => (
              <div key={label}>
                <small>{label}</small>
                <strong>{value}</strong>
              </div>
            ))}
            <EnquiryLink property={p} className="button">
              Preview a property enquiry
            </EnquiryLink>
            <Link className="text-link" to={`/contact?property=${p.id}`}>
              Share my requirements <ArrowUpRight size={16} />
            </Link>
          </aside>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
function About() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT AUREVIA ESTATES"
        title={
          <>
            A considered approach.
            <br />
            <em>A world of possibilities.</em>
          </>
        }
        copy="Discover the idea behind Aurevia Estates: a fictional brand for a thoughtful real estate experience."
      />
      <Advisor />
      <section className="section about-approach">
        <div className="container split-copy">
          <div>
            <Eyebrow>YOUR PRIORITIES, IN FOCUS</Eyebrow>
            <h2>
              Start with clarity.
              <br />
              <em>Explore with care.</em>
            </h2>
          </div>
          <div>
            <p>
              A property conversation begins with what matters to you: your
              preferred surroundings, your budget and how you plan to use a
              space. Explore residential, commercial, plot and land
              demonstration profiles.
            </p>
            <p>
              Aurevia Estates is fictional. Our neighbourhoods, properties and
              contact details are placeholders, with no real team, personal
              biography, credentials or inventory represented. The enquiry demo
              helps you preview your requirements without contacting anyone.
            </p>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
const initial = {
  name: "",
  phone: "",
  location: "",
  budget: "",
  purpose: "",
  message: "",
};

function InquiryForm({ property }) {
  const [values, setValues] = useState({
    ...initial,
    message: property
      ? `I would like to explore the Demonstration Listing "${property.name}" and similar requirements.`
      : "",
  });
  const [errors, setErrors] = useState({});
  const [ready, setReady] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const set = (key, value) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
    setReady(false);
    setCopyStatus("");
  };
  function submit(e) {
    e.preventDefault();
    const err = {};
    if (values.name.trim().length < 2)
      err.name = "Enter your name (at least 2 characters).";
    const digits = values.phone.replace(/\D/g, "");
    if (
      !/^\+?[\d\s()-]+$/.test(values.phone.trim()) ||
      digits.length < 7 ||
      digits.length > 15
    )
      err.phone =
        "Enter a phone number with 7–15 digits; an optional + prefix is allowed.";
    if (!locations.includes(values.location))
      err.location = "Choose your preferred location.";
    if (!budgets.includes(values.budget)) err.budget = "Choose a budget range.";
    if (!purposes.includes(values.purpose)) err.purpose = "Choose a purpose.";
    if (values.message.trim().length < 10)
      err.message = "Tell us a little more (at least 10 characters).";
    setErrors(err);
    if (Object.keys(err).length) {
      document.getElementById(`field-${Object.keys(err)[0]}`)?.focus();
      return;
    }
    setReady(true);
  }
  const message = `${business.name} — Demonstration enquiry\n${property ? `Demonstration Listing: ${property.name} (${property.id})\n` : ""}Name: ${values.name.trim()}\nPhone: ${values.phone.trim()}\nPreferred location: ${values.location}\nBudget preference: ${values.budget}\nPurpose: ${values.purpose}\nMessage: ${values.message.trim()}\nThis is a local preview only. No enquiry has been sent. All property data is illustrative.`;
  async function copyEnquiry() {
    try {
      await navigator.clipboard.writeText(message);
      setCopyStatus("Enquiry copied to your clipboard. Nothing has been sent.");
    } catch {
      document.getElementById("enquiry-preview")?.focus();
      document.getElementById("enquiry-preview")?.select();
      setCopyStatus(
        "Clipboard access is unavailable. Copy the selected preview manually, or download it.",
      );
    }
  }
  return (
    <div className="form-card">
      <div className="form-heading">
        <span>DEMONSTRATION ENQUIRY</span>
        <h2>What do you have in mind?</h2>
        <p>
          Try the form using example details. Preview, copy or download your
          enquiry. Nothing is sent or stored.
        </p>
        {property && (
          <p className="enquiry-context">
            Demonstration Listing: <strong>{property.name}</strong>
          </p>
        )}
      </div>
      <form onSubmit={submit} noValidate>
        <div className="form-row">
          <Field
            name="name"
            label="Your name"
            value={values.name}
            error={errors.name}
            onChange={set}
            placeholder="Example visitor"
          />
          <Field
            name="phone"
            label="Phone number"
            value={values.phone}
            error={errors.phone}
            onChange={set}
            placeholder="Example: +1 202 555 0147"
            type="tel"
          />
        </div>
        <div className="form-row">
          <SelectField
            name="location"
            label="Preferred location"
            options={locations}
            value={values.location}
            error={errors.location}
            onChange={set}
          />
          <SelectField
            name="budget"
            label="Budget preference"
            options={budgets}
            value={values.budget}
            error={errors.budget}
            onChange={set}
          />
        </div>
        <SelectField
          name="purpose"
          label="Purpose"
          options={purposes}
          value={values.purpose}
          error={errors.purpose}
          onChange={set}
        />
        <div className="field">
          <label htmlFor="field-message">
            Your message <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="field-message"
            rows="4"
            required
            maxLength={1500}
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            placeholder="Describe your property requirements."
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "error-message" : undefined}
          />
          {errors.message && (
            <small id="error-message" className="field-error">
              {errors.message}
            </small>
          )}
        </div>
        <button className="button form-submit" type="submit">
          Preview enquiry <ArrowUpRight size={16} />
        </button>
        {ready && (
          <div className="form-success">
            <Check size={19} />
            <div className="preview-content">
              <strong>Your demonstration enquiry is ready.</strong>
              <p role="status">
                Nothing has been sent or stored. This preview stays in your
                browser until you leave the page.
              </p>
              <label htmlFor="enquiry-preview">Enquiry preview</label>
              <textarea
                id="enquiry-preview"
                className="enquiry-preview"
                readOnly
                rows={9}
                value={message}
              />
              <div className="send-options">
                <button type="button" onClick={copyEnquiry}>
                  Copy enquiry
                </button>
                <a
                  download="aurevia-demo-enquiry.txt"
                  href={`data:text/plain;charset=utf-8,${encodeURIComponent(message)}`}
                >
                  Download enquiry
                </a>
              </div>
              {copyStatus && <p role="status">{copyStatus}</p>}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
function Field({
  name,
  label,
  value,
  error,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div className="field">
      <label htmlFor={`field-${name}`}>
        {label} <span aria-hidden="true">*</span>
      </label>
      <input
        id={`field-${name}`}
        type={type}
        required
        maxLength={name === "name" ? 100 : 20}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        autoComplete={name === "name" ? "name" : "tel"}
        aria-invalid={!!error}
        aria-describedby={error ? `error-${name}` : undefined}
      />
      {error && (
        <small id={`error-${name}`} className="field-error">
          {error}
        </small>
      )}
    </div>
  );
}
function SelectField({ name, label, value, error, onChange, options }) {
  return (
    <div className="field">
      <label htmlFor={`field-${name}`}>
        {label} <span aria-hidden="true">*</span>
      </label>
      <span className="select-wrap">
        <select
          id={`field-${name}`}
          required
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? `error-${name}` : undefined}
        >
          <option value="">Select an option</option>
          {options.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
        <ChevronDown size={17} />
      </span>
      {error && (
        <small id={`error-${name}`} className="field-error">
          {error}
        </small>
      )}
    </div>
  );
}
function Contact() {
  const [params] = useSearchParams();
  const property = properties.find((p) => p.id === params.get("property"));
  return (
    <>
      <PageHero
        eyebrow="CONTACT / ENQUIRY DEMO"
        title={
          <>
            Every next chapter begins
            <br />
            with <em>a possibility.</em>
          </>
        }
        copy="Explore a property enquiry in this safe demonstration. Your details are never sent to a person or business."
      />
      <section className="section form-section">
        <div className="container form-layout">
          <div className="form-side">
            <Eyebrow>EXPLORE YOUR REQUIREMENTS</Eyebrow>
            <h2>
              Make room
              <br />
              for <em>your plans.</em>
            </h2>
            <div className="contact-list">
              <div>
                <span>PHONE PLACEHOLDER · NOT CONNECTED</span>
                <strong>{business.phone}</strong>
              </div>
              <div>
                <span>EMAIL PLACEHOLDER · NOT CONNECTED</span>
                <strong>{business.email}</strong>
              </div>
              <div>
                <span>FICTIONAL LOCATION</span>
                <strong>{business.location}</strong>
                <p>
                  All neighbourhoods and property profiles are demonstration
                  data.
                </p>
              </div>
            </div>
            <div className="side-note">
              <span>PREVIEW ONLY</span>
              <p>
                Contact placeholders do not place calls or open messaging apps.
                You can preview, copy or download a sample enquiry without
                sending it.
              </p>
            </div>
          </div>
          <InquiryForm key={property?.id || "general"} property={property} />
        </div>
      </section>
    </>
  );
}
function NotFound() {
  return (
    <section className="not-found">
      <div className="container">
        <Eyebrow>PAGE NOT FOUND</Eyebrow>
        <h1>Let's find your way back.</h1>
        <p>This page or sample property isn't here.</p>
        <Button to="/properties">Explore demonstration properties</Button>
      </div>
    </section>
  );
}
function App() {
  return (
    <BrowserRouter>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <ScrollReset />
      <Header />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
          {categories.map((c) => (
            <Route
              key={c.slug}
              path={`/${c.slug}`}
              element={<Properties category={c} />}
            />
          ))}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <FloatingEnquiry />
    </BrowserRouter>
  );
}
createRoot(document.getElementById("root")).render(<App />);
