# Typage de données externes en TypeScript - Retour d’expériences

> Talk #2 donné au meetup [Paris Typescript #19 du mardi 4 juin 2019](https://www.meetup.com/fr-FR/Paris-Typescript/events/261321814/)

- Durée : 20 min
- Description : L’interfaçage d’un client TypeScript avec des données externes une API externe (REST, GraphQL...) est une problématique courante où l’on se pose la question de typer son contrat c’est-à-dire de définir les types TypeScript des entrées/sorties de l’API. Pourtant, la littérature n’est pas prolixe en la matière. Nous verrons différentes approches, pour la plupart issues de mes expériences, chacune présentant des avantages et inconvénients. L’objectif de cette présentation n’est pas d’être exhaustif. Il s’agit de fournir différentes options afin de choisir la plus appropriée à ses besoins en fonction du contexte.

## Fichiers

- `code/` : portion de codes dans les slides ou les démos
- `runtime-types/` : copie du projet StackBlitz
- `samples/` : samples issus de vrais appels au serveur
- `swagger-gen-results/` : résultats de la génération de code TypeScript (model + api) avec Swagger CodeGen
- `notes.md` : notes préparatoires et informations complémentaires
- `slides.md` : source au format markdown de l'extension [vscode-reveal](https://marketplace.visualstudio.com/items?itemName=evilz.vscode-reveal).
- `slides.pdf` : impression des slides, sans les notes _speaker_, mais avec les liens hypertextes fonctionnels.
