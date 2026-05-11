import React from "react";
import type { SiteContent } from "./siteContent";
import { fallbackContent } from "./siteContent";
import { getSiteContent, hasSanityConfig } from "./sanityClient";

export function useSiteContent() {
  const [content, setContent] = React.useState<SiteContent>(fallbackContent);
  const [source, setSource] = React.useState<"fallback" | "cms">("fallback");

  React.useEffect(() => {
    let isMounted = true;

    getSiteContent().then((nextContent) => {
      if (!isMounted) {
        return;
      }

      setContent(nextContent);
      setSource(hasSanityConfig ? "cms" : "fallback");
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return { content, source };
}
