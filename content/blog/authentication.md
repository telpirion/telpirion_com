title: Let me tell you 'bout authentication
description: 
    In my normal gig, I had to set up service account impersonation for a Cloud
    Run service. Others told me that it would be a perilous journey.
    Nevertheless, I persisted. Read of my sojourn into the word of credentials.
slug: service-account-impersonation
state: unpublished
date: 2025-12-31
tags:
- Go

--------------------------------------------------------------------------------

# Truth time: I hate authentication

I mean, I like what it does for me. Who is opposed to having secure systems?
It's the implementing it part that always gives me heartburn.

Recently, I had to wire up authentication between a web application and a
Cloud Run service. Although the documentation for this part of the Google Cloud
stack is quite good--a testament to the excellent technical writer who wrote
it--I'm still left scratching my head at HOW to do it.

Hence, I created this little checklist to help me (and maybe you too!) out.

## Setting up auth on Google Cloud checklist

This checklist covers step-by-step how to authenticate to a Cloud Run service
using an ID token that impersonates a service account.

+ [ ] Create a service account that has access to your Cloud Run service.

  For me, I created a new service account named after the service--with
  'invoker' added to the name--so that I remember which service account to use.

  