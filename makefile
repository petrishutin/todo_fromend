up:
	docker-compose up -d --build

dev_up:
	docker-compose up backend filestorage mongo

down:
	docker-compose down

hurl:
	hurl --retry -v --file-root . tests.hurl

build:
	docker build --target production-stage -t petrishutin/todo_frontend:latest .
	docker build --target production-stage -t us-central1-docker.pkg.dev/flawless-acre-387710/repo1/todo_frontend:latest .

push: build
	docker login
	docker push petrishutin/todo_frontend:latest
	docker push us-central1-docker.pkg.dev/flawless-acre-387710/repo1/todo_frontend:latest