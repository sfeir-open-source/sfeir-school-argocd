<!-- .slide: class="two-column" -->
# Setup declaratif
### Application

```yaml[1-5|6-7|8-9|10|11|13-16|13-32|1-32]
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-app
  namespace: argocd
  finalizers:
    - resources-finalizer.argocd.argoproj.io
  labels:
    name: guestbook
spec:
  project: default

  source:
    repoURL: https://github.com/argoproj/argocd-example-apps.git 
    targetRevision: HEAD
    path: guestbook # git only

    # helm specific config
    chart: chart-name
    helm:
      releaseName: guestbook
      valueFiles:
      - values-prod.yaml

      values: |
        ingress:
          enabled: true
          ...
      valuesObject:
        ingress:
          enabled: true
          ...
```
<!-- .element: class="r-stretch" -->
##--##

```yaml[1-3|5-8|10|12-15|17-20|22-27|29]
    kustomize:
      # Configuration you can have in a kustomization.yaml file
      # like, prefix, sufis, namespace, replicas, etc...

    directory:
      recurse: true
      exclude: 'config.yaml'
      include: '*.yaml'

  sources: [...]

  destination:
    server: https://kubernetes.default.svc
    name: my-kube-cluster
    namespace: guestbook

  # Extra information to show in the Argo CD Application details tab
  info:
    - name: 'Example:'
      value: 'https://example.com'

  syncPolicy:
    automated: # automated sync by default retries failed attempts 5 times with following delays between attempts ( 5s, 10s, 20s, 40s, 80s ); retry controlled using `retry` field.
      prune: true # Specifies if resources should be pruned during auto-syncing ( false by default ).
      selfHeal: true # Specifies if partial app sync should be executed when resources are changed only in target Kubernetes cluster and no git change detected ( false by default ).
      allowEmpty: false # Allows deleting all application resources during automatic syncing ( false by default ).
    syncOptions: [...]
  
  revisionHistoryLimit: 10
```
<!-- .element: class="r-stretch fragment fade-in" -->