---
title: "C++ Project Tooling"
subtitle: "An Opinionated Guide"
date: 2023-07-03T13:00:00-04:00
image: "social-media"
draft: true
---

Most popular programming languages in the modern era come with a builtin tool
suite and set of best practices fully embraced by the language designers. C and
C++, being survivors of an earlier epoch of language design, do not. We do not
have an `npm`, a `pip`, or a `cargo` with which all C/C++[^1] programmers are
familiar.

What we have, as with everything else in C++, is an abundance of opinions. An
over-abundance. A wild cornucopia that fractures and scatters the community in
ways that will never be fully reconciled. It is into this maelstrom of ideas
that I cast my own implacable judgement.

Here is how we should be setting up new C/C++ projects in the 2020s.

{{<
  img src="storm.webp" darksrc="storm-inverted.webp"
  darkmode="filter" imgstyle="border-radius: 12% / 40%;"
  resize="x684 q90"
/>}}

[^1]: Please forgive the "/", C and C++ are different programming languages,
but in this they are exactly alike.

## clang-format: Ultima Ratio Formationum

The first file in a new C++ project should be `.clang-format`.[^2]

Formatting is dead, long live the formatter. `clang-format` is a tool which
consumes a format specification and applies those formatting rules to source
code files.

{{<
  img src="crusader.webp" darksrc="crusader-inverted.webp"
  imgstyle="border-radius:50% / 30%;" darkmode="filter"
  style="width:30%; float: left; margin: 0 0.3rem 0 0; shape-outside: inset(0 0 0 0 round 50% / 30%);"
/>}}

In every religious crusade launched on forums, subreddits, and mailing lists
about formatting, there is always a wizened voice saying, "Format _choice_
matters less than format _consistency_". `clang-format` turns this advice into
law. It allows the user to configure code format to their fancy, and provides
a hammer with which to forge all code past and future into shape.

Moreover, speaking as a developer instead of an ideologue, we think about
formatting until we don't. Which is to say, typing any old thing into the
editor and having the formatter handle getting all the fiddly-bits correct
allows us to offload a pointless cognitive load to the machine, where it
belongs.

[^2]: This is about C++ specific files. Files that should be in _every_
software project, such as: `ReadMe.md`, `LICENSE`, and `.gitignore`, are not
discussed outside this footnote.

## CMake: The Once and Future King

The second file in a new C++ project should be `CMakeLists.txt`.

About half of readers are now nodding sagely; having, at some time in the last
two decades, already come to this conclusion themselves. Much of remainder will
have stopped reading when they saw the title of this section. For those few who
are willing to be convinced, allow me to explain.

[`CMake`](https://en.wikipedia.org/wiki/CMake) is a "meta" build system, a
descendent of the [`Autotools`](https://en.wikipedia.org/wiki/GNU_Autotools)
school of thought. Put another way, `CMake` doesn't build software, it builds
build-systems. This distinction is irrelevant however, for our purposes it
occupies the same place in the stack as other modern build systems. The
important part is this, `CMake` has won the war.

{{< img src="cmake" darkmode="diff">}}
Source: [Jet Brains 2022 DevEco Survery](https://www.jetbrains.com/lp/devecosystem-2022/cpp/)
{{</ img >}}

The `Makefile` and `Visual Studio project` numbers are irrelevant, they belong
to the Age of Myth while we look to the future. If we ignore the legacy
systems, `CMake` is the only build system with a consensus usage[^3]. The
network effects resulting from this are significant, `CMake` is:
  * Universally supported as a first-class build system by IDEs, including
  Visual Studio
  * Ubiquitously available in Continuos Integration pipelines
  * Well understood by developers and package maintainers
  * Actively being developed, evolving, and improving

There are many pretenders to the Build System Throne. `Meson`, `build2`, and
`SCons` are just a few of the upstarts wandering the countryside. But just
as `git` overcame `mercurial` by way of popularity, not technical superiority,
so too has `CMake` overcome its challengers. Use CMake because
[worse is better](https://www.jwz.org/doc/worse-is-better.html) and imperfect
consensus trumps a beautifully fractured ecosystem.


[^3]: `Gradle` is primarily a Java build system, and not well loved in that
ecosystem either. `Ninja` is a target for meta-build systems like `CMake` and
not intended to be produced by humans. `Xcode` is of course Apple's native IDE,
and its non-portability makes it a non-starter. `QMake` was Qt's build system,
and Qt itself [has migrated](https://www.qt.io/blog/qt-and-cmake-the-past-the-present-and-the-future)
to `CMake`.

## vcpkg Supremacy

The third file in a new C++ project should be `vcpkg.json`.

`vcpkg` is a C/C++ package manager from Microsoft. While no package manager has
won the war yet, and it's unclear if there ever will be a winner, you shouldn't
use `vcpkg` because it makes the lives of others easier, you should use it
because it makes _your_ life easier.

`vcpkg.json` provides for the first time a C++ equivalent to Python's
`setup.py` or Node's `package.json`, a painless way to declare package metadata
and dependencies. For example:

{{< collapse label="vcpkg.json">}}
```json
{
  "name": "strugatsky",
  "version": "1.2.6",
  "description": "Happiness for everybody, free, and let no one go unsatisfied",
  "homepage": "https://vito.nyc/posts/cpp-proj-layout/",
  "maintainers": [
    "Vito Gamberini <vito@gamberini.email>"
  ],
  "supports": "!uwp",
  "license": "Zlib",
  "dependencies": [
    "fmt"
  ]
}
```

{{< /collapse >}}

When used in combination with `CMake`, dependencies can be seamlessly
integrated without any intervention necessary on the part of users or your
fellow developers. My recommended usage is as follows:

{{< collapse label="CMakeLists.txt">}}
```CMake
cmake_minimum_required(VERSION 3.22)

if(NOT DEFINED CMAKE_TOOLCHAIN_FILE)
  include(FetchContent)
  FetchContent_Declare(
    vcpkg
    GIT_REPOSITORY https://github.com/microsoft/vcpkg.git
    GIT_TAG master
    GIT_SHALLOW TRUE
  )
  FetchContent_MakeAvailable(vcpkg)
  set(CMAKE_TOOLCHAIN_FILE
    ${vcpkg_SOURCE_DIR}/scripts/buildsystems/vcpkg.cmake
    CACHE FILEPATH "Vcpkg toolchain file"
  )
  set(VCPKG_ROOT_DIR ${vcpkg_SOURCE_DIR} CACHE PATH "Vcpkg Root Directory")
endif()

add_custom_target(UpdateVcpkgBaseline
  ${VCPKG_ROOT_DIR}/vcpkg x-update-baseline
)

project(strugatsky CPP)

find_package(fmt CONFIG REQUIRED)

add_executable(strugatsky)
target_link_libraries(strugatsky PRIVATE fmt::fmt-header-only)
```
{{< /collapse >}}

An admission: this `CMakeLists.txt` performs dark and forbidden arts. The
mechanism for fetching `vcpkg` shown above has been [declared verboten by the
elders of Redmond](https://github.com/microsoft/vcpkg/pull/27311). I have shown
these proscribed incantations to tempt you towards apostacy, do with that what
you will.

For readers who are not shackled by the orthodoxy, this is explored more in,
[*Addendum: Integrating vcpkg*](/posts/cpp-tools-layout-addenda).

## Putting it all together
