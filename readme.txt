Pre-requisites you must have Docker, Kubernetes, Node.Js in Ubuntu or macos or in windows docker desktop or docker installed in wsl2 ubuntu and stripe account.

For Installation of Docker, Kubernetes, Node.Js and other things inside WSL2 Ubuntu without using Docker Desktop, you can follow steps in my blog post from below Url

url - https://sulekh95.hashnode.dev/how-to-install-docker-and-kubernetes-in-wsl2-ubuntu-20046-lts-without-using-docker-desktop-in-windows-10

Clone and use npm install for all microservices

make sure to use your <dockerhub-name/service-name> in infra/k8s yaml files.

Push all services on Docker hub

Publish "common" dir or folder on npm.

For auth service create a kubernetes secret for JWT

For Payment service create a Kubernetes Secret for Stripe

Use Skaffold dev to run microservices.