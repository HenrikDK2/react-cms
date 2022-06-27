/* eslint-disable array-callback-return */
import { Button } from "./components/Link";
import { Heading } from "./components/Heading";
import { EditMenu } from "./components/EditMenu";
import { useAppSelector } from "./redux/store";
import { Header } from "./components/Header";
import { ProductList } from "./components/ProductList";

const isAdminPage = window.location.pathname === "/admin";

function App() {
  const contentData = useAppSelector((state) => state.content.data);

  return (
    <>
      <Header />
      <main className="max-w-[1200px] m-auto pt-4">
        {contentData.map((content, index) => {
          switch (content.type) {
            case "link":
              return <Button index={index} key={index} {...content.props} />;
            case "heading":
              return <Heading index={index} key={index} {...content.props} />;
            case "productList":
              return (
                <ProductList index={index} key={index} {...content.props} />
              );
          }
        })}
        {isAdminPage && <EditMenu />}
      </main>
    </>
  );
}

export default App;
