  // Mood data
  const moods = {
    stress: {
      title: "Stress / Anxiety",
      emoji: "🌪",
      color: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
      nutrients: ["Magnesium", "Omega-3", "Vitamin C"],
      foods: ["Spinach", "Almonds", "Salmon", "Walnuts", "Oranges", "Kiwi"],
      teas: [
        { name: "Chamomile Tea", benefit: "Calming for nerves", emoji: "🌼" },
        { name: "Green Tea", benefit: "L-theanine + antioxidants for focus", emoji: "🍃" }
      ],
      images: [
        "https://picsum.photos/id/1025/600/350",
        "https://picsum.photos/id/1035/600/350",
        "https://picsum.photos/id/1045/600/350"
      ]
    },
    sadness: {
      title: "Sadness / Low Mood",
      emoji: "😔",
      color: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
      nutrients: ["Tryptophan", "B6/B12", "Complex carbs"],
      foods: ["Bananas", "Oats", "Turkey", "Leafy greens", "Legumes", "Sweet potato"],
      teas: [{ name: "Lemon Balm Tea", benefit: "Gentle uplift, reduces anxiety", emoji: "🍋🌿" }],
      images: [
        "https://picsum.photos/id/1055/600/350",
        "https://picsum.photos/id/1065/600/350",
        "https://picsum.photos/id/1075/600/350"
      ]
    },
    fatigue: {
      title: "Fatigue / Exhaustion",
      emoji: "😴",
      color: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
      nutrients: ["Iron", "B-vitamins", "Protein"],
      foods: ["Lentils", "Spinach", "Jaggery", "Eggs", "Yogurt", "Dates", "Nuts"],
      teas: [
        { name: "Ginseng Tea", benefit: "Energy booster", emoji: "🔋" },
        { name: "Peppermint Tea", benefit: "Refreshing, clears mental fog", emoji: "🌱" }
      ],
      images: [
        "https://picsum.photos/id/1085/600/350",
        "https://picsum.photos/id/1095/600/350",
        "https://picsum.photos/id/1105/600/350"
      ]
    },
    anger: {
      title: "Anger / Frustration",
      emoji: "😡",
      color: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
      nutrients: ["Potassium", "Magnesium", "Antioxidants"],
      foods: ["Bananas", "Avocados", "Dark chocolate", "Blueberries", "Cherries"],
      teas: [
        { name: "Lavender Tea", benefit: "Soothing, reduces irritation", emoji: "💜" },
        { name: "Holy Basil (Tulsi) Tea", benefit: "Balances stress hormones", emoji: "🌿" }
      ],
      images: [
        "https://picsum.photos/id/1115/600/350",
        "https://picsum.photos/id/1125/600/350",
        "https://picsum.photos/id/1135/600/350"
      ]
    },
    boredom: {
      title: "Boredom / Emptiness",
      emoji: "😐",
      color: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      nutrients: ["Fiber", "Healthy fats", "Water"],
      foods: ["Apples", "Carrots", "Cucumbers", "Hummus", "Popcorn", "Roasted chana"],
      teas: [
        { name: "Ginger Tea", benefit: "Warms, reduces mindless snacking", emoji: "🫚" },
        { name: "Hibiscus Tea", benefit: "Tangy, refreshing, curbs sugar cravings", emoji: "🌺" }
      ],
      images: [
        "https://picsum.photos/id/1145/600/350",
        "https://picsum.photos/id/1155/600/350",
        "https://picsum.photos/id/1165/600/350"
      ]
    }
  };

  // Store uploaded images by mood
  const uploadedImages = {};

  function renderMood(key) {
    const data = moods[key];
    const moodContent = document.getElementById("moodContent");
    if (!data || !moodContent) return;

    const nutrientsHtml = data.nutrients
      .map(n => `<div class="nutrient-item">${n}</div>`)
      .join("");

    const foodsHtml = data.foods
      .map(f => `<div class="food-item">${f}</div>`)
      .join("");

    const teasHtml = data.teas
      .map(
        t => `<div class="tea-item">
                <div class="tea-header"><span>${t.emoji}</span><span class="tea-name">${t.name}</span></div>
                <div class="tea-benefit">${t.benefit}</div>
              </div>`
      )
      .join("");

    // Use uploaded images if available
    const imagesToUse = uploadedImages[key]?.length ? uploadedImages[key] : data.images;
    const imagesHtml = imagesToUse
      .map(img => `<img src="${img}" alt="${data.title}">`)
      .join("");

    moodContent.innerHTML = `
      <div class="mood-header">
        <div class="mood-badge" style="background: ${data.color}">
          <span class="mood-emoji">${data.emoji}</span>
          <h3>${data.title}</h3>
        </div>
      </div>

      <!-- Image Slider -->
      <div class="slider">
        <div class="slides">
          ${imagesHtml}
        </div>
      </div>

      <div class="mood-grid">
        <div class="mood-category">
          <h4><span>🧪</span> Key Nutrients</h4>
          <div class="nutrients-list">
            ${nutrientsHtml}
          </div>
        </div>

        <div class="mood-category">
          <h4><span>🥗</span> Foods To Favor</h4>
          <div class="foods-grid">
            ${foodsHtml}
          </div>
        </div>

        <div class="mood-category">
          <h4><span>🍵</span> Helpful Teas</h4>
          <div class="teas-list">
            ${teasHtml}
          </div>
        </div>
      </div>
    `;

    // Initialize slider after rendering
    initSlider(moodContent.querySelector(".slider"));
  }

  function initSlider(slider) {
    if (!slider) return;
    const slides = slider.querySelector(".slides");
    const totalSlides = slider.querySelectorAll("img").length;
    let index = 0;

    function showNextSlide() {
      index = (index + 1) % totalSlides;
      slides.style.transform = `translateX(${-index * 600}px)`;
    }

    setInterval(showNextSlide, 2000);
  }

  // Set up interactions
  function setupMoodButtons() {
    const selector = document.getElementById("moodSelector");
    if (!selector) return;

    selector.addEventListener("click", (e) => {
      const btn = e.target.closest(".mood-btn");
      if (!btn) return;
      const key = btn.getAttribute("data-mood");
      document.querySelectorAll(".mood-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderMood(key);
    });
  }

  // Handle uploads
  function setupUploader() {
    const uploader = document.getElementById("imageUploader");
    if (!uploader) return;

    uploader.addEventListener("change", (e) => {
      const files = Array.from(e.target.files);
      const key = document.querySelector(".mood-btn.active")?.getAttribute("data-mood");
      if (!key) return;

      uploadedImages[key] = files.map(file => URL.createObjectURL(file));
      renderMood(key); // Re-render with new images
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    setupMoodButtons();
    setupUploader();
    const initial = document.querySelector(".mood-btn.active")?.getAttribute("data-mood") || "stress";
    renderMood(initial);
  });

  function showMood(_event, key) {
    const targetBtn = document.querySelector(`.mood-btn[data-mood="${key}"]`);
    if (targetBtn) targetBtn.click();
  }

