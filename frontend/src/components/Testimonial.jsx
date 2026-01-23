import React from "react";
import Title from "./Title";
import {assets} from '../assets/assets';
import {motion} from 'motion/react';

const Testimonial = () => {
  const testimonials = [
    {
      name: "Harsh Marothiya",
      location: "Vashi, Diga",
      image: assets.testimonial_image_1,
      testimonial:
        "I've rented cars from various services before, but this one truly stands out. The vehicle was in pristine condition, and the customer service was exceptional. Highly recommend!",
    },
      {
      name: "Mahi Chavhan",
      location: "Vashi, Panvel",
      image: assets.testimonial_image_2,
      testimonial:
        "CarRental made my trip so much easier. The Car was delivered right to my door, and the customer service was fantastic!",
    },
      {
      name: "Amit Kumar",
      location: "Vashi, Ulwhe",
      image: assets.testimonial_image_3,
      testimonial:
        "I was impressed with the variety of cars available for rent. The booking process was smooth, and the staff was friendly and knowledgeable.",
    },
  ];

  return (
    <div className="py-28 px-6 md:px-16 lg:px-24 xl:px-32">

      <Title
        title="What Our Customers Say"
        subTitle="Experience what makes DriveEase the top choice for stylish and comfortable rides around the world."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {testimonials.map((testimonial, index) => (
          <motion.div
          initial={{opacity: 0, y: 40}}
          whileInView={{opacity: 1, y: 0}}
          transition={{duration: 0.6, delay: index * 0.2, ease: 'easeOut'}}
          viewport={{once: true, amount: 0.3}}
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg hover:translate-y-1 transition-all duration-500"
          >
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <p className="text-xl">{testimonial.name}</p>
                <p className="text-gray-500">{testimonial.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <img key={index} src={assets.star_icon} alt="star-icon"/>
                ))}
            </div>
            <p className="text-gray-500 max-w-90 mt-4 font-light">
              "{testimonial.testimonial}"
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
