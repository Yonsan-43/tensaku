import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import '../scss/style.scss';

 // スクロール
 document.querySelectorAll("a[href^='#']:not([href='#'])").forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
          let targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
          });
      }
      closeBgmenu();
  });
});

const toTopButton = document.getElementById('toTop')

// トップへスクロール
if (toTopButton) {
    toTopButton.addEventListener('click', () => {
        // スクロール処理を実行
        window.scrollTo({
            top: 0,           // ページの最上部（座標 0）を指定
            behavior: 'smooth' // スムーズスクロールを有効化
        });
    });
}

// ヘッダー
document.addEventListener("scroll", function () {
  const windowHeight = window.scrollY;
  const headerClass = document.querySelector(".l-header");

  // 背景色: 100px 超えたら常に表示、戻ったら非表示
  if (windowHeight > 700) {
    headerClass.classList.add("js-has-bg");
    headerClass.style.background = "#fff";
    headerClass.style.boxShadow = "0 3px 6px 0 rgba(0, 0, 0, 0.25)";
    toTopButton.style.visibility = "visible";
    toTopButton.style.opacity = "1";
  } else {
    headerClass.classList.remove("js-has-bg");
    headerClass.style.background = "none";
    headerClass.style.boxShadow = "none";
    toTopButton.style.visibility = "hidden";
    toTopButton.style.opacity = "0";
  }
});

// ハンバーガーメニュー

const jsHamburger = document.getElementById('js-hamburger');
const Body = document.body;
const jsGlobalMenu = document.getElementById('js-global-menu');
jsHamburger.addEventListener('click', function(){
    // Body
    if (this.getAttribute('aria-expanded') == 'false') {
        this.setAttribute('aria-expanded', true)
        jsGlobalMenu.style.visibility = 'visible'
        jsGlobalMenu.classList.add('is-hamburger')
        Body.style.overflow = 'hidden'
        jsGlobalMenu.setAttribute('aria-hidden', false)
    }else{
        this.setAttribute('aria-expanded', false)
        jsGlobalMenu.style.visibility = 'hidden'
        jsGlobalMenu.classList.remove('is-hamburger')
        jsGlobalMenu.setAttribute('aria-hidden', 'true')
        Body.style.overflow = "visible";
    }
});
function closeBgmenu(){
  jsHamburger.setAttribute('aria-expanded', false)
  jsGlobalMenu.style.visibility = 'hidden'
  jsGlobalMenu.classList.remove('is-hamburger')
  jsGlobalMenu.setAttribute('aria-hidden', 'true')
  Body.style.overflow = "visible";
}

// FAQ タブ
document.addEventListener('DOMContentLoaded', () => {
    // 1. タブアイテム（クリック対象）をすべて取得
    const tabItems = document.querySelectorAll('.c-button-faq');

    const tabContents = document.querySelectorAll('.top-faq__list__wrap');

    tabItems.forEach(tabItem => {
        tabItem.addEventListener('click', (event) => {

            tabItems.forEach(item => {
                item.setAttribute('aria-selected', 'false');
            });

            tabItem.setAttribute('aria-selected', 'true');

            tabContents.forEach(content => {
                content.classList.remove('js-show');
            });

            const targetPanelId = tabItem.getAttribute("aria-controls");

            const targetPanel = document.getElementById(targetPanelId);
            if (targetPanel) {
                targetPanel.classList.add('js-show');
            }

            event.preventDefault();
        });
    });
});

// FAQアコーディオン
document.querySelectorAll(".top-faq__list details").forEach((details) => {
    details.addEventListener("click", (event) => {
      event.preventDefault();
      const contentA = details.querySelector(".top-faq__item__answer");
      const contentQ = details.querySelector(".top-faq__item__question");
      const icon = details.querySelector(".c-icon-faq");

      if (details.open) {
        // Close animation

        const animation = contentA.animate(
          [
            {
              maxHeight: contentA.scrollHeight + "px",
            },
            { maxHeight: "0", paddingBlock: "0",opacity: "0" },
          ],
          {
            duration: 500,
            easing: "ease-out",
          }
        );
        animation.onfinish = () => {
          details.removeAttribute("open");
          contentA.style.maxHeight = "";
        };
      } else {
        // Open animation
        details.setAttribute("open", "");
        requestAnimationFrame(() => {
          contentA.style.maxHeight = contentA.scrollHeight + "px";
          contentA.animate(
            [
              { maxHeight: "0", paddingBlock: "0",opacity: "0"},
              {
                maxHeight: contentA.scrollHeight + "px",
                opacity: "1"
              },
            ],
            {
              duration: 500,
              easing: "ease-out",
            }
          ).onfinish = () => {
            contentA.style.maxHeight = "";
            contentA.style.opacity = 1;
          };
        });
      }
    });
  });


// ポップアップ
  document.addEventListener("DOMContentLoaded", function() {
    const popup = document.getElementById('js-popup');
    const closeButton = document.getElementById('js-popup-button');

    let isRecentlyClosed = false;

    if (!popup || !closeButton) return;

    // 初期状態でローカルストレージをチェック
    if (sessionStorage.getItem('popupClosed') !== 'true') {
        window.addEventListener('scroll', () => {

            if (isRecentlyClosed) return;

            if (window.scrollY > 2000 && !popup.classList.contains('show')) {
                popup.classList.add('show');
            }
        });
    }

    closeButton.addEventListener('click', () => {
        popup.classList.remove('show');
        // バナーが閉じられたことを記憶
        sessionStorage.setItem('popupClosed', 'true');

        // 【修正点】閉じた直後にフラグを立てる
        isRecentlyClosed = true;

        setTimeout(() => {
            isRecentlyClosed = false;
        }, 120000);
    });
});

// フォーム
(() => {
  // チェックボックスのinputタグを取得
  const checkBoxElements = Array.from(document.getElementsByClassName("js-checkbox"));

  const errorMessage = "1つ以上の選択肢を選択してください。";
  checkBoxElements
      .forEach(m => {
          // エラーメッセージを、カスタムなものに変更
          m.setCustomValidity(errorMessage);

          // 各チェックボックスのチェックのオン・オフ時に、以下の処理が実行されるようにする
          m.addEventListener("change", () => {
              // 1つ以上チェックがされているかどうかを判定
              const isCheckedAtLeastOne = document.querySelector(".js-checkbox:checked") !== null;

              // 1つもチェックがされていなかったら、すべてのチェックボックスを required にする
              // 加えて、エラーメッセージも変更する
              checkBoxElements.forEach(n => {
                  n.required = !isCheckedAtLeastOne
                  n.setCustomValidity(isCheckedAtLeastOne ? "" : errorMessage);
              });
          });
      });
})();

// swiper

const fvSwiper = new Swiper('.top-fv__swiper', { //swiperの名前
  //切り替えのモーション
  speed: 6000, //表示切り替えのスピード
  effect: "slide", //切り替えのmotion (※1)
  allowTouchMove: false, // スワイプで表示の切り替えを有効に

  //最後→最初に戻るループ再生を有効に
  loop: true,
  //自動スライドについて
  autoplay: {
    delay: 1, //何秒ごとにスライドを動かすか
    stopOnLastSlide: false, //最後のスライドで自動再生を終了させるか
    disableOnInteraction: false, //ユーザーの操作時に止める
    reverseDirection: true, //自動再生を逆向きにする
  },

   //表示について
  centeredSlides: true, //中央寄せにする
  slidesPerView: "auto",
  spaceBetween: 44,

});

const voicesSwiper = new Swiper('.top-voices__swiper', { //swiperの名前
  //切り替えのモーション
  speed: 1000, //表示切り替えのスピード
  effect: "slide", //切り替えのmotion (※1)
  allowTouchMove: true, // スワイプで表示の切り替えを有効に

  //最後→最初に戻るループ再生を有効に
  loop: true,
  // 自動スライドについて
  // autoplay: {
  //   delay: 0, //何秒ごとにスライドを動かすか
  //   stopOnLastSlide: false, //最後のスライドで自動再生を終了させるか
  //   disableOnInteraction: true, //ユーザーの操作時に止める
  //   reverseDirection: false, //自動再生を逆向きにする
  // },

   //表示について
  centeredSlides: true, //中央寄せにする
  slidesPerView: "auto",//一度に何枚見せるか？
  spaceBetween: 26,
  breakpoints: {
    1200: {
        centeredSlides: true,
        slidesPerView: 3, // 例として3枚表示
    },
},
  //ページネーション
  pagination: {
    el: ".swiper-pagination", //paginationのclass
    clickable: true, //クリックでの切り替えを有効に
    type: "bullets" //paginationのタイプ (※2)
  },
  //ナビゲーション
  navigation: {
    prevEl: ".swiper-button-prev", //戻るボタンのclass
    nextEl: ".swiper-button-next" //進むボタンのclass
  },

});

