// Builds the topic-selector UI from MATH_DOMAINS, and renders a filtered
// quiz from MATH_QUESTIONS when "Start Practice" is clicked.

function buildSelector() {
  const container = document.getElementById("topic-selector");
  let html = "";

  for (const domainKey in MATH_DOMAINS) {
    const domain = MATH_DOMAINS[domainKey];
    const disabled = domain.comingSoon;
    html += '<div class="selector-domain' + (disabled ? " disabled" : "") + '">';
    html += '<h3><label><input type="checkbox" class="domain-check" data-domain="' + domainKey + '"' + (disabled ? " disabled" : "") + '> ' + domain.label + (disabled ? " (coming soon)" : "") + '</label></h3>';

    if (!disabled) {
      html += '<div class="subtopics">';
      for (const subKey in domain.subtopics) {
        html += '<label><input type="checkbox" class="subtopic-check" data-domain="' + domainKey + '" data-subtopic="' + subKey + '"> ' + domain.subtopics[subKey] + '</label>';
      }
      html += '</div>';
    }
    html += '</div>';
  }

  container.innerHTML = html;

  // Checking a domain box checks/unchecks all its subtopics.
  container.querySelectorAll(".domain-check").forEach(function (box) {
    box.addEventListener("change", function () {
      const domainKey = box.getAttribute("data-domain");
      container.querySelectorAll('.subtopic-check[data-domain="' + domainKey + '"]').forEach(function (sub) {
        sub.checked = box.checked;
      });
    });
  });
}

function startPractice() {
  const checked = document.querySelectorAll(".subtopic-check:checked");
  const results = document.getElementById("practice-results");

  if (checked.length === 0) {
    results.innerHTML = '<p class="practice-empty-msg">Pick at least one subtopic above, then hit Start Practice.</p>';
    results.scrollIntoView({ behavior: "smooth" });
    return;
  }

  const selected = [];
  checked.forEach(function (box) {
    selected.push({ domain: box.getAttribute("data-domain"), subtopic: box.getAttribute("data-subtopic") });
  });

  const questions = MATH_QUESTIONS.filter(function (q) {
    return selected.some(function (s) { return s.domain === q.domain && s.subtopic === q.subtopic; });
  });

  if (questions.length === 0) {
    results.innerHTML = '<p class="practice-empty-msg">No practice questions are available for that selection yet.</p>';
    results.scrollIntoView({ behavior: "smooth" });
    return;
  }

  let html = "<h2>Practice</h2>";
  questions.forEach(function (q) {
    html += '<div class="question">';
    html += '<p class="prompt">' + q.prompt + '</p>';
    html += '<div id="' + q.id + '" class="choices">';
    q.choices.forEach(function (c) {
      html += '<label><input type="radio" name="' + q.id + '" value="' + c.v + '"> ' + c.v + ') ' + c.t + '</label>';
    });
    html += '</div>';
    html += '<button class="check-btn" onclick="checkAnswer(\'' + q.id + '\',\'' + q.correct + '\')">Check Answer</button>';
    html += '<div class="explanation" id="' + q.id + '-explanation">';
    html += '<p class="result-banner" id="' + q.id + '-banner"></p>';
    html += '<h4>Recognize it</h4><p>' + q.explain.recognize + '</p>';
    html += '<h4>Solve algebraically</h4><p>' + q.explain.algebra + '</p>';
    html += '<h4>Solve on Desmos</h4><p>' + q.explain.desmos + '</p>';
    html += '<h4>Why the other choices are wrong</h4><p>' + q.explain.wrong + '</p>';
    html += '</div></div>';
  });

  results.innerHTML = html;
  results.scrollIntoView({ behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", buildSelector);
