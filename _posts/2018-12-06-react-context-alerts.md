---
layout: post
title: "Using React Context API to make app-level alerts"
description: "My journey with the Context API and making alerts that go between pages."
date: 2018-12-06
tags: webdev react js
published: true
---

Most websites have some kind of alert module that pops over the top of your content to warn you when a login attempt didn't work, there was a server error, or those annoying "subscribe to my newsletter" modals. Achieving it in React can easily get repetitive and difficult to maintain.

## The problem

If you're using a multi-page app, your component structure likely looks something like this:

```
|- App
  |- Router
    |- Route
      |- IndexPage
        |- Page
          ...(page content)
      |- AboutPage
        |- Page
          ...(page content)
      |- ContactPage
        |- Page
          ...(page content)
      ...(other pages)
```

To add an alert structure, you'll likely need to add it underneath the header, like so...

```
|- App
  |- Router
    |- Route
      |- IndexPage
        |- Page
          |- Header
            |- Logo
            |- MainMenu
            |- Alerts
```

This is fine, and works for a one page app, you can even drill `prop`s from your `Page` down to your `Alerts` without having to do too much moving of data, the problem is when you want to move that information of state...

```
|- App
  |- Router
    |- Route
      |- IndexPage
        |- Page
          |- Header
            |- Logo
            |- MainMenu
            |- Alerts <-- From here...
      |- AboutPage
        |- Page
          |- Header
            |- Logo
            |- MainMenu
            |- Alerts <-- To here...
```

You can't use the `Route`, or the `Router`, so you end up needing to take the `prop`s from `App`, all the way down, which gets to be some pretty deep drilling.

## Enter `Context`

If you're familiar with Redux, you'll be quite used to the patterns you're about to see, although Context solves specifically this problem so that you don't have to worry about sessions and local stores to take care of this problem, you can just manage a `state`. React has a decent guide of explaining what Context is [here](https://reactjs.org/docs/context.html), but I found [Wes Bos' video](https://youtu.be/XLJN4JfniH4) to be a much more helpful guide.

### The parts

There are three terms you'll need to understand what they are and what they mean:

- Context: A simple way to think of this is as a JavaScript Object. You instanciate it with a initial values, and there is behavior that we can extend to our own means.
- Provider: This is the input portion of the context which in our case is managed by a React Component with a `state`. We're going to _provide context_ by passing that `state` to the context to manage.
- Consumer: This is the output portion which can be consumed by any other component at any other level.

### In the abstract

This method takes the value of the application's state and abstracts it to where it can be called on from either level without needing to manage handoffs between.

```
|- App <-- state is created here
  |- Router
    |- Route
      |- IndexPage      [no passing props]
        |- Page
          |- Header
            |- Logo
            |- MainMenu
            |- Alerts <-- state is viewed here
      |- AboutPage
        |- Page
          |- Header
            |- Logo
            |- MainMenu
            |- Alerts <-- state is viewed here
```

## How to context

### 1. Creating a context

To create a context, you'll use a React method called `createContext`. In this demo, we're trying to create a set of alerts that are displayed site-wide.

```js
const AlertContext = React.createContext()
```

Super simple so far.

### 2. Creating a `Provider`

This is the most confusing part because there are two things labelled "Provider". One is a component that is going to get rendered later on (I'll talk about why this is important in a moment), and the other is a _context provider_ from the context created in step 1.

```js
class AlertProvider extends Component {
  state = {
    alerts: []
  }

  render() {
    return (
      <AlertContext.Provider value={{ state: this.state }}>
        {this.props.children}
      </AlertContext.Provider>
    )
  }
}
```

One easy way to remember this is that `Context` is not a React component. It's an API that we interact with to manage the value of an object. For our uses, the object we want to manage is the `state` of the **Provider Component**. This is why the component is important to include.

Two other points here before we move on:

- The `value` property of the provider is what the scope of the context is and it's required.
- Make sure that the context provider has children. It's crutial for the next step.

Before we move on to consuming that value, we need to add the provider component to our `App` render.

```js
class App extends Component {
  render() {
    return (
      <AlertProvider>
        <Router>
          <div className="app__root">
            <Route path="/" exact component={IndexPage} />
            <Route path="/about" component={AboutPage} />
          </div>
        </Router>
      </AlertProvider>
    )
  }
}
```

You can put the scope of your provider component wherever you like, but it's best to have it as high up as possible because the provider just gives a scope for where the consumers can live.

One situation where you wouldn't want to put the provider at the uppermost level is if you have multiple contexts. It's best to scope something app-wide to the entire app, and something page-wide to the page.

### 3. Creating a `Consumer`

The data is assigned, we have a `state` where it's ready to change as needed, and it's managed by the context. The only step that's left is to use that state as a `prop` for a component that would consume that data.

In the same way that `Provider` was a method inside `AlertContext`, `Consumer` works the same way, but rather than providing a value, we'll pass a functional render as the child, just like you would map an array of values to children components:

```js
class Alerts extends Component {
  render() {
    return (
      <AlertContext.Consumer>
        {context => (
          <section className="alert__wrapper">
            {context.state.alerts.map((alert, index) => (
              <Alert {...alert} key={`alert_${index}`}/>
            ))}
          </section>
        )}
      </AlertContext.Consumer>
    )
  }
}
```

`context` can be called anything you like, so we could even call this `alerts` to be more specific, but because of how we're grabbing the state property of the `AlertProvider` as the context, it can get confusing when we make the children components.

An important note is that the consumer can go at any level of your render method. I put it at the first level of this file because it made sense for the structure of the file, but you can have as many parents or siblings to the consumer as you want. Only components that are children to the context will have access to it.

## So now what?

Well so far, we've only assigned a value and displayed it, but just like any other component, you can add lifecycle methods, callbacks, multiple state values, and anything else you might need to make your context work. In my case, I've created an option to add and remove items from alerts:

```js
class AlertProvider extends Component {
  state = {
    alerts: initalAlerts
  }

  createAlert = message => {
    let alerts = [...this.state.alerts]

    alerts.push({
      message,
      dismissed: false,
      index: alerts.length
    })

    this.setState({ alerts })
  }

  dismissAlert = index => {
    let alerts = [...this.state.alerts]

    alerts[index].dismissed = true

    this.setState({ alerts })
  }

  render() {
    return (
      <AlertContext.Provider
        value={{
          state: this.state,
          createAlert: this.createAlert,
          dismissAlert: this.dismissAlert
        }}>
        {this.props.children}
      </AlertContext.Provider>
    )
  }
}
```

You can then add a button to dismiss the alerts beneath the consumer:

```js
<button onClick={() => context.dismissAlert(alert.index)}>Dismiss</button>
```

Or have the page greet you when you arrive:

```js
class IndexPage extends Component {
  componentDidMount = () => {
    this.props.context.createAlert("Hi!")
  }

  render() {
    return <Page>...</Page>
  }
}
```

## Conclusion

In the end, the structure of my finished product looks like this.

```
|- App
  |- Provider <---------------- Props made globally available here
    |- Router
      |- Consumer
        |- Route
          |- IndexPage <------- Individual props exist here
            |- Page
              |- Header
                |- Logo
                |- MainMenu
                |- Consumer
                  |- Alerts <-- Individual props exist here
      |- Consumer
        |- Route
          |- AboutPage <------- Individual props exist here
            |- Page
              |- Header
                |- Logo
                |- MainMenu
                |- Consumer
                  |- Alerts <-- Individual props exist here
```

Because of your `Consumer`, those props are avaiable where you need them and maintained between naviagation, reguardless of state, route, or any other factor.

[Here's my repo](https://gitlab.com/danieljauch/react-context-alert-test), enjoy!
