---
title: "C++20 Modules"
subtitle: "Worked Examples and Recommendations"
description: "Walkthrough of practical usage examples of C++20"
epigraph: "As a rule, software systems do not work well until they have been used, and have failed repeatedly, in real applications"
epigraphAuthor: "Dave Parnas"
image: "social-media"
date: 2023-10-09T08:00:00-04:00
draft: true
---

The current landscape of material written about C++20 modules can be roughly
divided into camps based on the perspective of the respective authors. There are
treatises from the specification mavens, concerned as they are with definitions
and nomenclature; demonstrations from compiler smiths filled with flags and
switches and arguments and parameters, until invocation rivals source code in
length and complexity; and there is the indefatigable Bill Hoffman with a slide
deck and a dream, whom we wait on with bated breath to learn if `CMake` has
delievered unto us modules for the everyman.

Neither maven or smith, nor (alas) Bill Hoffman, this author instead offers the
perspective a simple journeyman on the working of C++20 modules. And, like
learning Scopa from an Italian, we shall first deal the cards and explain the
rules when they come up.
