# Notes

[Type Queries](https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#3.8.10)

- A type query consists of the keyword `typeof` followed by an expression.
- Type queries are useful for capturing anonymous types that are generated by various constructs such as object literals, function declarations, and namespace declarations.
- Type queries are erased from the generated JavaScript code and add no run-time overhead.

## Runtime type checking libraries

- https://github.com/gcanti/io-ts
  - 1731 ⭐️
  - Runtime type system for IO decoding/encoding
  - https://stackblitz.com/edit/ts-io-ts?embed=1&file=model.ts&view=editor

- [Runtypes](https://github.com/pelotom/runtypes)
  - Runtime validation for static types
  - 562 ⭐️
  - https://stackblitz.com/edit/ts-runtypes?embed=1&file=model.ts&view=editor
  - Similar to io-ts in that it uses the same concept of Runtime Types. However it does not deal with encoding/decoding values and hence the resultant API is somewhat simpler than io-ts.

- Comparaison io-ts / runtypes
  - Même concept de _"Runtime types"_ avec API très similaire
  - io-ts gère encoding/decoding → API + complexe
  - runtypes : contraintes sur les valeurs aussi (ex : nombre >= 0)

- https://github.com/joanllenas/ts.data.json
  - 52 ⭐️
  - Decoder JSON: https://dev.to/joanllenas/decoding-json-with-typescript-1jjc
  - Trop jeune : depuis Dec 2018
  - Ne fait pas autant que io-ts ou runtypes

- [MobX State Tree](https://github.com/mobxjs/mobx-state-tree#trees-types-and-state)
  - State container
  - 4405 ⭐️
  - 🍌 Mélange DTO dans State → Corruption du modèle

- [typescript-is](https://github.com/woutervh-/typescript-is)
  - TypeScript transformer that generates run-time type-checks.
  - 219 ⭐️

opposite approach to io-ts and generates runtime types from static types. It is philosophically similar to ts-runtime but limits itself in scope by handling primitives and interfaces.

Type guards are generated using typescript transformers. This is an interesting approach, and while it requires some configuration during the build step it is quite simple to use.

Unlike io-ts you give up control over the runtime type, so things like custom encoding/decoding logic etc. have to be handled at a separate layer. I find that to be an acceptable compromise in most scenarios.

Also, the runtime overhead of this library is much less compared other runtime type implementations here, because it compiles down to a simple chain of if-else statements:

```ts
import { is } from 'typescript-is';

interface MyInterface {
    someObject: string;
    without: string;
}

const foreignObject: any = { someObject: 'obtained from the wild', without: 'type safety' };

if (is<MyInterface>(foreignObject)) {
    // Call expression returns true
    const someObject = foreignObject.someObject; // type: string
    const without = foreignObject.without; // type: string
}
```

Resulting JS:

```js
if (
    (object => { 
        return typeof object === "object" && 
                object !== null && 
                !Array.isArray(object) && 
                ("someObject" in object && 
                    typeof object["someObject"] === "string") && 
                    ("without" in object && 
                        typeof object["without"] === "string"); 
    })(foreignObject)
) {
    // Call expression returns true
    const someObject = foreignObject.someObject; // type: string
    const without = foreignObject.without; // type: string
}
```

## Swagger Codegen

> Generate client SDKs

- A tester : https://github.com/swagger-api/swagger-codegen
- Online : https://generator.swagger.io/
  - TypeScript Fetch : BOF, tout dans un gros fichier `api.ts`
  - TypeScript Angular et TypeScript jQuery → code généré bien segmenté 👍 :
    - `/api/[Pet|Store|User]Api.ts`
    - `/model/[ApiResponse|Category|Order|Pet|Tag|User].ts`

## Divers

- Sample utilisable dans les tests unitaires, par exemple pour bouchonner un service.
- Si API REST sans Swagger, Samples = résultat d'un vrai appel à une méthode de l'API. Au besoin faire plusieurs essais avec différents paramètres pour avoir un résultat le plus caractéristique en matières de valeurs et de types.

## Bilan

- Solution qui peut vite devenir assez complexe à écrire et à relire donc pas idéale non plus !
- TODO: DTO vs Model...
  - => complexité du type DTO à gérer dans le mapping vers le modèle plutôt que dans son typage très précis