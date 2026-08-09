# Process overview

## What I built

A prototype site for Tilley's Devine Cafe Gallery, a Lyneham cafe and bar with
live jazz most Saturday nights — built on Astro, with a home page, menu,
history, location, and booking pages, styled to read as a cafe rather than a
generic brochure site.

## The moments that mattered

The Location page's photo carousel looked "vertically stretched" once real
photos went in, including one portrait shot among landscape ones. The obvious
fix was nudging the `height` prop, but that didn't touch the actual cause:
Astro's image service silently ignores a `height` that conflicts with a
source photo's native aspect ratio, so the generated file and the HTML's
`width`/`height` attributes disagreed, and the browser's default
`object-fit: fill` stretched the box to match. I confirmed this by inspecting
the built `dist/_astro/*.webp` files' real dimensions with `sharp` rather than
guessing from the prop, then fixed the actual box with `aspect-ratio` and
`object-fit: cover` in CSS instead of chasing the prop further
([`94b254b`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit2-VishakhaMathur/commit/94b254b191f14568daf7ec5d7fd7ff84efc5c105)).

For that same carousel, rather than pulling in a carousel library, I kept it
to CSS scroll-snap plus a ~15-line vanilla script — the site's first bit of
client-side JS — so one new interaction didn't add a dependency the rest of
the site doesn't need. I checked the prev/next buttons actually advance by one
photo width, on both a desktop and a phone-width viewport, before treating it
as done
([`94b254b`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit2-VishakhaMathur/commit/94b254b191f14568daf7ec5d7fd7ff84efc5c105)).
