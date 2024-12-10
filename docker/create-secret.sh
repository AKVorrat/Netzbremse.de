#!/bin/bash 

htpasswd -c auth netzbremse

kubectl create secret -n netzbremse generic basic-auth --from-file=auth --dry-run=client -o yaml > secret.ymlw