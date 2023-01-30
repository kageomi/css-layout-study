const removeScripts = (htmlText: string) => {
  return htmlText.replace(/\n.*\<script[\s\S]+?\/script\>\n/g, '');
};

export { removeScripts };
