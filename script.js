const card = document.getElementById("card");
let step = 0;
let bgm;

/* =========================
   MAIN RENDER
========================= */
function render() {
  card.classList.remove("wide-card");
  /* STEP 0 — HAPPY NEW YEAR PAGE */
  if (step === 0) {
    document.body.className = "";
    card.style.display = "none";

    addVideoBackground();

    if (!document.querySelector(".newyear-popup")) {
      const popup = document.createElement("div");
      popup.className = "newyear-popup";

      popup.innerHTML = `
        <div class="newyear-card">
          <div class="newyear-text">Happy New Year</div>

          <video class="newyear-cat-video" autoplay loop muted playsinline>
            <source src="cat.mp4" type="video/mp4">
          </video>

          <div class="newyear-text">Darling! ❤️</div>
        </div>

        <button class="newyear-btn" onclick="goToStep1()">Next</button>
      `;

      document.body.appendChild(popup);
      fireworks();
    }
  }

  /* STEP 1 — HUG PAGE */
  else if (step === 1) {
    document.body.classList.remove("step-closed");
    document.body.classList.add("step-normal");

    card.style.display = "block";

    card.innerHTML = `
      <div class="calm-card">
        <div class="hug">
          <img src="hug.png" alt="hug">
        </div>

        <h2 id="step1-text">
          Hello My Love,<br>
          There is something for you…
        </h2>

        <div class="button-row">
          <button onclick="step=2;render()">Open</button>
          <button class="secondary" onclick="step=99;render()">Close</button>
        </div>
      </div>
    `;

    const txt = document.getElementById("step1-text");
    txt.classList.add("text-fade");
    setTimeout(() => txt.classList.remove("text-fade"), 100);

    playBackgroundMusic();
  }

  /* STEP 99 — CLOSE PAGE */
  else if (step === 99) {
    document.body.classList.remove("step-normal");
    document.body.classList.add("step-closed");

    const oldBg = document.querySelector(".bg-video");
    if (oldBg) oldBg.remove();

    switchMusic("angry.mp3");

    card.innerHTML = `
      <div class="calm-card">
        <div class="hug">
          <img src="angry.png" alt="angry">
        </div>

        <h2 class="angry-text">How dare you close 😡</h2>
        <button class="secondary" onclick="backToStep1()">Back</button>
      </div>
    `;
  }

  /* STEP 2 — READY PAGE */
  else if (step === 2) {
    document.body.className = "step-normal";

    card.innerHTML = `
      <div class="calm-card">
        <div class="ready">
          <img src="ready.png" alt="ready">
        </div>

        <h2>
          <strong>ARE YOU READY</strong><br>
          <span style="font-weight: normal; font-size: 18px;">
            Let's gooooooo....! 💕
          </span>
        </h2>

        <button onclick="step=3;render()">Tap to see</button>
      </div>
    `;
  }

  /* STEP 3 — GIFTS PAGE */
  else if (step === 3) {
    document.body.className = "step-normal";

    card.innerHTML = `
      <div class="calm-card">
        <h2>GIFTS FOR YOU 🎁</h2>

        <div class="gifts-grid">
          <div class="gift" onclick="step=10;render()">
            <img src="camera.png">
          </div>

          <div class="gift" onclick="step=11;render()">
            <img src="boquet.png">
          </div>

          <div class="gift" onclick="step=12;render()">
            <img src="spotify.png">
          </div>

          <div class="gift" onclick="step=13;render()">
            <img src="message.png">
          </div>
        </div>

        <button class="next-btn" onclick="step=4;render()">Next</button>
      </div>
    `;
  }

  /* STEP 4 — SURPRISE BOX */
  else if (step === 4) {
    document.body.className = "step-normal";

    card.innerHTML = `
      <div class="calm-card">
        <div class="ready">
          <img src="surprise box.png">
        </div>

        <h2>One last thing for you… 🎁</h2>
        <p>This is extra special 💖</p>
        
        <div class="button-row">
        <button class="secondary" onclick="step=3;render()">Back</button>
        <button onclick="step=14;render()">Open it</button>
      </div>
    `;
  }

  /* STEP 10 — CAMERA GIFT PAGE */
else if (step === 10) {
  document.body.className = "step-normal";

  card.innerHTML = `
    <div class="calm-card">
      <div class="gift-page-img">
        <img src="camera.png" alt="Camera Gift">
      </div>

      <h2>You're my fav view >3</h2>

      <p>
        Capured you in every universe &<br>
        will be there at your smiles, chaos, love… everything 💖
      </p>

      <div class="button-row">
        <button class="secondary" onclick="step=3;render()">Back</button>
        <button onclick="step=15;render()">Next</button>
      </div>
    </div>
  `;
}

/* STEP 11 — BOUQUET GIFT PAGE */
else if (step === 11) {
  document.body.className = "step-normal";

  card.innerHTML = `
    <div class="calm-card">
      <div class="gift-page-img">
        <img src="boquet.png" alt="Bouquet Gift">
      </div>

      <h2>For You 🌸</h2>

      <p>
        I will love you <br>until these flowers fade 💐
      </p>

      <div class="button-row">
        <button class="secondary" onclick="step=3;render()">Back</button>
        <button onclick="step=16;render()">Next</button>
      </div>
    </div>
  `;
}

/* STEP 12 — SPOTIFY PAGE */
else if (step === 12) {
  document.body.className = "step-normal";

  card.innerHTML = `
    <div class="calm-card">
      <div class="gift-page-img">
        <img src="spotify.png">
      </div>

      <h2>Only YOU 🎵</h2>

      <p>
      ~ This always remainds of you >3 💖
      </p>

      <div class="button-row">
        <button class="secondary" onclick="step=3;render()">Back</button>
        <button onclick="openSpotifyPlaylist()">Open Playlist</button>
      </div>
    </div>
  `;
}

/* STEP 13 — SPECIAL LOVE LETTER PAGE */
/* STEP 13 — SPECIAL LOVE LETTER PAGE */
else if (step === 13) {
  document.body.className = "step-normal";

  // Reset any Step 13 classes first
  card.classList.remove("wide-card");
  const oldInner = document.querySelector(".love-letter-card.inner-step13");
  if(oldInner) oldInner.classList.remove("inner-step13");
   
  card.innerHTML = `
    <div class="calm-card love-letter-card inner-step13">

      <div class="letter-meta">
        <p>Vijayawada</p>
        <p>${new Date().toLocaleDateString()}</p>
      </div>

      <div class="letter-content">
        <p class="salutation">Dear Mine, 💖</p>

        <p>
          I don’t even know where to begin, because every time I think of you,
          my heart feels a little too full to fit into words 🥺💗.
          Loving you hasn’t been loud or dramatic — it has been gentle,
          steady, and deeply comforting. It feels like home.
        </p>

        <p>
          You bring joy into my life in the smallest ways — in your smiles,
          in the way you exist, in how simply being around you makes
          everything feel lighter 🌸. Even on days when I feel tired,
          confused, or overwhelmed, thinking about you gives me peace.
        </p>

        <p>
          I care about you more than I ever planned to.
          I care about your happiness, your dreams, your silences,
          and even the parts of you you don’t talk about much 💕.
          I want to be there — not just on the easy days,
          but on the messy, chaotic ones too.
        </p>

        <p>
          Loving you feels effortless.
          It’s in the random thoughts,
          the quiet moments,
          the unspoken understanding 💫.
          You’ve slowly become someone my heart looks for
          without me even realizing it.
        </p>

        <p>
          If I could give you one thing,
          it would be the ability to see yourself
          the way I see you — kind, beautiful, special,
          and more than enough 💝.
        </p>

        <p>
          No matter where life takes us,
          a part of my heart will always choose you.
          Not because I have to —
          but because I want to 💗✨.
        </p>

        <p class="closing">
          yours lovingly,<br>
          <span class="signature">Panda 🐼💌</span>
        </p>
      </div>

      <div class="button-row">
        <button class="secondary" onclick="step=3;render()">Back</button>
      </div>

    </div>
  `;
  const innerCard = document.querySelector(".love-letter-card");
  if(innerCard) innerCard.classList.add("inner-step13");
  card.classList.add("special-letter-card");
}


/* STEP 14 — FINAL SURPRISE PAGE */
else if (step === 14) {
  document.body.className = "step-normal";

  card.innerHTML = `
    <div class="calm-card">
      <div class="gift-page-img">
        <img src="balloons.png">
      </div>

      <h2>My Ultimate Surprise 🎁</h2>

      <p>
        If you want to know what's this gift..💝<br>
then you’ll have to meet me today.<br><br>
Because this one isn’t meant for the screen <br>
it’s something I want to give you by myself. 💖

      </p>

      <div class="button-row">
        <button class="secondary" onclick="step=4;render()">Back</button>
      </div>
    </div>
  `;
}

/* STEP 15 — CAMERA VIDEO PAGE */
else if (step === 15) {
  document.body.className = "step-normal";

  card.innerHTML = `
    <div class="calm-card">
      <h2>Captured Moments 🎥</h2>

      <video
        autoplay
        controls
        playsinline
        style="
          width: 100%;
          max-width: 320px;
          border-radius: 18px;
          margin: 16px auto;
          box-shadow: 0 12px 32px rgba(255, 79, 139, 0.45);
        ">
        <source src="camera-video.mp4" type="video/mp4">
      </video>

      <p>
        Every frame has a piece of my heart 💖
      </p>

      <div class="button-row">
        <button class="secondary" onclick="step=10;render()">Back</button>
      </div>
    </div>
  `;
}

/* STEP 16 — FLOWER LETTER PAGE (TWO CARDS) */
else if (step === 16) {
  document.body.className = "step-normal";
  card.classList.add("wide-card");

  card.innerHTML = `
    <div class="letter-layout">

      <!-- LEFT: BIG LETTER CARD -->
      <div class="calm-card letter-card">
        <h2 style="
  text-align: center;
  font-family: 'Playfair Display', serif;
  font-size: 32px;
  margin-bottom: 24px;
">
  💌 My Love 💗
</h2>

<p style="
  line-height: 1.8;
  font-size: 17px;
  text-align: center;
  margin-top: 16px;
">
  Red roses are for how deeply I love you.
  White roses are for the honesty and purity that I feel for you.
  Pink roses are for the care and gentle affection I hold for you every day.
  And those tiny white flowers are to symbolize the little moments like
  the smiles, the fun, the joy that make everything feel complete.
</p>

<p style="
  line-height: 1.8;
  font-size: 17px;
  text-align: center;
  margin-top: 20px;
  font-weight: 500;
">
  I chose this virtual flower bouquet because,<br>
  together they tell our story!!
</p>


        <div class="button-row" style="justify-content:flex-start; margin-top: 20px;">
        </div>
      </div>

      <!-- RIGHT: FLOWER GIRL CARD -->
      <div class="calm-card flower-card">
        <img src="flower girl.png" alt="Flower Girl">
        <button class="secondary" onclick="step=11;render()">Back</button>
      </div>

    </div>
  `;
}


}

/* =========================
   BACKGROUND VIDEO
========================= */
function addVideoBackground() {
  if (!document.querySelector(".bg-video")) {
    const video = document.createElement("video");
    video.className = "bg-video";
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;

    video.innerHTML = `<source src="fireworks.mp4" type="video/mp4">`;
    document.body.appendChild(video);
  }
}

/* =========================
   FIREWORKS
========================= */
function fireworks() {
  const target = document.querySelector(".newyear-card");
  for (let i = 0; i < 18; i++) {
    const f = document.createElement("div");
    f.className = "firework";
    f.style.left = "50%";
    f.style.top = "50%";
    f.style.background = `hsl(${Math.random() * 360},100%,60%)`;
    f.style.setProperty("--x", (Math.random() * 200 - 100) + "px");
    f.style.setProperty("--y", (Math.random() * 200 - 100) + "px");
    target.appendChild(f);
    setTimeout(() => f.remove(), 1000);
  }
}

/* =========================
   MUSIC
========================= */
function playBackgroundMusic() {
  if (!bgm) {
    bgm = document.createElement("audio");
    bgm.src = "love.mp3";
    bgm.loop = true;
    bgm.volume = 0.5;
    bgm.autoplay = true;
    bgm.style.display = "none";
    document.body.appendChild(bgm);
    bgm.play().catch(() => {});
  }
}

function switchMusic(src) {
  if (!bgm) return;
  if (bgm.src.includes(src)) return;

  bgm.pause();
  bgm.src = src;
  bgm.load();
  bgm.play().catch(() => {});
}

function openSpotifyPlaylist() {
  // Replace this URL with your playlist link
  const url = "https://open.spotify.com/playlist/3VPkSs2XRFxNU8vifVHN16";
  window.open(url, "_blank");
}

/* =========================
   NAVIGATION
========================= */
function goToStep1() {
  document.querySelector(".newyear-popup")?.remove();
  document.querySelector(".bg-video")?.remove();
  
  document.body.className = "step-normal"; 
  card.style.display = "block";              
  
  step = 1;
  render();
}

function backToStep1() {
  document.body.classList.remove("step-closed");
  document.body.classList.add("step-normal");

  switchMusic("love.mp3");
  step = 1;
  render();
}

render();
