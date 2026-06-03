#!/usr/bin/env python3
"""Local preview server that mirrors the Vercel rewrites in vercel.json.

Run from the project root: python3 .claude/preview-server.py
"""
import http.server
import socketserver
import os
import sys

PORT = int(os.environ.get("PORT", "8766"))

REWRITES = {
    "/app.jsx":            "/components/app.jsx",
    "/community.jsx":      "/components/community.jsx",
    "/hero.jsx":           "/components/hero.jsx",
    "/primitives.jsx":     "/components/primitives.jsx",
    "/sections.jsx":       "/components/sections.jsx",
    "/tweaks-panel.jsx":   "/components/tweaks-panel.jsx",
    "/styles.css":         "/stylesheets/styles.css",
    "/legal.css":          "/stylesheets/legal.css",
}


class RewriteHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # strip ?query / #frag so cache-busting URLs (styles.css?v=…) still match rewrites
        path = self.path.split("?", 1)[0].split("#", 1)[0]
        if path in REWRITES:
            self.path = REWRITES[path]
        return super().do_GET()

    def end_headers(self):
        # JSX must be served as JS-ish content so the Babel <script> tag accepts it
        if self.path.endswith(".jsx"):
            self.send_header("Content-Type", "text/babel; charset=utf-8")
        # No caching during dev
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


class Server(socketserver.ThreadingTCPServer):
    # Threaded + reusable so concurrent browser requests (index + jsx + css + images)
    # don't hang/kill the single-threaded server, which left the tab serving stale bytes.
    daemon_threads = True
    allow_reuse_address = True


if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    with Server(("", PORT), RewriteHandler) as httpd:
        sys.stderr.write(f"Serving DCU on http://localhost:{PORT}\n")
        sys.stderr.flush()
        httpd.serve_forever()
