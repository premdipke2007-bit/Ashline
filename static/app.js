// CostRouter Client Logic

const promptInput = document.getElementById("prompt-input");
const qualitySlider = document.getElementById("quality-slider");
const qualityBarVal = document.getElementById("quality-bar-val");
const sendBtn = document.getElementById("send-btn");
const sendBtnText = document.getElementById("send-btn-text");
const traceContainer = document.getElementById("trace-container");
const traceStatus = document.getElementById("trace-status");
const financeBox = document.getElementById("finance-box");
const actualCostVal = document.getElementById("actual-cost-val");
const baselineCostVal = document.getElementById("baseline-cost-val");
const savingsVal = document.getElementById("savings-val");
const responseBox = document.getElementById("response-box");
const responseText = document.getElementById("response-text");
const responseModelTag = document.getElementById("response-model-tag");

qualitySlider.addEventListener("input", (e) => {
  const val = parseFloat(e.target.value).toFixed(2);
  qualityBarVal.textContent = `${val} (${Math.round(val * 100)}%)`;
});

function setPrompt(name, text, threshold) {
  promptInput.value = text;
  qualitySlider.value = threshold;
  qualityBarVal.textContent = `${threshold.toFixed(2)} (${Math.round(threshold * 100)}%)`;
}

// Fetch stats on load
async function fetchStats() {
  try {
    const res = await fetch("/api/stats");
    if (!res.ok) return;
    const data = await res.json();
    updateKPICards(data.stats);
  } catch (e) {
    console.error("Failed to fetch stats", e);
  }
}

function updateKPICards(stats) {
  document.getElementById("kpi-saved-dollars").textContent = `$${stats.dollars_saved_usd.toFixed(4)}`;
  document.getElementById("kpi-saved-pct").textContent = `${stats.percentage_saved}%`;
  document.getElementById("kpi-total-reqs").textContent = stats.total_requests;
  document.getElementById("kpi-fallbacks").textContent = stats.fallbacks_triggered;

  const total = stats.total_requests || 1;
  const openCount = stats.tier_0_routed + stats.tier_1_routed;
  const openRatio = Math.round((openCount / total) * 100);
  document.getElementById("kpi-open-ratio").textContent = `${openRatio}% open-weight models`;
}

async function sendPrompt() {
  const prompt = promptInput.value.trim();
  if (!prompt) {
    alert("Please enter a prompt!");
    return;
  }

  sendBtn.disabled = true;
  sendBtnText.textContent = "Routing & Evaluating...";
  traceStatus.textContent = "Analyzing candidate models...";

  try {
    const payload = {
      prompt: prompt,
      quality_bar: parseFloat(qualitySlider.value)
    };

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error("API call failed");
    const data = await res.json();
    renderTrace(data);
    fetchStats();
  } catch (err) {
    console.error("Error routing prompt:", err);
    alert("Routing failed: " + err.message);
  } finally {
    sendBtn.disabled = false;
    sendBtnText.textContent = "Route Request Through CostRouter";
  }
}

function renderTrace(data) {
  traceStatus.textContent = `Completed in ${data.total_latency_ms}ms • Routed to ${data.routed_model}`;
  traceContainer.innerHTML = "";

  data.execution_trace.forEach((step, idx) => {
    const stepEl = document.createElement("div");
    stepEl.className = `p-3 rounded-xl border text-xs font-mono transition-all ${
      step.passed
        ? "bg-emerald-950/40 border-emerald-800 text-emerald-200"
        : "bg-amber-950/30 border-amber-800 text-amber-200"
    }`;

    const statusBadge = step.passed
      ? `<span class="bg-emerald-900 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-bold">✓ PASSED QUALITY BAR (${Math.round(step.quality_score * 100)}% >= ${Math.round(step.quality_bar * 100)}%)</span>`
      : `<span class="bg-amber-900 text-amber-300 px-2 py-0.5 rounded text-[10px] font-bold">⚠ FAILED QUALITY BAR (${Math.round(step.quality_score * 100)}% < ${Math.round(step.quality_bar * 100)}%) → FALLBACK ESCALATION</span>`;

    stepEl.innerHTML = `
      <div class="flex justify-between items-center mb-1.5">
        <span class="font-bold text-white">Step ${idx + 1}: ${step.model}</span>
        ${statusBadge}
      </div>
      <div class="flex justify-between text-[11px] text-slate-400 mb-1">
        <span>Cost Tier: $${step.cost_per_1m}/1M tokens</span>
        <span>Latency: ${step.latency_ms}ms</span>
      </div>
      <div class="text-[10px] text-slate-400 italic">
        Reasoning: ${step.reasons.join(", ")}
      </div>
    `;
    traceContainer.appendChild(stepEl);
  });

  // Financial Box
  financeBox.classList.remove("hidden");
  actualCostVal.textContent = `$${data.financials.actual_cost_usd.toFixed(6)}`;
  baselineCostVal.textContent = `$${data.financials.baseline_expensive_cost_usd.toFixed(6)}`;
  savingsVal.textContent = `$${data.financials.dollars_saved_usd.toFixed(6)} (${data.financials.percent_saved}% saved)`;

  // Response Box
  responseBox.classList.remove("hidden");
  responseModelTag.textContent = `${data.routed_model} (${data.routed_tier})`;
  responseText.textContent = data.response;
}

async function runBenchmark() {
  const panel = document.getElementById("benchmark-panel");
  const tbody = document.getElementById("benchmark-table-body");
  panel.classList.remove("hidden");
  tbody.innerHTML = `<tr><td colspan="3" class="py-4 text-center text-slate-400">Running 5 evaluation cases...</td></tr>`;

  try {
    const res = await fetch("/api/benchmark", { method: "POST" });
    const data = await res.json();
    tbody.innerHTML = "";

    data.benchmark_results.forEach((row) => {
      const tr = document.createElement("tr");
      tr.className = "hover:bg-slate-800/50";
      tr.innerHTML = `
        <td class="py-2.5 font-bold text-slate-200">${row.test_name}</td>
        <td class="py-2.5 text-cyan-400">${row.routed_model}</td>
        <td class="py-2.5 font-bold text-emerald-400">${row.savings_pct}% saved</td>
      `;
      tbody.appendChild(tr);
    });

    updateKPICards(data.overall_stats);
  } catch (err) {
    console.error("Benchmark failed", err);
    tbody.innerHTML = `<tr><td colspan="3" class="py-2 text-rose-400">Benchmark error.</td></tr>`;
  }
}

// Initial fetch
fetchStats();
