/*

Theme: Wizard Management Agency;
Author: Michael Chan;
Date of Creation: Mon, November 9, 2026;

*/

/* mobile nav */

const check = document.getElementById("check");
const mobileQuery = window.matchMedia("(max-width: 992px)");

/* open/close the menu and lock/unlock page scrolling together */
function setMenu(open)
{
	check.checked = open;
	document.documentElement.classList.toggle("nav-open", open);
}

/* hamburger and overlay both toggle the checkbox, so listen for its change */
check.addEventListener("change", function ()
{
	setMenu(check.checked);
});

/* close the menu after tapping any link inside it (useful for #contact on the same page) */
document.querySelectorAll(".main-nav a").forEach(function (link)
{
	link.addEventListener("click", function ()
	{
		setMenu(false);
	});
});

/* close with the Escape key */
document.addEventListener("keydown", function (e)
{
	if (e.key === "Escape" && check.checked)
	{
		setMenu(false);
	}
});

/* if the screen is resized to desktop width while the menu is open, reset everything */
mobileQuery.addEventListener("change", function (e)
{
	if (!e.matches)
	{
		setMenu(false);
	}
});

/* browsers can restore the checkbox as checked after a refresh or back navigation, so start closed */
window.addEventListener("pageshow", function ()
{
	setMenu(false);
});

/* mobile nav end */

/* go up button */

const goUp = document.getElementById("go-up");
const showAfter = 400;	/* how far down the page (in px) before the button appears */

/* show the button only after scrolling past the set distance */
function toggleGoUp()
{
	goUp.classList.toggle("show", window.scrollY > showAfter);
}

window.addEventListener("scroll", toggleGoUp, { passive: true });

/* check on load too, in case the browser restores a scrolled position after a refresh */
window.addEventListener("pageshow", toggleGoUp);

/* scroll smoothly to the top without adding # to the address bar */
goUp.addEventListener("click", function (e)
{
	e.preventDefault();
	window.scrollTo({ top: 0, behavior: "smooth" });
});

/* go up button end */

/* scroll reveal */

/* the elements that fade in as they enter the screen */
const revealSelectors = [
	".section-title",
	".section-subtitle",
	".service-card",
	".we-are-waa .container",
	".industry-card",
	".footer-title",
	".footer-grid",
	".footer-bottom",
	".about-title",
	".about-image",
	".mission-item",
	".team-group-title",
	".team-card",
	".service-title",
	".definition-left",
	".definition-right",
	".why-title",
	".why-box"
];

const revealItems = document.querySelectorAll(revealSelectors.join(","));

/* cards in the same row appear one after another: [grid, cards per row] */
[[".service-grid", 4], [".industry-grid", 3], [".why-grid", 2]].forEach(function (group)
{
	const grid = document.querySelector(group[0]);

	if (!grid) return;

	Array.from(grid.children).forEach(function (card, i)
	{
		card.style.setProperty("--delay", ((i % group[1]) * 0.12) + "s");
	});
});

const revealObserver = new IntersectionObserver(function (entries)
{
	entries.forEach(function (entry)
	{
		/* add the class when the element enters, remove it when it leaves,
		   so the effect repeats when scrolling in either direction */
		entry.target.classList.toggle("in-view", entry.isIntersecting);
	});
},
{
	threshold: 0.15,
	rootMargin: "0px 0px -6% 0px"
});

revealItems.forEach(function (item)
{
	item.classList.add("reveal");
	revealObserver.observe(item);
});

/* scroll reveal end */