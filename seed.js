import { db } from "./src/config/firebase-config.js";

async function seedDatabase() {
  const vacancies = [
    {
      title: "Менеджер проектів",
      company: "TechCorp",
      requirements: "Досвід управління проектами",
      salary: 25000,
      category: "it",
      region: "kyiv",
      datePosted: "2024-01-01",
    },
    {
      title: "Графічний дизайнер",
      company: "Creative Studio",
      requirements: "Досвід у Photoshop",
      salary: 22000,
      category: "design",
      region: "lviv",
      datePosted: "2022-03-15",
    },
    {
      title: "Спеціаліст з маркетингу",
      company: "Marketing Solutions",
      requirements: "SEO, SMM",
      salary: 20000,
      category: "marketing",
      region: "odesa",
      datePosted: "2022-04-08",
    },
    {
      title: "Frontend Developer",
      company: "WebMasters",
      requirements: "React, JavaScript, CSS",
      salary: 30000,
      category: "it",
      region: "lviv",
      datePosted: "2024-02-20",
    },
    {
      title: "Product Manager",
      company: "SoftWareHouse",
      requirements: "Agile, Scrum",
      salary: 35000,
      category: "it",
      region: "kyiv",
      datePosted: "2023-12-05",
    },
    {
      title: "UI/UX Designer",
      company: "DesignPro",
      requirements: "Figma, Adobe XD",
      salary: 28000,
      category: "design",
      region: "odesa",
      datePosted: "2024-01-18",
    },
  ];

  for (const vacancy of vacancies) {
    // Створюємо новий документ з автоматичним ID
    await db.collection("vacancies").add(vacancy);
  }

  console.log("Database seeded successfully with vacancies!");
}

seedDatabase();
