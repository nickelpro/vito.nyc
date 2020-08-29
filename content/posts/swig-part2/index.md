---
title: "The Undocumented SWIG, Lot #2"
subtitle: "Building High Performance Integrated Python Extensions"
date: 2020-08-29T16:34:32-04:00
draft: true
---

In the previous post we elided the details of SWIG typemaps, but no longer.
In our journey into the core of the SWIG runtime we're going to need typemaps
provided by SWIG's support library, and may even craft a few of our own. To
conqure the typemap, we must first understand the typemap.
