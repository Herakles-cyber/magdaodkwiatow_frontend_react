import React from 'react'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'
import styles from './HomeHeader.module.css'

const settings = {
	dots: true,
	infinite: true,
	speed: 500,
	autoplay: true,
	autoplaySpeed: 3000,
	slidesToShow: 1,
	slidesToScroll: 1,
}

interface Slide {
	image: string
	alt: string
	caption: string
	link: string
}

const slides: Slide[] = [
	{
		image: '/images/nasiona_karuzela.jpg',
		alt: 'Promocja 1',
		caption: 'Nowe nasiona już w sprzedaży!',
		link: '/produkty/nasiona',
	},
	{
		image: '/images/nasiona_karuzela.jpg',
		alt: 'Promocja 2',
		caption: 'Odkryj nowe produkty!',
		link: '/produkty/nasiona',
	},
	{
		image: '/images/nasiona_karuzela.jpg',
		alt: 'Promocja 3',
		caption: 'Promocje tylko u nas!',
		link: '/produkty/nasiona',
	},
]

const HomeHeader: React.FC = () => {
	return (
		<header className={styles.header}>
			<Slider {...settings}>
				{slides.map((slide, index) => (
					<div key={index} className={styles.slide}>
						<img src={slide.image} alt={slide.alt} className={styles.slideImage} />
						<div className={styles.overlay}></div>
						<div className={styles.caption}>
							<h2>{slide.caption}</h2>
							<Link to={slide.link} className={styles.button}>
								Zobacz ofertę
							</Link>
						</div>
					</div>
				))}
			</Slider>
		</header>
	)
}

export default HomeHeader
