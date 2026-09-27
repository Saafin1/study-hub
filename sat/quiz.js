function checkAnswer(qId, correctValue) {
  const container = document.getElementById(qId);
  const selected = container.querySelector('input[name="' + qId + '"]:checked');
  const explanation = document.getElementById(qId + '-explanation');
  const banner = document.getElementById(qId + '-banner');
  const labels = container.querySelectorAll('label');

  labels.forEach(function (l) {
    l.classList.remove('correct-choice', 'wrong-choice');
  });

  if (!selected) {
    alert('Pick an answer first, then check.');
    return;
  }

  const correctInput = container.querySelector('input[value="' + correctValue + '"]');
  const correctLabel = correctInput.closest('label');
  correctLabel.classList.add('correct-choice');

  if (selected.value === correctValue) {
    banner.textContent = 'Correct!';
    banner.className = 'result-banner correct';
  } else {
    selected.closest('label').classList.add('wrong-choice');
    banner.textContent = 'Not quite — correct answer highlighted in green below.';
    banner.className = 'result-banner wrong';
  }

  explanation.classList.add('show');
}
