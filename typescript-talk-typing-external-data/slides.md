---
title: "REX TS • Typage Données Externes"
theme: white
customTheme : "white-custom"
slideNumber: true
separator: ^---$
verticalSeparator: ^--$
---

## Typage de données externes

### _Retour d’expériences_

<!--
Talk #2 donné au meetup Paris Typescript #19 du mardi 4 juin 2019
https://www.meetup.com/fr-FR/Paris-Typescript/events/261321814/

Durée : 20 min

Description :

L’interfaçage d’un client TypeScript avec des données externes une API externe (REST, GraphQL...) est une problématique courante où l’on se pose la question de typer son contrat c’est-à-dire de définir les types TypeScript des entrées/sorties de l’API. Pourtant, la littérature n’est pas prolixe en la matière. Nous verrons différentes approches, pour la plupart issues de mes expériences, chacune présentant des avantages et inconvénients. L’objectif de cette présentation n’est pas d’être exhaustif. Il s’agit de fournir différentes options afin de choisir la plus appropriée à ses besoins en fonction du contexte.
-->

---

### About me

Romain Deneau - [@DeneauRomain](https://twitter.com/DeneauRomain)

Senior Developer | .NET, Angular, 😍 TypeScript

_Animateur communauté Craft_

<img src="soat.png" class="plain">

---

## Contexte

- Données externes, non TypeScript :
  - Objets JSON en E/S d’une Web API
- Librairie d’infrastructure
  - S’interface avec l’API
  - `httpClient` Angular, `$ajax` jQuery
- Types à spécifier à l’usage
  - `httpClient.get<SomeDto>(url, args)`

---

## Contexte (2)

- Essais successifs sur différents projets
- Différentes stratégies utilisées pour le typage :
  - Typage côté API / côté client
  - Typage manuel / généré
  - Génération manuelle / automatisée

---

## Typage généré côté API

- Différents outils de génération C# → TS
  - [TypeLITE](http://type.litesolutions.net/)
  - [TypeWriter](http://frhagn.github.io/Typewriter/)

--

### Typage généré avec TypeLITE

- http://type.litesolutions.net/
- Installation
  - NuGet dans projet C#
  - Ajout d’un fichier `TypeLite.tt` *(template T4)*
- Étapes de génération
  - Compilation de la solution .NET
  - Lancement du template T4 *(design-time)* <br>
    → Génération `TypeLite.d.ts`

Note:

- A l'époque, on n'avait pas envisagé ou pas réussi à lancer la transformation des templates 4 au build.
- C'est possible en éditant le csproj : https://docs.microsoft.com/en-us/visualstudio/modeling/code-generation-in-a-build-process?view=vs-2019

--

#### TypeLITE : Bilan

- ✔️ Typage complet (facades et dépendances) et correcte
- 🍌 Reprise des namespaces C#
  - ️️✔️ Pas de conflit de noms
  - ❌ Longs → pas idiomatique TS/ES6
- ❌ Génération manuelle
- ❌ IDE compatible Template T4 (autre que VS)
- ❌ Tous les types TS dans un seul fichier

--

### Typage généré avec TypeWriter

- http://frhagn.github.io/Typewriter/
- Installation :
  - Extension de Visual Studio
- Génération :
  - Écriture d’un `Models.tst` (TypeScript Template)
  - Compilation
    → Génération du/des fichiers TS

--

#### TypeWriter : Bilan

- ✔️ Lancé à la compilation
  - ❌ Uniquement dans Visual Studio
- ✔️ Totalement **configurable**
  - ✔️ Un fichier par type - Modules ES6
  - 😅 Dépendance entre 2 types → `import` ES6
  - 😅 Génériques : `Result<T> = { data: T[] }`
- ⚠️ Contrat d’API → *Data Transfer Objects* (DTO)
  - ✔️ Objets littéraux + Interfaces TypeScript
  - ❌ Instances de classes ES6

--

### Autres générateurs côté API

- [NSwag](http://nswag.org/): Swagger/OpenAPI toolchain for .NET, ASP.NET Core and TypeScript
- [ToTypeScriptD](https://github.com/ToTypeScriptD/ToTypeScriptD): Generate TypeScript Definition files (`*.d.ts`) from .NET assembly files.
- [TypeScripter](http://cjlpowers.github.io/TypeScripter/): class library for generating TypeScript definition files from .NET assemblies and types.
- *Sûrement plein d’autres...*

---

### Typage généré côté API - Bilan

- ✔️ Typage complet, correcte, up-to-date
- ⚠️ Outils tiers et spécifiques C# → TS
- ❌ Chaîne de build (API-SPA) + compliquée
- ❌ Marche mieux voire qu’avec Visual Studio
- 🍌 *Producer driven*
  - ️️✔️ Typage au plus près de la source
  - ❌ ~~_Producer concern_~~ → _Consumer concern_

---

## Typage côté client

- ☝️ **Conditions**
  - Disposer du contrat de l’API
  - Différents formats possibles
    - OpenAPI Spec, WSDL...
    - HTML, Wiki, Word...
- 👀 **Exemple** _(utilisé par la suite)_
  - [API REST *Pet Store* avec Swagger UI](https://petstore.swagger.io/)

Note:

- **WSDL** « Whiz-Deul » = Web Services Description Language
- **Pet Store** : montrer le `addPet` prenant un `Pet` en entrée, onglet **Model** (à droite de *Example Value*)

---

### Typage entièrement manuel

> 🔖 `POST /pet` : _add a pet to the store_

- Écriture manuelle des 3 types :
  - `Pet` et ses 2 types imbriqués `Category` et `Tag`
  - ~~Démo~~

---

### Typage entièrement manuel : Bilan

- ❌ Fastidieux 😓
- ❌ Trop sujet à erreur : typos...
- ️️✔️ Ouvert à tout format du contrat
- ️️✔️ Personnalisation des types
  - Ignorer un champ inutilisé...
- ⚠️ Changement de version de l’API

Note:

- ❌ Fastidieux 😓
  - Pour toutes les méthodes utilisées
  - Sans doublonner les types

---

### Typage semi-manuel "outillé"

> 💡 Utiliser un **convertisseur <br> JSON → TypeScript**

- Extension VS code : [JSON to TS](https://marketplace.visualstudio.com/items?itemName=MariusAlchimavicius.json-to-ts)
  - *"Convert from clipboard"* (`Ctrl + Alt + V`)
- En ligne : [JSON 2 TS](http://www.json2ts.com/)
  - 👀 [Démo](https://petstore.swagger.io/#/pet/addPet)

---

### Typage semi-manuel "outillé" : Bilan

- ️️✔️ Types générés = complets, correctes
- 🍌 Ajustements nécessaires
  - Renommer `RootObject` → `Pet`
  - Enlever le `namespace`
  - Indiquer les champs `enum` (`status`)
- ❌ Besoin d’exemples **JSON**
  - 💡 API REST → Swagger / capture résultats
- ❌ 2 actions manuelles : *Copy, Convert*

---

## Typage par samples ❤️

- Typage semi-manuel avec **inférénce**
  - JSON = *object literal (array)* = type implicite
  - Copie dans variable : `const sample = ~JSON` <br>
    → Type inféré par le compilateur TypeScript
- Capture du type avec [_type query_](https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#3.8.10) `typeof sample`

> 👀 [Démo `PetSample`][demo-0-pet-sample]

[demo-0-pet-sample]: https://www.typescriptlang.org/play/index.html#src=%2F%2F%20JSON%20stock%C3%A9%20dans%20une%20variable%20%22sample%22%0D%0A%2F%2F%20%E2%86%92%20IntelliSense%20%60petSample%60%0D%0Aconst%20petSample%20%3D%20%7B%0D%0A%20%20%20%20%22id%22%3A%200%2C%0D%0A%20%20%20%20%22category%22%3A%20%7B%0D%0A%20%20%20%20%20%20%20%20%22id%22%3A%200%2C%0D%0A%20%20%20%20%20%20%20%20%22name%22%3A%20%22string%22%0D%0A%20%20%20%20%7D%2C%0D%0A%20%20%20%20%22name%22%3A%20%22doggie%22%2C%0D%0A%20%20%20%20%22photoUrls%22%3A%20%5B%0D%0A%20%20%20%20%20%20%20%20%22string%22%0D%0A%20%20%20%20%5D%2C%0D%0A%20%20%20%20%22tags%22%3A%20%5B%0D%0A%20%20%20%20%20%20%20%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%22id%22%3A%200%2C%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%22name%22%3A%20%22string%22%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%5D%2C%0D%0A%20%20%20%20%22status%22%3A%20%22available%22%0D%0A%7D%3B%0D%0A%0D%0A%2F%2F%20Types%20inf%C3%A9r%C3%A9s%20(global%20et%20imbriqu%C3%A9s)%20%22alias%C3%A9s%22%20%0D%0Atype%20PetSample%20%20%20%20%20%20%3D%20typeof%20petSample%3B%0D%0Atype%20CategorySample%20%3D%20typeof%20petSample.category%3B%0D%0Atype%20TagSample%20%20%20%20%20%20%3D%20typeof%20petSample.tags%5B0%5D%3B%0D%0A

---

### Comparaison avec le typage semi-manuel outillé (convertisseur JSON-TS)

- ️️✔️ Types ~~générés~~ inférés = sans erreur 👍
- ❌ Besoin d’exemples JSON
  - *Samples* dans le code → Autant s’en servir 👍
    - Valeur par défaut d’un champ `PetDto`
    - Résultat d’un service bouchonné dans un TU (`PetServiceStub: get = () => petSample;`)
- ❌ ~~2~~ → 1 action manuelle (copy~~, convert~~) 👍
- 🍌 2 ajustements en moins 👍
  - ~~`RootObject`~~, ~~`namespace`~~

---

## Typage semi-manuel - Ajustements

- Types imbriqués / `enum` : à définir et à mapper
- Champs **optionnels** `(property) a?: T`
- Option de compilation `strictNullChecks` <br>
  → Identifier les valeurs **nullables** _(au sens large)_
  - `T | null`, `T | undefined`
  - ⚠️ Optionnel ⇎ ⇒ *undefinedable*

Note:

- **Optionnel** : il ne suffit pas de rendre un champ undefinedable pour le rendre optionnel ! Le `?:` fait tout.

---

### Définition des types imbriqués

Dans `Pet` : `Category` et `Tag`

```ts
type PetSample      = typeof petSample;
type CategorySample = typeof petSample.category;
type TagSample      = typeof petSample.tags[0];
```

--

### Énumération `status`

- Type imbriqué non inférable
- Specs → `status` peut valoir :
  - `'available'`
  - `'pending'`
  - `'sold'`
- Plusieurs manières de le modéliser…

--

#### Énumération `status` : _union type_

```ts
type PetStatus = 'available' | 'pending' | 'sold';

const petStatus: PetStatus = 'sold';
```

- ✔️ Concis
- ⚠️ IntelliSense pour `petStatus` indique parfois
  - la structure : `'available' | 'pending'…`
  - plutôt que le nom : `PetStatus`

--

#### Énumération `status` : _string enum_

```ts
enum PetStatus {
    Available = 'available',
    Pending   = 'pending',
    Sold      = 'sold',
}
```

- ❌ Verbeux
- ✔️ Explicite à la lecture sur les valeurs permises
  - `status = Status.Available` 👍
  - `status = 'available'` 😕

---

### Mapper les types imbriqués

- **Stratégies**
  - Personnalisation _inline_ du *sample*
  - Extension de types

--

#### Personnalisation du *sample* (1)

- Pattern: _"key: value **as CustomType**"_
  - 🔖 Type union, enum
    - `status: 'sold' as PetStatus`

--

#### Personnalisation du *sample* (2)

- Pattern: _"key: **nullable(** value **)**"_
  - 🔖 Champ nullable
    - `nullable()` permet de continuer d’inférer la valeur rendue nullable :

    ```ts
    function nullable<T>(value: T): T | null {
        return value;
    }
    ```

---

#### Personnalisation du *sample* - Bilan

- 🍌 Modifications directes du *sample*
  - Intrusives
  - Difficiles à identifier
  - Risque de les supprimer par erreur lors de l’obtention du *sample* de la version N+1
- ❌ Champs optionnels

> 👉 Stratégie non utilisée

---

#### Extension des types

- ☝️ **Principes**
  - Préserver le *sample*
  - Créer type personnalisé depuis type du *sample*

- 📦 Différents **"patterns"**

---

#### Extension des types - _Utility Types_

- Tous les champs optionnels → `Partial<T>`
- Tous les champs `readonly` → `Readonly<T>`
- etc.

💡 [Liste des _**utility types**_](https://www.typescriptlang.org/docs/handbook/utility-types.html) _(aka **helper types**)_

---

#### Extension des types - Pattern 1

> 🔖 Tous les champs optionnels <br>
> _(`Category`, `Tag`)_

Pattern au choix selon IntelliSense : <br>
`type` (structure) _vs_ `interface` (nom)

```ts
type TagDto = Partial<typeof petSample.tags[0]>;
//   ~~~~~> type TagDto = { id?: number, name?: string }

interface TagDto extends Partial<typeof petSample.tags[0]> {}
//        ~~~~~> interface TagDto
```

---

#### Extension des types - "Surcharge"

> 🔖 Surcharge de champs <br>
> _(`category`, `status`, `tags`)_

```ts
type PetSample = typeof petSample;
interface PetDtoBaseKO extends PetSample {
  category: CategoryDto, // ❌ Incompatible
  tags    : TagDto[],    // ❌ Incompatible
  status  : PetStatus,   // ✔️ Avec string enum / union type
}
```

💡 ~~*Surcharge*~~ → *Retrait* puis *Redéfinition* des champs

---

#### Extension des types - Pattern 2

- _Utility type_ maison `Extends<T, U>`
  - À la `$.extends({}, t, u)` ⟺ `{…t, …u}`
  - Avec `U` champs à redéfinir _(ou  à ajouter)_ dans `T`

```ts
type Extends<T, U> = Omit<T, keyof T & keyof U> & U;

type PetDtoBase = Extends<typeof petSample, {
    category: CategoryDto,
    tags    : TagDto[],
    status  : PetStatus,
}>;
```

Note:
- `Extends<T, U>` ⟺ `T’ & U`
  - `T’` champs de `T` ∉ `U` <br>
    `= Omit<T, keyof T & keyof U>`
  - `Omit`: *utility type* en [TypeScript 3.5](https://devblogs.microsoft.com/typescript/announcing-typescript-3-5/#the-omit-helper-type)
  - `keyof T & keyof U`: clés communes à `T` et `U`

---

#### Extension des types - Pattern 3

> 🔖 Mixte champs requis / optionnels <br>
> _(`Pet` → `name`, `photoUrls`)_

- _Utility type_ maison `PartialExcept<T, K...>`
  - Tous les champs optionnels
  - **Sauf** ceux de clés dans `K`

```ts
type PartialExcept<T, K extends keyof T> =
  Required<Pick<T, K>>
  & Partial<Omit<T, K>>;

interface PetDto extends PartialExcept<PetDtoBase,
                           'name' | 'photoUrls'> {}
```

---

#### Extension des types - Démo

- Patterns combinés
- IntelliSense : erreurs, typages, tests

> 👀 [Démo ⚡️](https://stackblitz.com/edit/ts-runtime-types?embed=1&file=model.sample.ts&view=editor)

---

#### Extension des types - Bilan

- ✔️ Sample préservé
- ✔️ Juste quelques patterns à combiner
- ✔️ _DRY_ (pas de duplication)
- ✔️ _Type safety_ / sample version N+1
- ⚠️ _Utility Types_
  - A minima les connaître 👍
  - Au besoin en créer → [_Advanced Types_](https://www.typescriptlang.org/docs/handbook/advanced-types.html)

---

## Bilan général du typage

- Côté API 😕 → côté client 👍
- (Semi-) manuel → "par samples étendus" 👍
  - ❌ Semi-**manuel** !
  - Alternative : générateur côté client ?
- Autre problème : typage statique suffit-il ?

---

### Générateur côté client : <br> [Swagger Codegen](https://github.com/swagger-api/swagger-codegen)

- Génère modèle + services
- Choix du langage et de la librairie
  - TypeScript + Angular → Code propre 👍
  - TypeScript + Fetch → Code fourre-tout 😕
- Générateur [en ligne](https://generator.swagger.io/)

---

#### DTO générés (extrait)

```ts
// ./model/category.ts
export interface Category { id?: number; name?: string; }

// ./model/pet.ts
import { Category } from './category';

export interface Pet {
    id?: number;
    category?: Category;
    name: string;
    // ...
}
```

---

#### Services Angular générés (extrait)

```ts
// ./api/pet.service.ts
@Injectable()
export class PetService {
  constructor(protected httpClient: HttpClient...) {...}

  public addPet(body: Pet...) {
    ...
    return this.httpClient.post<any>(
      `${this.basePath}/pet`,
      body, ...);
  }
}
```

---

### Limite du typage statique

- Types TypeScript = garanties compile-time
  - Effacés à la compilation en JavaScript
- Garanties au runtime
  - 🔖 API untrusty → ⚠️ types inattendus
  - ❌ Philosophie TypeScript
  - 👉 Librairies de validation

---

### Librairies de validation

- 🕵 Données externes ⟺ Types TypeScript attendus
- 2 stratégies opposées
  - **Transpilation**
  - **Runtime Types**

Note:

- On cherche à ce que les données externes correspondent aux types TypeScript attendus
- Ces derniers sont la traduction du contrat d'API et nous permettent d'avoir la garantie "statique", offerte par le compilateur.

---

#### Librairies de validation à la transpilation

💡 Types TypeScript → _Type Guards_ JavaScript

| Nom                                                         | ⭐️  | 🔖     | 📅      |
|-------------------------------------------------------------|-----|--------|---------|
| [typescript-is](https://github.com/woutervh-/typescript-is) | 219 | 0.12.0 | 05/2019 |
| [ts-runtime](https://github.com/fabiandev/ts-runtime)       | 241 | 0.2.0  | 10/2018 |

> ⚠️ Pas encore _production ready_

---

#### Librairies de _Runtime Types_

- 💡 Objet de validation d’un type → Type TypeScript
- 👍 Syntaxe rappelle celle des types TypeScript
- 😕 A coder manuellement depuis contrat de l’API

| Nom                                             | ⭐️   | 🔖    | 📅      | 👍              |
|-------------------------------------------------|------|-------|---------|-----------------|
| [io-ts](https://github.com/gcanti/io-ts)        | 1731 | 1.8.6 | 05/2019 | decode/encode   |
| [runtypes](https://github.com/pelotom/runtypes) | 562  | 3.2.0 | 04/2019 | constraint, msg |

> 👀 [Démo ⚡️](https://stackblitz.com/edit/ts-runtime-types?embed=1&file=model.io-ts.ts&view=editor)

Note:

- [MobX State Tree](https://github.com/mobxjs/mobx-state-tree#trees-types-and-state)
  - _State container_ (alternative à Redux) proposant aussi ce principe de runtime types
  - 4405 ⭐️
  - 🍌 Mélange DTO dans State → Corruption du modèle

---

### Perspectives 🛫

- ☝️ Contrat d’API exploitable
- 💡 Génération côté client combinant :
  - *Runtime Types*
  - \+ Types TypeScript sous-jacents

---

## Questions

## ❔

---

### 📚 Références - *Typage*

- [Type queries & `typeof`](https://mariusschulz.com/blog/type-queries-and-typeof-in-typescript) \~ Marius Schulz, Mar 2016
- [TS 2.1: Mapped Types](https://mariusschulz.com/blog/typescript-2-1-mapped-types) \~ Marius Schulz, Jan 2017
- [Interface vs Type alias](https://medium.com/@martin_hotell/2a8f1777af4c) \~ Martin Hochel, Mar 2018
- [TS Type Inference Guide](http://ducin.it/typescript-type-inference-guide) \~ Tomasz Ducin, Jan 2019

---

### 📚 Références - *Runtime type checking*

- [Typescript and validations at runtime boundaries](https://lorefnon.tech/2018/03/25/typescript-and-validations-at-runtime-boundaries/) <br>\~ Gaurab Paul, Mar 2018
- [TypeScript — Make types “real”, the type guards](https://medium.com/@wittydeveloper/814364e8dbe3) <br>\~ Charly Poly, Nov 2018

---

## Merci

[@DeneauRomain](https://twitter.com/DeneauRomain)

<img src="soat.png" class="plain">
