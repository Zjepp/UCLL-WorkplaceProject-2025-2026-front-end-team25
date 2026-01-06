#!/bin/sh

# Create env-config.js with runtime environment variables
cat <<EOF > /usr/share/nginx/html/env-config.js
window.EXPO_PUBLIC_API_URL = "${EXPO_PUBLIC_API_URL}";
EOF

echo "Environment configuration injected:"
cat /usr/share/nginx/html/env-config.js

# Inject script tag into index.html before closing </head> tag
if [ -f /usr/share/nginx/html/index.html ]; then
  sed -i 's|</head>|<script src="/env-config.js"></script></head>|' /usr/share/nginx/html/index.html
  echo "Injected env-config.js into index.html"
fi

# Start nginx
exec nginx -g 'daemon off;'
