function createButtons(containerId, start, end, subject) {
  const container = document.getElementById(containerId);

  for (let i = start; i <= end; i++) {
    const btn = document.createElement("div");
    btn.classList.add("btn");

    btn.innerText = i;

    const key = subject + "_" + i;

    let state = parseInt(localStorage.getItem(key)) || 0;

    setState(btn, state);

    btn.onclick = () => {
      state = (state + 1) % 3;
      localStorage.setItem(key, state);
      setState(btn, state);
      updateProgress(subject);
    };

    container.appendChild(btn);
  }
}

function setState(btn, state) {
  btn.classList.remove("red", "yellow", "green");

  if (state === 0) btn.classList.add("red");
  if (state === 1) btn.classList.add("yellow");
  if (state === 2) btn.classList.add("green");
}

function updateProgress(subject) {
  let total = 0;
  let green = 0;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key.startsWith(subject)) {
      total++;
      if (localStorage.getItem(key) == 2) green++;
    }
  }

  const percent = total ? (green / total) * 100 : 0;

  document.getElementById(subject + "Progress").style.width = percent + "%";
}

function init(subject) {
  updateProgress(subject);
}

/* создание */
createButtons("math1", 1, 12, "math");
createButtons("math2", 13, 19, "math");

createButtons("rus1", 1, 22, "rus");
createButtons("rus2", 23, 27, "rus");

createButtons("inf", 1, 27, "inf");

/* прогресс */
init("math");
init("rus");
init("inf");
