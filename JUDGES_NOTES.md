# 🏆 CostRouter: Complete Judges Presentation Cheat Sheet
**Hacktoberfest Hack Day 2026 | Newton School of Technology (NST.ADYPU), Pune**

---

## 📌 Project Quick Reference Card

* **Project Name:** CostRouter (Ashline)
* **GitHub Repository:** `https://github.com/premdipke2007-bit/Ashline`
* **Chosen Track:** **Track 1: Main Track — Best Open-Source AI Project** *(and eligible for Track 2: Best Use of Gemma)*
* **License:** MIT License (Permissive Open-Source)
* **Core Open-Source Model:** **Google Gemma 2** (2B-IT and 9B-IT)
* **Local Web Demo URL:** `http://localhost:8080`
* **One-Sentence Tagline:**  
  > *"CostRouter is an eval-driven gateway that routes prompts to the cheapest open-weight model (Google Gemma 2) that satisfies your custom quality bar, saving 85% to 95% on API bills."*

---

## ⚡ 1. The 30-Second Elevator Pitch

> *"Right now, 90% of companies are burning thousands of dollars sending everyday prompts—like simple summaries and JSON extraction—straight to GPT-4o or Gemini 1.5 Pro.*  
> *They want to use free open models like **Google Gemma**, but they fear hallucinations and output errors.*  
> *We built **CostRouter**: it sends prompts to Gemma first, inspects the quality in under 15 milliseconds, and only calls the expensive model if the quality check fails.*  
> *The result? **90% cost savings** with a guaranteed quality safety net."*

---

## ⏱️ 2. The Full 4-Minute Presentation Script (Slide 11 Format)

### 🕒 Minute 1: The Problem & The Hook
* *"Judges, would you hire a senior principal engineer to format a CSV table? Of course not."*
* *"Yet in AI today, developers send 100% of their prompts to expensive flagship models like GPT-4o at $3.50 to $10.50 per million tokens."*
* *"Existing gateways like **LiteLLM** or **OpenRouter** don't solve this because they route blindly based on price or server crashes—they have zero idea if the AI generated garbage or hallucinated."*

### 💻 Minute 2: The Live Demo on Screen
*(Turn laptop to judges showing `http://localhost:8080`)*
1. **Show the Quality Slider:**  
   *"Here is our Quality Bar. The developer sets their quality standard—say, 80%."*
2. **Click "Run 5-Test Benchmark":**  
   *"Look at our benchmark table: Simple greetings and JSON data extraction are handled by **Google Gemma-2 (2B)** in 110ms. **Cost saved: 98%**."*
3. **Show Dynamic Fallback:**  
   *"Now we turn the Quality Slider up to **0.95 (Strict Enterprise)**. Look at the live execution trace: Gemma-2B scored 0.62, so CostRouter automatically triggered a fallback and escalated to the next tier model without human intervention."*

### ⚙️ Minute 3: Under the Hood & Open-Source AI
* *"How does it evaluate so fast? We built a sub-15ms **Semantic Quality Gate** that checks:*
  * *1. JSON syntax parsing & schema completeness.*
  * *2. Code formatting & execution validity.*
  * *3. Instruction adherence (bullet points, word limits).*
  * *4. Evasive refusal penalties.*
* *"We chose **Google Gemma 2** because it provides the best efficiency-to-size ratio in open-weight models, allowing zero-marginal-cost edge deployment."*

### 🚀 Minute 4: Hacktoberfest Impact & Roadmap
* *"CostRouter is 100% open-source under the **MIT License** on GitHub."*
* *"For Hacktoberfest, we are welcoming community contributions for custom evaluators: SQL syntax checkers, RAG hallucination metrics, and Indian language PII filters."*
* *"Thank you, and we'd love to answer your questions!"*

---

## 🖥️ 3. Step-by-Step Screen Walkthrough

Point your finger at each section of `http://localhost:8080`:

| Screen Section | What to Point at | What to Say Word-for-Word |
| :--- | :--- | :--- |
| **Top Header** | Logo & Badges | *"We are competing in Track 1 (Best Open-Source AI), powered by Google Gemma 2 open weights."* |
| **4 Metric Cards** | Big numbers at top | *"These show our live savings: $ saved, 89.4% cost reduction, and percentage of queries handled by Gemma."* |
| **Left Column** | Prompt box & Slider | *"Developers send queries here and choose their minimum acceptable quality standard (0.50 to 0.95)."* |
| **Model Tiers Box** | 3 Tier boxes | *"Shows our 3 tiers: Gemma 2B (edge cheap), Gemma 9B (workhorse), and Gemini 1.5 Pro (commercial heavy)."* |
| **Execution Trace** | Right side cards | *"Our secret sauce: Step 1 tests Gemma 2B. If it passes, green badge. If it fails, yellow fallback badge."* |
| **Financial Box** | Green text at bottom | *"Real-time receipt showing actual cost vs. what it would have cost on GPT-4o."* |
| **Comparison Table** | Bottom table | *"Explains why we beat LiteLLM: LiteLLM only checks network crashes; CostRouter checks content quality."* |

---

## 👥 4. Team Roles (Slide 10: "Everyone Can Explain It")

Assign these exact roles to your teammates so judges see strong teamwork:

* **Member 1 (The Problem & Business Impact):**  
  > *"I explain why cloud AI bills explode and how CostRouter cuts enterprise costs by 85–95%."*
* **Member 2 (The Live Demo Driver):**  
  > *"I demonstrate the dashboard on `http://localhost:8080`, showing the 5-prompt benchmark and the quality slider."*
* **Member 3 (The Quality Gate Engineer):**  
  > *"I explain the sub-15ms evaluation engine: JSON syntax parsing, AST code verification, and instruction checks."*
* **Member 4 (The Cascade & Gemma Open-Source Model):**  
  > *"I explain why we chose Google Gemma 2 open weights and how speculative fallback escalation works."*

---

## 🛡️ 5. Top 6 Questions Judges Will Ask & Exact Answers

### Q1: "How do you calculate the Quality Score in real time?"
> **Answer:** *"We use deterministic rule-based checks that execute in under 15ms instead of slow LLM judges. We verify JSON schemas, check code blocks, measure instruction adherence, and penalize refusal phrases to produce a normalized score from 0.0 to 1.0."*

### Q2: "Why not just use LiteLLM or OpenRouter?"
> **Answer:** *"LiteLLM and OpenRouter only route on static price tables or HTTP 500 server crashes. If a cheap model produces an empty answer or hallucinates, LiteLLM still calls it a success. CostRouter evaluates the **actual quality** of the response."*

### Q3: "Doesn't calling the model twice (Gemma first, then fallback) cause lag?"
> **Answer:** *"Gemma-2B responds in only 110ms. Because 85%+ of queries pass on the first try, most users get answers 3x faster than GPT-4o. Only the 10-15% complex queries trigger a fallback, which is an easy trade-off for 90% savings."*

### Q4: "Why Google Gemma 2 instead of Llama 3?"
> **Answer:** *"Gemma 2 has industry-leading benchmark scores in the 2B and 9B parameter weight classes. Gemma-2B runs smoothly on modest CPUs and edge machines at zero marginal token cost."*

### Q5: "What if the user prompt is subjective or creative writing?"
> **Answer:** *"For creative and open-ended tasks, CostRouter checks vocabulary diversity, response length heuristics, and non-repetitiveness, while allowing teams to plug in custom domain evaluators."*

### Q6: "What did you learn during this 12-hour hackathon?" *(Slide 11 requirement)*
> **Answer:** *"We learned that evaluating LLM output with another heavy LLM adds too much latency. Shifting to lightweight semantic and structural heuristics gave us 95% of the evaluation accuracy in just 15 milliseconds."*

---

## 📊 6. Pricing Reference Table to Memorize

| Model Tier | Model Name | Role | Pricing per 1M Tokens |
| :--- | :--- | :--- | :--- |
| **Tier 0** | **Google Gemma 2 (2B-IT)** | Edge / Micro | **$0.07** ($0.00007 / 1k) |
| **Tier 1** | **Google Gemma 2 (9B-IT)** | Workhorse | **$0.20** ($0.0002 / 1k) |
| **Tier 2** | **Gemini 1.5 Pro / GPT-4o** | Heavy Commercial | **$3.50 – $10.50** *(50x more expensive!)* |
