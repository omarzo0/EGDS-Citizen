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
                to="/app/documents"
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

      <footer className="bg-gray-800 py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h4 className="mb-4 text-lg font-semibold">
                Government Services Portal
              </h4>
              <p className="text-gray-300">
                Making government services accessible to everyone.
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-lg font-semibold">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-white">
                    All Services
                  </Link>
                </li>
                <li>
                  <Link href="/departments" className="hover:text-white">
                    Departments
                  </Link>
                </li>
                <li>
                  <Link href="/locations" className="hover:text-white">
                    Locations
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-lg font-semibold">Contact</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Email: support@govservices.gov</li>
                <li>Phone: 19990</li>
                <li>Hours: Sun-Fri, 7am-5pm</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-lg font-semibold">Subscribe</h4>
              <p className="mb-2 text-gray-300">
                Get updates on new services and features
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="rounded-r-none bg-gray-700 text-white"
                />
                <button className="rounded-l-none">Subscribe</button>
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
