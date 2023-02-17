import React, { useState } from "react";
import { useSprings, animated, to as interpolate } from "@react-spring/web";
import { useDrag } from "react-use-gesture";

import { MenuContext } from "./App";
import styles from "./styles.module.css";
import { useCallback } from "react";
export enum MENU_ITEM_NAMES {
  ABOUT = "About",
  DESIGN = "design your bike",
  SPECIFICATION = "specification",
  LOG_IN = "Log in",
}

const cards = [
  "https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg",
  //   'https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg',
  //   'https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg',
  //   'https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_06_Lovers.jpg',
  //   'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/RWS_Tarot_02_High_Priestess.jpg/690px-RWS_Tarot_02_High_Priestess.jpg',
  //   'https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg',
];

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i: number) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: 0,
  delay: i * 100,
});
const from = (_i: number) => ({
  x: 0,
  rot: -10 + Math.random() * 20,
  scale: 1.5,
  y: -1000,
});
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r: number, s: number) =>
  `perspective(1500px) rotateX(0deg) rotateY(${
    r / 10
  }deg) rotateZ(${r}deg) scale(${s})`;

function Deck({ context }: any) {
  const [gone] = useState(() => new Set()); // The set flags all the cards that are flicked out
  const [props, api] = useSprings(cards.length, (i) => ({
    ...to(i),
    from: from(i),
  })); // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag(
    ({
      args: [index],
      down,
      movement: [mx, my],
      direction: [xDir, yDir],
      velocity,
    }) => {
      // console.log("mx:", mx, " my:", my, "\n  xdir:", xDir, " ydir", yDir);

      const trigger = velocity > 0.1; // If you flick hard enough it should trigger the card to fly out
      const dir = xDir < 0 ? -1 : 1; // Direction should either point left or right
      const horizontalChange = Math.abs(mx) > 10;

      if (!down && trigger && horizontalChange) gone.add(index); // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
      api.start((i) => {
        if (index !== i) return; // We're only interested in changing spring-data for the current spring
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
        const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0); // How much the card tilts, flicking it harder makes it rotate faster
        const scale = down ? 1.04 : 1; // Active cards lift up a bit
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 500 : isGone ? 200 : 500 },
        };
      });

      if (!down && gone.size === cards.length)
        setTimeout(() => {
          gone.clear();
          context.setIsMenuContentVisible(false);
          api.start((i) => to(i));
        }, 600);
    }
  );
  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return (
    //   <>
    <div className={styles.container}>
      {props.map(({ x, y, rot, scale }, i) => (
        <animated.div className={styles.deck} key={i} style={{ x, y }}>
          {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
          <animated.div
            {...bind(i)}
            style={{
              transform: interpolate([rot, scale], trans),
              // backgroundImage: `url(${cards[i]})`,
            }}
          >
            {" "}
            <CardContent selectedItem={context.selectedItem} />
          </animated.div>
        </animated.div>
      ))}
    </div>
  );
}

function CardContent({ selectedItem }: any) {
  // const { selectedItem } = context;
  console.log("card content --- selectedItem", selectedItem);

  const getContent = (selectedItem: MENU_ITEM_NAMES) => {
    console.log("selectedItem getContent", selectedItem);

    switch (selectedItem) {
      case MENU_ITEM_NAMES.SPECIFICATION:
        return <DesignCard />;
      default:
        return <DefaultCard />;
    }
  };

  //   }

  return (
    <>
      <div className={styles["card-header"]}>{selectedItem}</div>
      {getContent(selectedItem)}
    </>
  );
}

function DesignCard({ context }: any) {
  return (
    <>
      <div className={styles["card-design"]}>Design long</div>
      <div className={styles["card-design"]}>222Design long</div>
    </>
  );
}
function DefaultCard({ context }: any) {
  return (
    <>
      <div className={styles["card-content"]}>Default</div>
    </>
  );
}

export default function CardsMenu() {
  const menuContext: any = React.useContext(MenuContext);
  return (
    <>
      <MenuItems context={menuContext} />
      {menuContext.isMenuContentVisible && <Deck context={menuContext} />}
    </>
  );
}

function MenuItems({ context }: any) {
  const items = [
    { name: MENU_ITEM_NAMES.DESIGN },
    { name: MENU_ITEM_NAMES.SPECIFICATION },
    { name: MENU_ITEM_NAMES.ABOUT },
    { name: MENU_ITEM_NAMES.LOG_IN },
  ];
  console.log("contex MenuItems t", context);
  const onItemClick = useCallback(
    (e: any, name: string) => {
      console.log("e", e);
      context.setIsMenuContentVisible(true);
      context.setSelectedItem(name);
    },
    [context]
  );
  return (
    //   <>
    <div className={styles["menu-container"]}>
      {items.map((itm) => (
        <div
          key={itm.name}
          className={styles["menu-item"]}
          onClick={(e) => onItemClick(e, itm.name)}
        >
          {itm.name}
        </div>
      ))}
    </div>
  );
}
