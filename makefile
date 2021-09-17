
PROJECT = "enigma-racing"
COMPOSE = docker-compose -p ${PROJECT}
EXEC = ${COMPOSE} exec
UID = $(shell id -u)
GID = $(shell id -g)
ARGS = --force-rm --build-arg TZ=`cat /etc/timezone` --build-arg USER_ID=${UID} --build-arg GROUP_ID=$(GID)
FIREBASE = ${EXEC} web firebase

.PHONY: all
all: build start

.PHONY: build
build:
	@${COMPOSE} build ${ARGS}

.PHONY: rebuild
rebuild: stop
	@${COMPOSE} rm -f -s -v | true
	@${COMPOSE} build--no-cache ${ARGS}

.PHONY: start
start: 
	@${COMPOSE} up

.PHONY: stop
stop: 
	@${COMPOSE} down | true

.PHONY: recreate
recreate: stop start

.PHONY: exec
exec: 
	@${EXEC} -u node:node web /bin/bash

.PHONY: exec-root
exec-root: 
	@${EXEC} web /bin/bash

.PHONY: clean
clean: 
	@${COMPOSE} rm -fs

.PHONY: firebase
firebase: 
	$(eval opt ?= serve)
	@${FIREBASE} $(opt)
