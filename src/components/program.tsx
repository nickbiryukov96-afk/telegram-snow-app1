import ellipse1 from "./Ellipse 1.svg";
import ellipse2 from "./Ellipse 2.svg";
import rectangle1 from "./Rectangle 1.svg";
import rectangle2 from "./Rectangle 2.svg";
import star1 from "./Star-1.svg";
import vector1 from "./Vector1.svg";
import vector2 from "./Vector2.svg";
import vector3 from "./Vector3.svg";
import vector4 from "./Vector4.svg";
import vector5 from "./Vector5.svg";

interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  shape: string;
  shapeImage: string;
  iconImage?: string;
  iconAlt?: string;
  datePosition: {
    top: string;
    left?: string;
    right?: string;
  };
  shapePosition: {
    top: string;
    left?: string;
    right?: string;
  };
  titlePosition: {
    top: string;
    left?: string;
    right?: string;
  };
  iconPosition?: {
    top: string;
    left: string;
  };
  titleWidth: string;
  additionalLabel?: {
    text: string;
    position: {
      top: string;
      left: string;
    };
  };
}

export const Iphone = () => {
  const timelineEvents: TimelineEvent[] = [
    {
      id: 1,
      date: "14 января",
      title: "Приезд и разведка местности",
      shape: "ellipse",
      shapeImage: ellipse1,
      iconImage: vector1,
      iconAlt: "Vector",
      datePosition: {
        top: "142px",
        left: "50px",
      },
      shapePosition: {
        top: "122px",
        left: "36px",
      },
      titlePosition: {
        top: "137px",
        right: "17px",
      },
      iconPosition: {
        top: "calc(50.00% - 233px)",
        left: "calc(50.00% - 80px)",
      },
      titleWidth: "190px",
    },
    {
      id: 2,
      date: "",
      title: "Деду 30!",
      shape: "star",
      shapeImage: star1,
      datePosition: {
        top: "0",
        left: "0",
      },
      shapePosition: {
        top: "243px",
        left: "239px",
      },
      titlePosition: {
        top: "284px",
        left: "7px",
      },
      titleWidth: "180px",
      additionalLabel: {
        text: "ДР",
        position: {
          top: "calc(50.00% - 141px)",
          left: "calc(50.00% + 82px)",
        },
      },
    },
    {
      id: 3,
      date: "16 января",
      title: "Рекавери и \nбанный день",
      shape: "rectangle",
      shapeImage: rectangle1,
      iconImage: vector3,
      iconAlt: "Vector",
      datePosition: {
        top: "453px",
        left: "50px",
      },
      shapePosition: {
        top: "433px",
        left: "36px",
      },
      titlePosition: {
        top: "448px",
        left: "192px",
      },
      iconPosition: {
        top: "calc(50.00% + 72px)",
        left: "calc(50.00% - 77px)",
      },
      titleWidth: "190px",
    },
    {
      id: 4,
      date: "17 января",
      title: "Большой спуск",
      shape: "rectangle",
      shapeImage: rectangle2,
      iconImage: vector2,
      iconAlt: "Vector",
      datePosition: {
        top: "590px",
        left: "252px",
      },
      shapePosition: {
        top: "570px",
        left: "237px",
      },
      titlePosition: {
        top: "590px",
        left: "-4px",
      },
      iconPosition: {
        top: "calc(50.00% - 69px)",
        left: "calc(50.00% + 7px)",
      },
      titleWidth: "190px",
    },
    {
      id: 5,
      date: "18 января",
      title: "Отъезд и обнимашки",
      shape: "ellipse",
      shapeImage: ellipse2,
      iconImage: vector5,
      iconAlt: "Vector",
      datePosition: {
        top: "728px",
        left: "50px",
      },
      shapePosition: {
        top: "707px",
        left: "36px",
      },
      titlePosition: {
        top: "728px",
        left: "202px",
      },
      iconPosition: {
        top: "calc(50.00% + 357px)",
        left: "calc(50.00% - 74px)",
      },
      titleWidth: "190px",
    },
  ];

  return (
    <main className="overflow-hidden w-full min-w-[393px] min-h-[852px] relative">
      {timelineEvents.map((event) => (
        <article key={event.id} className="contents">
          <img
            className={`absolute w-[102px] h-[57px] ${
              event.shapePosition.top ? `top-[${event.shapePosition.top}]` : ""
            } ${
              event.shapePosition.left
                ? `left-[${event.shapePosition.left}]`
                : ""
            } ${
              event.shapePosition.right
                ? `right-[${event.shapePosition.right}]`
                : ""
            }`}
            style={{
              top: event.shapePosition.top,
              left: event.shapePosition.left,
              right: event.shapePosition.right,
              width: event.shape === "star" ? "95px" : "102px",
              height: event.shape === "star" ? "90px" : "57px",
            }}
            alt={event.shape}
            src={event.shapeImage}
          />

          {event.date && (
            <time
              className="absolute [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[15px] tracking-[0] leading-[normal] whitespace-nowrap"
              style={{
                top: event.datePosition.top,
                left: event.datePosition.left,
                right: event.datePosition.right,
              }}
            >
              {event.date}
            </time>
          )}

          {event.iconImage && event.iconPosition && (
            <img
              className="absolute w-[55px] h-[42px]"
              style={{
                top: event.iconPosition.top,
                left: event.iconPosition.left,
              }}
              alt={event.iconAlt || "Icon"}
              src={event.iconImage}
            />
          )}

          <h2
            className={`absolute [font-family:'Inter-Bold',Helvetica] font-bold text-white ${
              event.id === 2 ? "text-xl" : "text-[15px]"
            } text-center tracking-[0] leading-[normal]`}
            style={{
              top: event.titlePosition.top,
              left: event.titlePosition.left,
              right: event.titlePosition.right,
              width: event.titleWidth,
              whiteSpace: event.title.includes("\n") ? "pre-line" : "normal",
            }}
          >
            {event.title}
          </h2>

          {event.additionalLabel && (
            <span
              className="absolute [font-family:'Inter-Regular',Helvetica] font-normal text-black text-xs tracking-[0] leading-[normal]"
              style={{
                top: event.additionalLabel.position.top,
                left: event.additionalLabel.position.left,
              }}
            >
              {event.additionalLabel.text}
            </span>
          )}
        </article>
      ))}

      <img
        className="absolute top-[calc(50.00%_+_223px)] left-[calc(50.00%_-_18px)] w-[55px] h-[42px]"
        alt="Vector"
        src={vector4}
      />
    </main>
  );
};
