---
title: "The Undocumented SWIG, Lot #3"
subtitle: "Building High Performance Integrated Python Extensions"
date: 2020-08-29T18:39:26-04:00
draft: true
---

> Discuss the kinds of functions typically needed for SWIG runtime support
(e.g. SWIG_ConvertPtr() and SWIG_NewPointerObj() ) and the names of the SWIG
files that implement those functions.
>
> -- SWIG Documentation, [Section 39.10.9 "Runtime support"](http://www.swig.org/Doc4.0/Extending.html#Extending_nn40), in its entirety

Welcome to where the map ends, beyond this point we're on our own. The title of
this series is *The **Undocumented** Swig* and it's past time for me to make
good on that promise. SWIG's documentation is excellent, but in this part I
promise to equip you with two under-documented functions and one completely
undocumented function that will allow you to achieve something spectacular,
converting C/C++ data to PyObjects automatically.
