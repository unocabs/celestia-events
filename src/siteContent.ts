export type ServiceIcon =
  | "coffee"
  | "cocktail"
  | "grazing"
  | "cart"
  | "perfume"
  | "mirror"
  | "planner";

export type ImageContent = {
  image: string;
  alt: string;
  category?: string;
};

export type SiteContent = {
  brand: {
    name: string;
    descriptor: string;
    tagline: string;
  };
  contact: {
    facebookUrl: string;
    phone: string;
    phoneHref: string;
    locationLabel: string;
  };
  hero: {
    headline: string;
    lede: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    note: string;
    mainImage: ImageContent;
    sideImage: ImageContent;
  };
  sections: {
    introKicker: string;
    introHeading: string;
    eventsKicker: string;
    eventsHeading: string;
    offersKicker: string;
    offersHeading: string;
    offersIntro: string;
    packagesKicker: string;
    packagesHeading: string;
    galleryKicker: string;
    galleryHeading: string;
    galleryIntro: string;
    whyKicker: string;
    whyHeading: string;
    whyIntro: string;
    inquiryKicker: string;
    inquiryHeading: string;
    inquiryIntro: string;
    footerBackToTop: string;
  };
  stats: Array<{ value: string; label: string }>;
  eventTypes: Array<{
    title: string;
    accent: string;
    copy: string;
  }>;
  services: Array<{
    title: string;
    icon: ServiceIcon;
    description: string;
    image: ImageContent;
  }>;
  packages: Array<{
    name: string;
    idealFor: string;
    includes: string[];
  }>;
  galleryImages: ImageContent[];
  whyPoints: string[];
};

export const fallbackContent: SiteContent = {
  brand: {
    name: "Celestia",
    descriptor: "Events & Celebration",
    tagline: "Celebrating moments that matter.",
  },
  contact: {
    facebookUrl: "https://www.facebook.com/profile.php?id=61560553832328",
    phone: "+63 947 770 3209",
    phoneHref: "+639477703209",
    locationLabel: "Pampanga-based",
  },
  hero: {
    headline: "Celebrating moments that matter",
    lede: "Elegant mobile bars, grazing tables, event stations, and planning support for weddings, birthdays, debuts, corporate events, and private celebrations.",
    primaryCtaLabel: "Message on Facebook",
    secondaryCtaLabel: "Request a Package",
    note: "Curated stations for beautiful gatherings",
    mainImage: {
      image:
        "https://images.unsplash.com/photo-1514066558159-fc8c737ef259?auto=format&fit=crop&w=1200&q=80",
      alt: "Styled coffee service for a celebration",
      category: "Coffee Bar",
    },
    sideImage: {
      image:
        "https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?auto=format&fit=crop&w=1200&q=80",
      alt: "Elegant grazing table for an event",
      category: "Grazing Table",
    },
  },
  sections: {
    introKicker: "Celestia Events & Celebration",
    introHeading: "Make every guest feel thought of.",
    eventsKicker: "Events",
    eventsHeading: "Designed for celebrations big, intimate, and in between.",
    offersKicker: "Offers",
    offersHeading: "Event stations with polished service and photo-ready details.",
    offersIntro: "Mix and match Celestia stations to fit your venue, guest count, theme, and celebration style.",
    packagesKicker: "Featured Packages",
    packagesHeading: "Starter ideas for your next celebration.",
    galleryKicker: "Gallery",
    galleryHeading: "A warm, modern look for event moments.",
    galleryIntro: "Replace these launch-ready visuals with Celestia Facebook or event photos as soon as the final gallery assets are available.",
    whyKicker: "Why Celestia",
    whyHeading: "Everything feels intentional, from the first sip to the final photo.",
    whyIntro: "Celestia brings celebration-ready stations to Pampanga events, with flexible packages that can support intimate gatherings, full program celebrations, and branded occasions.",
    inquiryKicker: "Inquiry",
    inquiryHeading: "Tell Celestia about your celebration.",
    inquiryIntro: "Share a few details and the site will prepare a message you can send right away. For fastest replies, message Celestia on Facebook.",
    footerBackToTop: "Back to top",
  },
  stats: [
    { value: "1K+", label: "Facebook followers" },
    { value: "7", label: "Event offers" },
    { value: "PH", label: "Pampanga celebrations" },
  ],
  eventTypes: [
    {
      title: "Weddings",
      accent: "01",
      copy: "Elegant reception add-ons, cocktail service, coffee bars, and guest experiences that feel polished from arrival to send-off.",
    },
    {
      title: "Birthdays",
      accent: "02",
      copy: "Stylish stations for milestone birthdays, kids' parties, and intimate family celebrations.",
    },
    {
      title: "Debuts",
      accent: "03",
      copy: "Photo-ready details, grazing spreads, and interactive stations made for a memorable eighteenth birthday.",
    },
    {
      title: "Corporate Events",
      accent: "04",
      copy: "Coffee, cocktails, carts, and branded service moments for launches, office gatherings, and client hosting.",
    },
    {
      title: "Private Parties",
      accent: "05",
      copy: "Flexible event support for anniversaries, showers, reunions, and at-home celebrations.",
    },
  ],
  services: [
    {
      title: "Coffee Bar",
      icon: "coffee",
      description: "A warm, cafe-inspired station for guests who love handcrafted coffee and cozy celebration moments.",
      image: {
        image:
          "https://images.unsplash.com/photo-1514066558159-fc8c737ef259?auto=format&fit=crop&w=1200&q=80",
        alt: "Coffee being served at an elegant event station",
        category: "Coffee Bar",
      },
    },
    {
      title: "Cocktail Bar",
      icon: "cocktail",
      description: "A polished drink station for receptions, birthdays, debuts, and evening celebrations.",
      image: {
        image:
          "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80",
        alt: "Cocktail drinks prepared for a celebration",
        category: "Cocktail Bar",
      },
    },
    {
      title: "Grazing Table",
      icon: "grazing",
      description: "A generous spread styled for snacking, mingling, and beautiful event photos.",
      image: {
        image:
          "https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?auto=format&fit=crop&w=1200&q=80",
        alt: "Grazing table with cheese, fruit, and small bites",
        category: "Grazing Table",
      },
    },
    {
      title: "Food Carts",
      icon: "cart",
      description: "Fun, flexible carts that add movement, flavor, and an interactive feel to your event.",
      image: {
        image:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
        alt: "Styled food service for an event",
        category: "Food Carts",
      },
    },
    {
      title: "Perfume Bar",
      icon: "perfume",
      description: "A memorable scent experience guests can enjoy during the event and remember after.",
      image: {
        image:
          "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80",
        alt: "Perfume bottles arranged beautifully",
        category: "Perfume Bar",
      },
    },
    {
      title: "Selfie Mirror",
      icon: "mirror",
      description: "A guest-favorite photo moment that keeps the celebration lively and shareable.",
      image: {
        image:
          "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
        alt: "Guests enjoying a wedding photo moment",
        category: "Selfie Mirror",
      },
    },
    {
      title: "Event Planning",
      icon: "planner",
      description: "Thoughtful coordination support to help the details feel smooth, cohesive, and guest-ready.",
      image: {
        image:
          "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
        alt: "Elegant event table styling for a celebration",
        category: "Event Planning",
      },
    },
  ],
  packages: [
    {
      name: "Coffee & Grazing",
      idealFor: "Ideal for morning weddings, birthdays, showers, and intimate gatherings",
      includes: ["Coffee Bar", "Grazing Table", "Styled service setup", "Guest flow support"],
    },
    {
      name: "Cocktail Celebration",
      idealFor: "Ideal for receptions, debuts, corporate mixers, and evening parties",
      includes: ["Cocktail Bar", "Food Cart add-on option", "Bar styling", "Service team"],
    },
    {
      name: "Full Event Experience",
      idealFor: "Ideal for celebrations that need multiple interactive stations",
      includes: ["Coffee or Cocktail Bar", "Grazing Table", "Perfume Bar", "Selfie Mirror"],
    },
  ],
  galleryImages: [
    {
      image:
        "https://images.unsplash.com/photo-1514066558159-fc8c737ef259?auto=format&fit=crop&w=1200&q=80",
      alt: "Coffee being served at an elegant event station",
      category: "Coffee Bar",
    },
    {
      image:
        "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80",
      alt: "Cocktail drinks prepared for a celebration",
      category: "Cocktail Bar",
    },
    {
      image:
        "https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?auto=format&fit=crop&w=1200&q=80",
      alt: "Grazing table with cheese, fruit, and small bites",
      category: "Grazing Table",
    },
    {
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
      alt: "Styled food service for an event",
      category: "Food Carts",
    },
    {
      image:
        "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80",
      alt: "Perfume bottles arranged beautifully",
      category: "Perfume Bar",
    },
    {
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
      alt: "Guests enjoying a wedding photo moment",
      category: "Selfie Mirror",
    },
    {
      image:
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
      alt: "Elegant event table styling for a celebration",
      category: "Event Planning",
    },
  ],
  whyPoints: [
    "Pampanga-based service for local events and nearby venues",
    "Food, drink, scent, and photo experiences in one event partner",
    "Flexible bundles shaped around guest count and event type",
    "Presentation-first details that elevate your celebration styling",
  ],
};
