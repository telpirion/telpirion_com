title: Learning the Agent Development Kit
description: 
    Recently, Google released an Agent Development Kit (ADK) to assist
    developers when creating agentic generative AI applications. Here I kick the
    tires on the ADK to see what it's all about.
slug: service-account-impersonation
state: unpublished
date: 2025-12-31
tags:
- Python
- ADK
- GenAI

--------------------------------------------------------------------------------

# Learning Gemini Agent Development Kit (ADK)

Recently, Google released an
[Agent Development Kit (ADK)](https://google.github.io/adk-docs/)
to help developers create "agentic" generative AI applications quickly. My
curiosity piqued, I had to try it out. The question I yearn to answer: can the
ADK help me to create a Google Cloud code sample?

You can see
[the results of my efforts here](https://github.com/telpirion/LearningADK).
I'm using the
[quickstart](https://google.github.io/adk-docs/get-started/quickstart/#set-up-the-model)
to begin.

+ First observation: the tutorial says to use `echo` to write code in the
  '__init__.py' file. This ... is weird.

+ Next observation: I attempted to get the weather in Athens, Greece, but the
  system tells me that Athens is not available. Huh. The docs say to try
  Paris or New York City. I'll try those next.

+ No luck with New York City or Paris. I wonder if there's a service that I
  need to enable for this to work?

+ Looking at the code, the prompt has to be _exactly_ 'new york'. I would
  consider this a bug in the sample.

After experiencing the quickstart, I'm going to try out the
[multi-agent team tutorial](https://google.github.io/adk-docs/tutorials/agent-team/).
The tutorial has a handy
[Colab notebook]()
that I'll give a try.

+ The notebook and doc both say that this example expands on the quickstart.
  A quick glance at the directions reveals that this doesn't use the same
  project structure as what was built previously.
+ This notebook also assumes that I want a multi-LLM system, which I don't. I
  guess I'm going to need to start customizing.

With that in mind, I should figure out what I want my tool-using agents to do.

+ **Goal**: Write a Node.js code sample that gets a secret from Google Cloud
  Secret Manager.
+ **Steps**:
  1. Download the Secret Manager proto files from GitHub. I'm going to use
     a retrieval-augmented grounding (RAG) approach to writing this sample.
     Getting the proto files will be my first tool.
  2. Generate a new Node.js code sample given the user prompt and the grounding
     context.
  3. Evaluate the quality of the code sample. If the quality is low, then
     return to step #2. This evaluation step will be my second tool.
  4. Create agents for each tool. Reading the docs, it looks like the pattern
     for this application is to have a root agent that handles orchestration
     and a series of tool-specific agents.

With these in mind, let me see how well & how quickly I can achieve my goal.

One thing I don't like about the design of this tutorial is how all of the
code is all in the global namespace. Maybe I'm old school but I prefer to have
my code encapsulated in some kind of `main()` function.

Another thing I don't particularly care for is how _wordy_ this tutorial is.
There are comments all over the place telling me how to configure this code
for various edge cases. I really just want the **golden path** for creating
an agentic sample -- I don't need to know all of the potential options for
configuring my code.

<!-- RAW content below -- revise before publish

Pros:

+ Explicit separation of concerns for different agents & tools.
+ Configurable model settings for individual tools/agents

Cons:

+ Non-deterministic delegation of tasks, esp. evaluation
  - Couldn't get the evaluation agent to run WITHOUT explicitly telling the
    root agent to evaluate the sample.
+ Orchestration is handled by the orchestration LLM rather than an explicit
  chain
+ Confusing documentation
+ Only available in Python, which is not optimal for the team
+ Default logging to /tmp files -- traces not available. Genkit's traces are
  much more user-friendly
+ Unclear how to pass data into tools. Genkit's type definitions make it
  much easier to configure inputs & outputs.
  - In fact, it isn't clear that data IS being passed to the code generation
    agent.
+ Adding new tools to the multi-agent team requires adding new entries to the
  root agent prompt
+ Orchestration fails if return type of a tool is not a primitive data type.
+ LLM / AI configuration is imperative rather than declarative. Genkit allows
  us to bundle prompts & LLM configurations into a single prompt file.

tl;dr: If I wanted to write a pure Pythonic orchestration application, I would
use Langchain. The ADK obscures parts of the orchestration that I want to see
(traces, inputs and outputs) but forces me to think about sessions, runners,
async tasks, etc.

-->