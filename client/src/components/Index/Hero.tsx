import React from "react";
import { Link } from "react-router-dom";
import { FaMagic as Magic, FaInfoCircle as Circle } from "react-icons/fa";

import EventRow from "./shared/EventRow";
import { Layout } from "./shared/EventRow";

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
    <div className="flex flex-wrap">
      <div className="relative h-90vh w-full">
        <video
          autoPlay
          loop
          muted
          className="object-center object-cover absolute h-90vh w-full"
        >
          <source
            src="https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_1920_18MG.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute w-11/12 lg:w-2/5 top-30 lg:top-40 left-0 lg:left-10 z-50">
          <h2 className="text-3xl lg:text-4xl pl-5">
            Qui ullamco labore enim consequat.
          </h2>
          <p className="text-base lg:text-lg text-justify w-full pl-5">
            Ipsum incididunt elit nisi sunt anim esse proident voluptate laborum
            eu in dolor nostrud ullamco. Est excepteur culpa Lorem et. Excepteur
            do consequat ad quis consectetur esse proident. Ex dolore ex ad
            dolor cupidatat occaecat. Fugiat consectetur elit proident laboris
            irure velit est officia. Ea magna dolore adipisicing non ipsum
            aliqua ut labore velit ex magna duis ipsum sint.
          </p>
          <div className="flex flex-wrap w-full lg:w-2/3 mt-6">
            <button className="w-2/5 my-auto ml-auto rounded-lg bg-background text-text py-4 px-6">
              <Link
                to="/event/register"
                className="flex flex-wrap m-auto w-full"
              >
                <Magic className="m-auto" />
                <span className="m-auto">Register</span>
              </Link>
            </button>
            <button className="w-2/5 my-auto ml-auto rounded-lg bg-background text-text py-4 px-6">
              <Link to="/event/info" className="flex flex-wrap m-auto w-full">
                <Circle className="m-auto" />
                <span className="m-auto">More Info</span>
              </Link>
            </button>
          </div>
        </div>
      </div>
      <div className="w-3/4 mx-auto mt-10">
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
