import React from "react";
import styles from "./Hero.module.css";

type HeroProps = {
  title: string;
  subtitle: string;
};

function Hero({ title, subtitle }: HeroProps): JSX.Element {
  return (
    <header className={styles.hero}>
      <h2 className={styles.hero__text}>{subtitle} </h2>

      <h1 className={styles.hero__logo}>{title}</h1>
    </header>
  );
}
export default Hero;
