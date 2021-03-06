import React from "react";
import Emoji from "react-native-emoji";
import { CustomBlockRenderer } from "react-native-render-html";
import ImageModal from "../components/ImageModal";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ImageRenderer: CustomBlockRenderer = ({ TDefaultRenderer, ...props }) => {
  if (
    props.tnode.attributes.class === "emoji" ||
    props.tnode.attributes.class === "emoji only-emoji"
  ) {
    return <Emoji name={props.tnode.attributes.title} />;
  }
  return (
    <ImageModal
      src={props.tnode.attributes.src}
      imgHeight={
        props.tnode.attributes.height
          ? Number(props.tnode.attributes.height)
          : undefined
      }
      imgWidth={
        props.tnode.attributes.width
          ? Number(props.tnode.attributes.width)
          : undefined
      }
    />
  );
};

export default ImageRenderer;
