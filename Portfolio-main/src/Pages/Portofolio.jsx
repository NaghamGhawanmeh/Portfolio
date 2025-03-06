import React, { useState, useCallback } from "react";
import { Box, Typography, AppBar, Tabs, Tab } from "@mui/material";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import { Code, Award, Boxes } from "lucide-react";
import Certificate from "../components/Certificate";

// Separate ShowMore/ShowLess button component
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-slate-300 
      hover:text-white 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-white/5 
      hover:bg-white/10
      rounded-md
      border 
      border-white/10
      hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          ${
            isShowingMore
              ? "group-hover:-translate-y-0.5"
              : "group-hover:translate-y-0.5"
          }
        `}
      >
        <polyline
          points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}
        ></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const techStacks = [
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "reactjs.svg", language: "ReactJS" },
  { icon: "vite.svg", language: "Vite" },
  { icon: "nodejs.svg", language: "Node JS" },
  { icon: "bootstrap.svg", language: "Bootstrap" },
  // { icon: "firebase.svg", language: "Firebase" },
  { icon: "MUI.svg", language: "Material UI" },
  // { icon: "vercel.svg", language: "Vercel" },
  // { icon: "SweetAlert.svg", language: "SweetAlert2" },
  { icon: "https://img.icons8.com/?size=100&id=SDVmtZ6VBGXt&format=png&color=000000", language: "Express.js" }, 
  { icon: "https://img.icons8.com/?size=100&id=bosfpvRzNOG8&format=png&color=000000", language: "MongoDB" }, 
  { icon: "https://img.icons8.com/?size=100&id=36440&format=png&color=000000", language: "PostgreSQL" }, 
  { icon: "https://img.icons8.com/?size=100&id=20906&format=png&color=000000", language: "Git" }, 
];

// Static projects data
const staticProjects = [
  {
    id: 1,
    Img: "https://res.cloudinary.com/dozr5pfwt/image/upload/v1741205973/wznej4aeheol2gkqvhps.png",
    Title: "SAKAN",
    Description:
      "Sakan is a platform designed for individuals seeking shared housing or roommates. Providing asimple and efficient way to find and connect with like-minded people.",
    TechStack: [
      "React.js",
      "CSS",
      "Bootstrap",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "bcrypt",
      "Cloudinary",
    ],
    Link: "https://transcendent-churros-14b53e.netlify.app/",
    Features: [
      "User Registration and Login",
      "Post Creation (Add, Edit, Delete Posts)",
      "Search and Filter Posts",
      "Save and Remove Saved Posts",
      "Commenting on Posts",
      "Admin Post and Comment Management",
    ],
    Github: "https://github.com/NaghamGhawanmeh",
  },
  {
    id: 2,
    Img: "https://res.cloudinary.com/dozr5pfwt/image/upload/v1741210445/sp9bssgnvis6nl2xazmm.png",
    Title: "Trash2Cash",
    Description:
      "Trash2Cash designed to promote sustainability by turning recyclable waste into monetary value. Itprovides an easy and efficient way for individuals and businesses to exchange recyclablematerials for cash, encouraging eco-friendly habits.",
    Features: [
      "Register an Account: Sign up to access all platform features.",
      "Browse Available Categories: Explore the accepted recycling categories.",
      "Request Recycling Services: Select a category, enter weight or dimensions of recyclable materials, provide a description, and submit the request.",
      "Manage Requests: Requests appear in your cart, add multiple requests, and finalize the order by providing a location.",
      "Order Processing: Admin reviews requests, approves or rejects based on evaluation, and assigns approved requests to a collector.",
      "User Dashboard: View all submitted orders with their current status (pending, approved, assigned, collected, completed, or rejected).",
      "Admin Dashboard: Full control over categories, can add, edit, or delete categories, view and manage requests, assign approved requests to collectors.",
      "Collector Dashboard: View assigned requests, update status upon collection, set final price, and mark requests as completed.",
    ],
    TechStack: [
      "React.js",
      " Node.js",
      " Express.js",
      "PostgreSQL",
      "Redux",
      "Material UI",
      "CSS",
      "Bootstrap",
      "JWT",
      "bcrypt",
      "Cloudinary",
      "Google Login",
      "Geolocation",
    ],
    Link: "#",
    Github: "https://github.com/NaghamGhawanmeh",
  },
];
const certificates=[{img:"https://res.cloudinary.com/dozr5pfwt/image/upload/v1741212242/dp8lusgkve7s7d3eo681.png"}]
localStorage.setItem("staticProjects", JSON.stringify(staticProjects));

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);

  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  const toggleShowMore = useCallback((type) => {
    if (type === "projects") {
      setShowAllProjects((prev) => !prev);
    } else {
      setShowAllCertificates((prev) => !prev);
    }
  }, []);

  const displayedProjects = showAllProjects
    ? staticProjects
    : staticProjects.slice(0, initialItems);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div
      className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden"
      id="Portofolio"
    >
      <div
        className="text-center pb-10"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span
            style={{
              color: "#6366f1",
              backgroundImage:
                "linear-gradient(45deg, #6366f1 10%, #a855f7 93%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects, certifications, and technical
          expertise. Each section represents a milestone in my continuous
          learning path.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  transform: "translateY(-2px)",
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background:
                    "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                  boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                },
              },
            }}
          >
            <Tab
              icon={
                <Code className="mb-2 w-5 h-5 transition-all duration-300" />
              }
              label="Projects"
              {...a11yProps(0)}
            />
            <Tab
              icon={
                <Award className="mb-2 w-5 h-5 transition-all duration-300" />
              }
              label="Certificates"
              {...a11yProps(1)}
            />
            <Tab
              icon={
                <Boxes className="mb-2 w-5 h-5 transition-all duration-300" />
              }
              label="Tech Stack"
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={setValue}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                {displayedProjects.map((project, index) => (
                  <div
                    key={project.id || index}
                    data-aos={
                      index % 3 === 0
                        ? "fade-up-right"
                        : index % 3 === 1
                        ? "fade-up"
                        : "fade-up-left"
                    }
                    data-aos-duration={
                      index % 3 === 0
                        ? "1000"
                        : index % 3 === 1
                        ? "1200"
                        : "1000"
                    }
                  >
                    <CardProject
                      Img={project.Img}
                      Title={project.Title}
                      Description={project.Description}
                      Link={project.Link}
                      id={project.id}
                    />
                  </div>
                ))}
              </div>
            </div>
            {staticProjects.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore("projects")}
                  isShowingMore={showAllProjects}
                />
              </div>
            )}
          </TabPanel>
          {/* here */}
          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
                {certificates.map((certificate, index) => (
                  <div
                    key={index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <Certificate ImgSertif={certificate.img} />
                  </div>
                ))}
              </div>
            </div>
            {certificates.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('certificates')}
                  isShowingMore={showAllCertificates}
                />
              </div>
            )}
          </TabPanel>
          {/*  */}

          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
                {techStacks.map((stack, index) => (
                  <div
                    key={index}
                    data-aos={
                      index % 3 === 0
                        ? "fade-up-right"
                        : index % 3 === 1
                        ? "fade-up"
                        : "fade-up-left"
                    }
                    data-aos-duration={
                      index % 3 === 0
                        ? "1000"
                        : index % 3 === 1
                        ? "1200"
                        : "1000"
                    }
                  >
                    <TechStackIcon TechStackIcon={stack.icon} />
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}
