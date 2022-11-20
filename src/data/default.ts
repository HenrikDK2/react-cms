import { HeadingContent } from "../components/content/Heading";
import { LinkContent } from "../components/content/Link";
import { CardListContent } from "../components/content/CardList";
import { MarkdownContent } from "../components/content/Markdown";

const universalProps = {
  px: 0,
  py: 0,
  mt: 0,
  mb: 0,
};

export const defaultCardItem = {
  alt: "placeholder",
  text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat, voluptatibus minus odit ad similique exercitationem doloribus!",
  title: "Example title",
};

export const defaultCardList: CardListContent = {
  type: "cardList",
  props: {
    items: [defaultCardItem, defaultCardItem, defaultCardItem],
    ...universalProps,
  },
};

export const defaultLink: LinkContent = {
  type: "link",
  props: {
    text: "My portfolio",
    weight: "bold",
    href: "https://henrikmundtmilo.dk",
    bgcolor: "#d21b1b",
    align: "left",
    color: "#fff",
    ...universalProps,
  },
};

export const defaultHeading: HeadingContent = {
  type: "heading",
  props: { ...universalProps, text: "This is my blog post", color: "#000", weight: "bold", align: "center", py: 8 },
};

export const defaultMarkdown: MarkdownContent = {
  type: "markdown",
  props: {
    content: `Hi! I'm the **creator** of this project. I initially wanted to showcase an example of me using Redux Toolkit and HTML Drag and Drop API in my portfolio, but I had to find some kind of **purpose** for the project.
  I got the idea from one of the job interviews I went to. They showed me their internal CMS system, they used to edit their content, and I basically yoinked the CMS idea for my portfolio.
  
  ![Yup, that's mine](https://media.tenor.com/6xJ4csixkmMAAAAC/claimed-yup-thats-mine.gif)
  
  The design isn't the prettiest, I wish I had my own personal designer, it would make things a lot easier for me. Anyways, I think this concludes this project. It was fun, but other than a small side project, I don't have the motivation to add more features for now. If you want to see my portfolio, then head over to my website.
      `,
    ...universalProps,
  },
};
