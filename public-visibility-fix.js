(() => {
  const STYLE_ID = "rf-public-visibility-fix-style";

  function ensureStyle() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;

    style.textContent = `
      #languageContainer {
        display:flex !important;
        visibility:visible !important;
        opacity:1 !important;
        flex-shrink:0 !important;
      }

      #languageSelect,
      #rfLanguage {
        display:inline-block !important;
        visibility:visible !important;
        opacity:1 !important;
        border:1px solid #c1c9bf !important;
        background:#fff !important;
        color:#00361a !important;
        border-radius:999px !important;
        padding:8px 12px !important;
        font-size:12px !important;
        font-weight:700 !important;
        outline:none !important;
        cursor:pointer !important;
      }

      @media(max-width:700px) {
        #languageContainer {
          display:flex !important;
        }

        #languageSelect,
        #rfLanguage {
          padding:7px 9px !important;
          font-size:11px !important;
          max-width:96px !important;
        }
      }

      footer.rf-footer,
      footer {
        background-color:#00361a !important;
        background-image:none !important;
        color:#fff !important;
      }

      footer.rf-footer .rf-footer-brand {
        color:#fff !important;
      }

      footer.rf-footer .rf-footer-label {
        color:#fdc36d !important;
      }

      footer.rf-footer .rf-footer-text,
      footer.rf-footer .rf-footer-message,
      footer.rf-footer #footerContact,
      footer.rf-footer #footerMessage {
        color:rgba(255,255,255,.88) !important;
      }

      footer.rf-footer .rf-footer-bottom {
        color:rgba(255,255,255,.72) !important;
        border-color:rgba(255,255,255,.18) !important;
      }

      /*
       =========================================================
       CORREÇÃO DEFINITIVA MOBILE
       "CONTINUAR PARA ENTREGA" ACIMA DE "VER PEDIDO"
       =========================================================
       */

      @media(max-width:600px) {

        html,
        body {
          max-width:100%;
          overflow-x:hidden;
        }

        /*
         * Barra flutuante "Ver pedido"
         */
        #rfSticky {
          position:fixed !important;
          left:50% !important;
          bottom:10px !important;
          transform:translateX(-50%) !important;
          z-index:40 !important;
        }

        #rfStickyCart,
        #floatingCart,
        #stickyCart,
        .rf-sticky-cart,
        .rf-order-bar {
          z-index:40 !important;
        }

        /*
         * Painel do carrinho
         */
        #cartDrawer {
          position:fixed !important;
          z-index:100 !important;
        }

        #cartDrawer > aside {
          position:relative !important;
          z-index:101 !important;
        }

        /*
         * Espaço extra na parte inferior do carrinho.
         * Isso impede que o botão fique escondido pela
         * barra "Ver pedido".
         */
        #cartDrawer aside {
          padding-bottom:120px !important;
        }

        /*
         * Área onde ficam os botões do carrinho.
         */
        #cartDrawer aside > div:last-child {
          position:relative !important;
          z-index:200 !important;
          background:#fff !important;
          padding-bottom:calc(20px + env(safe-area-inset-bottom,0px)) !important;
        }

        /*
         * BOTÃO "CONTINUAR PARA ENTREGA"
         * Fica acima de tudo.
         */
        #checkoutBtn {
          position:relative !important;
          z-index:999 !important;
          display:block !important;
          visibility:visible !important;
          opacity:1 !important;
          margin-bottom:20px !important;
        }

        /*
         * Outros botões do checkout
         */
        #backToCart,
        #closeCheckout,
        #checkoutForm button[type="submit"] {
          position:relative !important;
          z-index:999 !important;
        }

        /*
         * Modal de checkout
         */
        #checkoutModal,
        #rfCheckoutModal {
          position:fixed !important;
          z-index:110 !important;
        }

        #checkoutModal > aside,
        #rfCheckoutModal > aside {
          position:relative !important;
          z-index:111 !important;
        }

        #checkoutModal aside,
        #rfCheckoutModal aside {
          padding-bottom:120px !important;
        }

        #checkoutForm > div:last-child {
          position:relative !important;
          z-index:999 !important;
          background:#fff !important;
          padding-bottom:calc(20px + env(safe-area-inset-bottom,0px)) !important;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function loadScript(src, attr) {
    if (document.querySelector(`script[data-${attr}]`)) return;

    const script = document.createElement("script");
    script.type = "module";
    script.src = src;
    script.dataset[attr] = "1";

    document.body.appendChild(script);
  }

  function syncLayers() {
    if (window.innerWidth > 600) return;

    const drawer = document.querySelector("#cartDrawer");
    const checkout = document.querySelector(
      "#checkoutModal,#rfCheckoutModal"
    );
    const sticky = document.querySelector(
      "#rfSticky,#rfStickyCart,#floatingCart,#stickyCart,.rf-sticky-cart,.rf-order-bar"
    );

    const drawerOpen =
      !!drawer && !drawer.classList.contains("hidden");

    const checkoutOpen =
      !!checkout && !checkout.classList.contains("hidden");

    /*
     * VER PEDIDO = camada inferior
     */
    if (sticky) {
      sticky.style.setProperty(
        "z-index",
        "40",
        "important"
      );
    }

    /*
     * CARRINHO = camada superior
     */
    if (drawer) {
      drawer.style.setProperty(
        "z-index",
        drawerOpen ? "100" : "50",
        "important"
      );
    }

    /*
     * CHECKOUT = camada superior
     */
    if (checkout) {
      checkout.style.setProperty(
        "z-index",
        checkoutOpen ? "110" : "80",
        "important"
      );
    }

    /*
     * BOTÃO CONTINUAR PARA ENTREGA
     */
    const checkoutBtn = document.querySelector("#checkoutBtn");

    if (checkoutBtn && drawerOpen) {
      checkoutBtn.style.setProperty(
        "position",
        "relative",
        "important"
      );

      checkoutBtn.style.setProperty(
        "z-index",
        "999",
        "important"
      );
    }
  }

  function sync() {
    ensureStyle();

    loadScript(
      "public-language-complete.js?v=20260820-2",
      "rf-complete-language"
    );

    loadScript(
      "public-language-reverse-fix.js?v=20260820-1",
      "rf-reverse-language"
    );

    loadScript(
      "public-language-global-fix.js?v=20260820-3",
      "rf-global-language"
    );

    const container =
      document.querySelector("#languageContainer");

    if (container) {
      container.classList.remove("hidden");

      container.style.setProperty(
        "display",
        "flex",
        "important"
      );

      container.style.setProperty(
        "visibility",
        "visible",
        "important"
      );

      container.style.setProperty(
        "opacity",
        "1",
        "important"
      );
    }

    const language =
      document.querySelector("#languageSelect") ||
      document.querySelector("#rfLanguage");

    if (language) {
      language.value =
        localStorage.getItem("rf_lang") || "pt";
    }

    const footer =
      document.querySelector(
        "footer.rf-footer,footer"
      );

    if (footer) {
      footer.style.setProperty(
        "background-color",
        "#00361a",
        "important"
      );

      footer.style.setProperty(
        "background-image",
        "none",
        "important"
      );

      footer.style.setProperty(
        "color",
        "#ffffff",
        "important"
      );
    }

    syncLayers();
  }

  sync();

  new MutationObserver(sync).observe(
    document.documentElement,
    {
      childList:true,
      subtree:true
    }
  );

  window.addEventListener(
    "resize",
    syncLayers
  );
})();
