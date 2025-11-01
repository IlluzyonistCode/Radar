import http.server
import socketserver
import os
import sys

PORT = 8001


class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def guess_type(self, path):
        result = super().guess_type(path)
        
        if isinstance(result, tuple):
            mimetype, encoding = result

            if path.endswith('.mjs'):
                return 'application/javascript', encoding

            return mimetype, encoding

        else:
            mimetype = result

            if path.endswith('.mjs'):
                return 'application/javascript'

            return mimetype
    
    def end_headers(self):
        self.send_header('Cross-Origin-Embedder-Policy', 'require-corp')
        self.send_header('Cross-Origin-Opener-Policy', 'same-origin')

        super().end_headers()


os.chdir(os.path.dirname(os.path.abspath(__file__)))

with socketserver.TCPServer(('', PORT), CustomHTTPRequestHandler) as httpd:
    print(f'Server running at http://localhost:{PORT}/')
    print('Open this URL in your browser')
    print('Press Ctrl+C to stop the server')

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print('\nServer stopped')
        
        sys.exit(0)
