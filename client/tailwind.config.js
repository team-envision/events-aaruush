module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      colors: {
        baseBlack: "#141414",
        baseWhite: "#e5e5e5",
        primary: "#23385f",
      },
      inset: {
        10: "10%",
        20: "20%",
        30: "30%",
        40: "40%",
        50: "50%",
        60: "60%",
        70: "70%",
        80: "80%",
        90: "90%",
      },
      height: {
        "80vh": "80vh",
        "90vh": "90vh",
      },
    },
  },
  variants: {
    margin: ["first"],
  },
  plugins: [],
};
