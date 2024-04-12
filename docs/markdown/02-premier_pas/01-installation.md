<!-- .slide: class="transition bg-pink" -->

<h1 style="margin-bottom: 10px"> Installation</h1>
<div style="width: 200px; height: 10px; background-color: #5155f9"></div>
<br>
<!-- .slide: class="two-column" -->

<div style="font-size: x-large; margin-top: -40px; margin-bottom: 50px;">
<a href="https://argo-cd.readthedocs.io/en/stable/getting_started/">Quick Start</a>
</div>

## Comment on installe ?

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

<br>

3. CLI ArgoCD

```bash
brew install argocd  

curl -sSL -o /usr/local/bin/argocd https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-amd64
chmod +x /usr/local/bin/argocd  
```
```bash
argocd version --client
```

##--##

4. Accès à l'interface Web

```bash
kubectl port-forward svc/argocd-server -n argocd 8080:443
```

<div style="margin-left: 50px;">
    <img class="h-300" src="./assets/images/login.png">
</div>

5. Compte par défaut

   - _username : admin_ 
   - _password : default-password_
   <br>
   <br>
```bash
kubectl get secret -n argocd argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
```
<br>

PS : Le mot de passe peut être modifié
