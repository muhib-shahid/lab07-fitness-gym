const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (menuToggle && primaryNav) {
  const resetDesktopNavigation = () => {
    if (!window.matchMedia("(max-width: 850px)").matches) {
      primaryNav.hidden = false;
      menuToggle.setAttribute("aria-expanded", "true");
    }
  };

  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    primaryNav.hidden = expanded;
  });

  window.addEventListener("resize", resetDesktopNavigation);
  resetDesktopNavigation();

  primaryNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement && window.matchMedia("(max-width: 850px)").matches) {
      menuToggle.setAttribute("aria-expanded", "true");
      primaryNav.hidden = false;
    }
  });
}

document.querySelectorAll("[data-plan]").forEach((button) => {
  button.addEventListener("click", () => {
    const form = document.querySelector("#contact-form");
    const message = form?.elements.namedItem("message");
    if (!(message instanceof HTMLTextAreaElement)) return;

    message.value = `I'm interested in the ${button.dataset.plan} membership.`;
    form?.scrollIntoView({ behavior: "smooth", block: "center" });
    form?.elements.namedItem("name")?.focus({ preventScroll: true });
  });
});

document.querySelectorAll("[data-program]").forEach((link) => {
  link.addEventListener("click", () => {
    const message = contactForm?.elements.namedItem("message");
    if (message instanceof HTMLTextAreaElement) {
      message.value = `I'd like to learn more about ${link.dataset.program}.`;
    }
  });
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  const name = new FormData(contactForm).get("name");
  formStatus.textContent = `Thanks, ${name}. Your message is ready!`;
  contactForm.reset();
});

const year = document.querySelector("#current-year");
if (year) year.textContent = String(new Date().getFullYear());
