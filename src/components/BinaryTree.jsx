import React from "react";

// Define a single node of the binary tree
function TreeNode({ src, alt, left, right }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <img src={src} alt={alt} style={{ maxWidth: "100px", margin: "0 10px" }} />
      <div>
        {left && <TreeNode {...left} />}
        {right && <TreeNode {...right} />}
      </div>
    </div>
  );
}

// Define the binary tree structure
function BinaryTree() {
  // Define the structure of the tree
  const tree = {
    src: "root.jpg",
    alt: "Root Image",
    left: {
      src: "left.jpg",
      alt: "Left Image",
      left: {
        src: "left-left.jpg",
        alt: "Left Left Image",
      },
      right: {
        src: "left-right.jpg",
        alt: "Left Right Image",
      },
    },
    right: {
      src: "right.jpg",
      alt: "Right Image",
      left: {
        src: "right-left.jpg",
        alt: "Right Left Image",
      },
      right: {
        src: "right-right.jpg",
        alt: "Right Right Image",
      },
    },
  };

  return (
    <div>
      <TreeNode {...tree} />
    </div>
  );
}

export default BinaryTree;
