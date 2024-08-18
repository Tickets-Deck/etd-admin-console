export const modalOverlayVariant = {
  opened: {
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
  closed: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};
export const modalCardVariant = {
  opened: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      //   ease: "easeOut",
    //   ease: [0.41, 0.11, 0.22, 1.28],
      ease: [0.97, -0.18, 0.27, 1.55],
    },
  },
  closed: {
    opacity: 0,
    scale: 1,
    y: 30,
    transition: {
      duration: 0.4,
      // use cubic bezier curve for more control over the animation
      // ease: [0.6, -0.05, 0.01, 0.99],
      ease: [0.65, -0.07, 0.25, 1.24],
    },
  },
};

export const drawerVariant = {
  opened: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      //   ease: "easeOut",
      ease: 'linear',
    },
  },
  closed: {
    opacity: 0,
    x: '100%',
    transition: {
      duration: 0.3,
      // use cubic bezier curve for more control over the animation
      // ease: [0.6, -0.05, 0.01, 0.99],
      ease: 'linear',
    },
  },
};
