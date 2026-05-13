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

function hasText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function withFallbackText(value: unknown, fallback: string) {
  return hasText(value) ? value.trim() : fallback;
}

function withFallbackArray<T>(value: T[] | undefined, fallback: T[]) {
  return value && value.length > 0 ? value : fallback;
}

function withFallbackStringArray(value: string[] | undefined, fallback: string[]) {
  const cleaned = value?.filter(hasText).map((item) => item.trim()) ?? [];
  return cleaned.length > 0 ? cleaned : fallback;
}

function withFallbackImage(
  value: Partial<SiteContent["hero"]["mainImage"]> | undefined,
  fallback: SiteContent["hero"]["mainImage"],
) {
  if (!hasText(value?.image)) {
    return fallback;
  }

  return {
    image: value.image,
    alt: withFallbackText(value.alt, fallback.alt),
    category: withFallbackText(value.category, fallback.category ?? ""),
  };
}

function withFallbackSections(
  value: Partial<SiteContent["sections"]> | undefined,
  fallback: SiteContent["sections"],
) {
  return Object.fromEntries(
    Object.entries(fallback).map(([key, fallbackValue]) => [
      key,
      withFallbackText(value?.[key as keyof SiteContent["sections"]], fallbackValue),
    ]),
  ) as SiteContent["sections"];
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
  const phone = withFallbackText(settings.phone, fallbackContent.contact.phone);
  const hero = cms.hero ?? {};
  const stats =
    settings.stats
      ?.filter((stat) => hasText(stat.value) && hasText(stat.label))
      .map((stat) => ({
        value: stat.value.trim(),
        label: stat.label.trim(),
      })) ?? [];
  const eventTypes =
    cms.eventTypes
      ?.filter((event) => hasText(event.title) || hasText(event.copy))
      .map((event, index) => {
        const fallback = fallbackContent.eventTypes[index] ?? fallbackContent.eventTypes[0];
        return {
          title: withFallbackText(event.title, fallback.title),
          accent: withFallbackText(event.accent, fallback.accent),
          copy: withFallbackText(event.copy, fallback.copy),
        };
      }) ?? [];
  const services =
    cms.services
      ?.filter((service) => hasText(service.title) || hasText(service.description))
      .map((service, index) => {
        const fallback = fallbackContent.services[index] ?? fallbackContent.services[0];
        return {
          title: withFallbackText(service.title, fallback.title),
          icon: normalizeServiceIcon(service.icon || fallback.icon),
          description: withFallbackText(service.description, fallback.description),
          image: withFallbackImage(service.image, fallback.image),
        };
      }) ?? [];
  const packages =
    cms.packages
      ?.filter((item) => hasText(item.name) || hasText(item.idealFor))
      .map((item, index) => {
        const fallback = fallbackContent.packages[index] ?? fallbackContent.packages[0];
        return {
          name: withFallbackText(item.name, fallback.name),
          idealFor: withFallbackText(item.idealFor, fallback.idealFor),
          includes: withFallbackStringArray(item.includes, fallback.includes),
        };
      }) ?? [];
  const galleryImages =
    cms.galleryImages
      ?.filter((image) => hasText(image.image) || hasText(image.alt) || hasText(image.category))
      .map((image, index) => {
        const fallback = fallbackContent.galleryImages[index] ?? fallbackContent.galleryImages[0];
        return {
          image: withFallbackText(image.image, fallback.image),
          alt: withFallbackText(image.alt, fallback.alt),
          category: withFallbackText(image.category, fallback.category ?? ""),
        };
      }) ?? [];

  return {
    brand: {
      name: withFallbackText(settings.brandName, fallbackContent.brand.name),
      descriptor: withFallbackText(settings.descriptor, fallbackContent.brand.descriptor),
      tagline: withFallbackText(settings.tagline, fallbackContent.brand.tagline),
    },
    contact: {
      facebookUrl: withFallbackText(
        settings.facebookUrl,
        fallbackContent.contact.facebookUrl,
      ),
      phone,
      phoneHref:
        withFallbackText(settings.phoneHref, phoneHrefFrom(phone)) ||
        fallbackContent.contact.phoneHref,
      locationLabel: withFallbackText(
        settings.locationLabel,
        fallbackContent.contact.locationLabel,
      ),
    },
    hero: {
      headline: withFallbackText(hero.headline, fallbackContent.hero.headline),
      lede: withFallbackText(hero.lede, fallbackContent.hero.lede),
      primaryCtaLabel: withFallbackText(
        hero.primaryCtaLabel,
        fallbackContent.hero.primaryCtaLabel,
      ),
      secondaryCtaLabel: withFallbackText(
        hero.secondaryCtaLabel,
        fallbackContent.hero.secondaryCtaLabel,
      ),
      note: withFallbackText(hero.note, fallbackContent.hero.note),
      mainImage: withFallbackImage(hero.mainImage, fallbackContent.hero.mainImage),
      sideImage: withFallbackImage(hero.sideImage, fallbackContent.hero.sideImage),
    },
    sections: withFallbackSections(settings.sections, fallbackContent.sections),
    stats: withFallbackArray(stats, fallbackContent.stats),
    eventTypes: withFallbackArray(eventTypes, fallbackContent.eventTypes),
    services: withFallbackArray(services, fallbackContent.services),
    packages: withFallbackArray(packages, fallbackContent.packages),
    galleryImages: withFallbackArray(galleryImages, fallbackContent.galleryImages),
    whyPoints: withFallbackStringArray(settings.whyPoints, fallbackContent.whyPoints),
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
