/* Mobile checkout overlap fix — Rancho Flexível */
(() => {
  const style = document.createElement("style");
  style.id = "rf-mobile-order-bar-fix";
  style.textContent = `
    /* The sticky "Ver pedido" bar must never cover checkout actions on phones. */
    @media (max-width: 600px) {
      #rfStickyCart {
        bottom: 8px !important;
        z-index: 45 !important;
      }

      /* Keep the checkout modal/action area above the sticky cart. */
      #rfCheckoutModal {
        padding-bottom: 96px !important;
      }

      #rfCheckoutModal form,
      #rfCheckoutModal #rfForm {
        padding-bottom: 86px !important;
      }

      #rfCheckoutModal button[type="submit"] {
        position: relative;
        z-index: 46 !important;
      }
    }
  `;
  document.head.appendChild(style);
})();
