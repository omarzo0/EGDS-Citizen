import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaIdCard,
  FaCertificate,
  FaFileAlt,
  FaHeart,
  FaEdit,
  FaUserFriends,
  FaAddressCard,
  FaHome,
  FaBriefcase,
  FaRing,
  FaGavel,
  FaCross,
  FaBook,
  FaPrint,
  FaRobot,
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
} from "react-icons/fa";

const Home = (props) => {
  const data = [
    { name: "National ID Card", text: "Identity Services", icon: FaIdCard },
    {
      name: "Birth Certificate",
      text: "Identity Services",
      icon: FaCertificate,
    },
    { name: "Birth Record Copy", text: "Identity Services", icon: FaFileAlt },
    { name: "Marital Status Update", text: "Identity Services", icon: FaHeart },
    { name: "Correction of Records", text: "Identity Services", icon: FaEdit },
    { name: "Marriage Proof", text: "Identity Services", icon: FaUserFriends },
    {
      name: "Replacement ID Card",
      text: "Identity Services",
      icon: FaAddressCard,
    },
    { name: "Update Residence", text: "Address Update Services", icon: FaHome },
    {
      name: "Update Occupation",
      text: "Employment Services",
      icon: FaBriefcase,
    },
    { name: "Marriage Record Copy", text: "Marriage Affairs", icon: FaRing },
    { name: "Divorce Record Copy", text: "Marriage Affairs", icon: FaGavel },
    { name: "Death Certificate", text: "Death Affairs", icon: FaCross },
    { name: "Death Record Copy", text: "Death Affairs", icon: FaBook },
    {
      name: "Certificate Machine Services",
      text: "Identity Services",
      icon: FaPrint,
    },
    {
      name: "Advanced Machines Birth Certificate",
      text: "Identity Services",
      icon: FaRobot,
    },
  ];
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
    ],
  ];

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

  return (
    <header id="header">
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

      <div id="features" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">
              The Most Used Services
            </h2>
          </div>
          <div className="flex flex-wrap justify-center">
            <div className="w-full sm:w-1/2 md:w-1/4 p-4">
              <div className="text-center">
                <i className="fas fa-file-upload mb-4 text-[#4b108d] text-3xl"></i>
                <h3 className="text-xl font-semibold text-gray-700">
                  Birthdate certificate
                </h3>
                <p className="text-gray-500">
                  Submit official documents electronically for faster
                  processing.
                </p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4 p-4">
              <div className="text-center">
                <i className="fas fa-search-location mb-4 text-[#4b108d] text-3xl"></i>
                <h3 className="text-xl font-semibold text-gray-700">
                  New or instead National ID
                </h3>
                <p className="text-gray-600">
                  Track the current status of your submitted government
                  documents.
                </p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4 p-4">
              <div className="text-center">
                <i className="fas fa-check-circle mb-4 text-[#4b108d] text-3xl"></i>
                <h3 className="text-xl font-semibold text-gray-700">
                  Obtaining travel permits
                </h3>
                <p className="text-gray-600">
                  Verify the authenticity of electronic government records.
                </p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4 p-4">
              <div className="text-center">
                <i className="fas fa-calendar-check mb-4 text-[#4b108d] text-3xl"></i>
                <h3 className="text-xl font-semibold text-gray-700">
                  obtaining an automated passport
                </h3>
                <p className="text-gray-600">
                  Book appointments with government departments online.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="services" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Our Services</h2>
            <p className="text-gray-600 mt-4">
              Explore the essential services for managing personal and family
              records.
            </p>
          </div>
          <div className="flex flex-wrap justify-center">
            {data.map((service, index) => (
              <div
                key={index}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
              >
                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl h-[200px] flex flex-col justify-between">
                  <service.icon className="text-[#872341] text-3xl mb-4" />
                  <h3 className="text-lg font-semibold">{service.name}</h3>
                  <p className="text-gray-600">{service.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div id="testimonials" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">
              Service providers
            </h2>
          </div>
          <div className="flex flex-wrap justify-center">
            {ProviderData &&
              ProviderData[0]?.map((d, i) => (
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
              ))}
          </div>
        </div>
      </div>
      <div id="contact" className="py-16 bg-gray-50">
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
      <div id="footer" className="bg-gray-800 py-6">
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
