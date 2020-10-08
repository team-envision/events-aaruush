import React from "react";

import EventTile from "./EventTile/EventTile";
import EventShot from "./EventShot/EventShot";
import EventJumbotron from "./EventJumbotron/EventJumbotron";

export enum Layout {
  tile = "tile",
  jumbotron = "jumbotron",
  shot = "shot",
}

interface Props {
  label?: string;
  layout: Layout;
  // TODO - make Item interface
  items: any;
}

export interface EventProps {
  title: string;
  thumbnail_url: string;
  description: string;
  tags?: string[];
}

const Event = (layout: Layout, items?: any) => {
  switch (layout) {
    case Layout.tile:
      return (
        <>
          {items.map((item: any) => (
            <div className="flex flex-grow flex-shrink-0 mr-4" key={item.title}>
              <EventTile {...item} />
            </div>
          ))}
        </>
      );

    case Layout.shot:
      return (
        <>
          {items.map((item: any) => (
            <div className="flex flex-grow flex-shrink-0 mr-4" key={item.title}>
              <EventShot {...item} />
            </div>
          ))}
        </>
      );

    case Layout.jumbotron:
      return (
        <>
          {items.map((item: any) => (
            <EventJumbotron key={item.title} {...item} />
          ))}
        </>
      );
  }
};

const EventRow = (props: Props) => {
  return (
    <div className="mb-8">
      <h3 className="text-2xl">{props.label}</h3>
      <div className="flex items-center flex-no-wrap my-8 overflow-x-auto">
        {Event(props.layout, props.items)}
      </div>
    </div>
  );
};

export default EventRow;
