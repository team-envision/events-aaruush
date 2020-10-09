import React from "react";

import EventTile from "./EventTile/EventTile";
import EventShot from "./EventShot/EventShot";
import EventJumbotron from "./EventJumbotron/EventJumbotron";

export enum Layout {
  tile = "tile",
  jumbotron = "jumbotron",
  shot = "shot",
}

export enum EventTypes {
  Days = "aaruush-days",
  Challenges = "challenges",
  Workshops = "workshops",
  Highlights = "highlights",
}

export interface Item {
  _id: string;
  category: EventTypes;
  date: string;
  name: string;
  description: string;
  poster: string[];
  link: string;
  isActive: boolean;
  slug: string;
  tags?: string[];
}

interface Props {
  label?: string;
  layout: Layout;
  items: Item[];
}

export const createTime = (input: string) => {
  const newDate = new Date(input);
  return `${newDate.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })} - IST`;
};

export const createDate = (input: string) => {
  const newDate = new Date(input);
  return newDate.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const Event = (layout: Layout, items: Item[]) => {
  switch (layout) {
    case Layout.tile:
      return (
        <>
          {items.length !== 0 &&
            items.map((item: Item) => (
              <div className="flex flex-grow flex-shrink-0 mr-4" key={item._id}>
                <EventTile {...item} />
              </div>
            ))}
        </>
      );

    case Layout.shot:
      return (
        <>
          {items.length !== 0 &&
            items.map((item: Item) => (
              <div className="flex flex-grow flex-shrink-0 mr-4" key={item._id}>
                <EventShot {...item} />
              </div>
            ))}
        </>
      );

    case Layout.jumbotron:
      return <>{items.length !== 0 && <EventJumbotron {...items[0]} />}</>;
  }
};

const EventRow = (props: Props) => {
  return (
    <>
      {props.label && props.items.length !== 0 && (
        <h3 className="text-3xl first:mt-0 mt-20">{props.label}</h3>
      )}
      {props.items.length !== 0 && (
        <div className="flex items-center flex-no-wrap my-8 overflow-x-auto">
          {Event(props.layout, props.items)}
        </div>
      )}
    </>
  );
};

export default EventRow;
