.PHONY: sync-modules
sync-modules:
	docker compose cp app:/app/node_modules .
