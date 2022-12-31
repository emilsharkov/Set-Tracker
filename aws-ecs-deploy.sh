#!/bin/bash

# aws deployment reference: https://www.docker.com/blog/docker-compose-from-local-to-amazon-ecs/
docker login
docker context use myecscontext
docker compose up
docker compose ps