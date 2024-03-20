import { Detail, LaunchProps } from "@raycast/api";
import { useFetch } from "@raycast/utils";

import { bcv_parser, ParsedEntity } from "bible-passage-reference-parser/js/en_bcv_parser";

const bcv = new bcv_parser();

export default function Command(props: LaunchProps<{ arguments: Arguments.Index }>) {
  const reference = props.arguments.reference;
  const parsed = bcv.parse(reference).parsed_entities()[0].entities[0] as ParsedEntity;
  const { b, c, v } = parsed.start;
  const url = `https://bible-api.com/${b}-${c}:${v}`;
  const { isLoading, data } = useFetch(url);

  // json encode the data
  console.log(JSON.stringify(data, null, 2));

  return <Detail isLoading={isLoading} markdown={data.text} />;
}
