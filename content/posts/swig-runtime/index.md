---
title: "Leveraging SWIG"
subtitle: "To Build Tightly Coupled C/C++ & Python Programs"
date: 2020-08-26T13:46:15-04:00
draft: false
---

For those who have never ventured into the dark underworld of the Python
C&#8209;Extension API, you may believe that it is as rewarding and seamless as
the rest of the Python ecosystem. I regret to inform you that this is not the
case. Line 13 of [*The Zen of Python*](https://www.python.org/dev/peps/pep-0020/)
says:

> There should be one-- and preferably only one --obvious way to do it.

The C&#8209;Extension API is an excellent example of what happens when one
completely ignores that advice. There are two (incompatible) ways to export a
module, a half-dozen *documented* ways to parse an argument list, and no less
than nine options for calling a method. The documentation for this mess is
excellent by C Library standards, but falls woefully short of the gold standard
set by the rest of the Python docs.

{{< collapse >}}
The simplest, fastest, and most efficient way to write a function in C that can
be called as a Python method is to use the *barely documented* `METH_FASTCALL`
signature and the *completely undocumented* `_PyArg_ParseStack` parser.

A simple print function looks like this:
```C
#define PY_SSIZE_T_CLEAN
#include <Python.h>

static PyObject *print_func(PyObject *self,
    PyObject *const *args, Py_ssize_t nargs) {
  const char *str;
  if(!_PyArg_ParseStack(args, nargs, "s", &str))
    return NULL;
  puts(str);
  Py_RETURN_NONE;
}

static PyMethodDef CPrintMethods[] = {
  {"print_func", (PyCFunction) print_func, METH_FASTCALL},
  {0}
};

static struct PyModuleDef CPrintModule = {
  .m_base = PyModuleDef_HEAD_INIT,
  .m_name = "CPrint",
  .m_size = -1,
  .m_methods = CPrintMethods,
};

PyMODINIT_FUNC PyInit_CPrint(void) {
  return PyModule_Create(&CPrintModule);
}
```

Which is actually quite reasonable considering the amount of heavy lifting the
API is doing under the hood. Unfortunately, the per-function overhead is still
much too high to be maintainable for most applications, and it doesn't even
begin to address C++ codebases which will have to first build a C wrapper.
{{< /collapse >}}

Fear not however, none except the clinically insane would interact with the
C&#8209;Extension API directly, and we won't be going insane today. Instead we
will be talking about the excellent *Simplified Wrapper and Interface
Generator*, better known as [SWIG](http://www.swig.org/). More specifically,
we're going to look at how to use the SWIG runtime to easily convert pointers
between native C/C++ types and CPython objects and other fun that can be had
when we pick a specific scripting language to target.

## SWIG

SWIG is the 8th-Wonder of the software world, it takes an incredibly
complicated job and makes it a transparent part of your build process. SWIG
seamlessly integrates C and C++ routines into any of a dozen target languages
using their native ABIs and foreign function interfaces. For many real-world
use cases, not trivial example code, SWIG can do this out-of-the-box with
barely any configuration whatsoever.

Unlike the C&#8209;Extension API, SWIG has top-notch documentation full of
example code and extensive refrence material. This is not going to be a general
purpose SWIG tutorial, and the reader is fully expected to be able to Ctrl-F
their way through the SWIG docs for any material they're unfamiliar with.

{{< img src="walk"  style="mix-blend-mode: multiply; width: 65%; " />}}

Figure 1 contains a trivial data structure and interface file, we'll be working
with them for awhile so work through any questions you have before moving past
them.

{{< collapse label="Figure 1">}}
In this post, all C-ish code is C++. There are no differences *for SWIG* when
working in a pure C codebase. All field names are strictly for flavor.
```C++
// Agent.hpp
struct AgentStatusUpdate {
  int agent_id;
  float health;
  std::uint64_t secret;
  std::string message;
};
```
I typically prefix SWIG-generated modules with "C" to make them easy to tell
apart at a glance and easy to add to *.gitignore*.
```C++
// Agent.i
%module CAgent
%{
#include "Agent.hpp"
%}

%include <stdint.i>
%include <std_string.i>

%include "Agent.hpp"
```
{{< /collapse >}}
