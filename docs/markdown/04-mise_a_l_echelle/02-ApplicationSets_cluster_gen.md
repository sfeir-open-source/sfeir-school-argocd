<!-- .slide: class="with-code max-height"-->
# Les clusters dans ArgoCD
### Définition
```yaml [1|2-5|6-8|9-10|1-21]
kind: Secret
data:
  config: "{'tlsClientConfig':{'insecure':false}}"
  name: "region-1-dev"
  server: "https://x.x.x.x/"
metadata:
  labels:
    argocd.argoproj.io/secret-type: cluster
    custom-label/env: dev
    custom-label/region: region-1
---
kind: Secret
data:
  config: "{'tlsClientConfig':{'insecure':false}}"
  name: "region-2-dev"
  server: "https://y.y.y.y/"
metadata:
  labels:
    argocd.argoproj.io/secret-type: cluster
    custom-label/env: dev
    custom-label/region: region-2
```

[Générateur cluster documentation](https://argo-cd.readthedocs.io/en/stable/operator-manual/applicationset/Generators-Cluster/)
<!-- .element: class="credits" -->

##==##
<!-- .slide: class="with-code max-height"-->
# ApplicationSet utilisant le générateur cluster
### Définition
```yaml [6|7-12|8-10|11-12|14-22]
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: my-app
spec:
    generators:
    - cluster:
        selector:
          matchLabels:
            custom-label/env: dev
        values:
          region: '{{ .metadata.labels.region }}'
    template:
        metadata:
            name: 'my-app-dev-{{.values.region}}'
        spec:
            source:
                repoURL: "https://github.com/myorg/myapp"
                path: 'dev/'
            destination:
                server: '{{.server}}'
                namespace: my-app-dev
```

[Générateur cluster documentation](https://argo-cd.readthedocs.io/en/stable/operator-manual/applicationset/Generators-Cluster/)
<!-- .element: class="credits" -->

##==##
<!-- .slide: class="two-column"-->
# Application région 1
[Générateur cluster documentation](https://argo-cd.readthedocs.io/en/stable/operator-manual/applicationset/Generators-Cluster/)
<!-- .element: class="credits" -->
```yaml
metadata:
    name: 'my-app-dev-region-1'
spec:
    source:
        repoURL: "https://github.com/myorg/myapp"
        path: 'dev/'
    destination:
        server: 'http://x.x.x.x'
        namespace: my-app-dev
```
##--##
# Application région 2
```yaml
metadata:
    name: 'my-app-dev-region-2'
spec:
    source:
        repoURL: "https://github.com/myorg/myapp"
        path: 'dev/'
    destination:
        server: 'http://y.y.y.y'
        namespace: my-app-dev
```