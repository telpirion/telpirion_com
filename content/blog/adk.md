title: Learning the Agent Development Kit
description: 
    Recently, Google released an Agent Development Kit (ADK) to assist
    developers when creating agentic generative AI applications. Here I kick the
    tires on the ADK to see what it's all about.
slug: getting-started-with-google-agent-development-kit-adk
image: https://google.github.io/adk-docs/assets/agent-development-kit.png
state: published
date: 2025-05-30
tags:
- Python
- ADK
- GenAI
- Colab

--------------------------------------------------------------------------------

Recently, Google released an [Agent Development Kit (ADK)][adk], a new framework
to help developers create "agentic" generative AI applications quickly. My
curiosity piqued, I had to try it out.

You can see [the results of my efforts here][my-adk-repo]. I'm using the
[quickstart][quickstart] to begin. In a future blog post I will try to build
an ADK-powered system that uses a [Runner][runner] to generate a code sample.

Let's see how this goes!

+ I love that this quickstart begins by showing me what the project directory
  for my code should look like. I appreciate that! (I'm a sucker for good
  documentation.)

+ It's interesting--and useful--that the ADK includes both a [CLI][adk-cli] and
  [web UI][adk-web-ui] to help me learn the platform. The quickstart uses the
  the CLI to run the agent that I'm building.

+ The tutorial says to use `echo` to write code in the `__init__.py` file. This 
  seems like an odd choice. There's a note telling Windows users to just open 
  up the file in an IDE and edit there, which is what I would do anyway. So I'll
  just do that ...

+ I attempted to get the weather in Athens, Greece, but the
  agent tells me that Athens is not available. Huh. The docs say to try
  Paris or New York City. I'll try those next.
  
+ Looking closer at the code, the code is using a hardcoded list of cities
  rather than a live service. That makes sense. It looks like I need to ask for
  _exactly_ "new york" to get a response.

My successful attempt to get the weather in "new york" is shown in the
following snippet.

```sh
adk run quickstart
Log setup complete: /var/folders/zb/410jc5c93md11jlkxd6hpm0w00b1dc/T/agents_log/agent.20250529_164324.log
To access latest log: tail -F /var/folders/zb/410jc5c93md11jlkxd6hpm0w00b1dc/T/agents_log/agent.latest.log
Running agent weather_time_agent, type exit to exit.
[user]: what is the weather in new york?
[weather_time_agent]: OK. The weather in New York is sunny with a temperature of 25 degrees Celsius (77 degrees Fahrenheit).

[user]: Thank you!
[weather_time_agent]: You're welcome! Is there anything else I can help you with?

[user]: Nope! I'm going to exit now
[weather_time_agent]: Goodbye!

[user]: exit

```
<figure><i>Figure 1. The ADK quickstart in action. Yes, I believe in being kind
to our AI friends.</i></figure><br/>

After completing the quickstart, I see that there is a more complex
[multi-agent team tutorial][multi-agent]. The tutorial has a handy
[Colab notebook][adk-colab] that I could try.

However, I'm on a mission to create a code sample, so I'll skip the multi-agent
tutorial for now. [Tune in next week as I build a code generation system!][next]


[adk]: https://google.github.io/adk-docs/
[adk-colab]: https://colab.research.google.com/github/google/adk-docs/blob/main/examples/python/tutorial/agent_team/adk_tutorial.ipynb
[adk-cli]: https://google.github.io/adk-docs/get-started/about/#core-concepts
[adk-web-ui]: https://google.github.io/adk-docs/get-started/about/#core-concepts
[loop-agent]: https://google.github.io/adk-docs/agents/workflow-agents/loop-agents/
[multi-agent]: https://google.github.io/adk-docs/tutorials/agent-team/
[my-adk-repo]: https://github.com/telpirion/LearningADK
[next]: /blog/building-code-generation-system-with-adk
[quickstart]: https://google.github.io/adk-docs/get-started/quickstart/
[runner]: https://google.github.io/adk-docs/api-reference/python/google-adk.html#google.adk.runners.Runner
[sequential-agent]: https://google.github.io/adk-docs/agents/workflow-agents/sequential-agents/
