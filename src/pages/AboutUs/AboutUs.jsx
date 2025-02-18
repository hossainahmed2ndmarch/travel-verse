import { Helmet } from "react-helmet-async";
import cvImg from "../../assets/enhanced_formalpic2.jpg";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiMongodb, SiExpress } from "react-icons/si";
import cv from "../../assets/Md_Hossain_Ahmed_FrontEnd_Developer_CV (1).pdf";
import { FaArrowDown } from "react-icons/fa6";

const AboutUs = () => {
  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = cv;
    link.download = "Md_Hossain_Ahmed_CV.pdf";
    link.click();
  };

  return (
    <div className="flex items-center justify-center pt-24 pb-10 px-6 bg-green-50">
      <Helmet>
        <title>About Us | ROOMIO</title>
      </Helmet>

      <div className="w-full max-w-4xl p-8 bg-white rounded-xl">
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
            <img
              src={cvImg}
              alt="Md. Hossain Ahmed"
              className="w-36 h-36 md:w-44 md:h-44 object-cover rounded-full shadow-md border-4 border-primary"
            />
          </div>
          <div className="md:w-2/3 text-center md:text-left px-4">
            <h1 className="text-3xl font-bold text-primary">
              Md. Hossain Ahmed
            </h1>
            <p className="mt-2 text-lg text-primary opacity-90">
              MERN Stack Developer | BSc in Psychology (Running)
            </p>
            <p className="mt-2 text-slate-800">
              <strong>University:</strong> University of Rajshahi
            </p>
            <button
              onClick={handleDownloadCV}
              className="btn mt-6 bg-transparent border-none rounded-none text-primary"
            >
              Download CV
              <FaArrowDown className="text-xl ml-2" />
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-8 space-y-6">
          <h2 className="text-2xl font-bold text-primary">About Me</h2>
          <p className="text-slate-800 opacity-90 leading-relaxed">
            Hello! I am Md. Hossain Ahmed, a passionate MERN Stack Developer
            with a background in Psychology. I love crafting seamless,
            interactive, and visually appealing applications. My goal is to
            merge design aesthetics with powerful functionality.
          </p>

          {/* Education */}
          <h2 className="text-2xl font-bold text-primary">Education</h2>
          <ul className="list-disc list-inside text-slate-700">
            <li>
              <strong>SSC:</strong> GPA 4.32
            </li>
            <li>
              <strong>HSC:</strong> GPA 4.25
            </li>
            <li>
              <strong>BSc in Psychology (Running):</strong> University of
              Rajshahi
            </li>
          </ul>

          {/* Skills Section */}
          <h2 className="text-2xl font-bold text-primary">Skills</h2>
          <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-4">
            {[
              { Icon: SiMongodb, name: "MongoDB", color: "text-primary" },
              { Icon: SiExpress, name: "Express.js", color: "text-primary" },
              { Icon: FaReact, name: "React.js", color: "text-primary" },
              { Icon: FaNodeJs, name: "Node.js", color: "text-primary" },
            ].map(({ Icon, name, color }, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow hover:shadow-lg transition"
              >
                <Icon className={`${color} text-5xl`} />
                <span className="mt-2 text-primary font-medium">{name}</span>
              </div>
            ))}
          </div>

          {/* Languages */}
          <h2 className="text-2xl font-bold text-primary">Languages</h2>
          <p className="text-slate-700">English, Hindi</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
