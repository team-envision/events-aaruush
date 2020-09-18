import React, { useState, useEffect } from "react";
import "./EventRow.scss";
import { EventTile, EventShot } from "..";
import EventJumbotron from "../EventJumbotron/EventJumbotron";

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
  description?: string;
  tags?: string[];
}

const render = (layout: Layout, items?: any) => {
  switch (layout) {
    case Layout.tile:
      return (
        <>
          {items.map((item: any) => (
            <div className="grow" key={item.title}>
              <EventTile {...item} />
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

    case Layout.shot:
      return (
        <>
          {items.map((item: any) => (
            <div className="grow" key={item.title}>
              <EventShot {...item} />
            </div>
          ))}
        </>
      );
  }
};

const EventRow = (props: Props) => {
  return (
    <div className="ev-event-row">
      <h3>{props.label}</h3>
      <div className="row">{render(props.layout, props.items)}</div>
    </div>
  );
};

export default EventRow;
