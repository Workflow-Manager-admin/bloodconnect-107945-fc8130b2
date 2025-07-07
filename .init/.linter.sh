#!/bin/bash
cd /home/kavia/workspace/code-generation/bloodconnect-107945-fc8130b2/frontend_web_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

