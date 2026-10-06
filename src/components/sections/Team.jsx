import { useEffect, useRef } from "react";
import Data from "@data/sections/team.json";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const SIDE_SCALE = 0.65;
const MOVE_MS = 560;
const HOLD_MS = 2200;

const TeamSection = ( { team } ) => {
    const list = (Data.homepageIds || []).length
        ? Data.homepageIds.map((id) => team.find((item) => item.id === id)).filter(Boolean)
        : team.slice(0, Data.numOfItems);
    const startIndex = Math.max(list.findIndex((item) => item.id === Data.startWith), 0);
    const members = [...list.slice(startIndex), ...list.slice(0, startIndex)];
    const slides = [...members, ...members, ...members];
    const firstSlide = members.length;

    const sectionRef = useRef(null);
    const swiperRef = useRef(null);
    const showMemberRef = useRef(() => {});

    useEffect(() => {
        const section = sectionRef.current;
        const swiper = swiperRef.current;
        if (!section || !swiper || swiper.destroyed) return;
        const el = swiper.el;
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const span = members.length;

        const reveal = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            section.classList.add("is-visible");
            reveal.disconnect();
        }, { rootMargin: "0px 0px -25% 0px" });
        reveal.observe(section);

        let position = 0;
        let drag = null;
        let suppressClick = false;
        let normalizeTimer = null;
        let autoplayTimer = null;
        let scrollIdle = null;
        let followFrame = null;
        let animToken = 0;
        let goal = 0;
        let inView = false;
        let paused = false;

        const wrap = (value) => ((value % span) + span) % span;

        const translateAt = (pos) => {
            const grid = swiper.slidesGrid;
            const index = Math.min(Math.max(firstSlide + pos, 0), grid.length - 1);
            const from = Math.floor(index);
            const to = Math.min(from + 1, grid.length - 1);
            return -(grid[from] + (grid[to] - grid[from]) * (index - from));
        };

        const positionAt = (translate) => {
            const grid = swiper.slidesGrid;
            const x = -translate;
            for (let i = 0; i < grid.length - 1; i++) {
                if (x <= grid[i + 1]) return Math.max(i + (x - grid[i]) / (grid[i + 1] - grid[i]), 0) - firstSlide;
            }
            return grid.length - 1 - firstSlide;
        };

        const render = () => {
            swiper.setTranslate(translateAt(position));
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
        };

        const stopFollow = () => {
            if (followFrame !== null) cancelAnimationFrame(followFrame);
            followFrame = null;
        };

        const rebase = () => {
            while (position >= span && goal >= span) {
                position -= span;
                goal -= span;
            }
            while (position < 0 && goal < 0) {
                position += span;
                goal += span;
            }
        };

        const follow = () => {
            followFrame = null;
            rebase();
            const diff = goal - position;
            if (Math.abs(diff) < 0.003) {
                position = goal;
                swiper.setTransition(0);
                if (swiper.wrapperEl) swiper.wrapperEl.style.transitionDuration = "0ms";
                render();
                return;
            }
            position += diff * (reduceMotion ? 1 : 0.28);
            swiper.setTransition(0);
            if (swiper.wrapperEl) swiper.wrapperEl.style.transitionDuration = "0ms";
            swiper.slides.forEach((slide) => {
                const card = slide.querySelector(".ahaz-team-carousel-card");
                if (card) card.style.transitionDuration = "0ms";
            });
            render();
            followFrame = requestAnimationFrame(follow);
        };

        const normalize = () => {
            const wrapped = wrap(position);
            const shift = wrapped - position;
            if (Math.abs(shift) < 0.001) return;
            swiper.setTransition(0);
            if (swiper.wrapperEl) swiper.wrapperEl.style.transitionDuration = "0ms";
            swiper.slides.forEach((slide) => {
                const card = slide.querySelector(".ahaz-team-carousel-card");
                const desc = slide.querySelector(".ahaz-team-carousel-desc");
                if (card) card.style.transitionDuration = "0ms";
                if (desc) desc.style.transition = "none";
            });
            position = wrapped;
            goal += shift;
            render();
            requestAnimationFrame(() => {
                if (swiper.destroyed) return;
                swiper.slides.forEach((slide) => {
                    const desc = slide.querySelector(".ahaz-team-carousel-desc");
                    if (desc) desc.style.transition = "";
                });
            });
        };

        const animateTo = (next) => {
            const token = ++animToken;
            stopFollow();
            const duration = reduceMotion ? 0 : MOVE_MS;
            goal = next;
            position = next;
            requestAnimationFrame(() => {
                if (token !== animToken || swiper.destroyed) return;
                if (swiper.wrapperEl) swiper.wrapperEl.style.transitionDuration = `${duration}ms`;
                swiper.setTranslate(translateAt(position));
                if (swiper.wrapperEl) swiper.wrapperEl.style.transitionDuration = `${duration}ms`;
                swiper.updateActiveIndex();
                swiper.updateSlidesClasses();
            });
            clearTimeout(normalizeTimer);
            normalizeTimer = setTimeout(() => {
                if (token !== animToken) return;
                normalize();
            }, duration + 40);
        };

        const stopAutoplay = () => {
            clearTimeout(autoplayTimer);
            autoplayTimer = null;
        };

        const queueAutoplay = () => {
            stopAutoplay();
            if (paused || !inView || reduceMotion) return;
            autoplayTimer = setTimeout(() => {
                if (paused || !inView || drag) return;
                animateTo(Math.round(wrap(position)) + 1);
                queueAutoplay();
            }, HOLD_MS + MOVE_MS);
        };

        showMemberRef.current = (memberIndex) => {
            const current = wrap(position);
            let delta = memberIndex - current;
            if (delta > span / 2) delta -= span;
            if (delta < -span / 2) delta += span;
            if (delta === 0) return;
            animateTo(current + delta);
            queueAutoplay();
        };

        const onKeyDown = (e) => {
            if (!inView || (e.key !== "ArrowRight" && e.key !== "ArrowLeft")) return;
            e.preventDefault();
            showMemberRef.current(wrap(wrap(position) + (e.key === "ArrowRight" ? 1 : -1)));
        };

        const onPointerDown = (e) => {
            if (e.pointerType === "mouse" && e.button !== 0) return;
            drag = { id: e.pointerId, x: e.clientX, y: e.clientY, moved: false };
            paused = true;
            stopAutoplay();
            swiper.setTransition(0);
        };

        const onPointerMove = (e) => {
            if (!drag || e.pointerId !== drag.id) return;
            const dx = e.clientX - drag.x;

            if (!drag.moved) {
                if (Math.abs(dx) < 6) return;
                if (Math.abs(e.clientY - drag.y) > Math.abs(dx)) {
                    drag = null;
                    return;
                }
                drag.moved = true;
                drag.origin = position;
                goal = position;
                el.classList.add("is-dragging");
            }

            const slideWidth = swiper.slides[0]?.offsetWidth || 1;
            position = drag.origin - dx / slideWidth;
            goal = position;
            render();
        };

        const onPointerUp = (e) => {
            if (!drag || e.pointerId !== drag.id) return;
            const { moved, x } = drag;
            drag = null;
            if (!moved) {
                paused = false;
                queueAutoplay();
                return;
            }

            el.classList.remove("is-dragging");
            suppressClick = true;
            setTimeout(() => { suppressClick = false; }, 0);

            const dx = e.type === "pointercancel" ? 0 : e.clientX - x;
            const visual = positionAt(swiper.translate);
            const snapped = Math.abs(dx) < 40 ? Math.round(visual) : Math.round(visual - Math.sign(dx) * 0.5);
            goal = snapped;
            animateTo(snapped);
            paused = false;
            queueAutoplay();
        };

        const onClickCapture = (e) => {
            if (!suppressClick) return;
            e.preventDefault();
            e.stopPropagation();
        };

        const seen = new IntersectionObserver(([entry]) => {
            inView = entry.isIntersecting && entry.intersectionRatio >= 0.35;
            if (inView) queueAutoplay();
            else stopAutoplay();
        }, { threshold: [0, 0.35, 0.6] });
        seen.observe(section);

        let lastScroll = window.scrollY;
        const onScroll = () => {
            const y = window.scrollY;
            const dy = y - lastScroll;
            lastScroll = y;
            if (!inView || !dy || drag) return;

            animToken += 1;
            clearTimeout(normalizeTimer);
            paused = true;
            stopAutoplay();
            goal += dy / (window.innerWidth < 768 ? 200 : 260);
            if (followFrame === null) followFrame = requestAnimationFrame(follow);
            clearTimeout(scrollIdle);
            scrollIdle = setTimeout(() => {
                paused = false;
                queueAutoplay();
            }, 280);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);
        window.addEventListener("pointercancel", onPointerUp);
        el.addEventListener("pointerdown", onPointerDown);
        el.addEventListener("click", onClickCapture, true);

        swiper.setTransition(0);
        render();

        return () => {
            clearTimeout(normalizeTimer);
            clearTimeout(scrollIdle);
            stopFollow();
            stopAutoplay();
            reveal.disconnect();
            seen.disconnect();
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("pointerup", onPointerUp);
            window.removeEventListener("pointercancel", onPointerUp);
            el.removeEventListener("pointerdown", onPointerDown);
            el.removeEventListener("click", onClickCapture, true);
        };
    }, [members.length, firstSlide]);

    const layoutCards = (swiper) => {
        const spaceBetween = swiper.params.spaceBetween || 0;
        const viewportCap = window.innerWidth < 768 ? 1.15 : window.innerWidth < 1200 ? 2.15 : 2.75;
        const maxDistance = Math.min(viewportCap, Math.max(members.length / 2 - 0.45, 0.9));
        const activeIndex = swiper.activeIndex || 0;
        const nearest = new Map();

        swiper.slides.forEach((slide, index) => {
            const member = Number(slide.dataset.member);
            const dist = Number.isFinite(slide.progress) ? Math.abs(slide.progress) : Math.abs(index - activeIndex);
            const current = nearest.get(member);
            const closerToCenter = current && Math.abs(index - firstSlide) < Math.abs(current.index - firstSlide);
            if (!current || dist < current.dist - 0.02 || (Math.abs(dist - current.dist) <= 0.02 && closerToCenter)) {
                nearest.set(member, { dist, index });
            }
        });

        swiper.slides.forEach((slide, index) => {
            const card = slide.querySelector(".ahaz-team-carousel-card");
            if (!card) return;
            const slideWidth = slide.offsetWidth;
            const width = card.offsetWidth;
            const offset = -slide.progress;
            const distance = Math.abs(offset);
            const member = Number(slide.dataset.member);
            const chosen = nearest.get(member);

            const desc = slide.querySelector(".ahaz-team-carousel-desc");

            if (!chosen || chosen.index !== index || distance > maxDistance) {
                card.style.visibility = "hidden";
                card.style.pointerEvents = "none";
                if (desc) desc.style.visibility = "hidden";
                return;
            }

            card.style.visibility = "visible";
            card.style.pointerEvents = "";
            if (desc) desc.style.visibility = "";
            const gap = width * 0.18;
            const sideWidth = width * SIDE_SCALE;
            const firstStep = width / 2 + gap + sideWidth / 2;
            const target = distance <= 1
                ? distance * firstStep
                : firstStep + (distance - 1) * (sideWidth + gap);
            const scale = 1 - (1 - SIDE_SCALE) * Math.min(distance, 1);

            card.style.transform = `translateX(${Math.sign(offset) * target - offset * (slideWidth + spaceBetween)}px) scale(${scale})`;
            slide.style.zIndex = slides.length - Math.round(distance);
        });
    };

    const setCardsTransition = (swiper, speed) => {
        swiper.slides.forEach((slide) => {
            const card = slide.querySelector(".ahaz-team-carousel-card");
            if (card) card.style.transitionDuration = `${speed}ms`;
        });
    };

    return (
        <>
            {/* Ahaz Team scroll carousel */}
			<section
				ref={sectionRef}
				className="ahaz-section ahaz-team-carousel"
				style={{ "--team-count": members.length }}
			>
				<div className="ahaz-team-carousel-sticky">

					{/* Heading */}
					<div className="container ahaz-team-carousel-head">
						<p className="ahaz-team-carousel-title">{Data.title}</p>
						<Link className="ahaz-team-carousel-meet" href={"/team"} aria-label="Meet all team members">
							<span>Meet All</span>
							<i aria-hidden="true" className="fas fa-arrow-right" />
						</Link>
					</div>

					{/* Team slides */}
					<div className="ahaz-team-carousel-stage">
					<Swiper
						centeredSlides
						initialSlide={firstSlide}
						allowTouchMove={false}
						speed={560}
						spaceBetween={0}
						slidesPerView={2.1}
						watchSlidesProgress
						breakpoints={{
							768: { slidesPerView: 3.5 },
							1200: { slidesPerView: 4.7 },
							1600: { slidesPerView: 5.8 },
						}}
						onSwiper={(swiper) => {
							swiperRef.current = swiper;
							layoutCards(swiper);
						}}
						onProgress={layoutCards}
						onResize={layoutCards}
						onSetTransition={setCardsTransition}
						className="ahaz-team-carousel-swiper"
					>
						{slides.map((item, key) => (
						<SwiperSlide
							key={`team-slide-${item.id}-${key}`}
							data-member={key % members.length}
							className="ahaz-team-carousel-slide"
							style={{ "--reveal-delay": `${0.1 + Math.abs(key - firstSlide) * 0.08}s` }}
						>
							<button
								type="button"
								className="ahaz-team-carousel-card"
								aria-label={`Show ${item.name}`}
								aria-hidden={Math.floor(key / members.length) !== 1 ? "true" : undefined}
								tabIndex={Math.floor(key / members.length) !== 1 ? -1 : undefined}
								onClick={() => showMemberRef.current(key % members.length)}
							>
								<img decoding="async" src={item.image} alt={item.name} draggable={false} />
								{item.hover_image &&
								<img className="ahaz-team-carousel-hover" decoding="async" src={item.hover_image} alt="" aria-hidden="true" draggable={false} />
								}
							</button>
							<div className="ahaz-team-carousel-desc">
								<h5 className="title">{item.name}</h5>
								{item.role ? <div className="role">{item.role}</div> : null}
								<ul className="social">
									{(item.social || []).map((link, link_key) => (
									<li key={`team-slide-${key}-social-${link_key}`}>
										<a href={link.link} title={link.title} target="_blank" rel="noreferrer">
											<i aria-hidden="true" className={link.icon} />
										</a>
									</li>
									))}
								</ul>
							</div>
						</SwiperSlide>
						))}
					</Swiper>
					</div>

				</div>
			</section>
        </>
    );
};

export default TeamSection;
