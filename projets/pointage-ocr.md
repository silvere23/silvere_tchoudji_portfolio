## Le besoin

Des fiches horaires remplies à la main (nom, prénom, heures d'arrivée et de départ) étaient ressaisies une par une dans Excel. L'objectif était d'automatiser cette saisie.

## Ce que j'ai réalisé

Un logiciel Windows avec une interface graphique (**Tkinter**) qui :

1. lit le PDF scanné et extrait les informations avec **Tesseract OCR** ;
2. affiche un écran de relecture obligatoire, avec les vignettes des fiches, pour corriger les erreurs de lecture ;
3. remplit automatiquement le fichier Excel modèle, avec une feuille par salarié ;
4. prépare la saisie de l'activité journalière dans le logiciel de paie, grâce à **Selenium**.

## Ce que j'en retiens

L'écriture manuscrite reste difficile à lire pour un OCR. L'écran de relecture est donc essentiel : l'outil fait gagner du temps sans jamais valider une donnée à la place d'un humain.
