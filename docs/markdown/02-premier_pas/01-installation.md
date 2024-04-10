<!-- .slide: class="transition bg-pink" -->

<h1 style="margin-bottom: 10px"> Installation</h1>
<div style="width: 200px; height: 10px; background-color: #5155f9"></div>
<br>
<!-- .slide: class="two-column" -->

## Comment on installe ?

https://argo-cd.readthedocs.io/en/stable/getting_started/

```yaml
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

Possibilité de ne pas avoir l'interface et de tout gérer en CLI avec le CLI _argocd_
```bash
brew install argocd
```

Possibilité de le faire en Helm avec les values qui nous permettent de configurer très facilement (on le fera par la suite dans les prochains TP)

On a pas encore d'ingress donc on port-forward
```bash
kubectl port-forward svc/argocd-server -n argocd 8080:443
```

Compte par défaut 
username: admin
password: 
```bash
kubectl get secret -n argocd argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
```

On a la possibilité de modifier le mot de passe soit en modifiant le secret / ou values Helm / ou CLI

Ducoup maintenant on a argoCD qui est déployé, on peut donc utiliser l'interface ou le CLI


##--##
<br>
<br>
<br>
<br>
