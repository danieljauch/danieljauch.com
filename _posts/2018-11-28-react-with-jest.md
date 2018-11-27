---
layout: post
title: "React with Jest"
description: "My lessons learned adding Jest to a React app."
date: 2018-11-28
tags: webdev react js
published: true
---

Recently I added [Jest](https://jestjs.io/) to my personal project that uses `create-react-app` for a React front-end and I found quite a few gotchas to be aware of.

## Setting up

### Installation

If you used `create-react-app` to set up your React app, it already comes [pre-installed with Jest](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests). Otherwise you can install it through `npm` or `yarn`:

```sh
yarn add --dev jest
npm install --save-dev jest
```

### Configuration

Configuration is farily simple as well. By default, Jest will base its settings off of your `.babelrc`, but you can also create a `config.json` if you want to keep it separate. I would recommend using `.babelrc` though. It makes sure that your testing environment has all the same look and feel as the code you're testing.

### Folder structure

Like many JavaScript frameworks, you have many options, but my favorite is adding a `__tests__` folder in the same directory as the code you're testing with matching `.test.js` files for each file.

**Example:** Here's a basic React folder layout:

```
src/
|- app.js
|- index.js
|- components/
  |- page.js
```

Adding folders and test files would look like this:

```
src/
|- app.js
|- index.js
|- __tests__/
  |- app.test.js
  |- index.test.js
|- components/
  |- page.js
  |- __tests__/
    |- page.test.js
```

Two benefits to this:

1. Finding tests for your files is always one click away from the current working directory.
2. `import`-ing the file you're testing is always `"../here"` which saves you on troubleshooting relative paths.

## Writing tests

One of my favorite parts about Jest is that you can write it very simply or you can use blocks to layout the tests in a readable way along the same lines as something that I'm familiar with like Rspec.

### The anatomy of a test

Tests in Jest have four parts

1. Name: a string used to give a name to the test that is printed in the console representation of the running test.
2. Method: an anonymous function used to wrap around the expectation(s).
3. Expectation: a value that is being asserted.
4. Matcher: is how the expectation is being checked.

```js
test("addition", () => {
  expect(1 + 1).toBe(2);
});
```

This test's name is `"addition"`, the method is anonymous, the expectation is the result of `1 + 1`, and the matcher is `toBe(2)` which will check the expectations equality to the value `2`.

### `describe`, `test`, and `it`

Tests can be written with blocks running the `test()` or `it()` (which is just an alias) method based on readibility.

```js
test("addition", () => {
  expect(1 + 1).toBe(2);
});
// vs.
it("adds properly", () => {
  expect(1 + 1).toBe(2);
});
```

These two tests do exactly the same thing, they just read differently. For consistency, I would choose one and write all of your tests with that phrasing. I personally like `it` because of how it forces me to think in terms of what the _goal_ of the test is rather than what the test is asserting.

Often there will be multiple expectations on the same method, there are two scenarios and ways to achieve this:

- If multiple expectations achieve the same test assertion, there can be multiple `expect` methods in one test. For example, I want to know if an object passes validations by creating each individual value, but they individually don't need validation.
- If there are separate expecations surrounding the same method, there can be multiple `test`s in one `describe` block like below.

```js
// app.js
function greaterThanFive(num) {
  return num > 5
}
export default greaterThanFive;
```

```js
// __tests__/app.test.js
import greaterThanFive from "../app";

describe("greaterThanFive", () => {
  it("works under five", () => {
    expect(greaterThanFive(4)).toBe(false);
  });

  it("works over five", () => {
    expect(greaterThanFive(6)).toBe(true);
  });
});
```

This keeps lots of tests tidy, especially when testing multiple aspects of a single class or module.

## React testing

Now to the important part. This is where I found the most difficulty because there are many options when trying to test React. There is a renderer called `react-test-renderer` that Jest recommends for use along-side `create-react-app`, but I found that to require quite a lot of setup and it doesn't allow what's called "shallow rendering".

Shallow rendering is a method of creating a DOM-like structure, but only at the level of your current component. For example, if you have a `Page` component, traditional rendering will have a DOM structure like this: `html > body > div#root > App > Router > div > Route > Page > ...`. If rendering any of these components encounters an issue, all of the tests of all of them will fail. Whereas with shallow rendering, you would only see your `Page` component, allowing you to test in a vaccuum.

The best option I found to achieve this with was `enzyme` which has a `shallow()` method as an easy import.

```js
import React from "react";
import App from "../app";
import { shallow } from "enzyme";

describe("<App />", () => {
  it("renders without error", () => {
    expect(() => {
      shallow(<App />);
    }).not.toThrow();
  });
});
```

It's clean, it's simple, and it required no configuration.

## Mocking React components

Occasionally, you'll need to pass props into components, which may take some mocking. In the same folder structure as `__tests__`, you can make another folder called `__mocks__`.

This is best done with a single static export, although there are faker options in NPM to add this behavior. In my experience, the amount of JavaScript coding it took to create dynamic mocks took longer than just manually writing unit tests for things like over-under tests.

## Summary

Altogether, Jest looks like an overwhelming number of options coming in, but once you find a method that works for you, it becomes very streamlined because of the simplicity of testing with Jest. Pick a method, write your tests, and enjoy!
