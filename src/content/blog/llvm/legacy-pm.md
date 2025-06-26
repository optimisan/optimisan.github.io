---
title: How the Legacy Pass Manager works
description: The legacy pass manager orchestrates the execution of passes and analyses.
pubDate: "June 26, 2025"
tags: [LLVM]
---


## What is a Pass?
Pass is a more generic term that I thought. A pass is primarily a function that runs on a specific IR part (like Function or Module or BasicBlock) and transforms it or calculates an analysis result. The analysis result can be requested by any other pass to be used. Moreover, a function pass can use a module analysis and vice versa. Passes are thus also used for global objects that any other pass can use (this global information is in Immutable passes).

### Registering passes
Passes are registered and stored in a global `PassRegistry` as `PassInfo` objects that hold a callback to create the pass, an `isAnalysis` flag and its (string) name and ID. 
## Pass types
There are two main types of passes: Transformation passes and analysis passes. Another type is Immutable pass, which are passes that are never run or scheduled, but are available for requesting in any passes. (through `getAnalysis<ImmPassType>()`).

## Usage
The pass manager's basic job is to run passes while respecting their dependencies. The outside API exposes two main methods through the `PassManager` (or `PassManagerBase`) class:
1. `add(Pass*)`: To add a pass to the pipeline.
2. `run(Module&)`: To run the pipeline on the module.

Here is how to use it:
```cpp
legacy::PassManager PM; // is a Pass itself
PM.add(new TargetLibraryInfoWrapperPass(TLII)); // Immutable Pass
Target->addPassesToEmitFile(PM, ...); // targets add their passes through this interface
PM.run(M); // runs the pipeline on the module

/// PassManagerBase is base of PassManager {PM}
bool addPassesToEmitFile(PassManagerBase& PM, ...){
	PM.add(createXXXPass());
	// more of these...
}
```

The `{stop|start}-{before|after}` functionality is implemented by controlling which passes to `PM.add()` to the pipeline.

## Internals
Passes are first *scheduled* and then *run*. In the scheduling part, two things are done while scheduling a pass `P`:
1. Collect the set of required or used passes for a transformation. If the required pass `RP` is of the same level (Module-module or function-function), it is scheduled to be run before the requiring one (`P`). If `RP` is of a lower level (ex. Function pass required by a Module pass), it is run *on-the-fly* (more on this later).
2. Update the set of `LastUsed` passes for all such `RP`. This is used later to remove dead passes (those that no longer would be referenced by others).

### Analysis pass actions
A pass `P` (that can be a transformation or analysis one) chooses among five things to do with an analysis pass `RP`, which declare:
1. **Require:**  `RP` must be run on the IR unit before `P` is run.
2. **Preserve:** On running `P`, the analysis `RP` is not invalidated.
> Declare with `AU.setPreserved()`
3. **RequiredTransitive:**  `RP` and all passes transitively required by `RP` are added to the last used set by `P`. This pass is also included in the **Require** set, and hence is scheduled.
4. **Used**: Updates the `LastUse` of `P` with `RP` non-transitively. Does not schedule `RP` to be run.
5. **Ignored:** `RC` is assumed to be invalidated and removed from the cache.

On calling `run()`, passes are run and the available preserved analysis are updated after every pass. After a pass finishes, all dead analysis passes are freed from memory, using the `LastUse` data collected while adding the passes.