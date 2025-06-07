---
title: "Tests end-to-end avec Playwright dans un projet Astro"
category: "testing"
readingTime: "5 min"
description: "Apprenez à configurer et écrire des tests E2E avec Playwright pour assurer la qualité de votre site Astro."
publishDate: "2025-06-07T02:00:00+02:00"
imageUrl: "https://cdn.sanity.io/images/djtvr81h/production/8dad8f1584c7145921e9f46fda86fab106b92a53-2000x1500.jpg"
author:
  name: "Bastien"
  avatar: "https://cdn.sanity.io/images/djtvr81h/production/f1441d0f64fbfbe8f2107e97fe58162209a469c5-200x207.webp"
---
# Pourquoi les tests E2E  
  
Les tests end-to-end garantissent que toutes les parties de votre application fonctionnent ensemble, du chargement de la page à l’interaction utilisateur.  
  
## 1. Installation de Playwright  
  
```bash  
npm install --save-dev @playwright/test  
npx playwright install
