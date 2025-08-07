// ====================================
// 時間設定區域 - 請在這裡修改你的截止時間
// ====================================
const deadline = new Date("2025-08-20T23:59:00").getTime();

// 其他可選設定
const brandName = "德記";
const countdownTitle = "🎯 Vitamix 獨家特談組 限時開搶";
const ctaButtonText = "";

// ====================================
// 倒數計時功能
// ====================================
function updateCountdown() {
  const now = new Date().getTime();
  const distance = deadline - now;

  if (distance > 0) {
    // 計算剩餘時間
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // 更新顯示
    document.getElementById("days").textContent = String(days).padStart(2, "0");
    document.getElementById("hours").textContent = String(hours).padStart(
      2,
      "0"
    );
    document.getElementById("minutes").textContent = String(minutes).padStart(
      2,
      "0"
    );
    document.getElementById("seconds").textContent = String(seconds).padStart(
      2,
      "0"
    );

    // 緊急狀態：少於24小時
    const countdownSection = document.querySelector(".countdown-section");
    if (days === 0 && hours < 24) {
      countdownSection.classList.add("urgent");
    } else {
      countdownSection.classList.remove("urgent");
    }
  } else {
    // 時間結束
    handleTimeExpired();
  }
}

// ====================================
// 時間結束處理
// ====================================
function handleTimeExpired() {
  document.getElementById("days").textContent = "00";
  document.getElementById("hours").textContent = "00";
  document.getElementById("minutes").textContent = "00";
  document.getElementById("seconds").textContent = "00";
  document.getElementById("countdownTitle").textContent = "🎉 Offer Ended";

  const ctaButton = document.getElementById("ctaButton");
  ctaButton.textContent = "Sold Out";
  ctaButton.style.background = "#95a5a6";
  ctaButton.style.cursor = "not-allowed";
  ctaButton.onclick = null;
}

// ====================================
// CTA 按鈕點擊處理
// ====================================
function handleCTA() {
  const now = new Date().getTime();
  if (deadline > now) {
    alert(
      "🛒 Redirecting to checkout...\n\n✨ Special offer is still active!\n⏰ Don't miss out!"
    );

    // 這裡可以加入實際的跳轉邏輯
    // window.location.href = 'https://your-checkout-page.com';
  } else {
    alert(
      "😔 Sorry, this offer has ended.\n\nStay tuned for our next amazing deal!"
    );
  }
}

// ====================================
// 初始化設定
// ====================================
function initializeHeader() {
  // 設定品牌名稱
  if (brandName && document.getElementById("brandName")) {
    document.getElementById("brandName").textContent = brandName;
  }

  // 設定倒數標題
  if (countdownTitle && document.getElementById("countdownTitle")) {
    document.getElementById("countdownTitle").textContent = countdownTitle;
  }

  // 設定 CTA 按鈕文字
  if (ctaButtonText && document.getElementById("ctaButton")) {
    document.getElementById("ctaButton").textContent = ctaButtonText;
  }

  // 開始倒數計時
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ====================================
// 頁面載入完成後執行
// ====================================
document.addEventListener("DOMContentLoaded", function () {
  initializeHeader();

  // 檢查設定的時間是否有效
  if (deadline <= new Date().getTime()) {
    console.warn("警告：設定的截止時間已經過期！請更新 deadline 變數。");
  }
});

// ====================================
// 額外功能：取得剩餘時間（可選）
// ====================================
function getRemainingTime() {
  const now = new Date().getTime();
  const distance = deadline - now;

  if (distance > 0) {
    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
      total: distance,
    };
  }
  return null;
}
