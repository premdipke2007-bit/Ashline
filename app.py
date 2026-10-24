#!/usr/bin/env python3
"""
CostRouter HTTP Gateway Server
Hacktoberfest Hack Day 2026
Track: Best Open-Source AI Project & Best Use of Gemma
"""

import http.server
import socketserver
import json
import os
import sys
from router import router_engine, MODEL_TIERS

PORT = int(os.environ.get("PORT", 8080))
STATIC_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "static")

BENCHMARK_PROMPTS = [
    {
        "name": "1. Simple Greeting",
        "prompt": "Hi, summarize your capabilities in one short sentence.",
        "expected_tier": "Tier 0 (Gemma 2B)",
        "quality_bar": 0.70
    },
    {
        "name": "2. Strict JSON Data Extraction",
        "prompt": "Extract the user data into strict JSON format with keys 'name', 'age': Arjun is 24 years old.",
        "expected_tier": "Tier 0 or 1",
        "quality_bar": 0.80
    },
    {
        "name": "3. Python Code Generation",
        "prompt": "Write a clean Python function with type hints to calculate the sum of numbers in a list.",
        "expected_tier": "Tier 1 (Gemma 9B)",
        "quality_bar": 0.85
    },
    {
        "name": "4. Bullet Point Executive Summary",
        "prompt": "Provide 3 concise bullet points explaining why open-weight models reduce enterprise cloud dependency.",
        "expected_tier": "Tier 1 (Gemma 9B)",
        "quality_bar": 0.80
    },
    {
        "name": "5. Multi-Step Strategic Synthesis",
        "prompt": "Evaluate the trade-offs between speculative cascade decoding vs static prompt routing under high SLA latency budgets.",
        "expected_tier": "Tier 2 (Gemini 1.5 Pro)",
        "quality_bar": 0.95
    }
]

class CostRouterHTTPHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=STATIC_DIR, **kwargs)

    def do_GET(self):
        if self.path == "/api/stats":
            self.send_json_response(200, {
                "stats": router_engine.stats,
                "history": router_engine.history
            })
            return
        elif self.path == "/api/models":
            self.send_json_response(200, MODEL_TIERS)
            return
        elif self.path == "/api/benchmark-prompts":
            self.send_json_response(200, BENCHMARK_PROMPTS)
            return
        super().do_GET()

    def do_POST(self):
        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length).decode("utf-8") if content_length > 0 else "{}"
        
        try:
            payload = json.loads(body)
        except Exception:
            payload = {}

        if self.path == "/api/chat":
            prompt = payload.get("prompt", "").strip()
            if not prompt:
                self.send_json_response(400, {"error": "Prompt cannot be empty"})
                return

            quality_bar = float(payload.get("quality_bar", 0.75))
            result = router_engine.route(prompt, quality_bar=quality_bar)
            self.send_json_response(200, result)
            return

        elif self.path == "/api/benchmark":
            results = []
            for item in BENCHMARK_PROMPTS:
                res = router_engine.route(item["prompt"], quality_bar=item["quality_bar"])
                results.append({
                    "test_name": item["name"],
                    "expected": item["expected_tier"],
                    "actual": res["routed_tier"],
                    "savings_pct": res["financials"]["percent_saved"],
                    "routed_model": res["routed_model"]
                })
            self.send_json_response(200, {
                "benchmark_results": results,
                "overall_stats": router_engine.stats
            })
            return

        self.send_error(404, "Endpoint not found")

    def send_json_response(self, code, data):
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(json.dumps(data).encode("utf-8"))

def run():
    print("==================================================")
    print(" 🚀 CostRouter: Eval-Driven Open LLM Gateway")
    print(" 💡 Hacktoberfest Hack Day 2026")
    print(f" 🔗 Local Dashboard: http://localhost:{PORT}")
    print("==================================================")
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), CostRouterHTTPHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down CostRouter.")

if __name__ == "__main__":
    run()
