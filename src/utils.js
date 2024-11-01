export const parseProjects = (markdown) => {
  const projectRegex = /### \[(.*?)\]\((.*?)\)\n(.*?)(?=\n### |\n## |\n$)/gs;
  const matches = [...markdown.matchAll(projectRegex)];
  const parsedProjects = matches.map((match) => ({
    title: match[1],
    link: match[2],
    description: match[3].trim(),
  }));
  const modifiedContent = markdown.replace(projectRegex, "");
  return { modifiedContent, parsedProjects };
};

export const generateClassName = (text) => {
  const formattedText = Array.isArray(text)
    ? text.join(" ")
    : text?.toString() || "";
  return formattedText
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};

export const getTextFromChildren = (children) => {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) {
    return children
      .map((child) =>
        typeof child === "string" ? child : child.props?.children || "",
      )
      .join("");
  }
  return children?.props?.children || "";
};
