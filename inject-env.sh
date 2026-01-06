#!/bin/sh

# Create env-config.js with runtime environment variables
cat <<EOF > /usr/share/nginx/html/env-config.js
console.log('🚀 Loading environment configuration...');
window.EXPO_PUBLIC_API_URL = "${EXPO_PUBLIC_API_URL}";
console.log('✅ API URL set to:', window.EXPO_PUBLIC_API_URL);
EOF

echo "Environment configuration created:"
cat /usr/share/nginx/html/env-config.js

# Inject script tag into index.html at the VERY TOP of <head> tag
if [ -f /usr/share/nginx/html/index.html ]; then
  # Insert after the opening <head> tag
  sed -i 's|<head>|<head><script src="/env-config.js"></script>|' /usr/share/nginx/html/index.html
  echo "✅ Injected env-config.js into index.html"
  
  # Verify injection
  echo "First 20 lines of index.html:"
  head -n 20 /usr/share/nginx/html/index.html
else
  echo "⚠️  index.html not found!"
fi

# Start nginx
exec nginx -g 'daemon off;'
