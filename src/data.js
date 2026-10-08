// Fictional template identity. Placeholder details are display-only.
// No calls, external message delivery or enquiry storage are enabled.
export const business = {
  name: "Aurevia Estates",
  initials: "AE",
  location: "Willow District · fictional location",
  phone: "+1 (202) 555-0147",
  email: "hello@aurevia.example",
  website: "aurevia.example",
};
export const disclaimer =
  "Aurevia Estates is a fictional brand in a reusable website template. Every property, location, image and budget is demonstration data, not verified inventory. No ownership, representation, approvals, pricing or availability are claimed. Contact details are placeholders. Enquiries are previewed locally and are never sent or stored by this template.";
export const enquiryPath = (property) =>
  property
    ? `/contact?${new URLSearchParams({ property: property.id })}`
    : "/contact";
export const locations = ["Willow District", "Harbor Quarter", "Meadow Valley"];
export const budgets = [
  "Under ₹50 lakh",
  "₹50 lakh–₹1 Cr",
  "₹1–2 Cr",
  "₹2 Cr+",
];
export const purposes = ["Self Use", "Business Use", "Investment"];
export const categories = [
  {
    slug: "residential",
    name: "Residential Properties",
    short: "Residential",
    image: "/images/property1.jpg",
    description:
      "From an apartment to an independent home, explore the space that fits your everyday life.",
    considerations: [
      "Layout, natural light and everyday comfort",
      "Access to schools, work and essential services",
      "Title, approvals and total ownership costs",
    ],
  },
  {
    slug: "commercial",
    name: "Commercial Properties",
    short: "Commercial",
    image: "/images/property2.jpg",
    description:
      "Explore shop and workspace concepts with your business needs, access and practical costs in mind.",
    considerations: [
      "Permitted use and local approvals",
      "Access, visibility and parking requirements",
      "Fit-out, maintenance and total occupancy costs",
    ],
  },
  {
    slug: "plots-land",
    name: "Plots & Land",
    short: "Plots & Land",
    image: "/images/land-concept.svg",
    description:
      "A starting point for plot and land conversations, with careful attention to use, access and documentation.",
    considerations: [
      "Title, boundaries and independent legal checks",
      "Land-use permissions and development restrictions",
      "Road access, utilities and long-term suitability",
    ],
  },
];
export const properties = [
  {
    id: "willow-apartment",
    name: "The Willow Apartment",
    location: "Willow District",
    area: "Willow area · fictional example",
    category: "residential",
    type: "Apartment",
    purpose: "Self Use",
    budget: "Under ₹50 lakh",
    image: "/images/property1.jpg",
    imageNote:
      "Illustrative interior photograph; not a photograph of a Willow listing.",
    summary:
      "An apartment concept for a simpler everyday routine, with light-filled living spaces.",
    highlights: [
      "Consider layout and usable space",
      "Check essential services and access",
      "Verify title and building approvals",
    ],
    story:
      "An illustrative apartment profile for a conversation about your preferred layout, location and budget. The photograph and example budget are not evidence of an actual property or asking price.",
  },
  {
    id: "harbor-independent-house",
    name: "The Courtyard House",
    location: "Harbor Quarter",
    area: "Harbor Quarter · fictional example",
    category: "residential",
    type: "Independent House",
    purpose: "Self Use",
    budget: "₹50 lakh–₹1 Cr",
    image: "/images/property5.jpg",
    imageNote:
      "Illustrative house photograph; not a photograph of a Harbor Quarter listing.",
    summary:
      "An independent-home concept for buyers who value personal space and flexibility.",
    highlights: [
      "Discuss family space and future needs",
      "Review maintenance and ownership costs",
      "Verify construction permissions and title",
    ],
    story:
      "A sample independent-house profile to explore space, privacy and the responsibilities of ownership. Design, setting and budget are illustrative; no address, size or availability is verified.",
  },
  {
    id: "willow-residential-plot",
    name: "The Neighbourhood Plot",
    location: "Willow District",
    area: "Willow outskirts · fictional example",
    category: "plots-land",
    type: "Residential Plot",
    purpose: "Self Use",
    budget: "Under ₹50 lakh",
    image: "/images/plot-concept.svg",
    imageNote:
      "Concept parcel illustration; not a site map, survey or actual plot.",
    summary:
      "A residential plot concept for those thinking about building a home of their own.",
    highlights: [
      "Confirm boundaries with an independent survey",
      "Check permitted residential use",
      "Verify road access and utility connections",
    ],
    story:
      "An illustrative plot profile for discussing future building plans. The parcel artwork is a design concept, not a survey, site plan or claim of residential-use approval.",
  },
  {
    id: "meadow-commercial-shop",
    name: "The High Street Shop",
    location: "Meadow Valley",
    area: "Meadow Valley · fictional example",
    category: "commercial",
    type: "Commercial Shop",
    purpose: "Business Use",
    budget: "₹50 lakh–₹1 Cr",
    image: "/images/property4.jpg",
    imageNote:
      "Illustrative interior inspiration; not a photograph of a Meadow Valley shop.",
    summary:
      "A shop concept to start a conversation about visibility, access and business fit.",
    highlights: [
      "Review footfall through on-site research",
      "Check permitted business activity",
      "Compare fit-out and recurring costs",
    ],
    story:
      "A sample commercial-shop profile for evaluating a business location. The interior photograph is visual inspiration only; footfall, commercial permissions and rental or sale terms have not been verified.",
  },
  {
    id: "harbor-workspace",
    name: "The Open Workspace",
    location: "Harbor Quarter",
    area: "Harbor Quarter · fictional example",
    category: "commercial",
    type: "Commercial Space",
    purpose: "Business Use",
    budget: "₹1–2 Cr",
    image: "/images/property2.jpg",
    imageNote:
      "Illustrative architectural interior; not a photograph of a Harbor Quarter workspace.",
    summary:
      "A flexible commercial-space concept shaped around how your business works.",
    highlights: [
      "Discuss space planning and accessibility",
      "Verify commercial-use permissions",
      "Review fit-out, parking and operating costs",
    ],
    story:
      "An illustrative workspace profile for conversations about team needs and practical access. This photograph does not establish the existence, commercial use or availability of any local property.",
  },
  {
    id: "meadow-investment-land",
    name: "The Open Land Concept",
    location: "Meadow Valley",
    area: "Meadow Valley surroundings · fictional example",
    category: "plots-land",
    type: "Investment Land",
    purpose: "Investment",
    budget: "₹2 Cr+",
    image: "/images/land-concept.svg",
    imageNote:
      "Concept landscape illustration; not a photograph, survey or verified parcel.",
    summary:
      "A land concept for patient planning, careful due diligence and realistic expectations.",
    highlights: [
      "Check title and land-use classification",
      "Assess access and holding costs",
      "Seek independent legal and financial advice",
    ],
    story:
      "A sample land profile illustrating the questions to ask before evaluating a land purchase. No development approval, future appreciation, ownership or return is represented or promised.",
  },
];
export const propertyTypes = [...new Set(properties.map((p) => p.type))];
export const filterProperties = (filters = {}, category) =>
  properties.filter(
    (p) =>
      (!category || p.category === category) &&
      ["location", "type", "purpose", "budget"].every(
        (key) => !filters[key] || p[key] === filters[key],
      ),
  );
