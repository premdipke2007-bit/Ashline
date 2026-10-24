# ⚡ CostRouter: Eval-Driven Open-Source LLM Gateway
### Stop overpaying cloud APIs: Route requests to the cheapest open-weight model that passes your quality bar.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Hacktoberfest](https://img.shields.io/badge/Hacktoberfest-2026-orange.svg)](https://hacktoberfest.com/)
[![Track](https://img.shields.io/badge/Track-Best%20Open--Source%20AI%20Project-blue.svg)](#hackathon-track-alignment)
[![Powered by](https://img.shields.io/badge/Models-Gemma%202%20(2B%20%26%209B)-purple.svg)](#models-tools--licenses-hackathon-slide-8-compliance)

---

## 🎯 Hackathon Metadata
* **Event:** Hacktoberfest Hack Day (NST.ADYPU · NSTSDC, Pune)
* **Track:** **Track 1: Main Track — Best Open-Source AI Project** *(Also eligible for Track 2: Best Use of Gemma)*
* **License:** [MIT Open-Source License](LICENSE)

---

## 🛑 The Problem
Engineering teams needlessly overpay by routing **100% of their production traffic to expensive commercial flagship models** (like GPT-4o or Gemini 1.5 Pro at $3.50–$10.50 per 1M tokens), even for basic summarization, classification, greeting, or straightforward JSON extraction.

Existing tools like **LiteLLM** or **OpenRouter** only route based on static provider lists, round-robin, or HTTP 500 failure codes. **They have no awareness of response quality**, meaning developers cannot safely delegate tasks to cheaper open models without risking customer-facing regressions or hallucinations.

---

## 💡 The Solution: CostRouter
**CostRouter** is an intelligent, eval-driven gateway that places open-weight models (like **Google Gemma 2**) at the front line of your AI stack:

1. **Speculative Quality Cascade:** Every incoming request is dispatched first to Tier 0 / Tier 1 open-weight models (Gemma-2B or Gemma-9B).
2. **Sub-15ms Real-Time Quality Gate:** The response is evaluated against configurable task criteria (JSON schema validation, code syntax checks, instruction adherence, length sufficiency).
3. **Automatic Fallback Escalation:** If the open model passes the quality threshold, the response is returned immediately—saving **85% to 95% of API costs**! If quality falls below your threshold, it automatically cascades to the next tier model.
4. **Transparent Cost & Latency Accounting:** Provides real-time financial tracking showing exact dollars saved vs blind commercial routing.

---

## 🛠️ Models, Tools & Licenses (Hackathon Slide 8 Compliance)

| Category | Specification |
| :--- | :--- |
| **Open-Weight Models** | **Google Gemma 2 (2B-IT)** (Tier 0: Micro/Edge), **Google Gemma 2 (9B-IT)** (Tier 1: Workhorse) |
| **Commercial Baseline** | **Gemini 1.5 Pro / GPT-4o** (Tier 2: Heavyweight Commercial Cloud) |
| **Backend & Gateway** | Python 3.10+ (Standard Library `http.server`, `urllib.request`, `json`, `re`) |
| **Frontend UI** | HTML5, Modern Tailwind CSS, FontAwesome, Vanilla JS |
| **License** | **MIT License** (permits open distribution, commercial use, and Hacktoberfest collaboration) |

---

## 🏗️ Architecture & Routing Cascade

```mermaid
flowchart TD
    A["Client Application Request"] --> B["CostRouter Gateway<br/>(POST /api/chat)"]
    B --> C["Task Classifier<br/>(JSON, Code, Chat, Reasoning)"]
    C --> D["Tier 0: Google Gemma 2B<br/>($0.07 / 1M tokens)"]
    D --> E["Quality Bar Evaluator<br/>(Schema, Syntax, Fluency)"]
    E -->|Score >= Threshold| F["✓ Accept & Return<br/>(Save 95% Cost!)"]
    E -->|Score < Threshold| G["Tier 1: Google Gemma 9B<br/>($0.20 / 1M tokens)"]
    G --> H["Quality Bar Evaluator"]
    H -->|Score >= Threshold| F
    H -->|Score < Threshold| I["Tier 2: Commercial Heavyweight<br/>(Gemini 1.5 Pro / GPT-4o)"]
    I --> J["Return & Log Failure for Active Learning"]
```

---

## 🚀 Quickstart (Run in 10 Seconds)

### 1. Clone the repository
```bash
git clone https://github.com/premdipke2007-bit/Ashline.git
cd Ashline
```

### 2. (Optional) Set your Gemini API Key
```bash
export GEMINI_API_KEY="your-gemini-api-key-here"
```
*(If no API key is provided, CostRouter runs in local high-fidelity simulation mode with sub-second latency — ideal for hackathons with spotty WiFi!)*

### 3. Start the Gateway Server
```bash
python3 app.py
```

### 4. Open the Interactive Dashboard
Navigate to: **`http://localhost:8080`**

---

## 🎤 Hackathon Evaluation Guide

### 🕒 Mid-Evaluation (9:30 PM Checkpoint)
* **What to show:** Open `http://localhost:8080`.
* **Action:** Click the **"Run 5-Test Benchmark"** button.
* **Talking point:** *"Notice how CostRouter automatically routes simple chat and code to Gemma 2B and 9B, achieving an 88% cost reduction, while seamlessly escalating complex strategic queries to the heavy tier. LiteLLM cannot do this because LiteLLM lacks our real-time quality gate."*

### 🏆 Final Pitch (8:00 AM - 4 Minute Pitch)
1. **Minute 1 - The Problem:** Enterprise AI bills are exploding because developers use GPT-4o for tasks a 2B model can do. Show the $0 vs $10,000 cloud bill comparison.
2. **Minute 2 - Live Demo:** Type a prompt into CostRouter. Slide the Quality Bar from 0.70 to 0.95. Show how the gateway dynamically switches from Gemma 2B to Gemma 9B in the live execution trace.
3. **Minute 3 - Why Open-Source AI:** Explain that Gemma 2's open weights allow self-hosting at zero marginal token cost. CostRouter gives enterprises the confidence to adopt open models without sacrificing output quality.
4. **Minute 4 - Open Source Roadmap:** MIT license, Hacktoberfest contribution guidelines for adding custom task evaluators (RAG Hallucination, PII Filter, SQL validator).
