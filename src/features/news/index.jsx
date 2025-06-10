import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ChatWidget from "../chat/index";
import { Link, useLocation, useNavigate } from "react-router-dom";
const Home = (props) => {
  const { t } = useTranslation();
  const [news, setNews] = useState([]);

  // Fetch the news data when the component mounts
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/citizen/getnews"
        );
        const result = await response.json();
        if (result.success) {
          setNews(result.data); // Store the news data in state
        } else {
          console.error("Failed to fetch news:", result.message);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []); // The empty array ensures this effect runs once when the component mounts

  return (
    <header>
      {/* News Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">
              {t("news latest News")}
            </h2>
          </div>
          <div className="flex flex-wrap justify-center">
            {news.map((newsItem, index) => (
              <div
                key={index}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
              >
                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl h-[350px] flex flex-col justify-between">
                  <h3 className="text-lg font-semibold">{newsItem.title}</h3>
                  <p className="text-gray-600 text-sm">
                    {newsItem.description}
                  </p>
                  <a
                    href={newsItem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 text-blue-600 hover:underline"
                  >
                    {t("readMore")}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h4 className="mb-4 text-lg font-semibold">
                {t("Government Services Portal")}
              </h4>
              <p className="text-gray-300">
                {t("Making government services accessible to everyone.")}{" "}
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-lg font-semibold">{t("Quick Links")}</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/" className="hover:text-white">
                    {t("Home")}
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-white">
                    {t("All Services")}
                  </Link>
                </li>
                <li>
                  <Link href="/departments" className="hover:text-white">
                    {t("Departments")}
                  </Link>
                </li>
                <li>
                  <Link href="/locations" className="hover:text-white">
                    {t("Locations")}
                  </Link>
                </li>
                <li>
                  <Link to="/app/faq" className="hover:text-white">
                    {t("FAQ")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-lg font-semibold">{t("Contact")}</h4>
              <ul className="space-y-2 text-gray-300">
                <li>{t("Email: support@govservices.gov")}</li>
                <li>{t("Phone: 19990")}</li>
                <li>{t("Hours: Sun-Fri, 7am-5pm")}</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-lg font-semibold">{t("Subscribe")}</h4>
              <p className="mb-2 text-gray-300">
                {t("Get updates on new services and features")}
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder={t("Your email")}
                  className="rounded-r-none bg-gray-700 text-white"
                />
                <button className="rounded-l-none">{t("Subscribe")}</button>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-300">
            <p>
              © {new Date().getFullYear()} Government Services Portal. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </header>
  );
};

export default Home;
