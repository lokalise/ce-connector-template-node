.PHONY: sync-modules
sync-modules:
	docker compose cp app:/home/node/app/node_modules .
