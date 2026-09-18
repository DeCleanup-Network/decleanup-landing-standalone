#!/usr/bin/env python3
"""Local preview server that mirrors the Vercel rewrites in vercel.json.

Run from the project root: python3 .claude/preview-server.py
"""
import http.server
import socketserver
import os
import sys
import traceback

PORT = int(os.environ.get("PORT", "8766"))

REWRITES = {
    "/app.jsx":            "/components/app.jsx",
    "/community.jsx":      "/components/community.jsx",
    "/hero.jsx":           "/components/hero.jsx",
    "/primitives.jsx":     "/components/primitives.jsx",
    "/sections.jsx":       "/components/sections.jsx",
    "/tweaks-panel.jsx":   "/components/tweaks-panel.jsx",
    "/userguide.jsx":      "/components/userguide.jsx",
    "/styles.css":         "/stylesheets/styles.css",
    "/legal.css":          "/stylesheets/legal.css",
}


class RewriteHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        try:
            raw = self.path
            path = raw.split("?", 1)[0].split("#", 1)[0]
            if path in REWRITES:
                self.path = REWRITES[path] + (("?" + raw.split("?", 1)[1]) if "?" in raw else "")
            elif path != "/" and not path.startswith("/public/") and "." not in os.path.basename(path):
                candidate = path.lstrip("/") + ".html"
                if os.path.isfile(candidate):
                    self.path = "/" + candidate + (("?" + raw.split("?", 1)[1]) if "?" in raw else "")
            return super().do_GET()
        except Exception:
            traceback.print_exc(file=sys.stderr)
            try:
                self.send_error(500, "Internal server error")
            except Exception:
                pass

    def end_headers(self):
        path_only = self.path.split("?", 1)[0]
        if path_only.endswith(".jsx"):
            self.send_header("Content-Type", "text/babel; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def log_message(self, fmt, *args):
        sys.stderr.write("%s - %s\n" % (self.address_string(), fmt % args))
        sys.stderr.flush()


class Server(socketserver.ThreadingTCPServer):
    daemon_threads = True
    allow_reuse_address = True


if __name__ == "__main__":
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    os.chdir(root)
    sys.stderr.write(f"cwd={os.getcwd()}\n")
    sys.stderr.write(f"userguide.html exists={os.path.isfile('userguide.html')}\n")
    with Server(("127.0.0.1", PORT), RewriteHandler) as httpd:
        sys.stderr.write(f"Serving DCU on http://localhost:{PORT}\n")
        sys.stderr.write(f"User guide: http://localhost:{PORT}/userguide\n")
        sys.stderr.flush()
        httpd.serve_forever()
