import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const solutions = [
  {
    id: 1,
    title: 'Executive Leadership',
    description: 'Master the art of decision-making, strategic thinking, and guiding teams to success in high-pressure environments.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2874&auto=format&fit=crop',
    tags: ['Leadership', 'Strategy']
  },
  {
    id: 2,
    title: 'Social Impact Mastery',
    description: 'Learn how to build sustainable initiatives that create measurable positive change in local and global communities.',
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2940&auto=format&fit=crop',
    tags: ['Sustainability', 'Impact']
  },
  {
    id: 3,
    title: 'Global Networking',
    description: 'Develop the skills to build, maintain, and leverage a high-value professional network across continents.',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2940&auto=format&fit=crop',
    tags: ['Networking', 'Communication']
  }
];

export function Solutions() {
  return (
    <section id="solutions" className="py-32 bg-white/50 dark:bg-black/60 backdrop-blur-md relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Solutions</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl">
              Curated programs and masterclasses designed to elevate every aspect of your professional journey.
            </p>
          </div>
          <button className="text-brand-accent font-medium flex items-center gap-2 hover:gap-4 transition-all pb-2">
            View All Programs <ArrowUpRight className="w-5 h-5" />
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative rounded-3xl overflow-hidden bg-white/60 dark:bg-black/40 backdrop-blur-md border border-white/20 dark:border-white/10 glow-card"
            >
              {/* Image Container with 3D Effect on Hover */}
              <div className="relative h-64 overflow-hidden perspective-1000">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent z-10 transition-colors duration-500" />
                <img 
                  src={solution.image} 
                  alt={solution.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-8 relative z-20 bg-transparent transform transition-transform duration-500">
                <div className="flex gap-2 mb-4">
                  {solution.tags.map(tag => (
                    <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-bold mb-3">{solution.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  {solution.description}
                </p>
                
                <div className="flex items-center text-brand-accent font-medium opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                  Explore Course <ArrowUpRight className="w-5 h-5 ml-2" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
