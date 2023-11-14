ifneq (,$(wildcard ./.env))
    include .env
    export
endif

install:
	bun install

start:
	bun start

init: redis pg

https-dev:
	caddy run --config ./build/Caddyfile.local

.PHONY: dev
dev:
	bun src/app.ts --watch

init-local: pg redis

DOCKER_COMPOSE_BIN := docker-compose
PROJECT_NAME := athena
COMPOSE := ${DOCKER_COMPOSE_BIN} -p ${PROJECT_NAME} -f build/docker-compose.yaml

caddy:
	${COMPOSE} up -d caddy

redis:
	${COMPOSE} up -d redis

redis-down:
	${COMPOSE} down redis

redis-redo: redis-down
	sleep 1
	make redis

pg:
	${COMPOSE} up -d pg

pg-down:
	${COMPOSE} down --volumes

db-migrate:
	bun db-migrate up -e pg

db-redo: pg-down
	sleep 1
	make pg
	sleep 1
	make db-migrate
	make db-seed

db-seed:
	PGPASSWORD=${DB_PASSWORD} psql --username=${DB_USERNAME} --dbname=${DB_NAME} --port=${DB_PORT} --host=${DB_HOST} < migrations/seeds.sql

db-dump:
	PGPASSWORD=${DB_PASSWORD} pg_dump --username=${DB_USERNAME} --dbname=${DB_NAME} --port=${DB_PORT} --host=${DB_HOST} > migrations/dump.sql

db-dump-data:
	PGPASSWORD=${DB_PASSWORD} pg_dump --username=${DB_USERNAME} --dbname=${DB_NAME} --port=${DB_PORT} --host=${DB_HOST} --data-only > migrations/dump-data.sql

db-load-data:
	PGPASSWORD=${DB_PASSWORD} psql --username=${DB_USERNAME} --dbname=${DB_NAME} --port=${DB_PORT} --host=${DB_HOST} < migrations/dump-data.sql

new-migration-file:
	bun db-migrate create ${name} --sql-file -e pg
	cd migrations/sqls && rm *-${name}-down.sql 
