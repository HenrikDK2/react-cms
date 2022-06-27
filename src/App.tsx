/* eslint-disable array-callback-return */
import { Button } from "./components/Link";
import { Heading } from "./components/Heading";
import { EditMenu } from "./components/EditMenu";
import { useAppSelector } from "./redux/store";
import { Header } from "./components/Header";
import { CardList } from "./components/CardList";

function App() {
  const contentData = useAppSelector((state) => state.content.data);
  const adminMode = useAppSelector((state) => state.admin.adminMode);

  return (
    <>
      <Header />
      <main className="max-w-[1224px] m-auto pt-4 px-6 mb-16">
        {contentData.map((content, index) => {
          switch (content.type) {
            case "link":
              return <Button index={index} key={index} {...content.props} />;
            case "heading":
              return <Heading index={index} key={index} {...content.props} />;
            case "cardList":
              return <CardList index={index} key={index} {...content.props} />;
          }
        })}
        {adminMode && <EditMenu />}
      </main>
    </>
  );
}

export default App;
