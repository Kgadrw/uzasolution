// schemas/newsSection.js

export default {
    name: 'newsSection',
    title: 'Latest News Section',
    type: 'document',
    fields: [
      {
        name: 'sectionTitle',
        title: 'Section Title',
        type: 'string',
        description: 'The title of the news section (e.g., "Latest News")',
        validation: Rule => Rule.required().min(5).max(100),
      },
      {
        name: 'newsArticles',
        title: 'News Articles',
        type: 'array',
        of: [
          {
            type: 'object',
            name: 'newsArticle',
            fields: [
              {
                name: 'title',
                title: 'Article Title',
                type: 'string',
                description: 'Title of the news article',
                validation: Rule => Rule.required().min(5).max(200),
              },
              {
                name: 'description',
                title: 'Article Description',
                type: 'text',
                description: 'Short description of the news article',
                validation: Rule => Rule.required().min(10).max(500),
              },
              {
                name: 'image',
                title: 'Article Image',
                type: 'image',
                options: {
                  hotspot: true, // Enable cropping functionality
                },
                validation: Rule => Rule.required(),
              },
              {
                name: 'link',
                title: 'Article Link',
                type: 'url',
                description: 'URL to the full article',
                validation: Rule => Rule.required().uri(),
              },
            ],
          },
        ],
        validation: Rule => Rule.min(1).max(10), // You can set a maximum number of news articles (e.g., 1 to 10)
      },
    ],
  };
  