---
title: "Of Bytes and Buffers"
subtitle: "or, a Consideration of Various Ways<br>to Arrange One's Pointers"
description: "A discussion of various data buffering strategies"
epigraph: "It is exciting to discover electrons and figure out the equations that govern their movement; it is boring to use those principles to design electric can openers. From here on out, it's all can openers."
epigraphAuthor: "Neal Stephenson"
image: "social-media"
date: 2023-12-14T22:00:00-04:00
draft: true
---

All the cool kids are writing about generative AI, transformers, and activation
functions, but I don't know what any of those words mean. I am a simple man, I
move bytes from point A to point B and find a great satisfaction in my labor. In
my many journeys from point A bound for point B, I have developed some opinions
about the collection, storage, and management of the humble bytes in my charge.

In this post we'll explore some of those approaches and build towards the
**One True Buffer**™.
