#!/bin/sh
set -e

echo "================================================"
echo "Starting environment injection..."
echo "EXPO_PUBLIC_API_URL = ${EXPO_PUBLIC_API_URL}"
echo "================================================"

# Create env-config.js with runtime environment variables
cat > /usr/share/nginx/html/env-config.js <<'ENVEOF'
(function() {
  console.log('🚀 Loading environment configuration...');
  window.EXPO_PUBLIC_API_URL = "PLACEHOLDER_API_URL";
  console.log('✅ API URL set to:', window.EXPO_PUBLIC_API_URL);
})();
ENVEOF

# Replace the placeholder with actual value
sed -i "s|PLACEHOLDER_API_URL|${EXPO_PUBLIC_API_URL}|g" /usr/share/nginx/html/env-config.js

echo "✅ Created env-config.js:"
cat /usr/share/nginx/html/env-config.js

# Find and inject script into index.html
if [ -f /usr/share/nginx/html/index.html ]; then
  echo "📄 Found index.html, injecting script..."
  
  # Create backup
  cp /usr/share/nginx/html/index.html /usr/share/nginx/html/index.html.bak
  
  # Inject script right after <head> tag using awk
  awk '/<head>/ {print; print "  <script src=\"/env-config.js?v='$(date +%s)'\"></script>"; next}1' \
    /usr/share/nginx/html/index.html.bak > /usr/share/nginx/html/index.html
  
  echo "✅ Script injected into index.html"
  echo "First 30 lines of index.html:"
  head -n 30 /usr/share/nginx/html/index.html
else
  echo "❌ ERROR: index.html not found!"
  ls -la /usr/share/nginx/html/
  exit 1
fi

echo "================================================"
echo "Environment injection complete. Starting nginx..."
echo "================================================"

# Start nginx
exec nginx -g 'daemon off;'
