# khaalipso.cloud

Personal site presenting my projects, [Vela](https://github.com/khaalipso/vela) and
[Sillage](https://github.com/khaalipso/sillage).

Plain HTML and CSS: no build step, no dependencies, no tracking. One small script,
`assets/motion.js`, adds the scroll animations; the page is complete without it.

```
index.html   the page, in English (default)
fr/          the same page in French; the EN / FR button in the header switches between them
404.html     page served by the host for unknown addresses (absolute paths)
style.css    styles, dark and light themes follow the system
assets/      favicon and project icons (sillage.svg is copied from the Sillage repo)
assets/img/  illustrations, in SVG
assets/fonts/ Geist and Geist Mono, under the SIL Open Font License (OFL.txt)
```

The illustrations are drawn in SVG for this site: `horizon` (hero), `orbits` and `dawn`
(the "Today" and "Tomorrow" cards), `vela-sky` and `comet` (the project openers). They are
text files, so they stay sharp at any size, weigh little and diff like the rest of the site.

Preview locally:

```sh
python3 -m http.server 8000   # then open http://localhost:8000
```

Deploy by copying these files to any static host.
