import React from "react";
import { Link } from "./Link";
import { Heading } from "./Heading";
import { useAppSelector } from "../../redux/store";
import { CardList } from "./CardList";

interface ComponentRenderProps {
  children?: React.ReactNode;
}

export const ComponentRender: React.FC<ComponentRenderProps> = () => {
  const contentData = useAppSelector((state) => state.content.data);

  return (
    <section>
      {contentData.map((content, index) => {
        switch (content.type) {
          case "link":
            return <Link index={index} key={index} {...content.props} />;
          case "heading":
            return <Heading index={index} key={index} {...content.props} />;
          case "cardList":
            return <CardList index={index} key={index} {...content.props} />;
          default:
            return null;
        }
      })}
    </section>
  );
};
