import React from "react";
import { useState } from "react";

const Home = (props) => {
  const data = [
    {
      icon: "fas fa-laptop-code text-4xl text-blue-500",
      title: "Web Development",
      text: "We build responsive and scalable web applications tailored to your needs.",
    },
    {
      icon: "fas fa-mobile-alt text-4xl text-green-500",
      title: "Mobile Apps",
      text: "Create cross-platform mobile applications with a seamless user experience.",
    },
    {
      icon: "fas fa-cloud-upload-alt text-4xl text-purple-500",
      title: "Cloud Solutions",
      text: "Deploy and manage your applications on the cloud with our expert solutions.",
    },
    {
      icon: "fas fa-chart-line text-4xl text-yellow-500",
      title: "Data Analytics",
      text: "Leverage data to make informed decisions with our advanced analytics tools.",
    },
  ];
  const sampleData = [
    {
      icon: "fas fa-laptop-code text-5xl text-blue-500 mb-4",
      name: "Web Development",
      text: "We create responsive and scalable web applications tailored to your business needs.",
    },
    {
      icon: "fas fa-mobile-alt text-5xl text-green-500 mb-4",
      name: "Mobile Apps",
      text: "Build cross-platform mobile apps with seamless user experiences.",
    },
    {
      icon: "fas fa-cloud-upload-alt text-5xl text-purple-500 mb-4",
      name: "Cloud Solutions",
      text: "Deploy and manage your applications on the cloud with our expert solutions.",
    },
    {
      icon: "fas fa-chart-line text-5xl text-yellow-500 mb-4",
      name: "Data Analytics",
      text: "Leverage data to make informed decisions with our advanced analytics tools.",
    },
    {
      icon: "fas fa-shield-alt text-5xl text-red-500 mb-4",
      name: "Cyber Security",
      text: "Protect your business with our state-of-the-art security solutions.",
    },
    {
      icon: "fas fa-cogs text-5xl text-indigo-500 mb-4",
      name: "IT Consulting",
      text: "Get expert advice to optimize your IT infrastructure and operations.",
    },
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

  const clearState = () => setState({ ...initialState });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, message);
  };

  return (
    <header id="header">
      <div className="relative bg-cover bg-center py-20">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto px-4 relative z-10">
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
              <a
                href="#features"
                className="px-8 py-3 bg-purple-900 text-white text-lg rounded-2xl shadow-lg hover:bg-purple-700 transition duration-300"
              >
                Apply for Document
              </a>
            </div>
          </div>
        </div>
      </div>
      <div id="features" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">
              The most used services
            </h2>
          </div>
          <div className="flex flex-wrap justify-center">
            {data ? (
              data.map((d, i) => (
                <div
                  key={`${d.title}-${i}`}
                  className="w-full sm:w-1/2 md:w-1/4 p-4"
                >
                  <div className="text-center">
                    <i className={`${d.icon} mb-4`}></i>
                    <h3 className="text-xl font-semibold text-gray-700">
                      {d.title}
                    </h3>
                    <p className="text-gray-600">{d.text}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
      <div id="services" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Our Services</h2>
            <p className="text-gray-600 mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
              dapibus leonec.
            </p>
          </div>
          <div className="flex flex-wrap justify-center">
            {data
              ? data.map((d, i) => (
                  <div
                    key={`${d.name}-${i}`}
                    className="w-full md:w-1/2 lg:w-1/3 p-4"
                  >
                    <div className="text-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <i className={d.icon}></i>
                      <div className="service-desc mt-4">
                        <h3 className="text-xl font-semibold text-gray-800">
                          {d.name}
                        </h3>
                        <p className="text-gray-600 mt-2">{d.text}</p>
                      </div>
                    </div>
                  </div>
                ))
              : "Loading..."}
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
            {data
              ? data.map((d, i) => (
                  <div
                    key={`${d.name}-${i}`}
                    className="w-full md:w-1/2 lg:w-1/3 p-4"
                  >
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="testimonial-image flex justify-center">
                        <img
                          src={d.img}
                          alt={d.name}
                          className="w-24 h-24 rounded-full object-cover"
                        />
                      </div>
                      <div className="testimonial-content mt-4 text-center">
                        <p className="text-gray-600 italic">"{d.text}"</p>
                        <div className="testimonial-meta mt-4 font-semibold text-gray-800">
                          - {d.name}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : "Loading..."}
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
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
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
                      <i className="fas fa-map-marker-alt text-blue-500 mr-2"></i>
                      Address
                    </span>
                    {props.data ? props.data.address : "loading"}
                  </p>
                </div>
                <div className="contact-item mb-4">
                  <p className="text-gray-600">
                    <span className="flex items-center">
                      <i className="fas fa-phone text-blue-500 mr-2"></i>
                      Phone
                    </span>
                    {props.data ? props.data.phone : "loading"}
                  </p>
                </div>
                <div className="contact-item mb-4">
                  <p className="text-gray-600">
                    <span className="flex items-center">
                      <i className="fas fa-envelope text-blue-500 mr-2"></i>
                      Email
                    </span>
                    {props.data ? props.data.email : "loading"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 text-center">
            <div className="social">
              <ul className="flex justify-center space-x-4">
                <li>
                  <a href={props.data ? props.data.facebook : "/"}>
                    <i className="fab fa-facebook text-blue-500 hover:text-blue-600 text-2xl"></i>
                  </a>
                </li>
                <li>
                  <a href={props.data ? props.data.twitter : "/"}>
                    <i className="fab fa-twitter text-blue-400 hover:text-blue-500 text-2xl"></i>
                  </a>
                </li>
                <li>
                  <a href={props.data ? props.data.youtube : "/"}>
                    <i className="fab fa-youtube text-red-500 hover:text-red-600 text-2xl"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div id="footer" className="bg-gray-800 py-6">
        <div className="container mx-auto text-center">
          <p className="text-white">
            &copy; 2023 Issaaf Kattan React Land Page Template. Design by{" "}
            <a
              href="http://www.templatewire.com"
              rel="nofollow"
              className="text-blue-400"
            >
              TemplateWire
            </a>
          </p>
        </div>
      </div>
    </header>
  );
};

export default Home;
