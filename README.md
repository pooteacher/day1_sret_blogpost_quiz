# Blogger Quiz Widget – Standalone JavaScript & CSS

This project provides a **quiz widget** that can be embedded in Blogger (or any HTML page) to display multiple-choice questions using a CSV file. The widget is fully client-side, requires no backend, and is mobile-friendly.

---

## Features

- **CSV Upload:** Users can upload a quiz as a CSV file.
- **Multiple Choice:** Each question supports four options.
- **Instant Feedback:**  
  - If a user clicks the correct answer:  
    - Only the clicked word turns **green** and a random encouragement appears next to it.
  - If a user clicks a wrong answer:  
    - The selected word turns **red** with "missed it", and the correct answer's word is revealed in **green**.
- **Next Button:** Users can proceed to the next question.
- **Fully Responsive:** Works on mobile and desktop.
- **No dependencies except [PapaParse](https://www.papaparse.com/) for CSV parsing.**

---

## How to Use in Blogger or Any Webpage

1. **Host the JS and CSS externally** (e.g., using GitHub Pages).
2. **Include the script and stylesheet in your Blogger page** (see below).
3. **Copy the HTML widget markup into your Blogger post or page.**
4. **Upload a quiz CSV file** using the file chooser.

---

## Example Usage

```html
<!-- Add these to your Blogger post or any HTML page -->
<link rel="stylesheet" href="https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO/quiz.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.1/papaparse.min.js"></script>
<script src="https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO/quiz.js"></script>
<!-- Then, paste the provided HTML quiz widget markup -->
```

---

## CSV Format

The CSV file should have the following headers (first row):

```
question,option1,option2,option3,option4,answer
```

- Each `optionX` is a possible answer.
- The `answer` column should be the **1-based index** of the correct option (1, 2, 3, or 4).

**Example row:**

```
What is 2+2?,3,4,5,6,2
```

---

## Customization

- **Styling:**  
  Edit `quiz.css` for custom colors, fonts, and layout.
- **Logic:**  
  Edit `quiz.js` to modify feedback, encouragements, or answer handling.

---

## Hosting on GitHub Pages

1. Create a repository (public).
2. Add your `quiz.js` and `quiz.css` files.
3. Enable GitHub Pages in repo settings (set root as the source).
4. Use the provided URLs in your Blogger pages for the CSS/JS.

---

## License

MIT License

---

## Credits

- Quiz logic and styling: [pooteacher](https://github.com/pooteacher)
- CSV parsing: [PapaParse](https://www.papaparse.com/)

---
