import React, { useState, useEffect } from "react";
import { FaMagic } from "react-icons/fa";

import APIservice from "../../services/axios";
import EventRow, { EventTypes, Layout, Item } from "./Events/EventRow";

const Home = () => {
  const [events, setEvents] = useState<Item[]>([]);

  useEffect(() => {
    APIservice.get("/events")
      .then((res) => {
        setEvents(res.data.events);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [APIservice]);

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
                <FaMagic className="m-auto text-xl" />
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
        <EventRow
          layout={Layout.tile}
          label="Aaruush Days"
          items={events.filter((event) => event.category === EventTypes.Days)}
        />
        <EventRow
          layout={Layout.jumbotron}
          label="Nites & Live"
          items={events.filter(
            (event) => event.category === EventTypes.Highlights
          )}
        />
        <EventRow
          layout={Layout.shot}
          items={events.filter(
            (event) => event.category === EventTypes.Highlights
          )}
        />
        <EventRow
          layout={Layout.jumbotron}
          label="Workshops"
          items={events.filter(
            (event) => event.category === EventTypes.Challenges
          )}
        />
        <EventRow
          layout={Layout.shot}
          items={events.filter(
            (event) => event.category === EventTypes.Challenges
          )}
        />
        <EventRow
          layout={Layout.jumbotron}
          label="Challenges"
          items={events.filter(
            (event) => event.category === EventTypes.Workshops
          )}
        />
        <EventRow
          layout={Layout.shot}
          items={events.filter(
            (event) => event.category === EventTypes.Workshops
          )}
        />
      </div>
    </div>
  );
};

export default Home;
