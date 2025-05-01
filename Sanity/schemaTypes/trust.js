// schemas/trustedCompanies.js

export default {
    name: 'trustedCompanies',
    title: 'Trusted Companies',
    type: 'document',
    fields: [
      {
        name: 'sectionTitle',
        title: 'Section Title',
        type: 'string',
        description: 'Title for the "Our Trusted Partners" section',
        validation: Rule => Rule.required().min(5).max(100),
      },
      {
        name: 'companies',
        title: 'Trusted Companies',
        type: 'array',
        of: [
          {
            type: 'object',
            name: 'company',
            fields: [
              {
                name: 'logo',
                title: 'Logo',
                type: 'image',
                options: {
                  hotspot: true, // Enable cropping functionality
                },
                validation: Rule => Rule.required(),
              },
              {
                name: 'altText',
                title: 'Logo Alt Text',
                type: 'string',
                description: 'Alt text for the logo image',
                validation: Rule => Rule.required().min(2).max(100),
              },
            ],
          },
        ],
        validation: Rule => Rule.min(1).max(10), // To limit the number of logos to a range (e.g., 1 to 10)
      },
      {
        name: 'isVisible',
        title: 'Visibility Status',
        type: 'boolean',
        description: 'Controls if the logos should be animated (if more than 6 logos)',
        initialValue: false,
      },
    ],
  };
  