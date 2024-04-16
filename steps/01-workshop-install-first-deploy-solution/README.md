1. Création du namespace 

```bash
kubectl create namespace argocd
```
<br>

2. Déploiement des composants

via _kubectl_
```bash
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

via _helm_
```bash
helm repo add argo https://argoproj.github.io/argo-helm

helm install my-argocd argo/argo-cd
```
