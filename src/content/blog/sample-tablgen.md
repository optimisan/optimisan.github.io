---
title: A Quick Tutorial on LLVM TableGen
description: A quick tutorial on LLVM TableGen, a powerful tool for defining and managing the structures of code in LLVM, such as instruction sets, registers, and targets.
pubDate: "Feb 26, 2025"
tags: [LLVM, TableGen, LLVM Backend, LLVM Tutorial]
draft: true
---

## A Quick Tutorial on LLVM TableGen

LLVM TableGen is a powerful tool used for defining and managing the structures of code in LLVM, such as instruction sets, registers, and targets. It helps simplify the creation and maintenance of the LLVM backend, making it easier to define and work with low-level machine properties. This tutorial will guide you through the basics of using LLVM TableGen, covering its syntax, typical use cases, and how to create your own TableGen files.

## What is TableGen?

TableGen is a domain-specific language (DSL) used by the LLVM project for generating code and data structures related to targets, instructions, registers, and other parts of the LLVM backend. It allows users to specify machine-specific data in a high-level format, and TableGen then generates code that is used throughout the LLVM toolchain.

### Common Use Cases

TableGen is commonly used to:

- Define machine instructions for a target architecture
- Specify register classes and their properties
- Create patterns for instruction selection
- Define instruction encoding
- Configure target-specific attributes

## Basic Syntax of TableGen

TableGen files use a simple syntax similar to key-value pairs or record-like structures. These files typically have a `.td` file extension and consist of definitions of various LLVM components.

Here are the essential building blocks of TableGen syntax:

### Records

Records are the core data structure in TableGen and can contain fields that hold values. For example, to define a machine instruction:

```tablegen
def ADD : Instruction {
  let opcode = 1;
  let operands = (ins GPR64, GPR64);
  let results = (outs GPR64);
}
```

In this example, `ADD` is defined as a machine instruction with the opcode `1`, two general-purpose registers as inputs (`GPR64`), and one general-purpose register as an output.

### Fields

Fields in records are set using the `let` keyword, followed by a field name, an equal sign (`=`), and the value.

```tablegen
let name = "ADD";
let type = "Arithmetic";
```

### Lists

Lists can contain multiple values and are used to represent things like instruction operands or register classes. Lists are created using parentheses.

```tablegen
let operands = (ins GPR64, GPR32);
```

### Variants

Variants allow you to define different forms of a record that share some common properties but differ in others. For example, you might define multiple variations of an instruction based on different operand types.

```tablegen
def ADD32 : ADD {
  let operands = (ins GPR32, GPR32);
}

def ADD64 : ADD {
  let operands = (ins GPR64, GPR64);
}
```

## Defining Instructions

Instructions are a central part of any target architecture in LLVM. In TableGen, you can define both the structure of an instruction and its behavior using various attributes.

### Example: Defining an Instruction

Let’s define a simple instruction called `ADD`, which adds two general-purpose registers.

```tablegen
def ADD : Instruction {
  let opcode = 1;
  let operands = (ins GPR64, GPR64);  // Two input registers
  let results = (outs GPR64);         // One output register
}
```

### Operand and Result Lists

In the example above, `ins` and `outs` are used to describe the operands and results for the instruction. The `ins` keyword specifies input operands, while the `outs` keyword specifies output operands.

### Instruction Patterns

You can also define instruction selection patterns using TableGen. This helps the instruction selector match machine instructions to the abstract operations in the IR (Intermediate Representation).

```tablegen
def ADD_Pattern : Pattern {
  let op1 = (i32imm 0);
  let op2 = (i32add (i32reg R1), (i32reg R2));
}
```

## Defining Register Classes

In LLVM, register classes group together registers that share common characteristics, such as size or function. You can define register classes in TableGen to help describe the hardware architecture.

```tablegen
class GPR : RegisterClass {
  let size = 64;
  let alignment = 8;
}

def GPR64 : GPR {
  let name = "GPR64";
}
```

Here, `GPR` is a class, and `GPR64` is a register in that class.

## Defining Targets

You can also use TableGen to define a target architecture. The target definition ties everything together, from instructions to register classes. Target definitions are commonly used to describe properties of different CPU architectures.

```tablegen
def TargetX86 : Target {
  let description = "X86 Architecture";
  let registers = (GPR64, GPR32);
  let instructions = (ADD, SUB, MOV);
}
```

## How to Compile and Use TableGen Files

To process and generate code from a TableGen file, use the `tblgen` tool. Here's how you can run it:

```bash
$ llvm-tblgen -gen-register-info my_target.td -o register_info.inc
```

This command generates a header file containing register information for your target architecture based on the TableGen definitions.

### Example: Generating Code

Let's say you define a file `my_instructions.td` with machine instructions. You can generate the necessary code by running:

```bash
$ llvm-tblgen -gen-instruction-info my_instructions.td -o instructions.inc
```

The output file `instructions.inc` will contain the C++ code for the defined instructions.

## Advanced Features

### Templates

TableGen supports templates, which allow you to define patterns that can be reused in other parts of the file. For example:

```tablegen
def ADD : Instruction {
  let opcode = 1;
  let operands = (ins GPR64, GPR64);
  let results = (outs GPR64);
}

def ADD64 : ADD {
  let operands = (ins GPR64, GPR64);
}
```

### Conditional Definitions

You can use conditional logic in TableGen files to enable or disable certain definitions based on configuration flags:

```tablegen
# If target is X86, define an instruction
# Otherwise, define a generic instruction
# This can be useful when creating a multi-target backend.

#ifdef TARGET_X86
  def X86_ADD : Instruction { ... }
#else
  def Generic_ADD : Instruction { ... }
#endif
```

## Conclusion

LLVM TableGen is a powerful tool for defining and generating machine-level code and target-specific structures. Whether you're working on custom instructions, register classes, or target definitions, TableGen provides a clean and efficient way to manage the complexities of the LLVM backend. By mastering TableGen, you’ll be able to create and customize your target architecture with ease, reducing the effort needed to build and maintain LLVM backends.

### Further Resources

- [LLVM TableGen Documentation](https://llvm.org/docs/TableGen.html)
- [LLVM Developer's Guide](https://llvm.org/docs/DeveloperPolicy.html)
