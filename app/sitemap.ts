import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.wowshotzstudio.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1,
      changeFrequency: "weekly",
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: "monthly",
    },
    
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      priority: 0.9,
      changeFrequency: "weekly",
    },
   {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      url: `${baseUrl}/films`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      url: `${baseUrl}/details`,
      lastModified: new Date(),
      priority: 0.7,
      changeFrequency: "monthly",
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: "monthly",
    },
  ];
}