cd client
cmd /c start powershell -NoExit -Command npm run dev
cd ../database
cmd /c start powershell -NoExit -Command npm run dev
cd ../server
cmd /c start powershell -NoExit -Command npm run dev
cd ..
