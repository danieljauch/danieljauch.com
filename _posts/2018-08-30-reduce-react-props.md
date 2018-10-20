---
layout: post
title: "SOLID React Programming Part 1: Single Responsibility"
description: "If you haven't heard of the SOLID paradigm in object oriented programming, it's a great way to keep your work easy to use and reuse. Today, we're talking about the S, Single Responsibility."
date: 2018-09-09
tags: webdev react js
published: false
---

Ever passed a single prop through five elements? No fun, bug-prone, a refactoring nightmare. Let's solve that.

### React and Object Oriented Programming

Between the way that the DOM structures elements and the way that React connects Components, the easiest way to get better at keeping _React_ simple is by keeping good _OOP_ practices. We aren't going to go deep into this, but it's a good start to what we're going to talk about later.

If you haven't heard about SOLID principles, they're... well... solid. You should really get familiar:

- **S**ingle Responsibility
- **O**pen-Closed
- **L**iskov Substitution
- **I**nterface Segregation
- **D**ependency Inversion

### Make Sure Your Component Has a Single Responsibility

Let's say you're making an accordion. Here's a pretty natural way to start:

```
import React, { Component } from "react";

class AccordionWrapper extends Component {
  state = {
    openAccordionItem: null
  }

  toggleAccordion = id => {
    this.setState({
      openAccordionItem: id
    });
  }

  render () {
    const { accordionItems } = this.props;

    return (
      <div className="accordion__wrap">
        {accordionItems.map(item =>
          <AccordionItem
            title={item.title}
            id={item.id}
            toggleAccordion={this.toggleAccordion}
            content={item.content}
            key={`accordionItem${item.id}`}
          />
        )}
      </div>
    );
  }
}

class AccordionItem extends Component {
  render () {
    const { title, id, toggleAccordion, content } = this.props;

    return (
      <section className="accordion__item">
        <header className="accordion__header" onClick={() => toggleAccordion(id)}>
          <h3 className="accordion__title">{title}</h3>
        </header>
        <article className="accordion__content">
          x{content}
        </article>
      </section>
    );
  }
}
```

