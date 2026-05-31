'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import NeuralCanvas from './NeuralCanvas';
import NoiseTexture from './NoiseTexture';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      {/* Layer 1 - Dark base with radial glow */}
      <div className={styles.layerBg} />

      {/* Layer 2 - Neural canvas particles */}
      <NeuralCanvas />

      {/* Layer 3 - Noise texture */}
      <NoiseTexture />

      {/* Layer 4 - Hero content */}
      <div className={styles.content}>
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={styles.badge}
        >
          <Sparkles size={12} />
          <span>AeyeGentics</span>
        </motion.div>

        {/* Field label */}
        <div className={styles.thesisBlock}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className={styles.thesisLabel}
          >
            AI Operations &amp; Brand Systems
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
          Systems built so you can work{' '}
          <span className={styles.highlight}>on your business,</span>
          <br />
          not in it.
        </motion.p>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
          className={styles.body}
        >
          We build the AI automations and client-attracting brand systems that handle the heavy lifting, giving you back your time to focus on growth.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
          className={styles.ctaForm}
        >
          <a href="mailto:hello@aeyegentic.com" className={styles.ctaButton}>
            Fix My Operations
            <ArrowRight size={16} className={styles.arrow} />
          </a>
          <a href="mailto:hello@aeyegentic.com" className={styles.emailLink}>
            hello@aeyegentic.com
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
