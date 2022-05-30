---
title: "Budget Tracking my finance"
date: 2022-05-30T12:25:38-04:00
draft: false
tags:
- React-Native
- Ruby-on-Rails
---
# Context

In recent times I have been interested in better ways to save, to be able to
make ends meet more calmly and to have a mattress for the future. In this
discovery, I have discovered some platforms such as Buda.com to manage
investments in cryptocurrencies and Fintual, to be able to generate investments
managed by their "experts". With today's market volatility (as of this
writing), you need to track changes so you can get a better idea if
things are getting better or worse. The [Buda](https://buda.com) and [Fintual](https://fintual.cl)
platforms have interfaces to help you see these changes, but they do so in a
way that makes it uncomfortable to constantly review their separate tools.

# Solution: My own API

Due to this, I decided to create a personalized alternative for my current
services, in order to have a better understanding of my financial information.
With this [budget-tracker-rails](https://github.com/aenrione/budget-tracker-rails) is born, a Rest API created in Ruby on Rails
that is in charge of staying constantly updated on my balances and expenses, as
well as providing graphs to better understand how I am managing my savings. To
achieve this, I made use of existing tools like [Fintoc](https://fintoc.com/)
and its API, as well as adaptations to existing APIs with my [buda](https://github.com/aenrione/buda) and
[fintual](https://github.com/aenrione/fintual) gems. Just like that, my API can obtain my information about my bank
accounts, my investments in crypto and the market in general in a secure and
dynamic way.

# Interface
Once I had my API, I needed a convenient way to see it, so I decided to create
a mobile application in order to easily access this information. Because of this, I created
[budget-tracker-react](https://github.com/aenrione/budget-tracker-react), a
React Native-based application that provides me with a graphical
interface to access my API. This gives me a general panel where I can see my
latest transactions as well as my general indicators, as well as a details
panel that provides me with different graphs to visualize the changes that have
occurred in recent months.
