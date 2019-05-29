# breakout-like-server

## How to Setup

```bash
docker build -t blike:1.0 .
docker run -it -p 8081:8080 --volume blike-data:/app/db --rm -d blike:1.0
```
