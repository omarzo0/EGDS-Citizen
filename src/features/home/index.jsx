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
import { useTranslation } from "react-i18next";

const Home = (props) => {
  const { t } = useTranslation();

  const data = [
    {
      name: t("services2.nationalIdCard"),
      text: t("services2.identityServices"),
      icon: FaIdCard,
    },
    {
      name: t("services2.birthCertificate"),
      text: t("services2.identityServices"),
      icon: FaCertificate,
    },
    {
      name: t("services2.birthRecordCopy"),
      text: t("services2.identityServices"),
      icon: FaFileAlt,
    },
    {
      name: t("services2.maritalStatusUpdate"),
      text: t("services2.identityServices"),
      icon: FaHeart,
    },
    {
      name: t("services2.correctionOfRecords"),
      text: t("services2.identityServices"),
      icon: FaEdit,
    },
    {
      name: t("services2.marriageProof"),
      text: t("services2.identityServices"),
      icon: FaUserFriends,
    },
    {
      name: t("services2.replacementIdCard"),
      text: t("services2.identityServices"),
      icon: FaAddressCard,
    },
    {
      name: t("services2.updateResidence"),
      text: t("services2.addressUpdateServices"),
      icon: FaHome,
    },
    {
      name: t("services2.updateOccupation"),
      text: t("services2.employmentServices"),
      icon: FaBriefcase,
    },
    {
      name: t("services2.marriageRecordCopy"),
      text: t("services2.marriageAffairs"),
      icon: FaRing,
    },
    {
      name: t("services2.divorceRecordCopy"),
      text: t("services2.marriageAffairs"),
      icon: FaGavel,
    },
    {
      name: t("services2.deathCertificate"),
      text: t("services2.deathAffairs"),
      icon: FaCross,
    },
    {
      name: t("services2.deathRecordCopy"),
      text: t("services2.deathAffairs"),
      icon: FaBook,
    },
    {
      name: t("services2.certificateMachineServices"),
      text: t("services2.identityServices"),
      icon: FaPrint,
    },
    {
      name: t("services2.advancedMachinesBirthCertificate"),
      text: t("services2.identityServices"),
      icon: FaRobot,
    },
  ];

  const ProviderData = [
    [
      {
        name: t("Civil Status Sector"),
        text: t("Providing civil status services."),
        icons: [<FaBuilding />, <FaPhoneAlt />],
      },
      {
        name: t("Health Office"),
        text: t("Providing health services to the community."),
        icons: [<FaBuilding />, <FaAmbulance />],
      },
      {
        name: t("Ministry of Health and Population"),
        text: t("Government body responsible for health services."),
        icons: [<FaBuilding />, <FaAmbulance />],
      },
      {
        name: t("Governorate/Technological Center"),
        text: t("Serving as a technological hub for governance."),
        icons: [<FaBuilding />, <FaPhoneAlt />],
      },
      {
        name: t("City Authority"),
        text: t("Managing city services and infrastructure."),
        icons: [<FaCity />, <FaBuilding />],
      },
      {
        name: t("Local Administrative Units"),
        text: t("Local governance and community support."),
        icons: [<FaCogs />, <FaUsers />],
      },
      {
        name: t("Real Estate Registration and Documentation Authority"),
        text: t("Managing real estate documentation and registration."),
        icons: [<FaFileAlt />, <FaBuilding />],
      },
      {
        name: t("Cairo"),
        text: t("Capital city of Egypt."),
        icons: [<FaCity />],
      },
      {
        name: t("Gas Company (EGAS)"),
        text: t("Providing natural gas services."),
        icons: [<FaGasPump />],
      },
      {
        name: t("Water Company"),
        text: t("Supplying water services."),
        icons: [<FaWater />],
      },
      {
        name: t("Central (Telephone Exchange)"),
        text: t("Providing telecommunication services."),
        icons: [<FaPhoneAlt />],
      },
      {
        name: t("Egyptian Telecommunications Company"),
        text: t("Telecommunications and internet services."),
        icons: [<FaPhone />],
      },
      {
        name: t("Post Office"),
        text: t("Postal and courier services."),
        icons: [<FaEnvelope />],
      },
      {
        name: t("Supply Office"),
        text: t("Managing supply and procurement services."),
        icons: [<FaBox />],
      },
      {
        name: t("Directorate of Social Solidarity"),
        text: t("Providing social welfare programs."),
        icons: [<FaHandsHelping />],
      },
      {
        name: t("Nasser Social Bank"),
        text: t("Bank providing social development loans."),
        icons: [<FaUniversity />],
      },
      {
        name: t("Directorate of Labor"),
        text: t("Regulating labor laws and services."),
        icons: [<FaBriefcase />],
      },
      {
        name: t("Government Portal"),
        text: t("Centralized government information platform."),
        icons: [<FaLaptop />],
      },
      {
        name: t("Labor Office"),
        text: t("Employment services and job registration."),
        icons: [<FaUserTie />],
      },
      {
        name: t("Directorate of Health Affairs"),
        text: t("Managing health services and facilities."),
        icons: [<FaHospital />],
      },
      {
        name: t("Ministry of Labor"),
        text: t("Overseeing labor and employment services."),
        icons: [<FaBriefcase />],
      },
      {
        name: t("Egyptian Ambulance Authority"),
        text: t("Emergency medical and ambulance services."),
        icons: [<FaAmbulance />],
      },
      {
        name: t("General Authority for Health Insurance"),
        text: t("Health insurance services and coverage."),
        icons: [<FaUserMd />],
      },
      {
        name: t("Medical Council of the Governorate"),
        text: t("Overseeing medical professionals and services."),
        icons: [<FaStethoscope />],
      },
      {
        name: t("School"),
        text: t("Providing educational services."),
        icons: [<FaSchool />],
      },
      {
        name: t("Educational Administration"),
        text: t("Managing educational institutions and programs."),
        icons: [<FaChalkboardTeacher />],
      },
      {
        name: t("General Administration for Community Education"),
        text: t("Promoting community-based education."),
        icons: [<FaUsers />],
      },
      {
        name: t("Sector of Al-Azhar Institutes"),
        text: t("Managing Islamic education institutions."),
        icons: [<FaMosque />],
      },
      {
        name: t("Directorate of Education"),
        text: t("Providing educational services at the regional level."),
        icons: [<FaSchool />],
      },
      {
        name: t(
          "General Authority for Illiteracy Eradication and Adult Education"
        ),
        text: t("Promoting literacy and adult education programs."),
        icons: [<FaBookReader />],
      },
    ],
  ];

  const serviceIcons = [
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
    <header>
      <div className="relative py-20">
        <div className="absolute inset-0 bg-[#09122C]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="flex justify-center">
            <div className="text-center max-w-2xl">
              <h1 className="text-4xl font-bold text-white mb-4">
                {t("header.title")}
              </h1>
              <p className="text-white text-lg mb-6">
                {t("header.description")}
              </p>
              <Link
                to="/app/profile"
                className="px-8 py-3 bg-[#872341] text-white text-lg rounded-2xl shadow-lg hover:bg-[#BE3144] transition duration-300"
              >
                {t("header.applyBtn")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">
              {t("services.mostUsed")}
            </h2>
          </div>
          <div className="flex flex-wrap justify-center">
            {t("services.servicesList", { returnObjects: true }).map(
              (service, index) => (
                <div
                  key={index}
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
                >
                  <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl h-[200px] flex flex-col justify-between">
                    {/* Using the corresponding icon from the serviceIcons array */}
                    {React.createElement(
                      serviceIcons[index % serviceIcons.length],
                      {
                        className: "text-[#872341] text-3xl mb-4",
                      }
                    )}
                    <h3 className="text-lg font-semibold">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">
              {t("services2.ourServices")}
            </h2>
            <p className="text-gray-600 mt-4">
              {t("services2.exploreServices")}
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
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">
              {t("providers2")}
            </h2>
          </div>
          <div className="flex flex-wrap justify-center">
            {ProviderData &&
              ProviderData[0]?.map((d, i) => (
                <div
                  key={`${d.name}-${i}`}
                  className="w-full md:w-1/2 lg:w-1/3 p-4"
                >
                  <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300 h-[170px] flex flex-col justify-between">
                    <div className="flex items-start">
                      <div className="service-icon text-4xl text-[#872341]">
                        {d?.icons[0] && (
                          <div className="mr-4" aria-hidden="true">
                            {d.icons[0]}
                          </div>
                        )}
                      </div>
                      <div className="testimonial-content mt-4 text-left flex-1">
                        <p className="text-gray-600 ">{d.text}</p>
                        <div className="testimonial-meta mt-4 font-semibold text-gray-800">
                          {t(d.name)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
