import React, { useState, useEffect } from "react";
import "./Home.scss";
import { Navbar, Button } from "../../shared/components";
import { FaMagic, FaInfoCircle } from "react-icons/fa";
import { EventRow } from "./components";
import { ButtonTheme } from "../../shared/components/Button/Button";
import { Layout } from "./components/EventRow/EventRow";

const Home = () => {
  const items = [
    {
      title: "Ex culpa quis officia officia irure.",
      thumbnail_url: "http://lorempixel.com/1920/1080/nature/2/",
      description: "Labore ex mollit Lorem sit.",
      tags: ["A", "B"],
    },
    {
      title: "Reprehenderit pariatur adipisicing sunt occaecat tempor.",
      thumbnail_url: "http://lorempixel.com/1920/1080/sports/1/",
      description:
        "Labore ex mollit Lorem sit cillum magna ipsum labore veniam.",
      tags: ["A", "B"],
    },
    {
      title: "Aliqua adipisicing laborum nulla et.",
      thumbnail_url: "http://lorempixel.com/1920/1080/city/2/",
      description:
        "Labore ex mollit Lorem sit cillum magna ipsum labore veniam.",
      tags: ["A", "B"],
    },
    {
      title: "Esse proident eiusmod in ea id.",
      thumbnail_url: "http://lorempixel.com/1920/1080/sports/3/",
      description: "Labore ex mollit Lorem sit cillum.",
      tags: ["A", "B"],
    },
  ];

  const items2 = [
    {
      title: "Ex culpa quis officia officia irure.",
      thumbnail_url: "http://lorempixel.com/1080/1920/nature/2/",
      description: "Labore ex mollit Lorem sit.",
      tags: ["Something", "Event"],
    },
    {
      title: "Reprehenderit pariatur adipisicing sunt occaecat tempor.",
      thumbnail_url: "http://lorempixel.com/1080/1920/sports/1/",
      description:
        "Labore ex mollit Lorem sit cillum magna ipsum labore veniam.",
      tags: ["A", "B"],
    },
    {
      title: "Aliqua adipisicing laborum nulla et.",
      thumbnail_url: "http://lorempixel.com/1080/1920/city/2/",
      description:
        "Labore ex mollit Lorem sit cillum magna ipsum labore veniam.",
      tags: ["A", "B"],
    },
    {
      title: "Esse proident eiusmod in ea id.",
      thumbnail_url: "http://lorempixel.com/1080/1920/sports/3/",
      description: "Labore ex mollit Lorem sit cillum.",
      tags: ["A", "B"],
    },
  ];

  return (
    <div className="ev-home">
      <div className="hero">
        <Navbar />
        <video className="videoTag" autoPlay loop muted>
          <source
            src="https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_1920_18MG.mp4"
            type="video/mp4"
          />
        </video>
        <div className="content">
          <h2>Qui ullamco labore enim consequat.</h2>
          <p>
            Ipsum incididunt elit nisi sunt anim esse proident voluptate laborum
            eu in dolor nostrud ullamco. Est excepteur culpa Lorem et. Excepteur
            do consequat ad quis consectetur esse proident. Ex dolore ex ad
            dolor cupidatat occaecat. Fugiat consectetur elit proident laboris
            irure velit est officia. Ea magna dolore adipisicing non ipsum
            aliqua ut labore velit ex magna duis ipsum sint.
          </p>
          <div>
            <Button
              icon={FaMagic}
              route="/event/register"
              label="Register"
              theme={ButtonTheme.primary}
            />
            <Button
              icon={FaInfoCircle}
              route="/event/info"
              label={"More info"}
              theme={ButtonTheme.secondary}
            />
          </div>
        </div>
      </div>
      <div className="main">
        <EventRow layout={Layout.tile} label="Aaruush Days" items={items} />
        <EventRow layout={Layout.shot} label="Highlights" items={items2} />
        <EventRow layout={Layout.jumbotron} items={[items[0]]} />
        <EventRow layout={Layout.shot} label="Events" items={items2} />
        <EventRow layout={Layout.jumbotron} items={[items[0]]} />
        <EventRow layout={Layout.tile} label="Workshops" items={items} />
      </div>
    </div>
  );
};

export default Home;
