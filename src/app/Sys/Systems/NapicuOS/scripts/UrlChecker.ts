export function UrlChecker(url: string): string{
  let newUrl = window.decodeURIComponent(url);
  newUrl = newUrl.trim().replace(/\s/g, "");

  if(/^(:\/\/)/.test(newUrl)){
    return `https${newUrl}`;
  }
  if(!/^(f|ht)tps?:\/\//i.test(newUrl)){
    return `https://${newUrl}`;
  }


  return newUrl;

}
