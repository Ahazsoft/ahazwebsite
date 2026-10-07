import { useEffect, useRef } from "react";
import Data from "@data/sections/team.json";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const SIDE_SCALE = 0.65;

const TeamSection = ( { team } ) => {
    const list = (Data.homepageIds || []).length
        ? Data.homepageIds.map((id) => team.find((item) => item.id === id)).filter(Boolean)
        : team.slice(0, Data.numOfItems);
    const startIndex = Math.max(list.findIndex((item) => item.id === Data.startWith), 0);
    const members = [...list.slice(startIndex), ...list.slice(0, startIndex)];
    const slides = [...members, ...members, ...members];
    const firstSlide = members.length;

    const sectionRef = useRef(null);
    const stickyRef = useRef(null);
    const swiperRef = useRef(null);
    const showMemberRef = useRef(() => {});

    useEffect(() => {
        const section = sectionRef.current;
        const swiper = swiperRef.current;
        if (!section || !swiper || swiper.destroyed) return;
        const el = swiper.el;
        const sticky = stickyRef.current;
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const span = members.length;

        const reveal = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            section.classList.add("is-visible");
            reveal.disconnect();
        }, { rootMargin: "0px 0px -25% 0px" });
        reveal.observe(section);

        let frame = null;
        let lastTime = 0;
        let position = 0;
        let bias = 0;
        let clickTarget = null;
        let drag = null;
        let suppressClick = false;
        let stickyTop = 0;

        const range = () => {
            if (!section || !sticky) return { top: window.scrollY, distance: 0 };
            const top = section.getBoundingClientRect().top + window.scrollY - stickyTop;
            return { top, distance: section.offsetHeight - sticky.offsetHeight };
        };

        const scrollProgress = () => {
            const { top, distance } = range();
            return distance > 0 ? Math.min(Math.max((window.scrollY - top) / distance, 0), 1) : 0;
        };

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

        const loopEnd = span;
        const endHold = 0.45;
        const clampIndex = (value) => Math.min(Math.max(value, 0), loopEnd);

        const scrollIndex = () => {
            const progress = scrollProgress();
            return Math.min(progress * (loopEnd + endHold), loopEnd);
        };

        const biasInfluence = (base) => {
            if (loopEnd === 0) return 0;
            return Math.min(Math.max(Math.min(base, loopEnd - base) / 0.5, 0), 1);
        };

        const render = () => {
            position = clampIndex(position);
            swiper.setTransition(0);
            if (swiper.wrapperEl) swiper.wrapperEl.style.transitionDuration = "0ms";
            swiper.slides.forEach((slide) => {
                const card = slide.querySelector(".ahaz-team-carousel-card");
                if (card) card.style.transitionDuration = "0ms";
            });
            swiper.setTranslate(translateAt(position));
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
        };

        const measure = () => {
            if (!sticky || !el.isConnected) return;
            const stepHeight = window.innerHeight * (window.innerWidth < 768 ? 0.32 : 0.4);
            const cardTop = el.getBoundingClientRect().top - sticky.getBoundingClientRect().top;
            stickyTop = Math.min(0, Math.max(window.innerHeight - sticky.offsetHeight, 16 - cardTop));
            sticky.style.top = `${stickyTop}px`;
            section.style.height = `${sticky.offsetHeight + (loopEnd + endHold) * stepHeight}px`;
        };

        const getTarget = () => {
            if (clickTarget !== null) return clampIndex(clickTarget);
            const base = scrollIndex();
            return clampIndex(base + bias * biasInfluence(base));
        };

        const tick = (time) => {
            frame = null;
            if (swiper.destroyed || !sectionRef.current || !stickyRef.current || (drag && drag.moved)) return;

            const target = getTarget();
            const dt = lastTime ? Math.min(time - lastTime, 64) : 16;
            lastTime = time;
            position += (target - position) * (reduceMotion ? 1 : 1 - Math.exp(-dt / 110));
            if (Math.abs(target - position) < 0.0005) position = target;
            if (clickTarget !== null && Math.abs(position - clickTarget) < 0.01) {
                position = clickTarget;
                clickTarget = null;
            }
            render();

            if (clickTarget !== null || Math.abs(getTarget() - position) > 0.0005) frame = requestAnimationFrame(tick);
            else lastTime = 0;
        };

        const start = () => {
            if (frame === null) frame = requestAnimationFrame(tick);
        };

        const stop = () => {
            if (frame !== null) cancelAnimationFrame(frame);
            frame = null;
            lastTime = 0;
        };

        showMemberRef.current = (memberIndex) => {
            const current = ((position % span) + span) % span;
            let delta = memberIndex - current;
            if (delta > span / 2) delta -= span;
            if (delta < -span / 2) delta += span;
            const next = clampIndex(position + delta);
            if (Math.abs(next - position) < 0.001) return;
            const base = scrollIndex();
            const influence = biasInfluence(base);
            if (influence > 0.35) bias = (next - base) / influence;
            clickTarget = next;
            start();
        };

        const alignBias = (next) => {
            const clamped = clampIndex(next);
            const base = scrollIndex();
            const influence = biasInfluence(base);
            bias = influence > 0.35 ? (clamped - base) / influence : 0;
            clickTarget = clamped;
            start();
        };

        const onKeyDown = (e) => {
            if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
            const { top, distance } = range();
            const pinned = window.scrollY >= top - 1 && window.scrollY <= top + distance + 1;
            if (!pinned) return;
            const next = Math.round(position) + (e.key === "ArrowRight" ? 1 : -1);
            if (next < 0 || next > loopEnd) return;
            e.preventDefault();
            showMemberRef.current(next);
        };

        const onPointerDown = (e) => {
            if (e.pointerType === "mouse" && e.button !== 0) return;
            drag = { id: e.pointerId, x: e.clientX, y: e.clientY, moved: false };
            clickTarget = null;
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
                stop();
                el.classList.add("is-dragging");
            }

            const slideWidth = swiper.slides[0]?.offsetWidth || 1;
            position = clampIndex(drag.origin - dx / slideWidth);
            render();
        };

        const onPointerUp = (e) => {
            if (!drag || e.pointerId !== drag.id) return;
            const { moved, x } = drag;
            drag = null;
            if (!moved) return;

            el.classList.remove("is-dragging");
            suppressClick = true;
            setTimeout(() => { suppressClick = false; }, 0);

            const dx = e.type === "pointercancel" ? 0 : e.clientX - x;
            const visual = positionAt(swiper.translate);
            const snapped = Math.abs(dx) < 40 ? Math.round(visual) : Math.round(visual - Math.sign(dx) * 0.5);
            alignBias(snapped);
        };

        const onClickCapture = (e) => {
            if (!suppressClick) return;
            e.preventDefault();
            e.stopPropagation();
        };

        const resize = new ResizeObserver(() => {
            measure();
            start();
        });
        if (sticky) resize.observe(sticky);

        const onResize = () => {
            measure();
            start();
        };

        window.addEventListener("scroll", start, { passive: true });
        window.addEventListener("resize", onResize);
        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);
        window.addEventListener("pointercancel", onPointerUp);
        el.addEventListener("pointerdown", onPointerDown);
        el.addEventListener("click", onClickCapture, true);

        measure();
        position = scrollIndex();
        render();

        return () => {
            stop();
            reveal.disconnect();
            resize.disconnect();
            window.removeEventListener("scroll", start);
            window.removeEventListener("resize", onResize);
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
        const nearest = new Map();

        swiper.slides.forEach((slide, index) => {
            const member = Number(slide.dataset.member);
            const dist = Number.isFinite(slide.progress) ? Math.abs(slide.progress) : Math.abs(index - (swiper.activeIndex || 0));
            const current = nearest.get(member);
            if (!current || dist < current.dist - 0.02) nearest.set(member, { dist, index });
        });

        swiper.slides.forEach((slide, index) => {
            const card = slide.querySelector(".ahaz-team-carousel-card");
            if (!card) return;
            const slideWidth = slide.offsetWidth;
            const width = card.offsetWidth;
            const offset = Number.isFinite(slide.progress) ? -slide.progress : index - (swiper.activeIndex || firstSlide);
            const distance = Math.abs(offset);
            const chosen = nearest.get(Number(slide.dataset.member));

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
				<div ref={stickyRef} className="ahaz-team-carousel-sticky">

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
								<img className="ahaz-team-carousel-base" decoding="async" src={item.image} alt={item.name} draggable={false} />
								{item.hover_image ? (
								<img className="ahaz-team-carousel-alt" decoding="async" src={item.hover_image} alt="" aria-hidden="true" draggable={false} />
								) : null}
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
