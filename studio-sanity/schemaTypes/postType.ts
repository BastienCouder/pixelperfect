import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{type: 'block'}],
    }),

    defineField({
        name: "description",
        title: "Description",
        type: "text",
        validation: (rule) => rule.required(),
      }),
  
      defineField({
        name: "publishDate",
        title: "Date de publication",
        type: "date",
        options: {
          dateFormat: "YYYY-MM-DD",
        },
        initialValue: () => new Date().toISOString().split("T")[0],
        validation: (rule) => rule.required(),
      }),
  
      defineField({
        name: "updatedDate",
        title: "Date de mise à jour (optionnelle)",
        type: "date",
        options: {
          dateFormat: "YYYY-MM-DD",
        },
      }),
      defineField({
        name: "author",
        title: "Auteur",
        type: "object",
        fields: [
          defineField({
            name: "name",
            title: "Nom de l'auteur",
            type: "string",
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: "avatar",
            title: "Avatar de l'auteur (optionnel)",
            type: "image",
            options: {
              hotspot: true,
            }
          }),
        ],
        validation: (rule) => rule.required(),
      }),
  
      defineField({
        name: "category",
        title: "Catégorie",
        type: "string",
        validation: (rule) => rule.required(),
      }),

      defineField({
        name: "readingTime",
        title: "Temps de lecture (ex. « 5 min »)",
        type: "string",
        validation: (rule) => rule.required(),
      }),
  
      defineField({
        name: "headings",
        title: "Titres (headings)",
        type: "array",
        of: [
          {
            type: "object",
            fields: [
              defineField({
                name: "depth",
                title: "Niveau de titre (h2=2, h3=3, …)",
                type: "number",
                validation: (rule) => rule.required(),
              }),
              defineField({
                name: "slug",
                title: "Slug du titre (ancre)",
                type: "string",
                validation: (rule) => rule.required(),
              }),
              defineField({
                name: "text",
                title: "Texte du titre",
                type: "string",
                validation: (rule) => rule.required(),
              }),
            ],
          },
        ],
        validation: (rule) => rule.required().min(1),
      }),


    
  ],
})