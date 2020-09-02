---
title: "The Undocumented SWIG, Lot #2"
subtitle: "Building High Performance Integrated Python Extensions"
date: 2020-08-29T16:34:32-04:00
draft: true
---

> Simple things should be simple, complex things should be possible.
>
> -- Alan Kay


In the previous post we elided the details of SWIG typemaps, but no longer.
In our journey into the core of the SWIG runtime we're going to need typemaps
provided by SWIG's support library, and may even craft a few of our own. To
conqure the typemap, we must first understand the typemap.

{{< collapse >}}
From here on out I'm going to stop pointing out what's applicable strictly to
Python and what works for other SWIG target languages. *Generally*, the gist of
the ideas are widely applicable, but might differ in specifics or support from
language to language. The SWIG docs have dedicated chapters for each target
language, so if interested that should be your next stop.
{{< /collapse >}}

## The Typemap

The purpose of typemaps is all in the name, they're a map of the type system.
Typemaps are the instructions for how to take an integer, string, vector, or
whatever data we've got, and transform it into a `PyObject`. More
fundamentally, a typemap is a set of one or more C/C++ source code *templates*,
which SWIG instantiates when when a conversion needs to happen, such as calling
methods or functions that use a given type.
