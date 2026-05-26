'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import NeuralCanvas from './NeuralCanvas';
import NoiseTexture from './NoiseTexture';
import styles from './Hero.module.css';

const Hero = () => {
  const underlineRef = useRef<HTMLSpanElement>(null);

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
          <span>AI Consulting — augmented. not artificial.</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          className={styles.headline}
        >
          AI that keeps
          <br />
          you in the room.
          <span ref={underlineRef} className={styles.underline} />
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className={styles.subtext}
        >
          <span className={styles.highlight}>Adiuvatai</span> helps businesses move from
          AI confusion to{' '}
          <span className={styles.highlight}>working AI systems</span>.
          We bring clarity, strategy, and implementation discipline.
        </motion.p>

        {/* Core Insight */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
          className={styles.insightBlock}
        >
          <p className={styles.insight}>
            Most organizations do not have an AI problem.
            <br />
            They have a{' '}
            <span className={styles.insightHighlight}>clarity problem.</span>
          </p>
        </motion.div>

        {/* CTA form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
          className={styles.ctaForm}
        >
          <a href="mailto:hello@adiuvatai.com" className={styles.ctaButton}>
            Start the conversation
            <ArrowRight size={16} className={styles.arrow} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
