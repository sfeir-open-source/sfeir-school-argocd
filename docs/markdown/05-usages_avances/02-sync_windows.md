# Le déploiement de resources "dynamiques"
### On peut avoir du drift dans le cluster
- Il arrive que les ressources soient modifiées dans le cluster (drift)
- Deux options
    - Supprimer la propriété dans la resource git (quand c'est possible)
    - Préciser à ArgoCD d'ignorer les changements sur la propriété

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  # Supprimer le nombre de replicas du fichier dans le dépôt git
  # replicas: 1
  template:
    spec:
      containers:
      - image: nginx:1.7.9
        name: nginx
        ports:
        - containerPort: 80
...
```

##==##

# Le déploiement de ressources "dynamiques"
### On peut avoir du drift dans le cluster
- Préciser à ArgoCD d'ignorer les changements pour une application

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
spec:

  ignoreDifferences:
  - group: "apps"
    kind: "Deployment"
    jsonPointers:
    - /spec/replicas

  syncPolicy:
    syncOptions:
    - RespectIgnoreDifferences=true
```

[Ignore difference documentation](https://argo-cd.readthedocs.io/en/stable/user-guide/sync-options/#respect-ignore-difference-configs)
<!-- .element: class="credits" -->