import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";

const Heading = ({ className, title, hasMore, isDeployable, url }) => {
  const [isDeployed, setIsDeployed] = useState(false);
  const { darkMode } = useContext(ThemeContext);

  return (
    <section
      className={`heading ${className} ${darkMode ? "heading--dark" : ""}`}
    >
      <h2 className="heading__title">{title}</h2>
      <div>
        {hasMore && (
          <Link to={url} className="heading__more">
            Ver todos
          </Link>
        )}
        {isDeployable &&
          (isDeployed ? (
            <i
              className="fa-solid fa-caret-down heading__deploy-button"
              onClick={() => setIsDeployed(!isDeployed)}
            ></i>
          ) : (
            <i
              className="fa-solid fa-caret-up heading__deploy-button"
              onClick={() => setIsDeployed(!isDeployed)}
            ></i>
          ))}
      </div>
    </section>
  );
};

export default Heading;
