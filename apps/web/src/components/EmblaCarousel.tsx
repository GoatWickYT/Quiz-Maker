import React, { useCallback } from 'react';
import type { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './EmblaCarousel.css';

type PropType = {
    slides: number[];
    options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
    const { slides, options } = props;
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);

    const scrollPrev = useCallback(() => {
        if (emblaMainApi) emblaMainApi.scrollPrev();
    }, [emblaMainApi]);

    const scrollNext = useCallback(() => {
        if (emblaMainApi) emblaMainApi.scrollNext();
    }, [emblaMainApi]);

    return (
        <div className="embla relative">
            <div className="embla__viewport" ref={emblaMainRef}>
                <div className="embla__container">
                    {slides.map((index) => (
                        <div className="embla__slide" key={index}>
                            <div className="embla__slide__number">{index + 1}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation buttons */}
            <div className="embla__buttons">
                <button className="embla__button embla__button--prev" onClick={scrollPrev}>
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button className="embla__button embla__button--next" onClick={scrollNext}>
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default EmblaCarousel;
