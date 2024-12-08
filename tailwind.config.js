module.exports = {
	content: ['./hugo_stats.json'],
	plugins: [
    require("@tailwindcss/typography"), 
    require("daisyui")
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#e00370",
          "secondary": "#242038",
          "accent": "#8D86C9",
          "neutral": "#3d4451",
          "base-100": "#ffffff",
          "--glass-opacity": "30%"
        },
      },
    ]
  }
};