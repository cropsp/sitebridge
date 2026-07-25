import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  
  return rss({
    title: 'ТВІЙ-САЙТ',
    description: 'Honest gift guides for men. EDC gear, funny gifts, and handcrafted leather.',
    site: context.site,
    items: posts
      .sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf())
      .map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.publishDate,
        link: `/blog/${post.id.replace(/\.mdx?$/, '')}/`,
        customData: post.data.tags?.map((t) => `<category>${t}</category>`).join('') ?? '',
      })),
    customData: `<language>en-us</language>`,
  });
}
