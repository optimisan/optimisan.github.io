---
title: Talking at IIT Bombay's PLACID 2025
description: IIT Bombay's PLACID 2025 is a conference focused on programming languages, compilers, and related topics. I had a great opportunity to present at this event with experts in the field!
pubDate: "April 23, 2025"
tags: [Accounts]
---

PLACID (Programming Languages and Compilers in Industry Day) is a conference organized by IIT Bombay, focusing on programming languages, compilers and related fields. This features a series of talks and discussions from experts in the field, designed to expose students to the latest topics and trends in the PL and compiler domains in industry.

So where do I come in? Last year, I attended this event as a student while I was working as a research intern at IIT Bombay. That was a one-day event where people from AMD presented their work on GPU compilation with OpenMP.
I had approached one of the speakers and got a referral and subsequently a role at their GPU compilation team! And this year, I was fortunate enough to be able to attend the event as a speaker, sharing my work at AMD.

## AMD's talk

Pravin Jagtap (MTS engineer) actually presented the bulk of the content since he
has a lot more experience with the AMDGPU backend. He covered topics like whole-wave-mode operations and challenges to compile for them, how it causes problems in the register allocator and an optimization for atomic operations.
I talked about the new pass manager and how `llc` is finally migrating away from the legacy pass manager.

> If things go well, I would be finishing the migration by the end of this month and might be able to present at the LLVM dev meeting later this year!

## Other talks

I was the youngest speaker of the day, and most of the other people had more experience working in the field than I am old! There were a lot of interesting topics covered, among which I found NVIDIA's and TCS's talks particularly memorable.

With code analysis and LLMs, they convert code to working documentation of a system. For example, consider a system for ordering food at the cafeteria. The documentation would include the steps to be followed by a customer at the ticket machine, with rules like "only employees can access this discount" or "start ticketing after 10 AM". Sometimes documentation like this is incomplete and they generate it from the code of the ticket machine, for example.

This is just how I understood it, and I'll need to rewatch the talk (it's available on YouTube). But here is where they use static analysis to factor out relevant chunks of code so it is minimally runnable (?) and put it through an AI to chrun out the documentation nicely formatted.
