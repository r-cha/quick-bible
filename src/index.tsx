import { Detail, LaunchProps } from "@raycast/api";
import { useFetch } from "@raycast/utils";

type BibleApiVerse = {
  book_id: string;
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
}

type BibleAPIResult = {
  reference: string;
  text: string;
  translation_name: string;
  verses: BibleApiVerse[];
}


export default function Command(props: LaunchProps<{ arguments: Arguments.Index }>) {
  const reference = props.arguments.reference;
  const url = `https://bible-api.com/${reference}`
  const { isLoading, data } = useFetch(url);

  let content = "";
  if (data) {
    const d = data as unknown as BibleAPIResult;
    for (const v of d.verses) {
      content += ` *${v.verse}* ${v.text}`
    }
    content += `\n\n# ${d.reference}\n\n## ${d.translation_name}`
  }
  return <Detail
    isLoading={isLoading}
    markdown={content}
  />;
}
