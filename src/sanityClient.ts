import { createClient } from "@sanity/client";
import type { ServiceIcon, SiteContent } from "./siteContent";
import { fallbackContent } from "./siteContent";

const projectId =
  import.meta.env.VITE_SANITY_PROJECT_ID ||
  import.meta.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  "";
const dataset =
  import.meta.env.VITE_SANITY_DATASET ||
  import.meta.env.NEXT_PUBLIC_SANITY_DATASET ||
  "production";
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || "2025-05-11";

export const hasSanityConfig = Boolean(projectId && dataset);

export const sanityClient = hasSanityConfig
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published",
    })
  : null;

const contentQuery = `{
  "settings": *[_type == "siteSettings"][0]{
    brandName,
    descriptor,
    tagline,
    facebookUrl,
    phone,
    phoneHref,
    locationLabel,
    stats[]{value, label},
    sections,
    whyPoints
  },
  "hero": *[_type == "hero"][0]{
    headline,
    lede,
    primaryCtaLabel,
    secondaryCtaLabel,
    note,
    mainImage{alt, "image": asset->url},
    sideImage{alt, "image": asset->url}
  },
  "eventTypes": *[_type == "eventType"] | order(order asc, title asc){
    title,
    accent,
    copy
  },
  "services": *[_type == "serviceOffer"] | order(order asc, title asc){
    title,
    icon,
    description,
    image{alt, "image": asset->url}
  },
  "packages": *[_type == "featuredPackage"] | order(order asc, name asc){
    name,
    idealFor,
    includes
  },
  "galleryImages": *[_type == "galleryImage"] | order(order asc, category asc){
    category,
    alt,
    "image": image.asset->url
  }
}`;

type CmsContent = {
  settings?: {
    brandName?: string;
    descriptor?: string;
    tagline?: string;
    facebookUrl?: string;
    phone?: string;
    phoneHref?: string;
    locationLabel?: string;
    stats?: SiteContent["stats"];
    sections?: Partial<SiteContent["sections"]>;
    whyPoints?: string[];
  };
  hero?: Partial<SiteContent["hero"]>;
  eventTypes?: SiteContent["eventTypes"];
  services?: Array<Partial<SiteContent["services"][number]>>;
  packages?: SiteContent["packages"];
  galleryImages?: SiteContent["galleryImages"];
};

function phoneHrefFrom(phone: string) {
  return phone.replace(/[^\d+]/g, "");
}

function withFallbackArray<T>(value: T[] | undefined, fallback: T[]) {
  return value && value.length > 0 ? value : fallback;
}

function normalizeServiceIcon(icon: unknown): ServiceIcon {
  const allowed: ServiceIcon[] = [
    "coffee",
    "cocktail",
    "grazing",
    "cart",
    "perfume",
    "mirror",
    "planner",
  ];

  return allowed.includes(icon as ServiceIcon) ? (icon as ServiceIcon) : "planner";
}

function normalizeContent(cms: CmsContent): SiteContent {
  const settings = cms.settings ?? {};
  const phone = settings.phone || fallbackContent.contact.phone;

  return {
    brand: {
      name: settings.brandName || fallbackContent.brand.name,
      descriptor: settings.descriptor || fallbackContent.brand.descriptor,
      tagline: settings.tagline || fallbackContent.brand.tagline,
    },
    contact: {
      facebookUrl: settings.facebookUrl || fallbackContent.contact.facebookUrl,
      phone,
      phoneHref:
        settings.phoneHref || phoneHrefFrom(phone) || fallbackContent.contact.phoneHref,
      locationLabel: settings.locationLabel || fallbackContent.contact.locationLabel,
    },
    hero: {
      ...fallbackContent.hero,
      ...cms.hero,
      mainImage: cms.hero?.mainImage?.image
        ? cms.hero.mainImage
        : fallbackContent.hero.mainImage,
      sideImage: cms.hero?.sideImage?.image
        ? cms.hero.sideImage
        : fallbackContent.hero.sideImage,
    },
    sections: {
      ...fallbackContent.sections,
      ...(settings.sections ?? {}),
    },
    stats: withFallbackArray(settings.stats, fallbackContent.stats),
    eventTypes: withFallbackArray(cms.eventTypes, fallbackContent.eventTypes),
    services: withFallbackArray(
      cms.services
        ?.filter((service) => service.title && service.description)
        .map((service, index) => ({
          title: service.title || fallbackContent.services[index]?.title || "Service",
          icon: normalizeServiceIcon(service.icon),
          description:
            service.description ||
            fallbackContent.services[index]?.description ||
            "A Celestia event service.",
          image:
            service.image?.image && service.image.alt
              ? service.image
              : fallbackContent.services[index]?.image || fallbackContent.hero.mainImage,
        })),
      fallbackContent.services,
    ),
    packages: withFallbackArray(cms.packages, fallbackContent.packages),
    galleryImages: withFallbackArray(cms.galleryImages, fallbackContent.galleryImages),
    whyPoints: withFallbackArray(settings.whyPoints, fallbackContent.whyPoints),
  };
}

export async function getSiteContent() {
  if (!sanityClient) {
    return fallbackContent;
  }

  try {
    const cmsContent = await sanityClient.fetch<CmsContent>(contentQuery);
    return normalizeContent(cmsContent);
  } catch (error) {
    console.warn("Using fallback Celestia content because Sanity fetch failed.", error);
    return fallbackContent;
  }
}
