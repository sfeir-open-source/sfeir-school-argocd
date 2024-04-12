<!-- .slide: class="with-code max-height"-->
# Utilisation du générateur Git
## Dépôt git à déployer
```
└──deploy
    ├── micro-service-1
    │   ├── kustomization.yaml
    │   └── deployment.yaml
    └── micro-service-2
        ├── Chart.yaml
        ├── README.md
        ├── requirements.yaml
        └── values.yaml
```

[Générateur git documentation](https://argo-cd.readthedocs.io/en/stable/operator-manual/applicationset/Generators-Git/)
<!-- .element: class="credits" -->

##==##
<!-- .slide: class="with-code max-height"-->
# Générateur git exemple
```yaml [6-11|13-22]
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: my-app
spec:
    generators:
      - git:
          repoURL: https://github.com/myorg/myapp.git
          revision: HEAD
          directories:
          - path: deploy/*
    template:
      metadata:
          name: '{{.path.basename}}'
      spec:
          source:
              repoURL: "https://github.com/myorg/myapp"
              path: '{{.path.path}}'
          destination:
              server: 'http://kubernetes.default.svc'
              namespace: '{{ .path.basename }}'
```

[Générateur git documentation](https://argo-cd.readthedocs.io/en/stable/operator-manual/applicationset/Generators-Git/)
<!-- .element: class="credits" -->

##==##
<!-- .slide: class="two-column-layout"-->
# Générateur git résultat

[Générateur git documentation](https://argo-cd.readthedocs.io/en/stable/operator-manual/applicationset/Generators-Git/)
<!-- .element: class="credits" -->
##--##
Micro service 1
```yaml
metadata:
    name: 'micro-service-1'
spec:
    source:
        repoURL: "https://github.com/myorg/myapp"
        path: 'deploy/micro-service-1'
    destination:
        server: 'http://kubernetes.default.svc'
        namespace: 'micro-service-1'
```
##--##
Micro service 2
```yaml
metadata:
    name: 'micro-service-2'
spec:
    source:
        repoURL: "https://github.com/myorg/myapp"
        path: 'deploy/micro-service-2'
    destination:
        server: 'http://kubernetes.default.svc'
        namespace: 'micro-service-2'
```
##==##
# Générateur git, autres options
- Exclure des répertoires en precisant des "paths" avec `exclude:true`
- Possibilité d'ajouter des values (cf. générateur cluster)
- `files` au lieu de `directories, qui ira chercher des fichiers de configuration (json) avec des paires de clef/valeur pour générer les application
  - exemple, pour aller chercher les fichiers de configuration d'environnements différents:
  ```
  /deploy
      ├── dev
      |   └── config.json
      └── prd
          └── config.json
  ```
  ```yaml
  files:
    - path: "deploy/**/config.json"
  ```