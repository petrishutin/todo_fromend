up:
	docker-compose up --build

dev_up:
	docker-compose up backend filestorage mongo

down:
	docker-compose down

hurl:
	hurl --retry -v --file-root . tests.hurl

build_docker_image:
	docker build --target prod -t petrishutin/todo_frontend:latest .

push_docker_image: build_docker_image
	docker login
	docker push petrishutin/todo_frontend:latest