import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFileAlt,
  FaBriefcase,
  FaBuilding,
  FaPhoneAlt,
  FaAmbulance,
  FaCity,
  FaCogs,
  FaGasPump,
  FaWater,
  FaPhone,
  FaEnvelope,
  FaBox,
  FaHandsHelping,
  FaUniversity,
  FaLaptop,
  FaUserTie,
  FaHospital,
  FaUserMd,
  FaStethoscope,
  FaSchool,
  FaChalkboardTeacher,
  FaUsers,
  FaMosque,
  FaBookReader,
  FaTrafficLight,
  FaRunning,
  FaBlind,
  FaDeaf,
  FaGraduationCap,
  FaGavel,
  FaBalanceScale,
  FaLeaf,
  FaPassport,
  FaFlag,
  FaTrain,
  FaGlobe,
  FaLandmark,
  FaSeedling,
  FaHome,
  FaToolbox,
  FaShieldAlt,
  FaBug,
  FaSubway,
  FaClipboardList,
  FaUtensils,
} from "react-icons/fa";
import { ProviderData } from "../../utils/providers";

const Home = (props) => {
  const ProviderData = [
    [
      {
        name: "Civil Status Sector",
        text: "Providing civil status services.",
        icons: [<FaBuilding />, <FaPhoneAlt />],
      },
      {
        name: "Health Office",
        text: "Providing health services to the community.",
        icons: [<FaBuilding />, <FaAmbulance />],
      },
      {
        name: "Ministry of Health and Population",
        text: "Government body responsible for health services.",
        icons: [<FaBuilding />, <FaAmbulance />],
      },
      {
        name: "Governorate/Technological Center",
        text: "Serving as a technological hub for governance.",
        icons: [<FaBuilding />, <FaPhoneAlt />],
      },
      {
        name: "City Authority",
        text: "Managing city services and infrastructure.",
        icons: [<FaCity />, <FaBuilding />],
      },
      {
        name: "Local Administrative Units",
        text: "Local governance and community support.",
        icons: [<FaCogs />, <FaUsers />],
      },
      {
        name: "Real Estate Registration and Documentation Authority",
        text: "Managing real estate documentation and registration.",
        icons: [<FaFileAlt />, <FaBuilding />],
      },
      {
        name: "Cairo",
        text: "Capital city of Egypt.",
        icons: [<FaCity />],
      },
      {
        name: "Gas Company (EGAS)",
        text: "Providing natural gas services.",
        icons: [<FaGasPump />],
      },
      {
        name: "Water Company",
        text: "Supplying water services.",
        icons: [<FaWater />],
      },
      {
        name: "Central (Telephone Exchange)",
        text: "Providing telecommunication services.",
        icons: [<FaPhoneAlt />],
      },
      {
        name: "Egyptian Telecommunications Company",
        text: "Telecommunications and internet services.",
        icons: [<FaPhone />],
      },
      {
        name: "Post Office",
        text: "Postal and courier services.",
        icons: [<FaEnvelope />],
      },
      {
        name: "Supply Office",
        text: "Managing supply and procurement services.",
        icons: [<FaBox />],
      },
      {
        name: "Directorate of Social Solidarity",
        text: "Providing social welfare programs.",
        icons: [<FaHandsHelping />],
      },
      {
        name: "Nasser Social Bank",
        text: "Bank providing social development loans.",
        icons: [<FaUniversity />],
      },
      {
        name: "Directorate of Labor",
        text: "Regulating labor laws and services.",
        icons: [<FaBriefcase />],
      },
      {
        name: "Government Portal",
        text: "Centralized government information platform.",
        icons: [<FaLaptop />],
      },
      {
        name: "Labor Office",
        text: "Employment services and job registration.",
        icons: [<FaUserTie />],
      },
      {
        name: "Directorate of Health Affairs",
        text: "Managing health services and facilities.",
        icons: [<FaHospital />],
      },
      {
        name: "Ministry of Labor",
        text: "Overseeing labor and employment services.",
        icons: [<FaBriefcase />],
      },
      {
        name: "Egyptian Ambulance Authority",
        text: "Emergency medical and ambulance services.",
        icons: [<FaAmbulance />],
      },
      {
        name: "General Authority for Health Insurance",
        text: "Health insurance services and coverage.",
        icons: [<FaUserMd />],
      },
      {
        name: "Medical Council of the Governorate",
        text: "Overseeing medical professionals and services.",
        icons: [<FaStethoscope />],
      },
      {
        name: "School",
        text: "Providing educational services.",
        icons: [<FaSchool />],
      },
      {
        name: "Educational Administration",
        text: "Managing educational institutions and programs.",
        icons: [<FaChalkboardTeacher />],
      },
      {
        name: "General Administration for Community Education",
        text: "Promoting community-based education.",
        icons: [<FaUsers />],
      },
      {
        name: "Sector of Al-Azhar Institutes",
        text: "Managing Islamic education institutions.",
        icons: [<FaMosque />],
      },
      {
        name: "Directorate of Education",
        text: "Providing educational services at the regional level.",
        icons: [<FaSchool />],
      },
      {
        name: "General Authority for Illiteracy Eradication and Adult Education",
        text: "Promoting literacy and adult education programs.",
        icons: [<FaBookReader />],
      },

      {
        name: "Ministry of Education Website",
        text: "Official platform for educational services.",
        icons: [<FaSchool />],
      },
      {
        name: "General Traffic Department",
        text: "Traffic regulations and licensing services.",
        icons: [<FaTrafficLight />],
      },
      {
        name: "Youth and Sports Directorate",
        text: "Providing sports and youth activities.",
        icons: [<FaRunning />],
      },
      {
        name: "Ministry of Social Solidarity",
        text: "Social protection and assistance services.",
        icons: [<FaHandsHelping />],
      },
      {
        name: "Al Noor School for the Blind",
        text: "Specialized school for visually impaired students.",
        icons: [<FaBlind />],
      },
      {
        name: "Al Amal School for the Deaf",
        text: "Educational support for deaf students.",
        icons: [<FaDeaf />],
      },
      {
        name: "School for Hearing-Impaired",
        text: "Support and education for hearing-impaired students.",
        icons: [<FaGraduationCap />],
      },
      {
        name: "Intellectual Education Schools",
        text: "Education for children with intellectual challenges.",
        icons: [<FaUniversity />],
      },
      {
        name: "Workers' Fund for Public and Private Sectors",
        text: "Support fund for sector employees.",
        icons: [<FaHandsHelping />],
      },
      {
        name: "Defense Ministry Pension and Insurance",
        text: "Insurance services for armed forces personnel.",
        icons: [<FaFlag />],
      },
      {
        name: "Primary Courts",
        text: "Judicial services and legal proceedings.",
        icons: [<FaGavel />],
      },
      {
        name: "Appeals Courts",
        text: "Handling cases for appeals and disputes.",
        icons: [<FaBalanceScale />],
      },
      {
        name: "Environmental Affairs Agency",
        text: "Environmental regulation and preservation.",
        icons: [<FaLeaf />],
      },
      {
        name: "Real Estate Tax Directorate",
        text: "Managing real estate tax collection.",
        icons: [<FaLeaf />],
      },
      {
        name: "Egyptian Tax Authority",
        text: "Administration of national taxes.",
        icons: [<FaLeaf />],
      },
      {
        name: "Passport, Immigration, and Nationality Authority",
        text: "Issuance and management of passports.",
        icons: [<FaPassport />],
      },
      {
        name: "Recruitment and Mobilization Authority",
        text: "Military conscription management.",
        icons: [<FaFlag />],
      },
      {
        name: "Railway Authority Portal",
        text: "Information and ticket booking services.",
        icons: [<FaTrain />],
      },
      {
        name: "General Work Permit Department",
        text: "Issuance of work permits.",
        icons: [<FaToolbox />],
      },
      {
        name: "General Secondary Coordination Portal",
        text: "University admission coordination.",
        icons: [<FaGraduationCap />],
      },
      {
        name: "Coordination Office",
        text: "Higher education admission services.",
        icons: [<FaUniversity />],
      },
      {
        name: "Supreme Council of Universities",
        text: "Policy coordination for higher education.",
        icons: [<FaLandmark />],
      },
      {
        name: "General Traffic Department (Ministry of Justice)",
        text: "Judicial oversight of traffic services.",
        icons: [<FaTrafficLight />],
      },
      {
        name: "Egyptian General Drainage Projects Authority",
        text: "Managing national drainage projects.",
        icons: [<FaWater />],
      },
      {
        name: "Irrigation Authority",
        text: "Water resource management.",
        icons: [<FaWater />],
      },
      {
        name: "Agricultural Budget Fund Authority",
        text: "Supporting agricultural development.",
        icons: [<FaSeedling />],
      },
      {
        name: "Groundwater Department",
        text: "Managing groundwater resources.",
        icons: [<FaGlobe />],
      },
      {
        name: "Land Improvement Projects Executive Agency",
        text: "Land development initiatives.",
        icons: [<FaBox />],
      },
      {
        name: "General Administrative Affairs Department",
        text: "Handling internal administrative tasks.",
        icons: [<FaHome />],
      },
      {
        name: "Social Development Fund",
        text: "Financial and social support services.",
        icons: [<FaHandsHelping />],
      },
      {
        name: "Social Rehabilitation Office",
        text: "Providing social support and rehabilitation services.",
        icons: [<FaUsers />],
      },
      {
        name: "Egyptian Company for Metro Operation",
        text: "Management and operation of the metro system.",
        icons: [<FaSubway />],
      },
      {
        name: "New Fardous City",
        text: "Urban development and residential projects.",
        icons: [<FaCity />],
      },
      {
        name: "Public Security Sector - Forensic Investigation Department",
        text: "Forensic evidence collection and investigations.",
        icons: [<FaShieldAlt />],
      },
      {
        name: "Public Security Sector - Licensing Department",
        text: "Issuance and management of various licenses.",
        icons: [<FaClipboardList />],
      },
      {
        name: "Public Security Sector",
        text: "General public security services.",
        icons: [<FaShieldAlt />],
      },
      {
        name: "Central Pest Control Department",
        text: "Control and prevention of agricultural pests.",
        icons: [<FaBug />],
      },
      {
        name: "Regional Center for Food and Feed",
        text: "Research and monitoring of food and animal feed quality.",
        icons: [<FaUtensils />],
      },
    ],
  ];
  const [provider, setProvider] = useState(ProviderData);

  const initialState = {
    name: "",
    email: "",
    message: "",
  };
  const [{ name, email, message }, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, message);
  };
  const ITEMS_PER_PAGE = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const currentItems = ProviderData[0]?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = currentItems?.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil((ProviderData[0]?.length || 0) / ITEMS_PER_PAGE);
  return (
    <header>
      <div className="relative py-20">
        <div className="absolute inset-0 bg-[#09122C]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="flex justify-center">
            <div className="text-center max-w-2xl">
              <h1 className="text-4xl font-bold text-white mb-4">
                E-government Documentation System
              </h1>
              <p className="text-white text-lg mb-6">
                Creating an account enables you to maintain your information,
                view pages dedicated to your needs and life affairs, and
                evaluate information and entities providing services.
              </p>
              <Link
                to="/app/profile"
                className="px-8 py-3 bg-[#872341] text-white text-lg rounded-2xl shadow-lg hover:bg-[#BE3144] transition duration-300"
              >
                Apply for Document
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">
              All Service providers
            </h2>
          </div>
          <div className="py-6 bg-gray-100">
            <div className="container mx-auto px-4">
              <div className="flex justify-center">
                <input
                  type="text"
                  placeholder="Search for a service provider..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full max-w-md p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center">
            {filteredItems.length > 0 ? (
              filteredItems.map((d, i) => (
                <div
                  key={`${d.name}-${i}`}
                  className="w-full md:w-1/2 lg:w-1/3 p-4"
                >
                  <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl h-[170px] flex flex-col justify-between">
                    <div className="flex items-start">
                      <div className="service-icon text-4xl text-[#872341]">
                        {d?.icons[0] && (
                          <div className="mr-4">{d.icons[0]}</div>
                        )}
                      </div>
                      <div className="testimonial-content mt-4 text-left flex-1">
                        <p className="text-gray-600 italic">"{d.text}"</p>
                        <div className="testimonial-meta mt-4 font-semibold text-gray-800">
                          {d.name}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center w-full">
                No results found.
              </p>
            )}
          </div>
          <div className="flex justify-center mt-6 space-x-2">
            <button
              className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="px-4 py-2 bg-gray-50 text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-8/12">
              <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold text-gray-800">
                  Get In Touch
                </h2>
                <p className="text-gray-600 mt-4">
                  Please fill out the form below to send us an email, and we
                  will get back to you as soon as possible.
                </p>
              </div>
              <form name="sentMessage" validate onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-2">
                  <div className="w-full md:w-1/2 px-2 mb-4">
                    <div className="form-group">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Name"
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 px-2 mb-4">
                    <div className="form-group">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Email"
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 px-2 mb-4">
                    <div className="form-group">
                      <input
                        type="tel"
                        id="phone"
                        name="Mobile Number"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Phone Number"
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <textarea
                    name="message"
                    id="message"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    placeholder="Message"
                    required
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-[#872341] text-white px-6 py-3 rounded-lg hover:bg-[#BE3144] transition-colors duration-300"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
            <div className="w-full lg:w-4/12 mt-12 lg:mt-0 lg:pl-8">
              <div className="contact-info">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Contact Info
                </h3>
                <div className="contact-item mb-4">
                  <p className="text-gray-600">
                    <span className="flex items-center">
                      <i className="fas fa-map-marker-alt text-blue-500 "></i>
                      Address
                    </span>
                    Egypt, Suez
                  </p>
                </div>
                <div className="contact-item mb-4">
                  <p className="text-gray-600">
                    <span className="flex items-center">
                      <i className="fas fa-phone text-blue-500 "></i>
                      Phone
                    </span>
                    +201002020455
                  </p>
                </div>
                <div className="contact-item mb-4">
                  <p className="text-gray-600">
                    <span className="flex items-center">
                      <i className="fas fa-envelope text-blue-500 "></i>
                      Email
                    </span>
                    omarkhaled202080@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 py-6">
        <div className="container mx-auto text-center">
          <p className="text-white">
            &copy; 2025 E-government Documentation System Developed by{" "}
            <span className="text-[#E17564]">Computer science students</span>
          </p>
        </div>
      </div>
    </header>
  );
};

export default Home;
