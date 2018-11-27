---
layout: post
title: "Writing New ESLint Rules"
description: "Working in a team is an incredibly important part of working on modern applications. How do you decide which ones to use?"
date: 2018-09-13
tags: webdev react js
published: true
---

I recently updated my `.eslintrc` because I wanted to make sure I had a default for ES6 and React, but then I went down a massive rabbit hole about all the different rules that exist in ESLint and decided to write out reasons for why I'm choosing the rules I'm choosing.

## The Process

I wanted to start off by deciding what sort of reasons that I would make (or more importantly, not make) a rule. Here were my first thoughts:

- No personal opinions
- There has to be a documented reason for the thing
- It has to be generally agreeable

At first, this seemed fairly reasonable, but the further I dug into these, I had problems with this list.

- I like my opinions and I have many of them because of a poor experience with using a different policy. That's effort I'd like to save other developers with whom I work if possible.
- The idea of documentation is a good reason, but should it _only_ be code with documentation?
- Agreeable is a good sentiment, but it's actually a really broad and starting with agreeable sets a precendent where there should be unanimous buy-in or nothing which probably leaves out a lot of good rules for most people in a team.

This is probably where most teams start on putting together a list of reasons. You want to make it seem objective and beneficial. So what's the alternative? I stepped back and looked at why I might want to have rules and what types of problems that I'm looking to solve other than information for my auto-formatter.

After a bit of thought, I found a way to make the list about concerns

- Is the code the level of quality that I want to read / write? How do I maintain that quality for the best user experience?
- Is it easy for someone new to the code block / file / project to understand what's supposed to be happening when just reading?
- Is the style of code consistent between different developers to that the repository feels like a cohesive application?

Shortened, that's quality, clarity, and consistency (So close to alliteration it's frustrating). Opinions can exist here as long as they help insure that the JavaScript code is up to a standard rather than someone's personal preference. Documentation helps, but in service of ensuring the best application, not someone's argument wins. Finally, it's much easier to agree what's best for the application than what's simply "best".

## The File

To start writing the file itself, I needed to make sure I had the ability to work with ES6, JSX, React in general, and I have a personal preference to include accessibility (Read up on inclusive design and the curb cut effect, good stuff). Your team or project may have different concerns. Make sure those are in the defaults before you even start writing rules. Some rules won't apply when not using ES6 for example.

```json
{
  "root": true,
  "parserOptions": {
  "ecmaVersion": 6,                 // Sets up the file to work with ES6 right from the start
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true                   // Ready for React
    }
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended"   // Accessibility standards
  ],
  "env": {
    "browser": true
  },
  "plugins": [
    "jsx-a11y",                     // Accessibility plugin in React
    "eslint-plugin-react"
  ],
  "rules": {...}
}
```

Now the rules. Below are my definitions for quality, clarity, and consistency. The definitions might not make sense. Make your own! Better yet, you may even make your own concerns. You'll also want to make your own decisions about which rules are required (or where ESLint will respond with an error), and which rules are suggested (which respond with a warning).That said, here are mine.

### Concern #1: Quality

> The ability for _standards_ to dictate code decisions rather than personal preference toward a specific feature of JavaScript. Quality code should also be maintainable, upscale-able, and modular.

This is where most of the work is concerned. Known browser bugs, unexpected behaviors, and false assumptions can all be corrected by having simple rules required.

```json
"array-callback-return": "error",
"accessor-pairs": "error",
"consistent-this": ["error", "self"],
"default-case": "error",
"dot-notation": "error",
"eqeqeq": "error",
"guard-for-in": "error",
"new-cap": "error",
"no-caller": "error",
"no-case-declarations": "error",
"no-console": { "allow": ["warn", "error"] },
"no-empty-function": "error",
"no-eq-null": "error",
"no-eval": "error",
"no-extend-native": "error",
"no-implicit-coercion": "warn",
"no-implied-eval": "error",
"no-label-var": "error",
"no-param-reassign": "error",
"no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
"no-prototype-builtins": "error",
"no-return-assign": "error",
"no-script-url": "error",
"no-shadow": "error",
"no-shadow-restricted-names": "error",
"no-template-curly-in-string": "error",
"no-use-before-define": "error",
"no-with": "error",
"require-await": "error",
"semi": ["error", "always"],
"radix": "error",
"wrap-iife": ["error", "outside"]
```

### Concern #2: Clarity

> The ability for a new developer to the project to read code and know what it's supposed to do.

The ideal situation for any set of loosely coupled, modular code blocks is that any segment of code can be taken into a new context and be expected to work the same

```json
"block-scoped-var": "error",
"max-classes-per-file": ["warn", 2],
"max-depth": ["warn", 3],
"max-len": [
  "error",
  {
    "code": 100,
    "comments": 80,
    "tabWidth": 2,
    "ignoreUrls": true,
    "ignoreStrings": true,
    "ignoreTemplateLiterals": true,
    "ignoreRegExpLiterals": true
  }
],
"max-lines": ["warn", { "max": 300, "skipBlankLines": true, "skipComments": true }],
"max-lines-per-function": [
  "error",
  { "max": 30, "skipBlankLines": true, "skipComments": true }
],
"max-nested-callbacks": ["error", 3],
"max-params": ["warn", 3],
"no-else-return": "error",
"no-extra-label": "error",
"no-nested-ternary": "error",
"no-self-compare": "error",
"no-sequences": "error",
"no-throw-literal": "error",
"no-useless-call": "error",
"no-useless-concat": "error",
"no-useless-return": "error",
"no-void": "error",
"vars-on-top": "error",
"yoda": "error"
```

### Concern #3: Consistency

> The ability to keep code similar reguardless of context so that expectations can be set between developers.

This is all about style. These rules help keep the code cohesive and the team from pointing fingers when someone chooses to put a curly brace on the next line instead of inline (tsk, tsk). That way, you can focus on developing and not petty grudges.

```json
"array-bracket-spacing": ["error", "never"],
"block-spacing": ["error", "always"],
"brace-style": ["error", "1tbs", { "allowSingleLine": true }],
"camelcase": "error",
"comma-spacing": "error",
"dot-location": ["error", "property"],
"keyword-spacing": "error",
"no-alert": "warn",
"no-extra-parens": ["error", "functions"],
"no-floating-decimal": "error",
"no-multiple-empty-lines": "error",
"no-trailing-spaces": "error",
"object-curly-spacing": ["error", "always"],
"padded-blocks": ["error", "never"],
"quotes": ["error", "double"],
"semi-spacing": "error",
"space-before-function-paren": ["error", "never"],
"space-in-parens": "error",
"space-infix-ops": "error",
"space-unary-ops": "error",
"spaced-comment": ["warn", "always", { "markers": ["="] }]
```

One thing you may notice immediately is that you probably mentally blurted out "That rule doesn't belong there!" reading some of my rules. That's the best part! Your team gets to make their own rationale for your rules. The point of having them in this order is so that there's an implicit priority when settling discussions internally. Code style isn't worth fighting about, known JavaScript bugs are.

I reeeeeeally recommend that you make your own, but for those of you who are curious or have a particular liking for my rules I just showed, here's my new file (in fancy, alphabetical order):

```json
{
  "root": true,
  "parserOptions": {
  "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended"
  ],
  "env": {
    "browser": true
  },
  "plugins": [
    "jsx-a11y",
    "eslint-plugin-react"
  ],
  "rules": {
    "array-callback-return": "error",
    "accessor-pairs": "error",
    "array-bracket-spacing": ["error", "never"],
    "block-scoped-var": "error",
    "block-spacing": ["error", "always"],
    "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
    "camelcase": "error",
    "comma-spacing": "error",
    "consistent-this": ["error", "self"],
    "default-case": "error",
    "dot-location": ["error", "property"],
    "dot-notation": "error",
    "eqeqeq": "error",
    "guard-for-in": "error",
    "keyword-spacing": "error",
    "max-classes-per-file": ["warn", 2],
    "max-depth": ["warn", 3],
    "max-len": [
      "error",
      {
        "code": 100,
        "comments": 80,
        "tabWidth": 2,
        "ignoreUrls": true,
        "ignoreStrings": true,
        "ignoreTemplateLiterals": true,
        "ignoreRegExpLiterals": true
      }
    ],
    "max-lines": ["warn", { "max": 300, "skipBlankLines": true, "skipComments": true }],
    "max-lines-per-function": [
      "error",
      { "max": 30, "skipBlankLines": true, "skipComments": true }
    ],
    "max-nested-callbacks": ["error", 3],
    "max-params": ["warn", 3],
    "new-cap": "error",
    "no-alert": "warn",
    "no-caller": "error",
    "no-case-declarations": "error",
    "no-console": { "allow": ["warn", "error"] },
    "no-else-return": "error",
    "no-empty-function": "error",
    "no-eq-null": "error",
    "no-eval": "error",
    "no-extend-native": "error",
    "no-extra-label": "error",
    "no-extra-parens": ["error", "functions"],
    "no-floating-decimal": "error",
    "no-implicit-coercion": "warn",
    "no-implied-eval": "error",
    "no-label-var": "error",
    "no-multiple-empty-lines": "error",
    "no-nested-ternary": "error",
    "no-param-reassign": "error",
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "no-prototype-builtins": "error",
    "no-return-assign": "error",
    "no-script-url": "error",
    "no-self-compare": "error",
    "no-sequences": "error",
    "no-shadow": "error",
    "no-shadow-restricted-names": "error",
    "no-template-curly-in-string": "error",
    "no-throw-literal": "error",
    "no-trailing-spaces": "error",
    "no-use-before-define": "error",
    "no-useless-call": "error",
    "no-useless-concat": "error",
    "no-useless-return": "error",
    "no-void": "error",
    "no-with": "error",
    "object-curly-spacing": ["error", "always"],
    "padded-blocks": ["error", "never"],
    "quotes": ["error", "double"],
    "require-await": "error",
    "semi": ["error", "always"],
    "semi-spacing": "error",
    "radix": "error",
    "space-before-function-paren": ["error", "never"],
    "space-in-parens": "error",
    "space-infix-ops": "error",
    "space-unary-ops": "error",
    "spaced-comment": ["warn", "always", { "markers": ["="] }],
    "vars-on-top": "error",
    "wrap-iife": ["error", "outside"],
    "yoda": "error"
  }
}
```

---

### Helpful resources:

- [ESLint homepage](https://eslint.org/)
- [List of all rules](https://eslint.org/docs/rules/)
- Other suggested plugins
  - [Node](https://www.npmjs.com/package/eslint-plugin-node)
  - [Prettier](https://www.npmjs.com/package/eslint-plugin-prettier)
  - [Jest](https://www.npmjs.com/package/eslint-plugin-jest)
  - [Vue](https://www.npmjs.com/package/eslint-plugin-vue)
  - [Ember](https://www.npmjs.com/package/eslint-plugin-ember)
