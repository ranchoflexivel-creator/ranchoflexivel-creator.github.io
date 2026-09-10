(() => {
  const STYLE_ID = "rf-public-visibility-fix-style";

  function ensureStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      #languageContainer { display:flex !important; visibility:visible !important; opacity:1 !important; flex-shrink:0 !important; }
      #languageSelect,#rfLanguage { display:inline-block !important; visibility:visible !important; opacity:1 !important; border:1px solid #c1c9bf !important; background:#fff !important; color:#00361a !important; border-radius:999px !important; padding:8px 12px !important; font-size:12px !important; font-weight:700 !important; outline:none !important; cursor:pointer !important; }
      @media(max-width:700px){#languageContainer{display:flex !important}#languageSelect,#rfLanguage{padding:7px 9px !important;font-size:11px !important;max-width:96px !important}}
      footer.rf-footer,footer{background-color:#00361a !important;background-image:none !important;color:#fff !important}
      footer.rf-footer .rf-footer-brand{color:#fff !important}
      footer.rf-footer .rf-footer-label{color:#fdc36d !important}
      footer.rf-footer .rf-footer-text,footer.rf-footer .rf-footer-message,footer.rf-footer #footerContact,footer.rf-footer #footerMessage{color:rgba(255,255,255,.88) !important}
      footer.rf-footer .rf-footer-bottom{color:rgba(255,255,255,.72) !important;border-color:rgba(255,255,255,.18) !important}

      /* Mobile: the delivery checkout layer must always be above the floating "Ver pedido" bar. */
      @media(max-width:600px){
        html,body{max-width:100%;overflow-x:hidden}
        #rfSticky,#rfStickyCart,#floatingCart,#stickyCart,.rf-sticky-cart,.rf-order-bar{z-index:40 !important}
        #cartDrawer,#checkoutModal,#rfCheckoutModal{z-index:100 !important}
        #cartDrawer>aside{z-index:101 !important}
        #checkoutModal>aside,#rfCheckoutModal>aside{z-index:101 !important}
        #checkoutBtn,#backToCart,#closeCheckout,#checkoutForm button[type="submit"]{position:relative !important;z-index:102 !important}
        #cartDrawer aside{padding-bottom:env(safe-area-inset-bottom,0px)}
        #cartDrawer aside>div:last-child{position:relative;z-index:102;background:#fff;padding-bottom:calc(20px + env(safe-area-inset-bottom,0px))}
        #checkoutModal aside{padding-bottom:env(safe-area-inset-bottom,0px)}
        #checkoutForm>div:last-child{position:relative;z-index:102;background:#fff;padding-bottom:calc(12px + env(safe-area-inset-bottom,0px))}
      }
    `;
    document.head.appendChild(style);
  }

  function loadScript(src, attr) {
    if (document.querySelector(`script[data-${attr}]`)) return;
    const script = document.createElement('script');
    script.type = 'module';
    script.src = src;
    script.dataset[attr] = '1';
    document.body.appendChild(script);
  }

  function syncLayers() {
    if (window.innerWidth > 600) return;
    const drawer = document.querySelector('#cartDrawer');
    const checkout = document.querySelector('#checkoutModal,#rfCheckoutModal');
    const sticky = document.querySelector('#rfSticky,#rfStickyCart,#floatingCart,#stickyCart,.rf-sticky-cart,.rf-order-bar');
    const drawerOpen = !!drawer && !drawer.classList.contains('hidden');
    const checkoutOpen = !!checkout && !checkout.classList.contains('hidden');
    if (sticky) sticky.style.setProperty('z-index', drawerOpen || checkoutOpen ? '40' : '60', 'important');
    if (drawer) drawer.style.setProperty('z-index', drawerOpen ? '100' : '50', 'important');
    if (checkout) checkout.style.setProperty('z-index', checkoutOpen ? '100' : '80', 'important');
  }

  function sync() {
    ensureStyle();
    loadScript('public-language-complete.js?v=20260820-2','rf-complete-language');
    loadScript('public-language-reverse-fix.js?v=20260820-1','rf-reverse-language');
    loadScript('public-language-global-fix.js?v=20260820-3','rf-global-language');
    const container = document.querySelector('#languageContainer');
    if (container) {
      container.classList.remove('hidden');
      container.style.setProperty('display','flex','important');
      container.style.setProperty('visibility','visible','important');
      container.style.setProperty('opacity','1','important');
    }
    const language = document.querySelector('#languageSelect') || document.querySelector('#rfLanguage');
    if (language) language.value = localStorage.getItem('rf_lang') || 'pt';
    const footer = document.querySelector('footer.rf-footer,footer');
    if (footer) {
      footer.style.setProperty('background-color','#00361a','important');
      footer.style.setProperty('background-image','none','important');
      footer.style.setProperty('color','#ffffff','important');
    }
    syncLayers();
  }

  sync();
  new MutationObserver(sync).observe(document.documentElement,{childList:true,subtree:true});
  window.addEventListener('resize', syncLayers);
})();