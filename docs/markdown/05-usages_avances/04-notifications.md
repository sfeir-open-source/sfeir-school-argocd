<!-- .slide: class="transition bg-pink" -->

<h1 style="margin-bottom: 10px"> Argo Notifications </h1>
<div style="width: 200px; height: 10px; background-color: #5155f9"></div>
<br>
<!-- .slide: class="two-column" -->

## Mise en place

Installation 
```bash
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj-labs/argocd-notifications/release-1.0/manifests/install.yaml
```
```yaml
argocd-notifications-controller-6c5cd7f5c8-6fx9v    1/1     Running   0          40s
```
<br>

Installation des triggers & templates
```bash
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj-labs/argocd-notifications/release-1.0/catalog/install.yaml
```
<br>

## Services de notification

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: argocd-notifications-secret
stringData:
  email-username: $EMAIL_USER
  email-password: $PASSWORD
type: Opaque
```

<br>

<div style="justify-content: center; display: flex; flex-flow: wrap; gap: 80px;">
  <div style="text-align: center; width: fit-content">
    <img class="h-100" src="./assets/images/teams.png">
  </div>
  <div style="text-align: center; width: fit-content">
    <img class="h-100" src="./assets/images/github.png">
  </div>
  <div style="text-align: center; width: fit-content">
    <img class="h-100" src="./assets/images/slack.png">
  </div>
  <div style="text-align: center; width: fit-content">
    <img class="h-100" src="./assets/images/grafana.png">
  </div>
  <div style="text-align: center; width: fit-content">
    <img class="h-100" src="./assets/images/rocketchat.png">
  </div>
</div>

##--##

<h2 style="font-size:1em; margin-bottom:15px;">Utilisation</h2>

- Triggers

```yaml[1-4|5-6|7-12]
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-notifications-cm
data:
  trigger.sync-operation-change: |
    - when: app.status.operationState.phase in ['Succeeded']
      send: [github-commit-status]
    - when: app.status.operationState.phase in ['Error', 'Failed']
      send: [app-sync-failed, github-commit-status]
```

<br>

- Subscriptions

```yaml
notifications.argoproj.io/subscribe.<trigger>.<service>: <recipient>
```

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  annotations:
    notifications.argoproj.io/subscribe.on-sync-succeeded.slack: my-channel1;my-channel2
```

<br>

- Templates

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-notifications-cm
data:
  template.my-custom-template-slack-template: |
    message: |
      Application {{.app.metadata.name}} sync is {{.app.status.sync.status}}.
      Application details: {{.context.argocdUrl}}/applications/{{.app.metadata.name}}.
```




