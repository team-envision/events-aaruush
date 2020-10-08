import React from "react";

import EventTile from "./EventTile/EventTile";
import EventShot from "./EventShot/EventShot";
import EventJumbotron from "./EventJumbotron/EventJumbotron";

export enum Layout {
  tile = "tile",
  jumbotron = "jumbotron",
  shot = "shot",
}

interface Item {
  title: string;
  thumbnail_url: string[];
  tags?: string[];
  description: string;
}

interface Props {
  label?: string;
  layout: Layout;
  items: Item[];
}

export interface EventProps {
  title: string;
  thumbnail_url: string[];
  description: string;
  tags?: string[];
}

const Event = (layout: Layout, items: Item[]) => {
  switch (layout) {
    case Layout.tile:
      return (
        <>
          {items.map((item: Item, index: number) => (
            <div
              className="flex flex-grow flex-shrink-0 mr-4"
              key={index.toString()}
            >
              <EventTile {...item} />
            </div>
          ))}
        </>
      );

    case Layout.shot:
      return (
        <>
          {items.map((item: Item, index: number) => (
            <div
              className="flex flex-grow flex-shrink-0 mr-4"
              key={index.toString()}
            >
              <EventShot {...item} />
            </div>
          ))}
        </>
      );

    case Layout.jumbotron:
      return (
        <>
          <EventJumbotron {...items[0]} />
        </>
      );
  }
};

const EventRow = (props: Props) => {
  return (
    <>
      {props.label && (
        <h3 className="text-3xl first:mt-0 mt-20">{props.label}</h3>
      )}
      <div className="flex items-center flex-no-wrap my-8 overflow-x-auto">
        {Event(props.layout, props.items)}
      </div>
    </>
  );
};

export default EventRow;
