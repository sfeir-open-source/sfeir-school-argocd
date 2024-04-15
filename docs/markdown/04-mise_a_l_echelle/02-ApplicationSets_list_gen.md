<!-- .slide: class="with-code max-height"-->
# ApplicationSet avec générateur liste
### Définition
```yaml [1-4|5,6,11|6-10|11-20|13,17,19]
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: my-app
spec:
    generators:
    - list:
        elements:
        - env: dev
        - env: prd
    template:
        metadata:
            name: 'my-app-{{.env}}'
        spec:
            source:
                repoURL: "https://github.com/myorg/myapp"
                path: '{{.env}}/'
            destination:
                server: 'cluster-{{.env}}'
                namespace: my-app
```

[Générateur liste documentation](https://argo-cd.readthedocs.io/en/stable/operator-manual/applicationset/Generators-List/)
<!-- .element: class="credits" -->

##==##
<!-- .slide: class="two-column"-->
[Générateur liste documentation](https://argo-cd.readthedocs.io/en/stable/operator-manual/applicationset/Generators-List/)
<!-- .element: class="credits" -->
# Application dev générée
```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
    name: 'my-app-dev'
spec:
    source:
    repoURL: "https://github.com/myorg/myapp"
    path: 'dev/'
    destination:
    server: 'cluster-dev'
    namespace: my-app
```

##--##
# Application prd générée
```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
    name: 'my-app-prd'
spec:
    source:
    repoURL: "https://github.com/myorg/myapp"
    path: 'prd/'
    destination:
    server: 'cluster-prd'
    namespace: my-app
```
