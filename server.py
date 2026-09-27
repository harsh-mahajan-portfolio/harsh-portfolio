#!/usr/bin/env python3
"""
================================================================================
 Harsh Mahajan's Personal Vault & Opportunities Portal - Backend Server
 Technology: Python 3 Standard Library (Zero External Dependencies)
 Features: Document Vault, Certificate Registry, Opportunities Hub & REST API
================================================================================
"""

import http.server
import json
import mimetypes
import os
import re
import socketserver
import urllib.parse
from datetime import datetime

PORT = 8000
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, "data", "database.json")
UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")

os.makedirs(os.path.join(BASE_DIR, "data"), exist_ok=True)
os.makedirs(UPLOAD_DIR, exist_ok=True)


def load_db():
    """Load JSON database records safely with fallback defaults."""
    if not os.path.exists(DATA_FILE):
        default_data = {"documents": [], "certificates": [], "opportunities": []}
        save_db(default_data)
        return default_data
    try:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {"documents": [], "certificates": [], "opportunities": []}


def save_db(data):
    """Save persistent records to the database file."""
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def format_size(bytes_num):
    """Convert raw byte count into a readable string format."""
    for unit in ["B", "KB", "MB", "GB"]:
        if bytes_num < 1024.0:
            return f"{bytes_num:.1f} {unit}"
        bytes_num /= 1024.0
    return f"{bytes_num:.1f} TB"


class PortalRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Custom HTTP Request Handler for static files and REST API endpoints."""

    def _set_headers(self, status=200, content_type="application/json"):
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_OPTIONS(self):
        """Handle CORS pre-flight requests gracefully."""
        self._set_headers(200, "text/plain")

    def do_GET(self):
        """Route GET requests to API endpoints or static web assets."""
        parsed_url = urllib.parse.urlparse(self.path)
        path = parsed_url.path

        if path == "/api/status":
            self._set_headers(200)
            status_info = {
                "status": "online",
                "server": "Python Custom Portal Engine 1.0",
                "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            }
            self.wfile.write(json.dumps(status_info).encode("utf-8"))
            return

        if path == "/api/data":
            self._set_headers(200)
            db = load_db()
            total_size = sum(
                os.path.getsize(os.path.join(UPLOAD_DIR, f))
                for f in os.listdir(UPLOAD_DIR)
                if os.path.isfile(os.path.join(UPLOAD_DIR, f))
            )
            response = {
                "documents": db.get("documents", []),
                "certificates": db.get("certificates", []),
                "opportunities": db.get("opportunities", []),
                "stats": {
                    "total_documents": len(db.get("documents", [])),
                    "total_certificates": len(db.get("certificates", [])),
                    "total_opportunities": len(db.get("opportunities", [])),
                    "storage_used": format_size(total_size),
                },
            }
            self.wfile.write(json.dumps(response).encode("utf-8"))
            return

        # Serve static files and uploads
        if path == "/" or path == "":
            self.path = "/index.html"
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

    def do_POST(self):
        """Route POST requests to document/certificate uploads or opportunity creation."""
        parsed_url = urllib.parse.urlparse(self.path)
        path = parsed_url.path

        if path == "/api/upload":
            self.handle_file_upload()
            return

        if path == "/api/opportunity":
            content_length = int(self.headers.get("Content-Length", 0))
            post_body = self.rfile.read(content_length).decode("utf-8")
            try:
                data = json.loads(post_body)
                db = load_db()
                opp_id = f"opp-{int(datetime.now().timestamp() * 1000)}"
                new_opp = {
                    "id": opp_id,
                    "title": data.get("title", "Untitled Opportunity"),
                    "organization": data.get("organization", "Independent / Community"),
                    "type": data.get("type", "Opportunity"),
                    "location": data.get("location", "Remote"),
                    "stipend": data.get("stipend", "Unspecified"),
                    "deadline": data.get("deadline", "Open"),
                    "apply_url": data.get("apply_url", "#"),
                    "posted_by": data.get("posted_by", "Harsh Mahajan"),
                    "tags": data.get("tags", ["Opportunity", "Career"]),
                    "created_at": datetime.now().strftime("%Y-%m-%d %H:%M"),
                    "description": data.get("description", "No details provided."),
                }
                db["opportunities"].insert(0, new_opp)
                save_db(db)
                self._set_headers(201)
                self.wfile.write(json.dumps({"success": True, "item": new_opp}).encode("utf-8"))
            except Exception as e:
                self._set_headers(400)
                self.wfile.write(json.dumps({"success": False, "error": str(e)}).encode("utf-8"))
            return

        self._set_headers(404)
        self.wfile.write(json.dumps({"error": "Endpoint not found"}).encode("utf-8"))

    def do_DELETE(self):
        """Handle item deletion by ID across documents, certificates, and opportunities."""
        parsed_url = urllib.parse.urlparse(self.path)
        match = re.match(r"^/api/delete/([a-zA-Z]+)/([a-zA-Z0-9_\-]+)$", parsed_url.path)
        if not match:
            self._set_headers(400)
            self.wfile.write(json.dumps({"success": False, "error": "Invalid URL"}).encode("utf-8"))
            return

        category_type, item_id = match.groups()
        db = load_db()

        if category_type not in db:
            self._set_headers(404)
            self.wfile.write(json.dumps({"success": False, "error": "Collection not found"}).encode("utf-8"))
            return

        target_item = next((item for item in db[category_type] if item.get("id") == item_id), None)
        if not target_item:
            self._set_headers(404)
            self.wfile.write(json.dumps({"success": False, "error": "Item not found"}).encode("utf-8"))
            return

        # Delete physical file if present
        if "filename" in target_item:
            disk_path = os.path.join(UPLOAD_DIR, target_item["filename"])
            if os.path.exists(disk_path):
                try:
                    os.remove(disk_path)
                except OSError:
                    pass

        db[category_type] = [item for item in db[category_type] if item.get("id") != item_id]
        save_db(db)
        self._set_headers(200)
        self.wfile.write(json.dumps({"success": True, "deleted_id": item_id}).encode("utf-8"))

    def handle_file_upload(self):
        """Parse multipart form-data payload, save file, and update database."""
        content_type = self.headers.get("Content-Type", "")
        if "multipart/form-data" not in content_type:
            self._set_headers(400)
            self.wfile.write(json.dumps({"success": False, "error": "Requires multipart/form-data"}).encode("utf-8"))
            return

        boundary = content_type.split("boundary=")[-1].strip().encode("utf-8")
        content_length = int(self.headers.get("Content-Length", 0))
        raw_body = self.rfile.read(content_length)

        parts = raw_body.split(b"--" + boundary)
        fields = {}
        file_data = None
        orig_filename = "document"

        for part in parts:
            if not part or part == b"--\r\n" or part == b"--":
                continue
            headers_and_content = part.split(b"\r\n\r\n", 1)
            if len(headers_and_content) != 2:
                continue

            part_header = headers_and_content[0].decode("utf-8", errors="ignore")
            part_body = headers_and_content[1].rstrip(b"\r\n")

            name_match = re.search(r'name="([^"]+)"', part_header)
            file_match = re.search(r'filename="([^"]+)"', part_header)

            if file_match and name_match:
                field_name = name_match.group(1)
                orig_filename = os.path.basename(file_match.group(1))
                file_data = part_body
            elif name_match:
                field_name = name_match.group(1)
                fields[field_name] = part_body.decode("utf-8", errors="ignore").strip()

        if not file_data or not orig_filename:
            self._set_headers(400)
            self.wfile.write(json.dumps({"success": False, "error": "No file uploaded"}).encode("utf-8"))
            return

        # Sanitize and make unique filename
        timestamp_prefix = datetime.now().strftime("%Y%m%d_%H%M%S")
        safe_filename = f"{timestamp_prefix}_{re.sub(r'[^a-zA-Z0-9_.-]', '_', orig_filename)}"
        destination_path = os.path.join(UPLOAD_DIR, safe_filename)

        with open(destination_path, "wb") as output_file:
            output_file.write(file_data)

        db = load_db()
        item_type = fields.get("type", "document").lower()
        mime_type, _ = mimetypes.guess_type(safe_filename)
        mime_type = mime_type or "application/octet-stream"

        item_record = {
            "id": f"{'cert' if item_type == 'certificate' else 'doc'}-{int(datetime.now().timestamp() * 1000)}",
            "title": fields.get("title", orig_filename),
            "category": fields.get("category", "General"),
            "type": item_type,
            "uploader": fields.get("uploader", "Harsh Mahajan"),
            "filename": safe_filename,
            "filepath": f"uploads/{safe_filename}",
            "filesize": format_size(len(file_data)),
            "filetype": mime_type,
            "created_at": datetime.now().strftime("%Y-%m-%d %H:%M"),
            "description": fields.get("description", "Uploaded via personal portal."),
        }

        if item_type == "certificate":
            item_record["issuer"] = fields.get("issuer", "Accredited Organization")
            item_record["credential_id"] = fields.get("credential_id", "N/A")
            item_record["issue_date"] = fields.get("issue_date", datetime.now().strftime("%Y-%m-%d"))
            item_record["verified"] = True
            db["certificates"].insert(0, item_record)
        else:
            db["documents"].insert(0, item_record)

        save_db(db)
        self._set_headers(201)
        self.wfile.write(json.dumps({"success": True, "item": item_record}).encode("utf-8"))


def run_portal():
    """Initialize and launch the multi-threaded HTTP server."""
    with socketserver.TCPServer(("", PORT), PortalRequestHandler) as httpd:
        print("=" * 65)
        print(f"  HARSH MAHAJAN'S PERSONAL VAULT & OPPORTUNITIES PORTAL")
        print(f"  Status: Active & Listening on http://localhost:{PORT}/")
        print(f"  Python API Ready: /api/data | /api/upload | /api/opportunity")
        print("=" * 65)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server gracefully...")


if __name__ == "__main__":
    run_portal()
