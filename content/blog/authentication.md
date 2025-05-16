title: Let me tell you 'bout authentication
description: 
    In my normal gig, I had to set up service account impersonation for a Cloud
    Run service. Others told me that it would be a perilous journey.
    Nevertheless, I persisted. Read of my sojourn into the word of credentials.
slug: service-account-impersonation
state: unpublished
date: 2025-12-31
tags:
- Python
- Cloud IAM
- Cloud Run

--------------------------------------------------------------------------------

I mean, I _like_ what it does for me. Who is opposed to having secure systems?
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

<!-- RAW content below -- revise before publish

The Samples Validation system (aka 'Kleos') requires authentication for
incoming requests. Without authentication to Kleos, your samples validation
requests from Panoply fail. The recommended way to authenticate to Kleos is to
generate an ID token by impersonating a service account.

**NOTE**: Setting up authentication for users can be a bit tricky; see
[the official documentation for an overview](https://cloud.google.com/docs/authentication/get-id-token#impersonation).

To set up service account impersonation, do the following:

+ Authenticate your own account using the `gcloud` CLI:

  ```sh
  $ gcloud auth application-default login
  ```

+ Set the `GCLOUD_PROJECT` environment variable to the GCP project hosting the
  Kleos instance.
+ Set the GCP project as the current quota project.

  ```sh
  $ gcloud config set project $GCLOUD_PROJECT
  ```

+ [From the GCP project IAM page](https://console.cloud.google.com/iam-admin),
  copy the name of the service account configured to send requests to Kleos.
  The description of the service account should include 'Kleos invoker'.
+ [One time only] Ensure that the service account has invoker access to the
  validation service.

  ```sh
  $ gcloud run services add-iam-policy-binding kleos-service \
    --member='serviceAccount:kleos-invoker@erschmid-test-291318.iam.gserviceaccount.com' \
    --role='roles/run.invoker'
  ```

+ [Once per user] Add yourself as a principal to the service account by running
  the following `gcloud` commands

  - Add yourself as a user of the service account.

    ```sh
    $ gcloud iam service-accounts SERVICE_ACCOUNT_ID \
    --member=user:YOUR_EMAIL_ADDRESS \
    --role=roles/iam.serviceAccountUser
    ```

  - Add the following roles to your principal account's bindings on the service
    account.

    * `roles/iam.serviceAccountTokenCreator`
    * `roles/iam.serviceAccountOpenIdTokenCreator`

    ```sh
    $ gcloud iam service-accounts add-iam-policy-binding SERVICE_ACCOUNT_ID \
    --member=user:YOUR_EMAIL_ADDRESS \
    --role=ROLE
    ```

+ Set your Application Default Credentials to impersonate the service account.
  Note that these credentials are used for all subsequent calls to `gcloud`
  until you deactivate impersonation.

  ```sh
  gcloud config set auth/impersonate_service_account SERVICE_ACCOUNT_ID
  ```

+ When you've finished using Panoply, deactivate service account impersonation.

  ```sh
  gcloud config unset auth/impersonate_service_account
  ```
-->