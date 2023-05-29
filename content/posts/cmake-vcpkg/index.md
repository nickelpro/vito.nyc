---
title: "CMake, vcpkg, and all the rest"
display: "CMake, vcpkg, and&nbspall&nbspthe&nbsprest"
subtitle: "Or, what programming looks&nbsplike&nbspto&nbspme"
description: "Discussion of a build environment for C++ and digital design work"
epigraph: "Man is a tool-using animal. Without tools he is nothing, with tools he is all."
epigraphAuthor: "Thomas Carlyle"
image: "social-media"
date: 2023-05-22T19:00:00-04:00
draft: false
---

In many programming languages the question of _toolchain_ is an idle one. The
modern language designer incorporates answers for compilation, packaging,
and distribution neatly into the language itself. They perform this
incorporation because the failure of their forefathers to do so has caused
endless consternation in forerunner languages.

For better or worse, much of my work these days is spent in the land of C/C++
and SystemVerilog. These are about as far outside the world of well-planned
toolchains as one can get. I've [previously written](../cmake-pkg) about how to
package such projects, but carefully avoided injecting too much of my overall
process into that post.

{{< img src="tunnel.webp" resize="x684 q90" darksrc="tunnel-inverted.webp" darkmode="filter" imgstyle="border-radius: 10% / 30%; margin-left:auto; margin-right:auto;" />}}

However, it feels like every week I encounter some complaint that goes, "oh I
never do _X_ because it doesn't work". Well it works for me, so I'm writing this
in hopes that I can describe whatever it is I'm doing that is working.

## The Basics

Across all langauges:
  * **Editor**: [VS Code](https://code.visualstudio.com/)
  * **Font**: [Operator Mono](https://www.typography.com/blog/introducing-operator)
  * **Highlighting**: [One Dark Pro](https://github.com/Binaryify/OneDark-Pro), with lots of customizations
  * **Shell**: Linux/zsh, Windows/pwsh

For C++ specifically:
  * **LSP/Intellisense**: [cpptools](https://github.com/microsoft/vscode-cpptools)
