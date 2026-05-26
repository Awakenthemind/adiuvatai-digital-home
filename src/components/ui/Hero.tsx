'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import NeuralCanvas from './NeuralCanvas';
import NoiseTexture from './NoiseTexture';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      {/* Layer 1 — Dark base with radial glow */}
      <div className={styles.layerBg} />

      {/* Layer 2 — Neural canvas particles */}
      <NeuralCanvas />

      {/* Layer 3 — Noise texture */}
      <NoiseTexture />

      {/* Layer 4 — Hero content */}
      <div className={styles.content}>
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={styles.badge}
        >
          <Sparkles size={12} />
          <span>Adiuvatai</span>
        </motion.div>

        {/* 01 / Field Thesis */}
        <div className={styles.thesisBlock}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className={styles.thesisLabel}
          >
            01 / Field Thesis
          </motion.h2>
          <span className={styles.underline} />
        </div>

        {/* Main thesis */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className={styles.sub}
        >
          Most brands don't struggle to be{' '}
          <span className={styles.strike}>seen.</span>
          <br />
          They struggle to be{' '}
          <span className={styles.highlight}>understood.</span>
        </motion.p>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
          className={styles.body}
        >
          Positioning, systems, and creative intelligence
          for brands that want to{' '}
          <span className={styles.highlight}>mean something,</span>
          {' '}not just make noise.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
          className={styles.ctaForm}
        >
          <a href="mailto:hello@adiuvatai.com" className={styles.ctaButton}>
            Begin the work
            <ArrowRight size={16} className={styles.arrow} />
          </a>
          <p className={styles.scrollHint}>Scroll to explore</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
