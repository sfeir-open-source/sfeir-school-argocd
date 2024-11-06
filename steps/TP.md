# ArgoCD Lab - Hands-On Tutorial

## Table of Contents

- [ArgoCD Lab - Hands-On Tutorial](#argocd-lab---hands-on-tutorial)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Creating Your Kubernetes Cluster](#creating-your-kubernetes-cluster)
  - [Setting Up ArgoCD with Helm](#setting-up-argocd-with-helm)
    - [Step 1: Install Helm](#step-1-install-helm)
    - [Step 2: Create ArgoCD Namespace](#step-2-create-argocd-namespace)
    - [Step 3: Install ArgoCD via Helm](#step-3-install-argocd-via-helm)
    - [Step 4: Expose the ArgoCD Service](#step-4-expose-the-argocd-service)
  - [Repository Operations](#repository-operations)
    - [Connecting to GitHub](#connecting-to-github)
    - [Creating the Pod Configuration File](#creating-the-pod-configuration-file)
  - [Deploying a Pod via the ArgoCD Interface](#deploying-a-pod-via-the-argocd-interface)
    - [Step 1: Access the ArgoCD UI](#step-1-access-the-argocd-ui)
    - [Step 2: Deploy a Simple Pod](#step-2-deploy-a-simple-pod)
    - [Step 3: Explore Commands](#step-3-explore-commands)
    - [Step 4: Enable Auto-Sync for the Pod](#step-4-enable-auto-sync-for-the-pod)
  - [ArgoCD Self-Management](#argocd-self-management)
    - [Creating a Directory and Configurations](#creating-a-directory-and-configurations)
  - [Application with Kustomize](#application-with-kustomize)
    - [Creating the `step_two` Deployment Folder](#creating-the-step_two-deployment-folder)
    - [Kustomize Configuration](#kustomize-configuration)
  - [Multi-Environment Deployment with ApplicationSet](#multi-environment-deployment-with-applicationset)
    - [Setting Up the ApplicationSet](#setting-up-the-applicationset)
    - [Creating Environment-Specific Folders](#creating-environment-specific-folders)
  - [ArgoCD Image Updater](#argocd-image-updater)
    - [Step 1: Installing ArgoCD Image Updater](#step-1-installing-argocd-image-updater)
    - [Step 2: Configuring Applications for Automatic Image Updates](#step-2-configuring-applications-for-automatic-image-updates)
    - [Step 3: Observing Image Updates](#step-3-observing-image-updates)
  - [Wave Synchronization and Synchronization Windows in ArgoCD](#wave-synchronization-and-synchronization-windows-in-argocd)
    - [Step 1: Configure Wave Synchronization](#step-1-configure-wave-synchronization)
      - [Option 1: `sync-wave` Annotation](#option-1-sync-wave-annotation)
      - [Option 2: `hook` Annotation with `PreSync`](#option-2-hook-annotation-with-presync)
    - [Step 2: Set Synchronization Windows](#step-2-set-synchronization-windows)
      - [Example: Deny Synchronization Window](#example-deny-synchronization-window)
  - [Ignoring Differences During Sync in ArgoCD](#ignoring-differences-during-sync-in-argocd)
    - [Ignoring Differences with `ignoreDifferences`](#ignoring-differences-with-ignoredifferences)
      - [Example Configuration](#example-configuration)
    - [Testing in the UI](#testing-in-the-ui)
    - [Notification Service (GitHub)](#notification-service-github)
  - [Setting Up GitHub Notifications with ArgoCD](#setting-up-github-notifications-with-argocd)
    - [Step 1: Create a GitHub App and Generate a Private Key](#step-1-create-a-github-app-and-generate-a-private-key)
    - [Step 2: Configure ArgoCD to Store the GitHub App Private Key](#step-2-configure-argocd-to-store-the-github-app-private-key)
    - [Step 3: Create a ConfigMap for ArgoCD Notifications](#step-3-create-a-configmap-for-argocd-notifications)
    - [Step 4: Add a Notification Subscription to the ApplicationSet](#step-4-add-a-notification-subscription-to-the-applicationset)
    - [Step 5: Test the Configuration](#step-5-test-the-configuration)
  - [Resource Limiting with ArgoCD Projects](#resource-limiting-with-argocd-projects)
    - [Step 1: Modify Your Existing ArgoCD Project](#step-1-modify-your-existing-argocd-project)
    - [Step 2: Testing the Configuration](#step-2-testing-the-configuration)

---

## Introduction

Welcome to the ArgoCD hands-on tutorial! This lab is designed to introduce you to GitOps practices and demonstrate how to deploy applications to Kubernetes using ArgoCD. By the end of this tutorial, you'll be comfortable using ArgoCD for managing Kubernetes applications through Git repositories.

---

## Creating Your Kubernetes Cluster

1. **Access a Kubernetes Playground:**
  - Visit [Play with Kubernetes](https://labs.play-with-k8s.com/) to create a temporary Kubernetes cluster.

2. **Set Up the Master Node:**
  - Add three instances to your cluster.
  - On your master node, execute the following commands in the terminal:

   ```bash
   kubeadm init --apiserver-advertise-address $(hostname -i) --pod-network-cidr 10.5.0.0/16
   ```

   This initializes your Kubernetes cluster, making the master node the control plane.

3. **Install the Network Plugin:**
  - Apply the Kube Router network plugin:

   ```bash
   kubectl apply -f https://raw.githubusercontent.com/cloudnativelabs/kube-router/master/daemonset/kubeadm-kuberouter.yaml
   ```

4. **Join Additional Nodes (if applicable):**
  - If you have additional worker nodes, join them to the master node using:

   ```bash
   kubeadm join <MasterNode-IP>:6443 --token <token> --discovery-token-ca-cert-hash <hash>
   ```

---

## Setting Up ArgoCD with Helm

Now that your Kubernetes cluster is ready, let's set up ArgoCD using Helm.

### Step 1: Install Helm

Helm is a package manager for Kubernetes that simplifies application deployment. Install Helm with the following commands:

```bash
export VERIFY_CHECKSUM=false
curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
chmod 700 get_helm.sh
./get_helm.sh
```

### Step 2: Create ArgoCD Namespace

Create a dedicated namespace for ArgoCD to operate in:

```bash
kubectl create namespace argocd
kubectl config set-context --current --namespace argocd
```

### Step 3: Install ArgoCD via Helm

Add the ArgoCD Helm repository and install ArgoCD with authentication disabled for simplicity during this tutorial:

```bash
helm repo add argo https://argoproj.github.io/argo-helm
helm install my-argocd argo/argo-cd --set-json configs.params='{"server.insecure": "true", "server.disable.auth": "true"}'
```

### Step 4: Expose the ArgoCD Service

Expose the ArgoCD server service using NodePort to access the UI:

```bash
kubectl expose svc my-argocd-server --port=80 --target-port=8080 --type=NodePort --name=argocd-exposed
kubectl get svc argocd-exposed
```

After running these commands, take note of the URL for your machine along with the exposed port. You will use this URL to access the ArgoCD interface.

---

## Repository Operations

### Connecting to GitHub

1. **Create a Git Repository:**
  - Set up a Git repository that will be used for this lab.

2. **Generate an SSH Key:**
  - For secure access, generate an SSH key on your local machine:

   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com" -f ~/.ssh/argo_demo
   ```

3. **Add the SSH Key to GitHub:**
  - Copy your public SSH key and add it to your GitHub account to enable read/write access to the repository.

### Creating the Pod Configuration File

Create a Kubernetes Pod definition file for your first deployment. Save this YAML file in your repository under the path `app/step_one/nginx.yaml`:

```yaml
apiVersion: v1
kind: Pod
metadata:
  labels:
    run: nginx
  name: nginx
spec:
  containers:
  - image: nginx
    name: nginx
    resources: {}
  dnsPolicy: ClusterFirst
  restartPolicy: Always
```

---

## Deploying a Pod via the ArgoCD Interface

### Step 1: Access the ArgoCD UI

Open the ArgoCD UI using the NodePort URL you noted earlier.

### Step 2: Deploy a Simple Pod

1. Navigate to the **Create Application** tab.
2. Specify the repository and path where your Pod configuration file is located, and deploy a basic Pod using the UI.

### Step 3: Explore Commands

- Experiment with the **Synchronization** and **Rollback** options available in the ArgoCD UI.
- Familiarize yourself with real-time deployment management, including editing resources directly within the UI.

### Step 4: Enable Auto-Sync for the Pod

From the UI, enable the auto-sync feature for the Pod. Update your configuration file in `app/step_two/nginx.yaml` with the following content:

```yaml
apiVersion: v1
kind: Pod
metadata:
  labels:
    run: nginx-bis
  name: nginx-bis
spec:
  containers:
  - image: nginx
    name: nginx
    resources: {}
  dnsPolicy: ClusterFirst
  restartPolicy: Always
```

Commit this change to your Git repository and notice that the synchronization is done automatically.

---

## ArgoCD Self-Management

To begin, we'll configure ArgoCD to deploy itself using a configuration stored in Git. This step helps introduce the concept of "self-management," where ArgoCD manages its own deployment configuration via GitOps.

Before moving to code-based deployments, create a new application in the ArgoCD UI that listens to the path `argocd/` in directory mode with automatic synchronization enabled.

### Creating a Directory and Configurations

1. **New Application** in the ArgoCD UI:
  - Create a new application in the ArgoCD UI, pointing it to the path `argocd/` in directory mode.
  - Enable automatic synchronization so that any changes to the `argocd/` directory in Git are automatically applied to the ArgoCD deployment.

2. **Create a new directory** in your Git repository for ArgoCD configurations:
  - Path: `argocd/conf`

3. **Create a YAML file** in this directory to configure ArgoCD as a self-managed application. This YAML will instruct ArgoCD to pull its configuration from the repository and deploy itself to the cluster.

   ```yaml
   apiVersion: argoproj.io/v1alpha1
   kind: Application
   metadata:
     name: argocd
     namespace: argocd
   spec:
     project: default
     sources:
       - chart: argo-cd
         repoURL: https://argoproj.github.io/argo-helm
         targetRevision: 7.6.12
         helm:
           releaseName: my-argocd
           valuesObject:
             configs:
               cm:
                 timeout.reconciliation: 60s
                 kustomize.buildOptions: --enable-helm --load-restrictor LoadRestrictionsNone
               params:
                 server.insecure: true
                 server.disable.auth: true
     destination:
       server: https://kubernetes.default.svc
       namespace: argocd
     syncPolicy:
       syncOptions:
         - CreateNamespace=true
         - PruneLast=true
         - FailOnSharedResource=true
   ```

4. **Explanation of Key Overrides**:
  - The `timeout.reconciliation` and `kustomize.buildOptions` values will adjust ArgoCD’s default settings to enable Helm for Kustomize, as well as set a 60-second reconciliation timeout.
  - These configurations will apply automatically when ArgoCD synchronizes itself with the specified Git repository.

---

## Application with Kustomize

This section guides you through deploying a simple application (using Kustomize) and managing its configuration in Git.

### Creating the `step_two` Deployment Folder

1. Create a directory in your Git repository to store application configurations:
  - Path: `app/step_two`

2. **Create YAML Files for the Deployment**:
  - **`nginx.yaml`**: This is the base configuration for an NGINX Pod.
  - **`nginx-bis.yaml`**: An additional configuration for a second NGINX Pod.

   ```yaml
   apiVersion: v1
   kind: Pod
   metadata:
     labels:
       run: nginx-bis
     name: nginx-bis
   spec:
     containers:
     - image: nginx
       name: nginx
       resources: {}
     dnsPolicy: ClusterFirst
     restartPolicy: Always
   ```

### Kustomize Configuration

1. In the `app/step_two` directory, create a **Kustomization YAML file** to apply the necessary configurations.

   ```yaml
   apiVersion: kustomize.config.k8s.io/v1beta1
   kind: Kustomization
   resources:
     - nginx.yaml
     - nginx-bis.yaml
   ```

2. **Commit and Push** the `step_two` folder and its contents to the repository.

3. **Deploy the Application via ArgoCD**:
  - Once synchronized, this application will automatically deploy the resources within `app/step_two`.

---

## Multi-Environment Deployment with ApplicationSet

Using `ApplicationSet`, we will configure multi-environment deployments (e.g., dev, preprod, and prod). This setup will allow you to deploy the same base application configuration across environments with slight variations, such as environment-specific labels.

### Setting Up the ApplicationSet

1. **Create an `ApplicationSet` Configuration File** in `argocd/applications`.
  - This file will define the paths for each environment and configure automatic synchronization for some environments.

   ```yaml
   apiVersion: argoproj.io/v1alpha1
   kind: ApplicationSet
   metadata:
     name: "appset-api"
     namespace: argocd
   spec:
     goTemplate: true
     generators:
       - list:
           elements:
             - path: "app/api/dev"
               env: "dev"
               autoSync: true
             - path: "app/api/itg"
               env: "itg"
               autoSync: false
             - path: "app/api/prod"
               env: "prod"
               autoSync: false
     template:
       metadata:
         namespace: "api-{{.env}}"
         name: "app-api-{{.env}}"
         labels:
           name: "api-{{.env}}"
       spec:
         project: api-project
         source:
           repoURL: <url_repo_git>
           targetRevision: "main"
           path: "{{.path}}"
         destination:
           namespace: "api-{{.env}}"
           server: https://kubernetes.default.svc
         syncPolicy:
           managedNamespaceMetadata:
             labels:
               argo-deployed: "true"
           syncOptions:
             - CreateNamespace=true
             - PruneLast=true
             - FailOnSharedResource=true

     templatePatch: |
       {{- if .autoSync }}
         spec:
           syncPolicy:
             automated: {}
       {{- end }}
   ```

### Creating Environment-Specific Folders

To enable deployment to multiple environments, create the following folders in the repository:

- `app/api/_base`
- `app/api/dev`
- `app/api/preprod`
- `app/api/prod`

Each environment folder will contain a Kustomization file that pulls from the base configurations and adds specific environment labels.

1. **Base Configuration File**: Place this file in `app/api/_base/nginx.yaml`.

   ```yaml
   apiVersion: v1
   kind: Pod
   metadata:
     labels:
       run: nginx
     name: nginx
   spec:
     containers:
     - image: public.ecr.aws/nginx/nginx:1.26
       name: nginx
       resources: {}
     dnsPolicy: ClusterFirst
     restartPolicy: Always
   ```

2. **Environment-Specific Files**:
  - Create a `kustomization.yaml` file in each environment folder (e.g., `app/api/dev/kustomization.yaml`) with the following content:

   ```yaml
   apiVersion: kustomize.config.k8s.io/v1beta1
   kind: Kustomization
   resources:
     - ../_base/nginx.yaml
   patches:
     - target:
         name: nginx
       path: nginx-overlays.yaml
   ```

3. **Overlay File for Labels**: Create an overlay file in each environment folder (e.g., `app/api/dev/nginx-overlays.yaml`).

   ```yaml
   apiVersion: v1
   kind: Pod
   metadata:
     labels:
       env: dev  # Change this label to match the environment (e.g., dev, preprod, prod)
     name: nginx
   ```

4. **Commit and Push All Changes** to the Git repository.

We will notice that the first one will synchronize by itself, while the preprod and the prod will need a manual sync action as configured

---

## ArgoCD Image Updater

In this section, you'll learn how to set up **ArgoCD Image Updater** to automatically monitor and update container images in your deployments. ArgoCD Image Updater periodically checks container image repositories and applies updates to your Git repository, streamlining the process of keeping images up-to-date without manual intervention.

### Step 1: Installing ArgoCD Image Updater

1. **Add ArgoCD Image Updater Configuration File**:
  - Create a new YAML file in `argocd/conf` to install ArgoCD Image Updater as a Helm chart. This configuration will monitor your applications and update image versions directly in the Git repository based on specified parameters.

   ```yaml
   apiVersion: argoproj.io/v1alpha1
   kind: Application
   metadata:
     name: argocd-image-updater
     namespace: argocd
   spec:
     project: default
     sources:
       - chart: argocd-image-updater
         repoURL: https://argoproj.github.io/argo-helm
         targetRevision: 0.11.0
         helm:
           valuesObject:
             config:
               registries:
                 - name: ECR
                   api_url: https://public.ecr.aws
                   prefix: public.ecr.aws
                   ping: yes
                   default: true
                   insecure: no
             extraArgs:
               - --interval
               - 10s
     destination:
       server: https://kubernetes.default.svc
       namespace: argocd
     syncPolicy:
       syncOptions:
         - CreateNamespace=true
         - PruneLast=true
         - FailOnSharedResource=true
   ```

  - This configuration installs ArgoCD Image Updater and specifies that it will check the ECR (Elastic Container Registry) at `https://public.ecr.aws` for new image versions.
  - The `extraArgs` option sets the image check interval to 10 seconds for demonstration purposes (this interval can be increased in production).

2. **Deploy ArgoCD Image Updater**:
  - Commit the configuration file to your repository, and then deploy it through the ArgoCD application. Once synchronized, ArgoCD will deploy the image updater as a new application in your cluster.

### Step 2: Configuring Applications for Automatic Image Updates

After setting up the ArgoCD Image Updater, configure your application annotations to enable automatic image updates. This configuration specifies how the updater should handle updates for each application.

1. **Add Annotations to Enable Image Update Tracking**:
  - In your application's configuration file (e.g., `app/api/dev/kustomization.yaml`), add the following annotations to specify the update method, Git branch, and image repository to monitor:

   ```yaml
   template:
     metadata:
       annotations:
         argocd-image-updater.argoproj.io/write-back-method: git
         argocd-image-updater.argoproj.io/write-back-target: kustomization
         argocd-image-updater.argoproj.io/git-branch: "main"
         argocd-image-updater.argoproj.io/image-list: "image=public.ecr.aws/nginx/nginx"
         argocd-image-updater.argoproj.io/update-strategy: semver
         #argocd-image-updater.argoproj.io/image.allow-tags: "regexp:*$"
         argocd-image-updater.argoproj.io/force-update: "true"

         
   ```

  - **Explanation of Annotations**:
    - `write-back-method: git`: Instructs the image updater to make changes directly to the Git repository.
    - `write-back-target: kustomization`: Specifies that the target file for updates is `kustomization.yaml`.
    - `git-branch: main`: Specifies that changes will be committed to the `main` branch.
    - `image-list`: Sets the container image repository to track.
    - `force-update: true`: Ensures that updates are applied even if the current image is outdated.

2. **Commit and Deploy**:
  - Commit the updated application configuration to your Git repository.
  - Once ArgoCD synchronizes the application, the ArgoCD Image Updater will start monitoring the specified image and automatically make a commit to update the image tag when a new version is available.

### Step 3: Observing Image Updates

After configuration:

1. **Monitor Image Updater**:
  - ArgoCD Image Updater will periodically check for newer versions of the specified image (`public.ecr.aws/nginx/nginx`).
  - Upon detecting a new version, it will update the `kustomization.yaml` file for each environment with the new image tag:

   ```yaml
   images:
   - name: public.ecr.aws/nginx/nginx
     newTag: 1.27.2
   ```

2. **Review Commit Changes**:
  - Verify the update by checking the commit history in your Git repository. The image updater will automatically commit any changes, reflecting the updated image tag in the respective environment folders.

---

## Wave Synchronization and Synchronization Windows in ArgoCD

ArgoCD's **Wave Synchronization** and **Synchronization Windows** help manage deployments by controlling the order of synchronization and setting time-based restrictions.

### Step 1: Configure Wave Synchronization

#### Option 1: `sync-wave` Annotation

```yaml
metadata:
  annotations:
    argocd.argoproj.io/sync-wave: "1"
```

- **Purpose**: Defines the order of resource synchronization. Lower numbers sync first. Use for dependencies (e.g., `sync-wave: "0"` for config maps, `sync-wave: "1"` for services).

#### Option 2: `hook` Annotation with `PreSync`

```yaml
metadata:
  annotations:
    argocd.argoproj.io/hook: PreSync
```

- **Purpose**: Ensures critical tasks (e.g., migrations) run before the main synchronization. Use `PreSync`, `Sync`, or `PostSync` to control timing.

### Step 2: Set Synchronization Windows

**Synchronization Windows** specify when synchronizations are allowed or denied, adding deployment governance.

#### Example: Deny Synchronization Window

```yaml
apiVersion: argoproj.io/v1alpha1
kind: AppProject
metadata:
  name: api-project
spec:
  syncWindows:
  - kind: deny
    schedule: '0 10 * * *'
    timeZone: "Europe/Amsterdam"
    duration: 10h
    applications:
      - '*-prd'
      - '*-itg'
    manualSync: false
```

- **Fields**:
  - **`kind: deny`**: Prevents syncs during the specified window.
  - **`schedule` and `duration`**: Daily block from 10:00 to 20:00 AM (in Europe/Amsterdam timezone).
  - **`applications`**: Applies to `-prd` and `-itg` apps.
  - **`manualSync: false`**: Blocks even manual syncs during this time.

## Ignoring Differences During Sync in ArgoCD

ArgoCD can be configured to ignore specific configuration differences during synchronization. This is useful when certain fields or settings are expected to differ between the live state and the desired state but don’t require updates.

### Ignoring Differences with `ignoreDifferences`

Add the `ignoreDifferences` configuration to your **Application** or **ApplicationSet** to specify which parts of the spec to ignore during sync.

#### Example Configuration

```yaml
spec:
  ignoreDifferences:
    - jsonPointers:
        - /spec/syncPolicy
```

- **`jsonPointers`**: Specifies the paths in the manifest to ignore, using JSON pointers. In this example, ArgoCD ignores any differences in `/spec/syncPolicy`.

### Testing in the UI

You can experiment by toggling synchronization in the ArgoCD UI. When this configuration is active, ArgoCD won’t detect changes for ignored fields even if they differ between the source and the live state.

## Setting Up GitHub Notifications with ArgoCD

Follow these steps to configure ArgoCD to send deployment notifications to GitHub through a GitHub App. This setup enables a check on GitHub commits, confirming successful ArgoCD deployments.

### Step 1: Create a GitHub App and Generate a Private Key

1. **Create a GitHub App**:
  - Go to your GitHub organization's settings and create a new GitHub App.
  - Set permissions for `commit statuses` and `repository contents` (read/write access).
  - Take note of the **App ID** and **Installation ID** once you’ve installed the app on the desired repositories.

2. **Generate a Private Key** for this GitHub App and save it locally, as you’ll need it for the ArgoCD configuration.

### Step 2: Configure ArgoCD to Store the GitHub App Private Key

1. Modify your ArgoCD configuration to include a new secret containing the GitHub private key:

   ```yaml
   notifications:
     cm:
       create: false
     secret:
       items:
         github-privateKey: |
           <paste_your_private_key_here>
   ```

2. Update this value in the Helm chart or configuration files used to deploy ArgoCD to add the secret.

### Step 3: Create a ConfigMap for ArgoCD Notifications

Next, create a `ConfigMap` that configures the GitHub service, notification templates, and trigger conditions for successful syncs:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-notifications-cm
  namespace: argocd
data:
  service.github: |
    appID: <your-app-id>
    installationID: <your-installation-id>
    privateKey: $github-privateKey

  template.app-deployed: |
    message: |
      Application {{.app.metadata.name}} is now running a new version of deployment manifests.
    github:
      repoURLPath: "{{.app.spec.source.repoURL}}"
      revisionPath: "{{.app.status.operationState.syncResult.revision}}"
      status:
        state: success
        label: "continuous-delivery/{{.app.metadata.name}}"
        targetURL: "https://argocd.example.com/applications/{{.app.metadata.name}}?operation=true"

  trigger.on-sync-succeeded: |
    - description: Application syncing has succeeded
      send:
      - app-deployed
      when: app.status.operationState.phase in ['Succeeded']
```

- **Parameters Explanation**:
  - **appID** and **installationID**: These connect the GitHub App to ArgoCD.
  - **privateKey**: Uses the GitHub App’s private key for secure access.
  - **template.app-deployed**: Defines the notification format and includes a URL to view the application in ArgoCD.
  - **trigger.on-sync-succeeded**: Triggers a notification when an application’s sync operation is successful.

### Step 4: Add a Notification Subscription to the ApplicationSet

Add a subscription annotation to the `ApplicationSet` (or application) you want to monitor. Here’s an example for an `ApplicationSet` named `appset-api`:

```yaml
metadata:
  annotations:
    notifications.argoproj.io/subscribe.on-sync-succeeded.github: ""
```

### Step 5: Test the Configuration

1. Commit and push the changes to your repository.
2. ArgoCD should automatically trigger a sync for the modified applications.
3. After the sync completes successfully, a GitHub check will appear on the commit, indicating the deployment status based on your configuration.

Now, you’ll receive GitHub checks on the commits related to successful deployments, confirming that your applications are in sync and up to date.

## Resource Limiting with ArgoCD Projects

In this section, we'll enhance your existing **ArgoCD Project** by adding resource restrictions to ensure that applications depending on this project cannot deploy `Service` resources. This exercise will demonstrate how to enforce governance and control over your deployments.

### Step 1: Modify Your Existing ArgoCD Project

1. **Open Your Existing Project Configuration**:
   Locate your existing `AppProject` YAML file that you've created previously.

2. **Add Resource Restrictions**:
   Update the `clusterResourceWhitelist` to allow only specific resource kinds (e.g., `Deployment` and `Pod`). Here’s the updated configuration:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: AppProject
metadata:
  name: api-project
spec:
  description: Project bringing together all security configurations of API applications
  sourceRepos:
    - <git_repo_url>
  destinations:
    - namespace: "api-dev"
      server: "https://kubernetes.default.svc"
    - namespace: "api-itg"
      server: "https://kubernetes.default.svc"
    - namespace: "api-prd"
      server: "https://kubernetes.default.svc"
  clusterResourceWhitelist:
    - group: apps
      kind: Deployment         # Allow Deployment resources
    - group: ""
      kind: Pod                # Allow Pod resources
  orphanedResources:
    warn: true
  syncWindows:
  - kind: deny
    schedule: '0 10 * * *'
    timeZone: "Europe/Amsterdam"
    duration: 1h
    applications:
      - '*-prd'
      - '*-itg'
    manualSync: false
    clusters:
      - https://kubernetes.default.svc
```

### Step 2: Testing the Configuration

1. **Deploy Applications**: Ensure that you have applications that are part of the `appset-api` application set and are configured to deploy `Service` resources.

2. **Verify Deployment**:
  - Attempt to deploy an application that tries to create a `Service`. This deployment should fail due to the restrictions you have applied in the `AppProject`.

3. **Expected Outcome**:
  - You should see an error message indicating that the deployment of the `Service` resource is not permitted. This confirms that your resource restrictions are functioning correctly, preventing any application within the `api-project` from deploying `Service` resources.
