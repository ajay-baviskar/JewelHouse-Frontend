sudo lsof -i :5173
sudo kill -9 <PID>

nohup bash -c "npm run dev" > frontend.log 2>&1 &
echo $! > frontend.pid
disown