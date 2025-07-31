docker build -t ajay-my-vite-app .
docker run -it --rm -p 7878:7878 -v ${PWD}:/app -v /app/node_modules my-vite-app
docker-compose up --build
