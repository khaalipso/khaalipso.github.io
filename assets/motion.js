// Scroll motion for khaalipso.cloud: blocks rise into view, the tagline lights up word by
// word, and photos drift at their own pace. Everything is readable without this file, and
// nothing runs when the visitor asks for reduced motion.
(() => {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!("IntersectionObserver" in window)) return;

  // Rise into view, staggered among siblings.
  const blocks = document.querySelectorAll(
    ".projects .card, .moment, .features li, .project > .lead, .install, .links, .faq > h2, .faq details, .contact > *",
  );
  const rise = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("in");
        rise.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -10% 0px" },
  );
  for (const el of blocks) {
    const siblings = [...el.parentElement.children].filter((c) => c.matches(el.tagName));
    el.style.setProperty("--d", Math.min(siblings.indexOf(el), 5));
    el.classList.add("reveal");
    rise.observe(el);
  }

  // Tagline: each word lights up as it crosses a line just under the middle of the screen.
  const tagline = document.querySelector(".tagline");
  if (tagline) {
    tagline.classList.add("lit");
    const words = new IntersectionObserver(
      (entries) => {
        entries
          .filter((e) => e.isIntersecting)
          .forEach((e, i) => {
            e.target.style.transitionDelay = `${i * 70}ms`;
            e.target.classList.add("on");
            words.unobserve(e.target);
          });
      },
      { rootMargin: "0px 0px -40% 0px" },
    );
    for (const word of tagline.querySelectorAll("span")) words.observe(word);
  }

  // Parallax: photos marked data-speed move slower than the page.
  const layers = [...document.querySelectorAll("[data-speed]")];
  let queued = false;
  const drift = () => {
    queued = false;
    const middle = innerHeight / 2;
    for (const layer of layers) {
      const box = layer.parentElement.getBoundingClientRect();
      if (box.bottom < 0 || box.top > innerHeight) continue;
      const offset = (middle - box.top - box.height / 2) * Number(layer.dataset.speed);
      layer.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    }
  };
  const request = () => {
    if (!queued) {
      queued = true;
      requestAnimationFrame(drift);
    }
  };
  addEventListener("scroll", request, { passive: true });
  addEventListener("resize", request);
  drift();
})();
