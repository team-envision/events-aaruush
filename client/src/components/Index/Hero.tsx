import React from "react";
import { FaMagic as Magic } from "react-icons/fa";

import EventRow from "./Events/EventRow";
import { Layout } from "./Events/EventRow";

const Home = () => {
  const days = [
    {
      title: "Ex culpa quis officia officia irure.",
      thumbnail_url: [
        "https://workmacro.com/wp-content/uploads/2018/02/4-by-3-1024x768.png",
      ],
      description:
        "Minim esse dolore dolore ea irure tempor commodo in aliquip. Anim consectetur tempor commodo quis non. Officia fugiat pariatur esse proident Lorem deserunt mollit dolor ut aliqua eiusmod. Eiusmod minim minim ea Lorem sit. Dolore exercitation consequat amet dolore aute et officia.",
      tags: ["A", "B", "TAGGSGGSGSG"],
    },
    {
      title: "Reprehenderit pariatur adipisicing sunt occaecat tempor.",
      thumbnail_url: [
        "https://workmacro.com/wp-content/uploads/2018/02/4-by-3-1024x768.png",
      ],
      description:
        "Labore ex mollit Lorem sit cillum magna ipsum labore veniam.",
      tags: ["A", "B"],
    },
    {
      title: "Aliqua adipisicing laborum nulla et.",
      thumbnail_url: [
        "https://workmacro.com/wp-content/uploads/2018/02/4-by-3-1024x768.png",
      ],
      description:
        "Labore ex mollit Lorem sit cillum magna ipsum labore veniam.",
      tags: ["A", "B"],
    },
    {
      title: "Aliqua adipisicing laborum nulla et.",
      thumbnail_url: [
        "https://workmacro.com/wp-content/uploads/2018/02/4-by-3-1024x768.png",
      ],
      description:
        "Labore ex mollit Lorem sit cillum magna ipsum labore veniam.",
      tags: ["A", "B"],
    },
    {
      title: "Esse proident eiusmod in ea id.",
      thumbnail_url: [
        "https://workmacro.com/wp-content/uploads/2018/02/4-by-3-1024x768.png",
      ],
      description: "Labore ex mollit Lorem sit cillum.",
      tags: ["A", "B"],
    },
    {
      title: "Esse proident eiusmod in ea id.",
      thumbnail_url: [
        "https://workmacro.com/wp-content/uploads/2018/02/4-by-3-1024x768.png",
      ],
      description: "Labore ex mollit Lorem sit cillum.",
      tags: ["A", "B"],
    },
    {
      title: "Esse proident eiusmod in ea id.",
      thumbnail_url: [
        "https://workmacro.com/wp-content/uploads/2018/02/4-by-3-1024x768.png",
      ],
      description: "Labore ex mollit Lorem sit cillum.",
      tags: ["A", "B"],
    },
    {
      title: "Esse proident eiusmod in ea id.",
      thumbnail_url: [
        "https://workmacro.com/wp-content/uploads/2018/02/4-by-3-1024x768.png",
      ],
      description: "Labore ex mollit Lorem sit cillum.",
      tags: ["A", "B"],
    },
    {
      title: "Esse proident eiusmod in ea id.",
      thumbnail_url: [
        "https://workmacro.com/wp-content/uploads/2018/02/4-by-3-1024x768.png",
      ],
      description: "Labore ex mollit Lorem sit cillum.",
      tags: ["A", "B"],
    },
  ];

  const items = [
    {
      title: "TEST Ex culpa quis officia officia irure.",
      thumbnail_url: [
        "https://lorempixel.com/1920/1080/nature/2/",
        "https://lorempixel.com/1920/1080/nature/2/",
        "https://lorempixel.com/1920/1080/nature/2/",
        "https://lorempixel.com/1920/1080/nature/2/",
      ],
      description:
        "Minim esse dolore dolore ea irure tempor commodo in aliquip. Anim consectetur tempor commodo quis non. Officia fugiat pariatur esse proident Lorem deserunt mollit dolor ut aliqua eiusmod. Eiusmod minim minim ea Lorem sit. Dolore exercitation consequat amet dolore aute et officia.",
      tags: ["A", "B", "TAGGSGGSGSG"],
    },
    {
      title: "Reprehenderit pariatur adipisicing sunt occaecat tempor.",
      thumbnail_url: ["https://lorempixel.com/1920/1080/sports/1/"],
      description:
        "Labore ex mollit Lorem sit cillum magna ipsum labore veniam.",
      tags: ["A", "B"],
    },
    {
      title: "Aliqua adipisicing laborum nulla et.",
      thumbnail_url: ["https://lorempixel.com/1920/1080/city/2/"],
      description:
        "Labore ex mollit Lorem sit cillum magna ipsum labore veniam.",
      tags: ["A", "B"],
    },
    {
      title: "Aliqua adipisicing laborum nulla et.",
      thumbnail_url: ["https://lorempixel.com/1920/1080/city/2/"],
      description:
        "Labore ex mollit Lorem sit cillum magna ipsum labore veniam.",
      tags: ["A", "B"],
    },
    {
      title: "Esse proident eiusmod in ea id.",
      thumbnail_url: ["https://lorempixel.com/1920/1080/sports/3/"],
      description: "Labore ex mollit Lorem sit cillum.",
      tags: ["A", "B"],
    },
    {
      title: "Esse proident eiusmod in ea id.",
      thumbnail_url: ["https://lorempixel.com/1920/1080/sports/3/"],
      description: "Labore ex mollit Lorem sit cillum.",
      tags: ["A", "B"],
    },
    {
      title: "Esse proident eiusmod in ea id.",
      thumbnail_url: ["https://lorempixel.com/1920/1080/sports/3/"],
      description: "Labore ex mollit Lorem sit cillum.",
      tags: ["A", "B"],
    },
    {
      title: "Esse proident eiusmod in ea id.",
      thumbnail_url: ["https://lorempixel.com/1920/1080/sports/3/"],
      description: "Labore ex mollit Lorem sit cillum.",
      tags: ["A", "B"],
    },
    {
      title: "Esse proident eiusmod in ea id.",
      thumbnail_url: ["https://lorempixel.com/1920/1080/sports/3/"],
      description: "Labore ex mollit Lorem sit cillum.",
      tags: ["A", "B"],
    },
  ];

  const items2 = [
    {
      title: "Ex culpa quis officia officia irure.",
      thumbnail_url: ["https://lorempixel.com/1080/1920/nature/2/"],
      description: "Labore ex mollit Lorem sit.",
      tags: ["Something", "Event"],
    },
    {
      title: "Reprehenderit pariatur adipisicing sunt occaecat tempor.",
      thumbnail_url: ["https://lorempixel.com/1080/1920/sports/1/"],
      description:
        "Labore ex mollit Lorem sit cillum magna ipsum labore veniam.",
      tags: ["A", "B"],
    },
    {
      title: "Reprehenderit pariatur adipisicing sunt occaecat tempor.",
      thumbnail_url: ["https://lorempixel.com/1080/1920/sports/1/"],
      description:
        "Labore ex mollit Lorem sit cillum magna ipsum labore veniam.",
      tags: ["A", "B"],
    },
    {
      title: "Aliqua adipisicing laborum nulla et.",
      thumbnail_url: ["https://lorempixel.com/1080/1920/city/2/"],
      description:
        "Labore ex mollit Lorem sit cillum magna ipsum labore veniam.",
      tags: ["A", "B"],
    },
    {
      title: "Esse proident eiusmod in ea id.",
      thumbnail_url: ["https://lorempixel.com/1080/1920/sports/3/"],
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
        <div className="absolute w-full lg:w-2/5 top-40 lg:top-50 left-0 lg:left-10 z-40 px-5 lg:px-0 text-center lg:text-left">
          <h2 className="text-3xl lg:text-4xl font-bold text-left">
            Common Registration
          </h2>
          <p className="text-base lg:text-lg text-justify w-full">
            5 Days of Technological Extravaganza Participate in an array of
            experiences inclusive of Domain Events, Luminary Addresses,
            Lanstorm, Unconference, and much more. <wbr />
            Avail Your Ticket to the 14th edition of Aaruush, including free
            access to Special Aaruush Evenings and Aaruush Nites!
          </p>
          <div className="flex flex-wrap text-xl w-full lg:w-2/3 mt-8">
            <a
              href="https://aaruush.org/register"
              className="w-3/4 md:w-1/2 lg:w-3/5 my-auto mr-auto rounded-lg bg-baseWhite text-baseBlack py-4 px-6"
            >
              <button className="flex flex-wrap m-auto w-full">
                <Magic className="m-auto text-xl" />
                <span className="m-auto small-caps font-bold">
                  Register Now !
                </span>
              </button>
            </a>
            {/* <button className="w-2/5 my-auto ml-auto rounded-lg bg-baseBlack text-baseWhite py-4 px-6">
              <Link to="/event/info" className="flex flex-wrap m-auto w-full">
                <FaInfoCircle className="m-auto text-xl" />
                <span className="m-auto">More Info</span>
              </Link>
            </button> */}
          </div>
        </div>
      </div>
      <div className="w-3/4 mx-auto mt-10">
        <EventRow layout={Layout.tile} label="Aaruush Days" items={days} />
        <EventRow
          layout={Layout.jumbotron}
          label="Nites & Live"
          items={items}
        />
        <EventRow layout={Layout.shot} items={items} />
        <EventRow layout={Layout.jumbotron} label="Workshops" items={items} />
        <EventRow layout={Layout.shot} items={items} />
        <EventRow layout={Layout.jumbotron} label="Challenges" items={items} />
        <EventRow layout={Layout.shot} items={items2} />
      </div>
    </div>
  );
};

export default Home;
