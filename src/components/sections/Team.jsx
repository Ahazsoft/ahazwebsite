import { useEffect, useRef, useState } from "react";
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
    const stepRef = useRef(0);
    const stickyTopRef = useRef(0);
    const [active, setActive] = useState(0);

    const getScrollRange = () => {
        const section = sectionRef.current;
        const sticky = stickyRef.current;
        if (!section || !sticky) return { top: window.scrollY, distance: 0 };

        const top = section.getBoundingClientRect().top + window.scrollY - stickyTopRef.current;
        return { top, distance: section.offsetHeight - sticky.offsetHeight };
    };

    const isPinned = () => {
        const { top, distance } = getScrollRange();
        return window.scrollY >= top - 1 && window.scrollY <= top + distance + 1;
    };

    const goToMember = (step) => {
        const { top, distance } = getScrollRange();
        window.scrollTo({
            top: top + (distance * step) / members.length,
            behavior: isPinned() ? "instant" : "smooth",
        });
    };

    useEffect(() => {
        const section = sectionRef.current;
        const swiper = swiperRef.current;
        if (!section || !swiper || swiper.destroyed) return;
        const el = swiper.el;
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const reveal = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            section.classList.add("is-visible");
            reveal.disconnect();
        }, { rootMargin: "0px 0px -25% 0px" });
        reveal.observe(section);

        let frame = null;
        let lastTime = 0;
        let position = 0;
        let drag = null;
        let suppressClick = false;

        const measure = () => {
            const sticky = stickyRef.current;
            if (!sticky || !el.isConnected) return;

            const stepHeight = window.innerHeight * (window.innerWidth < 768 ? 0.32 : 0.4);
            const cardTop = el.getBoundingClientRect().top - sticky.getBoundingClientRect().top;
            const stickyTop = Math.min(0, Math.max(window.innerHeight - sticky.offsetHeight, 16 - cardTop));

            stickyTopRef.current = stickyTop;
            sticky.style.top = `${stickyTop}px`;
            section.style.height = `${sticky.offsetHeight + members.length * stepHeight}px`;
        };

        const getTarget = () => {
            const { top, distance } = getScrollRange();
            const progress = distance > 0 ? Math.min(Math.max((window.scrollY - top) / distance, 0), 1) : 0;
            return progress * members.length;
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

        const render = () => {
            swiper.setTranslate(translateAt(position));
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
            stepRef.current = ((swiper.activeIndex % members.length) + members.length) % members.length;
        };

        const tick = (time) => {
            frame = null;
            if (swiper.destroyed || !sectionRef.current || !stickyRef.current || (drag && drag.moved)) return;

            const target = getTarget();
            const dt = lastTime ? Math.min(time - lastTime, 64) : 16;
            lastTime = time;
            position += (target - position) * (reduceMotion ? 1 : 1 - Math.exp(-dt / 110));
            if (Math.abs(target - position) < 0.0005) position = target;
            render();

            if (position !== target) frame = requestAnimationFrame(tick);
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

        const resize = new ResizeObserver(() => {
            measure();
            start();
        });
        if (stickyRef.current) resize.observe(stickyRef.current);

        const onResize = () => {
            measure();
            start();
        };

        const onKeyDown = (e) => {
            if ((e.key !== "ArrowRight" && e.key !== "ArrowLeft") || !isPinned()) return;
            const step = (stepRef.current + (e.key === "ArrowRight" ? 1 : -1) + members.length) % members.length;
            e.preventDefault();
            goToMember(step);
        };

        const onPointerDown = (e) => {
            if (e.pointerType === "mouse" && e.button !== 0) return;
            drag = { id: e.pointerId, x: e.clientX, y: e.clientY, translate: swiper.translate, moved: false };
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
                stop();
                el.classList.add("is-dragging");
            }

            swiper.setTranslate(drag.translate + dx);
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
            const slideWidth = swiper.slides[0].offsetWidth;
            const shift = Math.abs(dx) < 40 ? 0 : -Math.sign(dx) * Math.max(1, Math.round(Math.abs(dx) / slideWidth));
            const target = ((stepRef.current + shift) % members.length + members.length) % members.length;

            position = positionAt(swiper.translate);
            if (target !== stepRef.current) goToMember(target);
            start();
        };

        const onClickCapture = (e) => {
            if (!suppressClick) return;
            e.preventDefault();
            e.stopPropagation();
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
        swiper.setTransition(0);
        position = getTarget();
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
    }, [members.length]);

    const layoutCards = (swiper) => {
        const spaceBetween = swiper.params.spaceBetween || 0;
        swiper.slides.forEach((slide) => {
            const card = slide.querySelector(".ahaz-team-carousel-card");
            if (!card) return;
            const slideWidth = slide.offsetWidth;
            const width = card.offsetWidth;
            const offset = -slide.progress;
            const distance = Math.abs(offset);
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
						speed={550}
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
						onActiveIndexChange={(swiper) => setActive(((swiper.activeIndex % members.length) + members.length) % members.length)}
						className="ahaz-team-carousel-swiper"
					>
						{slides.map((item, key) => (
						<SwiperSlide
							key={`team-slide-${item.id}-${key}`}
							className="ahaz-team-carousel-slide"
							style={{ "--reveal-delay": `${0.1 + Math.abs(key - firstSlide) * 0.08}s` }}
						>
							<button
								type="button"
								className="ahaz-team-carousel-card"
								aria-label={`Show ${item.name}`}
								aria-hidden={Math.floor(key / members.length) !== 1 ? "true" : undefined}
								tabIndex={Math.floor(key / members.length) !== 1 ? -1 : undefined}
								onClick={() => goToMember(key % members.length)}
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
									{item.social.map((link, link_key) => (
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

					<div className="ahaz-team-carousel-pagination">
						{members.map((item, key) => (
						<button
							key={`team-dot-${item.id}`}
							type="button"
							className={key === active ? "dot is-active" : "dot"}
							aria-label={`Show ${item.name}`}
							aria-current={key === active ? "true" : undefined}
							onClick={() => goToMember(key)}
						/>
						))}
					</div>

				</div>
			</section>
        </>
    );
};

export default TeamSection;
