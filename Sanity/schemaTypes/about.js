export default {
  name: 'about',
  title: 'About Us',
  type: 'document',
  fields: [
    { name: 'title', title: 'Section Title', type: 'string', initialValue: 'About UZA Solutions' },
    { name: 'aboutText', title: 'About Description', type: 'text' },
    { name: 'overviewTitle', title: 'Overview Title', type: 'string', initialValue: 'Overview' },
    { name: 'overviewText', title: 'Overview Text', type: 'text' },
    { name: 'missionTitle', title: 'Mission Title', type: 'string', initialValue: 'Mission' },
    { name: 'missionText', title: 'Mission Text', type: 'text' },
    { name: 'ctaTitle', title: 'CTA Title', type: 'string', initialValue: 'Join the Movement' },
    { name: 'ctaText', title: 'CTA Description', type: 'text' },
    { name: 'ctaLink', title: 'CTA Link', type: 'url' },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
}
