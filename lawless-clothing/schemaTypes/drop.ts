import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'drop',
  title: 'Limited Drop',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Drop Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'releaseDate',
      title: 'Release Date & Time',
      type: 'datetime',
      description: 'Used for countdown timers and release scheduling.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
