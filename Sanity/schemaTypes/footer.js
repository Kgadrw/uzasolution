// schemas/footer.js

export default {
    name: 'footer',
    title: 'Footer',
    type: 'document',
    fields: [
      {
        name: 'description',
        title: 'Company Description',
        type: 'text',
        validation: Rule => Rule.required().min(10).max(300),
      },
      {
        name: 'contactEmail',
        title: 'Contact Email',
        type: 'string',
        validation: Rule => Rule.required().email(),
      },
      {
        name: 'contactPhone',
        title: 'Contact Phone',
        type: 'string',
        validation: Rule => Rule.required(),
      },
      {
        name: 'socialLinks',
        title: 'Social Media Links',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'platform',
                title: 'Platform',
                type: 'string',
                validation: Rule => Rule.required(),
                options: {
                  list: ['Twitter', 'LinkedIn', 'TikTok', 'Instagram'],
                },
              },
              {
                name: 'url',
                title: 'Profile URL',
                type: 'url',
                validation: Rule => Rule.required().uri(),
              },
            ],
          },
        ],
        validation: Rule => Rule.required().min(1),
      },
    ],
  };
  