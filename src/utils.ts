import { updateContent } from "./redux/slices/contentSlice";
import { EditContentIndex, ContentArr, Content } from "./types/content";

export const getContent = (
  data: ContentArr,
  index: EditContentIndex
): Content => {
  return data[index!];
};

export const updateContentWithNewProps = (
  content: Content,
  newProps: any,
  editContentIndex: EditContentIndex
) => {
  return updateContent({
    content: { ...content, props: { ...content.props, ...newProps } },
    index: editContentIndex!,
  });
};
