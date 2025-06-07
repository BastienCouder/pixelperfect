---
title: "Sécuriser une application Astro avec JWT et OAuth"
category: "sécurité"
readingTime: "6 min"
description: "Découvrez comment implémenter l’authentification basée sur JSON Web Tokens et OAuth dans vos projets Astro."
publishDate: "2025-06-07T02:00:00+02:00"
imageUrl: "https://cdn.sanity.io/images/djtvr81h/production/8dad8f1584c7145921e9f46fda86fab106b92a53-2000x1500.jpg"
author:
  name: "Bastien"
  avatar: "https://cdn.sanity.io/images/djtvr81h/production/f1441d0f64fbfbe8f2107e97fe58162209a469c5-200x207.webp"
---
# Introduction à la sécurité web  
  
La sécurisation des applications est cruciale pour protéger vos utilisateurs et vos données. Dans cet article, nous verrons comment mettre en place une authentification robuste avec JWT et OAuth 2 dans un projet Astro.  
  
## 1. Pourquoi utiliser JWT  
  
- **Stateless** : le serveur n’a pas besoin de stocker la session en base.  
- **Interopérable** : peut être décodé dans n’importe quel langage.  
- **Extensible** : on peut y ajouter des rôles ou des permissions.  
  
## 2. Implémentation du backend  
  
### 2a. Configuration de Sanity Studio  
  
Dans votre schéma Sanity, ajoutez un document `user` avec email et permissions.  
  
```js  
// schema/user.js  
export default {  
name: "user",  
type: "document",  
fields: [  
{ name: "email", type: "string" },  
{ name: "roles", type: "array", of: [{ type: "string" }] },  
],  
};
